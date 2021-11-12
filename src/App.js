import { useState } from 'react';

import './App.css';
import ScratchPad from "./ScratchPad";

/*
import brushImg from "./images/brush.png";
import img1 from ;
import img2 from ;
import img3 from ;
import img4 from ;
import img5 from ;
*/

const App = () => {
	const [isRunning, setIsRunning] = useState(false);

  	return (
		<div className="app">
			{isRunning ?
				<ScratchPad
					width={1200}
					height={700}
					sizeBrush={35}
					switchFreq={1}
				/>
				:
				<button className="run-btn" onClick={e => setIsRunning(true)}>RUN</button>
			}
		</div>
  	);
}

export default App;
