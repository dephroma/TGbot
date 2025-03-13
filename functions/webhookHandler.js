require('dotenv').config();
const { Telegraf } = require('telegraf');
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

//! Обработчик вебхука
bot.telegram.setWebhook('https://tgeagle.netlify.app/.netlify/functions/index');

const handleWebhook = async (event, context) => {
    console.log("Получено событие:", event); // Логируем событие для отладки

    let body;
    try {
        if (event.body) {
            body = JSON.parse(event.body); // Если есть тело запроса, парсим его
            console.log("Parsed body:", body); // Логируем тело запроса после парсинга
        } else {
            console.log("Тело запроса пустое!"); // Логируем, если тело запроса пустое
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Empty request body" })
            };
        }
        
        await bot.handleUpdate(body); // Обрабатываем обновление через Telegraf
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Webhook processed successfully" })
        };
    } catch (error) {
        console.error('Ошибка при обработке webhook:', error); // Логируем ошибку
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error handling webhook' })
        };
    }
};


module.exports = { bot, handleWebhook };