import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Compass, Building2, FileText, ChevronRight, X, Check, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function Bookings() {
  const { t, lang } = useLanguage();
  const { bookings } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  const getIcon = (type) => {
    switch (type) {
      case 'flight': return Plane;
      case 'umrah': return Compass;
      case 'hotel': return Building2;
      case 'visa': return FileText;
      default: return Plane;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return Check;
      case 'pending': return Clock;
      case 'cancelled': return X;
      default: return AlertCircle;
    }
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('bookings')}</h2>
        <p className="text-sm text-gray-500">{lang === 'ha' ? 'Lissafin biki da ka yi' : 'Track and manage your bookings'}</p>
      </div>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Plane size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm font-medium">{t('noBookings')}</p>
          <p className="text-gray-400 text-xs mt-1">{lang === 'ha' ? 'Fara biki jirgi ko wani aiki' : 'Start by booking a flight or a trip'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking, idx) => {
            const Icon = getIcon(booking.type);
            const StatusIcon = getStatusIcon(booking.status);
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedBooking(booking)}
                className="bg-white rounded-2xl p-4 card-shadow border border-gray-100 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{booking.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{booking.details}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 flex-shrink-0 ${getStatusColor(booking.status)}`}>
                        <StatusIcon size={10} /> {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-secondary">{formatCurrency(booking.price, booking.currency)}</span>
                      <span className="text-[10px] text-gray-400">{booking.id}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      
      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="bg-white w-full max-w-[430px] rounded-t-2xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">{t('details')}</h3>
                <button onClick={() => setSelectedBooking(null)} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{t('bookingRef')}</span>
                  <span className="text-xs font-semibold text-gray-900">{selectedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{t('status')}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{t('date')}</span>
                  <span className="text-xs font-semibold text-gray-900">{formatDate(selectedBooking.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{t('price')}</span>
                  <span className="text-xs font-semibold text-secondary">{formatCurrency(selectedBooking.price, selectedBooking.currency)}</span>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700">{selectedBooking.title}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedBooking.details}</p>
              </div>
              
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold"
              >
                {t('close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}