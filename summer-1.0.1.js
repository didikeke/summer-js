(function() {

    if(window.summer){
        return;
    }

//===========================================================================
//SUMMER
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
(function() {

//===========================================================================
//SUMMER.VIEWS
//===========================================================================
var self = window.summer.views = {

    //-----------------------------------------------------------------------
    // RENDER
    //-----------------------------------------------------------------------
    render: function(node, path, data, replace) {
        var html = self.renderJst(path, data);
        if (replace) {
          $(node).replaceWith(html);
        } else {
          $(node).html(html);
        }
    },

    //-----------------------------------------------------------------------
    // RENDER JST
    //-----------------------------------------------------------------------
    renderJst: function(path, data) {

        //TrimPath: http://code.google.com/p/trimpath/wiki/JavaScriptTemplates
        _require('TrimPath');

        var template = TrimPath.parseTemplate(_fetch(path));

        return template.process(data);

    },

    //-----------------------------------------------------------------------
    // RENDER REPLACE - compatible for version 0.0.1
    //-----------------------------------------------------------------------
    renderReplace: function(node, path, data) {
        self.render(node, path, data, true);
    }



};

//==========================================================================
//PRIVATE MEMBERS
//==========================================================================

var _cache = {};
//--------------------------------------------------------------------------
//_require: log error if extra library is not including
//--------------------------------------------------------------------------
var _require = function(name) {

    if (!window[name]) {
        var log = 'Require LIB ' + name;
        throw log;
    }

};

//--------------------------------------------------------------------------
//_fetch: get url
//--------------------------------------------------------------------------
var _fetch = function(path) {

    _require('jQuery');

    if (_cache[path]) {
        return _cache[path];
    }

    var options = {
        type: 'GET',
        url: path,
        async: false
    };

    result = jQuery.ajax(options).responseText;

    _cache[path] = result;

    return result;

};

//===========================================================================
//GLOBAL VARIABLE
//===========================================================================
window.summer.render = window.summer.views.render;

})();

//EOF
