document.addEventListener(
  'DOMContentLoaded',
  function () {
    const logout = document.querySelector('#logout');

    async function handleLogout(e) {
      e.preventDefault();
      const logoutRequest = await fetch('/api/auth', {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      const response = await logoutRequest.json();
      const { success } = response;
      if (success) window.location.replace('/');
    }

    if (logout) logout.addEventListener('click', handleLogout, false);
  },
  false
);
