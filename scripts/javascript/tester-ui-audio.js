var mixinTesterAudio;
(function (defaultWidth, defaultHeight, defaultExtensions, $, jQuery) {
  var makeAudio = function makeAudio(ask) {
    var audio = $('<audio/>')
      .attr('src', ask)
      .attr('alt', ask)
      .attr('controls', 'controls');
      //      .attr('autoplay', 'autoplay');
    return audio;
  };

  mixinTesterAudio = makeMixinTesterSource(makeAudio,
                                           defaultExtensions,
                                           defaultWidth,
                                           defaultHeight);
})('300px', '', ['mp3', 'wav', 'ogg'], jQuery, jQuery);
