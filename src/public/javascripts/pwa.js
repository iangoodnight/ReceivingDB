document.addEventListener('DOMContentLoaded', init, false);

function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(
      () => {
        console.log('Welcome!');
      },
      (err) => {
        console.error('Service worker not registered -->', err);
      }
    );
  }
}
