window.saveDataAcrossSessions = true;

const LOOK_DELAY = 1000;
const LEFT_CUTOFF = window.innerWidth /4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth /4;

let startLookTime =Number.POSITIVE_INFINITY;
let lookDirection = null;
let imageElement = getNewImage();
let nextimageElement = getNewImage(true);

webgazer.setGazeListener((data, elapsedTime)=> {
	if(data == null && lookDirection === 'STOP') return;

	if (data.x <LEFT_CUTOFF && lookDirection !== 'LEFT' && lookDirection !== "RESET") {
		startLookTime = elapsedTime;
		lookDirection ='LEFT';
	}else if(data.x > RIGHT_CUTOFF && lookDirection !== 'RIGHT' && lookDirection !== "RESET"){
		startLookTime = elapsedTime;
		lookDirection = 'RIGHT';
	}else if (data.x >= LEFT_CUTOFF && data.x <=RIGHT_CUTOFF)	{
		startLookTime = Number.POSITIVE_INFINITY;
		lookDirection = null;	
	}

	if(startLookTime + LOOK_DELAY<elapsedTime){
		if(lookDirection === 'LEFT'){
			imageElement.classList.add('left')
		}else{
			imageElement.classList.add('right');
		}

		startLookTime = Number.POSITIVE_INFINITY

		setTimeout(()=>{
			imageElement.remove();
			nextimageElement.classList.remove('next')
			imageElement = nextimageElement;
			nextimageElement = getNewImage(true)
			lookDirection = "RESET"
		},200)
		console.log(lookDirection);
	}
}).begin();

webgazer.showVideoPreview(false).showPredictionPoints(false)

function getNewImage(next =false){
	const img = document.createElement('img');
	img.src ='https://picsum.photos/1000?' + Math.random();
	if(next) img.classList.add("next");
	document.body.append(img);
	return img;
}