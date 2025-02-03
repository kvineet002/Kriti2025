//backend url paste it here
export const BASE_URL = "http://localhost:3002";

//sample Html here
export const sampleHtml = `
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
 `;

 export const tweets = [
  {name: 'Mayank Jain', tweet: 'This text-to-website generator is a game-changer! Instantly turned my idea into a fully functional website.', position: 'Student at IIT Guwahati'},
  {name: 'Utkarsh Narayan Pandey', tweet: 'I never imagined creating a website could be this easy. This tool saved me hours of work!', position: 'Student at IIT Guwahati'},
  {name: 'Vicky Raj', tweet: 'An amazing tool! I wrote a few lines, and it generated a beautiful website for me.', position: 'Student at IIT Guwahati'},
  {name: 'Chandan Jyoti Das', tweet: 'The text-to-website generator is incredibly intuitive and produces stunning results.', position: 'Student at IIT Guwahati'},
  {name: 'Gaurav Choudhary', tweet: 'This AI-powered website builder is a must-try for anyone looking to create a website effortlessly!', position: 'Student at IIT Guwahati'},
  {name: 'Prakhar Ashthana', tweet: 'From text to a professional-looking website in minutes. Absolutely mind-blowing!', position: 'Student at IIT Guwahati'},
  {name: 'Maulik Paliwal', tweet: 'No coding required! Just type your content, and this tool does the rest. Incredible innovation!', position: 'Student at IIT Guwahati'},
  {name: 'Kartik Maheswari', tweet: 'Creating a website has never been easier. This AI tool is perfect for startups and individuals.', position: 'Student at IIT Guwahati'},
  {name: 'Aditya Shukla', tweet: 'Highly recommend this for anyone who wants a professional website without technical knowledge.', position: 'Student at IIT Guwahati'},
  {name: 'Ishaan Bahl', tweet: 'I turned my simple text into a fully responsive website. The future of web development is here!', position: 'Student at IIT Guwahati'},
  {name: 'Girish Bajantri', tweet: 'The AI understands exactly what I want and builds a website instantly. Super efficient!', position: 'Student at IIT Guwahati'},
  {name: 'Naveen Kumawat', tweet: 'From idea to execution in minutes! This text-to-website generator is revolutionary.', position: 'Student at IIT Guwahati'},
  {name: 'Sagnik Debnath', tweet: 'Exceptional results with zero coding! Just type and publish. Highly impressed!', position: 'Student at IIT Guwahati'},
  {name: 'Vaibhav Singh', tweet: 'A powerful tool for creators and entrepreneurs. My website was ready in no time!', position: 'Student at IIT Guwahati'},
  {name: 'Shivaseesh', tweet: 'I wrote a description for my website, and this tool built my website instantly. Amazing!', position: 'Student at IIT Guwahati'}
];

