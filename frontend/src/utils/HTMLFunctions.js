const disableInteractiveElements = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
  
    // Disable all links
    doc.querySelectorAll("a").forEach((anchor) => {
      anchor.href = "javascript:void(0)";
      anchor.style.pointerEvents = "none";
      anchor.style.opacity = "0.5";
    });
  
    // Disable all buttons
    doc.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      button.style.opacity = "0.5";
      button.style.cursor = "not-allowed";
    });
  
    return doc.documentElement.outerHTML;
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

const enableInteractiveElements = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
  
    // Restore all links
    doc.querySelectorAll("a").forEach((anchor) => {
      anchor.removeAttribute("style"); // Remove inline styles
      anchor.href = anchor.getAttribute("data-original-href") || anchor.href; // Restore original href if stored
      anchor.removeAttribute("data-original-href");
      anchor.style.pointerEvents = "auto";
      anchor.style.opacity = "1";
    });
  
    // Restore all buttons
    doc.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
      button.removeAttribute("style");
    });
  
    // Remove the script that blocks clicks
    doc.querySelectorAll("script").forEach((script) => {
      if (script.textContent.includes("document.addEventListener('click'")) {
        script.remove();
      }
    });
  
    return doc.documentElement.outerHTML;
};

function colorToHex(color) {
    if (!color) return "#ffffff"; // Default to white if color is undefined
  
    const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;
    const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  
    let match = color.match(rgbaRegex);
    if (match) {
      let r = parseInt(match[1]).toString(16).padStart(2, "0");
      let g = parseInt(match[2]).toString(16).padStart(2, "0");
      let b = parseInt(match[3]).toString(16).padStart(2, "0");
      let a = Math.round(parseFloat(match[4]) * 255)
        .toString(16)
        .padStart(2, "0");
      if (a === "00") return "#ffffff";
      return `#${r}${g}${b}${a}`;
    }
  
    match = color.match(rgbRegex);
    if (match) {
      let r = parseInt(match[1]).toString(16).padStart(2, "0");
      let g = parseInt(match[2]).toString(16).padStart(2, "0");
      let b = parseInt(match[3]).toString(16).padStart(2, "0");
  
      return `#${r}${g}${b}`;
    }
    return "#ffffff"; 
};

export { disableInteractiveElements, updateElementStyles, enableInteractiveElements, colorToHex };