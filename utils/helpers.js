module.exports.nullToEmptyString = function(value) {
	return value === null ? '' : value;
};

module.exports.nullToZero = function(value) {
	return value === null ? 0 : value;
};
