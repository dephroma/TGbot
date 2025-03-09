const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const { bot, handleWebhook } = require('./webhookHandler');

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


exports.handler = async (event, context) => { return handleWebhook(event, context); };   //* Вызываем обработчик webhook

//! Обработчики кнопок и старт
bot.start(greetingHandler);

// bot.hears(['🔙 Назад', '📅 В главное меню'], greetingHandler);
// bot.hears('📚 Каталог и бронирование', catalogHandler);
// bot.hears('🗓 Даты и цены', datesPriceHandler);
// bot.hears('💬 Часто задаваемые вопросы', faqHandler);
// bot.hears('🌟 Экскурсии на 1 день', excurses);
// bot.hears('✨ Многодневные туры', tours);
// bot.hears('⬅ Назад', enterHandler);
// bot.hears('💰 Условия оплаты и бронирование', paymentTermsHandler);
// bot.hears('📌 Информация о туре', infoHandler);
// bot.hears('🖋 Даты туров', datesHandler);
// bot.hears('💰 Забронировать', bookingHandler);
// bot.hears('❓ Часто задаваемые вопросы', faqHandler2);

//* Объект с текстами и соответствующими обработчиками
const triggers = {
    // '🔙 Назад': greetingHandler,
    // '📅 В главное меню': greetingHandler,
    '🔙 Назад, 📅 В главное меню': 'greetingHandler',
    '📚 Каталог и бронирование': catalogHandler,
    '🗓 Даты и цены': datesPriceHandler,
    '💬 Часто задаваемые вопросы': faqHandler,
    '🌟 Экскурсии на 1 день': excurses,
    '✨ Многодневные туры': tours,
    '⬅ Назад': enterHandler,
    '💰 Условия оплаты и бронирование': paymentTermsHandler,
    '📌 Информация о туре': infoHandler,
    '🖋 Даты туров': datesHandler,
    '💰 Забронировать': bookingHandler,
    '❓ Часто задаваемые вопросы': faqHandler2
};

//* Привязываем все обработчики с помощью цикла
for (const [text, handler] of Object.entries(triggers)) {
    bot.hears(text, handler);
}

bot.action('tour', enterHandler);

//! Меню команд
bot.telegram.setMyCommands([
    { command: 'start', description: 'В начало' },
    { command: 'catalog', description: 'Каталог' },
    { command: 'faq', description: 'Частые вопросы' }
]);


//! Обработчик текстовых сообщений
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text.trim().toLowerCase();
        console.log('Получено сообщение:', text);
    //?Regular expressions (регулярные выражения)
        if (/привет/i.test(text) || /здравствуй/i.test(text)) {
            await greetingHandler(ctx);}
        else if (/дат/i.test(text) || /цен/i.test(text)) {
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