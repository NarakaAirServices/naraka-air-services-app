import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, User, MessageSquare, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { emailLink, phoneCall } from '../utils/helpers';

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const { addNotification } = useAuth();
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setSubmitted(true);
    addNotification({
      title: 'Contact Form Submitted',
      message: 'Thank you for reaching out. We will respond within 24 hours.',
      type: 'confirmation',
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('contactUs')}</h2>
        <p className="text-sm text-gray-500">{lang === 'ha' ? 'Tuntube mu don taimako da tambayoyi' : 'Reach out to us for assistance and inquiries'}</p>
      </div>
      
      {/* Contact Info */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <a href={phoneCall()} className="bg-primary/5 rounded-xl p-4 flex flex-col items-center gap-2 active:bg-primary/10 transition">
          <Phone size={20} className="text-primary" />
          <span className="text-xs font-medium text-gray-900 text-center">+234 803 353 4218</span>
        </a>
        <a href={emailLink()} className="bg-secondary/5 rounded-xl p-4 flex flex-col items-center gap-2 active:bg-secondary/10 transition">
          <Mail size={20} className="text-secondary" />
          <span className="text-xs font-medium text-gray-900 text-center break-all">info@narakaairservice.com</span>
        </a>
      </div>
      
      {/* Office Address */}
      <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100 mb-6">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">NARAKA AIR SERVICES LTD</p>
            <p className="text-xs text-gray-500 mt-0.5">No.3 Zoo Road, Kano Nigeria</p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">{t('submitInquiry')}</h3>
        
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{t('success')}</h3>
            <p className="text-sm text-gray-500">{t('inquirySent')}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{t('fullName')}</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm input-focus"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{t('email')}</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm input-focus"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{t('phone')}</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm input-focus"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm input-focus"
                placeholder="How can we help?"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{t('message')}</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm input-focus resize-none"
                  placeholder="Describe your inquiry..."
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full gradient-navy text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              <Send size={16} /> {t('send')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}