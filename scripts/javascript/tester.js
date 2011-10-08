/*global sample*/
var Tester;
(function (undefined) {
  "use strict";
  Tester = function Tester(tests, isCorrect) {
    var self = this;
    if (isCorrect === undefined) isCorrect = function equals(expected, given) { return expected === given; };

    self.isCorrect = isCorrect;

    self.ask = function emptyPrompt(ask, callback) { callback(undefined); }; 

    self.onCorrect = function correctEvent(ask, expected, given) {};
    self.onIncorrect = function incorrectEvent(ask, expected, given) {};
    self.beforeNewRound = function beforeNewRoundEvent(nextDepth, callback) { callback(); };
    self.onNewRound = function newRoundEvent(depth, count) {};
    self.onFinish = function onFinishEvent() {};

    function doTestingRound(tests, depth, callback) {
      self.beforeNewRound(depth, function () {
        var nextTests = [];
        self.onNewRound(depth, tests.length);

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
              if (callback) {
                callback();
              } else {
                self.onFinish();
              }
            }
          }
        }

        doNextTest(sample(tests)); // order randomly
      });
    }

    self.beginTesting = function beginTesting() {
      doTestingRound(tests, 0);
    };

    return self;
  };
}());
