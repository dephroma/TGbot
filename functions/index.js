const { Telegraf, Markup } = require('telegraf');
const express = require('express');
require('dotenv').config();

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

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

const app = express();
app.use(express.json());

exports.handler = async (event) => {
    return {
      statusCode: 200,
      body: "Hello, World!",
    };
  };

// Настройка webhook для получения обновлений
app.post(`/${BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// Устанавливаем webhook для бота на Netlify
app.listen(process.env.PORT || 3000, async () => {
    console.log('Сервер работает на порту 3000');
    try {
        await bot.telegram.setWebhook('https://tgeagle.netlify.app/.netlify/functions/index');
        console.log('Webhook успешно настроен!');
    } catch (error) {
        console.error('Ошибка при установке webhook:', error);
    }
});

// Обработчик стартовой команды
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

// Останавливаем бота при получении сигнала SIGINT и SIGTERM
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));