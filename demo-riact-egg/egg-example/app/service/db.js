'use strict';

const data = [{
  key: 'puzipsed@uwciun.lu',
  value: 'Matilda Schneider',
}, {
  key: 'jom@lof.ga',
  value: 'Wesley Glover',
}, {
  key: 'goljujoh@kirbo.ye',
  value: 'Amanda Hudson',
}, {
  key: 'bok@cag.af',
  value: 'Jason Harrington',
}];

const db = {
  add(item) {
    data.push(item);
  },
  getAll() {
    return [ ...data ];
  },
  getOne(key) {
    return { ...data.find(item => item.key === key) };
  },
  delete(key) {
    data.splice(data.findIndex(item => item.key === key), 1);
  },
};

module.exports = db;
