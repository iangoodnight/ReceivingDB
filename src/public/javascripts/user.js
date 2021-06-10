document.addEventListener(
  'DOMContentLoaded',
  function () {
    const tableRows = Array.from(document.querySelectorAll('tbody > tr'));

    tableRows.forEach((row) => {
      row.addEventListener('dblclick', navigateToUserPage, false);
      row.addEventListener('keypress', navigateToUserPage, false);
    });

    function navigateToUserPage(event) {
      const { target, type } = event;
      if (type === 'keypress') {
        const { key } = event;
        if (key !== 'Enter') return;
      }
      const row = target.closest('tr');
      const {
        dataset: { id },
      } = row;
      window.location = `/user/${id}`;
    }
  },
  false
);
