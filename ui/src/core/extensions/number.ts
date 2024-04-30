export const NumberExtensions = () => {
  if (Number().fromArray === undefined) {
    // eslint-disable-next-line no-extend-native
    Number.prototype.fromArray = function () {
      return Array.from(this.toString()).map((el) => Number(el));
    };
  }
  if (Number().toPx === undefined) {
    // eslint-disable-next-line no-extend-native
    Number.prototype.toPx = function () {
      return String(this) + "px";
    };
  }
  if (Number().unixFromDate === undefined) {
    // eslint-disable-next-line no-extend-native
    Number.prototype.unixFromDate = function () {
      const date = new Date(Number(this) * 1000);
      return `${date.getUTCFullYear()}.${date.getMonth()}.${date.getDay()}  ${date.getHours()}:${date.getMinutes()}`;
    };
  }
  if (Number().isValid === undefined) {
    // eslint-disable-next-line no-extend-native
    Number.prototype.isValid = function (str: string) {
      return !isNaN(Number(str));
    };
  }
  if (Number().randRange === undefined) {
    // eslint-disable-next-line no-extend-native
    Number.prototype.randRange = function (min, max) {
      return Math.random() * (max - min) + min;
    };
  }
  if (Number().isPositive === undefined) {
    // eslint-disable-next-line no-extend-native
    Number.prototype.isPositive = function () {
      return Math.sign(Number(this)) === 1;
    };
  }
  if(Number().isNegative === undefined){
    // eslint-disable-next-line no-extend-native
    Number.prototype.isNegative = function (){
      return !this.isPositive()
    }
  }
};
