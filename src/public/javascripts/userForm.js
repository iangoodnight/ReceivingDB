document.addEventListener(
  'DOMContentLoaded',
  function () {
    const userForm = document.querySelector('form.user-form');

    const passwordInput = userForm.querySelector('input#password');

    const submissionError = userForm.querySelector('div#submission-errors');

    userForm.addEventListener('submit', handleFormSubmit, false);

    passwordInput.addEventListener(
      'change',
      () => {
        passwordInput.dataset.changed = true;
      },
      false
    );

    function handleFormSubmit(event) {
      event.preventDefault();
      clearErrs();

      const usernameElem = document.querySelector('input#username');
      const passwordElem = document.querySelector('input#password');
      const firstnameElem = document.querySelector('input#firstname');
      const lastnameElem = document.querySelector('input#lastname');
      const emailElem = document.querySelector('input#email');

      const username = valueOrError(usernameElem);
      const password = valueOrError(passwordElem);
      const firstName = valueOrError(firstnameElem);
      const lastName = valueOrError(lastnameElem);
      const email = valueOrError(emailElem);

      const required = [username, password, firstName, lastName, email];
      const firstError = document
        .querySelector('span.errors.active')
        ?.closest('div.form-group')
        .querySelector('input');

      if (required.indexOf(null) !== -1) return firstError.focus();

      const roles = Array.from(
        document.querySelectorAll('div.roles-group input')
      ).reduce((selected, input) => {
        const { checked = false, value = null } = input;
        if (checked) selected.push(value);
        return selected;
      }, []);

      const enabled = roles.indexOf('disabled') === -1;
      if (!enabled) roles.pop();

      const resetRequired = document.querySelector('input#reset').value;

      const name = { firstName, lastName };
      const userData = {
        username,
        password,
        name,
        email,
        roles,
        enabled,
        resetRequired,
      };
      const isUpdate = !!document.querySelector('form').dataset.id.length;
      if (!isUpdate) return postNewUser(userData);
      const userId = userForm.dataset.id;
      const passwordChanged = passwordElem.dataset.changed;
      if (!passwordChanged) delete userData.password;
      return updateUser(userId, userData);
    }

    async function postNewUser(userData) {
      const request = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const response = await request.json();
      if (response.success) return (window.location = '/user');
      handleMongoErrs(response);
    }

    async function updateUser(id, userData) {
      const request = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const response = await request.json();
      if (response.success) return (window.location = '/user');
      handleMongoErrs(response);
    }

    function valueOrError(elem) {
      const { value } = elem;
      if (!value || !value.length) {
        const inputGroup = elem.closest('div.form-group');
        const errorSpan = inputGroup.querySelector('span.errors');
        errorSpan.innerText = '*Required';
        errorSpan.classList.add('active');
        return null;
      }
      return value;
    }

    function handleMongoErrs(response) {
      const err = parseMongoErrs(response);
      submissionError.innerText = err;
    }

    function parseMongoErrs(response) {
      const { message } = response;
      console.log(message);
      const { name } = message;
      if (name === 'ValidationError') {
        const { message: err } = message;
        return err;
      }
      if (name === 'MongoError') {
        const { code, keyPattern } = message;
        const keys = Object.keys(keyPattern);
        const err =
          code === 1100
            ? `MongoError: ${keys.join(' ')} must be unique`
            : 'MongoError: something went wrong';
        return err;
      }
      return 'Something went wrong';
    }

    function clearErrs() {
      const activeErrorSpans = Array.from(
        document.querySelectorAll('span.errors.active')
      );
      activeErrorSpans.forEach((span) => {
        span.innerText = '';
        span.classList.remove('active');
      });
      submissionError.innerText = '';
    }
  },
  false
);
