	function computerTurn (matrix) {
		var clonedMatrix = [];
		clonedMatrix = cloneMatrix(matrix);

		var arr = getEmptySpaces(matrix);
		console.log(arr);
		clonedMatrix[arr[0]] = cpu;
		var max = minimax(clonedMatrix,false);
			var j=arr[0]; //space where put sign
			for (var i = 1; i < arr.length; i++) {
				var tmp=0;
				clonedMatrix = cloneMatrix(matrix);
				clonedMatrix[arr[i]] = cpu;
				tmp = minimax(clonedMatrix,false);
				if (tmp>max){
					max = tmp
					j=i;
					console.log(max,j);
				}
			};
			console.log(max,j);
			board[j]=cpu;
			$("#"+j).html("<span class='sign'>"+cpu+"</span>");
			compTurn=false;
		}

		function cloneMatrix (matrix) {
			var clonedMatrix = [];
			matrix.forEach(function(element){
				clonedMatrix.push(element);
			});
			return clonedMatrix;
		}

		function minimax (matrix,turn) {

			var arr = getEmptySpaces(matrix);
		// if (arr.length===0){
			if (turn){
				if (checkWinner(matrix,cpu).length===3){
					return 1;
				}
				if (checkWinner(matrix,player).length===3){
					return -1;
				}
				else{ 
					return 0;
				}
			}
			else
			{
				if (checkWinner(matrix,cpu).length===3){
					return -1;
				}
				if (checkWinner(matrix,player).length===3){
					return 1;
				}
				else{ 
					return 0;
				}
			}
		// }

		return result(matrix,arr,turn);
	}

//pick available space in board and return it after taken a place
//matrix - board of game, arr - array of available places, turn - whose turn is it
function result(matrix,arr,turn) {
	var min, max =0;
	if (turn){
		var clonedMatrix = [];
		clonedMatrix = cloneMatrix(matrix);
		clonedMatrix[arr[0]]=cpu;
		max = minimax(clonedMatrix,false);
		for (var i = 1; i < arr.length; i++) {
			clonedMatrix = cloneMatrix(matrix); //clone current board state
			clonedMatrix[arr[i]]=cpu;
			var current = minimax(clonedMatrix,false);
			if (current>max){
				max = current;
			}
		};
		return max;
	}
	else{
		var clonedMatrix = [];
		clonedMatrix = cloneMatrix(matrix)
		clonedMatrix[arr[0]]=player;
		min = minimax(clonedMatrix,true);
		for (var i = 1; i < arr.length; i++) {
			clonedMatrix = cloneMatrix(matrix); //clone current board state
			clonedMatrix[arr[i]]=player;
			var current = minimax(clonedMatrix,true);
			if (current<min){
				min = current;
			}
		}
		return min;
	};
}


function getEmptySpaces(matrix) {
	var array = [];
	for (var i=0; i< matrix.length; i++)
		if (isEmpty(matrix,i))
			array.push(i)	
		return array;
	}

	function isEmpty(matrix,i) {
		if (matrix[i]!=="")
			return false;
		else
			return true;
	}

	function selectPlayer () {
		if ($("#x").hasClass("active")===true){
			player = "x";
			cpu = "o";
		}
		else{
			player = "o";
			cpu = "x";
		}
		if ($(this).attr('id') == "me")
			compTurn = false;
		mainModal.modal('hide');
	}

	function checkWinner(matrix, player) {
		var horizontal = checkHorizontal(matrix,player);
		if (horizontal.length===3)
			return horizontal;
		var vertical = checkVertical(matrix,player);
		if (vertical.length===3)
			return vertical;
		var diagonal = checkDiagonal(matrix,player);
		if (diagonal.length===3)
			return diagonal;
		return []; // if there is no winner return empty array
	}

	function checkHorizontal (matrix, player) {
		var vector=[];
		for (var i = 0; i < 3; i++) {
			for (var j = i; j <= (i+6); j+=3) {
				if (matrix[j]===player)
					vector.push(j);
				else{
					vector=[];
					break;
				}
			};
			if (vector.length===3) //if there is win line return vector 
				return vector;
		};
		return [];
	}

	function checkVertical (matrix, player) {
		var vector=[];
		for (var i = 0; i <= 6; i+=3) {
			for (var j = i; j < i+3; j++) {
				if (matrix[j]===player)
					vector.push(j);
				else{
					vector=[];
					break;
				}
			};
			if (vector.length===3) //if there is win line return vector 
				return vector;
		};
		return [];
	}

	function checkDiagonal (matrix) {
		var vector=[];
		for (var i = 0; i <= 8; i+=4) {	
			if (matrix[i]===player)
				vector.push(i);
			else{
				vector = [];
				break;
			}
		};
		if (vector.length===3)
			return vector;
		else
			vector = [];

		for (var i = 2; i <= 6; i+=2) {	
			if (matrix[i]===player)
				vector.push(i);
			else{
				vector = [];
				break;
			}
		};
		return vector;

	}
});


