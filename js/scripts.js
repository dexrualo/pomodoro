document.addEventListener("DOMContentLoaded", function(){
  var Timer = function(){
    var startTime = 0;
    var worker = undefined;
    this.start = function(duration, process) {
      if (worker == undefined) {
        worker = setInterval(process, 1000);
        startTime = Date.now();
        setTimeout(function(){
          worker = clearInterval(worker);
        }, duration);
      }
    };
    this.stop = function() {
      if (worker){
        worker = clearInterval(worker);
        startTime = 0;
      }
    };
    this.getElapsed = function(){
      return Date.now() - startTime;
    };
  };
//----------------------------------------------
  var workTimer = new Timer();
  document.getElementById('start').onclick = function(){
    workTimer.start(10000, function(){
      console.log(workTimer.getElapsed());
    });
  };
  document.getElementById('stop').onclick = function(){
    workTimer.stop();
  };
});
