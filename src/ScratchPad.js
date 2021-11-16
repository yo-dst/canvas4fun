import { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";

import "./App.css";
import brush from "./images/brush0.png";

const ScratchPad = (props) => {
	const {
		width,
		height,
		sizeBrush,
		fg,
		bg
	} = props;

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
		const img = new Image();
		img.crossOrigin = "anonymous"; // no need that if images are local
		img.src = srcImg;
		img.onload = () => {
			ctx.drawImage(img, 0, 0, width, height);
		};
	}

	const scratch = (ctx, x, y) => {
		ctx.globalCompositeOperation = "destination-out";
		ctx.drawImage(brushImg, x, y, sizeBrush, sizeBrush);
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
		console.log("rerender pad");
		let lastPoint;

		const canvasFg = canvasFgRef.current;
		const ctxFg = canvasFg.getContext("2d");

		const canvasBg = canvasBgRef.current;
		const ctxBg = canvasBg.getContext("2d");

		drawImg(ctxFg, fg);
		drawImg(ctxBg, bg);

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
	}, [sizeBrush, width, height, fg, bg]);

	return (
		<div className="canvas-wrapper hide-cursor" style={{width: width, height: height}}>
			<canvas ref={canvasFgRef} width={width} height={height} id="canvas-fg" />
			<canvas ref={canvasBgRef} width={width} height={height} id="canvas-bg" />
			
		</div>
	);
}

export default ScratchPad;