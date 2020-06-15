//FIXME make all these work with obj{obj,obj,obj} systems instead of [obj,obj] since that doesn't work
function GetTimer(name) {
        const appRoot = require("app-root-path");
        const Timer = require(`${appRoot}/Engine/Timer`);
        return Timer.ACTIVE_TIMERS[name];
    }

    function DisableActiveTimer(name) {
        const appRoot = require("app-root-path");
        const Timer = require(`${appRoot}/Engine/Timer`);
        Timer.ACTIVE_TIMERS[name].Disable();
    }

    function EnableActiveTimer(name) {
        const appRoot = require("app-root-path");
        const Timer = require(`${appRoot}/Engine/Timer`);
        Timer.ACTIVE_TIMERS[name].Enable();
    }

    function GetAllActiveTimers() {
        const appRoot = require("app-root-path");
        const Timer = require(`${appRoot}/Engine/Timer`);
        console.log(Timer.ACTIVE_TIMERS);
        return Timer.ACTIVE_TIMERS.filter(t => {
            return true;
        })
    }

    function GetAllInactiveTimers() {
        const appRoot = require("app-root-path");
        const Timer = require(`${appRoot}/Engine/Timer`);
        return Timer.ACTIVE_TIMERS.filter(t => !t.running)
    }

    function EnableAllTimers() {
        const appRoot = require("app-root-path");
        const Timer = require(`${appRoot}/Engine/Timer`);
        Timer.ACTIVE_TIMERS.map(t => t.Enable())
    }

    function DisableAllTimers() {
        const appRoot = require("app-root-path");
        const Timer = require(`${appRoot}/Engine/Timer`);
        Timer.ACTIVE_TIMERS.map(t => t.Disable())
    }
    class TimerTime{
        constructor(secs,mins,hrs,days) {
            this.time = (secs + (mins*60) + (hrs * 60 * 60) + (days * 24 * 60 * 60)) * 1000; //ms time
        }
    }
module.exports = {
        GetTimer,DisableActiveTimer,EnableActiveTimer,GetAllInactiveTimers,GetAllActiveTimers,EnableAllTimers,DisableAllTimers,TimerTime
}