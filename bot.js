const restify = require('restify');
const botbuilder = require('botbuilder');
const recast = require('recastai');
const config = require('./config.js');

// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: config.botConnector.appId,
  appPassword: config.botConnector.appSecret,
})

//Connection to Recast.ai
const recastClient = new recast.Client(config.recast.request_token);

const bot = new builder.UniversalBot(connector);

// Event when Message received
bot.dialog('/', (session) => {
  console.log(session.message.text);
  recastClient.textRequest(session.message.text)
              .then(res => {
               console.log(res)
               const intent = res.intent()
               session.send('Intent: ${intent}')
              })
              .catch(() => session.send('I need some sleep right now... Talk to me later!'))
})

// Server Init
const server = restify.createServer();
server.listen(8080);
server.post('/', connector.listen());
