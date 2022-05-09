require("dotenv").config();
const commands = require("./commands");
const tmi = require("tmi.js");
const util = require("minecraft-server-util");

const { USERNAME, PASSWORD, CHANNELS, MCRCONHOST, MCRCONPORT, MCRCONPASSWORD } =
  process.env;

const client = new util.RCON();

const connect = async () => {
  await client.connect(MCRCONHOST, MCRCONPORT, {
    timeout: 1000 * 5,
  });
  await client.login(MCRCONPASSWORD, {
    timeout: 1000 * 5,
  });
};

const findCommandInMessage = (message) => {
  const validCommand = message.includes("mc#");

  if (!validCommand) return null;

  const rawData = message.split("mc#");
  const dataCommands = rawData.splice(1, 1)[0];

  return dataCommands;
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
  if (tags.username != "streamlootsbot") return;
  const commandData = findCommandInMessage(message);

  if (commandData === null) return;

  const exicuteCommand = commands.get(commandData);
  if (exicuteCommand === null) return;

  await connect();

  const result = await client.execute(execute.result);
  console.log(result);

  await client.close();
});
