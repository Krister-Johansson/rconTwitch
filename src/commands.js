const commands = [
  { id: 1000, command: "abc" },
  { id: 1001, command: "cba" },
];
module.exports.get = (code) => {
  const result = commands.find((x) => x.id == code);
  if (result === undefined) return null;
  return result.command;
};
