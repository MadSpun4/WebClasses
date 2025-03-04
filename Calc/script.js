const inputsSides = document.getElementById('inputs-sides');
const inputsAngles = document.getElementById('inputs-angles');
const trapezoidImg = document.getElementById('trapezoid-img');
const results = document.getElementById('results');
const calculationsSelect = document.getElementById('calculations');

const base1 = document.getElementById('base1');
const side1 = document.getElementById('side1');
const side2 = document.getElementById('side2');
const heightSides = document.getElementById('height-sides');

const baseA = document.getElementById('base-a');
const angle1 = document.getElementById('angle1');
const angle2 = document.getElementById('angle2');
const heightAngles = document.getElementById('height-angles');

function selectForm() {
    const radioButtons = document.getElementsByName('type');
    let type;
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            type = radioButtons[i].value;
            break;
        }
    }

    if (type === 'sides') {
        inputsSides.classList.remove('hidden');
        inputsAngles.classList.add('hidden');
        trapezoidImg.src = 'images/image1.png';
    } else {
        inputsSides.classList.add('hidden');
        inputsAngles.classList.remove('hidden');
        trapezoidImg.src = 'images/image2.png';
    }
    clearInputResults();
}

function clearErrorOnClick(input) {
    document.getElementById(input).classList.remove('error');
}

function clearInputResults() {
    results.innerHTML = '';
}

function clearInput() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'number') {
            inputs[i].value = '';
            inputs[i].classList.remove('error');
        }
    }
    const options = calculationsSelect.getElementsByTagName('option');
    for (let i = 0; i < options.length; i++) {
        options[i].selected = false;
    }
    calculationsSelect.classList.remove('error');
    clearInputResults();
}

function validateInputs(inputs) {
    const errors = [];
    let hasEmptyFields = false;

    inputs.forEach(input => {
        input.classList.remove('error');
        if (!input.value) {
            input.classList.add('error');
            hasEmptyFields = true;
        } else if (isNaN(input.value) || input.value <= 0) {
            errors.push(`Поле "${input.labels[0].textContent}" должно быть положительным числом.`);
            input.classList.add('error');
        }
    });

    if (hasEmptyFields) {
        errors.push('');
    }
    return errors;
}

function calculate() {
    const radioButtons = document.getElementsByName('type');
    let type;
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            type = radioButtons[i].value;
            break;
        }
    }

    const selected = Array
        .from(calculationsSelect.selectedOptions)
        .map(option => option.value);
    results.innerHTML = '';

    if (!selected.length) {
        calculationsSelect.classList.add('error');
        return;
    }

    let a, h, b, c, d, p1, p2, angle1Val, angle2Val;
    let errors = [];

    if (type === 'sides') {
        const inputs = [base1, side1, side2, heightSides];
        errors = validateInputs(inputs);
        if (errors.length > 0) {
            const displayErrors = errors.filter(err => err !== '');
            if (displayErrors.length > 0) {
                results.innerHTML = displayErrors.map(err => `<p class="error">${err}</p>`).join('');
            }
            return;
        }

        [a, b, c, h] = inputs.map(input => parseFloat(input.value));
        if (h >= b) {
            errors.push('Высота h должна быть меньше боковой стороны b.');
            heightSides.classList.add('error');
        }
        if (h >= c) {
            errors.push('Высота h должна быть меньше боковой стороны c.');
            heightSides.classList.add('error');
        }
        if (errors.length > 0) {
            results.innerHTML = errors.map(err => `<p class="error">${err}</p>`).join('');
            return;
        }

        p1 = Math.sqrt(b * b - h * h);
        p2 = Math.sqrt(c * c - h * h);
        if (p1 + p2 >= a) {
            errors.push(`Сумма проекций боковых сторон превышает основание a.<br>
                 p1 = √(b² - h²)<br>
                 p2 = √(c² - h²)`)
            base1.classList.add('error');
            side1.classList.add('error');
            side2.classList.add('error');
            heightSides.classList.add('error');
        }
        if (errors.length > 0) {
            results.innerHTML = errors.map(err => `<p class="error">${err}</p>`).join('');
            return;
        }
        d = a - p1 - p2;
    } else {
        const inputs = [baseA, angle1, angle2, heightAngles];
        errors = validateInputs(inputs);
        if (errors.length > 0) {
            const displayErrors = errors.filter(err => err !== '');
            if (displayErrors.length > 0) {
                results.innerHTML = displayErrors.map(err => `<p class="error">${err}</p>`).join('');
            }
            return;
        }

        [a, angle1Val, angle2Val, h] = inputs.map(input => parseFloat(input.value));
        if (angle1Val >= 90) {
            errors.push('Угол α должен быть меньше 90 градусов.');
            angle1.classList.add('error');
        }
        if (angle2Val >= 90) {
            errors.push('Угол β должен быть меньше 90 градусов.');
            angle2.classList.add('error');
        }
        if (angle1Val + angle2Val >= 180) {
            errors.push('Сумма углов α и β должна быть меньше 180 градусов.');
        }
        if (errors.length > 0) {
            results.innerHTML = errors.map(err => `<p class="error">${err}</p>`).join('');
            return;
        }

        const radAlpha = angle1Val * Math.PI / 180;
        const radBeta = angle2Val * Math.PI / 180;
        p1 = h / Math.tan(radAlpha);
        p2 = h / Math.tan(radBeta);
        if (p1 + p2 >= a) {
            errors.push(`Сумма проекций от углов превышает основание a.<br>
                 p1 = h / tan(α)<br>
                 p2 = h / tan(β)`)
            baseA.classList.add('error');
            angle1.classList.add('error');
            angle2.classList.add('error');
            heightAngles.classList.add('error');
        }
        if (errors.length > 0) {
            results.innerHTML = errors.map(err => `<p class="error">${err}</p>`).join('');
            return;
        }
        d = a - p1 - p2;
        b = h / Math.sin(radAlpha);
        c = h / Math.sin(radBeta);
    }

    if (selected.includes('perimeter')) {
        const perimeter = a + d + b + c;
        results.innerHTML += `<p>Периметр: ${perimeter.toFixed(2)}</p>`;
    }
    if (selected.includes('area')) {
        const area = ((a + d) * h) / 2;
        results.innerHTML += `<p>Площадь: ${area.toFixed(2)}</p>`;
    }
    if (selected.includes('diagonals')) {
        const diag1 = Math.sqrt((p1 + (a - d) / 2) ** 2 + h * h);
        const diag2 = Math.sqrt((p2 + (a - d) / 2) ** 2 + h * h);
        results.innerHTML += `<p>Диагональ 1: ${diag1.toFixed(2)}</p>
                              <p>Диагональ 2: ${diag2.toFixed(2)}</p>`;
    }
}

selectForm();