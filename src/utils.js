const mincraft = require("minecraft-server-util");
const commands = require("./commands");

const { MCRCONHOST, MCRCONPORT, MCRCONPASSWORD } = process.env;

const client = new mincraft.RCON();

const connect = async () => {
  await client.connect(MCRCONHOST, parseInt(MCRCONPORT), {
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

const get = (code) => {
  const result = commands.find((x) => x.id == code);
  if (result === undefined) return null;
  return result.command;
};

const parsJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const template = (command, data) => {
  if (data == null) return command;

  Object.keys(data).forEach((key) => {
    command = command.replace(`[[${key}]]`, data[key]);
  });

  return command;
};

module.exports.execute = async (message) => {
  if (message == undefined)
    return { success: false, message: "message is undefined" };

  const commandData = findCommandInMessage(message);

  if (commandData === null)
    return { success: false, message: "Could not find command!" };

  const [command, metadata] = commandData.includes("|")
    ? commandData.split("|")
    : [commandData, null];

  const parseMetadata = parsJson(metadata);

  const exicuteCommand = get(command, parseMetadata);

  if (exicuteCommand === null)
    return { success: false, message: "Could not find command!" };

  await connect();

  let result = null;

  if (Array.isArray(exicuteCommand)) {
    const promises = exicuteCommand.map(async (command) => {
      return await client.execute(template(command, parseMetadata));
    });

    result = await Promise.all(promises);
  } else {
    result = await client.execute(template(exicuteCommand, parseMetadata));
  }

  await client.close();

  return { success: true, message: result };
};
