import $ from "jquery";
const apiUrl = "http://localhost:3000"

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
        url: apiUrl + '/api/admin/update-report-status',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}

/**
 * Update user report information by reportId
 * @param data
 * @param callback
 */
export function updateReportInfo(data, callback) {
    $.ajax({
        method: "POST",
        url: apiUrl + '/api/admin/update-report-info',
        dataType: "json",
        data: data,
        error: callback
    }).done(callback);
}