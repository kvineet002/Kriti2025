import React, { useState, useRef, useEffect } from "react";

const sampleHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Foodie's Delight</title>
  <style>
    /* General Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
    }
    body {
      background-color: #f8f8f8;
      color: #333;
    }
    #navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #ff5722;
      color: white;
    }
    #navbar a {
      color: white;
      text-decoration: none;
      margin: 0 15px;
    }
    #navbar a:hover {
      text-decoration: underline;
    }
    #hero {
      text-align: center;
      padding: 100px 20px;
      background: url('https://via.placeholder.com/1920x1080') no-repeat center center/cover;
      color: white;
    }
    #hero h1 {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    #hero p {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }
    #hero button {
      padding: 10px 20px;
      background-color: #ff5722;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    #hero button:hover {
      background-color: #e64a19;
    }
    #menu {
      padding: 50px 20px;
      text-align: center;
    }
    #menu h2 {
      margin-bottom: 30px;
      font-size: 2rem;
    }
    .menu-category {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .menu-item {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 20px;
      width: 250px;
      transition: transform 0.3s;
    }
    .menu-item:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .menu-item img {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 15px;
    }
    #contact {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 50px 20px;
    }
    #contact h2 {
      margin-bottom: 20px;
    }
    #contact form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #contact input, #contact textarea, #contact button {
      margin: 10px 0;
      padding: 10px;
      width: 300px;
      border: none;
      border-radius: 5px;
    }
    #contact button {
      background-color: #ff5722;
      color: white;
      cursor: pointer;
    }
    #contact button:hover {
      background-color: #e64a19;
    }
    footer {
      text-align: center;
      padding: 20px;
      background-color: #ff5722;
      color: white;
    }
  </style>
</head>
<body>
  <header id="navbar">
    <h1 id="site-title">Foodie's Delight</h1>
    <nav id="nav-links">
      <a href="#hero" id="nav-home">Home</a>
      <a href="#menu" id="nav-menu">Menu</a>
      <a href="#contact" id="nav-contact">Contact</a>
    </nav>
  </header>
  <section id="hero">
    <h1 id="hero-title">Welcome to Foodie's Delight</h1>
    <p id="hero-description">Satisfy your cravings with our delicious offerings.</p>
    <button id="explore-menu-btn" onclick="scrollToMenu()">Explore Menu</button>
  </section>
  <section id="menu">
    <h2 id="menu-heading">Our Menu</h2>
    <div class="menu-category" id="menu-items">
      <div class="menu-item" id="menu-pizza">
        <img src="https://via.placeholder.com/250" alt="Pizza" id="pizza-img">
        <h3 id="pizza-title">Pizza</h3>
        <p id="pizza-desc">Delicious cheesy pizzas with fresh toppings.</p>
      </div>
      <div class="menu-item" id="menu-burgers">
        <img src="https://via.placeholder.com/250" alt="Burgers" id="burger-img">
        <h3 id="burger-title">Burgers</h3>
        <p id="burger-desc">Juicy burgers served with crispy fries.</p>
      </div>
      <div class="menu-item" id="menu-desserts">
        <img src="https://via.placeholder.com/250" alt="Desserts" id="desserts-img">
        <h3 id="desserts-title">Desserts</h3>
        <p id="desserts-desc">Sweet treats to satisfy your cravings.</p>
      </div>
    </div>
  </section>
  <section id="contact">
    <h2 id="contact-heading">Contact Us</h2>
    <form id="contact-form">
      <input type="text" placeholder="Your Name" id="contact-name" required>
      <input type="email" placeholder="Your Email" id="contact-email" required>
      <textarea placeholder="Your Message" id="contact-message" rows="5" required></textarea>
      <button type="submit" id="contact-submit">Send</button>
    </form>
  </section>
  <footer id="footer">
    <p id="footer-text">&copy; 2025 Foodie's Delight. All rights reserved.</p>
  </footer>
</body>
</html>
`;

const rgbToHex = (rgb) => {
  const rgbValues = rgb.match(/\d+/g);
  if (!rgbValues) return "#000000";
  return `#${rgbValues
    .slice(0, 3)
    .map((val) => parseInt(val, 10).toString(16).padStart(2, "0"))
    .join("")}`;
};

const updateElementStyles = (htmlString, elementId, newStyles) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const elementToUpdate = doc.getElementById(elementId);
  if (elementToUpdate) {
    Object.entries(newStyles).forEach(([key, value]) => {
      elementToUpdate.style[key] = value;
    });
  }
  return doc.documentElement.outerHTML;
};

const CustomizePage = () => {
  const [html, setHtml] = useState(sampleHtml);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [filteredStyles, setFilteredStyles] = useState({});
  const iframeRef = useRef(null);

  const relevantStyles = [
    "background-color",
    "color",
    "font-size",
    "margin",
    "padding",
    "border",
    "height",
    "width",
  ];

  const injectClickListener = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const iframeDocument = iframe.contentDocument;

      let lastSelectedElement = null;

      iframeDocument.body.addEventListener("click", (e) => {
        e.preventDefault();

        if (lastSelectedElement) {
          lastSelectedElement.style.outline = "";
        }

        const clickedElement = e.target;
        lastSelectedElement = clickedElement;
        clickedElement.style.outline = "2px solid #ff5722";

        setSelectedElement(clickedElement.tagName);
        setSelectedElementId(clickedElement.id);

        const computedStyles = window.getComputedStyle(clickedElement);
        const filtered = {};

        relevantStyles.forEach((style) => {
          filtered[style] = computedStyles.getPropertyValue(style) || "none";
        });

        setFilteredStyles(filtered);
      });
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = injectClickListener;
    }
  }, []);

  const handleStyleChange = (key, value) => {
    const updatedStyles = { ...filteredStyles, [key]: value };
    setFilteredStyles(updatedStyles);

    if (selectedElementId) {
      const updatedHtml = updateElementStyles(html, selectedElementId, updatedStyles);
      setHtml(updatedHtml);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch text-white p-6 w-full h-screen gap-4">
      {/* Customization Tab */}
      <div className="border-2 w-full md:w-2/5 flex flex-col gap-3 p-4 bg-[#1e1e1e] rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Customization Tab</h1>
        <div className="bg-white text-black w-full p-3 rounded-lg shadow-inner">
          <h2 className="font-bold">Selected Component:</h2>
          <p>Component Type: {selectedElement || "None"}</p>
          <p>Element ID: {selectedElementId || "None"}</p>

          <h3 className="font-bold mt-4">Relevant Styles:</h3>
          <div className="overflow-y-scroll h-48 bg-slate-200 p-3 rounded-lg">
            {Object.entries(filteredStyles).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 mb-2">
                <strong className="capitalize">{key}:</strong>
                {key.includes("color") ? (
                  <input
                    type="color"
                    value={rgbToHex(value)}
                    onChange={(e) => handleStyleChange(key, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="border p-1 rounded w-full"
                    value={value}
                    onChange={(e) => handleStyleChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Iframe Preview */}
      <div className="border-2 w-full md:w-3/5 flex items-center justify-center bg-white rounded-lg shadow-lg">
        <iframe
          title="HTML Preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full rounded-lg"
          srcDoc={html}
          ref={iframeRef}
        />
      </div>
    </div>
  );
};

export default CustomizePage;
