import { useEffect, useState } from 'react';

import './App.css';
import ScratchPad from "./ScratchPad";

import brush from "./images/brush0.png";
import img1 from "./images/1.png";
import img2 from "./images/2.png";
import img3 from "./images/3.png";
import img4 from "./images/4.png";
import img5 from "./images/5.png";
import img6 from "./images/6.png";
import img7 from "./images/7.png";
import img8 from "./images/8.png";

const imgs = [
	img1,
	img2,
	img3,
	img4,
	img5,
	img6,
	img7,
	img8
];

const App = () => {
	const switchFreq = 5; // in s
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const switchInterval = setInterval(() => {
			setIndex(index => {
				if (index === imgs.length - 1)
				{
					clearInterval(switchInterval);
					return (index);
				}
				return (index + 1);
			});
		}, switchFreq * 1000);
	}, []);

  	return (
		<div className="app">
			{index === imgs.length - 1 ?
				<div style={{color: "white", fontSize: "2.5rem"}}>Terminado terminada</div>
				:
				<ScratchPad
					width={1200}
					height={700}
					sizeBrush={35}
					index={index}
					imgs={imgs}
					save={false}
					brush={brush}
					switchFreq={switchFreq}
				/>
			}	
		</div>
  	);
}

export default App;
