# PixelHub Host – Premium Minecraft Server Hosting

Welcome to the **PixelHub Host** official website repository!  
PixelHub Host provides premium Minecraft server hosting with top performance, advanced DDoS protection, and reliable, multilingual support.  
This website serves as the main landing page, offering information about our services, pricing, features, company values, and support resources.

---

## 🌐 Website Features

- **Multilingual Support**  
  Available in English, German, Portuguese, French, and Italian.  
  Additional languages can be added by creating new translation files in [src/config/languages](./src/config/languages).

- **Modern Design**  
  Responsive, clean, and user-friendly interface, with a dark-theme toggle.

- **Service Info**  
  Detailed descriptions of hosting plans, features, and our company mission.

- **Integrated Contact Options**  
  Quick access to support via Discord, WhatsApp, and Email.

- **Legal & Policy Pages**  
  Includes Privacy Policy, Terms of Service, Legal disclaimers, and other necessary documentation.

- **Maintenance/Construction Mode**  
  An “Under Construction” page can be shown during maintenance or service downtime.

---

## 🚀 Getting Started

### 🟢 Easiest Way (Made for Windows)

Just run the setup script and everything will be done for you:

```cmd
run.bat
```

This will:

- Copy `.env.example` to `.env` (if it doesn't exist)
- Update npm to the latest compatible version for your Node.js
- Install all dependencies
- Start the development server

Then, open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 🟢 Easiest Way (Made for Linux/Ubuntu)

Just run the setup script and everything will be done for you:

```bash
./run.sh
```

This will:

- Install or update Node.js (LTS) and npm to the latest compatible version
- Copy `.env.example` to `.env` (if it doesn't exist)
- Install all dependencies
- Start the development server

Then, open [http://localhost:5173](http://localhost:5173) in your browser.

---

### ⚙️ Manual Way

1. **Clone the Repository**

   ```bash
   git clone https://github.com/KingIronMan2011/pixelhubhost-website.git
   cd pixelhubhost-website
   ```

2. **Create the .env File**

   - **On Windows:**

     ```cmd
     copy .env.example .env
     ```

   - **On Linux/macOS:**

     ```bash
     cp .env.example .env
     ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

5. **Open in Browser**  
   Visit [http://localhost:5173](http://localhost:5173) to view the site.

---

## 🛠️ Tech Stack

- **Frontend:** React (with TypeScript)
- **Routing:** React Router
- **Translations:** Custom solution see [`src/config/languages`](./src/config/languages)
- **Styling:** Inline styles and CSS

---

## 🌍 Languages

The site supports the following languages:

- **English**
- **Deutsch (German)**
- **Português (Portuguese)**
- **Français (French)**
- **Italiano (Italian)**

Translations are managed in [`src/config/languages`](./src/config/languages).

---

## 📄 Pages

- **Home**
- **About Us**
- **Legal**
- **Privacy Policy**
- **Terms of Service**
- **Sitemap**

---

## 📋 TODOs

See [TODO.md](./TODO.md) for the current project tasks and checks.

---

## 🤝 Contribution Guidelines

We welcome contributions from everyone! To contribute:

1. **Fork** this repository.
2. **Make your changes** and commit with clear messages.
3. **Test your changes** locally to ensure nothing is broken.
4. **Push** your commit to the main branch to your forked repo:

   ```bash
   git push origin main
   ```

5. **Open a Pull Request** on GitHub, describing your changes and referencing any related issues.

**Tips:**

- Please follow the existing code style.
- Add translations if you add new user-facing text.
- For major changes, open an issue first to discuss what you’d like to change.
- Be respectful and constructive in code reviews and discussions.

Thank you for helping improve PixelHub Host!

---

## 📞 Contact

- **Discord:** [Join Server](https://discord.gg/mquaVhs5sr)
- **WhatsApp:** [Contact on WhatsApp](https://wa.me/5516993981473)
- **Email:** <contato@pixelhubhost.com>

---

## 📝 License

This project is licensed under the MIT License.  
See [LICENSE](./LICENSE.txt) for more details.

---

**PixelHub Host – Empowering your Minecraft community!**
