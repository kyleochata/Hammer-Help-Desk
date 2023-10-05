
const showDialogueButton = document.getElementById('show-dialogue');
const closeDialogueButton = document.getElementById('close-dialogue');
const dialogueModal = document.getElementById('chat-dialogue');

const showNewTicketBtn = document.getElementById('new-ticket-btn');
const newTicketModal = document.getElementById('new-ticket-modal');
const closeNewTicketBtn = document.getElementById('close-ticket-modal');

//open & close the chat log modal
showDialogueButton.addEventListener('click', () => {
  dialogueModal.style.right = '0px';
  dialogueModal.classList.remove('hidden');
});
closeDialogueButton.addEventListener('click', () => {
  dialogueModal.style.right = '-300px'; // Slide the dialogue out to the right
  dialogueModal.classList.add('hidden');
});

//open & close new ticket modal
showNewTicketBtn.addEventListener('click', () => {
  newTicketModal.style.right = '0px';
  newTicketModal.classList.remove('hidden');
});
closeNewTicketBtn.addEventListener('click', () => {
  newTicketModal.style.right = '-300px'; // Slide the dialogue out to the right
  newTicketModal.classList.add('hidden');
});

//already in home and tickets