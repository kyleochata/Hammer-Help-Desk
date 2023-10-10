
const showDialogueButton = document.getElementById('show-dialogue');
const closeDialogueButton = document.getElementById('close-dialogue');
const dialogueModal = document.getElementById('chat-dialogue');
//open & close the chat log modal
if (showDialogueButton){
    showDialogueButton.addEventListener('click', () => {
        // dialogueModal.style.right = '0px';
        dialogueModal.classList.remove('hidden');
        dialogueModal.classList.add('openDrawer');
    });
}

if (closeDialogueButton)
{
    closeDialogueButton.addEventListener('click', () => {
        // const ticketId = editTicketForm.getAttribute('data-id');
        // dialogueModal.style.right = '-300px'; // Slide the dialogue out to the right
        dialogueModal.classList.remove('openDrawer')
        dialogueModal.classList.add('hidden');
        // window.location.replace(`/ticket/${ticketId}`);
    });
}


//function to try and keep the modal open 
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
                window.location.replace(`/ticket/${ticketId}`);
                // window.location.reload();
            } else {
                // console.error(err)
                alert('request failed. Please try again')
            }
        });
    }
});

















const editButton = document.getElementById('bsEditButton');
const input = document.querySelectorAll('.field');
console.log(input);
if (editButton)
{
    editButton.addEventListener('click', async function() {
        console.log("\n\n\n\nhi the save change button was clicked");
        // Get values from inputs and selects
        const ticketId = document.getElementById('ticketid').getAttribute('data-id');
        console.log(ticketId);
        let subject = document.getElementById('subjectInput').value;
        let description = document.getElementById('descriptionInput').value;
        // let status = document.getElementById('statusSelect').value;
        let urgency = document.getElementById('urgencySelect').value;
    
        // Data to be sent
        let data = {
            subject: subject,
            description: description,
            urgency: urgency
        };
    
        // Send PUT request
        const response = await fetch(`../api/ticket/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log({ message: 'edited' });
            window.location.replace(`/ticket/${ticketId}`);
            //window.location.reload();
        } else {
            // console.error(err)
            alert('request failed. Please try again')
        }
    });
}


async function toggleVisibility(element,logid,message,type) {
    const ticketId = editTicketForm.getAttribute('data-id');
    let state = 0;
    if (element.classList.contains('Dshown')) {
        element.classList.remove('Dshown');
        element.classList.add('Dhidden');
        state = 1;
        // You might want to update the server about the hidden status here.
    } else {
        element.classList.remove('Dhidden');
        element.classList.add('Dshown');
        state = 0;
        // You might want to update the server about the shown status here.
    }

    let data = {
        message:message,
        type:type,
        isHidden: state
    };

    console.log("\n\n\n" + 123);

    const response = await fetch(`../api/log/${logid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    // if (response.ok) {
    //     console.log({ message: 'edited' });
    //     //window.location.replace(`/ticket/${ticketId}/`);
    //     //window.location.reload();
    // } else {
    //     // console.error(err)
    //     alert('request failed. Please try again')
    // }
}


function countCharacters(string) {
    return string.length;
}
/*
const descriptionText = document.getElementById('#bsType');
const charCount = countCharacters(descriptionText.value);
document.documentElement.style.setProperty('--character-count', characterCount);

*/

function urgency() {

    const urgency = document.getElementById('bsUrgency');
    console.log(urgency);

    if (urgency.textContent === 'Low') {
        urgency.style.color = 'green';
    }
    else if (urgency.textContent === 'Medium') {
        urgency.style.color = 'yellow';
    }
    else {
        urgency.style.color = 'red';
    }

};

urgency();