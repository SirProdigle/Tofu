//Controller specific middleware should always exists within an object formatted as below, they are all added automatically to the controller this is named after
module.exports = {

     TimeLogger:  (req, res, next) => {
        console.log('Time: ', Date.now());
        next();
    },
    BoopLogger: (req,res,next) => {
        console.log("BOOP");
        next();
    }

};