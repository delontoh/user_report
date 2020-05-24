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
 * Get single report by reportId
 * @param data
 * @param callback
 */
export function getReportByReportId(data, callback) {
    $.ajax({
        method: "GET",
        url: apiUrl + '/api/user/report',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}

/**
 * Get all users reports by admin userId
 * @param data
 * @param callback
 */
export function adminGetAllReports(data, callback) {
    $.ajax({
        method: "GET",
        url: apiUrl + '/api/admin/users-reports',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}

/**
 * Update user report status by reportId
 * @param data
 * @param callback
 */
export function updateReportStatus(data, callback) {
    $.ajax({
        method: "POST",
        url: apiUrl + '/api/user/update-report',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}