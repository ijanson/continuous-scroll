if (document.scrollingElement !== null) {
  var interval: number = 0;
  var speed: number = 50;
  var enabled: boolean = false;

  browser.storage.local.get().then((val) => { 
    "enabled" in val && (enabled = val.enabled);
    "speed" in val && (speed = val.speed);
  });

  document.addEventListener("keydown", function (k) {
    if (enabled) {
      switch (k.key) {
        case "ArrowDown":
          interval = !interval? window.setInterval((function () {
            document.scrollingElement!.scrollBy(0, speed);
          }), 1) : interval;
          k.preventDefault();
          break;
        case "ArrowUp":
          interval = !interval? window.setInterval((function () {
            document.scrollingElement!.scrollBy(0, -speed);
          }), 1) : interval;
          k.preventDefault();
          break;
      }
    }
  });

  document.addEventListener("keyup", function (k) {
    if (interval) {
      switch (k.key) {
        case "ArrowDown":
        case "ArrowUp":
          window.clearInterval(interval);
          interval = 0;
          break;
      }
    }
  });

  browser.storage.onChanged.addListener(function (changes, area) {
    if (area === "local") {
      const changedItems = Object.keys(changes);
      for (const item of changedItems) {
        switch (item) {
          case "enabled":
            enabled = changes[item].newValue;
            break;
          case "speed":
            speed = changes[item].newValue;
            break;
        }
      }
    }
  });
}




