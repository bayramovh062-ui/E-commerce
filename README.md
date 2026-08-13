# 🛒 E-Commerce App (HUSEYN H.B Store)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

A fully functional E-Commerce web application built using modern **React**, **Redux Toolkit**, and **Material UI**. The project features a product catalog, real-time search, basket management, LocalStorage synchronization, Dark/Light theme modes, and direct order submission to a **Telegram Bot**.

---

## 🔥 Key Features

*   **📦 Product Catalog:** Asynchronous fetching (`createAsyncThunk`) of products via FakeStore API.
*   **🔍 Live Search System:** Real-time filtering based on product titles.
*   **🛒 Interactive Basket Management:**
    *   Add items, remove specific items, or clear the entire basket.
    *   Automatic calculation of product quantities and overall total (`reduce`).
    *   Side-drawer basket panel using **MUI Drawer**.
*   **💾 LocalStorage Persistence:** Basket state is saved in the browser’s local storage (data persists across page reloads).
*   **📲 Telegram Bot Order Integration:** Formats cart items into a detailed HTML order summary and sends it directly to a Telegram chat.
*   **🌙 Dark / ☀️ Light Mode:** Dynamic theme toggling managed globally through Redux.
*   **🔔 User Feedback (Alerts & Loader):** Toast-style feedback using Material UI Alerts and a Backdrop Loader for seamless user interaction.
*   **📱 Responsive Layout:** Flexbox layout adaptable to various screen sizes.

---

## 🛠️ Tech Stack

*   **Frontend Framework:** React.js (Vite)
*   **State Management:** Redux Toolkit (`@reduxjs/toolkit`), React-Redux
*   **Routing:** React Router DOM v6
*   **UI Components & Icons:** Material UI (MUI), React Icons
*   **HTTP Client:** Axios
*   **APIs:** FakeStore API, Telegram Bot API
*   **Styling:** CSS3 (Flexbox, Transitions)

---

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI Components
│   ├── BasketDetails.jsx  # Individual item card inside the basket
│   ├── Header.jsx         # Navigation bar with search, theme toggle, and cart icon
│   ├── Home.jsx           # Main homepage component
│   ├── Product.jsx        # Product card component in the catalog
│   ├── ProductDetails.jsx # Detailed view for individual products
│   └── ProductList.jsx    # Renders filtered product collection
├── config/              # Routing Configuration
│   └── RouteConfig.jsx
├── containers/          # Page Container Wrappers
│   └── PageContainer.jsx
├── css/                 # Component Stylesheets
│   ├── basketInformation.css
│   ├── header.css
│   ├── productDetails.css
│   └── products.css
├── redux/               # Global State Management
│   ├── slice/
│   │   ├── basketSlice.js  # Basket & modal drawer states
│   │   └── ProductSlice.js # Products, search input, and theme states
│   └── store.jsx           # Redux Store configuration
├── App.jsx              # Main Application Component (Drawer, Telegram API)
├── App.css
├── index.css
└── main.jsx

⚙️ Installation & Setup
Follow these steps to run the project locally on your machine:

1. Clone the repository:
Bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
2. Install dependencies:
Bash
npm install
3. Configure Environment Variables (.env):
Create a .env file in the root directory of the project and add your Telegram Bot credentials:

Code snippet
VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
4. Start the development server:
Bash
npm run dev
Open your browser and navigate to http://localhost:5173.

🤖 Telegram Bot Integration
When the user clicks the "Order" button in the basket drawer, the handleSendOrder function in App.jsx triggers.

The order details are structured into HTML format and dispatched to the Telegram Bot API:

Plaintext
🛒 There is a new order!

1. Fjordson Mens Watch
   • Count: 2 
   • Price: 159 ₺

----------------------------
💰 Total amount: 318 ₺
👨‍💻 Author
Hüseyn H.B

GitHub: @your-github-username

This project was developed to demonstrate practical proficiency in React and Redux Toolkit.