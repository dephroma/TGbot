// const { Telegraf } = require('telegraf');

//! Обработчик вебхука
// const handleWebhook = async (event) => {
//     const body = JSON.parse(event.body); //* Получаем тело запроса
//     try {
//         console.log('Received webhook event:', body); //* Логируем событие
//         await bot.handleUpdate(body); //* Обрабатываем обновление через Telegraf
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Webhook processed successfully" })
//         };
//     } catch (error) {
//         console.error('Error handling webhook:', error); //* Логируем ошибку
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: 'Error handling webhook' })
//         };
//     }
// };

const handleWebhook = async (event, context) => {
    const body = JSON.parse(event.body);  //* Получаем тело запроса
    try {
        console.log('Received webhook event:', body);  //* Логируем событие
        await bot.handleUpdate(body);  //* Обрабатываем обновление через Telegraf
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Webhook processed successfully" })
        };
    } catch (error) {
        console.error('Error handling webhook:', error);  //* Логируем ошибку
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error handling webhook' })
        };
    }
};

module.exports = { handleWebhook };