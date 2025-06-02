import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/site";

const legalTexts = {
  title: {
    en: "Legal Notice",
    de: "Impressum",
    fr: "Mentions légales",
    pt: "Aviso Legal",
  },
  intro: {
    en: "This page contains legal information and the site operator's contact details.",
    de: "Diese Seite enthält rechtliche Hinweise und die Kontaktdaten des Seitenbetreibers.",
    fr: "Cette page contient les informations légales et les coordonnées de l'exploitant du site.",
    pt: "Esta página contém informações legais e os dados de contato do operador do site.",
  },
  operator: {
    en: "Site Operator",
    de: "Seitenbetreiber",
    fr: "Exploitant du site",
    pt: "Operador do site",
  },
  company: {
    en: "Company Name: PixelHubHost",
    de: "Firmenname: PixelHubHost",
    fr: "Nom de l'entreprise : PixelHubHost",
    pt: "Nome da empresa: PixelHubHost",
  },
  website: {
    en: "Website: https://www.pixelhubhost.com",
    de: "Webseite: https://www.pixelhubhost.com",
    fr: "Site web : https://www.pixelhubhost.com",
    pt: "Site: https://www.pixelhubhost.com",
  },
  address: {
    en: "Address: Igarapava, Sao Paulo, Brazil",
    de: "Adresse: Igarapava, São Paulo, Brasilien",
    fr: "Adresse : Igarapava, São Paulo, Brésil",
    pt: "Endereço: Igarapava, São Paulo, Brasil",
  },
  supportEmail: {
    en: "Support Email: contato@pixelhubhost.com",
    de: "Support-E-Mail: contato@pixelhubhost.com",
    fr: "E-mail support : contato@pixelhubhost.com",
    pt: "E-mail de suporte: contato@pixelhubhost.com",
  },
  billingEmail: {
    en: "Billing Email: no-reply@pixelhubhost.com",
    de: "Rechnungs-E-Mail: no-reply@pixelhubhost.com",
    fr: "E-mail facturation : no-reply@pixelhubhost.com",
    pt: "E-mail de cobrança: no-reply@pixelhubhost.com",
  },
  phone: {
    en: "Support Phone: +55 16 99398-1473",
    de: "Support-Telefon: +55 16 99398-1473",
    fr: "Téléphone support : +55 16 99398-1473",
    pt: "Telefone de suporte: +55 16 99398-1473",
  },
  contact: {
    en: "Contact",
    de: "Kontakt",
    fr: "Contact",
    pt: "Contato",
  },
  disclaimer: {
    en: "Disclaimer: All information is provided without guarantee. For questions, please contact us.",
    de: "Haftungsausschluss: Alle Angaben erfolgen ohne Gewähr. Bei Fragen kontaktieren Sie uns bitte.",
    fr: "Avertissement : Toutes les informations sont fournies sans garantie. Pour toute question, veuillez nous contacter.",
    pt: "Aviso legal: Todas as informações são fornecidas sem garantia. Em caso de dúvidas, entre em contato conosco.",
  },
  copyright: {
    en: "All content on this website is © PixelHubHost unless otherwise stated.",
    de: "Alle Inhalte dieser Website sind © PixelHubHost, sofern nicht anders angegeben.",
    fr: "Tout le contenu de ce site est © PixelHubHost sauf indication contraire.",
    pt: "Todo o conteúdo deste site é © PixelHubHost, salvo indicação em contrário.",
  },
  liability: {
    en: "Liability for content: While we strive to keep the information on our website up to date, we do not accept any liability for the content provided. External links are the responsibility of the respective operators.",
    de: "Haftung für Inhalte: Wir bemühen uns, die Informationen auf unserer Website aktuell zu halten, übernehmen jedoch keine Haftung für die bereitgestellten Inhalte. Für externe Links sind die jeweiligen Betreiber verantwortlich.",
    fr: "Responsabilité du contenu : Nous nous efforçons de maintenir les informations de notre site à jour, mais nous n'acceptons aucune responsabilité pour le contenu fourni. Les liens externes relèvent de la responsabilité de leurs opérateurs respectifs.",
    pt: "Responsabilidade pelo conteúdo: Nos esforçamos para manter as informações do site atualizadas, mas não aceitamos responsabilidade pelo conteúdo fornecido. Links externos são de responsabilidade dos respectivos operadores.",
  },
  jurisdiction: {
    en: "Jurisdiction: The laws of Brazil apply. Place of jurisdiction is Igarapava, SP.",
    de: "Gerichtsstand: Es gilt das Recht von Brasilien. Gerichtsstand ist Igarapava, SP.",
    fr: "Juridiction : Les lois du Brésil s'appliquent. Le lieu de juridiction est Igarapava, SP.",
    pt: "Jurisdição: Aplicam-se as leis do Brasil. O foro é Igarapava, SP.",
  },
};

// Example usage:

const Legal: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {legalTexts.title[language]}
        </h1>
        <p className="mb-4 text-lg">{legalTexts.intro[language]}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {legalTexts.operator[language]}
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{legalTexts.company[language]}</li>
          <li>
            {legalTexts.website[language].split(":")[0] + ":"}{" "}
            <a
              href="https://www.pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.pixelhubhost.com
            </a>
          </li>
          <li>{legalTexts.address[language]}</li>
          <li>
            {legalTexts.supportEmail[language].split(":")[0] + ":"}{" "}
            <a
              href="mailto:contato@pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
            >
              contato@pixelhubhost.com
            </a>
          </li>
          <li>
            {legalTexts.billingEmail[language].split(":")[0] + ":"}{" "}
            <a
              href="mailto:no-reply@pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
            >
              no-reply@pixelhubhost.com
            </a>
          </li>
          <li>
            {legalTexts.phone[language].split(":")[0] + ":"}{" "}
            <a
              href="tel:+5516993981473"
              className="text-blue-400 hover:underline break-all"
            >
              +55 16 99398-1473
            </a>
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">
          {legalTexts.contact[language]}
        </h3>
        <div className="mb-4">
          <a
            href={siteConfig.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
          >
            {siteConfig.texts.aboutUsContact[language]}
          </a>
        </div>
        <div className="mt-8 space-y-3 text-gray-400 text-sm">
          <p>{legalTexts.disclaimer[language]}</p>
          <p>{legalTexts.liability[language]}</p>
          <p>{legalTexts.jurisdiction[language]}</p>
          <p>{legalTexts.copyright[language]}</p>
        </div>
      </div>
    </section>
  );
};

export default Legal;
