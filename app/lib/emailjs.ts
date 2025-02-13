import emailjs from '@emailjs/browser';

const emailConfig = {
  serviceId: 'service_bied9pp',
  templateId: 'template_rox9dta',
  publicKey: 'TcM8srp88PGMsI-TT',
};

// Initialize EmailJS
if (typeof window !== 'undefined' && emailConfig.publicKey) {
  emailjs.init(emailConfig.publicKey);
}

export { emailConfig }; 