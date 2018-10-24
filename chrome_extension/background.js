chrome.runtime.onInstalled.addListener(() => {
  	chrome.storage.sync.set({results: null}, () => {
		console.log('Old results deleted.');
	});

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { urlMatches: 'http://*/*' },
				}),
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { urlMatches: 'https://*/*' },
				})
			],
			actions: [
				new chrome.declarativeContent.ShowPageAction()
			]
		}]);
	});

	chrome.tabs.onUpdated.addListener((tabId, info) => {
		if (info.status === 'complete') {
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				if (tabs[0].url.match('http://*/*') !== null || tabs[0].url.match('https://*/*') !== null) {
					chrome.tabs.sendMessage(tabs[0].id, { audit: true }, (response) => {
						console.log(response);
					});
				}
			});
		}
	});
});
