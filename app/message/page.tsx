"use client";

import { useEffect, useState, useRef } from "react";
import { messagesAPI, Message } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Send, MessageCircle, Loader2 } from "lucide-react";

export default function MessagePage() {
  const { isLoggedIn, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    fetchMessages();
    const interval = setInterval(fetchMessages, 15000); // poll every 15s
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await messagesAPI.list();
      setMessages(res?.data || []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !receiverId.trim()) return;
    setSending(true);
    setSendError("");
    try {
      await messagesAPI.send({ receiver_id: receiverId, message: newMessage.trim() });
      setNewMessage("");
      await fetchMessages();
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : "Failed to send.");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

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
    <section className="py-8 md:py-16 min-h-screen">
      <div className="container max-w-3xl">
        <p className="sec_tagline">INBOX</p>
        <h1 className="sec_title mb-8">Messages</h1>

        {/* Message thread */}
        <div className="bg-white border border-border flex flex-col" style={{ height: "60vh" }}>
          {/* Thread header */}
          <div className="px-5 py-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle size={15} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Your Conversations</p>
              <p className="text-xs text-muted">
                {messages.length} message{messages.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 size={24} className="animate-spin text-muted" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle size={36} className="text-muted opacity-30 mb-3" />
                <p className="text-muted text-sm">No messages yet</p>
                <p className="text-xs text-muted mt-1">
                  Start a conversation from a product listing
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isOwn = msg.sender_id === user?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-3 text-sm leading-relaxed ${
                        isOwn
                          ? "bg-primary text-white"
                          : "bg-secondary border border-border text-primary"
                      }`}
                    >
                      {!isOwn && msg.sender && (
                        <p className="text-[10px] font-medium tracking-widest uppercase opacity-60 mb-1">
                          {msg.sender.first_name} {msg.sender.last_name}
                        </p>
                      )}
                      <p>{msg.message}</p>
                      {msg.created_at && (
                        <p className={`text-[10px] mt-1 ${isOwn ? "text-white/50" : "text-muted"}`}>
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

          {/* Compose */}
          <div className="border-t border-border p-4">
            {sendError && (
              <p className="text-red-600 text-xs mb-2">{sendError}</p>
            )}
            <form onSubmit={handleSend} className="space-y-2">
              <input
                type="text"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                placeholder="Recipient user ID"
                className="w-full border border-border px-3 py-2 text-xs outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim() || !receiverId.trim()}
                  className="btn-bg px-4 py-2.5 disabled:opacity-60"
                >
                  {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
