const withAuth = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  }
  else { next(); }
};

const determineClass = (value) => {
  // return a STRING for appropriate class determined by a SWITCH CASE.
  // USE for Hidden or Shown class to the HIDE/SHOW eye icons in messages.
  // USE for left-align or right-align on message bubbles.
  switch (value) {
    case 'hidden':
      return 'hidden';
    case 'shown':
      return 'shown';
    case 'left-align':
      return 'left-align';
    case 'right-align':
      return 'right-align';
      // // If the value doesn't match any case, return a default class or handle it as needed
    default:
      return 'default-class';
  }
};

const messageIconClass = determineClass('hidden');
const messageBubbleClass = determineClass('left-align');
console.log('Message Icon Class:', messageIconClass);
console.log('Message Bubble Class:', messageBubbleClass);

const format_date = (date) => {
  //month is index 0-11. must add 1 to get correct month
  let timeStamp = new Date(date);
  let monthNum = timeStamp.getMonth();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let currentMonth = months[monthNum];
  let day = timeStamp.getDate();
  let year = timeStamp.getFullYear();

  const time = format_timeStamp(timeStamp)

  return `${currentMonth} ${day}, ${year} ${time}`

}
const format_timeStamp = (date) => {
  let timeStamp = new Date(date);
  let hours = timeStamp.getHours();
  let minutes = timeStamp.getMinutes();
  let amOrPm = hours >= 12 ? 'PM' : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12
  return `${hours}:${minutes} ${amOrPm}`
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
  

module.exports = { withAuth, format_date, format_timeStamp,findDiff, determineClass };