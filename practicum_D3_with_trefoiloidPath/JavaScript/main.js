const width = 600;
const height = 600;
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

let draw = (dataForm) => {
    const svg = d3.select("svg");
    let pict = drawStar(svg);
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value})
                            scale(${dataForm.scaleX.value}, ${dataForm.scaleY.value})
                            rotate(${dataForm.rotate.value})`);
};

let runAnimation = (dataForm) => {
    const svg = d3.select("svg");
    const pathAnimateCheckbox = document.getElementById("pathAnimate");

    const animationType = document.getElementById("animationType").value;
    let easeMethod;
    if (animationType === "linear") {
        easeMethod = d3.easeLinear;
    } else if (animationType === "elastic") {
        easeMethod = d3.easeElastic;
    } else if (animationType === "bounce") {
        easeMethod = d3.easeBounce;
    }

    const animationDuration = parseInt(document.getElementById("animationDuration").value) || 6000;

    const startTransform = {
        scaleX: parseFloat(dataForm.scaleX.value),
        scaleY: parseFloat(dataForm.scaleY.value),
        rotate: parseFloat(dataForm.rotate.value)
    };
    const endTransform = {
        scaleX: parseFloat(dataForm.scaleXEnd.value),
        scaleY: parseFloat(dataForm.scaleYEnd.value),
        rotate: parseFloat(dataForm.rotateEnd.value)
    };

    if (!pathAnimateCheckbox.checked) {
        let pict = drawStar(svg);

        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value})
                                scale(${startTransform.scaleX}, ${startTransform.scaleY})
                                rotate(${startTransform.rotate})`)
            .transition()
            .duration(animationDuration)
            .ease(easeMethod)
            .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value})
                                scale(${endTransform.scaleX}, ${endTransform.scaleY})
                                rotate(${endTransform.rotate})`);
    } else if (pathAnimateCheckbox.checked) {
        let pict = drawStar(svg);

        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value})
                                scale(${startTransform.scaleX}, ${startTransform.scaleY})
                                rotate(${startTransform.rotate})`);

        let path = drawPath(document.getElementById("pathType").value);
        const pathNode = path.node();
        const pathLength = pathNode.getTotalLength();

        pict.transition()
            .ease(easeMethod)
            .duration(animationDuration)
            .attrTween('transform', function () {
                return (t) => {
                    const point = pathNode.getPointAtLength(t * pathLength);
                    this.cx = point.x;
                    this.cy = point.y;

                    const scaleX = startTransform.scaleX + (endTransform.scaleX - startTransform.scaleX) * t;
                    const scaleY = startTransform.scaleY + (endTransform.scaleY - startTransform.scaleY) * t;
                    const rotate = startTransform.rotate + (endTransform.rotate - startTransform.rotate) * t;

                    return `translate(${point.x}, ${point.y}) scale(${scaleX}, ${scaleY}) rotate(${rotate})`;
                };
            });
    }
};

const createForm = document.getElementById("setting");
const createInputs = createForm.getElementsByTagName("input");

let createButton, animateButton, clearButton;

for (let i = 0; i < createInputs.length; i++) {
    if (createInputs[i].value === "Нарисовать") {
        createButton = createInputs[i];
    }
    if (createInputs[i].value === "Анимировать") {
        animateButton = createInputs[i];
    }
    if (createInputs[i].value === "Очистить") {
        clearButton = createInputs[i];
    }
}

const animateCheckbox = document.getElementById("animate");
const pathAnimateCheckbox = document.getElementById("pathAnimate");
const animationFields = document.getElementsByClassName("animation-field");
const durationField = document.getElementsByClassName("duration-field")[0];
const pathSection = document.getElementsByClassName("path-section")[0];
const pathCheckbox = document.getElementsByClassName("path-checkbox")[0];
const coordinatesSection = document.getElementsByClassName("form-section")[0];

function toggleAnimationFields() {
    for (let i = 0; i < animationFields.length; i++) {
        if (animateCheckbox.checked) {
            animationFields[i].classList.remove("hidden");
        } else {
            animationFields[i].classList.add("hidden");
        }
    }

    if (animateCheckbox.checked) {
        createButton.classList.add("hidden");
        animateButton.classList.remove("hidden");
        pathCheckbox.classList.remove("hidden");
    } else {
        createButton.classList.remove("hidden");
        animateButton.classList.add("hidden");
        pathCheckbox.classList.add("hidden");
        pathAnimateCheckbox.checked = false;
        togglePathFields();
    }
}

function togglePathFields() {
    if (pathAnimateCheckbox.checked) {
        pathSection.classList.remove("hidden");
        durationField.classList.remove("hidden");
        coordinatesSection.classList.add("hidden");
    } else {
        pathSection.classList.add("hidden");
        durationField.classList.add("hidden");
        coordinatesSection.classList.remove("hidden");
    }
}

function clearSVG() {
    svg.selectAll("*").remove();
}

createButton.onclick = function () {
    draw(document.getElementById("setting"));
};

animateButton.onclick = function () {
    runAnimation(document.getElementById("setting"));
};

clearButton.onclick = function () {
    clearSVG();
};

animateCheckbox.onchange = toggleAnimationFields;
pathAnimateCheckbox.onchange = togglePathFields;