// Функция для установки темы
function setTheme(theme) {
    document.body.className = theme; // Устанавливает класс темы на body
    closeMenu(); // Закрывает меню после выбора
}

// Открытие/закрытие бургер-меню
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.onclick = function() {
    menu.classList.toggle('show'); // Переключает видимость меню
};

function closeMenu() {
    menu.classList.remove('show'); // Закрывает меню
}