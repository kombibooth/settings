import { expect } from 'chai';
import { sep } from 'path';
import osHomedir from 'os-homedir';
import mock from 'mock-fs';

import './spec-helper';
import * as setting from '../src/';


describe('load', () => {
  it('should throw error when file does not exists', async () => {
    let hasError = false;
    try {
      await setting.load();
    } catch (error) {
      hasError = true;
    }
    expect(hasError).to.be.equal(true);
  });

  it('should be able to read settings', async () => {
    const dir = {};
    dir[`${osHomedir()}${sep}.kombibooth.json`] = '{"a":"foo", "b":"bar"}';
    mock(dir);

    const result = await setting.load();
    expect(result).to.deep.equal({
      a: 'foo',
      b: 'bar',
    });
  });

  it('should throw error when json is not valid', async () => {
    const dir = {};
    dir[`${osHomedir()}${sep}.kombibooth.json`] = '{a, b}';
    mock(dir);

    let hasError = false;
    try {
      await setting.load();
    } catch (error) {
      hasError = true;
    }

    expect(hasError).to.be.equal(true);
  });
});
