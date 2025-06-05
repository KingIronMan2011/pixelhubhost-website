import React, { useState, useEffect } from "react";
import { Server, Signal, Copy, Check, Info } from "lucide-react";
import { usePterodactyl } from "../hooks/usePterodactyl";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages"; // updated import
import { SERVER_LIMITS } from "../config/config";
import type { Language } from "../config/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "@headlessui/react";

// Use translations from new languagesConfig
const translations = Object.fromEntries(
  Object.entries(languagesConfig).map(([lang, obj]) => [
    lang,
    {
      domainCopied: obj.texts?.domainCopied || "Domain copied!",
      serverOffline: obj.texts?.serverOffline || "Server Offline",
      checking: obj.texts?.checking || "Checking...",
      testServer: obj.texts?.testServer || "Test Server",
      connectToTestServer:
        obj.texts?.connectToTestServer || "Connect to Test Server",
      domain: obj.texts?.domain || "Domain",
      bedrockPort: obj.texts?.bedrockPort || "Bedrock Port",
      cpu: obj.texts?.cpu || "CPU",
      memory: obj.texts?.memory || "Memory",
    },
  ])
);

const siteConfig = {
  texts: Object.fromEntries(
    Object.entries(languagesConfig).map(([lang, obj]) => [
      lang,
      obj.texts || {},
    ])
  ),
};

type NotificationProps = {
  onClose: () => void;
  language: Language;
};

const CopyNotification: React.FC<NotificationProps> = ({
  onClose,
  language,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 animate-fade-in-out">
        <Check className="w-5 h-5 text-green-500" />
        <span className="text-base font-semibold text-gray-900 dark:text-white">
          {translations[language].domainCopied}
        </span>
      </div>
      <style>
        {`
          .animate-fade-in-out {
            animation: fadeInOut 1.5s;
          }
          @keyframes fadeInOut {
            0% { opacity: 0; transform: scale(0.95);}
            10% { opacity: 1; transform: scale(1);}
            90% { opacity: 1; transform: scale(1);}
            100% { opacity: 0; transform: scale(0.95);}
          }
        `}
      </style>
    </div>
  );
};

type ConnectPopupProps = {
  onClose: () => void;
  language: Language;
  serverDomain: string;
  bedrockPort: string;
};

const ConnectPopup: React.FC<ConnectPopupProps> = ({
  onClose,
  language,
  serverDomain,
  bedrockPort,
}) => {
  const t =
    languagesConfig[language as keyof typeof languagesConfig]?.texts ||
    languagesConfig.en.texts;
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);

  // Use react-toastify for all copy notifications
  const handleCopy = async (
    value: string,
    setCopiedFn: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedFn(true);
      toast.success(translations[language].domainCopied);
      setTimeout(() => setCopiedFn(false), 1500);
    } catch (err) {
      toast.error("Copy failed");
    }
  };

  const buttonIcon = copiedDomain ? (
    <Check className="w-4 h-4" />
  ) : (
    <Copy className="w-4 h-4" />
  );
  const buttonIconPort = copiedPort ? (
    <Check className="w-4 h-4" />
  ) : (
    <Copy className="w-4 h-4" />
  );

  return (
    <Dialog open={true} onClose={onClose}>
      <Dialog.Panel>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700 relative animate-fade-in-down">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-bold transition-colors"
              aria-label="Close"
            >
              x
            </button>
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t.howToConnect}
              </h3>
            </div>
            <div className="space-y-8">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {t.javaTitle}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  {t.javaDesc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-blue-600 dark:text-blue-400 text-sm select-all shadow-inner">
                    {serverDomain}
                  </span>
                  <button
                    onClick={() => handleCopy(serverDomain, setCopiedDomain)}
                    className={`p-1 rounded transition-all duration-200 text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30 ${
                      copiedDomain ? "bg-blue-100 dark:bg-blue-900/30" : ""
                    }`}
                    title={t.copyDomain}
                  >
                    {buttonIcon}
                  </button>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {t.bedrockTitle}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  {t.bedrockDesc}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-blue-600 dark:text-blue-400 text-sm select-all shadow-inner">
                    {serverDomain}
                  </span>
                  <button
                    onClick={() => handleCopy(serverDomain, setCopiedDomain)}
                    className={`p-1 rounded transition-all duration-200 text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30 ${
                      copiedDomain ? "bg-blue-100 dark:bg-blue-900/30" : ""
                    }`}
                    title={t.copyDomain}
                  >
                    {buttonIcon}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-green-600 dark:text-green-400 text-sm select-all shadow-inner">
                    {bedrockPort}
                  </span>
                  <button
                    onClick={() => handleCopy(bedrockPort, setCopiedPort)}
                    className={`p-1 rounded transition-all duration-200 text-gray-700 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30 ${
                      copiedPort ? "bg-green-100 dark:bg-green-900/30" : ""
                    }`}
                    title={t.copyPort}
                  >
                    {buttonIconPort}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <style>
            {`
              .animate-fade-in-down {
                animation: fadeInDownPopup 0.22s cubic-bezier(.4,0,.2,1);
              }
              @keyframes fadeInDownPopup {
                0% { opacity: 0; transform: translateY(-16px);}
                100% { opacity: 1; transform: translateY(0);}
              }
            `}
          </style>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar
        />
      </Dialog.Panel>
    </Dialog>
  );
};

