
const copy = {
    welcomeMessage: 'Welcome to Learn Times Tables.<break time=\"1s\"/>Which times table would you like to hear?',
    welcomeReprompt: 'Which times table would you like to hear? Say "help" for other options.'
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        let message = copy.welcomeMessage;
        return handlerInput.responseBuilder
            .speak(message)
            .reprompt(copy.welcomeReprompt)
            .getResponse();
    }
};