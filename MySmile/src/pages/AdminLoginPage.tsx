import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Authentication failed", { description: error.message });
    } else {
      // Optionally check admin table
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        toast.success("Welcome back");
        navigate("/admin");
      } else {
        toast.error("Access denied");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-32 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="3.jpg"
          className="w-full h-full object-cover opacity-5 grayscale"
          alt="Login Background"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] border border-stone-100 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-stone-900 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl active:scale-95 transition-transform">
            <UserCircle size={40} strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-light text-stone-900 mb-4 uppercase tracking-tighter">Elite <span className="italic font-serif normal-case text-stone-400">Access</span></h1>
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.4em]">Authorized Clinicians Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-8">
            <div className="relative group">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 mb-3 block ml-1 group-focus-within:text-stone-900 transition-colors">Identification</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="CLINIC@MYSMILE.STUDIO"
                  className="pl-14 py-8 bg-stone-50 border-none rounded-[1.5rem] focus-visible:ring-1 focus-visible:ring-stone-200 transition-all placeholder:text-stone-300 text-xs tracking-widest uppercase"
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 mb-3 block ml-1 group-focus-within:text-stone-900 transition-colors">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-14 py-8 bg-stone-50 border-none rounded-[1.5rem] focus-visible:ring-1 focus-visible:ring-stone-200 transition-all placeholder:text-stone-300"
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            disabled={loading}
            className="w-full bg-stone-900 text-white py-8 rounded-[1.5rem] text-[10px] uppercase tracking-[0.3em] font-black hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-70"
          >
            {loading ? "Validating..." : "Verify Identity"}
            {!loading && <ArrowRight size={14} className="ml-3" />}
          </Button>
        </form>

        <div className="mt-16 pt-10 border-t border-stone-50 text-center">
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.3em] leading-relaxed font-bold">
            By proceeding, you adhere to clinical data security protocols.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;