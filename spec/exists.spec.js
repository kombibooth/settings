import { expect } from 'chai';
import osHomedir from 'os-homedir';
import { sep } from 'path';
import mock from 'mock-fs';

import * as setting from '../src/';

describe('exists', () => {
  it('should be able to indicate that file exists', async () => {
    const dir = {};
    dir[`${osHomedir()}${sep}.kombibooth.json`] = '{"a":"foo", "b":"bar"}';
    mock(dir);
    const result = await setting.exists();
    expect(result).to.be.equal(true);
  });

  it('should be able to indicate that file does not exists', async () => {
    const result = await setting.exists();
    expect(result).to.be.equal(false);
  });
});
