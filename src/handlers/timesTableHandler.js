let helpers = require('../helpers/helpers');

const copy = {
    reprompt: 'Which times table would you like to hear?',
    pause: '<break time=\"1s\"/>'
}

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'TimesTableIntent';
    },
    async handle(handlerInput) {
        // set defaults
        let startNumber = 1,
            endNumber = 12,
            maxNumbersToOutput = 30;
        // get variables from input slots
        const inputNumber = parseInt(handlerInput.requestEnvelope.request.intent.slots.number.value);
        const inputEndNumber = parseInt(handlerInput.requestEnvelope.request.intent.slots.inputEndNumber.value);
        const inputStartNumber = parseInt(handlerInput.requestEnvelope.request.intent.slots.inputStartNumber.value);

        if (isNaN(inputNumber)) {
            errorMessage = 'Sorry, I didn\'t understand that number. Please ask for the times table you would like to hear. For example <emphasis>the ' + helpers.getRandomInt(1,10) + ' times table</emphasis>.';
            return handlerInput.responseBuilder
                .speak(errorMessage + ' ' + copy.pause + ' ' + copy.reprompt)
                .reprompt(copy.reprompt)
                .getResponse();
        }

        // start of our spoken response
        let responseOutput = 'The ' + inputNumber + ' times table';

        // replace startNumber with input if provided
        if (!isNaN(inputStartNumber)) {
            startNumber = inputStartNumber;
            responseOutput += ', from ' + inputStartNumber;
        }

        // replace endNumber with input if provided
        if (!isNaN(inputEndNumber)) {
            endNumber = inputEndNumber;
            // limit the amount of numbers to output so the response doesn't get too large and error out
            if (endNumber > maxNumbersToOutput) {
                endNumber = maxNumbersToOutput;
            }
            responseOutput += ', up to ' + endNumber;
        }

        responseOutput += copy.pause;

        // error out if the starting number is above the end number
        if (endNumber < startNumber) {
            errorMessage = 'Your from number has to be less than the up to number. For example <emphasis>the ' + helpers.getRandomInt(1,10) + ' times table from ' + helpers.getRandomInt(1,10) + ' to ' + helpers.getRandomInt(10,20) + '</emphasis>.';
            return handlerInput.responseBuilder
                .speak(errorMessage + ' ' + copy.pause + ' ' + copy.reprompt)
                .reprompt(copy.reprompt)
                .getResponse();
        }

        for(let i=startNumber; i <= endNumber; i++){
            let sumEquals = inputNumber * i;
            responseOutput += i + ' times ' + inputNumber + ' is ' + sumEquals + copy.pause;
        }

        return handlerInput.responseBuilder
            .speak(responseOutput + ' ' + copy.pause + ' ' + copy.reprompt)
            .reprompt(copy.reprompt)
            .getResponse();
    },
};