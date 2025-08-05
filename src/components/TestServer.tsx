import React, { useState, useEffect } from 'react';
import { Server, Signal, Copy, Check, Info } from 'lucide-react';
import i18n from '../i18n';
import languages from '../config/languages/Languages';
import { SERVER_LIMITS, config } from '../config/config';
import type { LanguageKey } from '../config/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';

// siteConfig now only holds the texts, without top-level language detection
const siteConfig: {
  texts: Record<string, { [key: string]: string }>;
} = {
  texts: Object.fromEntries(
    Object.entries(languages).map(([lang, obj]) => [
      lang,
      Object.fromEntries(
        Object.entries(obj.texts || {}).filter(([, value]) => typeof value === 'string') as [
          string,
          string,
        ][],
      ),
    ]),
  ),
};

// Translations are still generated for each language
const translations = Object.fromEntries(
  Object.entries(languages).map(([lang, obj]) => [
    lang,
    {
      domainCopied: obj.texts?.domainCopied,
      serverOffline: obj.texts?.testServerOffline,
      checking: obj.texts?.checking,
      testServer: obj.texts?.testServer,
      connectToTestServer: obj.texts?.connectToTestServer,
      domain: obj.texts?.domain,
      bedrockPort: obj.texts?.bedrockPort,
      cpu: obj.texts?.cpu,
      memory: obj.texts?.memory,
      copyDomain: obj.texts?.copyDomain,
      copyPort: obj.texts?.copyPort,
      javaOnly: obj.texts?.javaOnly,
    },
  ]),
);

type NotificationProps = {
  onClose: () => void;
  language: LanguageKey;
};

const CopyNotification: React.FC<NotificationProps> = ({ onClose, language }) => {
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
  language: LanguageKey;
  serverDomain: string;
  bedrockPort: string;
};

const ConnectPopup: React.FC<ConnectPopupProps> = ({
  onClose,
  language,
  serverDomain,
  bedrockPort,
}) => {
  const t = languages[language as keyof typeof languages]?.texts || languages.en.texts;
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);

  // Use react-toastify for all copy notifications
  const handleCopy = async (
    value: string,
    setCopiedFn: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedFn(true);
      toast.success(translations[language].domainCopied);
      setTimeout(() => setCopiedFn(false), 1500);
    } catch (err) {
      toast.error('Copy failed');
    }
  };

  const buttonIcon = copiedDomain ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />;
  const buttonIconPort = copiedPort ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />;

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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.howToConnect}</h3>
            </div>
            <div className="space-y-8">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{t.javaTitle}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{t.javaDesc}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-blue-600 dark:text-blue-400 text-sm select-all shadow-inner">
                    {serverDomain}
                  </span>
                  <button
                    onClick={() => handleCopy(serverDomain, setCopiedDomain)}
                    className="p-1 rounded transition-all duration-200 text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30"
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
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{t.bedrockDesc}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-blue-600 dark:text-blue-400 text-sm select-all shadow-inner">
                    {serverDomain}
                  </span>
                  <button
                    onClick={() => handleCopy(serverDomain, setCopiedDomain)}
                    className="p-1 rounded transition-all duration-200 text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30"
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
                    className="p-1 rounded transition-all duration-200 text-gray-700 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30"
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
        <ToastContainer position="bottom-center" autoClose={1500} hideProgressBar />
      </Dialog.Panel>
    </Dialog>
  );
};

const disableExternalServices = import.meta.env.VITE_DISABLE_EXTERNAL_SERVICES === 'true';

