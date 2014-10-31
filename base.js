/**
 * Created by Freddy on 16/05/14.
 */


(function() {
    var NS = null;

    var __isNode = (typeof module !== 'undefined' && typeof module.exports !== 'undefined');
    if (__isNode) {
        var jsface = require("jsface");
        var Class  = jsface.Class;
        //var extend = jsface.extend;

        NS = exports;
    } else {
        //Add to Visionscapers namespace
        NS = window["__VI__"] || window;
    }

    NS.Base = Class({

        _valid: false,

        constructor: function () {

        },

        isValid: function () {
            return this._valid;
        }

    });

})();