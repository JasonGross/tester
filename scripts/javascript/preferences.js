var Preference;
(function (undefined) {
  "use strict";
  Preference = function Preference(id, defaultValue, setValueFn, getValueFn, data, recallNow) {
    if (recallNow === undefined) recallNow = true;
    var self = this;
    
    self.store = function store(value) {
      if (value === undefined) value = getValueFn(data);
      localStorage["preferences[" + id + "]"] = JSON.stringify(value);
    };

    self.recall = function recall() {
      var value = localStorage["preferences[" + id + "]"];
      if (value === undefined) {
        value = defaultValue;
      } else {
        value = JSON.parse(value);
      }
      if (data !== undefined) {
        setValueFn(data, value);
      } else {
        setValueFn(value);
      }
      return value;
    }

    if (recallNow) {
      self.recall();
    }

  };
}());
