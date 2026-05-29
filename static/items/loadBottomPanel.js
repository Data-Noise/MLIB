fetch('static/items/bottomPanel.html')
.then(response => response.text())
.then(html => {
	//document.getElementById('toolbar').innerHTML = html;
const container = document.getElementById('bottomPanel');
container.innerHTML = html;
container.querySelectorAll('script').forEach(oldScript => {
const newScript = document.createElement('script');
// Копируем атрибуты и содержимое
if (oldScript.src) {
	newScript.src = oldScript.src;
} else {
	newScript.textContent = oldScript.textContent;
}
// Копируем другие атрибуты
Array.from(oldScript.attributes).forEach(attr => {
	newScript.setAttribute(attr.name, attr.value);
});
oldScript.parentNode.replaceChild(newScript, oldScript);
});});