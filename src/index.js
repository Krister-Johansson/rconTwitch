require("dotenv").config();

const tmi = require("tmi.js");
const utils = require("./utils");

const { USERNAME, PASSWORD, CHANNELS } = process.env;

const twitchClient = new tmi.Client({
  options: { debug: true },
  identity: {
    username: USERNAME,
    password: PASSWORD,
  },
  channels: [CHANNELS],
});

twitchClient
  .connect()
  .then((x) => console.log("We are connected to chat!"))
  .catch(console.error);

twitchClient.on("message", async (channel, tags, message, self) => {
  if (tags.username !== BOTNAME) return;
  await utils.execute(message);
});