// Main TestServer component
const TestServer: React.FC = () => {
  const currentLanguage = i18n.language || 'en';
  const texts = siteConfig.texts[currentLanguage] || siteConfig.texts.en;

  // State for copy feedback and popups
  const [copied, setCopied] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showConnectPopup, setShowConnectPopup] = useState(false);

  // Server connection info
  const serverDomain = 'jogar.pixelhubhost.com';
  const bedrockPort = '19132';

  // --- NEW: Fetch server status from your backend API ---
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (disableExternalServices) return;
    setLoading(true);
    setError(null);

    const fetchStatus = async () => {
      const apiUrl = config.apiUrl;
      try {
        const res = await fetch(`${apiUrl}:4002/pterodactyl/proxy`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to fetch server status');
        }
        const data = await res.json();
        setStatus(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch server status');
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Optionally poll every 10 seconds for live updates:
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [disableExternalServices]);

  // Use currentLanguage everywhere instead of undefined variable "language"
  const handleCopy = async (
    value: string,
    setCopiedFn: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for insecure context
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      toast.success(getTranslation('domainCopied'));
      setCopiedFn(true);
      setShowNotification(true);
      setTimeout(() => {
        setCopiedFn(false);
        setShowNotification(false);
      }, 1500);
    } catch (err) {
      toast.error('Copy failed');
    }
  };

  // Icons for copy buttons (checkmark if copied)
  const buttonIcon = copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />;
  const buttonIconPort = copiedPort ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />;

  // Framer Motion hover animation for copy and connect buttons
  const buttonHover = {
    scale: 1.045,
    boxShadow: '0 8px 32px 0 rgba(16,185,129,0.13)',
    transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
  };
  const copyHover = {
    scale: 1.13,
    backgroundColor: 'rgba(59,130,246,0.13)', // blue-500/20
    transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
  };
  const copyHoverGreen = {
    scale: 1.13,
    backgroundColor: 'rgba(16,185,129,0.13)', // emerald-500/20
    transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
  };

  // Calculate memory and CPU usage as percentages
  const memoryUsagePercent = status?.memory?.current
    ? Math.round((status.memory.current / SERVER_LIMITS.MEMORY) * 100)
    : 0;
  const cpuUsagePercent = status?.cpu?.current
    ? Math.round((status.cpu.current / SERVER_LIMITS.CPU) * 100)
    : 0;

  // After loading is false, check for empty data
  if (!loading && (!status || Object.keys(status).length === 0)) {
    return (
      <div className="text-center text-gray-500 py-8">
        {siteConfig.texts[currentLanguage].noServerStatus || 'No server status available.'}
      </div>
    );
  }

  const getText = (key: string) =>
    siteConfig.texts[currentLanguage]?.[key] ?? siteConfig.texts.en?.[key] ?? key;

  const getServerStatusText = (mappedState?: string) => {
    if (loading) return getText('checking');
    if (!mappedState) return getText('testServerOffline');
    switch (mappedState) {
      case 'testServerStarting':
        return getText('testServerStarting');
      case 'testServerRunning':
        return getText('testServerRunning');
      case 'testServerStopping':
        return getText('testServerStopping');
      case 'testServerOffline':
        return getText('testServerOffline');
      default:
        return getText('testServerOffline');
    }
  };

  function mapServerState(state?: string) {
    if (state === 'running') return 'testServerRunning';
    if (state === 'starting') return 'testServerStarting';
    if (state === 'stopping') return 'testServerStopping';
    if (state === 'offline') return 'testServerOffline';
    return 'testServerOffline';
  }

  const mappedState = mapServerState(status?.state);

  // Define the allowed translation keys for type safety
  type TranslationKey =
    | 'domainCopied'
    | 'serverOffline'
    | 'checking'
    | 'testServer'
    | 'connectToTestServer'
    | 'domain'
    | 'bedrockPort'
    | 'cpu'
    | 'memory'
    | 'copyDomain'
    | 'copyPort'
    | 'javaOnly';

  // Add this helper if not already present in your component:
  const getTranslation = (key: TranslationKey) =>
    translations[currentLanguage]?.[key] ?? translations.en?.[key] ?? key;

  return (
    // Main section with background and padding
    <section className="pt-8 pb-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500 relative overflow-hidden">
      {/* Show notification when something is copied */}
      {showNotification && (
        <CopyNotification
          onClose={() => setShowNotification(false)}
          language={currentLanguage as LanguageKey}
        />
      )}
      {/* Show popup with connection instructions */}
      {showConnectPopup && (
        <ConnectPopup
          onClose={() => setShowConnectPopup(false)}
          language={currentLanguage as LanguageKey}
          serverDomain={serverDomain}
          bedrockPort={bedrockPort}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto relative">
          {/* Animated card for test server info */}
          <motion.div
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Header: server icon, name, and version info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Server className="w-7 h-7 text-blue-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {texts.testServer}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">(1.16 - 1.21.7)</p>
                </div>
              </div>
              {/* Server status indicator */}
              <div className="flex items-center space-x-2">
                <Signal
                  className={`w-5 h-5 ${
                    mappedState === 'testServerRunning' ? 'text-green-500' : 'text-red-500'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    mappedState === 'testServerRunning' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {getServerStatusText(mappedState)}
                </span>
              </div>
            </div>

            {/* Error message if fetching server status fails */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50/90 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Domain and port info with copy buttons */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                {/* Java/Bedrock domain */}
                <div className="flex items-center bg-gray-100/70 dark:bg-gray-800/70 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    {getText('domain')}:
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {serverDomain}
                  </span>
                  {/* Copy domain button */}
                  <motion.button
                    onClick={() => handleCopy(serverDomain, setCopied)}
                    className="ml-2 p-1 rounded transition-colors text-gray-700 dark:text-white"
                    title={getTranslation('domainCopied')}
                    whileHover={copyHover}
                    whileFocus={copyHover}
                    whileTap={{
                      scale: 1.04,
                      backgroundColor: 'rgba(59,130,246,0.18)',
                    }}
                    style={{ willChange: 'transform, background-color' }}
                  >
                    {buttonIcon}
                  </motion.button>
                </div>
                <div className="flex items-center bg-gray-100/70 dark:bg-gray-800/70 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    {getText('bedrockPort')}:
                  </span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white font-medium">
                    {bedrockPort}
                  </span>
                  {/* Copy bedrock port button */}
                  <motion.button
                    onClick={() => handleCopy(bedrockPort, setCopiedPort)}
                    className="ml-2 p-1 rounded transition-colors text-gray-700 dark:text-white"
                    title={getTranslation('domainCopied')}
                    whileHover={copyHoverGreen}
                    whileFocus={copyHoverGreen}
                    whileTap={{
                      scale: 1.04,
                      backgroundColor: 'rgba(16,185,129,0.18)',
                    }}
                    style={{ willChange: 'transform, background-color' }}
                  >
                    {buttonIconPort}
                  </motion.button>
                </div>
                {/* Server location info */}
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <ReactCountryFlag
                    countryCode="BR"
                    svg
                    style={{
                      width: '1.25em',
                      height: '1em',
                    }}
                    title="Brazil"
                    aria-label="Brazil flag"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Igarapava, SP</span>
                </div>
              </div>
              {/* Server resource usage bars */}
              {status && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">
                        {siteConfig.texts[currentLanguage].cpu}
                      </span>
                      <span className="text-sm text-gray-500">{cpuUsagePercent}%</span>
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
                        {siteConfig.texts[currentLanguage].memory}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {status.memory.current
                          ? `${Math.round(status.memory.current / 1024 / 1024)}MB (${memoryUsagePercent}%)`
                          : `0MB (0%)`}
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

            {/* Button to open connect instructions popup */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                onClick={() => setShowConnectPopup(true)}
                className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-all duration-200 shadow-lg"
                whileHover={buttonHover}
                whileFocus={buttonHover}
                whileTap={{ scale: 1.04, backgroundColor: '#059669' }} // mobile tap animation
                style={{ willChange: 'transform, box-shadow' }}
              >
                {getText('connectToTestServer')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Toast notifications for copy actions */}
      <ToastContainer position="bottom-center" autoClose={1500} hideProgressBar />
    </section>
  );
};

export default TestServer;
