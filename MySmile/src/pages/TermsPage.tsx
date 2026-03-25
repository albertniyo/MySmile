import React from "react";
import { FileText, Scale, CheckCircle } from "lucide-react";

const TermsPage: React.FC = () => {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-20 text-center">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-400 mb-6">Service Agreement</h1>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 tracking-tight">Terms & Conditions</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <FileText className="w-10 h-10 text-stone-300 mb-6 font-light" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Service Scope</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Our digital screening is a preliminary assessment and does not replace professional dental advice.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Scale className="w-10 h-10 text-stone-300 mb-6 font-light" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Fair Use</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Users are expected to provide accurate information for the most effective clinical results.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-stone-300 mb-6 font-light" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Acceptance</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              By using MySmile, you agree to comply with our clinical standards and operational guidelines.
            </p>
          </div>
        </div>

        <div className="space-y-16 text-stone-600">
          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">1. Agreement to Terms</h3>
            <p className="text-sm font-light leading-loose">
              By accessing our website and using our digital screening services, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, you are prohibited from using the site.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">2. Professional Disclaimer</h3>
            <p className="text-sm font-light leading-loose">
              The content provided on this website, including digital screening results, is for informational purposes only. It is not intended to be a substitute for professional dental advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a dental condition.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">3. Limitation of Liability</h3>
            <p className="text-sm font-light leading-loose">
              In no event shall MySmile Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MySmile Studio's website.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">4. Governing Law</h3>
            <p className="text-sm font-light leading-loose">
              These terms and conditions are governed by and construed in accordance with the laws of the State of New York and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;