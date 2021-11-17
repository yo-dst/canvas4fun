import { useEffect, useRef, useState } from "react";

import "./App.css";

const ScratchPad = (props) => {
	const {
		switchFreq,
		width,
		height,
		sizeBrush,
		index,
		imgs,
		brush,
		save
	} = props;

	const [timer, setTimer] = useState(switchFreq);

	const brushImg = new Image();
	brushImg.src = brush;

	const canvasFgRef = useRef(null);
	const canvasBgRef = useRef(null);

	const distanceBetween = (point1, point2) => {
		return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}
	
	const angleBetween = (point1, point2) => {
		return Math.atan2(point2.x - point1.x, point2.y - point1.y);
	}

	const drawImg = (ctx, srcImg) => {
		let img = new Image();
		img.src = srcImg;
		img.onload = () => {
			ctx.globalCompositeOperation = "source-over";
			ctx.drawImage(img, 0, 0, width, height);
		}
	}

	const saveImg = (canvas) => {
		const image = canvas.toDataURL();
		var tmpLink = document.createElement('a');  
		tmpLink.download = 'image.png';
		tmpLink.href = image;  
	
		document.body.appendChild(tmpLink);
		tmpLink.click();  
		document.body.removeChild(tmpLink);
	}

	useEffect(() => {
		let lastPoint;

		const canvasFg = canvasFgRef.current;
		const ctxFg = canvasFg.getContext("2d");

		const canvasBg = canvasBgRef.current;
		const ctxBg = canvasBg.getContext("2d");

		drawImg(ctxFg, imgs[index]);
		drawImg(ctxBg, imgs[index + 1]);

		canvasFg.addEventListener("mousemove", e => {
			if (!lastPoint)
				lastPoint = { x: e.offsetX, y: e.offsetY };

			const currentPoint = { x: e.offsetX, y: e.offsetY };
			const dist = distanceBetween(lastPoint, currentPoint);
			const angle = angleBetween(lastPoint, currentPoint);

			ctxFg.globalCompositeOperation = "destination-out";
			for (let i = 0; i < dist; i++) {
				let x = lastPoint.x + Math.sin(angle) * i - 25;
				let y = lastPoint.y + Math.cos(angle) * i - 25;
				if (brushImg.complete && brushImg.naturalHeight !== 0)
					ctxFg.drawImage(brushImg, x, y, sizeBrush, sizeBrush);
			}
			lastPoint = currentPoint;
		});

		const timerInterval = setInterval(() => {
			setTimer(timer => timer === 0 ? 0 : timer - 1);
		}, 1000);

		return () => {
			if (save)
			{
				ctxFg.globalCompositeOperation = "destination-over";
				ctxFg.drawImage(canvasBg, 0, 0);
				saveImg(canvasFg);
			}
			setTimer(switchFreq);
			clearInterval(timerInterval);
		}
	}, [index]);

	return (
		<div className="canvas-wrapper hide-cursor" style={{width: width, height: height}}>
			<canvas ref={canvasFgRef} width={width} height={height} id="canvas-fg" />
			<canvas ref={canvasBgRef} width={width} height={height} id="canvas-bg" />
			<div className="timer">{timer}</div>
		</div>
	);
}

export default ScratchPad;