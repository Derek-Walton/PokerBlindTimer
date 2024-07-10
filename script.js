const circleBackground = document.getElementById('main-timer');

const level = document.getElementById('level');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const blinds = document.getElementById('blinds');
const nextBLinds = document.getElementById('next-blinds');

const startButton = document.getElementById('start-pause-toggle');
let paused = true;
let intervalID;
let levelNumber = 1;
const interval = 1000;  //Milliseconds

const red = 'rgb(255, 0, 0)';
const green = 'rgb(0, 255, 0)';

const blindIntervals = {
  2: '200 / 400',
  3: '200 / 500',
  4: '500 / 1,000',
  5: '1,000 / 1,500',
  6: '1,000 / 2,000',
  7: '2,000 / 4,000',
  8: '2,000 / 5,000',
  9: '5,000 / 10,000',
  10: '10,000 / 15,000',
  11: '15,000 / 20,000',
  12: '20,000 / 40,000'
}

startButton.addEventListener('click', runTimer);

function runTimer() {
  if (paused) {
    startButton.style.backgroundColor = red;
    startButton.textContent = 'PAUSE';
    paused = !paused;
    run();
  } else {
    startButton.style.backgroundColor = green;
    startButton.textContent = 'START';
    paused = !paused;
    stop();
  };
}

function run() {
  reduceTimeBySec();
  intervalID = setInterval(reduceTimeBySec, interval);
}

function stop() {
  clearInterval(intervalID);
}

function reduceTimeBySec() {
  if (seconds.textContent == '00' || seconds.textContent == '0') {
    if (minutes.textContent == '0' || minutes.textContent == '00') {
      minutes.textContent = 14;
      levelNumber++;
      level.textContent = 'LEVEL ' + levelNumber;
      increaseBlinds();
    } else {
      minutes.textContent = parseInt(minutes.textContent) - 1;
    }
    seconds.textContent = 59;
  } else {
    seconds.textContent = parseInt(seconds.textContent) - 1;
    if (parseInt(seconds.textContent) < 10) {
      seconds.textContent = '0' + seconds.textContent
    }
  }
  if (parseInt(minutes.textContent) == 0 && parseInt(seconds.textContent) <= 10 && parseInt(seconds.textContent) % 2 == 0) {
    circleBackground.style.backgroundColor = 'red';
  } else {
    circleBackground.style.backgroundColor = 'black';
  }
}

function increaseBlinds() {
  blinds.textContent = blindIntervals[levelNumber];
  nextBLinds.textContent = blindIntervals[levelNumber + 1];
}