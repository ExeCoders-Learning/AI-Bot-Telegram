/*
Thanks TO
- Miftah
- User
Note: Please don't delete my name
*/

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('./config');

const bot = new TelegramBot(botToken, { polling: true });

let activeAiMode = '';
let activeAiStopButton = '';
function getUserName(msg) {
  return msg.from.first_name;
}

function getGreetingMessage() {
  const now = new Date().getHours() + 7;
  if (now >= 0 && now < 6) {
    return 'udah malam belum tidur?';
  } else if (now >= 6 && now < 12) {
    return 'Selamat Pagi!';
  } else if (now >= 12 && now < 15) {
    return 'Selamat Siang!';
  } else if (now >= 15 && now < 18) {
    return 'Selamat Sore!';
  } else {
    return 'Selamat Malam!';
  }
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      keyboard: [
        ['Bing', 'Simi'],
        ['Gemini', 'Gptweb'],
        ['ITzpire', 'Llama2'],
        ['Mistral', 'Palm'],
        ['You', 'Toolbot'],
        ['Blackbox', 'Stop']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
  const userName = getUserName(msg);
  const greetingMessage = getGreetingMessage();
  bot.sendMessage(chatId, `Halo ${userName}! ${greetingMessage} Pilih salah satu opsi:`, options);
});

bot.onText(/Blackbox/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'blackbox';
  activeAiStopButton = '/stop_blackbox';
  bot.sendMessage(chatId, 'Mode Blackbox AI telah dipilih.');
});

bot.onText(/Toolbot/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'toolbot';
  activeAiStopButton = '/stop_bing';
  bot.sendMessage(chatId, 'Mode Toolbot AI telah dipilih.');
});

bot.onText(/You/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'you';
  activeAiStopButton = '/stop_you';
  bot.sendMessage(chatId, 'Mode You AI telah dipilih.');
});

bot.onText(/Palm/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'palm';
  activeAiStopButton = '/stop_palm';
  bot.sendMessage(chatId, 'Mode Palm AI telah dipilih.');
});

bot.onText(/Mistral/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'mistral';
  activeAiStopButton = '/stop_mistral';
  bot.sendMessage(chatId, 'Mode Mistral AI telah dipilih.');
});

bot.onText(/Bing/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'bing';
  activeAiStopButton = '/stop_bing';
  bot.sendMessage(chatId, 'Mode Bing AI telah dipilih.');
});

bot.onText(/Gemini/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'gemini';
  activeAiStopButton = '/stop_gemini';
  bot.sendMessage(chatId, 'Mode Gemini AI telah dipilih.');
});

bot.onText(/Gptweb/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'gptweb';
  activeAiStopButton = '/stop_gptweb';
  bot.sendMessage(chatId, 'Mode Gptweb AI telah dipilih.');
});

bot.onText(/ITzpire/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'itzpire';
  activeAiStopButton = '/stop_itzpire';
  bot.sendMessage(chatId, 'Mode ITzpire AI telah dipilih.');
});

bot.onText(/Llama2/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'llama2';
  activeAiStopButton = '/stop_llama2';
  bot.sendMessage(chatId, 'Mode Llama2 AI telah dipilih.');
});

bot.onText(/Simi/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = 'simi';
  activeAiStopButton = '/stop_simi';
  bot.sendMessage(chatId, 'Mode Simi telah dipilih.');
});

bot.onText(/Stop/, (msg) => {
  const chatId = msg.chat.id;
  activeAiMode = '';
  activeAiStopButton = '';
  console.log(`[USER ${msg.from.first_name} ID:${chatId}] menghentikan AI.`);
  bot.sendMessage(chatId, 'AI telah dihentikan.');
});

bot.onText(/\/owner/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`[USER ${msg.from.first_name} ID:${chatId}] meminta informasi kontak owner.`);
  bot.sendContact(chatId, ownerContact.phoneNumber, ownerContact.firstName, { last_name: ownerContact.lastName });
});

bot.onText(/\/donasi/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`[USER ${msg.from.first_name} ID:${chatId}] meminta informasi donasi.`);
  bot.sendPhoto(chatId, qrisImage, { caption: 'Terima kasih atas donasi Anda. Silakan scan QRIS di bawah ini untuk melakukan pembayaran.' });
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (activeAiMode === 'bing') {
    try {
      const response = await axios.get(api + '/ai/bing-ai', {
        params: {
          model: "Balanced",
          q: text
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'palm') {
    try {
      const response = await axios.get(api + '/ai/palm-ai', {
        params: {
          q: text
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'you') {
    try {
      const response = await axios.get(api + '/ai/you', {
        params: {
          q: text
        },
      });

      const answer = response.data.result.message;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'toolbot') {
    try {
      const response = await axios.get(api + '/ai/toolbot', {
        params: {
          q: text,
          description: "You are a helpful assistant."
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'llama2') {
    try {
      const response = await axios.get(api + '/ai/llama2', {
        params: {
          q: text
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'gemini') {
    try {
      const response = await axios.get(api + '/ai/gemini', {
        params: {
          q: text
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'simi') {
    try {
      const response = await axios.get(api + '/ai/simi-chat', {
        params: {
          text: text,
          lang: "id",
          toxic: toxic
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'blackbox') {
    try {
      const response = await axios.get(api + '/ai/blackbox-ai', {
        params: {
          q: text
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'mistral') {
    try {
      const response = await axios.get(api + '/ai/mistral', {
        params: {
          q: text
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'itzpire') {
    try {
      const response = await axios.get(api + '/ai/ITzpire', {
        params: {
          q: text
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  } else if (activeAiMode === 'gptweb') {
    try {
      const response = await axios.get(api + '/ai/gptweb', {
        params: {
          q: text,
        },
      });

      const answer = response.data.result;
      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  }
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log(`[USER ${msg.from.first_name} ID:${chatId}] send text: ${text}`);
});

bot.on('polling_error', (error) => {
  console.error(error);
});

console.log('Bot sedang berjalan...');
