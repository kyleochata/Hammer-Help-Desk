
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
  });
  console.log(response)
  if (response.ok) {
    console.log({ message: 'ticket has been created' })
    const ticketId = response.url.split('/')[
      response.url.split('/').length - 1
    ];
    console.log(ticketId)
    document.location.replace(`/ticket/${ticketId}`)
    // window.location.reload();
  } else {
    // console.error(err)
    alert('Request failed. Please try again')
  }
}

createTicketBtn.addEventListener('click', createTicketHandle)
//end create ticket btn


const openBtn = document.querySelector('#open-btn');
const openTicketHandle = async (event) => {
  event.preventDefault();
  const response = await fetch('/Open', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.replace('/Open')
  } else {
    alert('Get open ticked failed. Please try again')
  }
};

const claimedBtn = document.querySelector('#claimed-btn');
const claimedTicketHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/Claimed', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.replace('/Claimed')
  } else {
    alert('Get claimed ticket failed. Please try again')
  }
};

const pendingBtn = document.querySelector('#pending-btn');
const pendingTicketHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/Pending', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.replace('/Pending')
  } else {
    alert('Get claimed ticket failed. Please try again')
  }
};

const resolvedBtn = document.querySelector('#resolved-btn');
const resolvedTicketHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/Resolved', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.replace('/Resolved')
  } else {
    alert('Get claimed ticket failed. Please try again')
  }
};

const userId = document.getElementById('userData').getAttribute('data-user-id');

const claimTicketBtns = document.querySelectorAll('#claim-btn');

claimTicketBtns.forEach((button) => {
  button.addEventListener('click', async () => {
    const ticketId = button.getAttribute('data-id');
    try {
      const response = await fetch(`/api/ticket/${ticketId}`, {
        method: 'PUT',
        body: JSON.stringify({ techId: userId, status: 'Claimed' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('redirecting');
        window.location.reload();
      } else {
        // if ticket claiming fails
        console.error(`Error claiming ticket ${ticketId}:`, response.statusText);
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  });
});


openBtn.addEventListener('click', openTicketHandle);
claimedBtn.addEventListener('click', claimedTicketHandler);
pendingBtn.addEventListener('click', pendingTicketHandler);
resolvedBtn.addEventListener('click', resolvedTicketHandler);

// start header animation
const wrapper = document.querySelector('#tile-anime');
let columns = 0,
  rows = 0,
  toggled = false;

const toggle = () => {
  toggled = !toggled;

  document.querySelector('.animation-container').classList.toggle("toggled");
  // document.querySelectorAll('.tile').classList.toggle('toggled')
}

const handleOnClick = index => {
  toggle();

  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");

  tile.classList.add("tile");

  tile.style.opacity = toggled ? 0 : 1;

  tile.onclick = e => handleOnClick(index);

  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";

  const size = document.querySelector('.animation-container').clientWidth > 800 ? 75 : 50;

  columns = Math.floor(document.querySelector('.animation-container').clientWidth / size);
  rows = Math.floor(document.querySelector('.animation-container').clientHeight / size);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();
//end header animation