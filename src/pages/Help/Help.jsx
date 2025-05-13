import React, { useState } from 'react';

const translations = {
  en: {
    title: "Need Help?",
    faqTitle: "Frequently Asked Questions",
    questions: [
      { question: "How do I change my password?", answer: "You can change your password from the 'Settings' page." },
      { question: "How do I enable two-factor authentication?", answer: "Two-factor authentication is available under the 'Security' settings in your profile." },
      { question: "How can I contact support?", answer: "You can contact support through our 'Contact Us' page or email us directly at support@guardify.com." },
    ],
    languageSwitch: "Switch Language",
  },
  hi: {
    title: "मदद चाहिए?",
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    questions: [
      { question: "मैं अपना पासवर्ड कैसे बदलूं?", answer: "आप 'Settings' पृष्ठ से अपना पासवर्ड बदल सकते हैं।" },
      { question: "मैं दो-कारक प्रमाणीकरण कैसे सक्षम करूं?", answer: "दो-कारक प्रमाणीकरण आपके प्रोफ़ाइल के 'Security' सेटिंग्स में उपलब्ध है।" },
      { question: "मैं समर्थन से कैसे संपर्क कर सकता हूँ?", answer: "आप हमारे 'Contact Us' पृष्ठ से समर्थन से संपर्क कर सकते हैं या हमें सीधे support@guardify.com पर ईमेल कर सकते हैं।" },
    ],
    languageSwitch: "भाषा बदलें",
  },
  es: {
    title: "¿Necesitas ayuda?",
    faqTitle: "Preguntas frecuentes",
    questions: [
      { question: "¿Cómo cambio mi contraseña?", answer: "Puedes cambiar tu contraseña desde la página de 'Configuración'." },
      { question: "¿Cómo habilito la autenticación de dos factores?", answer: "La autenticación de dos factores está disponible en la configuración de 'Seguridad' de tu perfil." },
      { question: "¿Cómo puedo contactar con el soporte?", answer: "Puedes contactar con el soporte a través de nuestra página de 'Contáctanos' o enviarnos un correo electrónico directamente a support@guardify.com." },
    ],
    languageSwitch: "Cambiar idioma",
  },
  fr: {
    title: "Besoin d'aide ?",
    faqTitle: "Questions fréquemment posées",
    questions: [
      { question: "Comment changer mon mot de passe ?", answer: "Vous pouvez changer votre mot de passe depuis la page 'Paramètres'." },
      { question: "Comment activer l'authentification à deux facteurs ?", answer: "L'authentification à deux facteurs est disponible dans les paramètres de 'Sécurité' de votre profil." },
      { question: "Comment contacter le support ?", answer: "Vous pouvez contacter le support via notre page 'Contactez-nous' ou nous envoyer un e-mail directement à support@guardify.com." },
    ],
    languageSwitch: "Changer de langue",
  },
  // Add more languages here
};

const Help = () => {
  const [language, setLanguage] = useState('en'); // Language state

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-600 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">{translations[language].title}</h1>
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">{translations[language].faqTitle}</h2>
        <ul className="space-y-4 text-lg text-gray-300">
          {translations[language].questions.map((faq, index) => (
            <li key={index}>
              <strong>{faq.question}</strong> {faq.answer}
            </li>
          ))}
        </ul>
      </div>

      {/* Language Selector */}
      <div className="mt-6">
        <label htmlFor="language-switch" className="text-lg">{translations[language].languageSwitch}: </label>
        <select
          id="language-switch"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );
};

export default Help;
