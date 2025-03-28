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
  if (Number.prototype.exelToDate === undefined) {
    Number.prototype.exelToDate = function () {
      return new Date(new Date(Date.UTC(1899, 11, 30)).getTime() + this * 24 * 60 * 60 * 1000);
    }
  }
};
