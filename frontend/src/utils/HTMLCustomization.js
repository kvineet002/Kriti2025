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

const getElementDetails = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const elements = doc.querySelectorAll("[id]");
  const elementDetails = {};

  elements.forEach(element => {
    const styles = window.getComputedStyle(element);
    const elementId = element.id;
    const elementType = element.tagName.toLowerCase();
    const elementStyles = {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      width: styles.width,
      height: styles.height,
      margin: styles.margin,
      padding: styles.padding,
      border: styles.border,
      borderRadius: styles.borderRadius
    };

    elementDetails[elementId] = {
      type: elementType,
      styles: elementStyles
    };

    if (elementType === "img") {
      elementDetails[elementId].src = element.src;
    } else if (elementType === "a") {
      elementDetails[elementId].href = element.href;
    } else if (element.textContent.trim()) {
      elementDetails[elementId].innerText = element.textContent.trim();
    }
  });
  console.log("elementDetails",elementDetails);
  return elementDetails;
};


export { updateElementStyles, getElementDetails};