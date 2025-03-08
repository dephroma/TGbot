const { Markup } = require('telegraf');

// //! Приветственное сообщение и меню \ 🔙 Назад

const greetingHandler = async (ctx) => {
    try {
        // Отправка фото с текстом и клавиатурой в одном сообщении
        await ctx.replyWithPhoto('https://t.me/DagEagleTour/7', {
            caption: 'Салам алейкум, дорогой путешественник!👋\n\n' +
                     'Я — Тимур (от тюрк. "железо"), ваш виртуальный гид.🤖\n' +
                     'Помогу вам выбрать идеальный тур, отвечу на вопросы и оформлю заявку.\n\n' +
                     'Чем могу помочь?',
            reply_markup: {
                keyboard: [
                    [{ text: '📚 Каталог и бронирование' }],
                    [{ text: '🗓 Даты и цены' }],
                    [{ text: '💬 Часто задаваемые вопросы' }],
                ],
                resize_keyboard: true, //* Уменьшает клавиатуру под размер экрана
                // one_time_keyboard: true, //* Клавиатура исчезает после первого выбора
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
        await ctx.reply('Приветственное фото временно недоступно, но это не помешает нам начать! 😊');
    }
};

// //! 📚 Каталог и бронирование
const catalogHandler = (ctx) => {
    ctx.reply('Ознакомьтесь с нашим каталогом туров. У нас есть:\n\n' +
         '🌟 Экскурсии на 1 день — отличная возможность подарить себе яркие впечатления и познакомиться с республикой за один день.\n' +
         '✨ Многодневные туры — для тех, кто хочет отдохнуть душой, насладиться природой и открыть для себя весь колорит региона.', Markup.keyboard([
            ['🌟 Экскурсии на 1 день'],
            ['✨ Многодневные туры'],
            ['🔙 Назад']
    ]).resize());
};
// //! 🗓 Даты и цены
const datesPriceHandler = async (ctx) => {
    await ctx.reply('Здесь будет ссылка на актуальные даты поездок.\n\n' +
         'Если ссылки в этом месяце нет, напишите желаемую дату тура при бронировании.\n\n' +
         'Если ваша группа состоит из 4 человек или больше, вы сможете выбрать любую удобную дату тура и путешествовать только своей компанией. Ждём вас в захватывающем путешествии!', Markup.keyboard([
            ['🌟 Экскурсии на 1 день'],
            ['✨ Многодневные туры'],
            ['🔙 Назад']
        ])
        .resize());
};
// //! 🗓 FAQ
const faqHandler = async (ctx) => {
    try { await ctx.replyWithPhoto('https://t.me/DagEagleTour/17');
    } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
        await ctx.reply('Приветственное фото временно недоступно, но это не помешает нам начать! 😊');
    }

    //? Markdown для кликабельной ссылки
    await ctx.replyWithMarkdown(
        '❓Часто задаваемые вопросы (FAQ)💬\n\n' +
        'Для вашего удобства мы собрали все вопросы в одной статье:\n' +
        '[Читать статью](https://telegra.ph/CHastye-voprosy-FAQ-03-03).',
        Markup.keyboard([
            ['📚 Каталог и бронирование'],
            ['🔙 Назад']
        ]).resize()
    );
};

module.exports = { greetingHandler, catalogHandler, datesPriceHandler, faqHandler };