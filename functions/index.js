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

const connectDB = require('./database');  // Подключение базы
const User = require('./userModel');  // Импорт модели пользователя

// connectDB(); //* Запускаем подключение к БД1
(async () => {
    let client;
    try {
      // Подключаемся к базе данных
      client = await connectDB();
      console.log('База данных готова к работе.');
  
      // Выполняем операции с базой данных
      const db = client.db("your-database-name");
      const users = await db.collection("users").find({}).toArray();
      console.log("Пользователи:", users);
  
    } catch (error) {
      console.error('Не удалось подключиться к базе данных:', error.message);
      process.exit(1); // Завершаем приложение в случае ошибки
    } finally {
      // Закрываем соединение
      if (client) {
        await client.close();
        console.log("Соединение с MongoDB закрыто.");
      }
    }
})();

exports.handler = async (event, context) => { return handleWebhook(event, context); };   //* Вызываем обработчик webhook

//! Обработчики кнопок и старт
bot.start(greetingHandler);

bot.hears(['🔙 Назад', '📅 В главное меню'], greetingHandler);
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

//! Меню команд
bot.telegram.setMyCommands([
    { command: 'start', description: '🏠︎ В начало' },
    { command: 'catalog', description: '📚 Каталог' },
    { command: 'faq', description: '❓ Частые вопросы' }
]);

bot.command('start', (ctx) => {
    greetingHandler(ctx);
});

bot.command('catalog', (ctx) => {
    catalogHandler(ctx);
});

bot.command('faq', (ctx) => {
    faqHandler(ctx);
});

//! Обработчик текстовых сообщений
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text.trim().toLowerCase();
        console.log('Получено сообщение:', text);
    //?Regular expressions (регулярные выражения)
        if (/привет/i.test(text) || /здравствуй/i.test(text) || /меню/i.test(text)) {
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

bot.launch();