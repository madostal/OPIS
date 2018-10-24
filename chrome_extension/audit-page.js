function usingHTML5() {
  var doctypeTag = document.doctype;
  return (doctypeTag && doctypeTag.name === "html" && !doctypeTag.internalSubset
      && !doctypeTag.publicId && !doctypeTag.systemId);
}

function correctViewportForMobiles() {
  var viewportTag = document.querySelector('meta[name="viewport"]');
  if (viewportTag) {
    viewportTag = viewportTag.content.replace(/\s/g, '');
  } else {
    return false;
  }

  return viewportTag.includes('width=device-width') && viewportTag.includes('initial-scale=1.0');
}

function usingNativeHTML5Tags() {
  var result = false;
  var tags = ['article', 'aside', 'bdi', 'details', 'dialog', 'figcaption', 'figure', 'footer', 
      'header', 'main', 'mark', 'meter', 'nav', 'progress', 'rp', 'rt', 'ruby', 'section', 
      'summary', 'time', 'wbr'];
  
  tags.forEach(tag => {
    if (document.querySelector(tag) != null) {
      result = true;
    }
  });
  
  return result;
}

function checkImageAlts() {
  var result = true;

  document.querySelectorAll('img').forEach(img => {
    if (img.alt === '') { // todo kontrola taky title
      console.log(img);
      result = false;
    }
  });

  return result;
}

function checkInputLabels() {
  var result = true;
  // all inputs without input types: button, image, reset, submitss
  var inputs = document.querySelectorAll('input:not([type="button"]):not([type="image"]):not([type="reset"]):not([type="submut"])');
  
  inputs.forEach(input => {
    if ((input.id === '' && input.parentElement.nodeName !== 'label') 
        || (input.id !== '' && document.querySelector(`label[for="${input.id}"]`) === null)
        // TODO: check for aria-label or aria-labelledby
        ) {
      console.log(input);
      result = false;
    }
  });

  return result;
}

function checkForAriaAttributes() {
  var result = false;
  var ariaAttributes = ['aria-autocomplete', 'aria-checked', 'aria-current', 'aria-disabled', 
      'aria-errormessage', 'aria-expanded', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 
      'aria-label', 'aria-level', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 
      'aria-orientation', 'aria-placeholder', 'aria-pressed', 'aria-readonly', 'aria-required',
      'aria-selected', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 
      'aria-valuetext', 'aria-live', 'aria-relevant', 'aria-atomic', 'aria-busy', 'aria-dropeffect',
      'aria-dragged', 'aria-activedescendant', 'aria-colcount', 'aria-colindex', 'aria-colspan',
      'aria-controls', 'aria-describedby', 'aria-details', 'aria-errormessage', 'aria-flowto',
      'aria-labelledby', 'aria-owns', 'aria-posinset', 'aria-rowcount', 'aria-rowindex', 
      'aria-rowspan', 'aria-setsize'];

  ariaAttributes.forEach(attr => {
    if (document.querySelector(`*[${attr}]`) !== null) {
      result = true; // todo pocitat skore
    }
  });

  return result;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.audit == true) {
    var results = {
      hasHTML5: usingHTML5(),
      hasMetaViewport: correctViewportForMobiles(),
      hasNativeTags: usingNativeHTML5Tags(),
      hasImgAlts: checkImageAlts(),
      hasInputLabels: checkInputLabels(),
      hasAriaAttributes: checkForAriaAttributes()
    };
    console.log(results);

    sendResponse(results);
  }
});