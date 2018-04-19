// You can find your project ID in your Dialogflow agent settings
const projectId = 'speaknav-f5581'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const query = 'show search';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

var whatisthis = (thisQuery) => {
// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: thisQuery,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('DIALOG: Detected intent');
    const result = responses[0].queryResult;
    console.log(`DIALOG:   Query: ${result.queryText}`);
    console.log(`DIALOG:   Response: ${result.fulfillmentText}`);
    /*
    // TODO - send to webpage to speak it 
    var msg = new SpeechSynthesisUtterance(result.fulfillmentText);
    window.speechSynthesis.speak(msg);
    */
    if (result.intent) {
      console.log(`DIALOG:   Intent: ${result.intent.displayName}`);
      // if the intent is clear we can transform it into actions
      checkActionToPerform(result);
    } else {
      console.log(`DIALOG:   No intent matched.`);
    }
  })
  .catch(err => {
    console.error('DIALOG: ERROR:', err);
  });

};

// Logic for what action to take depending on the intent
var checkActionToPerform = (dialogflowResult) => {
  console.log(`DIALOG:ACTION   Intent: ${dialogflowResult.intent.displayName}`);
  var currentIntent = dialogflowResult.intent.displayName;
  if (currentIntent === 'Navigate') {
    console.log('Navigate Logic');
  }
  if (currentIntent === 'Menu') {
    console.log('Menu Logic');
  }
  if (currentIntent === 'Read') {
    console.log('Read Logic');
  }
};

/////////////////////////////

module.exports.whatisthis = whatisthis;