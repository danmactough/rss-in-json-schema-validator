const tap = require('tap');
const debug = require('debug')('test');
const validate = require('../').validate;
const data = require('./fixtures/invalid-missing-item-required-property');

tap.notOk(validate(data));
debug(validate.errors);
tap.equal(validate.errors.length, 4);
tap.ok(validate.errors.every(err => {
  return err.dataPath === '.rss.channel.item[0]';
}));
tap.ok(validate.errors.some(err => {
  return err.message === 'should have required property \'title\'';
}));
tap.ok(validate.errors.some(err => {
  return err.message === 'should have required property \'link\'';
}));
tap.ok(validate.errors.some(err => {
  return err.message === 'should have required property \'description\'';
}));
tap.ok(validate.errors.some(err => {
  return err.message === 'should match some schema in anyOf';
}));
