const commands = require("./commands");
module.exports.findCommandInMessage = (message) => {
  const validCommand = message.includes("mc#");

  if (!validCommand) return null;

  const rawData = message.split("mc#");
  const dataCommands = rawData.splice(1, 1)[0];

  return dataCommands;
};

module.exports.get = (code) => {
  const result = commands.find((x) => x.id == code);
  if (result === undefined) return null;
  return result.command;
};
