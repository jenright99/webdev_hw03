import React, { Component }  from 'react';

import './App.css';
import { useState } from 'react';

function YouWin ({reset}) {
	return (
		<div className="App">
		<h1>You Win!!!!</h1>
		<p>
			<button onClick={reset}>Reset</button>
		</p>
		</div>
	);

}

function GameOver({reset}) {
	return (
		<div className="App">
		<h1>Game Over!</h1>
		<p>
			<button onClick={reset}>Reset</button>
		</p>
		</div>
	);

}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));

}

function App() {
	function set_secret() {
		var rand1 = getRandomInt(10);
		var rand2 = getRandomInt(10);
		var rand3 = getRandomInt(10);
		var rand4 = getRandomInt(10);

		while (rand1 == rand2) {
			rand2 = getRandomInt(10);
		}
		while (rand1 == rand3 || rand2 == rand3) {
			rand3 = getRandomInt(10);
		}
		while (rand1 == rand4 || rand2 == rand4 || rand3 == rand4) {
			rand4 = getRandomInt(10);
		}
			return [rand1, rand2, rand3, rand4];
	}

	const [secret, setSecret] = useState(set_secret);
	const [guesses, setGuesses] = useState([]);
	const [scores, setScores] = useState([]);
	const [text, setText] = useState("");
	const [win, setWin] = useState(0)
	var as = 0;
	var bs = 0;
	var i = 0;
	var r = 0;

	function curr_guesses(scores, guesses) {
		let view = [];
		for (var i = 0; i < guesses.length; i++) {
			var txt = (i+1) + ".\t" + guesses[i] + "\t\t\t" + scores[i];
			view.push(txt);
		}
		return view;

	}

	//let view = num_view(secret, guesses);
	let currGuesses = curr_guesses(scores, guesses);

	function updateText(ev) {
		let vv = ev.target.value;
		setText(vv);
	}


	function guess() {
		if (text.length != 4) {
			return;
		}
		//var chars = text.split('');
		if (isNaN(text - parseFloat(text))) {
			return;
		}
		for (i = 0; i < text.length; i++) {
			for (r = i+1; r < text.length; r++) {
				if (text.charAt(i) == text.charAt(r)) {
					return;
				}
			}
		}
		as = 0;
		bs = 0;
		for (i = 0; i < text.length; i++) {
			for (r = 0; r < secret.length; r++) {
				if (text.charAt(i) == secret[r]) {
					if (i == r) {
						as += 1;
					} else {
						bs += 1;
					}
				}
			}
			
		}
	
		var newScore = as + "A" + bs + "B";//[as,"A",bs,"B"].join('');
		if (as == 4) {
			//TODO WIN
			setWin(1);
		}
		//let ns = Array.from(new Set(scores.concat(newScore)));
		setScores(scores.concat(newScore));
		setGuesses(guesses.concat(text));
		setText("");
	
	}

	function keyPress(ev) {
		if (ev.key == "Enter") {
			guess();
		}
	}

	function resetGame() {
		setGuesses([]);
		setSecret(set_secret);
		setScores([]);
		setWin(0);
	}

	if (guesses.length >= 8) {
		return <GameOver reset={resetGame} />
	}
	if (win == 1) {
		return <YouWin reset={resetGame} />
	}
	return  (
	<div className="App">
	    <h1>Guesses (You only get 8!!!)</h1>
  	    <pre>{currGuesses.join("\r\n")}</pre>
   	   <p>
   	     <input type="text"
    	           value={text}
    	           onChange={updateText}
   	           onKeyPress={keyPress} />
  	      <button onClick={guess}>Guess</button>
  	    </p>
   	   <p>
   	     <button onClick={resetGame}>
    	      Reset
 	       </button>
	      </p>
 	   </div>
  );	



}

export default App;
