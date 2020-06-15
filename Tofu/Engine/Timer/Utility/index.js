const Timer = require("../index");

class TimerTime{
    constructor(secs,mins,hrs,days) {
        this.time = (secs + (mins*60) + (hrs * 60 * 60) + (days * 24 * 60 * 60)) * 1000; //ms time
    }
}

function GetTimer(name) {
    return Timer.ACTIVE_TIMERS[name];
}
function DisableActiveTimer(name) {
    Timer.ACTIVE_TIMERS[name].Disable();
}
function EnableActiveTimer(name) {
    Timer.ACTIVE_TIMERS[name].Enable();
}
function GetAllActiveTimers() {
    return Timer.ACTIVE_TIMERS.filter((t) => {t.running})
}
function GetAllInactiveTimers() {
    return Timer.ACTIVE_TIMERS.filter((t) => {!t.running})
}
function EnableAllTimers() {
    Timer.ACTIVE_TIMERS.map(t => {t.Enable()})
}
function DisableAllTimers() {
    Timer.ACTIVE_TIMERS.map(t => {t.Disable()})
}

module.exports = {
    TimerTime,GetAllActiveTimers,GetTimer,DisableActiveTimer,EnableActiveTimer,GetAllInactiveTimers,EnableAllTimers,DisableAllTimers
}