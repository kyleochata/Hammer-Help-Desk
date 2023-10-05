
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