let dom = document;

const currentDate = new Date()
const dateElement = dom.getElementById('date');
dateElement.textContent = currentDate.toDateString();

function _updateClock(){
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2,'0');
  const minutes = currentTime.getMinutes().toString().padStart(2,'0');
  const seconds = currentTime.getSeconds().toString().padStart(2,'0');

  const timeString = hours + ':' + minutes + ':' + seconds;

  const clockElement = dom.getElementById('clock');
  clockElement.textContent = timeString;
}
_updateClock();
setInterval(_updateClock, 500);


/*times table*/

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