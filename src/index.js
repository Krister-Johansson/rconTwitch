require("dotenv").config();

const express = require("express");
const utils = require("./utils.js");
const tmi = require("tmi.js");
const mincraft = require("minecraft-server-util");

const { USERNAME, PASSWORD, CHANNELS, MCRCONHOST, MCRCONPORT, MCRCONPASSWORD } =
  process.env;
const PORT = 8001;

const app = express();
const client = new mincraft.RCON();

const connect = async () => {
  await client.connect(MCRCONHOST, parseInt(MCRCONPORT), {
    timeout: 1000 * 5,
  });
  await client.login(MCRCONPASSWORD, {
    timeout: 1000 * 5,
  });
};

const twitchClient = new tmi.Client({
  options: { debug: true },
  identity: {
    username: USERNAME,
    password: PASSWORD,
  },
  channels: [CHANNELS],
});

twitchClient.on("message", async (channel, tags, message, self) => {
  console.log(tags.username, message);
  if (tags.username != "streamlootsbot") return;
  const commandData = utils.findCommandInMessage(message);

  if (commandData === null) return;

  const exicuteCommand = utils.get(commandData);
  if (exicuteCommand === null) return;

  await connect();

  const result = await client.execute(exicuteCommand);
  console.log(result);

  await client.close();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  twitchClient
    .connect()
    .then((x) => console.log("We are connected to chat!"))
    .catch(console.error);
});
