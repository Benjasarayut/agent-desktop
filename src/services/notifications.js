export function notify(title, body, { sound = false } = {}) {
if (window.electronAPI?.showNotification) {
window.electronAPI.showNotification(title, body);
} else if ('Notification' in window) {
if (Notification.permission === 'granted') new Notification(title, { body });
else if (Notification.permission !== 'denied') Notification.requestPermission();
}


if (sound) {
const audio = new Audio('/assets/notify.mp3');
audio.play().catch(() => {});
}
}