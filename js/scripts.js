document.addEventListener("DOMContentLoaded", function(){
  var Timer = function(secs){
    var startTime = 0;
    var duration = secs;
    var worker = undefined;
    var remaining = duration;
    this.start = function(process) {
      if (worker == undefined) {
        worker = setInterval(function(){
          remaining -= 1;
          process();
          console.log(remaining);
          if (remaining <= 0)
            worker = clearInterval(worker);
        }, 1000);
      }
    };
    this.stop = function() {
      if (worker){
        worker = clearInterval(worker);
      }
    };
    this.setDuration = function(num) {
      duration = remaining = num;
    };
    this.getDuration = function() {
      return duration;
    };
    this.getRemaining = function() {
      var min = Math.floor(remaining/60);
      var sec = remaining % 60;
      return (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
    };
  };
//----------------------------------------------
  var workTimer = new Timer(1500);
  document.getElementById('timer-display').innerHTML = workTimer.getRemaining();
  document.getElementById('start').onclick = function(){
    workTimer.start(function(){
      document.getElementById('timer-display').innerHTML = workTimer.getRemaining();
      console.log(workTimer.getRemaining());
    });
  };
  document.getElementById('stop').onclick = function(){
    workTimer.stop();
  };
  document.getElementById('work-minus').onclick = function(){
    workTimer.setDuration(workTimer.getDuration() - 60);
    document.getElementById('work-minutes').innerHTML = workTimer.getDuration()/60;
    document.getElementById('timer-display').innerHTML = workTimer.getRemaining();
  };
  document.getElementById('work-plus').onclick = function(){
    workTimer.setDuration(workTimer.getDuration() + 60);
    document.getElementById('work-minutes').innerHTML = workTimer.getDuration()/60;
    document.getElementById('timer-display').innerHTML = workTimer.getRemaining();
  };
});
