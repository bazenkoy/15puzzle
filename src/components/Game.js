import React, { Component } from 'react';
import './Game.css'

class Game extends Component {

	state = {
		sortedArray : [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, '']],
		array: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, '']],
		arrow: '',
		emptyCell: [3,3],
        vectors : {37:[0, 1], 38:[1, 0], 39:[0, -1], 40:[-1, 0]}
		}

	shuffleArray = () => {
		const {array} = this.state;
		for (let i = 0; i < array.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
			for (let x = 0; x < array[i].length; x++){
				const y = Math.floor(Math.random() * (x + 1));
				[array[i][x], array[i][y]] = [array[i][y], array[i][x]];
			}
		}
		this.setState({
			array
		}, function () {
			this.findEmptyCell();
		})
		window.addEventListener('keydown', this.keyboardPressedHandler);

	}
	
	findEmptyCell = () => {
		const { array } = this.state;
		let emptyCell = [];
		for (let i = 0; i < array.length; i++){
			for(let j = 0; j < array[i].length; j++){
				if(array[i][j] === ''){
					emptyCell = [i,j]
				}
			}
		}
		this.setState({
			emptyCell
		})
	}

	keyboardPressedHandler = (e) =>{
		const {vectors} = this.state;
		const {keyCode} = e
		if (Object.keys(vectors).indexOf(keyCode.toString()) > -1) {
			this.setState({
				arrow: keyCode
			})
			this.moveCell();
		}
	}

	moveCell = () => {
		const { vectors , arrow } = this.state;
		const vector = vectors[arrow];
		const { array, emptyCell } = this.state;
		let x = emptyCell[0] + vector[0];
		let y = emptyCell[1] + vector[1];
		if(x >= 0 && y >= 0 && y < 4 && x < 4){
			[array[emptyCell[0]][emptyCell[1]], array[x][y]] = [array[x][y], array[emptyCell[0]][emptyCell[1]]];
			this.setState({
				array,
				emptyCell: [x,y]
			}, () => {
				this.checkSort();
			})
		}
	}

	checkSort = () => {
		const { array, sortedArray } = this.state;
		let similarity = 0;
		for (let i = 0; i < array.length; i++){
			for(let j = 0; j < array[i].length; j++){
				if (array[i][j] === sortedArray[i][j]){
					similarity++;
				}
			}
		}
		if(similarity === 16){
			alert('Congratulation! You win!');
		}
	}

	render (){
		const { array } = this.state;
		return(
			<div className='wrapper'>
				<button 
					onClick={this.shuffleArray} 
					className='shuffleButton'>
					Shuffle
				</button>
				<div className='gameArea'>
					{array.map(row => (
						row.map(cell => (
							<div key={cell}
							     className={
							     	cell === '' ? 'emptyCell' : 'cell'
							     }>
								{cell}
							</div>
						))
					))}
				</div>
			</div>
		)}
}
export default Game;