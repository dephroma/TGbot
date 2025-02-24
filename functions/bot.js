require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const {
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
const { carousel1 } = require('./carousel1');
const { carousel2 } = require('./carousel2');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Главное меню
// const mainMenu = Markup.keyboard([
//     ['📚 Каталог и бронирование', '🗓 Даты и цены'],
//     ['💬 Часто задаваемые вопросы', '⬅️ Назад']
// ]).resize();

// // Обработчик команды /start
// bot.start(async (ctx) => {
//     await ctx.reply('Салам, вацок! Выбери действие:', mainMenu);
// });

bot.start((ctx) => {
    ctx.replyWithPhoto('https://vk.com/photo-226855768_457239045');
    ctx.reply(
        'Саламм алейкум, дорогой путешественник!👋\n\nЯ — Тимур (от тюрк. \"железо\"), ваш виртуальный гид.🤖\n' + 
        'Помогу вам выбрать идеальный тур, отвечу на вопросы и оформлю заявку.\n\nЧем могу помочь?',
        Markup.keyboard([
            ['📚 Каталог и бронирование'],
            ['🗓 Даты и цены'],
            ['💬 Часто задаваемые вопросы']
        ]).resize()
    );
});

bot.hears('📚 Каталог и бронирование', catalogHandler);
bot.hears('🗓 Даты и цены', datesPriceHandler);

// Обработчик сообщений
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text.trim().toLowerCase();
        console.log('Получено сообщение:', text);

         if (text === '📚 каталог и бронирование') {
            await catalogHandler(ctx);
        } else if (text === '🌟 экскурсии на 1 день') {
            await carousel1(ctx);
        } else if (text === '✨ многодневные туры') {
            await carousel2(ctx);
        } else if (text === '🗓 даты и цены') {
            await datesPriceHandler(ctx);
        } else if (text === '💬 часто задаваемые вопросы') {
            await faqHandler(ctx);
        } else if (['знакомство', '⬅️ назад', '🛡 перейти к бронированию'].includes(text)) {
            await enterHandler(ctx);
        } else if (text === '💰 условия оплаты и бронирование') {
            await paymentTermsHandler(ctx);
        } else if (text === '📌 информация о туре') {
            await infoHandler(ctx);
        } else if (text === '💵 забронировать') {
            await bookingHandler(ctx);
        } else if (text === '📅 даты туров') {
            await datesHandler(ctx);
        } else if (text === '❓ часто задаваемые вопросы') {
            await faqHandler2(ctx);
        } else {
            await ctx.reply('Я не понял ваш запрос. Выберите вариант из меню или дождитесь ответа администратора.');
        }
    } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
    }
});

bot.launch();
console.log('🤖 Бот для Telegram запущен!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));