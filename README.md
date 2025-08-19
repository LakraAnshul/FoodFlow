# 🍽️ Food-Flow

### 🚀 Project Title & Badges
[![Vite](https://img.shields.io/badge/vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232A.svg?style=flat-square&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/supabase-%233ECF8E.svg?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)

### ✨ Introduction & Live Demo
Food-Flow is a dynamic web application designed to connect individuals for food sharing, reducing waste and fostering community. It provides a platform where users can list surplus food items and others can discover and book available food, promoting sustainable practices. 

Live Demo: [Food-Flow Live](https://LakraAnshul.github.io/FoodFlow/)

### 📸 Application Screenshots
Image: Homepage Screenshot
<img width="1902" height="972" alt="image" src="https://github.com/user-attachments/assets/11e9eba1-ab74-41c4-8392-93300dbadfe1" />

Image: Signup Page
<img width="1633" height="892" alt="image" src="https://github.com/user-attachments/assets/c70d96b2-e1ea-4f5a-acac-dc76054aa950" />

Log in Page
<img width="1902" height="967" alt="image" src="https://github.com/user-attachments/assets/1b215945-2905-47fe-ba9f-5489d4f69d9f" />


### 📝 Table of Contents
- [Introduction & Live Demo](#-introduction--live-demo)
- [Application Screenshots](#-application-screenshots)
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [How to Contribute](#-how-to-contribute)
  
### 🎯 About the Project
Food-Flow was inspired by the need to combat food waste and build stronger local communities. It aims to provide an intuitive and efficient way for individuals and small businesses to share excess food, ensuring it reaches those who can utilize it rather than going to landfill. The platform is designed for anyone interested in food sustainability, from individuals with surplus groceries to organizations looking to distribute food efficiently.

### 🌟 Key Features
- ✅ **User Authentication (OTP)**: Secure login and signup processes using One-Time Passwords for enhanced security.
- ✅ **Role-Based Dashboards**: Differentiated user experiences for 'Buyers' (those looking for food) and 'Listers' (those offering food).
- ✅ **Food Listing and Booking System**: Listers can easily post details of available food items, while buyers can browse and book items.
- ✅ **Protected Routes**: Ensures that sensitive parts of the application are only accessible to authenticated and authorized users.
- ✅ **Client-Side Routing**: Smooth and fast navigation within the application without full page reloads.
- ✅ **Dark Mode Support**: A user-friendly dark mode option for improved visual comfort.

### 💻 Tech Stack
**Frontend**:
- <mcurl name="React" url="https://react.dev/"></mcurl>: A JavaScript library for building user interfaces.
- <mcurl name="Vite" url="https://vitejs.dev/"></mcurl>: A fast frontend build tool.
- <mcurl name="TypeScript" url="https://www.typescriptlang.org/"></mcurl>: A superset of JavaScript that adds static typing.
- <mcurl name="Tailwind CSS" url="https://tailwindcss.com/"></mcurl>: A utility-first CSS framework for rapidly building custom designs.
- <mcurl name="React Router" url="https://reactrouter.com/"></mcurl>: For declarative routing in React applications.

**Backend & Database**:
- <mcurl name="Supabase" url="https://supabase.com/"></mcurl>: An open-source Firebase alternative providing a PostgreSQL database, Authentication, instant APIs, and Edge Functions.
- <mcurl name="PostgreSQL" url="https://www.postgresql.org/"></mcurl>: A powerful, open-source object-relational database system (used via Supabase).

### ⚙️ Getting Started
Follow these instructions to set up and run the Food-Flow project on your local machine.

#### Prerequisites
- <mcurl name="Git" url="https://git-scm.com/"></mcurl>
- <mcurl name="Node.js" url="https://nodejs.org/en/"></mcurl> (v18 or higher recommended)
- <mcurl name="npm" url="https://www.npmjs.com/"></mcurl> (usually comes with Node.js)

#### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/FoodFlow.git
   cd Food-Flow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

#### Running the App
To start the development server:
```bash
npm run dev
```
This will typically start the application at `http://localhost:5173`.

### 🔑 Environment Variables
To connect to your Supabase project, you need to set up environment variables. Create a `.env` file in the root of your project and add the following:

```plaintext
// .env.example
VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

Replace the placeholder values with your actual Supabase project URL and public anon key, which you can find in your Supabase project settings.

### 🤝 How to Contribute
We welcome contributions to the Food-Flow project! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Make your changes and ensure your code adheres to the project's coding standards.
4. Write clear, concise commit messages.
5. Push your branch to your forked repository.
6. Open a pull request to the `main` branch of the original repository, describing your changes in detail.
      
