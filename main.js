const { exec } = require('child_process');
const { platform } = require('os');

const filePath = 'option.html';

// Der Befehl zum Öffnen der HTML-Datei im Standardbrowser, abhängig vom Betriebssystem
const openCommand = platform() === 'win32' ? `start ${filePath}` : platform() === 'darwin' ? `open ${filePath}` : `xdg-open ${filePath}`;

function openHTMLFile(str) {


    // Öffne die HTML-Datei
    exec(openCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Fehler beim Öffnen der HTML-Datei: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Fehlerausgabe: ${stderr}`);
            return;
        }
        console.log(`Die HTML-Datei wurde erfolgreich geöffnet.`);
    });
}
const fs = require('fs');
const xlsx = require('xlsx');
// Exportiere die Funktion f1
function f1() {
    // Dateipfad zur Textdatei
    const txtFilePath = 'output.txt';

    // Datei vorher leeren
    fs.writeFileSync(txtFilePath, '');

    // Lese Excel-Datei
    const fileContent = fs.readFileSync('Gezeiten-01.09.-30.09.2023.xlsx');
    const workbook = xlsx.read(fileContent, { type: 'buffer' });

    // Annahme: Arbeitsblatt ist das erste Blatt im Arbeitsbuch
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Annahme: Zelle C3 enthält den gewünschten Wert
    const today =new Date(Date.now())
    const day = today.getDate() + 2;
    const dayString = day.toString();
    const west = worksheet['C2'].v +": " + worksheet['C' + dayString].v;

    const mainSwim = worksheet['D2'].v +": " + worksheet['D' + dayString].v;




    // Schreibe den Wert in die Textdatei
    fs.appendFileSync(txtFilePath, west + '\n' + mainSwim);

    return west;
}

// Teste die Funktion
const result = f1();
console.log('Ergebnis:', result);

const url = 'https://raw.githubusercontent.com/Cpt-Pelle/Einsatzmonitor-Wangerooge/master/meintxt';


fetch(url)
  .then(response => response.text())
  .then(data => {
    console.log("test");
    console.log(data + "moin"); // Hier ist der Inhalt der .txt-Datei
  })
  .catch(error => {
    console.error('Beim Abrufen der Datei ist ein Fehler aufgetreten:', error);
  });

// Öffne die HTML-Datei und übergebe den String
openHTMLFile();

setTimeout(function(){
    location.reload();
}, 3000); // 3000 milliseconds = 3 seconds