var move = [];
var match = [];
var clicked = [];
var score = 0;
var scorex = 0;
var counter = 0;
var level = 1;
var stop;
var levelup = false;
var reach = 5;  // point need to level up
var clickHistory = [];
var progress;

function setup() { //initialize everything
  fillFunctionButtons();
  fillStatusText(1);
  fillStatusText(2);
  fillStatusText(3);
  fillProgressBar();
  fillMatrix();
  setStatusText(1, "Loaded succesfully!", "text-bold");
  setStatusText(2, "Score: ", "text-bold");
  setStatusText(3, "Level: ", "text-bold");
}


function fillFunctionButtons() {
  var headDiv = document.getElementById("head");
  var funcBtnRow = createRow();
  // createButton(buttonText, styleClass, functionName);
  funcBtnRow.appendChild(createButton("Start/Restart", "btn btn-primary btn-sm m-3", "f1()"));
  funcBtnRow.appendChild(createButton("Continue", "btn btn-dark btn-sm m-3", "f3()"));
  //funcBtnRow.appendChild(createButton("Puuurrrge!", "btn btn-light m-3", "f4()"));
  headDiv.appendChild(funcBtnRow);
}

function fillStatusText(i) {
  var headDiv = document.getElementById("head");
  var infoTextRow = createRow("ml-3");
  infoTextRow.id = "infoText" + i; //set id of this element so we can change it later
  headDiv.appendChild(infoTextRow);
}


function setStatusText(i, text, style) {
  var textDiv = document.getElementById("infoText" + i);

  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild(document.createTextNode(text));
  textDiv.innerHTML = "";
  textDiv.appendChild(newText);
}

function fillProgressBar() {
  var headDiv = document.getElementById("head");
  var progessRow = createRow("progress");
  progress = 0;
  //a green colored bar
  var bar = createProgressBar("bar", "bg-success", progress);
  progessRow.appendChild(bar);
  headDiv.appendChild(progessRow);
}

function fillMatrix() {
  var matrix = document.getElementById("grid");
  for (i = 0; i < 8; i++) {
    var newRow = createRow("justify-content-md-center");
    for (j = 0; j < 8; j++) {
      newRow.appendChild(createDefaultButton(i, j));
    }
    matrix.appendChild(newRow);
  }
}






function drop() { //sample function 2
  for (i = 7; i > 0; i--) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getButtonColor(i - 1, j));
      setButtonText(i, j, getButtonText(i - 1, j));
    }
  }
  //for row 0
  for (j = 0; j < 8; j++) {
    setButtonColor(i, j, getRandomColor());
    setButtonText(i, j, getRandomNumber(1, 10));
  }
}

function defile(number) { //sample function 3 (recursion and time)
  if (number < 0) return;
  for (n = 0; n < number; n++) {
    setTimeout(function () {

      setButtonColor(i, j, "black");
      setButtonText(i, j, "");
      setProgressBar("bar", "bg-danger", progress--);
    }, (number + 1) * number - n * n);
  }
}

function purge() { //sample function 4
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, "dark");
      setButtonText(i, j, "");
    }
  }

  setProgressBar("bar", "bg-success", counter);

}

function f1() {
  setStatusText(1, "Good Luck ^_^");
  gameStart();
}
/*
function f2() {
  setStatusText(1, "What's good @_@");
  printRecord();
}
*/

function f3() {
  setStatusText(1, "Let's go");
  gameContinue();
}

/*
function f4() {
  setStatusText("Reset EVERYTHING");
  purge();
}
*/

// helper functions below

function createRow(className) {
  var rowDiv = document.createElement("div");
  if (className == null) {
    rowDiv.className = "row";
  } else {
    rowDiv.className = "row " + className;
  }
  return rowDiv;
}

function createButton(buttonText, styleClass, functionName) {
  var button = document.createElement("button");
  button.className = styleClass;
  button.appendChild(document.createTextNode(buttonText));
  button.setAttribute("onclick", functionName);
  return button;
}

function createProgressBar(bar_id, color, value) {
  var bar = document.createElement("div");
  bar.id = bar_id;
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  return bar;
}

function setProgressBar(bar_id, color, value) {
  var bar = document.getElementById(bar_id);
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  bar.innerHTML = value + "%";
}

