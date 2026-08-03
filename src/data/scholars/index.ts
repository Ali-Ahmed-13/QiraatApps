import eras from './eras.json';
import companions from './companions.json';
import quraa10 from './quraa10.json';
import classical from './classical.json';
import modern from './modern.json';
import { ScholarsData, Scholar } from 'src/types/scholars';

export const scholars: Scholar[] = [
  ...(classical as Scholar[]),
  ...(quraa10 as Scholar[]),
  ...(companions as Scholar[]),
  ...(modern as Scholar[]),
];

export const scholarsData: ScholarsData = {
  eras,
  scholars,
};

export { eras, companions, quraa10, classical, modern };

export default scholarsData;
