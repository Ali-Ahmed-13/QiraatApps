import tajweedAndQiraat from './tajweed-qiraat.json';
import { Book } from 'src/utils/bookHelper';

export const booksData: Book[] = tajweedAndQiraat as Book[];

export { tajweedAndQiraat };

export default booksData;
