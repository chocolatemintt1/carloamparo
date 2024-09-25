// Disable right-click, F12, Ctrl+Shift+I, Ctrl+U
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || 
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};
