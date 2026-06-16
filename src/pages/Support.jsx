import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, MessageCircle, Phone, Mail, MapPin, Clock, ChevronRight, Send, X, Check, User, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { whatsappLink, phoneCall, emailLink } from '../utils/helpers';

export default function Support() {
  const { t, lang } = useLanguage();
  const { addNotification } = useAuth();
  
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! Welcome to NARAKA AIR SERVICES. How can I help you today?', sender: 'bot', time: '10:00' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  const quickActions = [
    { icon: MessageCircle, label: 'WhatsApp', action: () => window.open(whatsappLink(), '_blank'), color: 'bg-emerald-500 text-white' },
    { icon: Phone, label: t('callUs'), action: () => window.location.href = phoneCall(), color: 'bg-primary text-white' },
    { icon: Mail, label: t('emailUs'), action: () => window.location.href = emailLink(), color: 'bg-secondary text-white' },
  ];
  
  const faqItems = [
    { q: 'How do I book a flight?', qHa: 'Ta yaya zan yi biki jirgi?', a: 'You can book flights directly from the Flights tab. Search your route, select a flight, and proceed to payment.', aHa: 'Kana iya yin biki jirgi kai tsaye daga shafin Flights. Nemi hanyar ka, zaɓi jirgi, ci gaba da biya.' },
    { q: 'What documents are needed for Umrah?', qHa: 'Wane takardun ake bukata don Umrah?', a: 'You need a valid passport, visa, vaccination certificate, and sometimes a Mahram letter for women.', aHa: 'Kana bukatar fasfo mai aiki, visa, takardar allurar, wani lokaci kuma takardar Mahram domin mata.' },
    { q: 'How long does visa processing take?', qHa: 'Ya kwanan aiki aiwatar da visa?', a: 'Processing time varies by country. Umrah visas take 5-7 days, while UK/US visas may take 2-4 weeks.', aHa: 'Lokacin aiwatarwa ya bambanta dangane da ƙasa. Visa na Umrah yana ɗaukar kwanaki 5-7, yayin da visa na Birtaniya/Amurka zai iya ɗaukar mako 2-4.' },
    { q: 'Can I modify my booking?', qHa: 'Zan iya canza lissafin biki na?', a: 'Yes, you can modify your booking up to 48 hours before departure. Please contact our support team.', aHa: "I, zaka iya canza lissafin biki har sa'o'i 48 kafin fita. Da fatan za a tuntube ƙungiyarmu." },
  ];
  
  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { id: Date.now(), text: chatInput, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
    
    setTimeout(() => {
      const botReply = { 
        id: Date.now() + 1, 
        text: 'Thank you for your message. A customer service representative will be with you shortly. For immediate assistance, please call or WhatsApp us.', 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setChatMessages(prev => [...prev, botReply]);
    }, 1500);
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('support')}</h2>
        <p className="text-sm text-gray-500">{lang === 'ha' ? 'Muna nan tare da ku' : 'We are here to help you 24/7'}</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={action.action}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${action.color} shadow-sm active:scale-95 transition-transform`}
            >
              <Icon size={24} />
              <span className="text-xs font-semibold">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Office Info */}
      <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">{t('ourAddress')}</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">NARAKA AIR SERVICES LTD</p>
              <p className="text-xs text-gray-500">No.3 Zoo Road, Kano Nigeria</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">{lang === 'ha' ? 'Aiki' : 'Working Hours'}</p>
              <p className="text-xs text-gray-500">Mon - Sat: 8:00 AM - 6:00 PM WAT</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">{lang === 'ha' ? 'Lambar Wayya' : 'Phone'}</p>
              <p className="text-xs text-gray-500">+234 803 353 4218</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-xs text-gray-500">info@narakaairservice.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ */}
      <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">{lang === 'ha' ? 'Tambayoyin da Ake Yawan Yi' : 'Frequently Asked Questions'}</h3>
        <div className="space-y-2">
          {faqItems.map((faq, idx) => (
            <details key={idx} className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                <span className="text-sm font-medium text-gray-900 pr-4">{lang === 'ha' ? faq.qHa : faq.q}</span>
                <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
              </summary>
              <p className="text-sm text-gray-600 px-3 py-2">{lang === 'ha' ? faq.aHa : faq.a}</p>
            </details>
          ))}
        </div>
      </div>
      
      {/* Live Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="bg-white w-full max-w-[430px] rounded-t-2xl overflow-hidden max-h-[80vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="bg-primary text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t('liveChat')}</p>
                    <p className="text-[10px] text-white/70">{lang === 'ha' ? 'Yana aiki yanzu' : 'Online now'}</p>
                  </div>
                </div>
                <button onClick={() => setShowChat(false)} className="p-1 rounded-full hover:bg-white/10">
                  <X size={18} />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[50vh]">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                      msg.sender === 'user' ? 'bg-primary text-white rounded-br-md' : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input */}
              <div className="p-3 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                    placeholder={lang === 'ha' ? 'Rubuta sako...' : 'Type a message...'}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm input-focus"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}