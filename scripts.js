const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playBtn = player.querySelector(".player__button");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Functions */

function togglePlay(){

	console.dir(video);

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
/* Hook up event listeners */
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach((btn) => {
	btn.addEventListener("click", skip);
});

ranges.forEach((range) => {
	range.addEventListener("input", handleRangeUpdate);
});

let mousedown = false; 
progress.addEventListener('click', scrub); 
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);