import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Calendar, MapPin, Hotel, Plane, Utensils, Bus, User, ArrowRight, Shield, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { umrahPackages } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

export default function UmrahPackages() {
  const { t, lang } = useLanguage();
  const { user, addBooking } = useAuth();
  const navigate = useNavigate();
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [departDate, setDepartDate] = useState('2024-09-15');
  
  const handleBook = (pkg) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedPackage(pkg);
    setShowBooking(true);
  };
  
  const handleConfirm = () => {
    setShowBooking(false);
    setShowPayment(true);
  };
  
  const handlePayment = () => {
    const booking = {
      type: 'umrah',
      title: lang === 'ha' ? selectedPackage.titleHa : selectedPackage.title,
      details: `${selectedPackage.duration} • ${selectedPackage.hotel} • ${formatDate(departDate)}`,
      price: selectedPackage.price,
      currency: selectedPackage.currency,
      status: 'confirmed',
    };
    addBooking(booking);
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPayment(false);
      setPaymentSuccess(false);
      setSelectedPackage(null);
      navigate('/bookings');
    }, 2000);
  };
  
  const formatDate = (d) => new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('umrah')}</h2>
        <p className="text-sm text-gray-500">{lang === 'ha' ? 'Bukaten Umrah na musamman' : 'Special Umrah packages for your spiritual journey'}</p>
      </div>
      
      {/* Featured Banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden mb-6 card-shadow">
        <img src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop" alt="Kaaba" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-white/90 text-xs font-medium">{lang === 'ha' ? 'Mafi kyawu a 2024' : 'Best Rated 2024'}</span>
          </div>
          <h3 className="text-white font-bold text-lg text-shadow">{lang === 'ha' ? 'Tafiya zuwa Gida mai Tsarki' : 'Journey to the Holy Land'}</h3>
        </div>
      </div>
      
      {/* Packages */}
      <div className="space-y-4">
        {umrahPackages.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100"
          >
            <div className="relative h-44">
              <img src={pkg.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {formatCurrency(pkg.price, pkg.currency)}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg text-shadow">
                  {lang === 'ha' ? pkg.titleHa : pkg.title}
                </h3>
                <div className="flex items-center gap-3 text-white/90 text-xs mt-1">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {lang === 'ha' ? pkg.durationHa : pkg.duration}</span>
                  <span className="flex items-center gap-1"><Hotel size={12} /> {lang === 'ha' ? pkg.hotelHa : pkg.hotel}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t('packageIncludes')}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(lang === 'ha' ? pkg.includesHa : pkg.includes).map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                    <Check size={12} className="text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handleBook(pkg)}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                {t('bookNow')} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedPackage && (
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">{t('selectPackage')}</h3>
                <button onClick={() => setShowBooking(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-sm text-gray-900">{lang === 'ha' ? selectedPackage.titleHa : selectedPackage.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{lang === 'ha' ? selectedPackage.hotelHa : selectedPackage.hotel}</p>
                <p className="text-lg font-bold text-secondary mt-2">{formatCurrency(selectedPackage.price, selectedPackage.currency)}</p>
              </div>
              
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1 block">{t('departure')}</label>
                <input
                  type="date"
                  value={departDate}
                  onChange={e => setDepartDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus"
                />
              </div>
              
              <button
                onClick={handleConfirm}
                className="w-full gradient-navy text-white py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
              >
                {t('payNow')} {formatCurrency(selectedPackage.price, selectedPackage.currency)}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => !paymentSuccess && setShowPayment(false)}
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
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{t('securePayment')}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {lang === 'ha' ? selectedPackage?.titleHa : selectedPackage?.title} • {formatCurrency(selectedPackage?.price, selectedPackage?.currency)}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">{t('cardNumber')}</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus" />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">{t('expiry')}</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">{t('cvv')}</label>
                        <input type="text" placeholder="123" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus" />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    className="w-full gradient-red text-white py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
                  >
                    {t('pay')} {formatCurrency(selectedPackage?.price, selectedPackage?.currency)}
                  </button>
                  <button onClick={() => setShowPayment(false)} className="w-full mt-2 py-3 text-sm text-gray-500 font-medium">
                    {t('cancel')}
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