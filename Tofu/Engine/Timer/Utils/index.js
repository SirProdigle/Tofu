

function GetTimer(name) {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    return Timer.ACTIVE_TIMERS[name];
}

function DisableTimer(name) {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    Timer.ACTIVE_TIMERS[name].Disable();
}

function EnableTimer(name) {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    Timer.ACTIVE_TIMERS[name].Enable();
}

function GetAllTimers() {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    return Timer.ACTIVE_TIMERS;
}

function GetAllActiveTimers() {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    let activeTimers = [];
    Timer.ACTIVE_TIMERS.forEach((timer) => {
        if (timer.running)
            activeTimers.push(timer);
    })
    return activeTimers;
}

function GetAllInactiveTimers() {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    let inactiveTimers = [];
    Timer.ACTIVE_TIMERS.forEach((timer) => {
        if (!timer.running)
            inactiveTimers.push(timer);
    })
    return inactiveTimers;
}

function EnableAllTimers() {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    Timer.ACTIVE_TIMERS.forEach(t => t.Enable())
}

function DisableAllTimers() {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    Timer.ACTIVE_TIMERS.forEach(t => t.Disable())
}

function IsActive(name) {
    const appRoot = require("app-root-path");
    const Timer = require(`${appRoot}/Engine/Timer`);
    return Timer.ACTIVE_TIMERS[name].running;
}

class TimerTime {
    constructor(secs, mins, hrs, days) {
        this.time = (secs + (mins * 60) + (hrs * 60 * 60) + (days * 24 * 60 * 60)) * 1000; //ms time
    }
}
module.exports = {
    GetTimer,
    DisableActiveTimer: DisableTimer,
    EnableActiveTimer: EnableTimer,
    GetAllInactiveTimers,
    GetAllActiveTimers,
    EnableAllTimers,
    DisableAllTimers,
    GetAllTimers,
    IsActive,
    TimerTime,
}