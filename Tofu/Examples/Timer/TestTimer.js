const appRoot = require("app-root-path")
const Timer = require(`${appRoot}/Engine/Timer`);

class TestTimer extends Timer{
    //All values below are default values, they are overridden using the constructor parameters
    time = "100"; //Default time value (ms)
    options = {
        interval: true, //Continuous timer
        immediate: false //Do not start timer immediately
    };
    requiredKeys = [
        "msg" //timer must include this key in data to be valid
    ];

    //For default data in the Timer
    data = {
        msg: "This is a default message for the UserEmailTimer"
    };
    name = "DefaultUserEmailTimer"
    //All required keys need to be present in the data object or an error will be thrown

    constructor(data,name,timeOverride) {
        super(data,name,timeOverride);
    }

    //Timer function goes here
    OnTick() {
        Logger.info(this.data.msg)
    }


    //FIXME Event verify generation to match this?? core event way didnt work here
    Verify() {
        let passedVerification = true;
        this.requiredKeys.forEach((key)=> {
            if(!(key in this.data)) {
                passedVerification = false;
            }
        });
        return passedVerification;
    }

}

module.exports = TestTimer