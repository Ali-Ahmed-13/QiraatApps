const fs = require('fs');
const path = require('path');

const booksDirPath = path.join(process.cwd(), 'src', 'data', 'books');
const booksDataPath = path.join(process.cwd(), 'src', 'data', 'booksData.json');

const books = JSON.parse(fs.readFileSync(booksDataPath, 'utf8'));

let fixedCount = 0;
books.forEach(b => {
  if (b.fileUrl) {
    const rawName = path.basename(b.fileUrl);
    // Check if it exists in public/pdf/qiraat/
    if (fs.existsSync(path.join(process.cwd(), 'public', 'pdf', 'qiraat', rawName))) {
      b.fileUrl = '/pdf/qiraat/' + rawName;
      fixedCount++;
    } else if (fs.existsSync(path.join(process.cwd(), 'public', 'pdf', rawName))) {
      b.fileUrl = '/pdf/' + rawName;
      fixedCount++;
    }
  }
});

fs.writeFileSync(booksDataPath, JSON.stringify(books, null, 2), 'utf8');

// Update tajweed.json & qiraat.json
const tajweed = books.filter(b => b.category === 'تجويد');
const qiraat = books.filter(b => b.category === 'قراءات');

fs.writeFileSync(path.join(booksDirPath, 'tajweed.json'), JSON.stringify(tajweed, null, 2), 'utf8');
fs.writeFileSync(path.join(booksDirPath, 'qiraat.json'), JSON.stringify(qiraat, null, 2), 'utf8');

console.log('Successfully updated ' + fixedCount + ' book fileUrl paths.');
