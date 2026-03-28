import React, { useState } from 'react';
import { trackCTAClick } from '../utils/analytics';

export const CTABar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'sales' | null>(null);

  const handleCTA = (type: 'demo' | 'sales') => {
    trackCTAClick(type === 'demo' ? 'Request a Demo' : 'Contact Sales');
    setModalType(type);
    setShowModal(true);
  };

  return (
    <section id="cta" className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
      <p className="text-xl font-semibold mb-2">Ready to save days of work? Let's talk.</p>
      <p className="text-blue-200 text-sm mb-6">
        Join thousands of researchers using Simple Western to get reproducible, quantitative results in hours.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => handleCTA('demo')}
          className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          📅 Request a Demo
        </button>
        <button
          onClick={() => handleCTA('sales')}
          className="bg-blue-500 text-white font-bold px-6 py-3 rounded-lg border-2 border-blue-300 hover:bg-blue-400 transition-colors flex items-center gap-2"
        >
          📞 Contact Sales
        </button>
        <a
          href="https://www.bio-techne.com/instruments/simple-western"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick('Learn More')}
          className="bg-transparent text-white font-bold px-6 py-3 rounded-lg border-2 border-white hover:bg-white hover:text-blue-700 transition-colors flex items-center gap-2"
        >
          📖 Learn More
        </a>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white text-slate-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">
              {modalType === 'demo' ? '📅 Request a Demo' : '📞 Contact Sales'}
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              {modalType === 'demo'
                ? "We'd love to show you Simple Western in action. Fill out the form below and our team will reach out within 1 business day."
                : "Have questions? Our sales team is ready to help you find the right solution for your lab."
              }
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700 mb-4">
              📧 <strong>MVP stub:</strong> In production, this would route to your CRM (Salesforce, HubSpot, etc.)
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors text-sm"
              >
                Close
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Submit (Stub)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
