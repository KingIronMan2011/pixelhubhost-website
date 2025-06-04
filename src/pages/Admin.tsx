import React, { useState, useEffect } from "react";

// Set this to true to enable the Admin page, or false to disable it
const ADMIN_ENABLED = false;

const ADMIN_PASSWORD = "KingJulian#2011@10";
const ADMIN_AUTH_KEY = "pixelhub_admin_authenticated";

// Dummy fetch and save functions for demonstration
const fetchFile = async (file: string) => {
  const res = await fetch(`/api/admin/file/${file}`);
  if (!res.ok) throw new Error("Failed to fetch file");
  return await res.text();
};

const saveFile = async (file: string, content: string) => {
  const res = await fetch(`/api/admin/file/${file}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: content,
  });
  if (!res.ok) throw new Error("Failed to save file");
  return true;
};

const Admin: React.FC = () => {
  // Option to disable the Admin page
  if (!ADMIN_ENABLED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
        <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl text-center">
          <h2 className="text-3xl font-extrabold mb-2 text-blue-700 dark:text-blue-300 tracking-tight">
            Admin Page Disabled
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            The admin panel is currently disabled.
          </p>
        </div>
      </div>
    );
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Editor state
  const [activeFile, setActiveFile] = useState<
    "index.html" | "config.ts" | "plans.ts"
  >("index.html");
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Check localStorage for authentication on mount
  useEffect(() => {
    if (localStorage.getItem(ADMIN_AUTH_KEY) === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load file content when activeFile changes
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetchFile(activeFile).then((content) => {
        setFileContent(content);
        setLoading(false);
      });
    }
  }, [activeFile, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
    } else {
      setError("Incorrect password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const handleFileChange = (file: "index.html" | "config.ts" | "plans.ts") => {
    setActiveFile(file);
    setSaveMsg("");
  };

  const handleSave = async () => {
    setLoading(true);
    await saveFile(activeFile, fileContent);
    setLoading(false);
    setSaveMsg("Saved!");
    setTimeout(() => setSaveMsg(""), 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors pt-15">
        <form
          onSubmit={handleLogin}
          className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-5 w-full max-w-sm border border-gray-200 dark:border-gray-800 mt-10"
        >
          <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-700 dark:text-blue-300 tracking-tight">
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg shadow transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors pt-15">
      {/* Side menu */}
      <aside className="w-56 min-h-screen bg-white/80 dark:bg-gray-900/80 border-r border-gray-200 dark:border-gray-800 shadow-lg flex flex-col py-20 px-4 mt-10">
        <nav>
          <ul className="flex flex-col gap-6">
            <li>
              <a
                href="#settings"
                className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-medium transition-colors text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <main
        className="flex-1 p-8 max-w-3xl mx-auto flex flex-col justify-start"
        style={{ marginTop: "120px" }}
      >
        <section
          id="settings"
          className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
            Settings
          </h2>
          <div className="mb-6 flex gap-4">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFile === "index.html"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => handleFileChange("index.html")}
            >
              index.html
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFile === "config.ts"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => handleFileChange("config.ts")}
            >
              config.ts
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFile === "plans.ts"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => handleFileChange("plans.ts")}
            >
              plans.ts
            </button>
          </div>
          <div>
            {loading ? (
              <div className="text-center text-blue-500">Loading...</div>
            ) : (
              <textarea
                className="w-full h-72 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                spellCheck={false}
              />
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors disabled:opacity-60"
            >
              Save
            </button>
            {saveMsg && (
              <span className="ml-4 text-green-600 font-medium self-center">
                {saveMsg}
              </span>
            )}
          </div>
        </section>
        <footer className="text-center py-6 text-gray-500 dark:text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} Admin Panel
        </footer>
      </main>
    </div>
  );
};

export default Admin;
