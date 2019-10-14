const helpers = require('../utils/helpers');
const assert = require('chai').assert;

describe('Null to empty string function', () => {
	it('transform a null value to a empty string', () => {
		var response = helpers.nullToEmptyString(null);
		assert.isEmpty(response);
	});

	it('return same string when is not null', () => {
		var stringTest = 'not empty';
		var response = helpers.nullToEmptyString(stringTest);
		assert(response === stringTest);
	});
});

describe('Null to zero function', () => {
	it('transform null to zero', () => {
		assert(helpers.nullToZero(null) === 0);
	});
});
