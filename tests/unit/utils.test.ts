
import { set_to_object, object_to_set } from '../../src/util';

describe('util-functions', () => {

  const emptySet = new Set<string>();
  const testSet = new Set<string>();
  testSet.add("a");
  testSet.add("b");
  testSet.add("c");

  const emptyObject = {};
  const testObject = {
    a: true,
    b: true,
    c: true,
  };

  test('set-to-object', () => {
    expect(set_to_object(testSet)).toStrictEqual(testObject);
  });

  test('empty-set-to-object', () => {
    expect(set_to_object(emptySet)).toStrictEqual(emptyObject);
  });

  test('object-to-set', () => {
    expect(object_to_set(testObject)).toStrictEqual(testSet);
  });

  test('empty-object-to-set', () => {
    expect(object_to_set(emptyObject)).toStrictEqual(emptySet);
  });

})
