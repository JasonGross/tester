var mixinTesterImages;
(function (defaultWidth, defaultHeight, defaultExtensions, $, jQuery) {
  var makeImage = function makeImage(ask) {
    var image = $('<img/>')
      .attr('src', ask)
      .attr('alt', ask);
    return image;
  };

  mixinTesterImages = makeMixinTesterSource(makeImage,
                                            defaultExtensions,
                                            defaultWidth,
                                            defaultHeight);
})('100px', '', ['jpg', 'jpeg', 'svg', 'png', 'bmp', 'gif', 'xbm'], jQuery, jQuery);
