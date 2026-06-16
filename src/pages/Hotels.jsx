import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Star, Search, Filter, ArrowRight, X, Check, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { hotelDeals } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

export default function Hotels() {
  const { t, lang } = useLanguage();
  const { user, addBooking } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [checkIn, setCheckIn] = useState('2024-08-15');
  const [checkOut, setCheckOut] = useState('2024-08-18');
  const [guests, setGuests] = useState(2);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const filteredHotels = hotelDeals.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleBook = (hotel) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedHotel(hotel);
    setShowBooking(true);
  };
  
  const handlePayment = () => {
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = selectedHotel.price * nights * Math.ceil(guests / 2);
    
    const booking = {
      type: 'hotel',
      title: selectedHotel.name,
      details: `${nights} nights • ${checkIn} to ${checkOut} • ${guests} guests`,
      price: total,
      currency: selectedHotel.currency,
      status: 'confirmed',
    };
    addBooking(booking);
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowBooking(false);
      setPaymentSuccess(false);
      setSelectedHotel(null);
      navigate('/bookings');
    }, 2000);
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('hotels')}</h2>
        <p className="text-sm text-gray-500">{lang === 'ha' ? 'Gidajen hotel masu kyau a duniya' : 'Premium hotels worldwide at best prices'}</p>
      </div>
      
      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={lang === 'ha' ? 'Nemi hotel ko wuri...' : 'Search hotels or destinations...'}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm input-focus card-shadow"
        />
      </div>
      
      {/* Hotels List */}
      <div className="space-y-4">
        {filteredHotels.map((hotel, idx) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100"
          >
            <div className="relative h-44">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {formatCurrency(hotel.price, hotel.currency)}<span className="font-normal text-gray-500">/night</span>
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg text-shadow">{hotel.name}</h3>
                <div className="flex items-center gap-2 text-white/90 text-xs mt-1">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {hotel.location}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-gray-900">{hotel.rating}</span>
                  <span className="text-xs text-gray-500">({hotel.reviews} reviews)</span>
                </div>
              </div>
              
              <button
                onClick={() => handleBook(hotel)}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                {t('bookNow')} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
        
        {filteredHotels.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">{t('noResults')}</div>
        )}
      </div>
      
      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedHotel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="bg-white w-full max-w-[430px] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {paymentSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{t('success')}</h3>
                  <p className="text-sm text-gray-500">{t('bookingConfirmed')}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900">{selectedHotel.name}</h3>
                    <button onClick={() => setShowBooking(false)} className="p-1 rounded-full hover:bg-gray-100">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Check In</label>
                        <div className="relative">
                          <Calendar size={14} className="absolute left-3 top-3 text-gray-400" />
                          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm input-focus" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Check Out</label>
                        <div className="relative">
                          <Calendar size={14} className="absolute left-3 top-3 text-gray-400" />
                          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm input-focus" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Guests</label>
                      <div className="relative">
                        <Users size={14} className="absolute left-3 top-3 text-gray-400" />
                        <input type="number" min={1} value={guests} onChange={e => setGuests(parseInt(e.target.value) || 1)} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm input-focus" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">{formatCurrency(selectedHotel.price, selectedHotel.currency)} x {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                      <span className="font-semibold">{formatCurrency(selectedHotel.price * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)), selectedHotel.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>{formatCurrency(selectedHotel.price * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * Math.ceil(guests / 2), selectedHotel.currency)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    className="w-full gradient-red text-white py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
                  >
                    {t('payNow')}
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