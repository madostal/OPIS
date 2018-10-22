const testButton = document.querySelector('.start-test-button');
const resultsContainer = document.querySelector('.results');

function setClassAndIcon(icon, value) {
	icon.classList.remove('test-ok');
	icon.classList.remove('test-error');

	if (value) {
		icon.innerHTML = "check";
		icon.classList.add('test-ok');
	} else {
		icon.innerHTML = "close";
		icon.classList.add('test-error');
	}
}

function printResults(resultsObj) {
	// prints results from JSON function parameter
	setClassAndIcon(document.querySelector('.test-html5'), resultsObj.hasHTML5);
	setClassAndIcon(document.querySelector('.test-mobile-a11y'), resultsObj.hasMetaViewport);
	setClassAndIcon(document.querySelector('.test-native-tags'), resultsObj.hasNativeTags);
	setClassAndIcon(document.querySelector('.test-image-alts'), resultsObj.hasImgAlts);
	setClassAndIcon(document.querySelector('.test-input-labels'), resultsObj.hasInputLabels);
	setClassAndIcon(document.querySelector('.test-aria-tags'), resultsObj.hasAriaAttributes);
	resultsContainer.classList.remove('hidden');
}

// chrome.storage.sync.get('color', function(data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });

testButton.onclick = function() {
	resultsContainer.classList.add('hidden');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: 'content-script.js' }, 
			function(results) {
				// showing results here in popup
				printResults(JSON.parse(results));
			}
		);
	});
};
