import emailjs from '@emailjs/browser';

const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

// Initialize EmailJS only on the client side
if (typeof window !== 'undefined') {
  emailjs.init(emailConfig.publicKey);
}

export { emailConfig }; 