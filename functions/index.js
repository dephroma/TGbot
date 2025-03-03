const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const {
    greetingHandler,
    catalogHandler,
    datesPriceHandler,
    faqHandler
} = require('./greeting');
// const {
//     enterHandler,
//     paymentTermsHandler,
//     infoHandler,
//     bookingHandler,
//     datesHandler,
//     faqHandler2
// } = require('./booking');
const { excurses } = require('./excurses');
// const { carousel2 } = require('./carousel2');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

// Обработчик стартовой команды
bot.start(greetingHandler);

bot.hears('📚 Каталог и бронирование', catalogHandler);
bot.hears('🗓 Даты и цены', datesPriceHandler);
bot.hears('💬 Часто задаваемые вопросы', faqHandler);
bot.hears(['🔙 Назад','привет'], greetingHandler);
bot.hears('🌟 Экскурсии на 1 день', excurses);

// Обработчик текстовых сообщений
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text.trim().toLowerCase();
        console.log('Получено сообщение:', text);
        
         if (/дат/i.test(text) || /цен/i.test(text)) {
            await datesPriceHandler(ctx);}
         else if (/каталог/i.test(text) || /туры/i.test(text)) {
            await catalogHandler(ctx);}
        else if (/вопрос/i.test(text) || /спросить/i.test(text)) {
            await faqHandler(ctx);}

        // } else if (text === '✨ многодневные туры') {
        //     await carousel2(ctx);
        // } else if (text === '🗓 даты и цены') {
        //     await datesPriceHandler(ctx);
        // } else if (text === '💬 часто задаваемые вопросы') {
        //     await faqHandler(ctx);
        // } else if (text === '📌 информация о туре') {
        //     await infoHandler(ctx);
        // } else if (text === '💵 забронировать') {
        //     await bookingHandler(ctx);
        // } else if (text === '📅 даты туров') {
        //     await datesHandler(ctx);
        // } else if (text === '❓ часто задаваемые вопросы') {
        //     await faqHandler2(ctx);
        else {
            await ctx.reply('Я не понял ваш запрос. Выберите вариант из меню или дождитесь ответа администратора.');
        }
    } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
    }
});

// Обработчик для webhook
exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);  // Получаем тело запроса
    try {
        console.log('Received webhook event:', body);  // Логируем событие
        await bot.handleUpdate(body);  // Обрабатываем обновление через Telegraf
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Webhook processed successfully" })
        };
    } catch (error) {
        console.error('Error handling webhook:', error);  // Логируем ошибку
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error handling webhook' })
        };
    }
};
