const restify = require("restify");
const builder = require("botbuilder");
const recast = require("recastai");
//const config = require('./config.js');

// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_SECRET,
});

//Connection to Recast.ai
const recastClient = new recast.Client(process.env.RECASTAI_TOKEN);

const bot = new builder.UniversalBot(connector);

// Event when Message received
bot.dialog("/", (session) => {
  console.log(session.message.text);
  recastClient.textRequest(session.message.text)
  .then(res => {
    console.log(res);
    const intent = res.intent();
    session.send("Intent: "+intent);
  })
  .catch(() => session.send("I need some sleep right now... Talk to me later!"))
});

// Server Init
const server = restify.createServer({name: "patro-bot"});
server.listen(process.env.PORT || 6010, "0.0.0.0", () => {
  console.log("%s listening at %s", server.name, server.url);
});
server.post("/", connector.listen());
