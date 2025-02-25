const { Markup } = require('telegraf');

// Создаем кнопки
const createButton = (label, url = null, callbackData = null) => {
    const button = { text: label };
    if (url) {
        button.url = url;
    }
    if (callbackData) {
        button.callback_data = callbackData;
    }
    return button;
};

const createKeyboard = () => {
    const tours = [
        {
            title: '"Край мечты" 3 дня',
            description: 'Тур, в котором вы сможете увидеть главные достопримечательности.',
            link: 'https://vk.com/market/product/kray-mechty-3-dnya-vse-vklyucheno-28295020-9825947',
            buttonLabel: '👉 Узнать больше✨',
            buttonCallback: 'tour_1'
        },
        {
            title: '"Весь Дагестан" 5 дней',
            description: 'Увлекательный тур, который позволит погрузиться в атмосферу приключений.',
            link: 'https://vk.com/market/product/ves-dagestan-5-dney-vse-vklyucheno-28295020-4189351',
            buttonLabel: '👉 Узнать больше✨',
            buttonCallback: 'tour_2'
        },
        {
            title: '"Дагестанский вояж"',
            description: 'Приключение, длиной в неделю. Откройте для себя все цвета Дагестана!',
            link: 'https://vk.com/market/product/quotdagestanskiy-voyazhquot-7-dney-vse-vklyucheno-28295020-9906226',
            buttonLabel: '👉 Узнать больше✨',
            buttonCallback: 'tour_3'
        }
    ];

    const keyboard = tours.map(tour => [
        {
            text: `${tour.title} - ${tour.description}`,
            callback_data: tour.buttonCallback
        },
        createButton(tour.buttonLabel, tour.link)
    ]);

    keyboard.push([
        createButton('🛑 Назад', null, 'back')
    ]);

    return keyboard;
};

const carousel2 = (bot) => {
    bot.start((ctx) => {
    ctx.reply('Выберите ваш тур! ✨\n\n' +
        'Мы подготовили маршруты, которые позволят вам полностью погрузиться в красоту и культуру Дагестана.\n' +
        'Откройте подходящий тур, чтобы узнать подробности и нажмите кнопку бронирования (бронировать/написать/связаться).\n' +
        'Хотите тур на другое количество дней? Напишите нам!\n\n' +
        '👇 Ниже вы найдёте наш каталог многодневных туров:', {
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// Обработчик коллбеков
bot.on('callback_query', (ctx) => {
    const callbackData = ctx.callbackQuery.data;
    
    if (callbackData === 'back') {
        const keyboard = createKeyboard();
        ctx.reply('Выберите ваш тур! ✨\n\n' +
            'Мы подготовили маршруты, которые позволят вам полностью погрузиться в красоту и культуру Дагестана.\n' +
            'Откройте подходящий тур, чтобы узнать подробности и нажмите кнопку бронирования (бронировать/написать/связаться).\n' +
            'Хотите тур на другое количество дней? Напишите нам!\n\n' +
            '👇 Ниже вы найдёте наш каталог многодневных туров:', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else if (callbackData.startsWith('tour_')) {
        // Здесь можно добавить логику для обработки туров (например, показать информацию или предложить забронировать)
        ctx.answerCallbackQuery();
        ctx.reply('Информация о туре будет отображена здесь.');
    }
});
};

module.exports = { carousel2 };
