//TODO add some startup code that auto makes and schedules timers in startup sequence
const appRoot = require("app-root-path");
const Logger = require(`${appRoot}/Engine/Logger`);
const TUtils = require("./Utils");

class Timer {
    static ACTIVE_TIMERS = {};
    static methods = TUtils

    running = false;

    constructor(data = null, name = null, timeOverride = null) {
        if (data !== null)
            this.data = data;
        if (name !== null)
            this.name = name;
        if (timeOverride != null) {
            if (typeof (timeOverride) === TUtils.TimerTime) {
                this.time = timeOverride.time;
            } else {
                this.time = timeOverride
            }
        }
    }

    OnTick(obj) {
        Logger.error(`OnTick has not been overridden for ${this.constructor.name}`)
    }

    RunTimer() {
        this.OnTick(this);
        if (!this.options.interval) {
            delete Timer.ACTIVE_TIMERS[this.name];
            delete this;
        }
    }

    Schedule() {
        if (this.Verify() === false) {
            Logger.error(`${this.constructor.name} failed to verify. Data: ${JSON.stringify(this.data)}`);
            if (process.env.NODE_ENV !== "production")
                process.exit(1);
            return;
        }
        if (this.options.immediate)
            this.RunTimer()
        if (this.options.interval)
            this.jsObject = setInterval(() => this.RunTimer(), this.time);
        else {
            this.jsObject = setTimeout(() => this.RunTimer(), this.time);
        }
        this.running = true;
        Timer.ACTIVE_TIMERS[this.name] = this;


    }

    Disable() {
        if (!this.running)
            return;
        if (this.options.interval)
            clearInterval(this.jsObject);
        else {
            clearTimeout(this.jsObject);
        }
        this.running = false;
        this.jsObject = null;
    }

    Enable() {
        if (this.running)
            return;
        if (this.options.interval)
            this.jsObject = setInterval(this.RunTimer, this.time);
        else {
            this.jsObject = setTimeout(this.RunTimer, this.time);
        }
        this.running = false;
    }

    Verify() {
        Logger.error(`Called Verify on base Timer for ${this.constructor.name}. Please provide a Verify overload per Timer subclass.`);
        return false;
    }
}

module.exports = Timer;
