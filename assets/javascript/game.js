
$(document).ready(function() {
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_"];
    var emodis = ["dis1.gif","dis2.gif","dis3.gif","dis4.gif"]
    var emocheer = ["cheer1.gif","cheer2.gif","cheer3.gif","cheer4.gif"]
    var congra = ["congra.gif"]
    var lose = ["lose.gif"]
        // emos
    var correctsound = document.createElement("audio");
    correctsound.setAttribute("src", "./assets/sound/right.mp3");
    var wrongsound = document.createElement("audio");
    wrongsound.setAttribute("src", "./assets/sound/wrong.mp3");
    var applausesound = document.createElement("audio");
    applausesound.setAttribute("src", "./assets/sound/applause.mp3");
    var boosound = document.createElement("audio");
    boosound.setAttribute("src", "./assets/sound/boo.mp3");


    function addemo(emo) {
        var iframeemo = $("<img>");
        var indexemo = Math.floor(Math.random() * emo.length);
        console.log(indexemo)
        var linkemo = emo[indexemo];
        console.log(linkemo);
        iframeemo.attr("src","./assets/gif/"+linkemo);
        console.log(iframeemo)
        iframeemo.addClass("emotion");
        $("#emocon").empty()
        $("#emocon").append(iframeemo);
    }
    var addimgclue = function(index) {
        var imgclue = $("<img>");
        imgclue.attr("src","./assets/images/"+index);
        imgclue.addClass("imgclue");
        $(".imagecue").empty()
        $(".imagecue").append(imgclue);
    }
    function guessresult(result) {
        $("#guessresult").empty()
        var resulttag = $("<p>");
        resulttag.addClass("rightwrong");
        resulttag.text(result)
        $("#guessresult").append(resulttag);
    }
    
    var guessRem = 8
    var wins = 0
    $("#wins").append(wins)
    $("#guessRemained").append(guessRem)
    var wordList = ["brainstorm","encouragement","springchicken","superbowl","windowshopping","serialkiller","scrambledeggs","couchpotato","highfive"]
    var wordListClue = {"brainstorm":"q1.jpg","encouragement":"q2.jpg","springchicken":"q3.jpg","superbowl":"q4.jpg","windowshopping":"q5.jpg","serialkiller":"q6.jpg","scrambledeggs":"q7.jpg","couchpotato":"q8.jpg","highfive":"q9.jpg"}
    var mainWord = ""
    var wordstring = []
    var wordstringblind = []
    function populateListOfLetters(){
        for( var i = 0; i < letters.length-1; i++){
            var letterBtn = $("<span>")
              letterBtn.addClass("letter")
              letterBtn.attr("id",letters[i])
              letterBtn.attr("data-letter", letters[i])
              letterBtn.text(letters[i])
              $("#alreadyGuessed").append(letterBtn)}
    }
    function reset(){
        guessRem = 8
        $("#guessRemained").empty()
        $("#guessRemained").append(guessRem)
        wordstring = []
        wordstringblind = []
        $("#alreadyGuessed").empty()
        $("#characters").empty()
    }

    function generateword(j){
        randomWordIndex = Math.floor(Math.random() * j);
        console.log("randomWordIndex=" + randomWordIndex)
        mainWord = wordList[randomWordIndex]
        console.log("mainword="+mainWord)
        wordList.splice(randomWordIndex,1)
        console.log("wordlist="+wordList)
        for (var i = 0;i<mainWord.length;i++){
            wordstring.push(mainWord[i])
            wordstringblind.push("_")
        }
        addimgclue(wordListClue[mainWord])
    }
    function newwordfilled(){
        for (var i=0; i< wordstringblind.length; i++){
        var letterappend = $("<span>")
        letterappend.addClass("letter-display")
        letterappend.text(wordstringblind[i])
        $("#characters").append(letterappend)
        // $("#characters").append($('<span class="letter"></span').text(" "));
        }
    }
    generateword(wordList.length)
    newwordfilled()
    populateListOfLetters()

    $(".resetbutton").on("click", function() {
        reset()
        generateword(wordList.length)
        newwordfilled()
        populateListOfLetters()
        wins = 0;
        $("#wins").empty()
        $("#guessRemained").empty()
        $("#wins").append(wins)
        $("#guessRemained").append(guessRem)
      });
    $(".continuebutton").on("click", function() {
        reset()
        generateword(wordList.length)
        newwordfilled()
        populateListOfLetters()
    });
    document.onkeyup = function(){
        var underscoreindex = 0;
        var hitkey = event.key;
        var guessright = false;
        $("#"+hitkey).animate({ opacity: "0.3" });
        for(var i=0; i<wordstring.length;i++){
            if (hitkey == wordstring[i]) {
                wordstringblind[i]=wordstring[i]
                guessright = true;
            }
        } 
        if (guessright){
            addemo(emocheer)
            guessresult("Correct")
            correctsound.play()
            } else {
            wrongsound.play()
            guessresult("Incorrect")
            guessRem -= 1
            $("#guessRemained").empty()
            $("#guessRemained").append(guessRem)
            addemo(emodis)
        }
    
        $("#characters").empty()
        for (var i=0; i< wordstringblind.length; i++){
            var letterappend = $("<span>")
            letterappend.addClass("letter-display")
            letterappend.text(wordstringblind[i])
            $("#characters").append(letterappend)
            // $("#characters").append($('<span class="letter"></span').text(" "));
        }

        // if(_.isEqual(wordstring, wordstringblind) {
        //     alert("you win")
        // }
        underscoreindex = wordstringblind.indexOf("_")
        if(underscoreindex == -1){
            addemo(congra);
            applausesound.play()
            wins +=1;
            $("#wins").empty();
            $("#wins").append(wins);
            guessresult("Winner")
            alert("You won! Hit Continue to play more!");
            // if(continueplay) {
            //     reset()
            //     generateword(wordList.length)
            //     newwordfilled()
            //     populateListOfLetters()
            // } else {
            //     alert("Thank you for playing.")
            //     $("<body>").empty()
            // }

        }
        if(guessRem == 0) {
            addemo(lose);
            boosound.play();
            guessresult("Loser")
            alert("You lost. Hit Continue to play more!");
        }
        // console.log(wordstring)
        // console.log(wordstringblind)
        // // console.log(_.isEqual(wordstring, wordstringblind)  )          
    }


    // var inplay = 0
    // var guessRemained = 15
    // var letterGuessed = []
    // var randomWordIndex = 0;
    // document.onkeyup = function(event) {
    //     randomWordIndex = Math.floor(Math.random() * 3);
    //     $("#characters").append($("<p></P").text(wordList[randomWordIndex]));
    //     inplay = 1;
    //     }
    // To generate a random word

    // $("#random-button").on("click", function() {
    // $("#random-number").text(Math.floor(Math.random() * 1001))
    // })
    // ...

  })