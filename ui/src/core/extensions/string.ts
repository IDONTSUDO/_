/* eslint-disable no-extend-native */
export const StringExtensions = () => {
  if ("".isEmpty === undefined) {
    // eslint-disable-next-line no-extend-native
    String.prototype.isEmpty = function () {
      return this.length === 0;
    };
  }
  if ("".isNotEmpty === undefined) {
    // eslint-disable-next-line no-extend-native
    String.prototype.isNotEmpty = function () {
      return this.length !== 0;
    };
  }
  if ("".replaceMany === undefined) {
    String.prototype.replaceMany = function (searchValues: string[], replaceValue: string) {
      let result = this as string;
      searchValues.forEach((el) => {
        result = result.replaceAll(el, replaceValue);
      });
      return result;
    };
  }
  if ("".isEqual === undefined) {
    String.prototype.isEqual = function (str: string) {
      return this === str;
    };
  }
  if ("".isEqualMany === undefined) {
    String.prototype.isEqualMany = function (str: string[]) {
      for (const el of str) {
        if (el === this) {
          return true;
        }
      }
      return false;
    };
  }
};
