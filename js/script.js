
const colors = [
    "#007BFF",
    "#FF5733",
    "#28A745",
    "#FFC107",
    "#6F42C1",
    "#17A2B8",
    "#DC3545",
    "#FF851B",
    "#6610F2",
    "#20C997",
    "#343A40",
];

const options = [
    {
        number: 1,
        text: '10% de descuento en el corte'
    },
    {
        number: 2,
        text: 'Corte a mitad de precio'
    },
    {
        number: 3,
        text: 'Facial gratis'
    },
    {
        number: 4,
        text: '15% de descuento en el servicio'
    },
    {
        number: 5,
        text: 'Barba a mitad de precio'
    },
    {
        number: 6,
        text: 'Retoque de contornos'
    },
    {
        number: 7,
        text: '15% de descuento en el corte'
    },
    {
        number: 8,
        text: 'Barba con 20% de descuento'
    },
    {
        number: 9,
        text: 'Cejas a ₡500'
    }
];
const canvas = document.getElementById("rouletteCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = Math.min(width, height) / 2 - 10;
const totalNumbers = options.length;
const angleByNumber = (2 * Math.PI) / totalNumbers;
let currentRotation = 0;

const optionsRandom = shuffleArray(options);

function drawRoulette() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentRotation);
    ctx.translate(-centerX, -centerY);

    optionsRandom.forEach((option, index) => {
        const { number } = option;
        const startAngle = index * angleByNumber;
        const endAngle = startAngle + angleByNumber;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = colors[index];
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        const textAngle = startAngle + angleByNumber / 2;
        const textX = centerX + (radius / 1.5) * Math.cos(textAngle);
        const textY = centerY + (radius / 1.5) * Math.sin(textAngle);
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(number, textX, textY);
    });

    ctx.restore();
}

function spinRoulette() {
    const spinTime = 3000;
    const minSpins = 3;
    const maxSpins = 10;
    const randomSpins = Math.random() * (maxSpins - minSpins) + minSpins;
    const randomAngle = randomSpins * 2 * Math.PI + (Math.random() * Math.PI / 4);
    const start = Date.now();

    function animate() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / spinTime, 1);

        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        currentRotation = easeOutProgress * randomAngle;

        drawRoulette();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            detectWinningNumber();
        }
    }

    animate();
}

drawRoulette();

function detectWinningNumber() {
    const normalizedRotation = (currentRotation + Math.PI / 2) % (2 * Math.PI);
    const winningIndex = Math.floor((2 * Math.PI - normalizedRotation) / angleByNumber) % totalNumbers;
    const winningOption = optionsRandom[winningIndex];
    Toastify({
        avatar: './public/images/logoOnix.png',
        duration: 5000,
        text: `El número ganador es ${winningOption.number}`,
        className: "info",
        style: {
            background: "linear-gradient(to right,#0f2027, #203a43, #2c5364)",
            fontSize: '20px',
        },
        gravity: "top",
        position: "center",
    }).showToast();

}

function shuffleArray(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

document.getElementById("spinButton").addEventListener("click", spinRoulette);

const loadAwards = () => {
    const tBodyAwards = document.getElementById("table_awards_tbody");
    options.forEach(option => {
        const optionHtml = `<tr><td>${option.number}</td><td>${option.text}</td></tr>`;
        tBodyAwards.innerHTML += optionHtml;
    });
}

loadAwards();