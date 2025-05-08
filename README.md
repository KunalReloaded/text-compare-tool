
# 📝 Text Comparison Tool

A web-based application for comparing two blocks of text or document files (PDF/DOCX), with real-time analytics, visual difference highlighting, and export options.

## 🚀 Features

- **Dual Text Areas**: Paste or type text side by side for comparison.
- **Document Upload**: Upload `.docx` and `.pdf` files — content is extracted and displayed in text areas.
- **Live Comparison**: Highlight differences (added, removed, or missing words) paragraph-by-paragraph.
- **Detailed Statistics**: Tracks keystrokes, spaces, enters, word counts, and letter counts for both texts.
- **Export Options**: Save comparison results in `.txt`, `.pdf`, or `.docx` formats.
- **Live Indian Time Clock**: Displays current time in IST.
- **Stopwatch Timer**: Built-in live timer with start, pause, and reset functionality.
- **Responsive Design**: Works well on both desktop and mobile devices.

## 📦 Libraries Used

- [`FileSaver.js`](https://github.com/eligrey/FileSaver.js) – to save TXT and DOCX exports.
- [`jsPDF`](https://github.com/parallax/jsPDF) – for generating and downloading PDF results.
- [`Mammoth.js`](https://github.com/mwilliamson/mammoth.js) – for reading `.docx` file content.
- [`PDF.js`](https://mozilla.github.io/pdf.js/) – to extract text from PDF files.

## 🖥️ How to Use

1. **Open the HTML File** in a browser.
2. **Type or Paste Text** into the two text boxes or use the file upload options.
3. Click **“Compare Texts”** to view a detailed, word-by-word difference analysis.
4. Use the **Stopwatch** to track time spent during comparison.
5. Use **“Save Result”** to download the comparison in your preferred format.
6. Use **“Clear All”** to reset the fields and stats.

## 📂 File Upload Notes

- Only `.docx` and `.pdf` files are supported.
- Files are read using client-side JavaScript; no data is uploaded to a server.
- For PDFs, ensure they contain selectable (not scanned image) text.

## 📊 Output Format

The result includes:
- Word-by-word differences with:
  - ✅ Unchanged words (normal text)
  - ➕ Added words (green)
  - ➖ Removed words (red)
  - ⚠️ Missing words (gray)
- Full keystroke and character count stats.

## 🧩 To Do / Suggestions

- Improve word diff logic using libraries like `diff-match-patch`.
- Add scroll-to-change and side-by-side diff view.
- Implement dark mode toggle.
- Option to ignore case or punctuation.

## 📄 License

This project is open-source and free to use under the [MIT License](https://opensource.org/licenses/MIT).