function createDefaultButton() {
  var button = document.createElement("div");
  button.className = "thumbnail";
  button.setAttribute("onclick", "buttonClicked(" + i + "," + j + ")");

  //the image part
  var img = document.createElement("img");
  img.id = "img_" + i + "_" + j;
  img.setAttribute("src", "images/dark.jpg"); //color change
  img.setAttribute("alt", "dark");
  img.setAttribute("class", "rounded-circle");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  return button;
}

function setButtonColor(i, j, color) {
  var button = document.getElementById("img_" + i + "_" + j);
  button.setAttribute("src", "images/" + color + ".jpg");
  button.setAttribute("alt", color);
}

function setButtonText(i, j, text) {
  var button = document.getElementById("text_" + i + "_" + j);
  button.innerHTML = text;
}

function getButtonColor(i, j) {
  var img = document.getElementById("img_" + i + "_" + j);
  return img.getAttribute("alt");
}

function getButtonText(i, j) {
  var text = document.getElementById("text_" + i + "_" + j);
  return parseInt(text.innerHTML); // return int
}

function getRandomColor() {
  //you might want to change this to get more colors
  var random = Math.floor(Math.random() * 10);
  if (random < 1) {
    return "orange";
  } else if (random < 2) {
    return "green";
  } else if (random < 3) {
    return "turquoise";
  } else if (random < 4) {
    return "gray";
  } else if (random < 5) {
    return "indigo";
  } else if (random < 6) {
    return "purple";
  } else if (random < 7) {
    return "red";
  } else if (random < 8) {
    return "yellow";
  } else if (random < 9) {
    return "pink";
  } else {
    return "mint";
  }
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

//console interaction functions
function logAllHistory() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
    return;
  }
  for (i = 0; i < clickHistory.length; i++) {
    console.log(clickHistory[i]);
  }
}

function logLastClicked() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
  } else {
    console.log(clickHistory[clickHistory.length - 1]);
  }
}






function gameStart() {

  clearTimeout(stop);

  reach = 5;
  level = 1;
  levelup = false;
  score = 0;
  counter = 100;

  fillAllRandom();
  gameProgress();


}


function gameContinue() {

  clearTimeout(stop);
  levelup = false;
  score = 0;
  counter = 100;
  fillAllRandom();
  gameProgress();

}





function gameProgress() {



  counter--;


  setStatusText(3, "Level: " + level);


  levelUp();
  stop = setTimeout(gameProgress, 1500);

  if (counter >= 60) {

    setProgressBar("bar", "bg-success", counter);



  } else if (counter >= 30) {

    setProgressBar("bar", "bg-warning", counter);


  } else if (counter >= 1) {

    setProgressBar("bar", "bg-danger", counter);


  } else {
    clearTimeout(stop);

    if (levelup) {

      setStatusText(3, "Level Up!!! Level: " + level + "! Press Continue!");
      purge();
      reach += 5; // qualifyed points increase 

    } else {

      setStatusText(1, "Game Over!!! Press Continue to current level or Press Restart");
      purge();

    }



  }




}



function levelUp() {

  findMove();
  setStatusText(2, "score: " + score);

  if (score >= reach || move.length == 0) {

    levelup = true;
    level++;
    counter = 0; // clear timer



  }


}

function buttonClicked(i, j) { //this is where you should start

  setStatusText(1, "Button [" + i + ", " + j + "] pressed");
  clicked.push({ r: i, c: j });





  if (clicked.length > 1) {
    if (i == clicked[0].r && j == clicked[0].c) {

      clicked = [];

    } else if (i == clicked[0].r - 1 || j == clicked[0].c - 1 || i == clicked[0].r + 1 || j == clicked[0].c + 1) {

      console.log(clicked);
      swap(clicked[0].r, clicked[0].c, i, j);
      findMatch();


      if (match.length == 0) {
        swap(clicked[0].r, clicked[0].c, i, j);
        clicked = [];
      } else {

        while (match.length > 0) {

          score++;
          removeMatch();
          shiftDots();
          findMatch();

        }

      }
      clicked = [];




    } else {


      clicked = [];
    }

  }


}









function fillAllRandom() { //sample function 1
  var done = false;
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getRandomColor());

    }
  }





  // remove the match dots
  resolveMatch();

  // check if has at least one possible move
  findMove();

  // when there is moves
  if (move.length > 0) {
    done = true;
  }


}

function resolveMatch() {


  findMatch();




  while (match.length > 0) {

    removeMatch();
    shiftDots();
    findMatch();
  }


}


