document.addEventListener(
  'DOMContentLoaded',
  function () {
    const resetForm = document.querySelector('form#reset-form');

    resetForm.addEventListener('submit', handleSubmit, false);

    async function handleSubmit(event) {
      event.preventDefault();
      clearErrors();

      const password = resetForm.querySelector('input#password').value;

      const validate = resetForm.querySelector('input#password-confirmation')
        .value;

      if (password !== validate) return handleErrors('*Passwords must match');
      if (!password || !validate)
        return handleErrors('*Please confirm password');

      const data = { password };

      try {
        const response = await putReset(data);
        const { success } = response;
        if (!success) {
          const { message } = response;
          return handleErrors(message);
        }
        return (window.location = '/');
      } catch (err) {
        handleErrors(err);
      }
    }

    function handleErrors(err) {
      const errorSpan = document.querySelector('span.errors');

      errorSpan.innerText = err;
      errorSpan.classList.add('active');
    }

    function clearErrors() {
      const errorSpan = document.querySelector('span.errors');

      errorSpan.innerText = '';
      errorSpan.classList.remove('active');
    }

    async function putReset(data) {
      const request = await fetch('/api/auth', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      return response;
    }
  },
  false
);
