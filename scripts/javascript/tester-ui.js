var TesterUI;
(function ($, jQuery) {
  TesterUI = function TesterUI(askBox, answerBox, answerButton, pastAnswersDiv, tests, isCorrect) {
    var self = this;

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
        .click(function () { doNextTask(); });
      pastAnswersDiv = $(pastAnswersDiv);

      self.beginTesting = tester.beginTesting;
      if (shouldBeginTesting)
        self.beginTesting();
    });

    tester.ask = function ask(ask, callback) {
      askBox.html(ask);
      answerBox.html('');
      doNextTask = callback;
    };

    return this;
  };
})(jQuery, jQuery);
