document.addEventListener(
  'DOMContentLoaded',
  function () {
    const backButtons = Array.from(document.querySelectorAll('button.browse'));

    backButtons.map((button) => {
      button.addEventListener('click', () => history.back(), false);
    });
  },
  false
);
