import React, { useState } from 'react';

const translations = {
  en: {
    title: "Guardify Information",
    description: "Guardify is a comprehensive security platform designed to protect your digital life. With real-time alerts, end-to-end encryption, and advanced AI-driven protection, Guardify keeps your personal data secure from cyber threats.",
    whatIsGuardify: "What is Guardify?",
    features: "Key Features",
    featureList: [
      "Real-time security alerts",
      "End-to-end encryption",
      "AI-driven protection",
      "Multi-device support",
      "24/7 customer support",
    ],
    securityBenefits: "Why Guardify is the Best Choice?",
    securityText: "Guardify provides top-tier security features, including advanced AI protection, real-time alerts, and encrypted communication, ensuring your digital presence stays protected against evolving cyber threats.",
    languageSwitch: "Switch Language",
  },
  hi: {
    title: "गार्डिफ़ाई जानकारी",
    description: "गार्डिफ़ाई एक व्यापक सुरक्षा मंच है जिसे आपके डिजिटल जीवन की रक्षा करने के लिए डिज़ाइन किया गया है। वास्तविक समय की चेतावनियों, एंड-टू-एंड एन्क्रिप्शन और उन्नत एआई-संचालित सुरक्षा के साथ, गार्डिफ़ाई आपके व्यक्तिगत डेटा को साइबर खतरों से सुरक्षित रखता है।",
    whatIsGuardify: "गार्डिफ़ाई क्या है?",
    features: "मुख्य विशेषताएँ",
    featureList: [
      "वास्तविक समय की सुरक्षा चेतावनियाँ",
      "एंड-टू-एंड एन्क्रिप्शन",
      "एआई-संचालित सुरक्षा",
      "मल्टी-डिवाइस समर्थन",
      "24/7 ग्राहक सहायता",
    ],
    securityBenefits: "गार्डिफ़ाई सबसे अच्छा क्यों है?",
    securityText: "गार्डिफ़ाई उन्नत एआई सुरक्षा, वास्तविक समय की चेतावनियों, और एन्क्रिप्टेड संचार जैसी शीर्ष-स्तरीय सुरक्षा सुविधाएँ प्रदान करता है, यह सुनिश्चित करते हुए कि आपका डिजिटल अस्तित्व विकसित हो रहे साइबर खतरों से सुरक्षित रहता है।",
    languageSwitch: "भाषा बदलें",
  },
  es: {
    title: "Información de Guardify",
    description: "Guardify es una plataforma de seguridad integral diseñada para proteger tu vida digital. Con alertas en tiempo real, cifrado de extremo a extremo y protección avanzada impulsada por IA, Guardify mantiene tus datos personales seguros contra amenazas cibernéticas.",
    whatIsGuardify: "¿Qué es Guardify?",
    features: "Características clave",
    featureList: [
      "Alertas de seguridad en tiempo real",
      "Cifrado de extremo a extremo",
      "Protección impulsada por IA",
      "Soporte para múltiples dispositivos",
      "Soporte al cliente 24/7",
    ],
    securityBenefits: "¿Por qué Guardify es la mejor opción?",
    securityText: "Guardify ofrece funciones de seguridad de primer nivel, que incluyen protección avanzada impulsada por IA, alertas en tiempo real y comunicación cifrada, asegurando que tu presencia digital esté protegida contra las amenazas cibernéticas en evolución.",
    languageSwitch: "Cambiar idioma",
  },
  fr: {
    title: "Informations sur Guardify",
    description: "Guardify est une plateforme de sécurité complète conçue pour protéger votre vie numérique. Avec des alertes en temps réel, un cryptage de bout en bout et une protection avancée alimentée par l'IA, Guardify garde vos données personnelles sécurisées contre les menaces informatiques.",
    whatIsGuardify: "Qu'est-ce que Guardify ?",
    features: "Fonctionnalités principales",
    featureList: [
      "Alertes de sécurité en temps réel",
      "Cryptage de bout en bout",
      "Protection alimentée par l'IA",
      "Prise en charge de plusieurs appareils",
      "Support client 24/7",
    ],
    securityBenefits: "Pourquoi Guardify est le meilleur choix ?",
    securityText: "Guardify offre des fonctionnalités de sécurité de premier ordre, y compris une protection avancée alimentée par l'IA, des alertes en temps réel et une communication cryptée, garantissant que votre présence numérique reste protégée contre les menaces informatiques en évolution.",
    languageSwitch: "Changer de langue",
  },
  // Add more languages here
};

const Info = () => {
  const [language, setLanguage] = useState('en'); // Language state

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-600 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">{translations[language].title}</h1>
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">{translations[language].whatIsGuardify}</h2>
        <p className="text-lg text-gray-200">{translations[language].description}</p>

        <h3 className="text-xl font-semibold mt-8">{translations[language].features}</h3>
        <ul className="list-disc pl-6 text-lg text-gray-200">
          {translations[language].featureList.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-8">{translations[language].securityBenefits}</h3>
        <p className="text-lg text-gray-200">{translations[language].securityText}</p>
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

export default Info;
