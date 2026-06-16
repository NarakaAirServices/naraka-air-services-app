import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, LogOut, Shield, ChevronRight, Globe, Bell, Bookmark, Settings, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { t, lang, setLang } = useLanguage();
  const { user, logout, bookings } = useAuth();
  const navigate = useNavigate();
  
  const [showLangModal, setShowLangModal] = useState(false);
  
  const menuItems = [
    { icon: Bookmark, label: t('bookings'), count: bookings.length, path: '/bookings', color: 'text-primary' },
    { icon: Bell, label: t('notifications'), count: 0, path: '/notifications', color: 'text-amber-500' },
    { icon: Users, label: 'Admin Panel', path: '/admin', color: 'text-emerald-500', adminOnly: true },
    { icon: Settings, label: 'Settings', path: '#', color: 'text-gray-500' },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{t('profile')}</h2>
      </div>
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-navy rounded-2xl p-5 text-white mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-2 border-white/30">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-bold text-lg">{user?.name}</h3>
            <div className="flex items-center gap-3 text-sm text-white/80 mt-1">
              <span className="flex items-center gap-1"><Mail size={12} /> {user?.email}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-white/80 mt-0.5">
              <Phone size={12} /> {user?.phone}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
          <Shield size={14} className="text-emerald-300" />
          <span className="text-xs text-white/70">Verified Account • Member since {new Date(user?.createdAt).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}</span>
        </div>
      </motion.div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 text-center card-shadow border border-gray-100">
          <p className="text-xl font-bold text-primary">{bookings.length}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">{t('bookings')}</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center card-shadow border border-gray-100">
          <p className="text-xl font-bold text-secondary">{bookings.filter(b => b.status === 'confirmed').length}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">{t('confirmed')}</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center card-shadow border border-gray-100">
          <p className="text-xl font-bold text-amber-500">{bookings.filter(b => b.status === 'pending').length}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">{t('pending')}</p>
        </div>
      </div>
      
      {/* Menu */}
      <div className="bg-white rounded-2xl card-shadow border border-gray-100 overflow-hidden mb-6">
        <button
          onClick={() => setShowLangModal(true)}
          className="w-full flex items-center gap-3 px-4 py-4 border-b border-gray-50 active:bg-gray-50 transition"
        >
          <Globe size={20} className="text-primary" />
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900">{t('language')}</p>
            <p className="text-xs text-gray-500">{lang === 'en' ? t('english') : t('hausa')}</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
        
        {menuItems.filter(item => !item.adminOnly || user?.role === 'admin').map((item, idx) => (
          <button
            key={item.label}
            onClick={() => item.path !== '#' && navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-4 ${idx < menuItems.length - 1 ? 'border-b border-gray-50' : ''} active:bg-gray-50 transition`}
          >
            <item.icon size={20} className={item.color} />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
            </div>
            {item.count > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{item.count}</span>
            )}
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </div>
      
      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-4 bg-white rounded-2xl card-shadow border border-gray-100 active:bg-red-50 transition text-red-600"
      >
        <LogOut size={20} />
        <span className="text-sm font-semibold">{t('logout')}</span>
      </button>
      
      {/* Language Modal */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setShowLangModal(false)}>
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            className="bg-white w-full max-w-[430px] rounded-t-2xl p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-gray-900 mb-4">{t('language')}</h3>
            <div className="space-y-2">
              {[
                { code: 'en', label: t('english') },
                { code: 'ha', label: t('hausa') },
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setShowLangModal(false); }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
                    lang === l.code ? 'border-primary bg-primary/5' : 'border-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{l.label}</span>
                  {lang === l.code && <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}