var makeMixinTesterSource;
(function (defaultDefaultWidth, defaultDefaultHeight, $, jQuery) {
  makeMixinTesterSource = function makeMixinTesterSource(makeElement, defaultExtensions, defaultWidth, defaultHeight) {
    if (defaultWidth === undefined) defaultWidth = defaultDefaultWidth;
    if (defaultHeight === undefined) defaultHeight = defaultDefaultHeight;

    return function mixinTesterSource(tester, width, height, isSource) {
      if (width === undefined) width = defaultWidth;
      if (height === undefined) height = defaultHeight;
      if (isSource === undefined) isSource = defaultExtensions;
      if (!isFunction(isSource)) isSource = makeIsURLByExtensions(isSource);

      var oldAsk = tester.makeAsk;
      tester.makeAsk = function askWithSource(ask) {
        if (isSource(ask)) {
          var elem = makeElement(ask)
            .width(width)
            .height(height);
          return elem;
        } else {
          return oldAsk(ask);
        }
      };
    };
  };
})('100px', '', jQuery, jQuery);
