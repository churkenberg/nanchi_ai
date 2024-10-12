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

// анимация нейронов

const canvas = document.getElementById('neuronCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Обновляем размеры при загрузке и изменении окна
window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Инициализация размеров сразу

const mouse = {
    x: null,
    y: null
};

const neurons = [];
const numNeurons = 35;

class Neuron {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        const distX = this.x - mouse.x;
        const distY = this.y - mouse.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < 150) {
            if (this.x < mouse.x) this.x -= 2;
            if (this.x > mouse.x) this.x += 2;
            if (this.y < mouse.y) this.y -= 2;
            if (this.y > mouse.y) this.y += 2;
        }

        this.draw();
    }
}

function init() {
    neurons.length = 0;
    for (let i = 0; i < numNeurons; i++) {
        const radius = 3;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        neurons.push(new Neuron(x, y, radius));
    }
}

function connectNeurons() {
    for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
            const distX = neurons[i].x - neurons[j].x;
            const distY = neurons[i].y - neurons[j].y;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 150) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(neurons[i].x, neurons[i].y);
                ctx.lineTo(neurons[j].x, neurons[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    neurons.forEach(neuron => neuron.update());
    connectNeurons();
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Инициализация и запуск
init();
animate();

// блок с моделями

document.addEventListener("DOMContentLoaded", function() {
    const models = [
        { name: "Model 1", description: "High-performance model for classification" },
        { name: "Model 2", description: "Efficient NLP model" },
        { name: "Model 3", description: "Robust vision model" }
    ];

    const modelsContainer = document.getElementById("models-container");

    models.forEach(model => {
        const modelBlock = document.createElement("div");
        modelBlock.classList.add("model-block");

        modelBlock.innerHTML = `
            <h4>${model.name}</h4>
            <p>${model.description}</p>
        `;

        modelsContainer.appendChild(modelBlock);
    });
});

// функция логина пользователя
function toggleLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.style.display = loginForm.style.display === 'block' ? 'none' : 'block';
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        const data = await response.json();
        alert('Login successful');
        // Save the token and update UI accordingly
    } else {
        alert('Login failed');
    }
}