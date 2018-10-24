function countErrors(response) {
	let counter = 0;
	if (!response.hasHTML5) counter++;
	if (!response.hasMetaViewport) counter++;
	if (!response.hasNativeTags) counter++;
	if (!response.hasImgAlts) counter++;
	if (!response.hasInputLabels) counter++;
	if (!response.hasAriaAttributes) counter++;

	return counter;
}

// send message to popup with results
function setResultsToStorage(response) {
	chrome.storage.sync.set({ 'results': response }, () => {
		console.log('Value is set to: ' + response);
	});
}

chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.onUpdated.addListener((tabId, info) => {
		if (info.status === 'complete') {
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				if (tabs[0].url.match('http://*/*') !== null || tabs[0].url.match('https://*/*') !== null) {
					// send message to execute audit-page.js content script
					chrome.tabs.sendMessage(tabs[0].id, { audit: true }, (response) => {
						setResultsToStorage(response);
						chrome.browserAction.setBadgeText({ text: countErrors(JSON.parse(response)).toString() });
					});
				}
			});
		}
	});
});
