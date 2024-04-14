export const NumberExtensions = () => {
  if (Number.prototype.isNegative === undefined) {
    Number.prototype.isNegative = function () {
      return this < 0;
    };
  }
  if (Number.prototype.isPositive === undefined) {
    Number.prototype.isPositive = function () {
      return this > 0;
    };
  }
};
