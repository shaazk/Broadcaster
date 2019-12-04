const dummyData = {
  signup: {
    userId: '1234567890123456',
    fullName: 'sharon k',
    email: 'sharonuashyxsd@gmail.com',
    password: 'jhjjhgjhg',
    phoneNumber: '5657657',
    username: 'tesi',
  },
  signin: {
    email: 'sharonuashyxsd@gmail.com',
    password: 'jhjjhgjhg',
  },
  invalidEmail: {
    email: 'shaazk@gmail.com',
    password: 'jhjjhgjhg',
  },
  invalidPassword: {
    email: 'sharonuashyxsd@gmail.com',
    password: 'shaazghvgh',
  },
  incident: {
    createdOn: '12/12/12',
    createdBy: '1234567890123456',
    title: 'corruption',
    type: 'redflag',
    location: '-1234 4567',
    images: ['w.png'],
    videos: ['w.mp4'],
    comment: 'ghfygfygytjygytfyfytftrf',
  },
  incident2: {
    createdOn: '12/12/12',
    createdBy: '1234567890123456',
    title: 'corruption',
    type: 'intervention',
    location: '-1234 4567',
    images: ['w.png'],
    videos: ['w.mp4'],
    comment: 'ghfygfygytjygytfyfytftrf',
  },
  adminToken: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InJvbGUiOiJhZG1pbiIsImlkIjoiMTIzNDU2Nzg5MDEyMzQ1OSJ9LCJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE1NzU0NTI3NDd9.S9EvLjodqH5lrIElRhqEDLFUoA8IG0fi6WqNjFOEsUU',
  },
  token: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJvbnVhc2h5QGdtYWlsLmNvbSIsImlnbm9yZUV4cGlyYXRpb24iOnRydWUsImlhdCI6MTU3Mzk3NjM0MX0.SD_pqYbYyZ19vWGXbzdiB43CDUUeo7_Yxr37WqUDfrU',
  },
  wrongToken: {
    token: 'eyJhbGciOiertyuijiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNo',
  },
  invalidToken: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzaGF6QGdtYWlsLmNvbSIsImlhdCI6MTU3NDk0NDUxN30.APB7RQv_8c0K0f1b4rOBKsmD311Vq4KLbyw27XgwM-M',
  },
  newIncidentRecord: {
    createdOn: '17/12/12',
    createdBy: '1234567770123456',
    title: 'corruption',
    type: 'incident',
    location: '-1234 4567',
    images: ['u.png'],
    videos: ['y.mp4'],
    comment: 'ghfygfygytjygytfyfytftrf',
  },
};
export default dummyData;
