import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !phone || !password) {
      setError(t('fillAllFields'));
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      register(name, email, password, phone);
      setLoading(false);
      navigate('/');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-white px-6 py-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <img src="/images/logo.png" alt="NARAKA Logo" className="w-16 h-16 rounded-2xl object-cover mb-4 shadow-lg shadow-secondary/30 border border-secondary/20" />
        <h1 className="text-2xl font-bold text-gray-900">{t('createAccount')}</h1>
        <p className="text-sm text-gray-500 mt-1">Join NARAKA for exclusive travel deals</p>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
        )}
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t('fullName')}</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm input-focus"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t('email')}</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm input-focus"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t('phone')}</label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm input-focus"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t('password')}</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm input-focus"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t('confirmPassword')}</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={password}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm input-focus"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-red text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50 mt-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {t('createAccount')} <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          {t('alreadyHaveAccount')}{' '}
          <Link to="/login" className="text-primary font-semibold">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
}