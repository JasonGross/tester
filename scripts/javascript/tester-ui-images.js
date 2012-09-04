var mixinTesterImages;
(function (defaultWidth, defaultHeight, defaultExtensions, $, jQuery) {
  var makeIsURLByExtensions = function makeIsURLByExtensions(extensions) {
    if (extensions === undefined) extensions = defaultExtensions;

    var useExtensions = [];
    jQuery.each(extensions, function (index, ext) {
      useExtensions.push(ext.toLowerCase());
    });

    return function isURLByExtensions(url) {
      url = url.toLowerCase();
      var len = url.length;
      var rtn = false;
      jQuery.each(useExtensions, function (index, ext) {
        if (url.substr(len - ext.length - 1) === '.' + ext) {
          rtn = true;
        }
      });
      return rtn;
    };
  };

  mixinTesterImages = function mixinTesterImages(tester, width, height, isImage) {
    if (width === undefined) width = defaultWidth;
    if (height === undefined) height = defaultHeight;
    if (isImage === undefined) isImage = defaultExtensions;
    if (!isFunction(isImage)) isImage = makeIsURLByExtensions(isImage);

    var oldAsk = tester.makeAsk;
    tester.makeAsk = function askWithImages(ask) {
      if (isImage(ask)) {
        var image = $('<img/>')
          .attr('src', ask)
          .attr('alt', ask)
          .width(width)
          .height(height);
        return image;
      } else {
        return oldAsk(ask);
      }
    };
  };
})('100px', '', ['jpg', 'jpeg', 'svg', 'png', 'bmp', 'gif', 'xbm'], jQuery, jQuery);
