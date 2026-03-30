import React from "react";
import { FileText, Scale, CheckCircle, Zap, Shield, Eye } from "lucide-react";

const TermsPage: React.FC = () => {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-20 text-center">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-400 mb-6">Service Agreement</h1>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 tracking-tight">Terms & Conditions</h2>
          <p className="text-stone-500 font-light mt-6 max-w-2xl mx-auto">
            MySmile is a non‑commercial, educational screening tool. Please read these terms carefully.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <FileText className="w-10 h-10 text-stone-300 mb-6" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">AI Screening</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Our AI provides a preliminary risk assessment based on uploaded images. It is not a medical diagnosis.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Shield className="w-10 h-10 text-stone-300 mb-6" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Zero‑Data</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              We do not store your images or results. Your privacy is our priority – no data is ever saved.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-100 shadow-sm flex flex-col items-center text-center">
            <Eye className="w-10 h-10 text-stone-300 mb-6" strokeWidth={1} />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-900">Educational Purpose</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              All content is for informational and educational use only. Always consult a dentist for clinical decisions.
            </p>
          </div>
        </div>

        <div className="space-y-16 text-stone-600">
          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">1. Acceptance of Terms</h3>
            <p className="text-sm font-light leading-loose">
              By using MySmile (the “Service”), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Service. We reserve the right to update these terms at any time; continued use constitutes acceptance.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">2. Medical Disclaimer</h3>
            <p className="text-sm font-light leading-loose">
              The Service provides an AI‑powered risk assessment based on image analysis. <strong>It is not a medical device and is not intended to replace professional dental consultation, diagnosis, or treatment.</strong> Always seek the advice of a qualified dentist or physician with any questions regarding a dental condition. Do not disregard professional medical advice because of something you read or see on this Service.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">3. No Data Collection & Ephemeral Sessions</h3>
            <p className="text-sm font-light leading-loose">
              MySmile is built on a zero‑data‑collection principle. Images you upload are processed in real time and <strong>never stored</strong> on our servers. Screening results are only displayed during your current session and disappear when you close the browser tab. We do not use cookies, analytics, or any tracking technologies.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">4. Limitations of AI Screening</h3>
            <p className="text-sm font-light leading-loose">
              The AI model is trained on a limited dataset and may not be accurate for all individuals or conditions. Its performance depends on image quality, lighting, and the specific condition being assessed. The model may produce false positives or false negatives. You should not rely solely on this screening; a clinical evaluation by a dentist is essential for an accurate diagnosis.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">5. Limitation of Liability</h3>
            <p className="text-sm font-light leading-loose">
              To the fullest extent permitted by law, MySmile Studio and its developers shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service, including but not limited to damages resulting from reliance on screening results, delay or inability to use the Service, or any information obtained through the Service.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">6. Governing Law</h3>
            <p className="text-sm font-light leading-loose">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Rwanda. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Rwanda.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-light text-stone-900 mb-6 border-b border-stone-200 pb-4">7. Modifications and Contact</h3>
            <p className="text-sm font-light leading-loose">
              We may update these terms from time to time. The latest version will always be available on this page. If you have any questions, please contact us at <a href="mailto:care@mysmile.studio" className="text-stone-900 underline">care@mysmile.studio</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;