// from python
function sample(population, k)
{
  /* Chooses k unique random elements from a population sequence.

     Returns a new list containing elements from the population while
     leaving the original population unchanged.  The resulting list is
     in selection order so that all sub-slices will also be valid random
     samples.  This allows raffle winners (the sample) to be partitioned
     into grand prize and second place winners (the subslices).

     Members of the population need not be hashable or unique.  If the
     population contains repeats, then each occurrence is a possible
     selection in the sample.
  */

  // Sampling without replacement entails tracking either potential
  // selections (the pool) in a list or previous selections in a set.

  // When the number of selections is small compared to the
  // population, then tracking selections is efficient, requiring
  // only a small set and an occasional reselection.  For
  // a larger number of selections, the pool tracking method is
  // preferred since the list takes less space than the
  // set and it doesn't suffer from frequent reselections.

  var n = population.length;
  if (k === undefined) k = n;
  if (!(0 <= k && k <= n))
    throw new Error("sample larger than population"); // ValueError
  //random = self.random
  //_int = int
  var result = new Array(k);
  var setsize = 21; // size of a small set minus size of an empty list
  if (k > 5)
    setsize += Math.pow(4, Math.ceil(Math.log(k * 3) / Math.log(4))); // table size for big sets
  if (n <= setsize) { // ||  hasattr(population, "keys"):
    // An n-length list is smaller than a k-length set, or this is a
    // mapping type so the other algorithm wouldn't work.
    var pool = population.slice(0); // Make a copy of population
    for (var i = 0; i < k; i++) { // invariant:  non-selected at [0,n-i)
      var j = Math.floor(Math.random() * (n-i));
      result[i] = pool[j];
      pool[j] = pool[n-i-1];  // move non-selected item into vacancy
    }
  } else {
    var selected = {};
    selected_add = function (value) { selected[value] = true; }
    for (var i = 0; i < k; i++) {
      var j = Math.floor(Math.random() * n);
      while (j in selected)
        j = Math.floor(Math.random() * n);
      selected_add(j);
      result[i] = population[j];
    }
  }
  return result;
}

var urlParameters = {
  'getURLParameters' : function getURLParameters(parameters) { // 'foo' : function foo(...) makes foo.name == 'foo'
    if (!(parameters instanceof Array)) parameters = [parameters];
    var rtn = {};
    jQuery.each(parameters, function (index, parameter) {
      if (urlParameters.hasURLParameter(parameter))
        rtn[parameter] = urlParameters.getURLParameter(parameter);
    });
    return rtn;
  },

  //=============================================================
  // From http://www.netlobo.com/url_query_string_javascript.html
  'getURLParameter' : function getURLParameter(name, ignoreCase, nullValue) {
    if (ignoreCase === undefined) ignoreCase = true;
    if (nullValue === undefined) nullValue = '';
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp(regexS, (ignoreCase ? 'i' : ''));
    var results = regex.exec(window.location.search);
    if (results == null)
      return nullValue;
    else
      return results[1];
  },

  'hasURLParameter': function hasURLParameter(name, ignoreCase) {
    if (ignoreCase === undefined) ignoreCase = true;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"([&#=])";
    var regex = new RegExp(regexS, (ignoreCase ? 'i' : ''));
    var results = regex.exec(window.location.search+'#');
    return (results != null);
  }
  //=============================================================
};

//===================================================================
// From http://www.somacon.com/p143.php

// return the value of the radio button that is checked
// return an empty string if none are checked, or
// there are no radio buttons
function getCheckedValue(radioObj) {
  if (!radioObj)
    return "";
  var radioLength = radioObj.length;
  if (radioLength === undefined)
    if (radioObj.checked)
      return radioObj.value;
    else
      return "";
  for (var i = 0; i < radioLength; i++) {
    if (radioObj[i].checked) {
      return radioObj[i].value;
    }
  }
  return "";
}

// set the radio button with the given value as being checked
// do nothing if there are no radio buttons
// if the given value does not exist, all the radio buttons
// are reset to unchecked
function setCheckedValue(radioObj, newValue) {
  if (!radioObj)
    return;
  var radioLength = radioObj.length;
  newValue = '' + newValue;
  if (radioLength === undefined) {
    radioObj.checked = (newValue == radioObj.value);
    return;
  }
  for (var i = 0; i < radioLength; i++) {
    radioObj[i].checked = (newValue == radioObj[i].value);
  }
}
//===================================================================
