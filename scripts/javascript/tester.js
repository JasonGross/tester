var Tester;
(function () {
  Tester = function Tester(tests, isCorrect) {
    var self = this;
    if (isCorrect === undefined) isCorrect = function equals(expected, given) { return expected == given; };

    this.isCorrect = isCorrect;

    this.ask = function emptyPrompt(ask, callback) { callback(undefined); }; 

    this.onCorrect = function correctEvent(ask, expected, given) {};
    this.onIncorrect = function incorrectEvent(ask, expected, given) {};
    this.onNewRound = function newRoundEvent(depth, count) {};
    this.onFinish = function onFinish() {};

    // restores the state.  Returns false on success, or the error on failure
    this.restoreState = function restoreState() {
      try {
        var state = JSON.parse(localStorage['current state']);
        triggerOnNewRound(state);
        doNextTest(state);
        return false;
      } catch (ex) {
        return ex;
      }
    };

    this.clearState = function clearState() {
      localStorage['current state'] = undefined;
    }

    function doNextTest(state) {
      localStorage['current state'] = JSON.stringify(state); // save state

      var test = state['current round left'].pop();
      console.log(JSON.stringify(test));
      console.log(JSON.stringify(state));
      if (test !== undefined) {
        self.ask(test[0], function gotResponse(given) {
          if (self.isCorrect(test[1], given)) {
            self.onCorrect(test[0], test[1], given);
          } else {
            self.onIncorrect(test[0], test[1], given);
            // note that the user got this test wrong, for the next round
            state['indices wrong'][0].push(test);
          }
          doNextTest(state);
        });
      } else {
        if (state['indices wrong'][0].length == 0) {
          // if the user gets nothing wrong, remove the empty list of things wrong,
          // and the list of things prompted in this round
          state['indices wrong'].shift();
          state['indices wrong'].shift();
        }
        doNextTestingRound(state);
      }
    }

    function hasMoreTestingRounds(state) {
      return state['indices wrong'].length > 0;
    }

    function triggerOnNewRound(state) {
      var rounds = state['indices wrong'];
      self.onNewRound(rounds.length - 2, rounds[1].length); // 0 based index
    }

    function doNextTestingRound(state) {
      if (hasMoreTestingRounds(state)) {
        var rounds = state['indices wrong'];
        state['current round left'] = sample(rounds[0]);
        state['indices wrong'].unshift([]);
        triggerOnNewRound(state);
        doNextTest(state);
      } else {
        self.clearState();
        self.onFinish();
      }
    }

    this.beginTesting = function beginTesting(tryRestore) {
      if (tryRestore === undefined) tryRestore = true;
      if (!tryRestore || self.restoreState()) { // self.restoreState() is true if there was an exception
        var state = {'tests':tests, 'current round left':undefined, 'indices wrong':[sample(tests)]};
        doNextTestingRound(state);
      }
    };

    return this;
  };
})();
