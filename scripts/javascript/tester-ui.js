var TesterUI;
(function ($, jQuery) {
  TesterUI = function TesterUI(askBox, answerBox, answerButton, afterPastAnswers, depthSpan, testNum, testCount, showTests, showTestsNumber,
                               progress, tests, isCorrect) {
    var self = this;

    var curTestNum;

    var previousResults = [];

    var tester = new Tester(tests, isCorrect);
    var shouldBeginTesting = false;
    var answerHash = answerBox.substr(1);

    this.beginTesting = function deferBeginTesting() {
      shouldBeginTesting = true;
    };

    var doNextTask;

    $(function () {
      askBox = $(askBox);
      answerBox = $(answerBox);
      answerButton = $(answerButton)
        .click(function () { doNextTask(answerBox.attr('value')); return false; });
      afterPastAnswers = $(afterPastAnswers);
      depthSpan = $(depthSpan);
      testNum = $(testNum);
      testCount = $(testCount);
      showTests = $(showTests);
      showTestsNumber = $(showTestsNumber);

      self.beginTesting = tester.beginTesting;
      if (shouldBeginTesting)
        self.beginTesting();
    });

    tester.ask = function ask(ask, callback) {
      askBox.html(ask);
      answerBox.attr('value', '');
      doNextTask = callback;
    };

    tester.onTest = function onTest() {
      curTestNum++;
      testNum.html(curTestNum);
      window.location.hash = '';
      window.location.hash = answerHash;
    };

    tester.onNewRound = function onNewRound(depth, count) {
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
                  .append(ask))
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
      alert("Congratulations!  You've gotten all the tests correct, in a row.");
      answerButton.attr('disabled', 'disabled');
    };

    return this;
  };
})(jQuery, jQuery);
