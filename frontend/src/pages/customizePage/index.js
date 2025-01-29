import React, { useState, useRef, useEffect } from "react";

const sampleHtml = `
 <!DOCTYPE html>
 <html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title id="title">Minimalist Portfolio</title>
  <style>
   body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
   }
   
   header {
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
    text-align: center;
    position: relative;
   }
   
   header h1 {
    margin: 0;
    font-size: 2rem;
   }
   
   nav {
    background-color: #444;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
   }
   
   nav a {
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease;
   }
   
   nav a:hover {
    background-color: #555;
   }
   
   .carousel {
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-bottom: 2rem;
   }
   
   .carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
   }
   
   .carousel img {
    width: 100%;
    height: auto;
    display: block;
   }
   
   .main-section {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
   }
   
   .main-section h2 {
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
   }
   
   .main-section p {
    color: #555;
    margin-bottom: 20px;
   }
    
   .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 20px;
   }
   
   .gallery img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    transition: transform 0.3s ease;
   }
   
   .gallery img:hover {
    transform: scale(1.05);
   }
   
   .contact-form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
   }
   
   .contact-form label {
    margin-bottom: 5px;
    color: #333;
   }
   
   .contact-form input,
   .contact-form textarea {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
   }
   
   .contact-form button {
    padding: 10px 15px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
   }
   
   .contact-form button:hover {
    background-color: #555;
   }
   
   footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    position: relative;
    bottom: 0;
    width: 100%;
   }
   @media (max-width: 768px) {
    .main-section {
     padding: 1rem;
     }
     nav {
     flex-direction: column;
     align-items: center;
     }
     nav a {
     padding: 0.5rem;
     }
   }
  </style>
 </head>
 <body>
  <header id="header">
   <h1 id="h1">Graphic Designer Portfolio</h1>
   <nav id="nav">
    <a href="#about" id="about-link">About</a>
    <a href="#gallery" id="gallery-link">Gallery</a>
    <a href="#contact" id="contact-link">Contact</a>
   </nav>
  </header>
  
  <div class="carousel" id="carousel">
   <div class="carousel-wrapper" id="carousel-wrapper">
    <img src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Carousel Image 1" id="carousel-img-1">
    <img src="https://images.pexels.com/photos/3318170/pexels-photo-3318170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Carousel Image 2" id="carousel-img-2">
    <img src="https://images.pexels.com/photos/2664422/pexels-photo-2664422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Carousel Image 3" id="carousel-img-3">
   </div>
  </div>
  
  <main class="main-section" id="main-section">
   <section id="about">
    <h2 id="about-heading">About Me</h2>
    <p id="about-paragraph">I am a passionate graphic designer with years of experience in creating visually appealing designs. My work ranges from branding to digital art, and I love to bring ideas to life through design.</p>
   </section>
   
   <section id="gallery">
    <h2 id="gallery-heading">Gallery</h2>
    <div class="gallery" id="gallery-images">
     <img src="https://images.pexels.com/photos/907633/pexels-photo-907633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gallery Image 1" id="gallery-img-1">
     <img src="https://images.pexels.com/photos/4767047/pexels-photo-4767047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gallery Image 2" id="gallery-img-2">
     <img src="https://images.pexels.com/photos/1665395/pexels-photo-1665395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gallery Image 3" id="gallery-img-3">
     <img src="https://images.pexels.com/photos/577897/pexels-photo-577897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gallery Image 4" id="gallery-img-4">
     <img src="https://images.pexels.com/photos/2499765/pexels-photo-2499765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gallery Image 5" id="gallery-img-5">
     <img src="https://images.pexels.com/photos/2799603/pexels-photo-2799603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gallery Image 6" id="gallery-img-6">
    </div>
   </section>
   
   <section id="contact">
    <h2 id="contact-heading">Contact Me</h2>
    <div class="contact-form" id="contact-form">
     <label for="name" id="name-label">Name:</label>
     <input type="text" id="name" name="name" required>
     
     <label for="email" id="email-label">Email:</label>
     <input type="email" id="email" name="email" required>
     
     <label for="message" id="message-label">Message:</label>
     <textarea id="message" name="message" rows="5" required></textarea>
     
     <button type="submit" id="submit-button">Send Message</button>
    </div>
   </section>
  </main>
  
  <footer id="footer">
   <p id="footer-text">&copy; 2024 Graphic Designer Portfolio</p>
  </footer>
  
  <script>
   const carouselWrapper = document.getElementById('carousel-wrapper');
   const carouselImages = carouselWrapper.querySelectorAll('img');
   let currentIndex = 0;
   
   function updateCarousel() {
    carouselWrapper.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
   }
   
   function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
   }
   
   setInterval(nextSlide, 5000);
   
   document.querySelectorAll('nav a').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
   e.preventDefault();
   
   const targetId = this.getAttribute('href').substring(1);
   const targetSection = document.getElementById(targetId);
   
   if (targetSection) {
   targetSection.scrollIntoView({ behavior: 'smooth' });
   }
   });
   });
  </script>
 </body>
 </html>
 `

 const rgbToHex = (rgb) => {
  const rgbValues = rgb.match(/\d+/g);
  if (!rgbValues) return "#000000";
  return `#${rgbValues
    .slice(0, 3)
    .map((val) => parseInt(val, 10).toString(16).padStart(2, "0"))
    .join("")}`;
};

const updateElementStyles = (htmlString, elementId, newStyles, newSrc = null) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const elementToUpdate = doc.getElementById(elementId);

  if (elementToUpdate) {
    if (newSrc && elementToUpdate.tagName === "IMG") {
      elementToUpdate.src = newSrc;
    } else {
      Object.entries(newStyles).forEach(([key, value]) => {
        elementToUpdate.style[key] = value;
      });
    }
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedElementId) {
      const imageUrl = URL.createObjectURL(file);
      const updatedHtml = updateElementStyles(html, selectedElementId, {}, imageUrl);
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

          {/* Image Upload Section */}
          {selectedElement === "IMG" && (
            <div className="mt-4">
              <h3 className="font-bold">Change Image:</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          )}

          <h3 className="font-bold mt-4">Relevant Styles:</h3>
          <div className="overflow-y-scroll h-48 bg-slate-200 p-3 rounded-lg">
            {Object.entries(filteredStyles).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 mb-2">
                <strong className="capitalize">{key}:</strong>
                {key.includes("color") ? (
                  <input
                    type="color"
                    value={value || "#000000"}
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