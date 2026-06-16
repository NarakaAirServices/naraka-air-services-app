import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, Package, DollarSign, ArrowLeft, TrendingUp, Calendar, Plane, Compass, Building2, FileText, Check, X, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { flightDeals, umrahPackages, visaServices, hotelDeals } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function Admin() {
  const { t, lang } = useLanguage();
  const { bookings, updateBookingStatus } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'packages', label: 'Packages', icon: Package },
  ];
  
  return (
    <div className="px-4 py-4 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t('admin')}</h2>
          <p className="text-xs text-gray-500">Management Dashboard</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen size={16} className="text-primary" />
                </div>
                <span className="text-xs text-gray-500">{t('totalBookings')}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp size={10} /> +12% this month
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign size={16} className="text-emerald-600" />
                </div>
                <span className="text-xs text-gray-500">{t('totalRevenue')}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue, 'NGN')}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp size={10} /> +8% this month
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock size={16} className="text-amber-600" />
                </div>
                <span className="text-xs text-gray-500">{t('pending')}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-xs text-gray-400 mt-1">Requires action</p>
            </div>
            <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Check size={16} className="text-emerald-600" />
                </div>
                <span className="text-xs text-gray-500">{t('confirmed')}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{confirmedCount}</p>
              <p className="text-xs text-gray-400 mt-1">Completed</p>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">Recent Bookings</h3>
            <div className="space-y-3">
              {bookings.slice(0, 5).map((booking, idx) => {
                const icons = { flight: Plane, umrah: Compass, hotel: Building2, visa: FileText };
                const Icon = icons[booking.type] || Plane;
                return (
                  <div key={booking.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{booking.title}</p>
                      <p className="text-xs text-gray-500">{formatDate(booking.createdAt)}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                );
              })}
              {bookings.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No bookings yet</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'bookings' && (
        <div className="space-y-3">
          {bookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-4 card-shadow border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{booking.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{booking.details}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{booking.id} • {formatDate(booking.createdAt)}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                  booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-sm font-bold text-secondary">{formatCurrency(booking.price, booking.currency)}</span>
                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium active:scale-95 transition"
                    >
                      Confirm
                    </button>
                  )}
                  <button
                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium active:scale-95 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {bookings.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No bookings found</p>
          )}
        </div>
      )}
      
      {activeTab === 'packages' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">Umrah Packages</h3>
            <div className="space-y-3">
              {umrahPackages.map(pkg => (
                <div key={pkg.id} className="flex items-center gap-3">
                  <img src={pkg.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{pkg.title}</p>
                    <p className="text-xs text-gray-500">{pkg.duration}</p>
                  </div>
                  <span className="text-sm font-bold text-secondary">{formatCurrency(pkg.price, pkg.currency)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">Flight Deals</h3>
            <div className="space-y-3">
              {flightDeals.slice(0, 4).map(deal => (
                <div key={deal.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plane size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{deal.from} → {deal.to}</p>
                    <p className="text-xs text-gray-500">{deal.airline}</p>
                  </div>
                  <span className="text-sm font-bold text-secondary">{formatCurrency(deal.price, deal.currency)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}