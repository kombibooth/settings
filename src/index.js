import fs from 'fs';
import { sep } from 'path';
import osHomedir from 'os-homedir';

export const SETTINGS_FILE = `${osHomedir()}${sep}.kombibooth.json`;
export const DEFAULT_SETTINGS = {
  preferences: {
    numberOfPhotos: 3,
    countDownTime: 5,
    intervalBetweenPhotos: 5,
    shouldSavePhotos: false,
    directoryToSavePhotos: `${osHomedir()}${sep}KombiBooth${sep}`,
  },
};

export function install () {
  return writeJSONFile(SETTINGS_FILE, DEFAULT_SETTINGS);
}

export function save (data) {
  return writeJSONFile(SETTINGS_FILE, data);
}

export function load () {
  return readJSONFile(SETTINGS_FILE);
}

function writeJSONFile (file, data) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(file, JSON.stringify(data), {flags: 'w'}, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    } catch (parseError) {
      return reject(parseError);
    }
  });
}

function readJSONFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }

      try {
        return resolve(JSON.parse(data.toString()));
      } catch (parseError) {
        return reject(parseError);
      }
    });
  });
}
