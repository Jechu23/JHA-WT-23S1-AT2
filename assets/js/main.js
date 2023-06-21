/* DIGITAL CLOCK */
let dom = document;
const currentDate = new Date();
const dateElement = dom.getElementById('date');
dateElement.textContent = currentDate.toDateString();
let isColonVisible = true;
const clockElement = dom.getElementById('clock');
const colonElement = dom.createElement('span');
colonElement.id = 'colon';
colonElement.style.fontSize = 'inherit';
clockElement.appendChild(colonElement);

function _updateClock() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');

  // Check if the clock should be displayed in 12-hour or 24-hour format
  let timeFormat = '12-hour';
  if (timeFormat === '12-hour') {
    let period = 'AM';
    if (hours >= 12) {
      period = 'PM';
    }
    hours = hours % 12 || 12; // Convert to 12-hour format
    clockElement.innerHTML = hours.toString().padStart(2, '0') + (isColonVisible ? ':' : '&nbsp;') + minutes + ' ' + period;
  } else {
    clockElement.innerHTML = hours.toString().padStart(2, '0') + (isColonVisible ? ':' : '&nbsp;') + minutes;
  }

  // Toggle the visibility of the colon every half-second
  isColonVisible = !isColonVisible;
}

_updateClock();
setInterval(_updateClock, 500);






/*TIMES TABLE*/
const form = dom.getElementById('simpleFrom');
form.addEventListener('submit', generateTimesTable);
function generateTimesTable(event)
{
  event.preventDefault();
  const numberInput = dom.getElementById('numberInput');
  const outputZone = dom.getElementById('outputZone');
  const inputValue = numberInput.value;
  outputZone.innerHTML = '';
  if(inputValue === '')
  {
    outputZone.innerHTML = 'Please enter number from 1 to 20:';
    return;
  }
  const num = parseInt(inputValue, 10);
  if(num <1 || num >20)
  {
    outputZone.innerHTML = 'Please enter number form 1 to 20:';
    return;
  }

  for(let i = 1; i <=12; i++)
  {
    const result = i * num;
    const equation = `${i} x ${num} = ${result}`;
    const equationEl = dom.createElement('p');
    equationEl.textContent = equation;
    outputZone.appendChild(equationEl);
  }
}