function findMatch() {

  match = [];
  // horizontal match
  for (var i = 0; i < 8; i++) {
    var length = 1;
    for (var j = 0; j < 8; j++) {
      var done = false;
      if (j == 7) {
        done = true;
      } else {
        if (getButtonColor(i, j) == getButtonColor(i, j + 1)) {
          length++;
        } else {
          done = true;

        }
      }

      if (done) {
        if (length >= 3) {
          match.push({ r: i, c: j, matchlength: length, horizontal: true });
        }
        length = 1;
      }
    }


  }
  //check vertical
  for (var j = 0; j < 8; j++) {
    var length = 1;
    for (var i = 0; i < 8; i++) {
      var done = false;
      if (i == 7) {
        done = true;
      } else {
        if (getButtonColor(i, j) == getButtonColor(i + 1, j)) {
          length++;
        } else {
          done = true;
        }
      }

      if (done) {
        if (length >= 3) {
          match.push({ r: i, c: j, matchlength: length, horizontal: false });
        }
        length = 1;
      }

    }

  }
}



function findMove() {
  move = [];

  // horizontal
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 7; j++) {
      swap(i, j, i, j + 1);
      findMatch();
      swap(i, j, i, j + 1);

      if (match.length > 0) {
        move.push({ r: i, c: j + 1 })
      }
    }

  }

  for (var j = 0; j < 8; j++) {
    for (var i = 0; i < 7; i++) {
      swap(i, j, i + 1, j);
      findMatch();
      swap(i, j, i + 1, j);

      if (match.length > 0) {
        move.push({ r: i + 1, c: j });
      }
    }
  }

  match = [];
}

function removeMatch() {

  for (var i = 0; i < match.length; i++) {
    var onematch = match[i];

    for (var l = 0; l < onematch.matchlength; l++) {

      if (onematch.horizontal) {
        setButtonColor(onematch.r, onematch.c - l, "dark");

      } else {
        setButtonColor(onematch.r - l, onematch.c, "dark");

      }
    }



  }

  for (var j = 0; j < 8; j++) {
    var shift = 0;
    for (var i = 7; i >= 0; i--) {
      if (getButtonColor(i, j) == "dark") {
        shift++;
        setButtonText(i, j, 0);
      } else {
        setButtonText(i, j, shift);
      }
    }
  }

}

function swap(x, y, x1, y1) {
  var temp = getButtonColor(x, y);
  //console.log(" i: "+x1+" j: "+y1);
  setButtonColor(x, y, getButtonColor(x1, y1));
  setButtonColor(x1, y1, temp);


}

function shiftDots() {


  for (var j = 0; j < 8; j++) {
    for (var i = 7; i >= 0; i--) {
      if (getButtonColor(i, j) != "dark") {
        var shift = getButtonText(i, j);



        if (shift > 0) {


          setButtonText(i, j, 0);
          swap(i, j, i + shift, j);


        }


      }
    }
  }



  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (getButtonColor(i, j) == "dark") {
        setButtonColor(i, j, getRandomColor());
      }
    }
  }



}

















/* these are failed anmation method don't check it thanks.
function animaShiftdots() {

  for (var j = 0; j < 8; j++) {
    for (var i = 7; i >= 0; i--) {
      if (getButtonColor(i, j) != "dark") {
        var shift = getButtonText(i, j);



        if (shift > 0) {



          setButtonText(i, j, 0);

          swap(i, j, i + shift, j);


        }


      }
    }
  }


  setTimeout(function () {
    replaceColor();
  }, 1000);

}

function replaceColor() {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (getButtonColor(i, j) == "dark") {
        setButtonColor(i, j, getRandomColor());
      }
    }
  }
}


function animaMove() {




  var loop = setInterval(function () {

    if (match.length > 0) {

      removeMatch();

      animaShiftdots();

      findMatch();

    } else {
      clearInterval(loop);
    }





  }, 1000);

  console.log("hey");








}

function printRecord() {

  var temp=0;
    for(var i=0; i<records.length; i++){
      for(var j=1; j<records.length-1; i++){
        if(records[i]>records[j]){
            temp= records[i];
        }else{
            temp=records[j];
        }

      }
      
    }
    console.log("l: "+ temp); 
    setStatusText(4, "Game Record: "+ temp);

}
*/





