import fs from 'fs';
import osHomedir from 'os-homedir';

export const SETTINGS_FILE = osHomedir() + '.kombibooth.json';
export const DEFAULT_SETTINGS = {
  preferences: {
    numberOfPhotos: 3,
    countDownTime: 5,
    intervalBetweenPhotos: 5,
    shouldSavePhotos: false,
    directoryToSavePhotos: `${osHomedir()}/KombiBooth/`,
  },
};

export function install () {
  return writeJSONFile(SETTINGS_FILE, DEFAULT_SETTINGS);
}

export function load () {
  return readJSONFile(SETTINGS_FILE);
}

export function save (data) {
  return writeJSONFile(SETTINGS_FILE, data);
}


function readJSONFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }

      try {
        return resolve(JSON.parse(data));
      } catch (parseError) {
        return reject(parseError);
      }
    });
  });
}

function writeJSONFile (file, data) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(file, JSON.stringify(data), {flags: 'wx'}, (err) => {
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
