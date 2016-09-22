'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Dice and Coin';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetCoin');
    },
    'GetCoinIntent': function () {
        this.emit('GetCoin');
    },
    'GetCoin': function () {
        var randomNumber = Math.random();
        var result = randomNumber > .5 ? "Tails" : "Heads";
        var speechOutput = "The flip was: " + result;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, result);
    },
    'GetDiceIntent': function(){
        var diceType = this.event.request.intent.slots.Dice.value;
        console.log(diceType);
        if(diceType == null) {
            this.emit("AMAZON.HelpIntent");
            return;
        }
        var diceNum = parseInt(diceType);
        console.log(diceNum);
        this.emit("GetDice",diceNum)
    },
    'GetDice': function(diceNum) {
        var number = Math.floor((Math.random() * diceNum) + 1);
        var speechOutput = "Rolled a: " + number;
        this.emit(":tellWithCard", speechOutput, SKILL_NAME, number);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say Flip a Coin, or, you can say Roll a d six. How can I help you?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
