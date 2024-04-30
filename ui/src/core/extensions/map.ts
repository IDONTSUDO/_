export const MapExtensions = () => {
  if (Map.prototype.addValueOrMakeCallback === undefined) {
    // eslint-disable-next-line no-extend-native
    Map.prototype.addValueOrMakeCallback = function (key, value, fn) {
      if (this.has(key)) {
        this.set(key, value);
        fn(this);
        return;
      } else {
        this.set(key, value);
      }
    };
  }
  if (Map.prototype.getKeyFromValueIsExists === undefined) {
    // eslint-disable-next-line no-extend-native
    Map.prototype.getKeyFromValueIsExists = function (value) {
      let result;
      this.forEach((el, key) => {
        if (el === value) {
          result = key;
        }
      });
      return result;
    };
  }
  if (Map.prototype.overrideValue === undefined) {
    // eslint-disable-next-line no-extend-native
    Map.prototype.overrideValue = function (key, value) {
      const result = this.get(key);

      this.set(key, Object.assign(result, value));
    };
  }
  if (Map.prototype.keysToJson === undefined) {
    // eslint-disable-next-line no-extend-native
    Map.prototype.keysToJson = function () {
      const result: any[] = [];
      this.forEach((el) => result.push(el));
      return JSON.stringify(result);
    };
  }
  if (Map.prototype.toArray === undefined) {
    // eslint-disable-next-line no-extend-native
    Map.prototype.toArray = function () {
      return Array.from(this.values());
    };
  }
  if (Map.prototype.getPredicateValue === undefined) {
    // eslint-disable-next-line no-extend-native
    Map.prototype.getPredicateValue = function (callBack) {
      const result: any[] = [];
      this.forEach((el, key) => {
        const callBackExecute = callBack(el);
        if (callBackExecute) {
          result.push(key);
        }
      });
      return result;
    };
  }
};
