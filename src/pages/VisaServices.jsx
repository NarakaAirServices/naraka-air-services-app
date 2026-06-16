import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, Check, ChevronRight, X, Send, AlertCircle, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { visaServices } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

export default function VisaServices() {
  const { t, lang } = useLanguage();
  const { addNotification } = useAuth();
  const navigate = useNavigate();
  
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', visaType: '' });
  
  const handleInquiry = (visa) => {
    setSelectedVisa(visa);
    setFormData(prev => ({ ...prev, visaType: visa.type, message: `I am interested in applying for ${visa.type} for ${visa.country}.` }));
    setShowInquiry(true);
  };
  
  const submitInquiry = () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    setInquirySuccess(true);
    addNotification({
      title: 'Visa Inquiry Received',
      message: `We have received your inquiry for ${selectedVisa?.type}. Our team will contact you within 24 hours.`,
      type: 'confirmation',
    });
    setTimeout(() => {
      setShowInquiry(false);
      setInquirySuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '', visaType: '' });
    }, 2000);
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('visa')}</h2>
        <p className="text-sm text-gray-500">{lang === 'ha' ? 'Taimako da shawarwaki don aiwatar da visa' : 'Expert assistance for visa applications worldwide'}</p>
      </div>
      
      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">{lang === 'ha' ? 'Taimako na Kwararru' : 'Expert Guidance'}</p>
          <p className="text-xs text-amber-700 mt-0.5">{lang === 'ha' ? 'Mun taimaka da aiwatar da visa karo 1,000+ a kowace shekara. A tuntube mu don taimako.' : 'We have assisted with 1,000+ visa applications yearly. Contact us for help.'}</p>
        </div>
      </div>
      
      {/* Visa Cards */}
      <div className="space-y-4">
        {visaServices.map((visa, idx) => (
          <motion.div
            key={visa.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100"
          >
            <div className="relative h-36">
              <img src={visa.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-primary/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Globe size={12} /> {lang === 'ha' ? visa.countryHa : visa.country}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg text-shadow">{lang === 'ha' ? visa.typeHa : visa.type}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-primary" />
                  <span>{lang === 'ha' ? visa.processingTimeHa : visa.processingTime}</span>
                </div>
                <span className="text-lg font-bold text-secondary">{formatCurrency(visa.price, visa.currency)}</span>
              </div>
              
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t('requirements')}</p>
              <div className="space-y-1.5 mb-4">
                {(lang === 'ha' ? visa.requirementsHa : visa.requirements).slice(0, 4).map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <Check size={12} className="text-emerald-500 flex-shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleInquiry(visa)}
                  className="flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform"
                >
                  {t('inquire')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => setShowInquiry(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="bg-white w-full max-w-[430px] rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {inquirySuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{t('success')}</h3>
                  <p className="text-sm text-gray-500">{t('inquirySent')}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900">{t('submitInquiry')}</h3>
                    <button onClick={() => setShowInquiry(false)} className="p-1 rounded-full hover:bg-gray-100">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <p className="text-sm font-semibold text-gray-900">{selectedVisa?.type} - {selectedVisa?.country}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatCurrency(selectedVisa?.price, selectedVisa?.currency)}</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">{t('fullName')}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">{t('email')}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">{t('phone')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus"
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">{t('message')}</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus resize-none"
                        placeholder="Tell us about your travel plans..."
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={submitInquiry}
                    className="w-full gradient-navy text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    <Send size={16} /> {t('send')}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}