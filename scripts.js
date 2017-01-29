const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playBtn = player.querySelector(".player__button");
const skipButtons = player.querySelectorAll("[data-skip]");
const fullScreenBtn = player.querySelector("[data-fullscreen");
const ranges = player.querySelectorAll(".player__slider");

/* Functions */
function togglePlay(){

	if(video.paused){
		video.play(); 
	} else{
		video.pause();
	}
}

function updateButton(){
	const icon = this.paused ? "►" : "❚❚"; 
	playBtn.innerHTML = icon; 
}

function skip(){
	this.dataset.skip
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const elWidth = progress.getBoundingClientRect().width;
 	const percent = (e.offsetX / elWidth);
	video.currentTime = video.duration * percent;
}

function toggleFullScreen(){
	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}	

/* Hook up event listeners */
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Handles progression of bar, ties it to the 'timeupdate' event which video emits as the video progresses
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach((btn) => {
	btn.addEventListener("click", skip);
});

// Listeners for range sliders
ranges.forEach((range) => {
	range.addEventListener("input", handleRangeUpdate);
});

// Listener for full-screen button

fullScreenBtn.addEventListener('click', toggleFullScreen);

// Listeners for progress bar to enable scrubbing
let mousedown = false; 
progress.addEventListener('click', scrub); 
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);