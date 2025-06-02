import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/site";

const tosTexts = {
  title: {
    en: "Terms of Service",
    de: "Nutzungsbedingungen",
    fr: "Conditions d'utilisation",
    pt: "Termos de Serviço",
  },
  intro: {
    en: "By using our website and services, you agree to the following terms.",
    de: "Durch die Nutzung unserer Website und Dienste stimmen Sie den folgenden Bedingungen zu.",
    fr: "En utilisant notre site et nos services, vous acceptez les conditions suivantes.",
    pt: "Ao usar nosso site e serviços, você concorda com os seguintes termos.",
  },
  usage: {
    en: "You must not use our services for illegal or abusive purposes.",
    de: "Sie dürfen unsere Dienste nicht für illegale oder missbräuchliche Zwecke verwenden.",
    fr: "Vous ne devez pas utiliser nos services à des fins illégales ou abusives.",
    pt: "Você não deve usar nossos serviços para fins ilegais ou abusivos.",
  },
  account: {
    en: "You are responsible for maintaining the security of your account.",
    de: "Sie sind für die Sicherheit Ihres Kontos verantwortlich.",
    fr: "Vous êtes responsable de la sécurité de votre compte.",
    pt: "Você é responsável por manter a segurança da sua conta.",
  },
  changes: {
    en: "We may update these terms at any time. Continued use means acceptance of the new terms.",
    de: "Wir können diese Bedingungen jederzeit aktualisieren. Die fortgesetzte Nutzung gilt als Zustimmung zu den neuen Bedingungen.",
    fr: "Nous pouvons mettre à jour ces conditions à tout moment. L'utilisation continue vaut acceptation des nouvelles conditions.",
    pt: "Podemos atualizar estes termos a qualquer momento. O uso contínuo implica aceitação dos novos termos.",
  },
  contact: {
    en: "If you have questions about our terms, please contact us.",
    de: "Wenn Sie Fragen zu unseren Bedingungen haben, kontaktieren Sie uns bitte.",
    fr: "Si vous avez des questions concernant nos conditions, veuillez nous contacter.",
    pt: "Se você tiver dúvidas sobre nossos termos, entre em contato conosco.",
  },
};

const Terms: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {tosTexts.title[language]}
        </h1>
        <p className="mb-4 text-lg">{tosTexts.intro[language]}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {siteConfig.name}
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{tosTexts.usage[language]}</li>
          <li>{tosTexts.account[language]}</li>
          <li>{tosTexts.changes[language]}</li>
        </ul>
        <p className="mb-4">{tosTexts.contact[language]}</p>
        <div className="mt-8 text-center">
          <a
            href={siteConfig.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
          >
            {siteConfig.texts.aboutUsContact[language]}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Terms;
