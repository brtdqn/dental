"use client";

import { useState } from "react";

const MOCK_CHATS = [
  { id: "1", name: "Elite Dental Studio", lastMsg: "Modeli inceledim, yarın üretime alıyoruz.", time: "10:20", unread: 2, online: true },
  { id: "2", name: "Dr. Selin Kaya", lastMsg: "Renk tonunu A2 olarak güncelleyebilir miyiz?", time: "Dün", unread: 0, online: false },
  { id: "3", name: "Modern Diş Lab", lastMsg: "Kargo takip numarasını sisteme girdim.", time: "Pazartesi", unread: 0, online: true },
];

const MOCK_MESSAGES = [
  { id: 1, sender: "Elite Dental Studio", text: "Merhaba Hocam, siparişinizi aldık.", time: "09:00", own: false },
  { id: 2, sender: "Me", text: "Selamlar, dişeti formu için gönderdiğim STL'e sadık kalabilir misiniz?", time: "09:15", own: true },
  { id: 3, sender: "Elite Dental Studio", text: "Tabii ki, dijital tasarım ekibimiz notunuzu aldı. Yarın sabah üretime geçiyoruz.", time: "10:20", own: false },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [msgInput, setMsgInput] = useState("");

  return (
    <div className="h-[calc(100vh-160px)] flex gap-6 animate-fade-in">
      {/* Sidebar: Chat List */}
      <div className="w-80 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-50">
           <h2 className="text-xl font-bold text-slate-900">Mesajlar</h2>
           <div className="mt-4 relative">
              <input type="text" placeholder="Ara..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/10" />
              <span className="absolute left-3 top-2.5 opacity-30">🔍</span>
           </div>
        </div>
        <div className="flex-grow overflow-y-auto">
           {MOCK_CHATS.map((chat) => (
             <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={`p-6 flex items-center gap-4 cursor-pointer transition-all border-l-4 ${
                  activeChat.id === chat.id ? "bg-blue-50/50 border-blue-600" : "border-transparent hover:bg-slate-50"
                }`}
             >
                <div className="relative">
                   <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400">
                      {chat.name[0]}
                   </div>
                   {chat.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-grow min-w-0">
                   <div className="flex justify-between items-center mb-1">
                      <div className="font-bold text-slate-900 truncate text-sm">{chat.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold">{chat.time}</div>
                   </div>
                   <div className="text-xs text-slate-500 truncate">{chat.lastMsg}</div>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-100">
                     {chat.unread}
                  </div>
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
         {/* Chat Header */}
         <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {activeChat.name[0]}
               </div>
               <div>
                  <div className="font-bold text-slate-900">{activeChat.name}</div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                     {activeChat.online ? "Online" : "Çevrimdışı"}
                  </div>
               </div>
            </div>
            <div className="flex gap-2">
               <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">📞</button>
               <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">⚙️</button>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-slate-50/30">
            {MOCK_MESSAGES.map((m) => (
              <div key={m.id} className={`flex ${m.own ? "justify-end" : "justify-start"}`}>
                 <div className={`max-w-[70%] p-4 rounded-3xl text-sm shadow-sm ${
                   m.own 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-white text-slate-700 rounded-bl-none border border-slate-100"
                 }`}>
                    {m.text}
                    <div className={`text-[10px] mt-2 font-bold uppercase ${m.own ? "text-white/60" : "text-slate-400"}`}>
                       {m.time}
                    </div>
                 </div>
              </div>
            ))}
         </div>

         {/* Input Area */}
         <div className="p-6 bg-white border-t border-slate-50">
            <div className="flex gap-4">
               <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-xl">📎</button>
               <div className="flex-grow relative">
                  <input 
                     type="text" 
                     placeholder="Mesajınızı yazın..." 
                     className="w-full px-6 py-3 bg-slate-50 rounded-2xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium"
                     value={msgInput}
                     onChange={(e) => setMsgInput(e.target.value)}
                  />
               </div>
               <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  Gönder
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
