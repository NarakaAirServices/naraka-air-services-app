import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Grid3X3, User, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const { t } = useLanguage();
  const { unreadCount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { key: 'home', icon: Home, label: t('home'), path: '/' },
    { key: 'bookings', icon: ClipboardList, label: t('bookings'), path: '/bookings' },
    { key: 'services', icon: Grid3X3, label: t('services'), path: '/services' },
    { key: 'profile', icon: User, label: t('profile'), path: '/profile' },
    { key: 'support', icon: Headphones, label: t('support'), path: '/support' },
  ];
  
  // Don't show bottom nav on auth pages or admin
  const hidePaths = ['/login', '/register', '/admin'];
  if (hidePaths.some(p => location.pathname.startsWith(p))) return null;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom max-w-[430px] mx-auto">
      <div className="flex items-center justify-around h-16">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path || (tab.path !== '/' && location.pathname.startsWith(tab.path));
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {tab.key === 'bookings' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}