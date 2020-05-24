import $ from 'jquery';

const apiUrl = "http://localhost:3000"

/**
 * Username login
 * @param data
 * @param callback
 */
export function userLogin (data, callback) {
    $.ajax({
        method: "POST",
        url: apiUrl + '/api/user/login',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}

/**
 * Submit user report
 * @param data
 * @param callback
 */
export function submitReport (data, callback) {
    $.ajax({
        method: "POST",
        url: apiUrl + '/api/user/submit-report',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}