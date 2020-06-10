const approot = require("app-root-path");
const Logger = require(`${approot}/Engine/Logger`);

class Event{

    //TODO props should be a json of name:value array which we use to assign to the object, then the subclass can basically be empty
    constructor(props){}

    FireEvent(listenerArray){
        for (let i = 0; i <  listenerArray.length; i++) {
            if(!typeof listenerArray[i] === "function" ){
                Logger.error(listenerArray[i].name + " is not a function and is in the listeners for " + this.constructor.name);
            }
            else {
                listenerArray[i](this);
            }
        }
    }



}

module.exports = Event;