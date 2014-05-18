/*
 * Counter is a minimal countdown class.
 *
 * @Counter(id, numSeconds, endFn)
 * <String> id is the unique id the element that stores the count.
 * <int> numSeconds is the number of seconds to start the countdown from.
 * <function> endFn is the function called when the countdown is complete.
 *
 * Example usage (create and start a timer for 2 minutes):
 *
 * function myFun() {alert("2 minutes is up!")}
 * var counter = new Counter("myCounter", 120, myFn);
 * counter.countdown();
 * 
 */

function Counter(id, numSeconds, endFn) {
  this.clock = document.getElementById(id);
  this.numSeconds = numSeconds;
  this.clock.innerHTML = this.toReadableTimeFormat();
  this.endFn = endFn;
}

/*
 * Starts the countdown in 1 second intervals.
 * When the countdown is finished, calls the endFn 
 * function passed in the constructor.
 */
Counter.prototype.countdown = function() {
  var counter = this;
  this.intervalID = setInterval(function() {
    counter.numSeconds--;
    if (counter.numSeconds < 0) {
      clearInterval(counter.intervalID);
      counter.endFn(); 
    } else counter.clock.innerHTML = counter.toReadableTimeFormat();
  }, 1000);
}

// Pauses the countdown
Counter.prototype.pause = function() {
  clearInterval(this.intervalID);
}

// Private method
Counter.prototype.toReadableTimeFormat = function() {
  var timeString;
  var numMins = Math.floor(this.numSeconds/60);
  timeString = '0' + numMins + ':';
  var numSecs = this.numSeconds - (60*numMins);
  if (numSecs < 10) return timeString + '0' + numSecs;
  else return timeString + numSecs;
}