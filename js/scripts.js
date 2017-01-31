var Pomodoro = function(workTimeInSecs, breakTimeInSecs){
  var worker = undefined;
  var periods = [{type:'Session',duration:workTimeInSecs}, {type:'Break',duration:breakTimeInSecs}];
  var active = periods[0];
  var remaining = active.duration;
  this.start = function(process) {
    if (worker == undefined) {
      worker = setInterval(function(){
        process();
        remaining -= 1;
        if (remaining < 0){
          if (active.type == 'Session')
            active = periods[1];
          else
            active = periods[0];
          remaining = active.duration;
        }
      }, 1000);
    }
  };
  this.stop = function() {
    if (worker){
      worker = clearInterval(worker);
    }
  };
  this.setWorkDuration = function(num) {
    periods[0].duration = num < 1 ? 60 : num * 60;
    if (active.type == 'Session')
      remaining = active.duration;
  };
  this.setBreaktimeDuration = function(num) {
    periods[1].duration = num < 1 ? 60 : num * 60;
    if (active.type == 'Break')
      remaining = active.duration;
  };
  this.getWorkDuration = function() {
    return periods[0].duration / 60;
  };
  this.getBreaktimeDuration = function() {
    return periods[1].duration / 60;
  };
  this.getRemaining = function() {
    var hour = Math.floor(remaining/3600);
    var min = Math.floor((remaining%3600)/60);
    var sec = remaining % 60;
    return (hour > 9 ? hour : '0' + hour) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
  };
  this.getType = function() {
    return active.type;
  };
  this.reset = function() {
    active = periods[0];
    remaining = active.duration;
  };
};

//----------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
  var pomodoro = new Pomodoro(1500,900);
  var started = false;

  document.getElementById('work-minus').onclick = function(){
    pomodoro.setWorkDuration(pomodoro.getWorkDuration() - 1);
    document.getElementById('work-minutes').innerHTML = pomodoro.getWorkDuration();
    if (pomodoro.getType() == "Session")
      document.getElementById('timer-display').innerHTML = pomodoro.getRemaining();
  };

  document.getElementById('work-plus').onclick = function(){
    pomodoro.setWorkDuration(pomodoro.getWorkDuration() + 1);
    document.getElementById('work-minutes').innerHTML = pomodoro.getWorkDuration();
    if (pomodoro.getType() == "work")
      document.getElementById('timer-display').innerHTML = pomodoro.getRemaining();
  };

  document.getElementById('break-minus').onclick = function(){
    pomodoro.setBreaktimeDuration(pomodoro.getBreaktimeDuration() - 1);
    document.getElementById('break-minutes').innerHTML = pomodoro.getBreaktimeDuration();
    if (pomodoro.getType() == "Break")
      document.getElementById('timer-display').innerHTML = pomodoro.getRemaining();
  };

  document.getElementById('break-plus').onclick = function(){
    pomodoro.setBreaktimeDuration(pomodoro.getBreaktimeDuration() + 1);
    document.getElementById('break-minutes').innerHTML = pomodoro.getBreaktimeDuration();
    if (pomodoro.getType() == "Break")
      document.getElementById('timer-display').innerHTML = pomodoro.getRemaining();
  };

  document.getElementById('run-pause').onclick = function(){
    if (document.getElementById('run-pause').className == 'paused') {
      pomodoro.start(function(){
        document.getElementById('period-label').innerHTML = pomodoro.getType();
        document.getElementById('timer-display').innerHTML = pomodoro.getRemaining();
      });
      document.getElementById('run-pause').className = 'running';
      document.getElementById('run-pause').innerHTML = 'Pause';
    } else {
      pomodoro.stop();
      document.getElementById('run-pause').className = 'paused';
      document.getElementById('run-pause').innerHTML = 'Resume';
    }
  };
  document.getElementById('reset').onclick = function(){
    pomodoro.stop();
    pomodoro.reset();
    document.getElementById('period-label').innerHTML = pomodoro.getType();
    document.getElementById('timer-display').innerHTML = pomodoro.getRemaining();
    document.getElementById('run-pause').className = 'paused';
    document.getElementById('run-pause').innerHTML = 'Start';
  };
});
