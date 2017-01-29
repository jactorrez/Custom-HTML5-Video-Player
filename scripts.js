const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playBtn = player.querySelector(".player__button");
const skipButtons = player.querySelectorAll("[data-skip]");
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

/* Hook up event listeners */
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach((btn) => {
	btn.addEventListener("click", skip);
});