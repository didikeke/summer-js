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
        var html = window['Handlebars'] ? self.renderHbt(path, data) : self.renderJst(path, data);
        if (replace) {
          $(node).replaceWith(html);
        } else {
          $(node).html(html);
        }
    },
    
    renderHbt: function(templateId, data) {
        var source = $(templateId).html();
        var template = Handlebars.compile(source);
        var html = template(data);
        return html;
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

    },

    //-----------------------------------------------------------------------
    // CACHE
    //-----------------------------------------------------------------------
    cache: function(paths, eachCb, endCb) {
        for (var i = 0; i < paths.length; i++) {
            paths[i] = paths[i] + "?version=" + self.version;
        }
        _fetchPaths(paths, eachCb, endCb);
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
        cache: true,
        async: false
    };

    result = jQuery.ajax(options).responseText;

    _cache[path] = result;

    return result;

};

//--------------------------------------------------------------------------
// _fetchPaths: fetch and cache urls
//--------------------------------------------------------------------------
var _fetchPaths = function(paths, eachCb, endCb){
    var count = 0;

    for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        var asyncFetch = function(path){

            var options = {
                type: 'GET',
                url: path,
                async: true
            };

            jQuery.ajax(options)
                .done(function(result){
                     _cache[path] = result;
                })
                .always(function(){
                    count++;
                    summer.noNullFn(eachCb)(count);
                    if(paths.length === count){
                        summer.noNullFn(endCb)();
                    }
                });
        };

        asyncFetch(p);
    };

};

//===========================================================================
//GLOBAL VARIABLE
//===========================================================================
window.summer.render = window.summer.views.render;

})();

//EOF