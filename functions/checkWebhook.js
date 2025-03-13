require('dotenv').config();  
const { Telegraf } = require('telegraf');
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

async function checkWebhook() {
  try {
    const webhookInfo = await bot.telegram.getWebhookInfo();
    console.log(webhookInfo);
  } catch (error) {
    console.error('Error getting webhook info:', error);
  }
}

checkWebhook();
