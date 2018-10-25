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

// set result json to storage for actual tab
function setResultsToStorage(key, value) {
	chrome.storage.sync.set({ [key]: value }, () => {
		console.log('Results for tab ' + key + ' set to: ' + value);
	});
}

chrome.runtime.onInstalled.addListener(() => {

	chrome.tabs.onUpdated.addListener((tabId, info) => {
		console.log('onUpdated');

		if (info.status === 'complete') {
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				// send message to execute audit-page.js content script
				chrome.tabs.sendMessage(tabs[0].id, { audit: true }, (response) => {
					if (response !== undefined) {
						setResultsToStorage('t' + tabs[0].id.toString(), response);
						chrome.browserAction.setBadgeBackgroundColor({color: '#FF4444'});
						chrome.browserAction.setBadgeText({ text: countErrors(JSON.parse(response)).toString() });
					} else {
						chrome.browserAction.setBadgeText({ text: ''});
					}
				});
			});
		}
	});

	chrome.tabs.onActivated.addListener((tab) => {
		console.log('onActivated');		
		
		// set badget count depanding on active tab id
		var key = 't' + tab.tabId.toString();

		chrome.storage.sync.get(key, (data) => {
			if (data[key] !== undefined) {
				chrome.browserAction.setBadgeBackgroundColor({color: '#FF4444'});
				chrome.browserAction.setBadgeText({ text: countErrors(JSON.parse(data[key])).toString() });
			} else {
				chrome.browserAction.setBadgeText({ text: ''});
			}
		});
	});
});
