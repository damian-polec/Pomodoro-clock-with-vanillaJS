const control = document.querySelector('input');
const buttons = document.querySelectorAll('button');
const audio = document.querySelector('audio');
const filling = document.querySelector('.fill');
var sum = 25 * 60;
var timePassed = 0
var intervalClock;
var intervalColor;

function setClock(){
  const minutes = document.querySelector('#minutes');
  const countdownNum = document.querySelector('#control p');
  sum = minutes.innerText * 60;
  minutes.innerHTML = control.value.padStart(2,'0');
  countdownNum.innerHTML = control.value.padStart(2,'0');
  console.log(sum);
}

function startClock(){
  const minutes = document.querySelector('#minutes');
  const seconds = document.querySelector('#seconds');
  let min = minutes.innerText;
  let sec = seconds.innerText;
    if(sec == 0 && min > 0){
      sec = 59;
      min -= 1;
      min = min.toString();
      seconds.innerHTML = sec;
      minutes.innerHTML = min.padStart(2,'0');
    }else if( sec > 0){
      sec-=1;
      sec = sec.toString();
      if(sec.length < 2) {
        sec = sec.padStart(2,'0');
      }
      seconds.innerHTML = sec;
    }else if(sec == 0 && min == 0){
      audio.play();
    }
}

function addColor(){
  var percent;
  if(sum !== timePassed){
    timePassed ++
    percent = ((timePassed * 100) / sum).toFixed(2);
    filling.style.height = `${percent}%`;
  } return;
}
function startCountdown(){
  intervalClock = setInterval(startClock, 1000);
  intervalColor = setInterval(addColor, 1000);
  control.disabled = true;
}

function stopCountdown(){
  clearInterval(intervalClock);
  clearInterval(intervalColor);
  audio.pause();
  audio.currentTime = 0;
  control.disabled = false;
}

function resetClock(){
  clearInterval(intervalClock);
  clearInterval(intervalColor);
  const minutes = document.querySelector('#minutes');
  const seconds = document.querySelector('#seconds');
  audio.pause();
  audio.currentTime = 0;
  minutes.innerHTML = control.value.padStart(2,'0');
  seconds.innerHTML = '00';
  control.disabled = false;
  filling.style.height = '0%';
  timePassed = 0;

}

function runFunction(){
  const clickedButton = this.innerText;
  if(clickedButton == 'Start'){
    startCountdown();
  }else if(clickedButton == 'Stop'){
    stopCountdown();
  }else{
    resetClock();
  }
}

//Event listeners
buttons.forEach(button => button.addEventListener('click', runFunction));
control.addEventListener('input', setClock);
control.addEventListener('change', setClock);
