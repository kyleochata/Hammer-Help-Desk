// Logic to reach the post route for /api/user
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Need to query select .value.trim() the email
  // Need to determine what id the email will be
  let email = document.querySelector('#login-email').value.trim();
  // Need to determine id of PW in handlebars
  const password = document.querySelector('#login-password').value.trim();
  console.log(email, password)
  if (email && password) {
    const response = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/')
    } else {
      alert('Failed to log in.')
    }
  }
};

// Listen for submit events on the loginForm element. When the submit event occurs, capture the form field data and POST to /api/user
// Event listeners 
document.querySelector('#login-btn').addEventListener('submit', loginFormHandler)