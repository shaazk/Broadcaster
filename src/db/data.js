import User from '../model/user.model';
import { Incident } from '../model/incident.model';


export const users = [
  new User(
    1234567890123459,
    'Mutesi Sharon K',
    'admin@gmail.com',
    '$2b$10$s4RN8ri.6or1GwLHRVRpW.r6YMfD2tkTK0NV.SV01KuwKQQ71YcZG',
    'tesi',
    'admin',
  ),
];

export const incidents = [
  new Incident(
    1,
    '12/12/09',
    '1234567890123456',
    'Corruption',
    'Redflag',
    'kicukiro',
    'w.png',
    'w.mp4',
    ' Veda is very corrupt',
  ),
];
