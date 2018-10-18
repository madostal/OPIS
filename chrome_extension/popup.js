let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
	changeColor.style.backgroundColor = data.color;
	changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: 'content-script.js' }, 
			function(results) {
				// TODO: later maybe showing results here in popup
				document.querySelector('.results').innerHTML = results;
			}
		);
	});
};
