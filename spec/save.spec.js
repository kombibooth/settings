import { expect } from 'chai';

import { readFile, fileExists } from './spec-helper';
import * as setting from '../src/';

describe('save', () => {
  it('should be able to save a setting file', async () => {
    const settings = {
      a: 1,
      b: 2,
    };

    const result = await setting.save(settings);
    expect(result).to.have.property('a', 1);

    // relay on mock-fs that throws error when file does not exists
    await fileExists(setting.SETTINGS_FILE);
  });

  it('should not be able to save because invalid json format', async () => {
    const obj = {
      a: 'foo',
    };

    obj.b = obj;

    let hasError = false;

    try {
      await setting.save(obj);
    } catch (error) {
      hasError = true;
      expect(error).to.be.instanceOf(TypeError);
    }

    expect(hasError).to.be.equal(true);
  });

  it('should be able to override settings', async () => {
    await setting.save({test: true});
    const result = await setting.save({a: 'b'});
    expect(result).to.have.property('a', 'b');
    const settings = await readFile(setting.SETTINGS_FILE);
    expect(settings).to.be.equal('{"a":"b"}');
  });
});
