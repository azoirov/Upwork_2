// constants
const maxDiff = 25;

// DOM Elements
const formElement = document.querySelector("form#form");
const tempElement1 = formElement.querySelector("input.from");
const tempElement2 = formElement.querySelector("input.to");
const typeElement = formElement.querySelector("select#type");
const errorTextElement = document.querySelector("p.error-text");
const ascEl = document.querySelector(".asc");
const descEl = document.querySelector(".desc");

// Functions
function toFahrenheit(range) {
    let converted = [];
    range.forEach((el) => {
        converted.push({
            cel: el,
            fah: Math.round(((el * 9) / 5 + 32) * 100) / 100,
        });
    });
    return converted;
}

function toCel(range) {
    let converted = [];
    range.forEach((el) => {
        converted.push({
            fah: el,
            cel: Math.round((((el - 32) * 5) / 9) * 100) / 100,
        });
    });
    return converted;
}

// Events
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    window.localStorage.clear();

    tempElement1.classList.remove("error");
    tempElement2.classList.remove("error");
    errorTextElement.textContent = "";
    document.querySelector("table").style.display = "none";

    let from = tempElement1.value - 0;
    let to = tempElement2.value ? tempElement2.value - 0 : undefined;
    const type = typeElement.value;

    if (!from) {
        tempElement1.classList.add("error");
        errorTextElement.textContent = "First Field is required!";
        return;
    }

    let range = [];

    if (to && from > to) {
        let flag = from;
        from = to;
        to = flag;
    }

    window.localStorage.setItem("from", from);
    window.localStorage.setItem("to", to);
    window.localStorage.setItem("type", type);

    if (to) {
        for (let i = from; i <= to; i++) {
            range.push(i);
        }
    } else if (!to) {
        for (let i = from - 5; i <= from + 5; i++) {
            range.push(i);
        }
    }

    if (range.length > maxDiff) {
        tempElement1.classList.add("error");
        tempElement2.classList.add("error");
        errorTextElement.textContent = "unreasonably large";
        return;
    }

    let converted;

    switch (type) {
        case "tocel":
            converted = toCel(range);
            break;
        case "tofah":
            converted = toFahrenheit(range);
            break;
        default:
            break;
    }
    window.localStorage.setItem("converted", JSON.stringify(converted));
    render(converted);
    document.querySelectorAll(".order").forEach((el) => {
        el.style.display = "block";
    });
});

descEl.addEventListener("click", (e) => {
    let converted = window.localStorage.getItem("converted");
    converted = JSON.parse(converted);
    let type = window.localStorage.getItem("type");

    converted = converted.sort((a, b) => {
        return type == "tocel" ? b.fah - a.fah : b.cel - a.cel;
    });

    render(converted);
});

ascEl.addEventListener("click", (e) => {
    let converted = window.localStorage.getItem("converted");
    converted = JSON.parse(converted);
    let type = window.localStorage.getItem("type");

    converted = converted.sort((a, b) => {
        return type == "tocel" ? a.fah - b.fah : a.cel - b.cel;
    });

    render(converted);
});

// Render
function render(data) {
    const from = window.localStorage.getItem("from");
    const to = window.localStorage.getItem("to");
    const type = window.localStorage.getItem("type");

    document.querySelector("table").style.display = "block";
    const tBodyElement = document.querySelector(".tBody");
    tBodyElement.innerHTML = "";
    data.forEach((el, index) => {
        const newTrElement = `
        <tr class="${
            type == "tocel"
                ? el.fah == from || el.fah == to
                    ? "alternative-row"
                    : ""
                : el.cel == from || el.cel == to
                ? "alternative-row"
                : ""
        }">
            <th>${index + 1}</th>
            <td>${el.cel}</td>
            <td>${el.fah}</td>
        </tr>
        `;
        tBodyElement.innerHTML += newTrElement;
    });
}
