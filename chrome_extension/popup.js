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

function openChromeTab(event) {
	var url = event.target.dataset.url;
	if (url) {
		chrome.tabs.create({url: url});
	}
}

function addClickHandler(listItem) {
	listItem.addEventListener('click', event => openChromeTab(event));
}

function printResults(resultsObj) {
	// prints results from JSON function parameter
	setClassAndIcon(document.querySelector('.test-html5'), resultsObj.hasHTML5);
	setClassAndIcon(document.querySelector('.test-mobile-a11y'), resultsObj.hasMetaViewport);
	setClassAndIcon(document.querySelector('.test-native-tags'), resultsObj.hasNativeTags);
	setClassAndIcon(document.querySelector('.test-image-alts'), resultsObj.hasImgAlts);
	setClassAndIcon(document.querySelector('.test-input-labels'), resultsObj.hasInputLabels);
	setClassAndIcon(document.querySelector('.test-aria-tags'), resultsObj.hasAriaAttributes);

	// Add urls on pages which describe the tested point
	addClickHandler(document.querySelector('.test-html5-item'));
	addClickHandler(document.querySelector('.test-mobile-a11y-item'));
	addClickHandler(document.querySelector('.test-native-tags-item'));
	addClickHandler(document.querySelector('.test-image-alts-item'));
	addClickHandler(document.querySelector('.test-input-labels-item'));
	addClickHandler(document.querySelector('.test-aria-tags-item'));

	resultsContainer.classList.remove('hidden');
}

window.onload = function() {
	chrome.storage.sync.get('results', (data) => {
		console.log('start printing:', data.results);
		printResults(JSON.parse(data.results));
	});
}
