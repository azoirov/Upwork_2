function handleFileSelect(e) {
    let files = e.target.files; // FileList object

    // use the 1st file from the list
    let f = files[0];

    let reader = new FileReader();

    let html;
    let occs = [];
    reader.addEventListener("load", (e) => {
        html = reader.result;
        html = html.split("<body>");
        html = html[1];
        html = html.split("</body>");
        html = html[0];
        document.querySelector("#htmlP").innerHTML = html;
        let content = document.querySelector("#htmlP").innerText;
        content = content.split("\n");
        content = content.join(" ");
        content = content.split(" ");
        content = content.filter((el) => el != "");
        content.forEach((el) => {
            let occ = occs.findIndex(
                (i) => el.toLowerCase() == i.name.toLowerCase()
            );
            if (occ < 0) {
                occs.push({
                    name: el,
                    occ: 1,
                });
            } else {
                occs[occ].occ = occs[occ].occ + 1;
            }
        });
        window.localStorage.setItem("fre", JSON.stringify(occs));
        render(occs);
    });

    // Read in the image file as a data URL.
    reader.readAsText(f);
}

document
    .getElementById("upload")
    .addEventListener("change", handleFileSelect, false);

document.querySelector("select#order").addEventListener("change", (e) => {
    let fre = JSON.parse(window.localStorage.getItem("fre"));
    let alp = [...fre];
    alp = alp.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    let orderType = e.target.value;

    if (orderType == "fre") {
        render(fre);
    } else if (orderType == "alp") {
        render(alp);
    }
});

function render(data) {
    document.querySelector("tbody").innerHTML = "";
    data.forEach((el) => {
        document.querySelector("tbody").innerHTML += `<tr>
        <td>${el.name}</td>
        <td>${el.occ}</td>
    </tr>`;
    });
}
