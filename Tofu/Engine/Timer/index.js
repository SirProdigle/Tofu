//TODO add some startup code that auto makes and schedules timers in startup sequence

class Timer {
    static ACTIVE_TIMERS = [];
    time = 0;
    options = {
        interval: false,
        immediate: false
    };
    running = false;

    constructor(data, name, timeOverride) {
        this.data = data;
        this.name = name;
        if (timeOverride !== typeof TimerTime) {
            console.error(`timeOverride for ${this.constructor.name} must be of type TimerTime`)
            if (process.env.NODE_ENV !== "production")
                process.exit(1);
        }
        this.time = timeOverride.time;
        this.Verify()
    }

    OnTick() {
        Logger.error(`OnTick has not been overridden for ${this.constructor.name}`)
    }

    RunTimer() {
        this.OnTick();
        if (!options.interval) {
            //Remove from table
            delete this;
        }
    }

    Schedule() {
        //If interval then set interval else set timeout
        if (this.options.immediate)
            this.RunTimer()
        if (this.options.interval)
            this.jsObject = setInterval(this.RunTimer, this.time);
        else {
            this.jsObject = setTimeout(this.RunTimer, this.time);
        }
        this.running = true;
        Timer.ACTIVE_TIMERS[this.name] = this;
        //Add to table


    }

    Disable() {
        if(!this.running)
            return;
        if (this.options.interval)
            clearInterval(this.jsObject);
        else {
            clearTimeout(this.jsObject);
        }
        this.running = false;
        this.jsObject = null;
    }

    Enable(){
        if(this.running)
            return;
        if (this.options.interval)
            this.jsObject = setInterval(this.RunTimer,this.time);
        else {
            this.jsObject = setTimeout(this.RunTimer,this.time);
        }
        this.running = false;
    }

    Verify() {
        Logger.error(`Called Verify on base Timer for ${this.constructor.name}. Please provide a Verify overload per Timer subclass.`)
        return false
    }
}

module.exports = Timer;
