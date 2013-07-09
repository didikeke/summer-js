(function() {

//===========================================================================
//SUMMER.VIEWS
//===========================================================================
var self = window.summer.views = {

    version: 1,

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

        var url = path + "?version=" + self.version;
        var template = TrimPath.parseTemplate(_fetch(url));

        return template.process(data);

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