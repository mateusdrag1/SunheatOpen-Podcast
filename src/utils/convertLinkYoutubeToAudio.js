export function convertLinkYoutubeToAudio(link) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = link.match(regExp);
  var videoID = "1XKn6wLjJTs"
  
  fetch('https://cors-anywhere.herokuapp.com/' + "https://"+videoID+"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D" + videoID).then(response => {

    if (response.ok) {
      response.text().then(ytData => {

        // parse response to find audio info
        var ytData = parse_str(ytData);
        var getAdaptiveFormats = JSON.parse(ytData.player_response).streamingData.adaptiveFormats;
        var findAudioInfo = getAdaptiveFormats.findIndex(obj => obj.audioQuality);

        // get the URL for the audio file
        var audioURL = getAdaptiveFormats[findAudioInfo].url;

        return audioURL

      });
    }
  });


  function parse_str(str) {
    return str.split('&').reduce(function (params, param) {
      var paramSplit = param.split('=').map(function (value) {
        return decodeURIComponent(value.replace('+', ' '));
      });
      params[paramSplit[0]] = paramSplit[1];
      return params;
    }, {});
  }
}