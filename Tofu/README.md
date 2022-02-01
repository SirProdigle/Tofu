# Tofu - A Lightweight MVC Framework For NodeJS

Web Documentation Repository

Tofu is an MVC framework for NodeJS heavily influenced by PHP Laravel. Tofu is planned to contain features such as:
*   MVC Structure
*   Console commands for quick scaffolding
*   Timers
*   A centralized event/listener system
*   Middleware structure per request,controller and function
*   Abstracted DB layer
*   A startup loop that is accessible/editable
*   Lots of config options!
*   Use of multiple view engines
*   Lots of example files that come with the framework
*   Automatic/Custom routing options to make routing simpler for small projects


### Use
You can use Tofu by npm installing it! If you simply download these files, it will work but you won't have access to the console commands as they require npm link.

### Console Commands
* make-controller **name** **-mo**(model) **-mi**(middleware)
* make-model **name** **-co**(controller) **-mi**(middleware)
* make-middleware **name** **-mo**(model) **-co**(controller)
* make-timer **name**  
* make-event **name**
