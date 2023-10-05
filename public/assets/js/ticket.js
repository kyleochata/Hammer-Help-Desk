
const showDialogueButton = document.getElementById('show-dialogue');
const closeDialogueButton = document.getElementById('close-dialogue');
const dialogueModal = document.getElementById('chat-dialogue');
//open & close the chat log modal
showDialogueButton.addEventListener('click', () => {
  dialogueModal.style.right = '0px';
  dialogueModal.classList.remove('hidden');
});
closeDialogueButton.addEventListener('click', () => {
  dialogueModal.style.right = '-300px'; // Slide the dialogue out to the right
  dialogueModal.classList.add('hidden');
});
