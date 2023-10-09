
const showDialogueButton = document.getElementById('show-dialogue');
const closeDialogueButton = document.getElementById('close-dialogue');
const dialogueModal = document.getElementById('chat-dialogue');
//open & close the chat log modal
showDialogueButton.addEventListener('click', () => {
    // dialogueModal.style.right = '0px';
    dialogueModal.classList.remove('hidden');
    dialogueModal.classList.add('openDrawer');
});
closeDialogueButton.addEventListener('click', () => {
    // dialogueModal.style.right = '-300px'; // Slide the dialogue out to the right
    dialogueModal.classList.remove('openDrawer')
    dialogueModal.classList.add('hidden');
});

const modalClass = () => {
    const urlEnd = window.location.href.split('=')
    console.log(urlEnd)
    if (urlEnd[1] === 'true') {
        dialogueModal.classList.remove('hidden');
        dialogueModal.classList.add('openDrawer');
    } else {
        return;
    }
}
modalClass()

console.log("Script Loaded");

document.addEventListener("DOMContentLoaded", function () {
    const editTicketForm = document.getElementById('editTicketForm');

    console.log("DOMContentLoaded fired");

    if (editTicketForm) {
        editTicketForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Extract data from the form
            const formData = new FormData(editTicketForm);
            const ticketId = editTicketForm.getAttribute('data-id');
            const status = formData.get('status');
            const techId = Number(formData.get('techId'));
            const urgency = formData.get('urgency');
            const isArchived = formData.get('isArchived');

            console.log("Ticket ID: " + ticketId);

            // Prepare data for the PUT request
            const payload = {
                status,
                techId,
                urgency,
                isArchived: isArchived === "true" // Convert string to boolean
            };

            console.log("payload: " + payload.status);
            console.log("payload: " + payload.techId);
            console.log("payload: " + payload.urgency);
            console.log("payload: " + payload.isArchived);
            console.log(JSON.stringify(payload));

            // Send PUT request using fetch
            const response = await fetch(`../api/ticket/${ticketId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                console.log({ message: 'edited' });
                window.location.reload();
            } else {
                // console.error(err)
                alert('request failed. Please try again')
            }
        });
    }
});