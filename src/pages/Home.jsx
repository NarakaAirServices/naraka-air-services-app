import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Compass, FileText, Building2, ChevronRight, Star, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { flightDeals, umrahPackages, popularDestinations, testimonials } from '../data/mockData';
import { formatCurrency, whatsappLink } from '../utils/helpers';

const serviceCards = [
  { key: 'flights', icon: Plane, color: 'bg-primary/10 text-primary', path: '/flights' },
  { key: 'umrah', icon: Compass, color: 'bg-secondary/10 text-secondary', path: '/umrah' },
  { key: 'visa', icon: FileText, color: 'bg-emerald-500/10 text-emerald-600', path: '/visa' },
  { key: 'hotels', icon: Building2, color: 'bg-amber-500/10 text-amber-600', path: '/hotels' },
];

export default function Home() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredDeals = [...flightDeals, ...umrahPackages.filter(p => p.featured)].slice(0, 4);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  const heroSlides = [
    { title: 'Explore the World', titleHa: 'Bincika Duniya', subtitle: 'Premium flights to 50+ destinations', subtitleHa: 'Jiragen sama na musamman zuwa wurare 50+', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop' },
    { title: 'Sacred Journeys', titleHa: 'Tafiye-Tafiyen Mai Tsarki', subtitle: 'Umrah packages designed for your peace of mind', subtitleHa: 'Bukaten Umrah da aka tsara don kwancin hankali', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop' },
    { title: 'Visa Made Easy', titleHa: 'A Saukake Visa', subtitle: 'Expert visa assistance for all countries', subtitleHa: 'Taimakon visa na kwararru ga duk kasashe', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop' },
  ];

  return (
    <div className="pb-6">
      {/* Hero Carousel */}
      <div className="relative h-64 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ opacity: idx === currentSlide ? 1 : 0, scale: idx === currentSlide ? 1 : 1.1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent z-10" />
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={idx === currentSlide ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white text-shadow mb-2"
              >
                {lang === 'ha' ? slide.titleHa : slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={idx === currentSlide ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="text-white/90 text-sm max-w-[260px] text-shadow"
              >
                {lang === 'ha' ? slide.subtitleHa : slide.subtitle}
              </motion.p>
            </div>
          </motion.div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Welcome */}
      <div className="px-4 py-4">
        <p className="text-gray-500 text-sm">{t('hello')}, {user?.name || t('guest')}</p>
        <h2 className="text-lg font-bold text-gray-900">{t('welcome')}</h2>
      </div>

      {/* Quick Services */}
      <div className="px-4 grid grid-cols-4 gap-3 mb-6">
        {serviceCards.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.button
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(service.path)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center shadow-sm`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{t(service.key)}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Featured Deals */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">{t('featuredDeals')}</h3>
          <button onClick={() => navigate('/flights')} className="flex items-center text-xs font-medium text-primary">
            {t('viewAll')} <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {featuredDeals.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              onClick={() => navigate(deal.duration ? '/umrah' : '/flights')}
              className="flex gap-3 bg-white rounded-xl p-3 card-shadow border border-gray-100 active:scale-[0.98] transition-transform"
            >
              <img src={deal.image} alt="" className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {deal.title ? (lang === 'ha' ? deal.titleHa : deal.title) : `${deal.from} → ${deal.to}`}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {deal.airline || deal.hotel || deal.duration}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-secondary whitespace-nowrap">
                    {formatCurrency(deal.price, deal.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {deal.type || deal.duration}
                  </span>
                  <button className="text-xs font-medium text-primary flex items-center gap-0.5">
                    {t('bookNow')} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="px-4 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">{t('popularDestinations')}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {popularDestinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex-shrink-0 w-36 relative rounded-xl overflow-hidden card-shadow"
            >
              <img src={dest.image} alt={dest.name} className="w-36 h-44 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm">{lang === 'ha' ? dest.nameHa : dest.name}</p>
                <p className="text-white/80 text-xs">{dest.country}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-4 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">{t('testimonials')}</h3>
        <div className="space-y-3">
          {testimonials.map((tItem, idx) => (
            <motion.div
              key={tItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-white rounded-xl p-4 card-shadow border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {tItem.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{tItem.name}</p>
                  <p className="text-[10px] text-gray-500">{tItem.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {lang === 'ha' ? tItem.textHa : tItem.text}
              </p>
              <div className="flex items-center gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < tItem.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Banner */}
      <div className="mx-4 rounded-2xl gradient-navy p-5 text-white mb-6">
        <div className="flex items-center gap-3 mb-3">
          <img src="/images/logo.png" alt="NARAKA" className="w-12 h-12 rounded-full object-cover bg-white/20 p-1 border border-white/30" />
          <div>
            <h3 className="font-bold">{t('trust')}</h3>
            <p className="text-xs text-white/70">{t('since')}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-lg py-2.5 flex items-center justify-center gap-2 text-xs font-medium">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a href="tel:+2348033534218" className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-lg py-2.5 flex items-center justify-center gap-2 text-xs font-medium">
            <Phone size={16} /> {t('callUs')}
          </a>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-4" />
    </div>
  );
}