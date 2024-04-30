/* eslint-disable @typescript-eslint/no-this-alias */
export const ArrayExtensions = () => {
  if ([].equals === undefined) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.equals = function (array, strict = true) {
      if (!array) return false;

      if (arguments.length === 1) strict = true;

      if (this.length !== array.length) return false;

      for (let i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
          if (!this[i].equals(array[i], strict)) return false;
        } else if (strict && this[i] !== array[i]) {
          return false;
        } else if (!strict) {
          return this.sort().equals(array.sort(), true);
        }
      }
      return true;
    };
  }
  if ([].lastElement === undefined) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.lastElement = function () {
      const instanceCheck = this;
      if (instanceCheck === undefined) {
        return undefined;
      } else {
        const instance = instanceCheck as [];
        return instance[instance.length - 1];
      }
    };
  }
  if ([].isEmpty === undefined) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.isEmpty = function () {
      return this.length === 0;
    };
  }
  if ([].isNotEmpty === undefined) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.isNotEmpty = function () {
      return this.length !== 0;
    };
  }
  if ([].hasIncludeElement === undefined) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.hasIncludeElement = function (element) {
      return this.indexOf(element) !== -1;
    };
  }
  if ([].repeat === undefined) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.repeat = function (quantity) {
      return Array(quantity).fill(this).flat(1);
    };
  }
};
