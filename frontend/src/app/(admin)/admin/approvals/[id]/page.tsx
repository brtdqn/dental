"use client";

import { useParams, useRouter } from "next/navigation";

export default function AdminApprovalDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const lab = {
    id,
    name: "Efes Dental Lab",
    owner: "Mehmet Demir",
    email: "mehmet@efesdental.com",
    taxId: "1234567890",
    city: "İzmir",
    experience: "12 Yıl",
    specialties: ["Zirkonyum", "İmplant Üstü", "Dijital Tasarım"],
    docs: [
      { name: "Vergi Levhası.pdf", type: "PDF" },
      { name: "Sertifika_1.jpg", type: "IMG" },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20 space-y-10">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
           ⬅️
        </button>
        <h1 className="text-3xl font-black text-slate-900">Laboratuvar Başvuru Detayı</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
               <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Kurumsal Bilgiler</h3>
               <div className="grid grid-cols-2 gap-6">
                  <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Laboratuvar Adı</div>
                     <div className="font-bold text-slate-900">{lab.name}</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sahibi / Yetkili</div>
                     <div className="font-bold text-slate-900">{lab.owner}</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vergi No</div>
                     <div className="font-bold text-slate-900">{lab.taxId}</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Şehir</div>
                     <div className="font-bold text-slate-900">{lab.city}</div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
               <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Yüklenen Belgeler</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lab.docs.map((doc, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-all">
                       <div className="flex items-center gap-3">
                          <span className="text-2xl">{doc.type === "PDF" ? "📄" : "🖼️"}</span>
                          <span className="text-sm font-bold text-slate-700">{doc.name}</span>
                       </div>
                       <button className="text-blue-600 font-bold text-xs">Görüntüle</button>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl space-y-6">
               <h3 className="text-xl font-bold">Karar Ver</h3>
               <p className="text-sm text-slate-400">Başvuruyu incelediyseniz onaylayabilir veya ek bilgi isteyebilirsiniz.</p>
               
               <div className="space-y-3 pt-4">
                  <button className="w-full py-4 bg-emerald-500 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                     ✅ Başvuruyu Onayla
                  </button>
                  <button className="w-full py-4 bg-red-500 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
                     ❌ Başvuruyu Reddet
                  </button>
                  <button className="w-full py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10">
                     💬 Ek Bilgi İste
                  </button>
               </div>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100">
               <h4 className="text-sm font-bold text-amber-800 mb-2">Not</h4>
               <p className="text-xs text-amber-700 leading-relaxed">Laboratuvar onaylandıktan sonra sistemde iş teklifi almaya başlayabilecektir.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
