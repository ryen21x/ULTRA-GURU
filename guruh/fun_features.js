/**
 * Fun & Entertainment Features for ULTRA-GURU
 * Games, jokes, and fun commands
 */

const { gmd, commands, reply } = require('./index');
const axios = require('axios');

// ============ DICE ROLL COMMAND ============
gmd(
  {
    pattern: "dice",
    aliases: ["roll", "d6"],
    description: "Roll a dice (1-6)",
    react: "🎲",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { reply, react } = conText;
    try {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      await react("✅");
      reply(`🎲 You rolled: **${diceResult}**`);
    } catch (error) {
      reply(`❌ Error: ${error.message}`);
    }
  }
);

// ============ COIN FLIP COMMAND ============
gmd(
  {
    pattern: "coin",
    aliases: ["flip", "toss"],
    description: "Flip a coin (Heads or Tails)",
    react: "🪙",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { reply, react } = conText;
    try {
      const flip = Math.random() > 0.5 ? "Heads" : "Tails";
      await react("✅");
      reply(`🪙 Coin flipped: **${flip}**`);
    } catch (error) {
      reply(`❌ Error: ${error.message}`);
    }
  }
);

// ============ RANDOM NUMBER COMMAND ============
gmd(
  {
    pattern: "random",
    aliases: ["rnd", "rand"],
    description: "Generate random number in range",
    react: "🎰",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { args, reply, react } = conText;
    try {
      const min = parseInt(args[0]) || 1;
      const max = parseInt(args[1]) || 100;

      if (min >= max) {
        return reply("❌ Min must be less than Max!");
      }

      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      await react("✅");
      reply(`🎰 Random number between ${min}-${max}: **${random}**`);
    } catch (error) {
      reply(`❌ Error: ${error.message}`);
    }
  }
);

// ============ JOKE COMMAND ============
gmd(
  {
    pattern: "joke",
    aliases: ["jokes", "funny"],
    description: "Get a random joke",
    react: "😂",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { reply, react } = conText;
    try {
      await react("⏳");
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      const { setup, punchline } = response.data;

      await react("✅");
      reply(`*😂 Joke:*\n\n${setup}\n\n_${punchline}_`);
    } catch (error) {
      reply("❌ Could not fetch joke!");
    }
  }
);

// ============ MEME COMMAND ============
gmd(
  {
    pattern: "meme",
    aliases: ["memes", "funny_pic"],
    description: "Get a random meme",
    react: "😆",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { reply, react, Gifted: bot } = conText;
    try {
      await react("⏳");
      const response = await axios.get('https://meme-api.herokuapp.com/gimme');
      const { url, title, subreddit } = response.data;

      const memeMess = {
        image: { url },
        caption: `*😆 Meme from r/${subreddit}*\n\n${title}`,
      };

      await bot.sendMessage(from, memeMess);
      await react("✅");
    } catch (error) {
      reply("❌ Could not fetch meme!");
    }
  }
);

// ============ RIDDLE COMMAND ============
gmd(
  {
    pattern: "riddle",
    aliases: ["puzzle", "brain_teaser"],
    description: "Get a riddle puzzle",
    react: "🧩",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { reply, react } = conText;
    try {
      await react("⏳");
      const response = await axios.get('https://riddle-api.herokuapp.com/random');
      const { riddle, answer } = response.data;

      await react("✅");
      reply(`*🧩 Riddle:*\n\n${riddle}\n\n_Reply with .answer to reveal the answer_`);
    } catch (error) {
      reply("❌ Could not fetch riddle!");
    }
  }
);

// ============ TRIVIA COMMAND ============
gmd(
  {
    pattern: "trivia",
    aliases: ["triviaquestion", "knowledge"],
    description: "Get a trivia question",
    react: "🧠",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { reply, react } = conText;
    try {
      await react("⏳");
      const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
      const question = response.data.results[0];

      let triviaText = `*🧠 Trivia Question:*\n\n${question.question}\n\n`;
      const answers = [...question.incorrect_answers, question.correct_answer].sort();

      answers.forEach((ans, index) => {
        triviaText += `${index + 1}. ${ans}\n`;
      });

      await react("✅");
      reply(triviaText);
    } catch (error) {
      reply("❌ Could not fetch trivia!");
    }
  }
);

// ============ 8BALL COMMAND ============
gmd(
  {
    pattern: "8ball",
    aliases: ["magic8ball", "ask8ball"],
    description: "Ask the magic 8-ball a yes/no question",
    react: "🎱",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { args, reply, react } = conText;
    try {
      if (!args.length) {
        return reply("*Usage:* `.8ball <your question>`");
      }

      const responses = [
        "✅ Yes, definitely!",
        "✅ It is certain.",
        "✅ Most likely.",
        "❓ Ask again later.",
        "❓ Cannot predict now.",
        "❌ No, definitely not.",
        "❌ Don't count on it.",
        "❌ Very unlikely.",
        "🤷 My sources say no.",
        "🤷 The outlook is uncertain.",
      ];

      const answer = responses[Math.floor(Math.random() * responses.length)];
      await react("✅");
      reply(`*🎱 Magic 8-Ball:*\n\n${answer}`);
    } catch (error) {
      reply(`❌ Error: ${error.message}`);
    }
  }
);

// ============ CHOICE COMMAND ============
gmd(
  {
    pattern: "choose",
    aliases: ["pick", "select"],
    description: "Make a random choice from options",
    react: "🎯",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { args, reply, react } = conText;
    try {
      if (args.length < 2) {
        return reply("*Usage:* `.choose <option1> <option2> [option3] ...`\n\n_Example: .choose pizza burger tacos_");
      }

      const choice = args[Math.floor(Math.random() * args.length)];
      await react("✅");
      reply(`🎯 I choose: **${choice}**`);
    } catch (error) {
      reply(`❌ Error: ${error.message}`);
    }
  }
);

// ============ RATE COMMAND ============
gmd(
  {
    pattern: "rate",
    aliases: ["rating", "howmuch"],
    description: "Rate something from 1-10",
    react: "⭐",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { args, reply, react } = conText;
    try {
      if (!args.length) {
        return reply("*Usage:* `.rate <something>`\n\n_Example: .rate pizza_");
      }

      const rating = Math.floor(Math.random() * 11);
      const item = args.join(" ");

      await react("✅");
      reply(`⭐ I rate ${item}: **${rating}/10**`);
    } catch (error) {
      reply(`❌ Error: ${error.message}`);
    }
  }
);

// ============ ROAST COMMAND ============
gmd(
  {
    pattern: "roast",
    aliases: ["roasting", "insult"],
    description: "Get a random roast",
    react: "🔥",
    category: "fun",
  },
  async (from, Gifted, conText) => {
    const { reply, react } = conText;
    try {
      const roasts = [
        "You're like a human version of a participation trophy.",
        "If you were a vegetable, you'd be a turnip because you've turned up nowhere.",
        "I'd roast you, but my mom said I'm not supposed to burn trash.",
        "You're proof that even nature makes mistakes.",
        "I'm not saying you're dumb, but you'd lose a game of wits to a toaster.",
      ];

      const roast = roasts[Math.floor(Math.random() * roasts.length)];
      await react("✅");
      reply(`🔥 *Roast:*\n\n${roast}`);
    } catch (error) {
      reply(`❌ Error: ${error.message}`);
    }
  }
);

module.exports = { gmd };
