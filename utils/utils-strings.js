/**
 * Created by Freddy Snijder on 15/05/14.
 */


(function() {
    var NS = null;

    var __isNode = (typeof module !== 'undefined' && typeof module.exports !== 'undefined');
    if (__isNode) {
        require("../extensions/string.ext.js");

        NS = exports;
    } else {
        //Add to Visionscapers namespace
        NS = window["__VI__"] || window;
    }

    //using underscore.js _ as base object
    //changing and augmenting it where we want to
    NS.UtilsStrings = {};
    NS.UtilsStrings.addTo = function (utils, log) {

        if (typeof(log) != "object") {
            console.warn("UtilsStrings : no logging object provided, using browser console logger");
            log = console;
        }

        if ((typeof(utils) != "object") && (typeof(utils) != "function")) {
            log.error("UtilsStrings", "No valid utils object given, not adding utils");
            return;
        }

        if ((typeof(utils._utilsComponents) != "object") || (!utils._utilsComponents["base"])) {
            log.error("UtilsStrings", "This utils component needs the base utils component, not adding utils");
            return;
        }

        /**************************************************
         *
         * Register utils component
         *
         **************************************************/

            //Different util components are registered here
            //This allows us to check in a simple way if certain functionality is available
        utils._mustExist("_utilsComponents");
        if (utils.obj(utils._utilsComponents)) {
            utils._utilsComponents["strings"] = true;
        }

        /**************************************************
         *
         * END Register utils component
         *
         **************************************************/

        utils._mustNOTexist("joinPaths");
        /**
         *
         * Joins paths in the paths array, by ensuring that there are no double slashes at
         * the join positions
         *
         * @param {Array} paths
         *
         * @returns {String|null}
         *
         */
        var joinPaths = function (paths) {
            var concatenated = null;

            if (!utils.array(paths)) {
                return concatenated;
            }

            var nextPath;
            var numPaths = paths.length;
            if (numPaths == 0) {
                concatenated = "";
            } else if (numPaths == 1) {
                concatenated = paths[0] + "";
            }

            if (utils.string(concatenated)) {
                return concatenated;
            }

            var __join = function (path1, path2) {
                path1 = path1 + "";
                path2 = path2 + "";

                var firstPathEndsWithSlash = (path1[path1.length - 1] == '/');
                var secondPathStartsWithSlash = (path2[0] == '/');

                if (!firstPathEndsWithSlash) {
                    path1 += '/';
                }

                if (secondPathStartsWithSlash) {
                    path2 = path2.slice(1);
                }

                return path1 + path2;
            };

            concatenated = paths[0];
            for (var idx = 1; idx < numPaths; idx++) {
                nextPath = paths[idx];

                concatenated = __join(concatenated, nextPath);
            }

            return concatenated;
        };
        utils.joinPaths = utils.joinPaths || joinPaths;


        utils._mustNOTexist("url");
        var URLPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        /**
         *
         * Returns true if given string is a valid URL, else false
         *
         * @param {String} str     string to be tested
         *
         * @returns {boolean}
         *
         */
        var url = function (str) {
            return (URLPattern.test(str) === true);
        };
        utils.url = utils.url || url;

        utils._mustNOTexist("trim");
        //From https://github.com/visionmedia/superagent
        var trim = function (s) {
            return s.replace(/(^\s*|\s*$)/g, '');
        };
        utils.trim = utils.trim || trim;

        utils._mustNOTexist("capitaliseFirst");
        var capitaliseFirst = function (s) {
            if (!utils.string(s)) {
                return null;
            }

            return s.charAt(0).toUpperCase() + s.slice(1);
        };
        utils.capitaliseFirst = utils.capitaliseFirst || capitaliseFirst;

        utils._mustNOTexist("encoded");
        /**
         *
         * HTML entity encodes the string
         *
         * @param {String} s
         *
         * @returns {String|null}
         *
         */
        var encoded = function (s) {
            var encodedStr = null;

            if (!utils.string(s)) {
                return encodedStr;
            }

            //http://stackoverflow.com/a/18750001/889617
            var encodedStr = s.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
                return '&#' + i.charCodeAt(0) + ';';
            });

            return encodedStr;
        };
        utils.encoded = utils.encoded || encoded;

        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };

        utils._mustNOTexist("endsWith");
        /**
         *
         * Checks if string ends with string
         *
         * @param {String} s
         *
         * @returns {boolean}
         *
         */
        var endsWith = function(s, suffix) {
            if (!utils.string(s)) {
                return false;
            }

            return s.length >= suffix.length && s.substr(s.length - suffix.length) == suffix;
        };
        utils.endsWith = utils.endsWith || endsWith;

        utils._mustNOTexist("toBase64");
        /**
         *
         * Converts binary string to Base64 ASCII encoded string
         *
         * @param {string} data         string with binary data
         *
         * @returns {string | null}     If a problem occurred null is returned
         *
         */
        var toBase64 = function(data) {
            var data64 = null;

            if (!_.string(data)) {
                return data64;
            }

            if (!_.func(window.btoa)) {
                _l.error("Utils::toBase64", "btoa method not supported to encode as Base64");
                return data64;
            }

            return (data64 = window.btoa(data));
        };
        utils.toBase64 = utils.toBase64 || toBase64;

        utils._mustNOTexist("fromBase64");
        /**
         *
         * Converts Base64 ASCII encoded string to binary string
         *
         * @param {string} data64       string with Base64 ASCII encoded  data
         *
         * @returns {string | null}     If a problem occurred null is returned
         *
         */
        var fromBase64 = function(data64) {
            var data = null;

            if (!utils.string(data64)) {
                return data;
            }

            if (!utils.func(window.atob)) {
                log.error("Utils::fromBase64", "atob method not supported to decode Base64");
                return data;
            }

            return (data = window.atob(data64));
        };
        utils.fromBase64 = utils.fromBase64 || fromBase64;

        utils._mustNOTexist("insertBeforeLast");
        /**
         *
         * Places insert before last occurrence of string c in s
         * If the specified string c does not occur at all in s, string insert is placed at the end of s
         *
         * Example :
         * insertBeforeLast('.', '-original', 'test.x.jpg') returns "test.x-original.jpg"
         *
         * @param {string} c        Substring where to insert string 'insert' before
         * @param {string} insert   String to insert before last occurrence of c in s
         * @param {string} s        String to insert string 'insert' in to
         *
         * @returns {string|null}
         */
        var insertBeforeLast = function(c, insert, s) {
            var me          = "Utils::insertBeforeLast";
            var sInserted   = null;

            if (!utils.string(s)) {
                return sInserted;
            }

            if (!utils.string(insert)) {
                log.error(me, "insert is not a string, returning null");
                return sInserted;
            }

            if (!utils.string(c)) {
                return (sInserted = s+insert);
            }

            var idx = s.lastIndexOf(c);
            if (idx < 0) {
                sInserted = s+insert;
            } else {
                sInserted = s.substring(0, idx) + insert + s.substring(idx)
            }

            return sInserted;
        };
        utils.insertBeforeLast = utils.insertBeforeLast || insertBeforeLast;
    };

})();