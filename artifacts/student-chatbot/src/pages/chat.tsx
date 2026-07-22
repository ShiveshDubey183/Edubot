import { useState, useRef, useEffect } from "react";
import { 
  useListGeminiConversations, 
  useCreateGeminiConversation,
  useGetGeminiConversation,
  useDeleteGeminiConversation,
  useListGeminiMessages,
  getListGeminiConversationsQueryKey,
  getListGeminiMessagesQueryKey,
  getGetGeminiConversationQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  GraduationCap, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Send,
  Menu,
  X,
  Bot
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SUGGESTIONS = [
  "How do I apply for admission?",
  "What are the fee payment deadlines?",
  "How does the exam grading work?",
  "Tell me about hostel facilities",
  "How do I get a bonafide certificate?",
  "What is the placement process?"
];

export default function ChatPage() {
  const queryClient = useQueryClient();
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Queries
  const { data: conversations, isLoading: isConversationsLoading } = useListGeminiConversations();
  
  const { data: activeConversation } = useGetGeminiConversation(
    activeConversationId as number,
    { query: { enabled: !!activeConversationId, queryKey: getGetGeminiConversationQueryKey(activeConversationId as number) } }
  );

  const { data: conversationMessages } = useListGeminiMessages(
    activeConversationId as number,
    { query: { enabled: !!activeConversationId, queryKey: getListGeminiMessagesQueryKey(activeConversationId as number) } }
  );

  // Mutations
  const createConversation = useCreateGeminiConversation();
  const deleteConversation = useDeleteGeminiConversation();

  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationMessages, streamingText]);

  // Set initial conversation ONLY on first load
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && Array.isArray(conversations) && conversations.length > 0 && !activeConversationId) {
      setActiveConversationId(conversations[0].id);
      setHasInitialized(true);
    }
  }, [conversations, activeConversationId, hasInitialized]);

  const handleNewChat = () => {
    setActiveConversationId(null);
    setInput("");
    setStreamingText("");
    setIsStreaming(false);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleDeleteConversation = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this conversation?")) return;
    
    deleteConversation.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListGeminiConversationsQueryKey() });
        if (activeConversationId === id) {
          setActiveConversationId(null);
        }
      }
    });
  };

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isStreaming) return;
    
    const content = messageContent.trim();
    setInput("");
    setIsStreaming(true);
    setStreamingText("");
    
    try {
      let currentConvoId = activeConversationId;
      
      // Create new conversation if none active
      if (!currentConvoId) {
        const title = content.slice(0, 40) + (content.length > 40 ? "..." : "");
        const newConvo = await createConversation.mutateAsync({ data: { title } });
        currentConvoId = newConvo.id;
        setActiveConversationId(currentConvoId);
        queryClient.invalidateQueries({ queryKey: getListGeminiConversationsQueryKey() });
      }

      // Optimistically add user message to cache for useListGeminiMessages
      const queryKey = getListGeminiMessagesQueryKey(currentConvoId);
      queryClient.setQueryData(queryKey, (old: any) => {
        const existingMessages = Array.isArray(old) ? old : [];
        return [
          ...existingMessages,
          {
            id: Date.now(),
            conversationId: currentConvoId,
            role: "user",
            content,
            createdAt: new Date().toISOString()
          }
        ];
      });

      // Stream the response
      const baseUrl = import.meta.env.BASE_URL;
      const response = await fetch(`${baseUrl}api/gemini/conversations/${currentConvoId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.content) {
                setStreamingText((prev) => prev + json.content);
              }
              if (json.done) {
                // Done streaming
                queryClient.invalidateQueries({ queryKey: getListGeminiMessagesQueryKey(currentConvoId as number) });
                queryClient.invalidateQueries({ queryKey: getGetGeminiConversationQueryKey(currentConvoId as number) });
              }
            } catch (e) {
              // Ignore parse errors from partial chunks
            }
          }
        }
      }
      
      // In case there's anything left in buffer
      if (buffer.startsWith("data: ")) {
        try {
          const json = JSON.parse(buffer.slice(6));
          if (json.content) setStreamingText((prev) => prev + json.content);
        } catch (e) {}
      }

      // Refetch explicitly
      queryClient.invalidateQueries({ queryKey: getListGeminiMessagesQueryKey(currentConvoId) });
      queryClient.invalidateQueries({ queryKey: getGetGeminiConversationQueryKey(currentConvoId) });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsStreaming(false);
      setStreamingText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Merge messages (prefer specific list API if available)
  const messages = conversationMessages || activeConversation?.messages || [];
  const isNewChat = !activeConversationId || messages.length === 0;

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-2 text-sidebar-primary font-bold text-xl">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground p-1.5 rounded-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            EduBot
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-3">
          <Button onClick={handleNewChat} className="w-full justify-start gap-2 shadow-sm border border-primary/20" variant="secondary" size="lg">
            <Plus className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">New Chat</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 pb-4">
            {isConversationsLoading && (
              <div className="space-y-2 py-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-sidebar-accent/50 animate-pulse rounded-md"></div>
                ))}
              </div>
            )}
            
            {(Array.isArray(conversations) ? conversations : []).map((conv) => (
              <div 
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`
                  group flex items-center justify-between p-2.5 rounded-md cursor-pointer text-sm transition-colors
                  ${activeConversationId === conv.id 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"}
                `}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare className="h-4 w-4 shrink-0 opacity-70" />
                  <span className="truncate whitespace-nowrap">{conv.title || "New Conversation"}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0"
                  onClick={(e) => handleDeleteConversation(conv.id, e)}
                  title="Delete chat"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background relative">
        {/* Header */}
        <header className="h-14 border-b flex items-center px-4 bg-background shrink-0 gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="font-semibold truncate">
            {activeConversation?.title || "New Chat"}
          </div>
        </header>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-4 py-6 md:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Empty State / Welcome Screen */}
            {isNewChat && (
              <div className="h-full flex flex-col items-center justify-center min-h-[50vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-6">
                  <GraduationCap className="h-12 w-12" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to EduBot</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  I'm your AI student assistant. Ask me anything about admissions, courses, fees, placements, or campus life.
                </p>
                
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion)}
                      className="text-left p-3 rounded-lg border bg-card hover:bg-accent hover:border-accent text-sm transition-all hover:shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message List */}
            {!isNewChat && messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 shrink-0 ${msg.role === "user" ? "bg-primary" : "bg-secondary"}`}>
                  {msg.role === "user" ? (
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">Me</AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-secondary text-secondary-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                  )}
                </Avatar>
                
                <div className={`
                  flex flex-col gap-1 max-w-[85%] md:max-w-[75%]
                  ${msg.role === "user" ? "items-end" : "items-start"}
                `}>
                  <div className={`
                    px-4 py-3 rounded-2xl
                    ${msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-sm shadow-sm" 
                      : "bg-card border shadow-sm text-card-foreground rounded-tl-sm prose-p:leading-relaxed prose-pre:bg-muted prose-pre:p-3 prose-pre:rounded-md prose-pre:overflow-x-auto"}
                  `}>
                    {msg.role === "user" ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-a:text-primary">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming Message Indicator */}
            {isStreaming && (
              <div className="flex gap-4 flex-row animate-in fade-in duration-300">
                <Avatar className="h-8 w-8 shrink-0 bg-secondary shadow-sm">
                  <AvatarFallback className="bg-secondary text-secondary-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col gap-1 items-start max-w-[85%] md:max-w-[75%]">
                  <div className="px-4 py-3 rounded-2xl bg-card border shadow-sm text-card-foreground rounded-tl-sm min-w-[3rem]">
                    {streamingText ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-a:text-primary">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {streamingText}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex items-center h-5">
                        <div className="dot-flashing"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div ref={scrollRef} className="h-1" />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-background border-t">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-card border shadow-sm rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-ring focus-within:border-primary transition-all p-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask EduBot something..."
              className="min-h-[44px] max-h-32 border-0 shadow-none focus-visible:ring-0 resize-none py-3 px-4 bg-transparent"
              disabled={isStreaming}
            />
            <div className="p-1 shrink-0 flex items-center">
              <Button 
                onClick={() => sendMessage(input)} 
                disabled={!input.trim() || isStreaming}
                size="icon"
                className="h-10 w-10 rounded-lg transition-all shadow-sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-3">
            EduBot can make mistakes. Consider verifying important information with university guidelines.
          </div>
        </div>
      </main>
    </div>
  );
}
