var player = 'x'; //default option
var cpu = 'o'; //default option

function ruchKomputera (matrix) {
	var tmpMatrix = cloneMatrix(matrix);
	var arr = getEmptySpaces(tmpMatrix);
	if (arr.length===0)
		return;
	// var resultTable=[];
	var max=0;
	var j = arr[i];
		max = minimax(clonedMatrix,0);	
	for (var i = 1; i < arr.length; i++) {
		var clonedMatrix = cloneMatrix(tmpMatrix);
		clonedMatrix[arr[i]] = cpu;
		var tmp = minimax(clonedMatrix,0);
		if (tmp>max)
		{
			max=tmp;
			j=arr[i];
		}
	};
	// Math.max(null,resultTable.apply());
	board[j]=cpu;
	$("#"+j).html("<span class='sign'>"+cpu+"</span>");
	compTurn=false;
}

function minimax (matrix,turn) {
	var sign='';
	var nextTurn=NaN;

	var resultTable = [];
	var tmpMatrix = cloneMatrix(matrix);
	var arr = getEmptySpaces(tmpMatrix);

	if (turn===1){
		sing=cpu;
		nextTurn =0;

		for (var i = 0; i < arr.length; i++) {
			var clonedMatrix = cloneMatrix(tmpMatrix);
			clonedMatrix[arr[i]] = sign;
			resultTable.push(result(clonedMatrix,nextTurn))
		};
		return Math.max(null,resultTable.apply());

	}
	else{
		sign=player;
		nextTurn=1;

		for (var i = 0; i < arr.length; i++) {
			var clonedMatrix = cloneMatrix(tmpMatrix);
			clonedMatrix[arr[i]] = sign;
			resultTable.push(result(clonedMatrix,nextTurn))
		};
		return Math.min(null,resultTable.apply());

	}
}

function result(matrix,turn) {
	if (turn===1){
		var arr = checkWinner(matrix,cpu);
		if (arr.length===3)
			return 1;
		else{
			if (getEmptySpaces(matrix)).length===0)
return 0;
else
	return minimax(matrix,0);
}
}
else {
	var arr = checkWinner(matrix,player);
	if (arr.length===3)
		return -1;
	else{
		if (getEmptySpaces(matrix)).length===0)
return 0;
else
	return minimax(matrix,1);
}
}
}


function cloneMatrix (matrix) {
	var clonedMatrix = [];
	matrix.forEach(function(element){
		clonedMatrix.push(element);
	});
	return clonedMatrix;
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