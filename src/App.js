import { useEffect, useRef } from "react";
import ScratchCard from 'react-scratch-coupon'

import './App.css';

import img from "./images/IMAGEDEUX.jpg";

/*
import brushImg from "./images/brush.png";
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

function distanceBetween(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

const App = () => {
	let indexBg = 1;
	const switchFreq = 10000;
	const sizeBrush = 25;
	const width = 1200;
	const height = 700;
	const canvasFgRef = useRef(null);
	const canvasBgRef = useRef(null);
	let isDrawing = false;
	let isRunning = true;
	let lastPoint;

	//const brush = new Image();
	//brush.src = brushImg;

	const scratch = (ctx, x, y) => {
		//console.log(x + ", " + y);
		if (!isRunning)
			return (null);
		ctx.globalCompositeOperation = "destination-out";
		ctx.beginPath();
		ctx.arc(x, y, sizeBrush, 0, 2 * Math.PI);
		ctx.fill();
		/* OR
		ctx.drawImg(brush, )
		*/
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

const App2 = () => {
	return (
		<ScratchCard width={300} height={300} cover={img}>
		<form className="form" >
			<h2>Hello There!</h2>
			<h1><code>Coupon code : 1651613335</code></h1>
			<div>
				<input type="text" name="code" placeholder="Coupon Code"></input>
			</div>
			<div>
				<input type="submit" value="Submit"></input>
			</div>
		</form>
	  </ScratchCard>
	);
}

export default App;
