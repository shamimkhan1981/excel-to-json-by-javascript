let selectedFile;
console.log(window.XLSX);
document.getElementById("saveJson").style.display = "none";
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]

let rowObject
document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);
                document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4)
                if (rowObject && typeof rowObject == "object" && rowObject.length > 0) {
                    document.getElementById("saveJson").style.display = "";
                } else {
                    document.getElementById("saveJson").style.display = "none";
                }
            });
        }
    }
});

function saveFile() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(rowObject, null, 2)], {
        type: "text/plain"
    }));
    a.setAttribute("download", "data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};