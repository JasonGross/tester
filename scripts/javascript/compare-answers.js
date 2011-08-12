var setupCompareAnswers;
(function ($, jQuery) {
  setupCompareAnswers = function setupCompareAnswers(setAreSame, inputs, answerTextArea, ignoreCase, squishSpaces, stripSpaces, ignoreWhitespace) {
    $(function () {
      inputs = $(inputs);
      answerTextArea = $(answerTextArea);
      ignoreCase = $(ignoreCase);
      squishSpaces = $(squishSpaces);
      stripSpaces = $(stripSpaces);
      ignoreWhitespace = $(ignoreWhitespace);

      answerTextArea.change(function () {
        var func;
        try {
          func = eval(answerTextArea.attr('value').replace(/[\n\r]/g, " "));
        } catch (err) {
          console.log(err);
          alert("Error in evaluating comparison function: " + err.message);
          return;
        }
        if (func === undefined)
          alert('Comparison function evaluated to undefined');
        else if (typeof func !== 'function')
          alert('Comparison function (' + func + ') was not of type function');
        else
          setAreSame(func);
      });

      inputs.change(function () {
        var rtn = "var areSame = function areSame(a, b) {\n";

        var setter = '';
        if (ignoreCase.attr('checked') == 'checked')
          setter += '.toLowerCase()'
        if (ignoreWhitespace.attr('checked') == 'checked')
          setter += '.replace(/[\\t\\n\\r ]+/g, "")';
        else {
          if (squishSpaces.attr('checked') == 'checked')
            setter += '.replace(/[\\t\\n\\r ]+/g, " ")';
          if (stripSpaces.attr('checked') == 'checked')
            setter += '.replace(/(^[\\t\\n\\r ]+|[\\t\\n\\r ]+$)/g, "")'
        }

        rtn += '  a = a' + setter + ";\n";
        rtn += '  b = b' + setter + ";\n";
        rtn += "  return a == b;\n";

        rtn += "};\nareSame";
        answerTextArea.attr('value', rtn);
        answerTextArea.change();
      }).change();
    });
  };
})(jQuery, jQuery);
