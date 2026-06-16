export const formatCurrency = (amount, currency = 'NGN') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const whatsappLink = (message = '') => {
  const phone = '2348033534218';
  const text = encodeURIComponent(message || 'Hello NARAKA AIR SERVICES, I need assistance with my travel plans.');
  return `https://wa.me/${phone}?text=${text}`;
};

export const phoneCall = () => 'tel:+2348033534218';
export const emailLink = () => 'mailto:info@narakaairservice.com';