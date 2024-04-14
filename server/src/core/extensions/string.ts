export const StringExtensions = () => {
  if ("".isEmpty === undefined) {
    // eslint-disable-next-line no-extend-native
    String.prototype.isEmpty = function () {
      return this.length === 0;
    };
  }
  if ("".pathNormalize === undefined) {
    String.prototype.pathNormalize = function () {
      return this.replace("//", "/");
    };
  }
  if ("".isNotEmpty === undefined) {
    // eslint-disable-next-line no-extend-native
    String.prototype.isNotEmpty = function () {
      return this.length !== 0;
    };
  }
  if ("".lastElement === undefined) {
    String.prototype.lastElement = function () {
      return this[this.length - 1];
    };
  }
  if ("".hasPattern === undefined) {
    String.prototype.hasPattern = function (pattern) {
      return new RegExp(pattern).test(this);
    };
  }
  if ("".hasNoPattern === undefined) {
    String.prototype.hasNoPattern = function (pattern) {
      return !this.hasPattern(pattern);
    };
  }
};
