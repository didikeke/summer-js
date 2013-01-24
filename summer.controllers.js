(function() {

//===========================================================================
//SUMMER.CONTROLLERS
//===========================================================================
var self = window.summer.controllers = {
    
    register: function(name, obj) {
        _map[name] = obj;
    },

    action: function(name, action) {
        //get arguments without name and action
        var args = Array.prototype.slice.call(arguments, 2); 
        var obj = _map[name];
        return obj[action].apply(obj, args);
    }
};

//=======================================================================
// PRIVATE MEMBERS
//=======================================================================
var _map = {};


//===========================================================================
//GLOBAL VARIABLE
//===========================================================================
window.action = window.summer.action = window.summer.controllers.action;

})();

//EOF    
