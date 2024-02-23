const TelegramBot = require('node-telegram-bot-api');
const { Perplexity } = require('perplexityai');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.startsWith('/start')) {
    const user = msg.from.first_name;
    const text = `Hey, [${user}](tg://user?id=${msg.from.id})!

🌐_Welcome to Perplexity Ai – Your AI Powerhouse!_ 🤖.

✨_Ask anything for real-time knowledge, latest news, and expert insights. Stay informed, stay sharp! 💡🌍_

#SmartBot`;
    const keyboard = [
      [
        { text: '💸 SANCHIT 💸', url: 'https://t.me/X668F' },
        { text: '🔮 Follow Me On Instagram 🔮', url: 'https://www.instagram.com/sanch1t' },
      ],
    ];
    bot.sendMessage(chatId, text, { parse_mode: 'Markdown', reply_markup: { inline_keyboard: keyboard } });
  } else {
    const text = msg.text;
    const answers = await Perplexity().generate_answer(text);
    const result = answers[answers.length - 1].answer.replace(/\[\d+\]/g, '');
    bot.sendMessage(chatId, result, { parse_mode: 'Markdown' });
  }
});
