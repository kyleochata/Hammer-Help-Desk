//modal start
const showNewTicketBtn = document.getElementById('new-ticket-btn');
const newTicketModal = document.getElementById('new-ticket-modal');
const closeNewTicketBtn = document.getElementById('close-ticket-modal');

//open & close new ticket modal
showNewTicketBtn.addEventListener('click', () => {
  newTicketModal.style.right = '0px';
  newTicketModal.classList.remove('hidden');
});
closeNewTicketBtn.addEventListener('click', () => {
  newTicketModal.style.right = '-300px'; // Slide the dialogue out to the right
  newTicketModal.classList.add('hidden');
});
//modal end

//logout btn start
const logoutBtn = document.querySelector('#logout-btn');

const logoutHandle = async (event) => {
  event.preventDefault()
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Failed to log out. Please try again')
  }
}

logoutBtn.addEventListener('click', logoutHandle)
//logout btn end

//create ticket btn
const createTicketBtn = document.querySelector('#submit-ticket');

const createTicketHandle = async (event) => {
  event.preventDefault();
  const subject = document.querySelector('#subject').value.trim();
  const description = document.querySelector('#description').value.trim();
  const urgency = document.querySelector('#urgency').value;
  console.log(subject, description, urgency)
  const response = await fetch('/api/ticket', {
    method: 'POST',
    body: JSON.stringify({ subject, description, urgency }),
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    console.log({ message: 'ticket has been created' })
  } else {
    // console.error(err)
    alert('request failed. Please try again')
  }
}

createTicketBtn.addEventListener('click', createTicketHandle)