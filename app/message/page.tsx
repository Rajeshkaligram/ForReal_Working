"use client";

import { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { messagesAPI, Message } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Send, MessageCircle, Loader2, ArrowLeft, User } from "lucide-react";

// Wrap in suspense since we use useSearchParams
export default function MessagePage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
      <MessageContent />
    </Suspense>
  );
}

function MessageContent() {
  const { isLoggedIn, user: authUser } = useAuth();
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get("user_id");

  // Inbox state (list of all messages used to deduce rooms)
  const [inboxMessages, setInboxMessages] = useState<Message[]>([]);
  const [loadingInbox, setLoadingInbox] = useState(true);

  // Active chat state
  const [activeRoomId, setActiveRoomId] = useState<string | number | null>(null);
  const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
  const [loadingChat, setLoadingChat] = useState(false);

  // Send state
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState(initialUserId || "");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  // Initial load: Fetch Inbox list
  useEffect(() => {
    if (!isLoggedIn) { setLoadingInbox(false); return; }
    fetchInbox();
    const interval = setInterval(fetchInbox, 15000); // Polling inbox
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // If a URL parameter specifies user_id upon load, ensure receiverId matches
  useEffect(() => {
    if (initialUserId) {
      setReceiverId(initialUserId);
      // Let's see if we already have a room with this user in the inbox fetch.
      // If we do, activeRoomId will be calculated in the UI map below or manually clicked.
    }
  }, [initialUserId]);

  const fetchInbox = async () => {
    try {
      const res = await messagesAPI.list();
      // API returns { status, message, data: { messages: [...] } }
      const rawData = res?.data as any;
      const allMsgs: Message[] = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.messages)
          ? rawData.messages
          : [];
      setInboxMessages(allMsgs);

      // If we have an active room perfectly matching, let's refresh the active chat too
      if (activeRoomId) {
        fetchActiveChat(activeRoomId);
      } else if (initialUserId) {
        // Auto-find room if one exists for the requested user
        const existingThread = allMsgs.find(m =>
          String(m.sender_id) === initialUserId || String(m.receiver_id) === initialUserId
        );
        if (existingThread && existingThread.room_id) {
          setActiveRoomId(existingThread.room_id);
          fetchActiveChat(existingThread.room_id);
        }
      }
    } catch {
      setInboxMessages([]);
    } finally {
      setLoadingInbox(false);
    }
  };

  const fetchActiveChat = async (roomId: string | number) => {
    setLoadingChat(true);
    try {
      const res = await messagesAPI.roomMessages(roomId);
      setActiveChatMessages(res?.data || []);
    } catch (err) {
      // In case api fails or format differs, let's just extract from inboxMessages as fallback
      const fallbackMsgs = inboxMessages.filter(m => String(m.room_id) === String(roomId));
      setActiveChatMessages(fallbackMsgs);
    } finally {
      setLoadingChat(false);
    }
  };

  const openConversation = (roomId: string | number, counterpartId: string | number) => {
    setActiveRoomId(roomId);
    setReceiverId(String(counterpartId));
    fetchActiveChat(roomId);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !receiverId.trim()) return;
    setSending(true);
    setSendError("");

    // Create a local mock message just in case the API is not yet implemented
    const mockMessage: Message = {
      id: Date.now(),
      sender_id: authUser?.id || 0,
      receiver_id: Number(receiverId),
      message: newMessage.trim(),
      created_at: new Date().toISOString(),
      room_id: activeRoomId || undefined,
    };

    try {
      await messagesAPI.send({ receiver_id: receiverId, message: newMessage.trim() });
      setNewMessage("");
      await fetchInbox(); // Fetching inbox will re-pull active chat automatically
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message.toUpperCase() : "Failed to send.";
      // Temporarily mock functionality if endpoint is missing (404/Not Available)
      if (errMsg.includes("RESOURCE NOT") || errMsg.includes("404")) {
        setActiveChatMessages((prev) => [...prev, mockMessage]);
        setNewMessage("");
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setSendError(err instanceof Error ? err.message : "Failed to send.");
      }
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatMessages]);

  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  // Group messages into distinct conversations/rooms for the Sidebar
  const rooms = useMemo(() => {
    const map = new Map<string | number, Message>();
    // Assume backend returns messages chronologically. The last one processes will be the most recent.
    inboxMessages.forEach((msg) => {
      // We overwrite past msgs for the same room to just keep track of the latest one
      if (msg.room_id !== undefined) {
        map.set(msg.room_id, msg);
      }
    });
    return Array.from(map.values()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [inboxMessages]);


  if (!isLoggedIn) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto mb-4 text-muted opacity-30" />
          <p className="text-muted mb-6">Sign in to view your messages</p>
          <Link href="/auth/login" className="btn-bg px-10">Sign In</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 min-h-screen bg-[#FDFCF8]">
      <div className="container max-w-5xl">
        <p className="sec_tagline">INBOX</p>
        <h1 className="sec_title mb-8">Messages</h1>

        {/* 2-Panel Layout Container */}
        <div className="bg-white border border-border flex flex-col md:flex-row shadow-sm" style={{ height: "70vh", minHeight: "500px" }}>

          {/* LEFT PANEL: Conversation List */}
          <div className={`md:w-1/3 border-r border-border flex flex-col ${activeRoomId || initialUserId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-border bg-gray-50 flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-widest text-muted">Recent Chats</span>
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs text-primary font-bold">{rooms.length}</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loadingInbox ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-muted" size={24} /></div>
              ) : rooms.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <p className="text-xs text-muted">No conversations yet.</p>
                </div>
              ) : (
                rooms.map(room => {
                  const counterpartId = room.sender_id === authUser?.id ? room.receiver_id : room.sender_id;
                  const counterpartName = room.sender_id === authUser?.id
                    ? (room.first_name || `User #${room.receiver_id}`)
                    : (room.sender?.first_name || room.first_name || `User #${room.sender_id}`);
                  const isActive = activeRoomId === room.room_id;

                  return (
                    <div
                      key={room.room_id}
                      onClick={() => openConversation(room.room_id as string | number, counterpartId)}
                      className={`p-4 border-b border-border cursor-pointer transition-colors ${isActive ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-gray-50 border-l-2 border-l-transparent'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium truncate">{counterpartName}</p>
                        <p className="text-[10px] text-muted whitespace-nowrap">{room.sent || formatTime(room.created_at)}</p>
                      </div>
                      <p className="text-xs text-muted truncate">{room.content || room.message}</p>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Chat Thread */}
          <div className={`flex-1 flex flex-col ${!activeRoomId && !initialUserId ? 'hidden md:flex' : 'flex'}`}>

            {/* Header */}
            {(!activeRoomId && !initialUserId) ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50">
                <MessageCircle size={48} className="text-muted opacity-20 mb-4" />
                <p className="text-sm text-muted">Select a conversation to start messaging</p>
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-border bg-gray-50 flex items-center gap-3">
                  <button onClick={() => { setActiveRoomId(null); if (initialUserId) setReceiverId(""); }} className="md:hidden text-muted p-1">
                    <ArrowLeft size={18} />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center">
                    <User size={14} className="text-muted" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Replying To User #{receiverId}</p>
                  </div>
                </div>

                {/* Messages Timeline */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FDFCF8]/50">
                  {loadingChat ? (
                    <div className="flex justify-center items-center h-full"><Loader2 size={24} className="animate-spin text-muted" /></div>
                  ) : activeChatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <p className="text-muted text-sm mb-1">Say Hello!</p>
                      <p className="text-xs text-muted opacity-60">This thread will be securely monitored.</p>
                    </div>
                  ) : (
                    activeChatMessages.map((msg) => {
                      const isOwn = msg.sender_id === authUser?.id;
                      return (
                        <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] md:max-w-[65%] px-4 py-3 text-sm leading-relaxed ${isOwn
                                ? "bg-black text-white"
                                : "bg-white border border-border text-black shadow-sm"
                              }`}
                          >
                            <p>{msg.content || msg.message}</p>
                            {msg.created_at && (
                              <p className={`text-[9px] mt-1.5 font-medium tracking-widest ${isOwn ? "text-white/50" : "text-muted"}`}>
                                {formatTime(msg.created_at)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Compose Form */}
                <div className="border-t border-border p-4 bg-white">
                  {sendError && <p className="text-red-600 text-xs mb-2">{sendError}</p>}
                  <form onSubmit={handleSend} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border border-border px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={sending || !newMessage.trim() || !receiverId.trim()}
                      className="bg-black hover:bg-black/80 text-white px-6 py-3 disabled:opacity-50 transition-colors flex items-center justify-center"
                    >
                      {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                  </form>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
