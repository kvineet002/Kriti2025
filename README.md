# 🚀 Welcome to ogaTa.ai  

An AI-powered platform that generates websites from user prompts using **Gemini AI**. Users can select pre-existing layouts and color palettes, preview the generated code and website, customize styles, and deploy their websites—all within a seamless interface.  

## ✨ Features  

### 🔹 **Website Generation with AI**  
- Users provide a prompt to generate a website using **Gemini AI**.  
- Websites are enriched with images from **Pexels API**.  
- Users can **reprompt** in the same chat to generate different versions and access all versions.  

### 🔹 **Authentication & User Management**  
- **Google & GitHub OAuth** authentication via **Passport.js**.  
- **JWT Authorization** for secure access.  

### 🔹 **Layouts & Customization**  
- Users can **select layouts & color palettes** before prompting AI.  
- After generation, users can **preview the code & website** before deployment.  
- A **customization page** allows users to:  
  - Modify styles dynamically (DOM updates instantly).  
  - Upload images (stored in **Supabase Storage** with a generated URL).  
  - Undo styling changes (persistent across refresh).  

### 🔹 **Chat History & Sharing**  
- Users can delete or store generated websites in their **chat history**.  
- Users can **mark chats as favorites** for quick access.  
- Chats can be **shared publicly** via a link, allowing non-logged-in users to view.  

### 🔹 **Deployment Options**  
- Users can **deploy the website** and get a shareable link.  
- Websites are deployed on **Railway Server**.  
- Customization changes can be **saved and deployed** directly from the customization page.  

## 🛠️ Tech Stack  

### **Frontend:**  
- React.js  
- Tailwind CSS  
- Sandpack (for live code & website preview)  

### **Backend:**  
- Express.js  
- Gemini AI  

### **Authentication & Authorization:**  
- Passport.js (Google OAuth, GitHub OAuth)  
- JWT  

### **Storage & Image Management:**  
- Supabase (for storing uploaded images)  
- Pexels API (for adding images to generated websites)  

### **Deployment:**  
- **Platform:** Vercel (main website)  
- **Generated Websites:** Railway Server  

---

## 🔧 Setup & Installation  

### 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/your-repo/ai-website-generator.git
cd ai-website-generator
