import React from "react";
import { Link } from "react-router-dom";
import { translate } from "../utils/translate";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import MetaTags from "../components/MetaTags";

const NotFound: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      <MetaTags
        title={translate("notFoundTitle", language)}
        description={translate("notFoundMessage", language)}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-300 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {translate("notFoundTitle", language)}
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          {translate("notFoundMessage", language)}
        </p>
        <motion.div whileHover={{ scale: 1.08 }}>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {translate("backToHome", language)}
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
