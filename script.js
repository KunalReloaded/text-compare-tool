let keystrokes1 = 0, keystrokes2 = 0;
let spaces1 = 0, spaces2 = 0;
let enters1 = 0, enters2 = 0;
let words1 = 0, words2 = 0;
let letters1 = 0, letters2 = 0;

let text1 = "", text2 = "";

document.addEventListener("DOMContentLoaded", function () {
    updateIndianTime();

    // Track keystrokes, spaces, enters
    document.getElementById("text1").addEventListener("keydown", (e) => handleKeystroke(e, 1));
    document.getElementById("text2").addEventListener("keydown", (e) => handleKeystroke(e, 2));

    // Track changes for stats (word/letter count)
    document.getElementById("text1").addEventListener("input", updateStats);
    document.getElementById("text2").addEventListener("input", updateStats);

    document.getElementById("compareBtn").addEventListener("click", compareTexts);
    document.getElementById("saveResult").addEventListener("click", saveResult);
    document.getElementById("clearAllBtn").addEventListener("click", clearAll);
});

function handleKeystroke(event, index) {
    if (index === 1) {
        keystrokes1++;
        if (event.key === " ") spaces1++;
        if (event.key === "Enter") enters1++;
    } else {
        keystrokes2++;
        if (event.key === " ") spaces2++;
        if (event.key === "Enter") enters2++;
    }
    updateStats();
}

function updateIndianTime() {
    setInterval(() => {
        document.getElementById("indianTime").innerText = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        });
    }, 1000);
}

function updateStats() {
    text1 = document.getElementById("text1").value;
    text2 = document.getElementById("text2").value;

    // Count only actual space characters (not \n or tab)
    spaces1 = (text1.match(/ /g) || []).length;
    spaces2 = (text2.match(/ /g) || []).length;

    words1 = text1.trim().split(/\s+/).filter(Boolean).length;
    words2 = text2.trim().split(/\s+/).filter(Boolean).length;

    letters1 = text1.replace(/[^a-zA-Z\u0900-\u097F]/g, "").length;
    letters2 = text2.replace(/[^a-zA-Z\u0900-\u097F]/g, "").length;

    document.getElementById("keystrokesCount").innerText = `Keystrokes: ${keystrokes1} + ${keystrokes2} = ${keystrokes1 + keystrokes2}`;
    document.getElementById("spacesCount").innerText = `Spaces: ${spaces1} + ${spaces2} = ${spaces1 + spaces2}`;
    document.getElementById("entersCount").innerText = `Enters: ${enters1} + ${enters2} = ${enters1 + enters2}`;
    document.getElementById("wordsCount").innerText = `Words: ${words1} + ${words2} = ${words1 + words2}`;
    document.getElementById("lettersCount").innerText = `Letters: ${letters1} + ${letters2} = ${letters1 + letters2}`;
}

function compareTexts() {
    const text1Arr = text1.split(/\n+/);
    const text2Arr = text2.split(/\n+/);
    let result = "";

    const maxLen = Math.max(text1Arr.length, text2Arr.length);
    for (let i = 0; i < maxLen; i++) {
        let paragraph1 = text1Arr[i] || "";
        let paragraph2 = text2Arr[i] || "";

        const words1 = paragraph1.split(/\s+/);
        const words2 = paragraph2.split(/\s+/);
        let paragraphResult = `<strong>Paragraph ${i + 1}:</strong><br>`;

        const maxWords = Math.max(words1.length, words2.length);
        for (let j = 0; j < maxWords; j++) {
            if (!words1[j] && words2[j]) {
                paragraphResult += `<span style="color: gray;">[MISSING]</span> <span style="color: green;">[${words2[j]}]</span> `;
            } else if (words1[j] && !words2[j]) {
                paragraphResult += `<span style="color: red;">[${words1[j]}]</span> <span style="color: gray;">[MISSING]</span> `;
            } else if (words1[j] !== words2[j]) {
                paragraphResult += `<span style="color: red;">[${words1[j]}]</span> <span style="color: green;">[${words2[j]}]</span> `;
            } else {
                paragraphResult += `${words1[j]} `;
            }
        }
        result += `<p>${paragraphResult.trim()}</p><br>`;
    }

    document.getElementById("comparisonResult").innerHTML = result;
}

function saveResult() {
    const comparisonResult = document.getElementById("comparisonResult").innerText;
    const format = document.getElementById("fileFormat").value;
    const featureData = `
Keystrokes: ${keystrokes1} + ${keystrokes2} = ${keystrokes1 + keystrokes2}
Spaces: ${spaces1} + ${spaces2} = ${spaces1 + spaces2}
Enters: ${enters1} + ${enters2} = ${enters1 + enters2}
Words: ${words1} + ${words2} = ${words1 + words2}
Letters: ${letters1} + ${letters2} = ${letters1 + letters2}
`;

    const finalResult = `${featureData}\n\nComparison Results:\n${comparisonResult}`;

    if (format === "txt") {
        const blob = new Blob([finalResult], { type: 'text/plain' });
        saveAs(blob, "comparison_result.txt");
    } else if (format === "pdf") {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(finalResult, 180);
        doc.text(lines, 10, 10);
        doc.save("comparison_result.pdf");
    } else if (format === "docx") {
        const zip = new PizZip();
        const doc = new Docxtemplater(zip);
        doc.loadZip(zip);
        doc.setData({ text: finalResult });

        try {
            doc.render();
            const out = doc.getZip().generate({ type: "blob" });
            saveAs(out, "comparison_result.docx");
        } catch (e) {
            console.error("Error rendering DOCX:", e);
        }
    }
}

function clearAll() {
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("comparisonResult").innerHTML = "";

    keystrokes1 = keystrokes2 = 0;
    spaces1 = spaces2 = 0;
    enters1 = enters2 = 0;

    updateStats();
}
