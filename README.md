## Домашнее задание «Адаптивная вёрстка»
[Демо](https://nskye.github.io/shri-18-smarthouse-task-1/)  
Карточки самостоятельно перестраиваются за счет следующих правил.
```styl
grid-template-columns repeat(auto-fit, minmax(153px, 1fr))
grid-auto-rows min-content
```
Это избавляет нас от явного определения количества столбцов на каждом брейкпоинте. 
