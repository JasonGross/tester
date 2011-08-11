var TesterUI;
(function ($, jQuery) {
  TesterUI = function TesterUI(askBox, answerBox, answerButton, pastAnswersDiv, depthSpan, testNum, testCount, progress, tests, isCorrect) {
    var self = this;

    var curTestNum;

    var tester = new Tester(tests, isCorrect);
    var shouldBeginTesting = false;

    this.beginTesting = function deferBeginTesting() {
      shouldBeginTesting = true;
    };

    var doNextTask;

    $(function () {
      askBox = $(askBox);
      answerBox = $(answerBox);
      answerButton = $(answerButton)
        .click(function () { doNextTask(answerBox.attr('value')); });
      pastAnswersDiv = $(pastAnswersDiv);
      depthSpan = $(depthSpan);
      testNum = $(testNum);
      testCount = $(testCount);

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
    };

    tester.onNewRound = function onNewRound(depth, count) {
      depthSpan.html(depth);
      testCount.html(count);
      progress.setTotal(count)
      progress.showProgress();
      curTestNum = 0;
      tester.onTest();
    };

    tester.onCorrect = function onCorrect() {
      tester.onTest();
      progress.addCorrect();
    };

    tester.onIncorrect = function onIncorrect() {
      tester.onTest();
      progress.addIncorrect();
    };

    return this;
  };
})(jQuery, jQuery);
