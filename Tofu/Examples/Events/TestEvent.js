const appRoot = require("app-root-path");
const Event = require(`${appRoot}/Engine/Event`);

class TestEvent extends Event {
    //A list of key's that MUST exist in any event data for this event, emit keys that are optional

    keys = [
        "num1",
        "num2"
    ];

    /*Above would be created with let myEvent = TestEvent({
        "num1": 7,
        "num2": 11,
    }) */

    /*
    Engine code below, do not edit
     */
    constructor(props) {super(props);}
    static AddListener(func){this.LISTENERS.push(func);}
    FireEvent(){super.FireEvent(TestEvent.LISTENERS);}
    static LISTENERS = [];
    Verify() {
        keys.forEach((key)=> {
            if(!(key in this.eventData))
                return false;
        });
        return true;
    }
}
module.exports = TestEvent;

///////////////////////////////         USAGE            ////////////////////////////////
//Add a listener function to an event, could also be a function pointer
TestEvent.AddListener((data) => {
    console.log(data['testKey'])
});

//Create event with data and fire
let testEvent = new TestEvent({
    testKey: "This is a test value for an event"
});
testEvent.FireEvent();