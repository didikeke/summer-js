;(function() { 

    if(window.summer){
        return true;
    }
    
//===========================================================================
//SUMMER
// v1.0.0
//===========================================================================
var self = window.summer = {

    //=======================================================================
    // METHODS
    //=======================================================================    
        
    //-----------------------------------------------------------------------
    // NAMESPACE
    //-----------------------------------------------------------------------
    namespace: function(nspace){
        var names = nspace.split('.');
        var parent = window;
        for(var i=0; i<names.length; i++) {
        	if(!parent[names[i]]){
        		parent[names[i]] = {};
        	}
        	parent = parent[names[i]];
        }
        return parent;
    },
    
    //-----------------------------------------------------------------------
    // SYNC
    //-----------------------------------------------------------------------
    /**
     * Execute functions synchronized by calling order.
     * 
     * @param {String} fn  The function will be executed
     * @param {Object} millisec delay time. Optional - default is 0;
     * @return {Int} id
     */
    sync: function(fn, millisec){
        var m = millisec ? millisec : 0; //default value;
        return setTimeout(fn,m);
    },
    
    //-----------------------------------------------------------------------
    // NO NULL FUNCTION
    //-----------------------------------------------------------------------
    noNullFn: function(fn){
        if(fn){
            return fn;
        }else{
            return function(){};
        }
    },

    //-----------------------------------------------------------------------
    // ESCAPE HTML - IT SHOULE BE MOVE TO A TOOL CLASS
    //-----------------------------------------------------------------------
    escapeHtml: function(str){
        if(str){
            return str.split("&").join("&amp;").split( "<").join("&lt;").split(">").join("&gt;");
        }else{
            return '';
        }
    },

    //-----------------------------------------------------------------------
    // I18N
    //-----------------------------------------------------------------------
    /**
     * return the language text of the key
     * 
     * @param {String} key  The language key
     * @param {String} ...  e.g. i18n(key,arg0,arg1) -> "hello {0}, {1}" 
     * @return {String} The language text
     */
    i18n: function(key) {
        if(!summer.language){
            throw 'summer.language is not defined.'
        }

        if(summer.language[key]){
            var message = summer.language[key];
            if(arguments.length > 1){
                for(var i=1;i < arguments.length;i++){
                    var posTxt = '{' + (i-1) +'}'
                    message = message.replace(posTxt, arguments[i]);
                }
            };
            return message;
        }else {
            return key;
        }
    }
    
};

//==========================================================================
//PRIVATE MEMBERS
//========================================================================== 

//===========================================================================
//GLOBAL VARIABLE
//===========================================================================
window.namespace = summer.namespace;
window.I18N = summer.i18n;

})();

//EOF   