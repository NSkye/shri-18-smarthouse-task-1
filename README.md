# Домашние задания для Школы Разработки Интерфейсов 2018/2
[Домашнее задание «Адаптивная вёрстка»](#task1)  
[Домашнее задание «Работа с сенсорным пользовательским вводом»](#task2)  
[Домашнее задание «Мультимедиа»](#task3)

## <a name='task1'></a> Домашнее задание «Адаптивная вёрстка»
### [Демо](https://nskye.github.io/shri-18-smarthouse-task-1/)  
К заданию относится весь код в репозитории, кроме Роутера и любых папок в директории `./src/components/`, они относятся к уже последующим заданиям.  
### Запуск
Установка: `npm i`  
Запуск dev server: `npm start`  
### Общий принцип
Карточки самостоятельно перестраиваются за счет следующих правил.
```styl
grid-template-columns repeat(auto-fit, minmax(153px, 1fr))
grid-auto-rows min-content
```
Это избавляет нас от явного определения количества столбцов на каждом брейкпоинте. 
### Использование Vue
Используется в основном в качестве шаблонизатора. Для чистоты эксперимента не был использован ряд его возможностей (таких как тег `<transition>`, директива `v-show` и т.д.). Возможности, которые были использованы и из-за которых, он, собственно, и был выбран:
1. Single File Components
1. Директива `v-if` для кондишенл рендеринга
1. Директива `v-for` для рендеринга списков
1. VueRouter для размещения других заданий

## <a name='task2'></a> Домашнее задание «Работа с сенсорным пользовательским вводом»
### [Демо](https://nskye.github.io/shri-18-smarthouse-task-1/#/task-2)
### [Source](https://github.com/NSkye/shri-18-smarthouse-task-1/blob/master/src/components/task-2/SensorInput.vue)
### Запуск
Установка: `npm i`  
Запуск dev server: `npm start`  
Роут: `/#/task-2`
### Что есть
1. Обзор на 360 градусов
1. Поинтер продолжает отслеживаться и за пределами элемента (и окна браузера тоже)
1. Зум - классический жест пальцами для него
1. Яркость - поставить два пальца на экран и повернуть
1. Вращение камеры - свайп одним пальцам
### Общий принцип
1. При `pointerdown` объект события добавляется в массив `pEvents` и выполняется setPointerCapture по его id
1. При `pointermove` в массиве `pEvents` находится и заменяется ивент с таким же pointerId, а также если в этом же массиве только 1 ивент, то вызывается метод `moveCamera`, то вызывается метод `do`, который объединяет `doPinch` и `doRotate`
1. При `pointerUp` и `pointerCancel` производится ивента из массива `pEvents` и вызывается `releasePointerCapture`  

Все обработчики действий (moveCamera, doPinch, doZoom) получают историю сохраненных ивентов через метод pointerEvent'а getCoalescedEvents, на основе которой они рассчитывают delta контроллируемого ими значения.  
```javascript
const [ e1, e2 ] = this.pEvents
const [ e1Start, e1End ] = e1.getCoalescedEvents()
const [ e2Start, e2End ] = e2.getCoalescedEvents()
```

У методов doPinch и doZoom есть мертвая зона. Если модуль дельты меньше мертвой зоны, то никаких изменений не происходит, это сделано, чтобы они не путались друг с другом.  
```javascript
if (Math.abs(delta) > deadzone) {
  this.brightness = (nextBrightness < 0) ? 0 : ((nextBrightness > 400) ? 400 : nextBrightness)
}
/* ... */
if (Math.abs(delta) > deadzone) {
  this.zoom = (nextZoom < 1) ? 1 : ((nextZoom > 5) ? 5 : nextZoom)
}
```

doZoom определяет новое значение zooma путем нахождения разницы в расстоянии между поинтерами.  
```javascript
const start = Math.pow(Math.pow(e2Start.clientX - e1Start.clientX, 2) + Math.pow(e2Start.clientY - e1Start.clientY, 2), 1 / 2)
const end = Math.pow(Math.pow(e2End.clientX - e1End.clientX, 2) + Math.pow(e2End.clientY - e1End.clientY, 2), 1 / 2)
const delta = (end - start) / 100
const nextZoom = delta + this.zoom
```

doPinch определяет новое значение путем нахождения разницы между арктангенсами угла образованного векторами из поинтеров на плошлом ивенте и на текущем.  
```javascript
const start = Math.atan2((e2Start.clientY - e1Start.clientY), (e2Start.clientX - e1Start.clientX))
const end = Math.atan2((e2End.clientY - e1End.clientY), (e2End.clientX - e1End.clientX))
const delta = (end - start) * 50
const nextBrightness = delta + this.brightness
```
## <a name='task3'></a> Домашнее задание «Мультимедиа»
### Запуск
1. Склонировать [репозиторий с потоками](https://github.com/mad-gooze/shri-2018-2-multimedia-homework/blob/master/streams/README.md)
1. Внутри склонированного репозитория `npm i`, затем `npm start`
1. Склонировать этот репозиторий
1. Внутри этого репозитория `npm i`, затем `npm start`
1. Автоматически запустится dev-server на адресе [http://0.0.0.0:3000](http://0.0.0.0:3000)
1. Для того чтоб просмотреть задание нужно лишь перейти на страницу [http://0.0.0.0:3000/#/task-3](http://0.0.0.0:3000/#/task-3)
### [Source](https://github.com/NSkye/shri-18-smarthouse-task-1/tree/master/src/components/task-3)
Весь код, связанный с заданием находится в каталоге [`./src/components/task-3`](https://github.com/NSkye/shri-18-smarthouse-task-1/tree/master/src/components/task-3), где [`Cameras.vue`](https://github.com/NSkye/shri-18-smarthouse-task-1/blob/master/src/components/task-3/Cameras.vue) -- компонент со всеми камерами, а [FeedContainer.vue](https://github.com/NSkye/shri-18-smarthouse-task-1/blob/master/src/components/task-3/FeedContainer.vue) -- компонент для каждой отдельной камеры

### Общий принцип
#### Реализованный функционал
1. 4 видеопревью, с разворачиванием как указано в задании, кнопка для возврата назад
1. Фильтры для видео
1. Анализатор звука  
1. Анализатор уровня освещенности
1. Готовится: датчик движения

Анимация разворачивания камер осуществляется за счет Web Animations API и применения через него свойства transform, в котором используются функции scale() и translate(). Значения для них рассчитываются заранее, в зависимости от того что происходит на экране. При использовании десктопной версии, видео развернется на размер всего и расположится визуально внутри его границ. При использовании мобильной версии, видео развернется на ширину окна и расположится по его центру. Получение уровня громкости производится с помощью Audio Context API. Посмотреть можно в методе processAudio `./src/components/task-3/process-audio.js`. Фильтры накладываются с помощью свойства CSS Filter. Есть задатки на будущую адаптивность (видео перестраиваются в зависимости от ширины экрана), задатки только потому, что надо бы ещё как-то ограничить возможность пользователю кликать на другие видео и скроллить страницу, когда на мобильной версии одно из видео всё ещё развернуто и далее по мелочам.
