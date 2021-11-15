import './App.css';
import ScratchPad from "./ScratchPad";

const App = () => {
  	return (
		<div className="app">
			<ScratchPad
				width={1200}
				height={700}
				sizeBrush={35}
				switchFreq={7}
			/>
		</div>
  	);
}

export default App;
