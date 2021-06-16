'use strict'

// Include the Alexa Library.
const Alexa = require('ask-sdk');

// handlers
const launchRequestHandler   = require('./handlers/launchRequestHandler');
const helpHandler            = require('./handlers/helpHandler');
const timesTableHandler            = require('./handlers/timesTableHandler');
const unhandledHandler       = require('./handlers/unhandledHandler');

const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        launchRequestHandler,
        timesTableHandler,
        helpHandler
    )
    .addErrorHandlers(unhandledHandler)
    .lambda();