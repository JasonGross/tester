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
