document.addEventListener(
  'DOMContentLoaded',
  function () {
    const searchByDate = document.querySelector('button#bydate-search');

    const searchByPo = document.querySelector('button#po-view');

    const searchByPartNo = document.querySelector('button#part-number-search');

    const searchByVendor = document.querySelector('button#vendor-search');

    searchByDate.addEventListener('click', handleSearchByDate, false);

    searchByPo.addEventListener('click', handleSearchByPo, false);

    searchByPartNo.addEventListener('click', handleSearchByPartNo, false);

    searchByVendor.addEventListener('click', handleSearchByVendor, false);

    function handleSearchByDate() {
      clearErrs();
      const startElem = document.querySelector('input#bydate-start');
      const endElem = document.querySelector('input#bydate-end');
      const startDate = parseDateInput(startElem);
      const endDate = parseDateInput(endElem);
      if (startDate > endDate) {
        setInputError(startElem, '*Invalid range');
        return setInputError(endElem, '*Invalid range');
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDay = daysBetween(today, startDate);
      const endDay = daysBetween(today, endDate);
      window.location = `/browse?start=${startDay - 1}&end=${endDay - 1}`;
    }

    function handleSearchByPo() {
      clearErrs();
      const inputElem = document.querySelector('input#po');
      const inputVal = inputElem.value;
      if (!inputVal || !inputVal.length) {
        return setInputError(inputElem, '*Required');
      }
      window.location = `/view/po/${inputVal.trim()}`;
    }

    function handleSearchByPartNo() {
      clearErrs();
      const startElem = document.querySelector('input#part-number-from');
      const endElem = document.querySelector('input#part-number-through');
      const inputElem = document.querySelector('input#part-number');
      const startDate = parseDateInput(startElem);
      const endDate = parseDateInput(endElem);
      if (startDate > endDate) {
        setInputError(startElem, '*Invalid range');
        return setInputError(endElem, '*Invalid range');
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDay = daysBetween(today, startDate);
      const endDay = daysBetween(today, endDate);
      const { value } = inputElem;
      if (!value) return setInputError(inputElem, '*Required');
      const partNumber = encodeURI(value);
      return (window.location = `/browse?start=${startDay - 1}&end=${
        endDay - 1
      }&filter=nepNumber&value=${partNumber.trim()}`);
    }

    function handleSearchByVendor() {
      clearErrs();
      const startElem = document.querySelector('input#vendor-from');
      const endElem = document.querySelector('input#vendor-through');
      const inputElem = document.querySelector('input#vendor');
      const startDate = parseDateInput(startElem);
      const endDate = parseDateInput(endElem);
      if (startDate > endDate) {
        setInputError(startElem, '*Invalid range');
        return setInputError(endElem, '*Invalid range');
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDay = daysBetween(today, startDate);
      const endDay = daysBetween(today, endDate);
      const { value } = inputElem;
      if (!value) return setInputError(inputElem, '*Required');
      const vendor = encodeURI(value);
      return (window.location = `/browse?start=${startDay - 1}&end=${
        endDay - 1
      }&filter=vendor&value=${vendor.trim()}`);
    }

    function setInputError(input, msg) {
      const inputGroup = input.closest('div.input-group');
      const errorSpan = inputGroup.querySelector('span.errors');
      errorSpan.innerText = msg;
      errorSpan.classList.add('active');
    }

    function clearErrs() {
      const errorSpans = Array.from(document.querySelectorAll('span.errors'));
      errorSpans.forEach((span) => {
        span.classList.remove('active');
        span.innerText = '';
      });
    }

    function parseDateInput(inputElem) {
      const { value } = inputElem;
      if (!value) return setInputError(inputElem, '*Date required');
      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    function daysBetween(date1, date2) {
      const timeDifference = date1.getTime() - date2.getTime();
      return Math.round(timeDifference / (24 * 60 * 60 * 1_000));
    }
  },
  false
);
