"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Send, Search, Phone, Video, MoreHorizontal, Check, CheckCheck, Paperclip, Smile } from "lucide-react";

const MOCK_CHATS = [
  { id: "1", name: "Elite Dental Studio", avatar: "E", lastMsg: "Modeli inceledim, yarın üretime alıyoruz.", time: "10:20", unread: 2, online: true, role: "Lab" },
  { id: "2", name: "Dr. Selin Kaya", avatar: "S", lastMsg: "Renk tonunu A2 olarak güncelleyebilir miyiz?", time: "Dün", unread: 0, online: false, role: "Hekim" },
  { id: "3", name: "Modern Diş Lab", avatar: "M", lastMsg: "Kargo takip numarasını sisteme girdim.", time: "Pzt", unread: 0, online: true, role: "Lab" },
  { id: "4", name: "Premium Smile Lab", avatar: "P", lastMsg: "Merhaba, teklifiniz için teşekkürler!", time: "13 May", unread: 0, online: false, role: "Lab" },
];

const MOCK_MESSAGES_MAP: Record<string, any[]> = {
  "1": [
    { id: 1, text: "Merhaba Hocam, siparişinizi aldık.", time: "09:00", own: false, read: true },
    { id: 2, text: "Selamlar, dişeti formu için gönderdiğim STL'e sadık kalabilir misiniz?", time: "09:15", own: true, read: true },
    { id: 3, text: "Tabii ki, dijital tasarım ekibimiz notunuzu aldı.", time: "09:18", own: false, read: true },
    { id: 4, text: "Yarın sabah üretime geçiyoruz, akşama kadar ön görsel gönderebilirim.", time: "10:20", own: false, read: false },
    { id: 5, text: "Harika, bekleyeceğim. Teşekkürler.", time: "10:22", own: true, read: true },
  ],
  "2": [
    { id: 1, text: "Merhaba, zirkonyum siparişi hakkında konuşabilir miyiz?", time: "Dün 14:00", own: false, read: true },
    { id: 2, text: "Evet tabii ki, ne sormak istiyorsunuz?", time: "Dün 14:05", own: true, read: true },
    { id: 3, text: "Renk tonunu A2 olarak güncelleyebilir miyiz?", time: "Dün 14:10", own: false, read: true },
  ],
  "3": [
    { id: 1, text: "Siparişiniz kargoya verildi.", time: "Pzt 11:00", own: false, read: true },
    { id: 2, text: "Kargo takip numarasını sisteme girdim.", time: "Pzt 11:05", own: false, read: true },
  ],
  "4": [
    { id: 1, text: "Merhaba, teklifiniz için teşekkürler!", time: "13 May", own: false, read: true },
  ],
};

export default function MessagesPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [msgInput, setMsgInput] = useState("");
  const [messagesMap, setMessagesMap] = useState(MOCK_MESSAGES_MAP);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, messagesMap]);

  if (!user) return null;

  const messages = messagesMap[activeChat.id] || [];

  const handleSend = () => {
    const trimmed = msgInput.trim();
    if (!trimmed) return;
    const newMsg = {
      id: Date.now(),
      text: trimmed,
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      own: true,
      read: false,
    };
    setMessagesMap(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));
    setMsgInput("");
  };

  const filteredChats = MOCK_CHATS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-130px)] flex gap-0 animate-fade-in rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">

      {/* ── Sidebar ── */}
      <div className="w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-slate-50 dark:border-slate-800">
          <h2 className="font-black text-slate-900 dark:text-white text-base mb-3">Mesajlar</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Ara..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all border border-slate-100 dark:border-slate-700" />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => (
            <button key={chat.id} onClick={() => setActiveChat(chat)} className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left border-b border-slate-50 dark:border-slate-800/50 ${activeChat.id === chat.id ? "bg-orange-50 dark:bg-orange-500/10 border-l-2 border-l-orange-500" : ""}`}>
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-sm">
                  {chat.avatar}
                </div>
                {chat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white text-sm truncate">{chat.name}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 ml-1">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[140px]">{chat.lastMsg}</span>
                  {chat.unread > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ml-1">{chat.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat Window ── */}
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 min-w-0">
        {/* Chat Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-5 py-3.5 flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-sm">
              {activeChat.avatar}
            </div>
            {activeChat.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-900 dark:text-white text-sm">{activeChat.name}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500">{activeChat.online ? "🟢 Çevrimiçi" : "Son görülme: Dün"}</div>
          </div>
          <div className="flex gap-1">
            {[
              { icon: <Phone size={16} />, title: "Ara" },
              { icon: <Video size={16} />, title: "Görüntülü" },
              { icon: <MoreHorizontal size={16} />, title: "Daha fazla" },
            ].map((btn, i) => (
              <button key={i} title={btn.title} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.map((msg, i) => {
            const showTime = i === 0 || messages[i-1]?.time !== msg.time;
            return (
              <div key={msg.id}>
                {showTime && i > 0 && (
                  <div className="text-center py-2">
                    <span className="text-[10px] text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800">{msg.time}</span>
                  </div>
                )}
                <div className={`flex ${msg.own ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] group`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.own
                        ? "bg-orange-500 text-white rounded-br-sm"
                        : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${msg.own ? "justify-end" : "justify-start"}`}>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                      {msg.own && (
                        msg.read
                          ? <CheckCheck size={11} className="text-orange-400" />
                          : <Check size={11} className="text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-3">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl px-4 py-2 border border-slate-100 dark:border-slate-700 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Dosya ekle">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Mesaj yaz..."
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Emoji">
              <Smile size={18} />
            </button>
            <button
              onClick={handleSend}
              disabled={!msgInput.trim()}
              className="w-8 h-8 flex-shrink-0 bg-orange-500 hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <Send size={15} />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-300 dark:text-slate-700">Enter ile gönder · Shift+Enter yeni satır</span>
          </div>
        </div>
      </div>
    </div>
  );
}