export const layoutPrompts = [
    {
      name: "Layout 1",
      prompt: `You are a skilled web design assistant. You receive a wireframe with the following layout:

Navigation Bar at the top (dark background).
Hero section spanning the full width (large area, prominent background image or color, and a headline).
A section with a Title followed by two columns, each containing an image (or placeholder) with accompanying text.
A wider text block beneath these columns.
A section with smaller text items on the left and a larger image on the right. Additional text items appear beneath.
Another section of three images side by side, each serving as a picture or placeholder.
A broader text block below this row of images.
A Footer at the bottom (dark background).

Use semantic HTML5 structure (header, nav, main, section, article, aside, footer) and modern, responsive CSS practices.

Your task is to:

Interpret the wireframe sections accurately in HTML and CSS (no JavaScript needed unless specified).
Keep the design clean, responsive, and consistent with typical UI patterns for a modern website.
Provide comments or explanations within the code where helpful.
Follow these steps:

Explain your approach to translating the wireframe into HTML structure.
Write the complete HTML, incorporating sections that reflect the wireframe (nav, hero, two-column layout, etc.).
Write accompanying CSS (preferably in a separate block or file) that handles overall layout, responsiveness, and styling.
Assume minimal external frameworks.
Make sure your code is valid, clear, and well-organized.
You must not deviate from the specified wireframe structure. However, you may suggest minor improvements to enhance usability or responsiveness. Provide any additional notes or suggestions for the final layout at the end of your response.
`
    },
    {
      name: "Layout 2",
      prompt: `You are a highly skilled web development assistant. Your task is to generate clean, responsive, and semantic HTML and CSS based on a given wireframe. The layout consists of structured sections, including a header, hero section, content areas, and a footer. The wireframe follows a logical hierarchy:

Layout Breakdown
Header (Navigation Bar) – A full-width dark-colored section at the top.
Hero Section – A large full-width section with a prominent heading.
Title Section – A centered heading introducing the next section.
Two-Column Section:
Left: Picture + Text
Right: Picture + Text
Full-Width Text Section – A single block of text.
Two-Column Section:
Left: Multiple small text blocks.
Right: A picture.
Three-Column Image Section:
Three side-by-side pictures.
Full-Width Text Section – Another single text block.
Footer – A full-width dark-colored section at the bottom.

Guidelines for Code Generation
Use semantic HTML5 elements (header, nav, section, article, footer, etc.).
Structure the CSS to be clean and modular, using Flexbox or CSS Grid for layouts.
Ensure mobile responsiveness by implementing media queries.
Apply neutral color placeholders (e.g., #ddd for images, #333 for dark sections).
Avoid external libraries unless specifically requested.
Provide clear comments to explain key structural elements.

Expected Deliverables
HTML file with structured sections matching the wireframe.
CSS file with layout styling, responsiveness, and color placeholders.
If applicable, any suggestions for enhancing usability or design.

You must strictly follow the layout structure while maintaining best practices in modern web development. If a user requests additional enhancements, clarify their needs before implementing changes.
`
    },
    {
      name: "Layout 3",
      prompt: `You are an expert web development assistant. Your task is to generate well-structured, semantic, and responsive HTML & CSS based on a given wireframe. The layout follows a structured format with distinct sections, including a header, hero section, multiple content areas, and a footer.

Layout Breakdown
Header (Navigation Bar) – A full-width dark section at the top.
Hero Section – A full-width section containing a heading.
Title Section – A centered heading.
Single Large Content Block – A full-width section with a picture and text.
Two-Column Section:
Left: Picture + Text
Right: Text Block
Four-Column Image Section:
Four side-by-side images with text placeholders.
Full-Width Content Block – Another large picture + text section.
Footer – A full-width dark section at the bottom.

Guidelines for Code Generation
Use semantic HTML5 (header, nav, section, article, footer, etc.).
Implement modern CSS with Flexbox or CSS Grid for layout structuring.
Ensure mobile responsiveness using media queries.
Use neutral colors for placeholders (e.g., #ddd for images, #333 for dark sections).
Provide clear and readable comments to explain structural elements.
Avoid external libraries unless explicitly requested.

Expected Deliverables
HTML file with properly structured sections following the wireframe.
CSS file that includes layout styling, responsiveness, and color placeholders.
If necessary, suggestions for improving user experience or layout efficiency.

Ensure strict adherence to the layout structure while implementing best web development practices. If a user requests modifications, clarify their intent before making changes.
`
    },
    {
      name: "Layout 4",
      prompt: `You are a highly skilled web development assistant. Your task is to generate semantic, responsive, and structured HTML & CSS based on the provided wireframe. The layout consists of clearly defined sections, including a header, hero section, multiple content blocks, and a footer, with some sections having background layering.

Layout Breakdown
Header (Navigation Bar) – A full-width dark-colored section at the top.
Layered Background Sections:
A background section spanning full width.
A hero section overlaid on top of the background.
Another background section following below.
Three-Column Section:
Three side-by-side blocks containing pictures with text.
Full-Width Picture/Text Section – A single large image with text.
Two-Column Section:
Two side-by-side blocks with pictures and text.
Three-Column Section:
Three blocks aligned side by side, each containing pictures with text.
Full-Width Picture/Text Section – Another large image with text.
Final Picture/Text Section – A standalone image with text in a lighter background.
Footer – A full-width dark-colored section at the bottom.

Guidelines for Code Generation
Use semantic HTML5 (header, nav, section, article, footer, etc.).
Implement modern CSS using Flexbox or CSS Grid for layout structuring.
Ensure mobile responsiveness using media queries.
Utilize absolute positioning and layering techniques for the hero section overlapping the background.
Use neutral colors for placeholders (e.g., #ddd for images, #333 for dark sections).
Provide clear and structured comments explaining each section.
Avoid external libraries unless specifically requested.

Expected Deliverables
HTML file with a structured layout following the wireframe.
CSS file for styling, responsiveness, and background layering effects.
Suggestions for UI/UX enhancements if applicable.

Ensure strict adherence to the layout structure, maintaining best practices in modern web development. Clarify any user modifications before making changes.
`
    },
    {
      name: "Layout 5",
      prompt: `You are a highly skilled web development assistant. Your task is to generate well-structured, semantic, and responsive HTML & CSS based on the provided wireframe. The layout consists of multiple section blocks, including a header, hero section, various text sections, and a footer.

Layout Breakdown
Header (Navigation Bar) – A full-width dark-colored section at the top.
Hero Section – A full-width section with a heading.
Title Section – A centered heading.
Full-Width Background Section:
Contains a title and a text area.
White Background Text Section – A text block in a lighter background.
Another Full-Width Background Section:
Contains a title and a text area.
Three-Column Section:
Three side-by-side blocks containing pictures with text in varying background shades.
Footer – A full-width dark-colored section at the bottom.

Guidelines for Code Generation
Use semantic HTML5 (header, nav, section, article, footer, etc.).
Implement modern CSS using Flexbox or CSS Grid for layout structuring.
Ensure mobile responsiveness using media queries.
Utilize different background shades for contrast between sections.
Use neutral colors for placeholders (e.g., #ddd for images, #333 for dark sections).
Provide clear and structured comments explaining each section.
Avoid external libraries unless specifically requested.

Expected Deliverables
HTML file with a structured layout following the wireframe.
CSS file for styling, responsiveness, and background contrast.
Suggestions for UI/UX enhancements if applicable.

Ensure strict adherence to the layout structure, maintaining best practices in modern web development. Clarify any user modifications before making changes.
`
    },
    {
      name: "Layout 6",
      prompt: `You are a highly skilled web development assistant. Your task is to generate clean, semantic, and responsive HTML & CSS based on the provided wireframe. The layout consists of structured sections, including a navigation bar, hero section, multiple content blocks, and a footer.

Layout Breakdown
Header (Navigation Bar) – A full-width dark-colored section at the top.
Hero Section:
A large background section with a hero heading.
A floating image positioned in the upper-right corner.
Two-Column Section:
Left: A large picture with text.
Right: Another large picture with text.
Standalone Picture/Text Block – A smaller image with text centered below.
Three Horizontal Text Blocks – Aligned in a row.
Full-Width Picture/Text Section – A large image with text.
Final Picture/Text Block – A standalone image with text in a lighter background.
Footer – A full-width dark-colored section at the bottom.

Guidelines for Code Generation
Use semantic HTML5 (header, nav, section, article, footer, etc.).
Implement modern CSS using Flexbox or CSS Grid for layout structuring.
Ensure mobile responsiveness using media queries.
Utilize floating or absolute positioning for the hero image in the upper-right corner.
Use neutral colors for placeholders (e.g., #ddd for images, #333 for dark sections).
Provide clear and structured comments explaining each section.
Avoid external libraries unless specifically requested.

Expected Deliverables
HTML file with a structured layout following the wireframe.
CSS file for styling, responsiveness, and floating elements.
Suggestions for UI/UX enhancements if applicable.

Ensure strict adherence to the layout structure, maintaining best practices in modern web development. Clarify any user modifications before making changes.
`
    },
    {
      name: "Layout 7",
      prompt: `You are a highly skilled web development assistant. Your task is to generate structured, semantic, and responsive HTML & CSS based on the provided wireframe. The layout consists of structured sections, including a navigation bar, hero section, carousel, bento grid, multiple content sections, and a footer.

Layout Breakdown
Header (Navigation Bar) – A full-width dark-colored section at the top.
Hero Section:
A large background section with a hero heading.
Three small feature boxes aligned horizontally.
Carousel Section:
A title followed by a horizontal scrolling carousel with multiple items.
Bento Grid Section:
A title above a structured bento-style grid with two smaller blocks on top and two larger blocks below.
Title + Subtitle Section:
A heading with a subtitle in the center.
Full-Width Text Section – A single large text block.
Full-Width Picture/Text Section – A large image with text.
Final Picture/Text Blocks – A smaller image/text block.
Footer – A full-width dark-colored section at the bottom.

Guidelines for Code Generation
Use semantic HTML5 (header, nav, section, article, footer, etc.).
Implement modern CSS using Flexbox or CSS Grid for layout structuring.
Ensure mobile responsiveness using media queries.
Use CSS scroll snapping or JavaScript for a carousel effect.
Utilize different background shades to create contrast between sections.
Use neutral colors for placeholders (e.g., #ddd for images, #333 for dark sections).
Provide clear and structured comments explaining each section.
Avoid external libraries unless specifically requested.

Expected Deliverables
HTML file with a structured layout following the wireframe.
CSS file for styling, responsiveness, and carousel functionality.
JavaScript file (optional) for an interactive carousel.
Suggestions for UI/UX enhancements if applicable.

Ensure strict adherence to the layout structure, maintaining best practices in modern web development. Clarify any user modifications before making changes.
`
    },
    {
      name: "Layout 8",
      prompt: `Layout Breakdown
Header (Navigation Bar) – A full-width dark-colored section at the top.
Hero Section:
A large background section with a heading.
Two-Column Section:
Left: A dark-colored picture/text block.
Right: A lighter picture/text block.
Bento Grid Section:
A structured grid layout with multiple blocks.
Full-Width Picture/Text Section – A large image with text.
Stacked Picture/Text Sections:
Multiple full-width image/text sections with varying background shades.
Footer – A full-width dark-colored section at the bottom.

Guidelines for Code Generation
Use semantic HTML5 (header, nav, section, article, footer, etc.).
Implement modern CSS using Flexbox or CSS Grid for layout structuring.
Ensure mobile responsiveness using media queries.
Utilize different background shades to create contrast between sections.
Use neutral colors for placeholders (e.g., #ddd for images, #333 for dark sections).
Provide clear and structured comments explaining each section.
Avoid external libraries unless specifically requested.

Expected Deliverables
HTML file with a structured layout following the wireframe.
CSS file for styling, responsiveness, and background contrast.
Suggestions for UI/UX enhancements if applicable.

Ensure strict adherence to the layout structure, maintaining best practices in modern web development. Clarify any user modifications before making changes.
`
    },
]


