import { expect } from 'chai';

import { readFile, fileExists } from './spec-helper';
import * as setting from '../src/';

describe('install', () => {
  it('should create kombibooth file with default properties', async () => {
    await setting.install();

    // relay on mock-fs that throws error when file does not exists
    await fileExists(setting.SETTINGS_FILE);

    const settings = await readFile(setting.SETTINGS_FILE);
    expect(settings).to.be.deep.equal(JSON.stringify(setting.DEFAULT_SETTINGS));
  });
});
