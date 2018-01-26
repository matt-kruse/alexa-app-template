var alexa = require("alexa-app");

var app = new alexa.app();

// For ASK CLI
app.invocationName = "alexa app template";

// LAUNCH INTENT
// =============
app.launch(function(request, response) {
  response.say("Alexa App Template").send();
});

// CUSTOM INTENTS
// ==============
app.intent("name", 
	{
		"slots": {
			"firstname":"AMAZON.US_FIRST_NAME"
		},
		"utterances": [
			"my name is {-|firstname}"
		]
	},
	function(request,response) {
		response.say(`hello ${request.slot('firstname')}`);
	}
);

// REQUIRED INTENTS
// ================
app.intent("AMAZON.HelpIntent", {
    "slots": {},
    "utterances": []
  },
  function(request, response) {
    var helpOutput = "This skill is a template. It doesn't do anything interesting.";
    var reprompt = "What would you like to do?";
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
  }
);
app.intent("AMAZON.StopIntent", function(request, response) {
    response.say("Stop. Goodbye");
  }
);
app.intent("AMAZON.CancelIntent", function(request, response) {
    response.say("Cancel. Goodbye.");
  }
);

// connect to lambda
exports.handler = app.lambda();
exports.app = app;
