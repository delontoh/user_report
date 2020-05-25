import $ from 'jquery';
const apiUrl = "http://localhost:3000"

/**
 * Username login
 * @param data
 * @param callback
 */
export function userLogin(data, callback) {
    $.ajax({
        method: "POST",
        url: apiUrl + '/api/user/login',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}

/**
 * Get user info by userName
 * @param data
 * @param callback
 */
export function getUserInfoByUsername(data, callback) {
    $.ajax({
        method: "GET",
        url: apiUrl + '/api/user/get-user',
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
export function submitReport(data, callback) {
    $.ajax({
        method: "POST",
        url: apiUrl + '/api/user/submit-report',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}

/**
 * Get user's reports by userId
 * @param data
 * @param callback
 */
export function getUserReportsByUserId(data, callback) {
    $.ajax({
        method: "GET",
        url: apiUrl + '/api/user/all-reports',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}

/**
 * Register new user
 * @param data
 * @param callback
 */
export function registerNewUser(data, callback) {
    $.ajax({
        method: "POST",
        url: apiUrl + '/api/user/register',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}