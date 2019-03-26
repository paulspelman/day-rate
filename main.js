const btn = document.querySelector('.calculate-button');
const inputField = document.querySelector('.user-input')
const earnedSoFar = document.querySelector('.display-earnings');
const earnedCopy = document.querySelector('.earned-copy');
let updateTotal;
inputField.focus();

function calculateEarning() {
    let dayRate = inputField.value;
    let secondRate = dayRate / 28800;
    let moneyEarned = 0;
    let date = new Date();
    let currentSeconds = (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds();
    
    if (dayRate === '') {
        inputField.focus();    
        return;
    } else if (isNaN(dayRate)) {
        inputField.focus();
        return;
    }

    if (currentSeconds > 36000 && currentSeconds < 64800) { // won't run outside of 10am - 6pm
        moneyEarned = (currentSeconds - 36000) * secondRate;
        earnedSoFar.textContent = '$' + moneyEarned.toFixed(2);
        earnedCopy.style.visibility = 'initial';
        btn.blur();
    } else {
        earnedSoFar.textContent = "It's outside working hours - try between 10am and 6pm";
        earnedSoFar.style.fontSize = '2rem';
        earnedSoFar.style.lineHeight = '1.1';
    }
};

function loopTotalUpdate () {
    updateTotal = setInterval(calculateEarning, 1000);
}

function clearInput() {
    window.clearInterval(updateTotal);
    if (this.value != '') {
        this.value = ''
        earnedSoFar.textContent = '\xa0';
        earnedCopy.style.visibility = 'hidden';
        }
};

function enterKey(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.querySelector('.calculate-button').click();
        inputField.blur();
        }
};

btn.addEventListener('click', calculateEarning);
btn.addEventListener('click', loopTotalUpdate);
inputField.addEventListener('focus', clearInput);
inputField.addEventListener('keyup', enterKey);


