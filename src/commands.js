const playerName = "sweLogan86";
const commands = [
  {
    id: "abc123",
    command: `execute as ${playerName} at @s run summon chicken ~ ~ ~ {CustomName:"\\"[[name]]\\"",Age:-25000}`,
  },
  {
    id: "123abc",
    command: `execute as ${playerName} at @s run say IT WORKS`,
  },
  {
    id: "abc321",
    command: [
      `execute as ${playerName} at @s run summon chicken ~ ~ ~ {CustomName:"\\"[[name]]\\"",Age:-25000}`,
      `execute as ${playerName} at @s run summon chicken ~ ~ ~ {CustomName:"\\"[[name]]\\"",Age:-25000}`,
    ],
  },
];

module.exports = commands;
