const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  }
  else { next(); }
};

const determineAlignment = (log, currentUser) => {
  if (log.type === 'Created' || log.type === 'Modified') {
    return 'center-align';
  } else if (currentUser === log.userId) {
    return 'right-align';
  } else {
    return 'left-align';
  }
};

const determineShowHide = (value) => {
  if (value === true) {
    return 'hidden';
  } else {
    return 'shown';
  }
};

// const messageIconClass = determineShowHide('hidden');
// const messageBubbleClass = determineAlignment('left-align');
// console.log('Message Icon Class:', messageIconClass);
// console.log('Message Bubble Class:', messageBubbleClass);

const format_date = (date) => {
  //month is index 0-11. must add 1 to get correct month
  let timeStamp = new Date(date);
  let monthNum = timeStamp.getMonth();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let currentMonth = months[monthNum];
  let day = timeStamp.getDate();
  let year = timeStamp.getFullYear();

  const time = format_timeStamp(timeStamp);

  return `${currentMonth} ${day}, ${year} ${time}`;
}

const format_timeStamp = (date) => {
  let timeStamp = new Date(date);
  let hours = timeStamp.getHours();
  let minutes = timeStamp.getMinutes();
  let amOrPm = hours >= 12 ? 'PM' : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${amOrPm}`;
}

// console.log(format_date('December 17, 1995 15:24:00'));

function findDiff(newValue, oldValue) {
  let differences = [];
  // Iterate through each key in the newValue object
  for (let key in newValue) {

    // Check if this key exists in the oldValue
    if (!(key in oldValue)) {
      differences.push(`${key} was added with value ${newValue[key]}.`);
    } else if (typeof newValue[key] === "object" && newValue[key] !== null && !Array.isArray(newValue[key])) {
      // If the key is an object and not an array, recurse further
      differences = differences.concat(findDiff(newValue[key], oldValue[key], key));
    } else if (newValue[key] !== oldValue[key]) {
      // If there's a difference in primitive values
      differences.push(`${key} was changed from ${oldValue[key]} to ${newValue[key]}.`);
    }
  }

  // Check for keys in oldValue that don't exist in newValue (indicating they were removed)
  for (let key in oldValue) {

    if (!(key in newValue)) {
      differences.push(`${key} was removed (previously had value ${oldValue[key]}).`);
    }
  }

  return differences;
}

const ifCond = function (v1, operator, v2, options) {
  switch (operator) {
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    // ... add other operators as needed
    default:
      return options.inverse(this);
  }
}

const log = (value) => {
  console.log(value);
  return undefined;
};


module.exports = { withAuth, format_date, format_timeStamp, findDiff,ifCond,log };