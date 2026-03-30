import React from "react";
import { ShieldCheck, Eye, Lock, Trash2, Zap } from "lucide-react";

const SecurityPrivacyPage: React.FC = () => {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-20 text-center">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-400 mb-6">Your Privacy, Our Promise</h1>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 tracking-tight">Security & Privacy</h2>
          <p className="text-stone-500 font-light mt-6 max-w-2xl mx-auto">
            MySmile is built on a zero‑data‑collection foundation. Your images and results never leave your device.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Trash2 className="w-10 h-10 text-stone-300 mb-6" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">No Storage</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Images are processed in real time and <strong>never stored</strong> on our servers. Everything is ephemeral.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Eye className="w-10 h-10 text-stone-300 mb-6" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Full Transparency</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              No cookies, no analytics, no third‑party tracking. You are in complete control.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Zap className="w-10 h-10 text-stone-300 mb-6" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Ephemeral Sessions</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Results disappear when you close the tab. We don't collect, sell, or share any personal data.
            </p>
          </div>
        </div>

        <div className="space-y-16 text-stone-600">
          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">Zero‑Data Commitment</h3>
            <p className="text-sm font-light leading-loose">
              MySmile is designed with privacy by default. <strong>We do not store any images, screening results, or personal information.</strong> The images you upload are processed in memory on our server, used only for the AI inference, and then discarded. No data is written to any persistent storage. When you close your browser tab, all results vanish.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">No Tracking, No Analytics</h3>
            <p className="text-sm font-light leading-loose">
              We do not use cookies, analytics tools, or any third‑party services that could track your behavior. There are no login requirements, no email collection, and no user profiles. Your screening is completely anonymous.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">Secure Inference</h3>
            <p className="text-sm font-light leading-loose">
              All communication between your browser and our backend is encrypted using HTTPS. The AI model is hosted on a secure server and does not retain any image data after inference. You can verify this by inspecting our open‑source code.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">Your Rights & Contact</h3>
            <p className="text-sm font-light leading-loose">
              Because we collect no data, there is nothing to delete or correct. If you have any questions about our privacy practices, please reach out to <a href="mailto:a.niyonseng@alustudent.com" className="text-stone-900 underline">admin@mysmile.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacyPage;