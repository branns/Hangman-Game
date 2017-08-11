//GLOBAL VARIABLES
//---------------------------------------
// Used to record how many times a letter can be pressed
var alphabet = ['a','b','c',
				  'd','e','f',
				  'g','h','i',
				  'j','k','l',
				  'm','n','o',
				  'p','q','r',
				  's','t','u',
				  'v','w','x',
				  'y','z'];
//Holds the all the words
var wordBank =['spurs','horse','cowhand','wanted','saloon','noose','duel', 'west', 'gold', 'carriage'
				, 'saddle', 'whiskey', 'revolver', 'cattle', 'desert', 'tumbleweed'];
//Holds choosenWord
var choosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds Blanks and successful guesses
var spaceCounter =[];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 12;
var rightGuessCounter = 0;
//FUNCTIONS
//----------------------------------------
function reset()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 12;
	wrongLetters =[];
	spaceCounter =[];
	alphabet = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];
	test=false;
	startGame();
}
function startGame()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 12;
	wrongLetters =[];
	blanksAndSuccesses =[];
	alphabet = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];

	//Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		spaceCounter.push('_');
		document.getElementById('wordToGuess').innerHTML = spaceCounter;
	}

	//Changes HTML 
	document.getElementById('wordToGuess').innerHTML = spaceCounter.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	// Testing / Debugging
	console.log(choosenWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(spaceCounter);
}

function compareLetters(userKey)
{
				console.log('WORKING!');
				//If user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							spaceCounter[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = spaceCounter.join(' ');
						}	
					}
					//Test / Debug
					console.log(spaceCounter);
				}
				//Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
					//Test / Debug
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
			
		
}
	//audio for win/lose
	var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "../blues-brothers-rawhide_21eNzQl.mp3");

	var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "../goodbadugly-whistle-long.mp3");

     //images for win/lose
     
function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		//grab image
		img('i');
		//play song

		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		//grab image
		('You Lose');
		//play song
		reset();
	}
}

//MAIN PROCCESS
//-------------------------------------------	
//Initiates the Code
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < alphabet.length; i++)
	{	
		if(letterGuessed === alphabet[i] && test === true)
		{
			var spliceDword = alphabet.splice(i,1);
			//Test / Debug
			console.log('Double word is = ' + alphabet[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}