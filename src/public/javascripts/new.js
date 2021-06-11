document.addEventListener(
  'DOMContentLoaded',
  function () {
    const count = { inputs: 3 };
    const form = document.querySelector('form#new-items');
    const addItemsButton = document.querySelector('button#add-items');
    const auditInputs = Array.from(
      document.querySelectorAll('input.unaltered')
    );
    let errorElems = document.querySelectorAll('span.errors');

    form.addEventListener('submit', handleSubmit, false);
    addItemsButton.addEventListener('click', addInputGroup, false);

    auditInputs.forEach((input) => {
      input.addEventListener('change', removeUnaltered, false);
    });

    function removeUnaltered(event) {
      const element = event.target;
      element.classList.remove('unaltered');
    }

    async function handleSubmit(event) {
      event.preventDefault();
      toggleLoader();
      resetErrors();
      const elements = form.elements;
      const formErrs = new ErrorCollection();
      if (formErrs.errs.length) formErrs.reset();
      const [
        dayInput,
        timeInput,
        vendorInput,
        purchaseOrderInput,
        carrierInput,
        intendedForInput,
        ...itemInputs
      ] = elements;
      const day = validate(dayInput);
      const time = validate(timeInput);
      if (!day || day.length > 10) formErrs.setError(0);
      if (!time) formErrs.setError(1);

      const date = formatDate(day, time);
      const vendor = validate(vendorInput) || formErrs.setError(2);
      const purchaseOrder =
        validate(purchaseOrderInput) || formErrs.setError(3);
      const carrier = validate(carrierInput) || formErrs.setError(4);
      const intendedFor = validate(intendedForInput) || formErrs.setError(5);
      const items = [];
      let remainingInputs = [...itemInputs];
      let itemCount = 0;
      const isAudit = Array.from(form.classList).includes('audit-update');
      const unaltered = 'UNALTERED';
      while (remainingInputs.length > 2) {
        const [
          itemInput,
          nepInput,
          vLotInput,
          qtyInput,
          unitInput,
          ...rest
        ] = remainingInputs;
        const errorIdx = 6 + itemCount * 5;
        const item = validate(itemInput);
        const nepNumber = validate(nepInput);
        const vendorLot = validate(vLotInput);
        const number = validate(qtyInput);
        const unit = validate(unitInput);
        const _id = isAudit ? itemInput.dataset.id : false;
        if (item || nepNumber || vendorLot || number || unit) {
          if (!item) formErrs.setError(errorIdx);
          if (!nepNumber) formErrs.setError(errorIdx + 1);
          if (!vendorLot) formErrs.setError(errorIdx + 2);
          if (!number) formErrs.setError(errorIdx + 3);
          if (!unit) formErrs.setError(errorIdx + 4);
        }
        if (item && nepNumber && vendorLot && number && unit) {
          const itemData = {};
          const quantity = {};
          let isAltered = false;
          if (number !== unaltered) quantity.number = number;
          if (unit !== unaltered) quantity.unit = unit;
          if (number !== unaltered || unit !== unaltered) {
            isAltered = true;
            itemData.quantity = quantity;
          }
          if (item !== unaltered) {
            itemData.item = item;
            isAltered = true;
          }
          if (vendorLot !== unaltered) {
            itemData.vendorLot = vendorLot;
            isAltered = true;
          }
          if (nepNumber !== unaltered) {
            itemData.nepNumber = nepNumber;
            isAltered = true;
          }
          if (isAltered && isAudit && _id) itemData._id = _id;
          items.push(itemData);
        }
        remainingInputs = [...rest];
        itemCount++;
      }
      if (formErrs.isErrs) {
        toggleLoader();
        return setErrors(formErrs.errs);
      }
      const data = {};

      if (items.length) data.items = items;
      if (day !== unaltered || time !== unaltered) data.date = date;
      if (carrier !== unaltered) data.carrier = carrier;
      if (intendedFor !== unaltered) data.intendedFor = intendedFor;
      if (purchaseOrder !== unaltered) data.purchaseOrder = purchaseOrder;
      if (vendor !== unaltered) data.vendor = vendor;

      let response;

      if (isAudit) {
        const { id } = form.dataset;
        try {
          response = await putAuditEntry(data, id);
          const { success } = response;
          if (success) window.location = `/view/${id}`;
          const {
            data: { message },
          } = response;
          console.log(response);
          formErrs.setError(errorElems.length - 1, message);
        } catch (err) {
          console.log(err);
          formErrs.setError(errorElems.length - 1, 'Something went wrong');
        }
      } else {
        try {
          response = await postNewEntry(data);
          const { success } = response;
          if (success) return window.location.replace('/browse?start=6');
          const {
            data: { message },
          } = response;
          console.log(response);
          formErrs.setError(errorElems.length - 1, message);
        } catch (err) {
          console.log(err);
          formErrs.setError(errorElems.length - 1, 'Something went wrong');
        }
      }
      toggleLoader();
    }

    async function postNewEntry(data) {
      const request = await fetch('/api/entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      return response;
    }

    async function putAuditEntry(data, id) {
      data._id = id;
      const request = await fetch(`/api/entry/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      return response;
    }

    function formatDate(dateStr, timeStr) {
      const currDate = document.querySelector('input#date').value;
      const currTime = document.querySelector('input#time').value;
      if (dateStr === 'UNALTERED') dateStr = currDate;
      if (timeStr === 'UNALTERED') timeStr = currTime;
      const [hours, minutes] = timeStr.split(':');
      const [year, month, day] = dateStr.split('-');
      const formatted = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
      return formatted;
    }

    function ErrorCollection() {
      this.errs = [];
      this.isErrs = false;
      this.setError = (index, msg) => {
        this.isErrs = true;
        this.errs[index] = errorMessages[index] || msg || defaultMsg;
        return false;
      };
      this.reset = () => (this.errs = []);
      const defaultMsg = '*This field is required';
      const errorMessages = [
        '*Please provide a valid date',
        '*Please provide a valid time',
      ];
    }

    function validate(elem) {
      const { value } = elem;
      const isUnaltered = Array.from(elem.classList).includes('unaltered');
      if (value && value.length !== 0 && !isUnaltered) return value;
      if (value && value.length !== 0 && isUnaltered) return 'UNALTERED';
      return null;
    }

    function setErrors(errors = []) {
      const errorSpans = Array.from(errorElems);
      errorSpans.forEach((elem, i) => {
        if (errors[i]) {
          elem.textContent = errors[i];
          elem.classList.add('active');
        }
      });
    }

    function resetErrors(errCollection) {
      const errorElems = Array.from(document.querySelectorAll('span.errors'));
      errorElems.forEach((elem) => {
        const { classList } = elem;
        if (classList.contains('active')) classList.remove('active');
      });
    }

    function toggleLoader() {
      const loader = document.querySelector('div#loader');
      loader.classList.toggle('loading');
    }

    function addInputGroup(event) {
      const { srcElement } = event;
      const form = srcElement.closest('form');
      const buttonRow = srcElement.closest('div.form-row');
      const number = ++count.inputs;
      const newInput = inputGroup(number);
      form.insertBefore(newInput, buttonRow);
      window.getComputedStyle(newInput).opacity;
      window.getComputedStyle(newInput).height;
      newInput.classList.remove('hidden');
      errorElems = document.querySelectorAll('span.errors');
    }

    function inputGroup(i = 4) {
      const div = document.createElement('div');
      div.classList.add('form-row', 'flex-split', 'hidden');
      div.innerHTML = `
      <div class="form-group form-items">
        <input
          aria-labelledby="item${i}-label"
          id="item${i}"
          maxLength="128"
          name="item${i}"
          type="text"
        />
        <label for="item${i}" id="item${i}-label">
          Item<span class="errors"></span>
        </label>
      </div>
      <div class="form-group details">
        <input
          aria-labelledby="nep${i}-label"
          id="nep${i}"
          maxLength="64"
          name="nep${i}"
          type="text"
        />
        <label for="nep${i}" id="nep${i}-label">
          NEP #<span class="errors"></span>
        </label>
        <input
          aria-labelledby="vlot${i}-label"
          id="vlot${i}"
          maxLength="64"
          name="vlot${i}"
          type="text"
        />
        <label for="vlot${i}" id="vlot${i}-label">
          Vendor Lot/Batch #<span class="errors"></span>
        </label>
      </div>
      <div class="form-group details">
        <input
          aria-labelledby="qty${i}-label"
          id="qty${i}"
          max="1000000"
          min="1"
          name="qty${i}"
          type="number"
        />
        <label for="qty${i}" id="qty${i}-label">
          Quantity<span class="errors"></span>
        </label>
        <input
          aria-labelledby="unit${i}-label"
          id="unit${i}"
          maxLength="64"
          name="unit${i}"
          type="text"
        />
        <label for="unit${i}" id="unit${i}-label">
          Unit<span class="errors"></span>
        </label>
      </div>`;
      return div;
    }
  },
  false
);
