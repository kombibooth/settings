import fs from 'fs';
import mock from 'mock-fs';

beforeEach(() => {
  mock({
  });
});

afterEach(() => {
  mock.restore();
});

export function fileExists (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    });
  });
}

export function readFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data.toString());
    });
  });
}
