// Logic to reach the post route for /api/user
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Need to query select .value.trim() the email
  // Need to determine what id the email will be
  const email = document.querySelector().value.trim;
  // Need to determine id of PW in handlebars
  const password = document.querySelector().value.trim();

  if (email && password) {
    const response = await fetch('./api/user/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-type': 'application/json' },
    });
    if (response.ok) {
      console.log('Response was handled');
    } else {
      alert('Failed to log in.')
    }
  }
};

// Listen for submit events on the loginForm element. When the submit event occurs, capture the form field data and POST to /api/user
// Event listeners 
document.querySelector().addEventListener('submit')