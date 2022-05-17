require("dotenv").config();

const tmi = require("tmi.js");
const utils = require("./utils.js");

// const twitchClient = new tmi.Client({
//   options: { debug: true },
//   identity: {
//     username: USERNAME,
//     password: PASSWORD,
//   },
//   channels: [CHANNELS],
// });

// twitchClient
//   .connect()
//   .then((x) => console.log("We are connected to chat!"))
//   .catch(console.error);

// twitchClient.on("message", async (channel, tags, message, self) => {
//   if (tags.username !== BOTNAME) return;
//   await utils.execute(message);
// });

utils
  .execute('mc#123abc|{"message":"Hello what are we doing?"}')
  .then((result) => {
    if (result.success) {
      console.log(result.message);
    } else {
      console.error(result.message);
    }
  });
