import { useEffect, useRef, useState } from "react";

import "./App.css";
import brush from "./images/brush0.png";

const imgs = [
	"https://picsum.photos/id/10/1200/700",
	"https://picsum.photos/id/40/1200/700",
	"https://picsum.photos/id/100/1200/700",
	"https://picsum.photos/id/200/1200/700",
	"https://picsum.photos/id/500/1200/700"
]

function distanceBetween(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

const ScratchPad = (props) => {
	const {
		width,
		height,
		sizeBrush,
		switchFreq

	} = props;

	const [showAnnounce, setShowAnnounce] = useState(false);

	const canvasFgRef = useRef(null);
	const canvasBgRef = useRef(null);

	useEffect(() => {
		let indexBg = 1;
		let isRunning = true;
		//let isDrawing = false;
		let lastPoint;

		const drawImg = (ctx, srcImg) => {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = srcImg;
			img.onload = () => {
				ctx.drawImage(img, 0, 0, width, height);
			};
		}

		const scratch = (ctx, x, y) => {
			ctx.globalCompositeOperation = "destination-out";
	
			/* To use a circle instead of an image for the brush
			ctx.beginPath();
			ctx.arc(x, y, sizeBrush, 0, 2 * Math.PI);
			ctx.fill();
			*/
	
			const brushImg = new Image();
			brushImg.src = brush;
			brushImg.onload = () => {
				ctx.drawImage(brushImg, x, y, sizeBrush, sizeBrush);
			}
		}

		const saveImg = () => {
			const image = canvasFg.toDataURL();
			var tmpLink = document.createElement('a');  
			tmpLink.download = 'image.png';
			tmpLink.href = image;  
		
			document.body.appendChild(tmpLink);
			tmpLink.click();  
			document.body.removeChild(tmpLink);
		}

		const canvasFg = canvasFgRef.current;
		const ctxFg = canvasFg.getContext("2d");

		const canvasBg = canvasBgRef.current;
		const ctxBg = canvasBg.getContext("2d");

		// to add mouse click event
		//document.addEventListener("mousedown", () => { isDrawing = true });
		//document.addEventListener("mouseup", () => { isDrawing = false });
		canvasFg.addEventListener("mousemove", e => {
			if (!isRunning) // add '|| !isDrawing' to the condition to draw when mouse button pressed
				return (null);

			if (!lastPoint)
				lastPoint = { x: e.offsetX, y: e.offsetY };
			const currentPoint = { x: e.offsetX, y: e.offsetY };

			const dist = distanceBetween(lastPoint, currentPoint);
			const angle = angleBetween(lastPoint, currentPoint);

			for (let i = 0; i < dist; i++) {
				let x = lastPoint.x + Math.sin(angle) * i - 25;
				let y = lastPoint.y + Math.cos(angle) * i - 25;
				scratch(ctxFg, x, y);
			}
			lastPoint = currentPoint;
		});

		drawImg(ctxFg, imgs[0]);
		drawImg(ctxBg, imgs[1]);

		const switchInterval = setInterval(() => {
			indexBg++;
			if (indexBg >= imgs.length)
			{
				ctxFg.globalCompositeOperation = "destination-over";
				ctxFg.drawImage(canvasBg, 0, 0);
				isRunning = false;
				clearInterval(switchInterval);
				document.getElementsByClassName("canvas-wrapper")[0].classList.remove("hide-cursor");
				setShowAnnounce(true);
				saveImg();
				setTimeout(() => setShowAnnounce(false), 3000);
				return ;
			}

			ctxFg.globalCompositeOperation = "destination-over";
			ctxFg.drawImage(canvasBg, 0, 0);
			drawImg(ctxBg, imgs[indexBg]);
		}, switchFreq * 1000);
	}, [switchFreq, sizeBrush, width, height]);

	return (
		<div className="canvas-wrapper hide-cursor" style={{width: width, height: height}}>
			<canvas ref={canvasFgRef} width={width} height={height} id="canvas-fg" />
			<canvas ref={canvasBgRef} width={width} height={height} id="canvas-bg" />
			{showAnnounce ? <div className="announce">Time is up !</div> : null}
		</div>
	);
}

export default ScratchPad;