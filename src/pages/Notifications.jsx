import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Tag, Check, AlertCircle, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';

export default function Notifications() {
  const { t, lang } = useLanguage();
  const { notifications, markNotificationRead } = useAuth();
  
  const getIcon = (type) => {
    switch (type) {
      case 'deal': return Tag;
      case 'confirmation': return Check;
      case 'alert': return AlertCircle;
      default: return Bell;
    }
  };
  
  const getIconColor = (type) => {
    switch (type) {
      case 'deal': return 'bg-secondary/10 text-secondary';
      case 'confirmation': return 'bg-emerald-500/10 text-emerald-600';
      case 'alert': return 'bg-amber-500/10 text-amber-600';
      default: return 'bg-primary/10 text-primary';
    }
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('notifications')}</h2>
        <p className="text-sm text-gray-500">{lang === 'ha' ? 'Duba sanarwanku' : 'Stay updated with your bookings & deals'}</p>
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Bell size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">{lang === 'ha' ? 'Babu sanarwa tukuna' : 'No notifications yet'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif, idx) => {
            const Icon = getIcon(notif.type);
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => markNotificationRead(notif.id)}
                className={`flex items-start gap-3 p-4 rounded-xl transition cursor-pointer ${
                  notif.read ? 'bg-white border border-gray-100' : 'bg-primary/5 border border-primary/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notif.type)}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className={`text-sm font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notif.title}
                      </h4>
                      <p className={`text-xs mt-0.5 ${notif.read ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notif.message}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5">{formatDate(notif.date)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}