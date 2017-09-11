// Include the Alexa Library.
var Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.8e774613-8603-4e15-97eb-95efdfcf3caf";

const SKILL_NAME = "Learn Times Tables";
const HELP_MESSAGE = "You can ask me to read a number's times table, for example try asking for the " + getRandomInt(1,10) + " times table up to " + getRandomInt(1,10);
const CANCEL_MESSAGE = "Would you like to hear another times table?";
const STOP_MESSAGE = "Goodbye!";
const HELP_REPROMPT = "Which times table would you like to hear?";
const UNKNOWN_RESPONSE = "Sorry, I didn't understand that.";
const PAUSE = "<break time=\"1s\"/>";

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
    // Create an instance of the Alexa library and pass it the requested command.
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
      this.response.speak('Welcome to ' + SKILL_NAME + '.' + PAUSE + HELP_REPROMPT).listen(HELP_REPROMPT);
      this.emit(':responseReady');
    },

    'TimesTableIntent': function () {
        // set a default upToNumber
        var upToNumber = 10;
        // get variables from input slots
        var inputNumber = parseInt(this.event.request.intent.slots.number.value);
        var inputUpTo = parseInt(this.event.request.intent.slots.inputMax.value);

        if (isNaN(inputNumber)) {
            errorMessage = 'Sorry, I didn\'t understand that number. Please ask for the times table you would like to hear. For example <emphasis>the ' + getRandomInt(1,10) + ' times table</emphasis>.';
            this.emit('ErrorHandler');
            return;
        }

        if (!isNaN(inputUpTo)) {
            upToNumber = inputUpTo;
        }

        var responseOutput = 'The ' + inputNumber + ' times table, up to ' + upToNumber + ':' + PAUSE;

        for(var i=1; i <= upToNumber; i++){
            var sumEquals = inputNumber * i;
            responseOutput += i + ' times ' + inputNumber + ' is ' + sumEquals + PAUSE;
        }

        this.response.speak(responseOutput + PAUSE + HELP_REPROMPT).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        this.response.speak(HELP_MESSAGE + PAUSE + HELP_REPROMPT).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(CANCEL_MESSAGE + PAUSE + HELP_REPROMPT).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },

    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },

    'ErrorHandler': function() {
        this.response.speak(errorMessage + PAUSE + HELP_REPROMPT).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },

    'Unhandled': function() {
        this.response.speak(UNKNOWN_RESPONSE + PAUSE + HELP_REPROMPT).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    }
};

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}