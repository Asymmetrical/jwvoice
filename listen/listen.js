// -------------------- Speech top stuff --------------- //
const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

const dialog = require('./../dialog');

// Creates a client
// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. Not sure if speech has this...
/*const client = new speech.SpeechClient({
  keyFilename: '~/node/voicenav_gs/speaknav-0c30d243b5f8.json'
});
*/
const client = new speech.SpeechClient();

// set encoding for the sound capturing
// default time for recording is 65 sec
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';
const recogModel = 'command_and_search';

var iheardthis = 'I am sorry, I did not hear that.';
// https://cloud.google.com/speech-to-text/docs/reference/rest/v1p1beta1/RecognitionConfig

const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        model: recogModel,
    },
    interimResults: false, // If you want interim results, set this to true
};

// ----------------------- speech top stuff END ------------------------ //

var startListening = () => {
    
// Create a recognize stream
// const recognizeStream = client
//     .streamingRecognize(request)
//     .on('error', console.error)
//     .on('data', data => 
//         process.stdout.write(
//             data.results[0] && data.results[0].alternatives[0]
//                 ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
//                 //? dialog.whatisthis(data.results[0].alternatives[0].transcript)
//               //  ? iheardthis = data.results[0].alternatives[0].transcript
//                 : `\n\nReached transcription time limit, press Ctrl+C\n`
//         )
//         //console.log(data.results[0].alternatives[0].transcript)
//     );

    const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => 
    {
        if (data.results[0] && data.results[0].alternatives[0]) {
            iheardthis = data.results[0].alternatives[0].transcript;
            console.log('LISTEN: DATA FOUND: iheardthis = ' + iheardthis);
            dialog.whatisthis(iheardthis);
        } else {
            console.log('LISTEN: NOOOOO data: iheardthis = ' + iheardthis);
        }
        //console.log(data.results[0].alternatives[0].transcript)
    }
        //
    );

// Start recording and send the microphone input to the Speech API
    record
        .start({
            sampleRateHertz: sampleRateHertz,
            threshold: 0,
            // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
            verbose: false,
            recordProgram: 'rec', // Try also "arecord" or "sox" OR default is 'rec'
            silence: '3.0',
        })
        .on('error', console.error)
        .pipe(recognizeStream);

    console.log('LISTEN: Listening, press Ctrl+C to stop.');
   // record.stop();
   // console.log('Listening is stopping.');
};

var stopListening = () => {
    //if (recognizeStream.model){
    record.stop();
    console.log('LISTEN: Listening is stopping by click.');
   // }
    
};

// TEST
//dialog.whatisthis('show connect');
//console.log('iheardthis = ' + iheardthis);
//dialog.whatisthis(iheardthis);
////////////////////////////////////////////////////////
// Export functions

module.exports.startListening = startListening;
module.exports.stopListening = stopListening;
