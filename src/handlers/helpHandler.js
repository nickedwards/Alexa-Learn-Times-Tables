let helpers = require('../helpers/helpers');

const copy = {
    message: 'You can ask me to read a number\'s times table, for example try asking for the ' + helpers.getRandomInt(1,10) + ' times table up to ' + helpers.getRandomInt(2,10),
    reprompt: 'Which times table would you like to hear?'
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(copy.message + ' <break time=\"1s\"/> ' + copy.reprompt)
            .reprompt(copy.reprompt)
            .getResponse();
    },
};