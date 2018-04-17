console.log('commandsjs from HBS folder');

var commands = {
    'hello': function() {
      console.log("Hello there!!");      
    },
 /*
    'show main': function() {
        console.log("works search");
        window.location.href="index.html"; 
      },
    'show overview': function() {
      console.log("works overview");
      window.location.href="overview.html"; 
    },
    'show search': function() {
      console.log("works search");
      window.location.href="search.html"; 
    },
    
      'go back': function() {
        console.log("back");
        window.history.back();
      },
      
      'back (it up)': function() {
        console.log("back");
        window.history.back(); 
      }
*/
  };

  var navigateTo = function(tag) {
      console.log("trying to navigateTo HBS folder");

      if (tag == 'go back'){
        var msg = new SpeechSynthesisUtterance('Going back.');
      window.speechSynthesis.speak(msg);
        window.history.back(); 
      } else {
        var msg = new SpeechSynthesisUtterance('Showing page'+' '+tag);
      window.speechSynthesis.speak(msg);
    //var url = 'http://localhost:5000/'+tag+'.html';
    //window.location.href=url
      }
  }

  var navigateBack = function(tag) {
    //console.log("trying to go to");
    var msg = new SpeechSynthesisUtterance('Going back.');
      window.speechSynthesis.speak(msg);
      window.history.back(); 
}

var navigateForward = function(tag) {
    //console.log("trying to go to");
    var msg = new SpeechSynthesisUtterance('Moving forward.');
      window.speechSynthesis.speak(msg);
      window.history.forward(); 
}



  