$(document).ready(function(){\
  var myNamespace = {
    myObject: {
        sayWelcome: function() {
            console.log("welcome to the "+this.theSeason + " of Hacks");
        },
        theSeason: "Summer"
    }
};
var welcome = myNamespace.myObject();
welcome.sayWelcome();
})