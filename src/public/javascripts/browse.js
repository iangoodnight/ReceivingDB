document.addEventListener(
  'DOMContentLoaded',
  function () {
    const table = document.querySelector('div.table-container table');

    table.addEventListener(
      'click',
      function focusRow(event) {
        const { target } = event;
        const row = target.closest('tr');
        if (row) row.focus();
      },
      false
    );

    table.addEventListener('keydown', dispatchNavigation, false);
    table.addEventListener('dblclick', handleDblClk, false);

    function dispatchNavigation(event) {
      if (!event) return;
      const { code, srcElement } = event;
      if (code === 'Enter') return navigatePage(srcElement);
      const { nextElementSibling, previousElementSibling } = srcElement;
      const keys = {
        ArrowDown: nextElementSibling,
        ArrowUp: previousElementSibling,
      };
      const siblingElem = keys[code];
      const siblingQualifier = 'tr';
      navigateRow(siblingElem, siblingQualifier);
    }

    function handleDblClk(event) {
      const { srcElement } = event;
      const row = srcElement.closest('tr');
      navigatePage(row);
    }

    function navigateRow(siblingElem, matchElemType) {
      if (!siblingElem) return;
      const { localName = null } = siblingElem;
      if (localName === matchElemType) siblingElem.focus();
    }

    function navigatePage(srcElement) {
      const { dataset } = srcElement;
      const { entry } = dataset;
      if (entry) window.location = `/view/${entry}`;
    }
  },
  false
);
