var results = {
  hasHTML5: false,
  hasMetaViewport: false,
  hasNativeTags: false,
  hasImgAlts: false,
  hasInputLabels: false,
  hasAriaAttributes: false
};

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
  var tags = ['article', 'aside', 'bdi', 'details', 'dialog', 'figcaption', 'figure', 'footer', 
      'header', 'main', 'mark', 'meter', 'nav', 'progress', 'rp', 'rt', 'ruby', 'section', 
      'summary', 'time', 'wbr'];
  
  tags.forEach(tag => {
    if (document.querySelector(tag)) {
      return true;
    }
  });
  
  return false;
}

function checkImageAlts() {
  document.querySelectorAll('img').forEach(img => {
    if (img.alt === '') { // todo kontrola taky title
      return false;
    }
  });

  return true;
}

function checkInputLabels() {
  // all inputs without input types: button, image, reset, submitss
  var inputs = document.querySelectorAll('input:not([type="button"]):not([type="image"]):not([type="reset"]):not([type="submut"])');
  
  inputs.forEach(input => {
    if ((input.id === '' && input.parentElement.nodeName !== 'label') 
        || (input.id !== '' && document.querySelector(`label[for="${input.id})]"`) === null)) {
      return false;
    }
  });

  return true;
}

function checkForAriaAttributes() {
  // TODO: create array from all aria attributes
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
      return true; // todo pocitat skore
    }
  });

  return false;
}

// check of html5 doctype
if (usingHTML5()) {
  results.hasHTML5 = true;
}

// check meta viewport tag
if (correctViewportForMobiles()) {
  results.hasMetaViewport = true;
}

// check HTML5 native tags
if (usingNativeHTML5Tags()) {
  results.hasNativeTags = true;
}

// check img alts
if (checkImageAlts()) {
  results.hasImgAlts = true;
}

// check input labels
if (checkInputLabels()) {
  results.hasInputLabels = true;
}

// check for some aria attributes
if (checkForAriaAttributes()) {
  esults.hasAriaAttributes = true;
}

// result of the script
JSON.stringify(results);
