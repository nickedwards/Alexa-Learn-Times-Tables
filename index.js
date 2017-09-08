// Include the Alexa Library.
var Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.8e774613-8603-4e15-97eb-95efdfcf3caf";

const SKILL_NAME = "Learn Times Tables";
const HELP_MESSAGE = "You can ask me to read a number's times table, for example try asking for the 5 times table up to 7. Or, you can ask to be quizzed, for example try asking quiz me on the 8 times table.";
const CANCEL_MESSAGE = "Would you like to hear another times table?";
const STOP_MESSAGE = "Goodbye!";
const HELP_REPROMPT = "Which times table would you like to hear?";
const UNKNOWN_RESPONSE = "Sorry, I didn't understand that.";
const PAUSE = "<break time=\"1s\"/>";

var states = {
    TIMESTABLE: "_TIMESTABLE",
    QUIZ: "_QUIZ"
};

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
    // Create an instance of the Alexa library and pass it the requested command.
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(timesTableHandlers);
    alexa.execute();
};

var timesTableHandlers = Alexa.CreateStateHandler(states.TIMESTABLE, {
    'LaunchRequest': function () {
      this.response.speak('Welcome to ' + SKILL_NAME + '.' + PAUSE + HELP_REPROMPT).listen(HELP_REPROMPT);
      this.emit(':responseReady');
    },

    'TimesTableIntent': function () {
        // set a default maxNumber
        var maxNumber = 10,
            // get variables from input slots
            inputNumber = parseInt(this.event.request.intent.slots.number.value),
            inputMax = parseInt(this.event.request.intent.slots.inputMax.value);

        if (isNaN(inputNumber)) {
            errorMessage = 'Sorry, I didn\'t understand that number. Please ask for the times table you would like to hear. For example <emphasis>the 3 times table</emphasis>.';
            this.emit('ErrorHandler');
            return;
        }

        if (!isNaN(inputMax)) {
            maxNumber = inputMax;
        }

        var responseOutput = 'The ' + inputNumber + ' times table, up to ' + maxNumber + ':' + PAUSE;

        for(var i=1; i <= maxNumber; i++){
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
});

var timesTableHandlers = Alexa.CreateStateHandler(states.TIMESTABLE, {
    'QuizStartIntent': function () {
        // define defaults
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        var numberOfQuestions = 5,
            // get variables from input slots
            inputNumberOfQuestions = parseInt(this.event.request.intent.slots.numberOfQuestions.value),
            inputNumberToUse = parseInt(this.event.request.intent.slots.numberToUse.value);

        if (!isNaN(inputNumberOfQuestions)) {
            numberOfQuestions = inputNumberOfQuestions;
        }

        // generate questions
        var questions = new Object();
        for(var i=1; i <= numberOfQuestions; i++){
            if (isNaN(inputNumberToUse)) {
                // generate a random number between 1 and 10
                inputNumberToUse = getRandomInt(1,10);
            }
            // generate a random number between 1 and 10
            var numberToMultiplyBy = getRandomInt(1,10);
            var sumEquals = inputNumberToUse * numberToMultiplyBy;
            var question = "What is " + inputNumberToUse " times " + numberToMultiplyBy;
            questions[i] =  new Object();
            questions[i][question] = sumEquals;
        }

        // save questions in session
        
        // ask first question

    }

    'QuizNextQuestionIntent': function () {

    }

    'QuizAnswerIntent': function () {

    }

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
});

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}