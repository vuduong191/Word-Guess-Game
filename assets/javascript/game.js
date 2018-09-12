
$(document).ready(function() {
    var wordList = ["table","chair","mouse"]
    var mainWord = ""
    randomWordIndex = Math.floor(Math.random() * 3);
    mainword = wordList[randomWordIndex]
    console.log(mainWord)
    // for now just use one word
    var wordstring = ""
    // The string for guesss
    for (var i = 0;i<mainWord.length;i++){
        wordstring+=mainWord[i];
        wordstring+="_"
    }
    $("#characters").append($("<p></P").text(wordstring))
    var wins = 0
    var inplay = 0
    var guessRemained = 15
    var letterGuessed = []
    var randomWordIndex = 0;
    // document.onkeyup = function(event) {
    //     randomWordIndex = Math.floor(Math.random() * 3);
    //     $("#characters").append($("<p></P").text(wordList[randomWordIndex]));
    //     inplay = 1;
    //     }
    // To generate a random word

    $("#random-button").on("click", function() {
    $("#random-number").text(Math.floor(Math.random() * 1001))
    })
    // ...

  })