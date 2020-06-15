const Timer = require("../Engine/Timer");

class TestTimer extends Timer{
    time = "3000";
    options = {
        interval: true,
        immediate: true
    }
    //For default data in the Timer
    data = {
        msg: "This is a default message for the UserEmailTimer"
    };
    name = "DefaultUserEmailTimer"
    //All required keys need to be present in the data object or an error will be thrown
    requiredKeys = [
        "msg"
    ]

    constructor(data,name,timeOverride) {
        super(data,name,timeOverride);
    }

    //Timer function goes here
    OnTick(obj) {
        Logger.info(obj.data.msg)
    }

    Verify() {
        this.requiredKeys.forEach((key)=> {
            if(!(key in this.eventData))
                return false;
        });
        return true;
    }

}

module.exports = TestTimer