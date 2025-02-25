const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
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

bot.hears('📚 Каталог и бронирование', async (ctx) => {
    // Обработчик для 'Каталог и бронирование'
});

bot.hears('🗓 Даты и цены', async (ctx) => {
    // Обработчик для 'Даты и цены'
});

bot.on('text', async (ctx) => {
    // Обработчик сообщений
});

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    try {
        console.log('Received webhook event:', body);
        await bot.handleUpdate(body);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Webhook processed successfully" })
        };
    } catch (error) {
        console.error('Error handling webhook:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error handling webhook' })
        };
    }
};

// // Обработчик сообщений
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

// // Останавливаем бота при получении сигнала SIGINT и SIGTERM
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));