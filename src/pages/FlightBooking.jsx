import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ArrowRightLeft, Calendar, Users, Search, Filter, ArrowRight, Check, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { flightDeals, nigerianCities, internationalCities } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function FlightBooking() {
  const { t, lang } = useLanguage();
  const { user, addBooking } = useAuth();
  const navigate = useNavigate();
  
  const [tripType, setTripType] = useState('oneWay');
  const [origin, setOrigin] = useState('Abuja');
  const [destination, setDestination] = useState('Dubai');
  const [departDate, setDepartDate] = useState('2024-08-15');
  const [returnDate, setReturnDate] = useState('2024-08-25');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [showResults, setShowResults] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const allCities = [...nigerianCities, ...internationalCities];
  
  const filteredFlights = useMemo(() => {
    if (!showResults) return [];
    return flightDeals.filter(f => {
      const matchOrigin = f.from === origin;
      const matchDest = f.to === destination;
      return matchOrigin || matchDest || (f.type === 'international' && destination !== 'Lagos');
    }).slice(0, 5);
  }, [showResults, origin, destination]);
  
  const handleSearch = () => {
    if (!origin || !destination) return;
    setShowResults(true);
  };
  
  const handleBook = (flight) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedFlight(flight);
    setShowPayment(true);
  };
  
  const handlePayment = () => {
    const booking = {
      type: 'flight',
      title: `${selectedFlight.from} → ${selectedFlight.to}`,
      details: `${selectedFlight.airline} • ${formatDate(departDate)} • ${passengers} passenger(s)`,
      price: selectedFlight.price * passengers,
      currency: selectedFlight.currency,
      status: 'confirmed',
    };
    addBooking(booking);
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPayment(false);
      setPaymentSuccess(false);
      setSelectedFlight(null);
      navigate('/bookings');
    }, 2000);
  };
  
  return (
    <div className="px-4 py-4 pb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t('searchFlights')}</h2>
      
      {/* Search Form */}
      <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100 mb-4">
        {/* Trip Type */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
          {['oneWay', 'roundTrip'].map(type => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition ${
                tripType === type ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
              }`}
            >
              {t(type)}
            </button>
          ))}
        </div>
        
        {/* Origin & Destination */}
        <div className="relative mb-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">{t('origin')}</label>
              <select
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-900 appearance-none input-focus"
              >
                {allCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center pt-5">
              <button 
                onClick={() => { setOrigin(destination); setDestination(origin); }}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-primary transition"
              >
                <ArrowRightLeft size={18} />
              </button>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">{t('destination')}</label>
              <select
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-900 appearance-none input-focus"
              >
                {allCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
        
        {/* Dates */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">{t('departure')}</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="date"
                value={departDate}
                onChange={e => setDepartDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium text-gray-900 input-focus"
              />
            </div>
          </div>
          {tripType === 'roundTrip' && (
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">{t('return')}</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium text-gray-900 input-focus"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Passengers & Class */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">{t('passengers')}</label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="number"
                min={1}
                max={9}
                value={passengers}
                onChange={e => setPassengers(parseInt(e.target.value) || 1)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium text-gray-900 input-focus"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Class</label>
            <select
              value={cabinClass}
              onChange={e => setCabinClass(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-900 appearance-none input-focus"
            >
              {['economy', 'business', 'firstClass'].map(c => (
                <option key={c} value={c}>{t(c)}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          className="w-full gradient-navy text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg shadow-primary/30"
        >
          <Search size={18} /> {t('search')}
        </button>
      </div>
      
      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">{t('searchResults')}</h3>
              <button className="flex items-center gap-1 text-xs text-primary font-medium">
                <Filter size={14} /> {t('filter')}
              </button>
            </div>
            
            {filteredFlights.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">{t('noResults')}</div>
            ) : (
              <div className="space-y-3">
                {filteredFlights.map((flight, idx) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl p-4 card-shadow border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Plane size={16} className="text-primary" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{flight.airline}</span>
                      </div>
                      <span className="text-lg font-bold text-secondary">{formatCurrency(flight.price, flight.currency)}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">{flight.from}</p>
                        <p className="text-xs text-gray-500">{flight.time}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-1">
                        <div className="h-px flex-1 bg-gray-200" />
                        <Plane size={14} className="text-gray-400 rotate-90" />
                        <div className="h-px flex-1 bg-gray-200" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">{flight.to}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={10} /> {flight.duration}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                        {flight.type}
                      </span>
                      <button
                        onClick={() => handleBook(flight)}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold active:scale-95 transition-transform"
                      >
                        {t('bookNow')}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
                    {selectedFlight?.from} → {selectedFlight?.to} • {formatCurrency(selectedFlight?.price * passengers, selectedFlight?.currency)}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">{t('cardNumber')}</label>
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">{t('expiry')}</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">{t('cvv')}</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm input-focus"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    className="w-full gradient-red text-white py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
                  >
                    {t('pay')} {formatCurrency(selectedFlight?.price * passengers, selectedFlight?.currency)}
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full mt-2 py-3 text-sm text-gray-500 font-medium"
                  >
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