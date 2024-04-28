/**
 * Listen for keydown events and prevent the default behavior of backspace 
 */
document.addEventListener('keydown', function(event) {
	const target = event.target;
	// Substack uses a contenteditable div to render the text editor, so we need to check if the target is editable
	const isEditable = target.isContentEditable;
	if ((event.key === "Backspace") && (isEditable || target.nodeName === "INPUT" || target.nodeName === "TEXTAREA")) {
		event.preventDefault();
		updateCounter('backspace');
	}

	if (isEditable) {
		// Prevent default behavior for left and right arrow keys
		if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
				event.preventDefault();
				console.log('Left or Right movement blocked');
		}
}
}, true);

/**
 * Listen for copy events and prevent the default behavior
 */
document.addEventListener('copy', function(event) {
	if (!event.target.isContentEditable) return;
	event.preventDefault();
	updateCounter('copy');
}, true);

/**
 * Listen for paste events and prevent the default behavior
 */
document.addEventListener('paste', function(event) {
	if (!event.target.isContentEditable) return;
	event.preventDefault();
	updateCounter('paste');
}, true);

/**
 * Use Chrome Storage API to store the number of times a user attempts to backspace, copy, and paste.
 */
async function updateCounter(action) {
	const key = `${action}Count`;
	let items = await chrome.storage.sync.get([key]);
	let count = items[key] || 0;
	count++;
	await chrome.storage.sync.set({[key]: count});
}