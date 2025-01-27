import React, { useState, useRef, useEffect} from "react";

const sampleHtml = ` <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Delicious Delights</title> <style> body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f8f8f8; color: #333; line-height: 1.6; overflow-x: hidden; } header { background-color: #3498db; color: white; padding: 1em 0; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: background-color 0.3s ease; position: sticky; top: 0; z-index: 100; } header:hover { background-color: #2980b9; } #nav-container { display: flex; justify-content: center; margin-top: 10px; } #nav-bar { display: flex; padding: 0; } .nav-item { padding: 10px 20px; margin: 0 10px; border-radius: 5px; background-color: #2980b9; transition: background-color 0.3s ease; text-decoration: none; color: white; list-style: none; } .nav-item:hover { background-color: #1e6692; transform: translateY(-2px); } .nav-item:active { background-color: #144262; transform: translateY(1px); } main { padding: 20px; text-align: center; margin-top: 20px; } #main-heading { color: #3498db; margin-bottom: 20px; font-size: 2.5em; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); } main > p { max-width: 700px; margin: 0 auto 30px; color: #555; font-size: 1.1em; } .section { padding: 30px 20px; background-color: white; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; } .section h2 { color: #3498db; border-bottom: 2px solid #eee; padding-bottom: 10px; } .section ul { list-style-type: none; padding: 0; text-align: left; } .section li { padding: 8px 0; border-bottom: 1px solid #eee; color: #555; } .section li:last-child { border-bottom: none; } #contact { background-color: #ecf0f1; padding: 20px; text-align: center; border-top: 1px solid #ddd; } #contact h2 { color: #3498db; margin-bottom: 15px; } #contact form { display: flex; flex-direction: column; max-width: 400px; margin: 0 auto; } #contact input, #contact textarea { margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1em; } #contact button { padding: 10px 15px; background-color: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s ease; } #contact button:hover { background-color: #219150; } footer { background-color: #34495e; color: white; text-align: center; padding: 1em 0; position: relative; bottom: 0; width: 100%; margin-top: 40px; transition: background-color 0.3s ease; } footer:hover { background-color: #2c3e50; } @media (max-width: 768px) { #nav-container { width: 100%; } #nav-bar{ flex-direction: column; padding: 0; } .nav-item{ margin: 5px 0; text-align: center; width: 100%; } main { padding: 15px; } #main-heading { font-size: 2em; } main > p { font-size: 1em; } .section { padding: 20px 15px; } } </style> </head> <body> <header id="main-header"> <h1>Delicious Delights</h1> <nav id="nav-container"> <ul id="nav-bar"> <li> <a href="#home" class="nav-item">Home</a></li> <li> <a href="#menu" class="nav-item">Menu</a></li> <li> <a href="#about" class="nav-item">About Us</a></li> <li> <a href="#contact" class="nav-item">Contact</a></li> </ul> </nav> </header> <main id="main-content"> <h2 id="main-heading">Welcome to Our Culinary World</h2> <p> Discover a symphony of flavors at Delicious Delights. We are passionate about creating memorable dining experiences with fresh, locally sourced ingredients. Our menu is a celebration of diverse cuisines, crafted to tantalize your taste buds and leave you craving for more. </p> <section id="home" class="section"> <h2>Home</h2> <p>Welcome to our virtual kitchen! Explore our website to discover our delightful menu, learn about our culinary passion, and contact us for reservations or inquiries.</p> </section> <section id="menu" class="section"> <h2>Our Menu</h2> <ul> <li>Appetizer: Bruschetta Trio</li> <li>Main Course: Grilled Salmon with Asparagus</li> <li>Dessert: Chocolate Lava Cake</li> <li>Beverages: Freshly Squeezed Lemonade</li> <li>Specialty: Seasonal Risotto</li> </ul> </section> <section id="about" class="section"> <h2>About Us</h2> <p> We are a team of food enthusiasts dedicated to bringing you the best culinary creations. Our chefs have years of experience and a commitment to quality. We believe in the power of food to bring people together and create lasting memories. </p> </section> </main> <section id="contact"> <h2>Contact Us</h2> <p>Have any questions or want to make a reservation? Fill out the form below!</p> <form id="contact-form"> <input type="text" placeholder="Your Name" required> <input type="email" placeholder="Your Email" required> <textarea placeholder="Your Message" rows="4" required></textarea> <button type="submit">Send Message</button> </form> </section> <footer id="main-footer"> <p>&copy; 2023 Delicious Delights. All Rights Reserved.</p> </footer> </body> </html> `;

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

  // Find the element by its unique ID
  const elementToUpdate = doc.getElementById(elementId);

  if (elementToUpdate) {
    // Apply new styles as inline styles
    Object.entries(newStyles).forEach(([key, value]) => {
      elementToUpdate.style[key] = value;
    });
  }

  return doc.documentElement.outerHTML;
};


const CustomizePage = () => {
  const [html, setHtml] = useState(sampleHtml);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [hoveredElementId, setHoveredElementId] = useState(null);
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
        const elementId = e.target.id; // Assume the element has a unique ID
        setHoveredComponent(e.target.tagName);
        setHoveredElementId(elementId);

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

  const handleStyleChange = (key, value) => {
    const updatedStyles = { ...filteredStyles, [key]: value };
    setFilteredStyles(updatedStyles);

    if (hoveredElementId) {
      // Update the HTML string with the new styles for the exact hovered element
      const updatedHtml = updateElementStyles(html, hoveredElementId, updatedStyles);
      setHtml(updatedHtml);
    }
  };

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
            <p>Component Type: {hoveredComponent}</p>
            <p>Element ID: {hoveredElementId}</p>

            <h3 className="font-bold mt-2">Relevant Styles:</h3>
            <div className="overflow-y-scroll h-48 bg-slate-200 p-2">
              {Object.entries(filteredStyles).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <strong>{key}:</strong>
                  {key.includes("color") ? (
                    <input
                      type="color"
                      value={rgbToHex(value)}
                      onChange={(e) => handleStyleChange(key, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleStyleChange(key, e.target.value)}
                    />
                  )}
                </div>
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

