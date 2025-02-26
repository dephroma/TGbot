const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const {
    // greetingHandler,
    catalogHandler,
    datesPriceHandler
    // faqHandler
} = require('./greeting');
// const {
//     enterHandler,
//     paymentTermsHandler,
//     infoHandler,
//     bookingHandler,
//     datesHandler,
//     faqHandler2
// } = require('./booking');
// const { carousel1 } = require('./carousel1');
// const { carousel2 } = require('./carousel2');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

// Обработчик стартовой команды
bot.start((ctx) => {
    // ctx.reply('Обновляю клавиатуру...', Markup.removeKeyboard()); // Убираем старую клаву
    ctx.replyWithPhoto('https://vk.com/photo-226855768_457239045', {
        caption: 'Салам алейкум, дорогой путешественник!👋\n\nЯ — Тимур (от тюрк. "железо"), ваш виртуальный гид.🤖\n' +
            'Помогу вам выбрать идеальный тур, отвечу на вопросы и оформлю заявку.\n\nЧем могу помочь?',
        reply_markup: Markup.keyboard([
            ['📚 Каталог и бронирование'],
            ['🗓 Даты и цены'],
            ['💬 Часто задаваемые вопросы']
        ]).resize()
    });
});

// Обработчики команд
bot.hears('Привет', '/start', greetingHandler);
bot.hears('📚 Каталог и бронирование', catalogHandler);
bot.hears('🗓 Даты и цены', datesPriceHandler);
// bot.hears('💬 Часто задаваемые вопросы', faqHandler);

// Обработчик текстовых сообщений
// bot.on('text', async (ctx) => {
//     try {
//         const text = ctx.message.text.trim().toLowerCase();
//         console.log('Получено сообщение:', text);

//         if (text === '📚 каталог и бронирование') {
//             await catalogHandler(ctx);
//         } else if (text === '🌟 экскурсии на 1 день') {
//             await carousel1(ctx);
//         } else if (text === '✨ многодневные туры') {
//             await carousel2(ctx);
//         } else if (text === '🗓 даты и цены') {
//             await datesPriceHandler(ctx);
//         } else if (text === '💬 часто задаваемые вопросы') {
//             await faqHandler(ctx);
//         } else if (['знакомство', '⬅️ назад', '🛡 перейти к бронированию'].includes(text)) {
//             await enterHandler(ctx);
//         } else if (text === '💰 условия оплаты и бронирование') {
//             await paymentTermsHandler(ctx);
//         } else if (text === '📌 информация о туре') {
//             await infoHandler(ctx);
//         } else if (text === '💵 забронировать') {
//             await bookingHandler(ctx);
//         } else if (text === '📅 даты туров') {
//             await datesHandler(ctx);
//         } else if (text === '❓ часто задаваемые вопросы') {
//             await faqHandler2(ctx);
//         } else {
//             await ctx.reply('Я не понял ваш запрос. Выберите вариант из меню или дождитесь ответа администратора.');
//         }
//     } catch (error) {
//         console.error('Ошибка при обработке сообщения:', error);
//     }
// });

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
