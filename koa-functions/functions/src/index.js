const functions = require("firebase-functions");
// const hello = require("./handlers/helloWorld");
const apiHandler = require('./handlers/api');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(apiHandler.callback());