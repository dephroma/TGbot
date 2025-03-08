const { Markup } = require('telegraf');

//!  Обработка  ' Записаться \ ⬅ Назад '

const enterHandler = async (ctx) => {
    await ctx.reply('Поздравляем вас с выбором экскурсии! 🚀\n\n' +
        'Чтобы продолжить процесс бронирования и получить дополнительную информацию, вы можете воспользоваться кнопками ниже.\n\n' +
        'Если у вас есть вопросы, не стесняйтесь обращаться к нам. Мы рады помочь! 😉',
        Markup.keyboard([
            ['💰 Условия оплаты и бронирование'],
            ['📌 Информация о туре'],
            ['🖋 Даты туров']
        ])
        .resize());
};

//! Обработка '💰 Условия оплаты и бронирование'

const paymentTermsHandler = async (ctx) => {
    await ctx.reply('Благодарим вас за интерес к нашим туристическим услугам!🫶\n\n' +
        'Для обеспечения надежности вашей брони и подготовки вашего путешествия, мы вводим систему предоплаты в размере 10% от общей стоимости экскурсии.\n\n' +
        'Эта предоплата необходима для того, чтобы гарантировать ваше участие в выбранной программе и избежать случаев, когда клиент решает отказаться от поездки уже после того, как были забронированы машины, гостиницы, места в ресторане, а также приобретены билеты на мероприятия. Путешествия требуют планирования, и ваша предоплата поможет нам организовать все нужные аспекты вашего отдыха.');

    await new Promise(resolve => setTimeout(resolve, 1000)); //* Задержка на 1 секунду

    await ctx.reply('Мы готовы предоставить вам скидку 10%, если ваша группа состоит из 4 человек и более.\n\n' +
        'Обратите внимание - если вы планируете поездку вдвоём или в одиночку, и нужная группа не наберётся (например, не сезон) - стоимость может измениться, либо вам предложат выбрать другой день. Цена всегда закрепляется заранее, до поездки.\n\n' +
        'Если у вас есть друзья или знакомые, которые тоже любят путешествия, подумайте о том, чтобы отправиться в поездку вместе. Наша команда всегда готова помочь вам организовать идеальный отдых в хорошей компании!\n\n' +
        'Так же можем организовать эту поездку в виде частной экскурсии (малая группа), условия обсуждаются индивидуально.', Markup.keyboard([
        ['💰 Забронировать'],
        ['⬅ Назад']
    ]).resize());
};

//! Обработка '📌 Информация о туре'

const infoHandler = async (ctx) => {
    try {
        //? Отправка фото с текстом и клавиатурой в одном сообщении
        await ctx.replyWithPhoto('https://t.me/DagEagleTour/14', {
            caption: 'Вся информация об экскурсиях представлена по ссылке ниже.👇\n' +
                     '[Все туры в нашей группе ВК](https://vk.com/@dageagletour)' +
                     'В статьях вы найдете детали маршрутов, программы и важные нюансы.\n' +
                     'Пожалуйста, ознакомьтесь с материалами. Если появятся вопросы, мы всегда на связи!\n\n',
            reply_markup: {
                keyboard: [
                    [{ text: '💰 Условия оплаты и бронирование' }],
                    [{ text: '❓ Часто задаваемые вопросы' }],
                    [{ text: '⬅ Назад' }],
                ],
                resize_keyboard: true, //* Уменьшает клавиатуру под размер экрана
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
        await ctx.reply('Приветственное фото временно недоступно, но это не помешает нам начать! 😊');
    }
};

//! Обработка '🖋 Даты туров'

const datesHandler = async (ctx) => {
    try {
        await ctx.replyWithPhoto('https://t.me/DagEagleTour/15', {
            caption: 'Здесь вы найдете ссылку с расписанием экскурсий/туров.👇\n\n' +
                     'Если ссылки нет, напишите желаемую дату тура при бронировании.\n\n' +
                     'Группы из 4+ человек могут выбрать любую удобную дату и путешествовать своей компанией.', 
                reply_markup: {
                keyboard: [
                    [{ text: '📌 Информация о туре' }],
                    [{ text: '💰 Забронировать' }],
                    [{ text: '⬅ Назад' }],
                ],
                resize_keyboard: true,
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
        await ctx.reply('Приветственное фото временно недоступно, но это не помешает нам начать! 😊');
    }
};

//! Обработка '💰 Забронировать'

const bookingHandler = async (ctx) => {
    await ctx.reply('Спасибо, ваша заявка на бронь успешно принята! 🤝\n\n' +
        'Скоро с вами свяжется наш менеджер для уточнения деталей. Для обработки запроса осталось написать нам:\n\n' +
        '1. Ваше имя и контактный номер телефона\n' +
        '2. Желаемую дату тура\n' +
        '3. Количество человек (сколько поедет детей и их возраст)\n\n' +
        'Советуем ознакомиться с разделом «❓Часто задаваемые вопросы❓». Желаем незабываемых впечатлений в вашем путешествии! 🦅',
        Markup.keyboard([
            ['❓ Часто задаваемые вопросы'],
            ['📅 В главное меню'],
            ['⬅ Назад']
        ])
        .resize());
};

//! Обработка '❓ Часто задаваемые вопросы'

// const faqHandler2 = async (ctx) => {
//     try { await ctx.replyWithPhoto('https://t.me/DagEagleTour/17');
//     } catch (error) {
//         console.error('Ошибка при загрузке фото:', error);
//         await ctx.reply('Приветственное фото временно недоступно, но это не помешает нам начать! 😊');
//     }

//     //? Markdown для кликабельной ссылки
//     await ctx.replyWithMarkdown(
//         '❓ Часто задаваемые вопросы (FAQ)💬\n\n' +
//         'Для вашего удобства мы собрали все вопросы в одной статье:\n' +
//         '[Читать статью](https://telegra.ph/CHastye-voprosy-FAQ-03-03).', //* Markdown
//         Markup.keyboard([
//             ['📚 Каталог и бронирование'],
//             ['🔙 Назад']
//         ]).resize()
//     );
// };

const faqHandler2 = async (ctx) => {
    try {
        //? Отправляем фото с текстом и Markdown-разметкой
        await ctx.replyWithPhoto('https://t.me/DagEagleTour/17', {
            caption: '❓ *Часто задаваемые вопросы (FAQ)* 💬\n\n' +
                     'Для вашего удобства мы собрали все вопросы в одной статье:\n' +
                     '[Читать статью](https://telegra.ph/CHastye-voprosy-FAQ-03-03).', //* Markdown
            parse_mode: 'Markdown', //* Включаем Markdown-разметку
            reply_markup: Markup.keyboard([
                ['📚 Каталог и бронирование'],
                ['🔙 Назад']
            ]).resize()
        });
    } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
        await ctx.reply('Приветственное фото временно недоступно, но это не помешает нам начать! 😊');
    }
};


module.exports = { enterHandler, paymentTermsHandler, infoHandler, datesHandler, bookingHandler, faqHandler2 };
