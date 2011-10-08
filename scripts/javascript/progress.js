var Progress;
(function ($, jQuery) {
  Progress = function Progress(total,
                               progressSelector, progressMessageSelector, progressBarHolderSelector,
                               actualProgressBarSelector, overlayProgressBarSelector, correctProgressBarSelector,
                               incorrectProgressBarSelector, correctTextSelector, incorrectTextSelector,
                               scoredTextSelector) {
    var self = this;

    var numRight = 0, numWrong = 0, numOther = 0;

    var progress, progressMessage, progressBarHolder, actualProgressBar,
        overlayProgressBar, correctProgressBar, incorrectProgressBar,
        correctText, incorrectText, scoredText;
    $(function () {
      progress = $(progressSelector);
      progress.html(progress.html().replace(/>(\s|\n)+</g, '><')); // this must be up here, or we lose the elements the following variables point to
      progressMessage = $(progressMessageSelector);
      progressBarHolder = $(progressBarHolderSelector);
      actualProgressBar = $(actualProgressBarSelector).progressbar({'value':0});
      overlayProgressBar = $(overlayProgressBarSelector);
      correctProgressBar = $(correctProgressBarSelector);
      incorrectProgressBar = $(incorrectProgressBarSelector);

      correctText = $(correctTextSelector);
      incorrectText = $(incorrectTextSelector);
      scoredText = $(scoredTextSelector);

      progress.show();
      correctProgressBar.height(actualProgressBar.height());
      incorrectProgressBar.height(actualProgressBar.height());
      overlayProgressBar.height(actualProgressBar.height());
      progress.hide();

    });
    

    this.setTotal = function setTotal(newTotal) {
      numRight = numWrong = numOther = 0;
      total = newTotal;
      self.updateProgress();
    };

    this.addCorrect = function addCorrect(addNumRight) {
      if (addNumRight === undefined) addNumRight = 1;
      numRight += addNumRight;
      self.updateProgress();
    };

    this.addIncorrect = function addIncorrect(addNumWrong) {
      if (addNumWrong === undefined) addNumWrong = 1;
      numWrong += addNumWrong;
      self.updateProgress();
    };

    this.addOther = function addOther(addNumOther) {
      if (addNumOther === undefined) addNumOther = 1;
      numOther += addNumOther;
      self.updateProgress();
    };

    this.updateProgress = function updateProgress(newNumRight, newNumWrong, newNumOther) {
      if (newNumRight !== undefined) numRight = newNumRight;
      if (newNumWrong !== undefined) numWrong = newNumWrong;
      if (newNumOther !== undefined) numOther = newNumOther;
      var numDone = numRight + numWrong + numOther;
      // jQuery's progress bar is silly and rounds things.
      // So we need to round the total (but not the individual parts).
      var percentPerAnswer = (numDone != 0) ? (Math.round(numDone * 100 / total) / numDone) : 0;
      correctProgressBar.width((numRight * percentPerAnswer) + '%');
      incorrectProgressBar.width((numWrong * percentPerAnswer) + '%');
      actualProgressBar.progressbar('option', 'value', numDone * 100 / total);
      correctText.html(numRight);
      incorrectText.html(numWrong);
      scoredText.html(numDone);
    };

    this.showProgress = function showProgress() { progress.show(); };
    this.hideProgress = function hideProgress() { progress.hide(); };

    return this;
  };
})(jQuery, jQuery);