const testServerId = import.meta.env.VITE_PTERODACTYL_TEST_SERVER_ID;

const TestServer: React.FC = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showConnectPopup, setShowConnectPopup] = useState(false);
  const serverDomain = "test.pixelhubhost.com";
  const bedrockPort = "19132";

  const { status, loading, error } = usePterodactyl(testServerId);

  const handleCopy = async (
    value: string,
    setCopiedFn: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      toast.success(translations[language].domainCopied);
      setCopiedFn(true);
      setTimeout(() => setCopiedFn(false), 1500);
    } catch (err) {
      toast.error("Copy failed");
    }
  };

  const buttonIcon = copied ? (
    <Check className="w-4 h-4" />
  ) : (
    <Copy className="w-4 h-4" />
  );
  const buttonIconPort = copiedPort ? (
    <Check className="w-4 h-4" />
  ) : (
    <Copy className="w-4 h-4" />
  );

  const memoryUsagePercent = status?.memory?.current
    ? Math.round((status.memory.current / SERVER_LIMITS.MEMORY) * 100)
    : 0;

  const cpuUsagePercent = status?.cpu?.current
    ? Math.round((status.cpu.current / SERVER_LIMITS.CPU) * 100)
    : 0;

  if (!testServerId) {
    return (
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <h2 className="text-red-700 dark:text-red-300 text-lg font-semibold">
                Configuration Error
              </h2>
              <p className="text-red-600 dark:text-red-400 mt-2">
                Server ID is missing from environment variables
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-8 pb-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500 relative overflow-hidden">
      {showNotification && (
        <CopyNotification
          onClose={() => setShowNotification(false)}
          language={language}
        />
      )}
      {showConnectPopup && (
        <ConnectPopup
          onClose={() => setShowConnectPopup(false)}
          language={language}
          serverDomain={serverDomain}
          bedrockPort={bedrockPort}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto relative">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Server className="w-7 h-7 text-blue-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {siteConfig.texts[language].testServer}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    (1.7.2 - 1.21.5)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Signal
                  className={`w-5 h-5 ${
                    status?.state === "running"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    status?.state === "running"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {loading
                    ? siteConfig.texts[language].checking
                    : status?.state || siteConfig.texts[language].serverOffline}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50/90 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center bg-gray-100/70 dark:bg-gray-800/70 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    {siteConfig.texts[language].domain}:
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {serverDomain}
                  </span>
                  <button
                    onClick={() => handleCopy(serverDomain, setCopied)}
                    className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-white"
                    title={translations[language].domainCopied}
                  >
                    {buttonIcon}
                  </button>
                </div>
                <div className="flex items-center bg-gray-100/70 dark:bg-gray-800/70 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    {siteConfig.texts[language].bedrockPort}:
                  </span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white font-medium">
                    {bedrockPort}
                  </span>
                  <button
                    onClick={() => handleCopy(bedrockPort, setCopiedPort)}
                    className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-white"
                    title={translations[language].domainCopied}
                  >
                    {buttonIconPort}
                  </button>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <img
                    src="https://flagcdn.com/w40/br.png"
                    alt="Brazil flag"
                    className="w-5 h-3"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">
                    Igarapava, SP
                  </span>
                </div>
              </div>
              {status && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">
                        {siteConfig.texts[language].cpu}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.floor(cpuUsagePercent)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${cpuUsagePercent}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">
                        {siteConfig.texts[language].memory}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.round(status.memory.current / 1024 / 1024)}MB
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${memoryUsagePercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowConnectPopup(true)}
                className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-all transform hover:-translate-y-0.5 duration-200 shadow-lg hover:shadow-xl"
              >
                {siteConfig.texts[language].connectToTestServer}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar
      />
    </section>
  );
};

export default TestServer;
