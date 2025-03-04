const { Markup } = require('telegraf');

// // Создаем кнопки
// const createButton = (label, url = null, callbackData = null) => {
//     const button = { text: label };
//     if (url) {
//         button.url = url;
//     }
//     if (callbackData) {
//         button.callback_data = callbackData;
//     }
//     return button;
// };

const excurses = async (ctx) => {
    try { await ctx.replyWithPhoto('https://vk.com/photo-226855768_457239051',
        { caption: 'Тур по дагестану'}
    );
    } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
        await ctx.reply('Приветственное фото временно недоступно, но это не помешает нам начать! 😊');
        }
    };

    

    // const tours = [
    //     {
    //         title: 'Знакомство с Дагестаном',
    //         description: 'Визитная карточка Дагестана. Сюда едем первым делом!',
    //         link: 'https://vk.com/market/product/znakomstvo-s-dagestanom-gory-barkhan-kanion-28295020-9825928',
    //         buttonLabel: '👉 Узнать больше✨',
    //         buttonCallback: 'tour_1'
    //     },
    //     {
    //         title: 'Древний Дербент',
    //         description: 'Самый древний город России. Прикоснитесь к античной истории!',
    //         link: 'https://vk.com/market/product/drevniy-derbent-ves-derbent-fontany-lun-28295020-9863669',
    //         buttonLabel: '👉 Узнать больше✨',
    //         buttonCallback: 'tour_2'
    //     },
    //     {
    //         title: '5 жемчужин Дагестана',
    //         description: 'Эти прекрасные места спрятаны в самом сердце Дагестана. Они ждут ваших глаз!',
    //         link: 'https://vk.com/market/product/5-zhemchuzhin-dagestana-aul-prizrak-podzemny-vodopad-karstovy-proval-terrasy-28295020-9863569',
    //         buttonLabel: '👉 Узнать больше✨',
    //         buttonCallback: 'tour_3'
    //     }
    // ];

    // const keyboard = tours.map(tour => [
    //     {
    //         text: `${tour.title} - ${tour.description}`,
    //         callback_data: tour.buttonCallback
    //     },
    //     createButton(tour.buttonLabel, tour.link)
    // ]);

    // keyboard.push([
    //     createButton('🛑 Назад', null, 'back')
    // ]);

    // return keyboard;
// };

    // // Обработчик команды '/start'
    // const carousel1 = (bot) => {
    //     bot.start((ctx) => {
    //         const keyboard = createKeyboard();
    //         ctx.reply('Выберите вашу экскурсию! 🌟\n\n' +
    //             'Мы подготовили для вас маршруты, которые позволят за один день увидеть самое лучшее, что может предложить Дагестан.\n\n' +
    //             'Откройте подходящую экскурсию, чтобы узнать подробности, далее нажмите кнопку бронирования (бронировать/написать/связаться).\n\n' +
    //             '👇 Вот наш каталог экскурсий:', {
    //             reply_markup: {
    //                 inline_keyboard: keyboard
    //             }
    //         });
    //     });

    // // Обработчик коллбеков
    // bot.on('callback_query', (ctx) => {
    //     const callbackData = ctx.callbackQuery.data;
        
    //     if (callbackData === 'back') {
    //         const keyboard = createKeyboard();
    //         ctx.reply('Выберите вашу экскурсию! 🌟\n\n' +
    //             'Мы подготовили для вас маршруты, которые позволят за один день увидеть самое лучшее, что может предложить Дагестан.\n\n' +
    //             'Откройте подходящую экскурсию, чтобы узнать подробности, далее нажмите кнопку бронирования (бронировать/написать/связаться).\n\n' +
    //             '👇 Вот наш каталог экскурсий:', {
    //             reply_markup: {
    //                 inline_keyboard: keyboard
    //             }
    //         });
    //     } else if (callbackData.startsWith('tour_')) {
    //         // Здесь можно добавить логику для обработки туров (например, показать информацию или предложить забронировать)
    //         ctx.answerCallbackQuery();
    //         ctx.reply('Информация о туре будет отображена здесь.');
    //     }
    // });
    // };

module.exports = { excurses };