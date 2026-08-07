import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

export function ManualsChatWidget() {
  const [open, setOpen] = useState(false); const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{role: string; text: string}[]>([]); const [loading, setLoading] = useState(false);
  const ask = async () => { if (!question.trim() || loading) return; const asked = question.trim(); setQuestion(""); setMessages(m => [...m, {role:"user", text:asked}]); setLoading(true);
    try { const r = await fetch("/api/manuals/ask", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:asked})}); const d=await r.json(); setMessages(m=>[...m,{role:"agent",text:d.answer||d.error}]); }
    catch { setMessages(m=>[...m,{role:"agent",text:"I’m unable to answer right now. Please try again."}]); } finally { setLoading(false); } };
  return <div className="fixed bottom-5 right-5 z-[100] font-sans">
    {open && <section className="mb-3 flex h-[440px] w-[min(360px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <header className="flex items-center justify-between bg-indigo-600 px-4 py-3 text-white"><div><b>Product Manuals Assistant</b><p className="text-xs text-indigo-100">Ask about the available product guides</p></div><button onClick={()=>setOpen(false)} aria-label="Close chat"><X size={19}/></button></header>
      <main className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">{messages.length===0 && <p className="rounded-lg bg-white p-3 text-sm text-slate-600">How can I help with a product manual?</p>}{messages.map((m,i)=><div key={i} className={`max-w-[88%] rounded-xl p-3 text-sm ${m.role==='user'?'ml-auto bg-indigo-600 text-white':'bg-white text-slate-700 shadow-sm'}`}>{m.text}</div>)}{loading&&<p className="text-sm text-slate-500">Checking the product information…</p>}</main>
      <footer className="flex gap-2 border-t p-3"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Ask a question…" className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm"/><button onClick={ask} className="rounded-lg bg-indigo-600 p-2 text-white" aria-label="Send"><Send size={18}/></button></footer>
    </section>}
    <button onClick={()=>setOpen(!open)} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-500" aria-label="Open product manuals assistant"><MessageCircle size={25}/></button>
  </div>;
}
