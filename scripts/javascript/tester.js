var Tester;
(function () {
  Tester = function Tester(tests, isCorrect) {
    var self = this;
    if (isCorrect === undefined) isCorrect = function equals(expected, given) { return expected == given; };

    this.isCorrect = isCorrect;

    this.ask = function emptyPrompt(ask, callback) { callback(undefined); }; 

    this.onCorrect = function correctEvent(ask, expected, given) {};
    this.onIncorrect = function incorrectEvent(ask, expected, given) {};
    this.beforeNewRound = function beforeNewRoundEvent(nextDepth, callback) { callback(); };
    this.onNewRound = function newRoundEvent(depth, count) {};
    this.onFinish = function onFinishEvent() {};

    function doTestingRound(tests, depth, callback) {
      self.beforeNewRound(depth, function () {
        var nextTests;
        self.onNewRound(depth, tests.length);
        nextTests = [];

        function doNextTest(testsLeft) {
          if (testsLeft.length > 0) {
            var test = testsLeft.pop();
            self.ask(test[0], function gotResponse(given) {
              if (self.isCorrect(test[1], given)) {
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
              if (callback)
                callback();
              else
                self.onFinish();
            }
          }
        }

        doNextTest(sample(tests)); // order randomly
      });
    }

    this.beginTesting = function beginTesting() {
      doTestingRound(tests, 0);
    };

    return this;
  };
})();
