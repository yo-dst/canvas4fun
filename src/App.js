import { useEffect, useRef, useState } from "react";

import './App.css';
import img1 from "./images/IMAGEUNE.jpg";
import img2 from "./images/IMAGEDEUX.jpg";
import img3 from "./images/IMAGETROIS.jpg";

const imgs = [
	img1,
	img2,
	img3
]

const Canvas = (props) => {
	const canvasRef = useRef(null);
	let x = 0;
	let y = 0;

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		canvas.addEventListener("mousemove", e => {
			x = e.offsetX;
			y = e.offsetY;
			//console.log("(" + x + ", " + y + ")");
		})
	}, []);

	return (
		<canvas ref={canvasRef} {...props}/>
	);
}

function App() {
	const width = 1200;
	const height = 700;

	useEffect(() => {

	}, []);

  	return (
		<div className="app">
			<Canvas width={width} height={height} />
		</div>
  	);
}

export default App;
