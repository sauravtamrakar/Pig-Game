/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

//Game starts
init();

//Adding ROLLDICE event Listener

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying){
        //Random Numbers
        var dice = Math.floor(Math.random() * 6) + 1;

        //Update the UI
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        //Updating the number if rolled dice is NOT 1
        if (dice != 1) {
            //update the score
            roundScore += dice;

            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //Next Player
            nextPlayer();
        }
    } 
}); 



//Adding Hold Event Listener

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
        //Add current Score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 20) {
            //Change the text to winner from player
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'

            //Hide dice
            document.querySelector('.dice').style.display = 'none';

            //add winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            //remove active class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            //Adding state variable when player wins
            gamePlaying = false;
        }
        else {
            //Next Player
            nextPlayer();
        }
    }
});



//Adding New game Event Listener
document.querySelector('.btn-new').addEventListener('click', init);

//Creating initial function
function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    //Hiding dice
    document.querySelector('.dice').style.display = 'none';

    //Setting all Scores to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //Changing names back to player 1 and 2 from Winner
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //adding state variable true when game starts
    gamePlaying = true;

};

//Creating next Player function for DRY principle
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;


    //Set score to 0 in the UI
    roundScore = 0;

    //Toggling active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // hiding dice when 1 is scored
    document.querySelector('.dice').style.display = 'none';
};
