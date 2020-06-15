class UserEmailTimer extends Timer{
    //For default data in the Timer
    data = {
        msg: "This is a default message for the UserEmailTimer"
    };
    name = "DefaultUserEmailTimer"
    //All required keys need to be present in the data object or an error will be thrown
    requiredKeys = [
        "msg"
    ]

    //Timer function goes here
    OnTick() {
        Logger.info(data.msg)
    }






    Verify() {
        keys.forEach((key)=> {
            if(!(key in this.eventData))
                return false;
        });
        return true;
    }

}