import 'babel-polyfill';
import zipObject from 'lodash/zipObject';
import parseNumerics from '../src';
import chai from 'chai';
chai.should();

const expectedArray = [ 1, 2.2, 3, 4 ];
const expectedObjectKeys = [ 'a', 'b', 'c', 'd' ];
const expectedObject = zipObject(expectedObjectKeys, expectedArray);
describe('parseNumerics', () => {
  it('should parse a fully numeric array', () => {
    const sampleArray = [ 1, 2.2, 3, 4 ];
    parseNumerics(sampleArray).should.eql(expectedArray);
    parseNumerics(zipObject(expectedObjectKeys, expectedArray)).should.eql(expectedObject);
  });
  it('should convert numeric strings to numbers', () => {
    const sampleArray = [ '1', '2.2', 3, 4 ];
    parseNumerics(sampleArray).should.eql(expectedArray);
    parseNumerics(zipObject(expectedObjectKeys, sampleArray)).should.eql(expectedObject);
  });
  it('should convert numeric strings and leave other things alone', () => {
    const sampleArray = [ '1', '2.2', 3, 'train' ];
    const expectedArrayInner = [ 1, 2.2, 3, 'train' ];
    const expectedObjectInner = zipObject(expectedObjectKeys, expectedArrayInner);
    parseNumerics(sampleArray).should.eql(expectedArrayInner);
    parseNumerics(zipObject(expectedObjectKeys, sampleArray)).should.eql(expectedObjectInner);
  });
  it('should parse percent strings as well', () => {
    const sampleArray = [ '1%', '2.2', 3, 4 ];
    parseNumerics(sampleArray).should.eql(expectedArray);
    parseNumerics(zipObject(expectedObjectKeys, sampleArray)).should.eql(expectedObject);
  });
});
