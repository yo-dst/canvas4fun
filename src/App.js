import { useEffect, useRef, useState } from 'react';

import './App.css';
import ScratchPad from "./ScratchPad";

const imgs = [
	"https://picsum.photos/id/10/1200/700",
	"https://picsum.photos/id/40/1200/700",
	"https://picsum.photos/id/100/1200/700",
	"https://picsum.photos/id/200/1200/700",
	"https://picsum.photos/id/500/1200/700"
]

const Child = (props) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const img = new Image();
		img.src = imgs[props.index];
		img.onload = () => {
			ctx.drawImage(img, 0, 0, props.width, props.height);
		}
	}, [props.index]);

	return (
		<div style={{color: "white"}}>
			<canvas ref={canvasRef} width={props.width} height={props.height} />
		</div>
	)
}

const App = () => {
	const [counter, setCounter] = useState(0);

  	return (
		<div className="app">
			<button onClick={e => setCounter(counter + 1)}>Increment</button>
			<Child width={500} height={500} index={counter} />
		</div>
  	);
}

const App2 = () => {
	const [index, setIndex] = useState(0);
	const switchFreq = 5000; // in ms

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(index => {
				console.log(index);
				if (index === imgs.length - 1)
				{
					clearInterval(interval);
					return (index);
				}
				return (index + 1);
			});
		}, switchFreq);
	}, []);

  	return (
		<div className="app">
			<ScratchPad
				width={1200}
				height={700}
				sizeBrush={35}
				fg={imgs[index]}
				bg={imgs[index + 1]}
			/>
		</div>
  	);
}

export default App;
