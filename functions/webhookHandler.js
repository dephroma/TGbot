const { Telegraf } = require('telegraf');
const BOT_TOKEN = process.env.BOT_TOKEN; // Токен из переменных окружения
const bot = new Telegraf(BOT_TOKEN); // Инициализация бота

//! Обработчик вебхука
const handleWebhook = async (event, context) => {
    const body = JSON.parse(event.body); //* Получаем тело запроса
    try {
        console.log('Received webhook event:', body); //* Логируем событие
        await bot.handleUpdate(body); //* Обрабатываем обновление через Telegraf
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Webhook processed successfully" })
        };
    } catch (error) {
        console.error('Error handling webhook:', error); //* Логируем ошибку
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error handling webhook' })
        };
    }
};

module.exports = { bot, handleWebhook };