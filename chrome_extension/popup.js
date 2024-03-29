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

testButton.onclick = () => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		if (tabs[0].url.match('http://*/*') !== null || tabs[0].url.match('https://*/*') !== null) {
			var code = 'window.location.reload();';
			console.log(tabs[0].id);
		  	chrome.tabs.executeScript(tabs[0].id, {code: code});
		}
	});
};

window.onload = () => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		// tabs[0].id is a key of data for actual tab
		var key = 't' + tabs[0].id.toString();

		chrome.storage.sync.get(key, (data) => {
			if (data[key] !== undefined) {
				console.log('start printing:', data);
				printResults(JSON.parse(data[key]));
			}
		});
	});
}
