import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('narkauser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  
  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem('narkabookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('narkanotifs');
      return stored ? JSON.parse(stored) : [
        { id: 1, title: 'Welcome to NARAKA AIR SERVICES', message: 'Book your first flight and get 5% off!', type: 'deal', read: false, date: new Date().toISOString() },
        { id: 2, title: 'Umrah Season 2024', message: 'Early bird packages now available. Limited slots!', type: 'deal', read: false, date: new Date().toISOString() },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('narkauser', JSON.stringify(user));
    else localStorage.removeItem('narkauser');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('narkabookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('narkanotifs', JSON.stringify(notifications));
  }, [notifications]);

  const login = (email, password) => {
    // Mock login - in real app, this would call an API
    const mockUser = {
      id: '1',
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '+234 800 000 0000',
      avatar: null,
      role: email.includes('admin') ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    return true;
  };

  const register = (name, email, password, phone) => {
    const mockUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      avatar: null,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addBooking = (booking) => {
    const newBooking = {
      id: `NAR-${Date.now()}`,
      ...booking,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
    addNotification({
      title: 'Booking Received',
      message: `Your ${booking.type} booking has been received and is being processed.`,
      type: 'confirmation',
    });
    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: Date.now(),
      ...notif,
      read: false,
      date: new Date().toISOString(),
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider value={{
      user, login, logout, register,
      bookings, addBooking, updateBookingStatus,
      notifications, addNotification, markNotificationRead, unreadCount,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);