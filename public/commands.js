//console.log('commandsjs from PUBLIC folder');
// this file contains actions that the user activates from the 'commands'
// needs to be in the public folder to be able to be processed

var context = 'defaultContext';

var availablePages = ['start', 'home', 'search', 'overview', 'edit', 'create', 'connect'];

var processContent = (tag) => {
console.log(tag);
  var msg = new SpeechSynthesisUtterance('I heard: ' + tag);
  window.speechSynthesis.speak(msg);
};

var sayHello = () => {
  var msg = new SpeechSynthesisUtterance('Hello there! And welcome.');
  window.speechSynthesis.speak(msg);
};

var confirmCool = () => {
  var msg = new SpeechSynthesisUtterance('Yes, it is kind of cool.');
  window.speechSynthesis.speak(msg);
  var msg = new SpeechSynthesisUtterance('Is it not?');
  window.speechSynthesis.speak(msg);
};

var navigateTo = function (tag) {
  //console.log("trying to go to");
  for (var i = 0; i < availablePages.length; i++) {
    if (tag === availablePages[i] ){
      var msg = new SpeechSynthesisUtterance('Showing page' + ' ' + tag);
      window.speechSynthesis.speak(msg);
      // var url = 'http://localhost:3000/'+tag+'.html';
      var url = '/' + tag;
      window.location.href = url;
    } 
  }
};

var showingMenu = () => {
  
    var x = document.getElementById("mainMenu");
    if (x.style.display === "none") {
      var msg = new SpeechSynthesisUtterance('Showing menu');
  window.speechSynthesis.speak(msg);
        x.style.display = "block";
    } else {
      var msg = new SpeechSynthesisUtterance('Hiding menu');
  window.speechSynthesis.speak(msg);
        x.style.display = "none";
    }

};

var scrollDown = (tag) => {
  if (tag === '' || tag === 'a bit' || tag === 'a little' || tag === 'more'){
  var msg = new SpeechSynthesisUtterance('Scrolling down a little');
  window.speechSynthesis.speak(msg);
  window.scrollBy(0, 500); 
  } else if ( tag === 'a lot') {
    var msg = new SpeechSynthesisUtterance('Scrolling down a lot');
  window.speechSynthesis.speak(msg);
  window.scrollBy(0, 1500);
  }
};

var scrollUp = () => {
  var msg = new SpeechSynthesisUtterance('Scrolling up');
  window.scrollTo(0, 0); 
};

var navigateBack = function (tag) {
  //console.log("trying to go to");
  var msg = new SpeechSynthesisUtterance('Going back.');
  window.speechSynthesis.speak(msg);
  window.history.back();
};

var navigateForward = function (tag) {
  //console.log("trying to go to");
  var msg = new SpeechSynthesisUtterance('Moving forward.');
  window.speechSynthesis.speak(msg);
  window.history.forward();
};



