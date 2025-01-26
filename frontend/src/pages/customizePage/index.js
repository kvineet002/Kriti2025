import React, { useState, useRef, useEffect} from "react";

const sampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Foodies' Paradise</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
    }

    body {
      background-color: #f8f8f8;
      color: #333;
      line-height: 1.6;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #ff5722;
      color: #fff;
    }

    .navbar a {
      color: #fff;
      text-decoration: none;
      margin: 0 15px;
    }

    .hero {
      text-align: center;
      padding: 100px 20px;
      background: url('https://via.placeholder.com/1920x1080') no-repeat center center/cover;
      color: white;
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .hero p {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }

    .hero button {
      padding: 10px 20px;
      background-color: #ff5722;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .hero button:hover {
      background-color: #e64a19;
    }

    .menu {
      padding: 50px 20px;
      text-align: center;
    }

    .menu h2 {
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .menu-categories {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .menu-item {
      background-color: #fff;
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

    .contact {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 50px 20px;
    }

    .contact h2 {
      margin-bottom: 20px;
    }

    .contact form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .contact input, .contact textarea, .contact button {
      margin: 10px 0;
      padding: 10px;
      width: 300px;
      border: none;
      border-radius: 5px;
    }

    .contact button {
      background-color: #ff5722;
      color: white;
      cursor: pointer;
    }

    .contact button:hover {
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
  <header class="navbar">
    <h1>Foodies' Paradise</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#menu">Menu</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <section class="hero" style="color: black;">
    <h1>Welcome to Foodies' Paradise</h1>
    <p>Where your cravings meet perfection.</p>
    <button onclick="scrollToMenu()">Explore Menu</button>
  </section>

  <section class="menu" id="menu">
    <h2>Our Menu</h2>
    <div class="menu-categories">
      <div class="menu-item">
        <img src="https://via.placeholder.com/250" alt="Pizza">
        <h3>Pizza</h3>
        <p>Delicious cheesy pizzas with fresh toppings.</p>
      </div>
      <div class="menu-item">
        <img src="https://via.placeholder.com/250" alt="Burgers">
        <h3>Burgers</h3>
        <p>Juicy burgers served with crispy fries.</p>
      </div>
      <div class="menu-item">
        <img src="https://via.placeholder.com/250" alt="Desserts">
        <h3>Desserts</h3>
        <p>Sweet treats to satisfy your cravings.</p>
      </div>
    </div>
  </section>

  <section class="contact" id="contact">
    <h2>Contact Us</h2>
    <form>
      <input type="text" placeholder="Your Name" required>
      <input type="email" placeholder="Your Email" required>
      <textarea placeholder="Your Message" rows="5" required></textarea>
      <button type="submit">Send</button>
    </form>
  </section>

  <footer>
    <p>&copy; 2025 Foodies' Paradise. All rights reserved.</p>
  </footer>
</body>
</html>
`;

const CustomizePage = () => {
  const [html, setHtml] = useState(sampleHtml);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [filteredStyles, setFilteredStyles] = useState({});
  const iframeRef = useRef(null);

  const relevantStyles = [
    "background-color",
    "color",
    "font-size",
    "margin",
    "padding",
    "border",
    "border-radius",
    "border-width",
    "height",
    "width",
  ];

  const injectHoverListener = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const iframeDocument = iframe.contentDocument;

      iframeDocument.body.addEventListener("mouseover", (e) => {
        const componentType = e.target.tagName;
        setHoveredComponent(componentType);

        const computedStyles = window.getComputedStyle(e.target);
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
      iframe.onload = injectHoverListener;
    }
  }, []);
  const handleHtmlChange = (e) => {
    setHtml(e.target.value);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 text-white p-6 w-full h-screen">
      <div className="flex gap-4 p-2 flex-1 md:h-full">
        <textarea
          className="border-2 overflow-y-scroll no-scrollbar p-2 bg-[#1e1e1e] h-76 md:h-full w-1/2"
          value={html}
          onChange={handleHtmlChange}
        />
        <div className="border-2 h-76 w-1/2 flex flex-col gap-3 p-3 items-center md:h-full justify-center">
          <h1>Customization Tab</h1>
          <div className="bg-white text-black w-full p-2">
            <h2 className="font-bold">Hovered Component:</h2>
            <p className="lowercase">Component Type: {hoveredComponent}</p>

            <h3 className="font-bold mt-2">Relevant Styles:</h3>
            <div className="overflow-y-scroll h-48 bg-slate-200 p-2">
              {Object.entries(filteredStyles).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-1/2 md:h-full w-full md:w-1/2 border-2">
        <iframe
          title="HTML Preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full"
          srcDoc={html}
          ref={iframeRef}
        />
      </div>
    </div>
  );
};

export default CustomizePage;