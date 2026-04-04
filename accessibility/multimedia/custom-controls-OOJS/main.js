// Get references to all audio and video players
// Store them all in a single array

const videos = document.querySelectorAll('video');

const audios = document.querySelectorAll('audio');

let players = [];

for(let a = 0; a < audios.length; a++) {
  players.push(audios[a]);
}

for(let v = 0; v < videos.length; v++) {
  players.push(videos[v]);
}

// Remove the native controls from all players

for(let p = 0; p < players.length; p++) {
  players[p].removeAttribute('controls');
}

// Define constructor for player controls object

function PlayerController(player, playPauseBtn, stopBtn, rwdBtn, fwdBtn, timeLabel) {
  this.player = player;
  this.playPauseBtn = playPauseBtn;
  this.stopBtn = stopBtn;
  this.rwdBtn = rwdBtn;
  this.fwdBtn = fwdBtn;
  this.timeLabel = timeLabel;

  this.interval;

  this.playPauseBtn.onclick = function() {
    if(player.paused) {
      player.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      player.pause();
      playPauseBtn.textContent = 'Play';
    }
  }

  this.stopBtn.onclick = function() {
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = 'Play';
  }

  this.rwdBtn.onclick = function() {
    player.currentTime -= 3;
  }

  this.fwdBtn.onclick = function() {
    player.currentTime += 3;
    if(player.currentTime >= player.duration || player.paused) {
      player.pause();
      player.currentTime = 0;
      playPauseBtn.textContent = 'Play';
    }
  }

  this.player.ontimeupdate = function() {
    let minutes = Math.floor(player.currentTime / 60);
    let seconds = Math.floor(player.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes<10) {
      minuteValue = "0" + minutes;
    } else {
      minuteValue = minutes;
    }

    if (seconds<10) {
      secondValue = "0" + seconds;
    } else {
      secondValue = seconds;
    }

    mediaTime = minuteValue + ":" + secondValue;
    timeLabel.textContent = mediaTime;
  }
}



// Add the controls bar to all players

for(let i = 0; i < players.length; i++) {
  const controls = document.createElement('div');
  controls.setAttribute('class', 'controls');
  players[i].parentNode.appendChild(controls);

  const playpause = document.createElement('button');
  const stop = document.createElement('button');
  const rwd = document.createElement('button');
  const fwd = document.createElement('button');
  const time = document.createElement('div');

  playpause.setAttribute('class', 'playpause');
  stop.setAttribute('class', 'stop');
  rwd.setAttribute('class', 'rwd');
  fwd.setAttribute('class', 'fwd');
  time.setAttribute('class', 'time');

  playpause.textContent = 'Play';
  stop.textContent = 'Stop';
  rwd.textContent = 'Rwd';
  fwd.textContent = 'Fwd';
  time.textContent = '00:00';

  controls.appendChild(playpause);
  controls.appendChild(stop);
  controls.appendChild(rwd);
  controls.appendChild(fwd);
  controls.appendChild(time);

  let playerInstance = new PlayerController(players[i], playpause, stop, rwd, fwd, time);
}
