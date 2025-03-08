const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

const {
    greetingHandler,
    catalogHandler,
    datesPriceHandler,
    faqHandler
} = require('./greeting');

const {
    enterHandler,
    paymentTermsHandler,
    infoHandler,
    bookingHandler,
    datesHandler,
    faqHandler2
} = require('./booking');

const { 
    excurses, 
    tours 
} = require('./catalog');

const { handleWebhook } = require('./webhookHandler');

exports.handler = async (event, context) => { return handleWebhook(event, context); };

//! Обработчики кнопок и старт
bot.start(greetingHandler);

bot.hears(['🔙 Назад','привет', '📅 В главное меню'], greetingHandler);
bot.hears('📚 Каталог и бронирование', catalogHandler);
bot.hears('🗓 Даты и цены', datesPriceHandler);
bot.hears('💬 Часто задаваемые вопросы', faqHandler);
bot.hears('🌟 Экскурсии на 1 день', excurses);
bot.hears('✨ Многодневные туры', tours);
bot.hears('⬅ Назад', enterHandler);
bot.hears('💰 Условия оплаты и бронирование', paymentTermsHandler);
bot.hears('📌 Информация о туре', infoHandler);
bot.hears('🖋 Даты туров', datesHandler);
bot.hears('💰 Забронировать', bookingHandler);
bot.hears('❓ Часто задаваемые вопросы', faqHandler2);
bot.action('tour', enterHandler);

//! Обработчик текстовых сообщений
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text.trim().toLowerCase();
        console.log('Получено сообщение:', text);
        
         if (/дат/i.test(text) || /цен/i.test(text)) {   //*Regular expressions
            await datesPriceHandler(ctx);}
         else if (/каталог/i.test(text) || /тур/i.test(text)) {
            await catalogHandler(ctx);}
        else if (/вопрос/i.test(text) || /спросить/i.test(text)) {
            await faqHandler(ctx);}
        else {
            await ctx.reply('Ваше сообщение получено!\n Мы уже занимаемся вашим запросом и скоро свяжемся с вами.😊\n\nПока вы можете выбрать один из вариантов в меню ниже или дождаться ответа от администратора.');
        }
    } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
    }
});

// exports.handler = async (event, context) => {
//     return handleWebhook(event); };
//! Обработчик для webhook
exports.handler = async (event, context) => {
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
