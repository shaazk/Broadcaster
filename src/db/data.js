import User from '../model/user.model';
import { Incident } from '../model/incident.model';


export const users = [
  new User(
    1234567890123459,
    'Mutesi Sharon K',
    'sharonuase@gmail.com',
    '$2b$10$VwsjGOc.e9fzfMdHrm5PTOsFs3dtJ8bxe9bT.PJBWNTdfllyGmM2S',
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
    'pending',
    'w.png',
    'w.mp4',
    ' Veda is very corrupt',
  ),
];
