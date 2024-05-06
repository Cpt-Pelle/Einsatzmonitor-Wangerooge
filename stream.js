
window.onload = function() {
  var iframe = document.createElement("iframe");
  iframe.src = "https://player.livespotting.tv/jwp.html?alias=PS_ea834";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  document.getElementById("livecam").appendChild(iframe);

  // Nachricht an das iframe senden, um das Video zu starten
  setTimeout(function() {
      iframe.contentWindow.postMessage('play', '*');
  }, 5000); // Verzögerung von 5 Sekunden
}

// Nachricht vom iframe empfangen
window.addEventListener('message', function(event) {
  // Hier kannst du auf Nachrichten vom iframe reagieren, falls nötig
}, false);

window.addEventListener('message', function(event) {
    // Wenn die Nachricht "play" ist, starte das Video
    console.log("Nachricht empfangen:", event.data);
    if (event.data === 'play') {
        var video = document.querySelector('video');
        if (video) {
            video.play();
        }
    }
}, false);