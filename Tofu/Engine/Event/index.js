const appRoot = require("app-root-path"), Logger = require(`${appRoot}/Engine/Logger`);

//props should be a json object with key:value pairs for every required variable,
class Event{

    eventData = {};

    constructor(props){
        if(!props instanceof Object)
            Logger.error("Event construction arguments should be a JSON object");
        this.eventData = props;
    }

    FireEvent(listenerArray) {
        for (let i = 0; i < listenerArray.length; i++) {
            if (!listenerArray[i] instanceof Function) {
                Logger.error(listenerArray[i].name + " is not a function and is in the listeners for " + this.constructor.name);
            } else if(!this.Verify()) {
                Logger.error("Event data does not pass verify checks for " + this.constructor.name + ":\n" + this.eventData)
            } else{
                listenerArray[i](this.eventData);
            }
        }

    }

    Verify() {
        Logger.error("Called Verify on base Event. Please provide a Verify overload per Event subclass.")
        return false;
    }

}

module.exports = Event;