const table = document.querySelector("table");
const tBody = table.querySelector("tbody");
const clear = document.querySelector("button#clear");
let total = document.querySelector("span#total");

// !!! ID's must be unique !!!
let data = [
    {
        id: 1,
        section: "Dynamic Table",
        max: 20,
        comments: "Not attempted",
        mark: 0,
    },
    {
        id: 2,
        section: "Dynamic Table",
        max: 20,
        comments: "Not attempted",
        mark: 0,
    },
    {
        id: 3,
        section: "Dynamic Table",
        max: 20,
        comments: "Not attempted",
        mark: 0,
    },
    {
        id: 4,
        section: "Dynamic Table",
        max: 20,
        comments: "Not attempted",
        mark: 0,
    },
];

function render() {
    let tMark = 0;
    tBody.innerHTML = "";
    data.forEach((el) => {
        tMark += el.mark;
        let newRowElement = document.createElement("tr");
        let secEl = document.createElement("td");
        let maxEl = document.createElement("td");
        let comEl = document.createElement("td");
        let textEl = document.createElement("textarea");
        let markCol = document.createElement("td");
        let markSelect = document.createElement("select");
        markSelect.id = `markSelect#${el.id}`;
        markSelect.classList.add("mark-select");

        for (let i = 0; i <= el.max; i++) {
            markSelect.innerHTML += `<option ${
                i == el.mark ? "selected" : ""
            } value="${i}">${i}</option>`;
        }

        secEl.textContent = el.section || "";
        maxEl.textContent = el.max || "";
        comEl.append(textEl);
        textEl.value = el.comments || "";
        markCol.append(markSelect);

        newRowElement.append(secEl);
        newRowElement.append(maxEl);
        newRowElement.append(comEl);
        newRowElement.append(markCol);

        tBody.append(newRowElement);
    });
    total.textContent = tMark || 0;
    markChange();
}

render();

clear.addEventListener("click", (e) => {
    data = data.map((el) => ({ section: el.section, max: el.max }));
    render();
});

function markChange() {
    document.querySelectorAll("select.mark-select").forEach((select) => {
        select.addEventListener("change", (e) => {
            console.log(true);
            let mark = e.target.value;
            let id = e.target.id.split("#")[1] - 0;
            mark = Number(mark);
            data = data.map((el) =>
                el.id == id ? { ...el, mark } : { ...el }
            );
            render();
        });
    });
}

markChange();
