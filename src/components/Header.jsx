import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, ArrowLeft, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const { unreadCount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  
  const showBack = location.pathname !== '/' && location.pathname !== '/home';
  
  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="flex items-center justify-between px-4 h-14">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 active:bg-white/20 transition">
            <ArrowLeft size={22} />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="NARAKA" className="w-8 h-8 rounded-full object-cover border border-white/30" />
            <span className="font-bold text-sm tracking-wide">{t('appName')}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium transition"
          >
            <Globe size={14} />
            {lang === 'en' ? 'EN' : 'HA'}
          </button>
          
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-primary">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition"
          >
            {showMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary overflow-hidden border-t border-white/10"
          >
            <div className="px-4 py-2 space-y-1">
              {[
                { label: t('home'), path: '/' },
                { label: t('flights'), path: '/flights' },
                { label: t('umrah'), path: '/umrah' },
                { label: t('visa'), path: '/visa' },
                { label: t('hotels'), path: '/hotels' },
                { label: t('contactUs'), path: '/contact' },
              ].map(item => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setShowMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}