import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages"; // fixed casing to match other imports

const privacyTexts = {
  title: {
    en: "Privacy Policy",
    de: "Datenschutzerklärung",
    fr: "Politique de confidentialité",
    pt: "Política de Privacidade",
  },
  intro: {
    en: "We take your privacy seriously. This page explains what data we collect and how we use it.",
    de: "Wir nehmen den Schutz Ihrer Daten ernst. Diese Seite erklärt, welche Daten wir erheben und wie wir sie verwenden.",
    fr: "Nous prenons votre vie privée au sérieux. Cette page explique quelles données nous collectons et comment nous les utilisons.",
    pt: "Levamos sua privacidade a sério. Esta página explica quais dados coletamos e como os utilizamos.",
  },
  data: {
    en: "We only collect data necessary for providing our services. This may include your email address, username, and usage data.",
    de: "Wir erheben nur Daten, die für die Bereitstellung unserer Dienste notwendig sind. Dazu können Ihre E-Mail-Adresse, Ihr Benutzername und Nutzungsdaten gehören.",
    fr: "Nous ne collectons que les données nécessaires à la fourniture de nos services. Cela peut inclure votre adresse e-mail, votre nom d'utilisateur et des données d'utilisation.",
    pt: "Coletamos apenas os dados necessários para fornecer nossos serviços. Isso pode incluir seu endereço de e-mail, nome de usuário e dados de uso.",
  },
  cookies: {
    en: "We may use cookies to improve your experience. You can disable cookies in your browser settings.",
    de: "Wir verwenden möglicherweise Cookies, um Ihr Erlebnis zu verbessern. Sie können Cookies in den Einstellungen Ihres Browsers deaktivieren.",
    fr: "Nous pouvons utiliser des cookies pour améliorer votre expérience. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.",
    pt: "Podemos usar cookies para melhorar sua experiência. Você pode desativar os cookies nas configurações do seu navegador.",
  },
  thirdParty: {
    en: "We do not share your data with third parties except as required by law or to provide our services.",
    de: "Wir geben Ihre Daten nicht an Dritte weiter, außer wenn dies gesetzlich vorgeschrieben ist oder zur Bereitstellung unserer Dienste erforderlich ist.",
    fr: "Nous ne partageons pas vos données avec des tiers, sauf si la loi l'exige ou pour fournir nos services.",
    pt: "Não compartilhamos seus dados com terceiros, exceto quando exigido por lei ou para fornecer nossos serviços.",
  },
  contact: {
    en: "If you have questions about our privacy policy, please contact us.",
    de: "Wenn Sie Fragen zu unserer Datenschutzerklärung haben, kontaktieren Sie uns bitte.",
    fr: "Si vous avez des questions concernant notre politique de confidentialité, veuillez nous contacter.",
    pt: "Se você tiver dúvidas sobre nossa política de privacidade, entre em contato conosco.",
  },
};

const Privacy: React.FC = () => {
  const { language } = useLanguage();
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {privacyTexts.title[language]}
        </h1>
        <p className="mb-4 text-lg">{privacyTexts.intro[language]}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {config.name}
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{privacyTexts.data[language]}</li>
          <li>{privacyTexts.cookies[language]}</li>
          <li>{privacyTexts.thirdParty[language]}</li>
        </ul>
        <p className="mb-4">{privacyTexts.contact[language]}</p>
        <div className="mt-8 text-center">
          <a
            href={config.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
          >
            {texts.aboutUsContact}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
