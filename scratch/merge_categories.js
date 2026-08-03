const fs = require('fs');
const path = require('path');

const booksDirPath = path.join(process.cwd(), 'src', 'data', 'books');
const booksDataPath = path.join(process.cwd(), 'src', 'data', 'booksData.json');

const books = JSON.parse(fs.readFileSync(booksDataPath, 'utf8'));

// Update category for all books to 'التجويد والقراءات'
const updatedBooks = books.map(b => {
  if (b.category === 'تجويد' || b.category === 'قراءات' || b.category === 'التجويد والقراءات') {
    return {
      ...b,
      category: 'التجويد والقراءات'
    };
  }
  return b;
});

fs.writeFileSync(booksDataPath, JSON.stringify(updatedBooks, null, 2), 'utf8');

// Write combined tajweed-qiraat.json in src/data/books/
fs.writeFileSync(
  path.join(booksDirPath, 'tajweed-qiraat.json'),
  JSON.stringify(updatedBooks, null, 2),
  'utf8'
);

// Also keep tajweed.json & qiraat.json updated to point to the merged list so no import breaks
fs.writeFileSync(path.join(booksDirPath, 'tajweed.json'), JSON.stringify(updatedBooks, null, 2), 'utf8');
fs.writeFileSync(path.join(booksDirPath, 'qiraat.json'), JSON.stringify(updatedBooks, null, 2), 'utf8');

console.log('Successfully merged Tajweed and Qiraat categories into التجويد والقراءات for ' + updatedBooks.length + ' books.');
