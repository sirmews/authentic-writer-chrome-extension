/**
 * On document load, get the stored values of backspace, copy, and paste counts
 * Also attach an event listener to the clear button
 */
document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get(['backspaceCount', 'copyCount', 'pasteCount'], function(items) {
			document.getElementById('backspaceCount').textContent = items.backspaceCount || '0';
			document.getElementById('copyCount').textContent = items.copyCount || '0';
			document.getElementById('pasteCount').textContent = items.pasteCount || '0';
	});

	// We have to do this because of Chrome's Content Security Policy
	// It doesn't allow inline JavaScript, specifically the onclick attribute
	document.getElementById('clearButton').addEventListener('click', clearStats);
});

/**
 * Clear the stored values of backspace, copy, and paste counts
 */
function clearStats() {
	chrome.storage.sync.set({'backspaceCount': 0, 'copyCount': 0, 'pasteCount': 0}, () => {
			document.getElementById('backspaceCount').textContent = '0';
			document.getElementById('copyCount').textContent = '0';
			document.getElementById('pasteCount').textContent = '0';
	});
}
