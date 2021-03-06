import { default as swal } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * prettify constant value for display
 * @param value
 * @returns {string}
 */
export function prettifyConstant (value) {
    if(!value) {
        return  '';
    } else {
        return this.ucFirstAllWords(value);
    }
}

/**
 * capitalize first letter of word
 * @param str
 * @returns {string}
 */
export function ucFirst (str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * capitalize all first letters of sentence
 * @param str
 * @returns {string}
 */
export function ucFirstAllWords (str) {
    var pieces = str.split(" ");
    for (var i = 0; i < pieces.length; i++) {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}

/**
 * compare two booleans and returns true if match else false
 * @param value1
 * @param value2
 * @returns {boolean}
 */
export function cmpBool (value1, value2) {
    if (typeof value1 !== typeof undefined && typeof value1 !== typeof undefined) {
        if (Boolean(value1) === Boolean(value2)) {
            return true;
        }
    }
    return false;
}

/**
 * generic prompt using Sweetalert2
 * @param {PromptData} data
 * @param callback
 */
export function prompt (data, callback) {
    if (data && data.message) {
        swal({
            title: data.title || 'Alert',
            html: data.message,
            type: data.alertType || "warning",
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: "#0091F4",
            confirmButtonText: "Yes",
            cancelButtonColor: "#344fb2",
            cancelButtonText: "No"
        }).then(function () {
            callback(true);
        }, function () {
            callback(false);
        });
    }
}

/**
 * generic prompt using Sweetalert2
 * @param {PromptData} data
 * @param callback
 */
export function promptAlert (data, callback) {
    if (data && data.message) {
        swal({
            title: data.title || 'Alert',
            html: data.message,
            type: data.alertType || "warning",
            reverseButtons: true,
            showCancelButton: false,
            confirmButtonColor: "#0091F4",
            confirmButtonText: "Ok"
        }).then(function () {
            callback(true);
        }, function () {
            callback(false);
        });
    }
}

/**
 * check variable for empty value
 * @param value
 * @returns {boolean}
 */
export function isEmpty (value) {
    // test results
    //---------------
    // []        true, empty array
    // {}        true, empty object
    // null      true
    // undefined true
    // ""        true, empty string
    // ''        true, empty string
    // 0         false, number
    // true      false, boolean
    // false     false, boolean
    // Date      false
    // function  false

    if (value === undefined)
        return true;

    if (typeof (value) === 'function' ||
        typeof (value) === 'number' ||
        typeof (value) === 'boolean' ||
        Object.prototype.toString.call(value) === '[object Date]')
        return false;

    if (value === null || value.length === 0) // null or 0 length array
        return true;

    if (typeof (value) === "object") {
        // empty object
        var r = true;
        if (Object.keys(value).length > 0) {
            r = false;
        }
        return r;
    }

    if (typeof (value) === "string" && value.trim() === "") {
        return true;
    }

    return false;
}