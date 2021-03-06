# Сборщик шаблонов для InSales

- Возможность переноса компонентов между проектами

- Подключение плагинов/шрифтов простым переносом файлов в папку

- Удобная работа с scss переменными

- Автопрефиксер

- Сжатие картинок

- Встроенный insales-uploader


## Установка

```
npm i
```

## Настройка

Настройка сборщика находится тут `/gulpfile.js/config`

Для работы [InSales uploader](https://github.com/VladimirIvanin/insales-uploader) нужно изменить файл `/gulpfile.js/config/uploader.json`, заполнить параметры для доступа к магазину и выставить свойство `use` в `true`.


## Gulp tasks

`gulp theme:deploy` и `gulp theme:watch` нужно запускать в отдельных терминалах или поочередно,

чтобы отправка изменений на сервер не началась до того как соберется шаблон в папку `theme`.

| Имя задачи   | Назначение                                       |
|--------------|--------------------------------------------------|
| default      | Собирает тему и запускает отслеживание изменений |
| theme:deploy | Собирает тему                                    |
| theme:watch  | Отслеживание изменений в компонентах, лэйаутах и запускает InSales uploader   |
| uploader:push| Загрузить локальную тему в тему магазина, при этом тема в магазине будет полностью перезаписана |

## Назначение директорий

| Имя директории | Назначение                                    |
|----------------|-----------------------------------------------|
| components     | Компоненеты которые будут включаться в шаблон |
| config         | Конфиги для темы                              |
| gulpfile.js    | Задачи для gulp.js                            |
| layouts        | Лэйауты для шаблона                           |
| media          | Медиа файлы для шаблона                       |
| plugins        | Js/css плагины                                |
| theme          | Директория темы                               |
| bundles        | Бандлы (css/js)                               |
| fonts          | Шрифты                                        |
| scss_import    | Переменные для scss                           |

### Структура компонента

Каждый компонент лежит в отдельной папке внутри директории components.
>**стили**

> Стили хранятся в папке scss, сборщик понимает .css и .scss файлы.

> При использовании scss, можно использовать переменные из variables_default.scss, variables.scss


>**скрипты**

>JS файлы лежат в корневой папке компонента


>**сниппеты**

>Liquid файлы лежат в корневой папке компонента


## Полезные ссылки

- [Отправка сообщений](https://github.com/VladimirIvanin/InSalesFeedback)
- [Плагин для обновления информации товара](https://github.com/VladimirIvanin/variantsModifier)
- [Избранное](https://github.com/VladimirIvanin/favorites)
- [Ранее просмотренные товары](https://github.com/VladimirIvanin/RecentlyView)
- [Определение местоположения пользователя](https://github.com/VladimirIvanin/geoManager)
- [Табы на jQuery](https://github.com/VladimirIvanin/dataTabs)