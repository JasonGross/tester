var Tester;
(function () {
  Tester = function Tester(tests, isCorrect) {
    var self = this;
    if (isCorrect === undefined) isCorrect = function equals(expected, given) { return expected == given; };

    this.ask = function emptyPrompt(ask, callback) { callback(undefined); }; 

    this.onCorrect = function correctEvent(ask, expected, given) {};
    this.onIncorrect = function incorrectEvent(ask, expected, given) {};
    this.onNewRound = function newRoundEvent(depth, count) {};

    function doTestingRound(tests, depth, callback) {
      var nextTests;
      self.onNewRound(depth, tests.length);
      nextTests = [];

      function doNextTest(testsLeft) {
        if (testsLeft.length > 0) {
          var test = testsLeft.pop();
          self.ask(test[0], function gotResponse(given) {
            if (isCorrect(test[1], given)) {
              self.onCorrect(test[0], test[1], given);
            } else {
              self.onIncorrect(test[0], test[1], given);
              nextTests.push(test);
            }
            doNextTest(testsLeft);
          });
        } else {
          if (nextTests.length > 0) {
            doTestingRound(nextTests, depth + 1, function () {
              doTestingRound(tests, depth, callback);
            });
          } else {
            callback();
          }
        }
      }

      doNextTest(sample(tests)); // order randomly
    }

    this.beginTesting = function beginTesting() {
      doTestingRound(tests, 0);
    };

    return this;
  };
})();
