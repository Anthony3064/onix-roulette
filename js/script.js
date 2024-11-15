
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

let options = [];

const optionsMale = [
    {
        number: 1,
        text: '10%'
    },
    {
        number: 2,
        text: '15%'
    },
    {
        number: 3,
        text: '20%'
    },
    {
        number: 4,
        text: 'Ampolla'
    },
    {
        number: 5,
        text: 'Cera 50% de descuento'
    },
    {
        number: 6,
        text: 'Limpieza facial'
    },
    {
        number: 7,
        text: 'Limpeza profunda'
    },
    {
        number: 8,
        text: '20% Descuento en Permufe'
    },
    {
        number: 9,
        text: 'Perfilado de cejas a ₡500'
    }
];

const optionsFemale = [
    {
        number: 1,
        text: '20% descuento en tratamiento Detox'
    },
    {
        number: 2,
        text: 'Ampolla gratis (Al adquirir servicio de peinado o corte)'
    },
    {
        number: 3,
        text: '10% descuento en keratina'
    },
    {
        number: 4,
        text: '20% descuento en corte, blower o plancha'
    },
    {
        number: 5,
        text: '15% descuento en técnica de color'
    },
    {
        number: 6,
        text: '20% descuento en nanoplastía'
    },
    {
        number: 7,
        text: '15% descuento Botox'
    },
    {
        number: 8,
        text: '15% descuento en peinado'
    },
];

function loadOptions(typeOptions) {
    switch (typeOptions) {
        case "male":
            options = optionsMale;
            break;
        case "female":
            options = optionsFemale;
            break;
        default:
            options = optionsMale;
            break;
    }
}

loadOptions();

const spinSound = document.getElementById('spinSound');

function createRoulette() {
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
    const spinButton = document.getElementById("spinButton");
    const newSpinButton = spinButton.cloneNode(true);
    spinButton.parentNode.replaceChild(newSpinButton, spinButton);


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

        spinSound.currentTime = 0;
        spinSound.loop = true;
        spinSound.play();

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
                spinSound.pause();
                spinSound.currentTime = 0;
                spinSound.loop = false;
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
        tBodyAwards.innerHTML = "";
        options.forEach(option => {
            const optionHtml = `<tr><td>${option.number}</td><td>${option.text}</td></tr>`;
            tBodyAwards.innerHTML += optionHtml;
        });
    }

    loadAwards();
}

createRoulette();

const buttonsMaleAndFemale = document.getElementsByClassName("btn");

if (buttonsMaleAndFemale) {
    for (let index = 0; index < buttonsMaleAndFemale.length; index++) {
        const element = buttonsMaleAndFemale[index];
        element.addEventListener("click", (event) => {
            const activeButton = document.querySelector(".btn--active");
            activeButton.classList.remove("btn--active");
            if (!event.target.classList.contains("btn--active")) {
                event.target.classList.add("btn--active");
                const typeOptions = event.target.getAttribute("data-button-option");
                loadOptions(typeOptions);
                createRoulette();
            }
        });
    }
}