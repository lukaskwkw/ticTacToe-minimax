var compTurn = true; //default option
var player = 'x'; //default option
var cpu = 'o'; //default option
var isEnd= false;

var board = ["","","",
"","","",
"","",""];


$(document).ready(function(){

	$('.col-xs-4').on("click",function(){
		if (compTurn===false && isEmpty(board,$(this).attr('id')) && isEnd===false)
		{		
			$(this).html("<span class='sign'>"+player+"</span>");
			board[$(this).attr('id')] = player;
			var vector = checkWinner(board,player);
			if(vector.length===3)
			{			
				zaznaczZwyciezce(vector,"green");
				isEnd = true;
				mainModal.modal('show',1500);

				return;
			}
			if (getEmptySpaces(board).length===0){
				alert("Tie!");
				mainModal.modal('show',1500);
			}
			compTurn=true;
			ruchKomputera(board);
		}
	});
	var mainModal = $("#playerSelection");
	mainModal.modal('show');
	$(".btn-who-start").on("click",selectPlayer);

	function ruchKomputera (matrix) {
		var arr = getEmptySpaces(matrix);
		if (arr.length===0)
			return;
		var max=0;
		var j = arr[0];
		var clonedMatrix = cloneMatrix(matrix);
		clonedMatrix[arr[0]] = cpu;
		max = minimax(clonedMatrix,0);	
		for (var i = 1; i < arr.length; i++) {
			if (checkWinner(clonedMatrix,cpu).length===3)
			{
				j=arr[i];
				console.log("Koniec: ", j)
				break;
			}
			clonedMatrix = cloneMatrix(matrix);
			clonedMatrix[arr[i]] = cpu;
			var tmp = minimax(clonedMatrix,0);
			if (tmp>max)
			{
				max=tmp;
				j=arr[i];
			}
		};
		board[j]=cpu;
		$("#"+j).html("<span class='sign'>"+cpu+"</span>");
		compTurn=false;


		var vector = checkWinner(board,cpu);
		if(vector.length===3){
			alert("You lose!")
			isEnd = true;
			zaznaczZwyciezce(vector,"red");
			mainModal.modal('show',1500);
			return;
		}
		if (getEmptySpaces(board).length===0){
			alert("Tie!");
			mainModal.modal('show',1500);
		}
	}

	function zaznaczZwyciezce (vector,color) {
		for (var i = 0; i < vector.length; i++) {
			$('#'+vector[i]).css("background-color",color);
			console.log(vector[i]);
		};
	}

	function minimax (matrix,turn) {
		var sign='';
		var resultTable = [];
		var arr = getEmptySpaces(matrix);
		var nT=0;
		if (turn===1){
			nT=0;
			sign=cpu;
			for (var i = 0; i < arr.length; i++) {
				var clonedMatrix = cloneMatrix(matrix);
				clonedMatrix[arr[i]] = sign;
				resultTable.push(result(clonedMatrix,turn))
			};
			return Math.max.apply(null,resultTable);

		}
		else{
			nT=1;
			sign=player;
			for (var i = 0; i < arr.length; i++) {
				var clonedMatrix = cloneMatrix(matrix);
				clonedMatrix[arr[i]] = sign;
				resultTable.push(result(clonedMatrix,turn))
			};
			return Math.min.apply(null,resultTable);

		}
	}

	function result(matrix,turn) {
		if (turn===1){
			var arr = checkWinner(matrix,cpu);
			if (arr.length===3){
				return 1;
			}
			// if (checkWinner(matrix,player).length===3)
			// 	return -1;
			else{
				if (getEmptySpaces(matrix).length===0)
					return 0;
				else
					return minimax(matrix,0);
			}
		}
		else {
			var arr = checkWinner(matrix,player);
			if (arr.length===3){
				return -1;
			}
			// if (checkWinner(matrix,cpu).length===3)
			// 	return 1;
			else{
				if (getEmptySpaces(matrix).length===0)
					return 0;
				else
					return minimax(matrix,1);
			}
		}
	}


	function cloneMatrix (matrix) {
	// console.log("a");
	var clonedMatrix = [];
	for (var i = 0; i < matrix.length; i++) {
		clonedMatrix.push(matrix[i]);
	};
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
		board = ["","","",
		"","","",
		"","",""];
		$(".col-xs-4").html("").css("background-color","white");
		isEnd= false;
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
		else
		{
			compTurn=true;
			ruchKomputera(board);
		}

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
					// vector.push(j);
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

	function checkDiagonal (matrix,player) {
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