import React from "react";
import { ShieldCheck, Eye, Lock } from "lucide-react";

const SecurityPrivacyPage: React.FC = () => {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-20 text-center">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-400 mb-6">Legal & Protection</h1>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 tracking-tight">Security & Privacy</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <ShieldCheck className="w-10 h-10 text-stone-300 mb-6 font-light" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Data Protection</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              We employ military-grade encryption to ensure your clinical data remains private and secure.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Eye className="w-10 h-10 text-stone-300 mb-6 font-light" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Transparency</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              You have full control over your information. We never share your data with third parties.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Lock className="w-10 h-10 text-stone-300 mb-6 font-light" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Patient Privacy</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              HIPAA compliant systems designed to protect your medical history and screening results.
            </p>
          </div>
        </div>

        <div className="space-y-16 text-stone-600">
          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">Our Commitment</h3>
            <p className="text-sm font-light leading-loose mb-4">
              At MySmile, we believe that your health information is your most personal data. Our minimalist approach extends to our data collection—we only ask for what is absolutely necessary to provide you with elite clinical care.
            </p>
            <p className="text-sm font-light leading-loose">
              This policy outlines how we collect, use, and safeguard your personal information when you use our digital screening tools and website services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">Information Collection</h3>
            <p className="text-sm font-light leading-loose">
              During the screening process, we collect images and basic health indicators provided by you. This data is used exclusively for diagnostic assessment and to improve our clinical screening algorithms.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">Contact Information</h3>
            <p className="text-sm font-light leading-loose">
              If you have any questions regarding your privacy or security, please contact our data protection officer at <span className="text-stone-900 font-normal">privacy@mysmile.studio</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacyPage;