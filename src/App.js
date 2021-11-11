import { useEffect, useRef } from "react";

import './App.css';

/* 
import img1 from ;
import img2 from ;
import img3 from ;
import img4 from ;
import img5 from ;
*/

const imgs = [
	"https://picsum.photos/id/10/1200/700",
	"https://picsum.photos/id/40/1200/700",
	"https://picsum.photos/id/100/1200/700",
	"https://picsum.photos/id/200/1200/700",
	"https://picsum.photos/id/500/1200/700"
]

function App() {
	let indexBg = 1;
	const switchFreq = 5000;
	const sizeBrush = 20;
	const width = 1200;
	const height = 700;
	const canvasFgRef = useRef(null);
	const canvasBgRef = useRef(null);
	let isDrawing = false;
	let isRunning = true;

	const scratch = (ctx, x, y) => {
		if (!isDrawing || !isRunning)
			return (null);
		ctx.fillStyle = "white";
		ctx.globalCompositeOperation = "destination-out";
		ctx.beginPath();
		ctx.arc(x, y, sizeBrush, 0, 2 * Math.PI);
		ctx.fill();
	}

	const drawImg = (ctx, srcImg) => {
		const img = new Image();
		img.src = srcImg;
		img.onload = () => {
			ctx.drawImage(img, 0, 0, width, height);
		};
	}

	useEffect(() => {
		const canvasFg = canvasFgRef.current;
		const ctxFg = canvasFg.getContext("2d");

		const canvasBg = canvasBgRef.current;
		const ctxBg = canvasBg.getContext("2d");

		canvasFg.addEventListener("mousedown", () => { isDrawing = true });
		canvasFg.addEventListener("mouseup", () => { isDrawing = false });
		canvasFg.addEventListener("mousemove", e => {
			scratch(ctxFg, e.offsetX, e.offsetY);
		});

		drawImg(ctxFg, imgs[0]);
		drawImg(ctxBg, imgs[1]);

		const interval = setInterval(() => {
			indexBg++;
			if (indexBg >= imgs.length)
			{
				console.log("here: ", indexBg);
				isRunning = false;
				clearInterval(interval);
				return (null);
			}

			ctxFg.globalCompositeOperation = "destination-over";
			ctxFg.drawImage(canvasBg, 0, 0);
			drawImg(ctxBg, imgs[indexBg]);
		}, switchFreq);
	}, []);

  	return (
		<div className="app">
			<div className="canvas-wrapper" style={{width: width, height: height}}>
				<canvas ref={canvasFgRef} width={width} height={height} id="canvas-fg" />
				<canvas ref={canvasBgRef} width={width} height={height} id="canvas-bg" />
			</div>
		</div>
  	);
}

export default App;
