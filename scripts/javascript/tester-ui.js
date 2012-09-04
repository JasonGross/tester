var TesterUI;
(function ($, jQuery) {
  TesterUI = function TesterUI(askBox, answerBox, answerButton, afterPastAnswers, depthSpan, testNum, testCount, showTests, showTestsNumber,
                               promptHolderBox,
                               progress, tests, isCorrect) {
    var self = this;
    if (isCorrect === undefined) isCorrect = function equals(expected, given) { return expected == given; };

    var curTestNum;

    var previousResults = [];

    var tester = new Tester(tests, function passOnIsCorrect() { return self.isCorrect.apply(this, arguments); });
    var shouldBeginTesting = false;
    var answerHash = answerBox.substr(1);

    this.isCorrect = isCorrect;

    this.beginTesting = function deferBeginTesting() {
      shouldBeginTesting = true;
    };

    var doNextTask;

    var onSubmit;

    $(function () {
      askBox = $(askBox);
      answerBox = $(answerBox);
      answerButton = $(answerButton)
        .click(function () {
            onSubmit();
            answerBox.focus();
            return false;
          });
      afterPastAnswers = $(afterPastAnswers);
      depthSpan = $(depthSpan);
      testNum = $(testNum);
      testCount = $(testCount);
      showTests = $(showTests);
      showTestsNumber = $(showTestsNumber);
      promptHolderBox = $(promptHolderBox);

      self.beginTesting = tester.beginTesting;
      if (shouldBeginTesting)
        self.beginTesting();
    });

    this.makeAsk = function emptyAsk(ask) { return ask; };

    tester.ask = function ask(ask, callback) {
      askBox.html("");
      askBox.append(self.makeAsk(ask));
      answerBox.attr('value', '');
      doNextTask = callback;
    };

    tester.onTest = function onTest() {
      curTestNum++;
      testNum.html(curTestNum);
      window.location.hash = '';
      window.location.hash = answerHash;
    };

    tester.beforeNewRound = function beforeNewRound(depth, callback) {
      if (depth == 0) {
        callback();
        return;
      }

      answerButton.html('Next Round');
      onSubmit = function onSubmitDoNextRound() { callback(); };
      hidePrompt();
    };

    tester.onNewRound = function onNewRound(depth, count) {
      answerButton.html('Next Question');
      onSubmit = function onSubmitDoNextTask() { doNextTask(answerBox.attr('value')); };

      showPrompt();
      if (getCheckedValue(showTests) != 'all')
        while (previousResults.length > 0)
          previousResults.shift().remove();
      depthSpan.html(depth);
      testCount.html(count);
      progress.setTotal(count)
      progress.showProgress();
      curTestNum = 0;
      tester.onTest();
    };

    function updatePreviousResults() {
      var howMany = getCheckedValue(showTests);
      try {
        if (howMany == 'one') howMany = 1;
        else if (howMany == 'none') howMany = 0;
        else if (howMany == 'custom') howMany = parseInt(showTestsNumber.attr('value'));
        else howMany = Infinity;
      } catch (err) {
        alert("The value you entered for how many tests to show is not a valid integer (" + err.description + ").  I'll assume you meant \u221E, and continue.");
        howMany = Infinity;
      }
      while (previousResults.length > howMany)
        previousResults.shift().remove();
    }

    function showLastTask(color, ask, answer) {
      var lastTest = $('<div>')
        .css({'display':'table-row', 'color':color})
        .append($('<div>')
                  .css({'display':'table-cell'})
                  .addClass('previous-answer')
                  .append(self.makeAsk(ask)))
        .append($('<div>')
                  .css({'display':'table-cell'})
                  .addClass('previous-answer')
                  .append(answer));
      afterPastAnswers.before(lastTest);
      previousResults.push(lastTest);
      updatePreviousResults();
    }

    tester.onCorrect = function onCorrect(ask, expected, given) {
      tester.onTest();
      progress.addCorrect();

      showLastTask('green', ask, given)
    };

    tester.onIncorrect = function onIncorrect(ask, expected, given) {
      tester.onTest();
      progress.addIncorrect();

      showLastTask('red', ask, 
                   $('<span>')
                    .append($('<span>')
                              .html(given))
                    .append($('<br>'))
                    .append($('<span>')
                              .html('Incorrect; The correct response was: ' + expected)));
    };

    tester.onFinish = function onFinish() {
      hidePrompt();
      answerButton.attr('disabled', 'disabled');
      alert("Congratulations!  You've gotten all the tests correct, in a row.");
    };

    function hidePrompt() {
      promptHolderBox.css({'color': 'white'});
      answerBox.hide()
    }

    function showPrompt() {
      promptHolderBox.css({'color': 'black'});
      answerBox.show()
    }

    return this;
  };
})(jQuery, jQuery);
