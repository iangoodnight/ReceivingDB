document.addEventListener(
  'DOMContentLoaded',
  function () {
    const form = document.querySelector('#login-form');

    async function handleSubmit(e) {
      e.preventDefault();
      const {
        target: { elements },
      } = e;
      const username = elements['username'].value || null;
      const password = elements['password'].value || null;
      if (!username) return handleErrors(['* Username required']);
      if (!password) return handleErrors([null, '* Password required']);
      const data = { username, password };
      const postLogin = await fetch('/api/auth', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await postLogin.json();
      const { success, message } = response;
      if (!success) return handleErrors([null, null, message]);
      window.location.replace('/');
    }

    function handleErrors(errors) {
      const [
        userWarning,
        passwordWarning,
        genericWarning,
      ] = document.querySelectorAll('p.errors');
      const [usernameError, passwordError, genericError] = errors;
      userWarning.textContent = usernameError ? usernameError : '';
      passwordWarning.textContent = passwordError ? passwordError : '';
      genericWarning.textContent = genericError ? genericError : '';
    }

    form.addEventListener('submit', handleSubmit, false);
  },
  false
);
