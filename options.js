function saveOptions() {
    var username, password, redmineUrl, status
    ;
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    redmineUrl = document.getElementById('redmineUrl').value;
    status = document.getElementById('status');

    chrome.storage.sync.set({
        username: username,
        password: password,
        redmineUrl: redmineUrl,
    }, function() {
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        username: null,
        password: null,
        redmineUrl: null
    }, function(items) {
        document.getElementById('username').value = items.username;
        document.getElementById('password').value = items.password;
        document.getElementById('redmineUrl').value = items.redmineUrl;
    });
}

function testConnection() {
    var username, password, redmineUrl, status, redmineApi
    ;
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    redmineUrl = document.getElementById('redmineUrl').value;
    status = document.getElementById('status');

    redmineApi = new RedmineApi(redmineUrl, username, password);
    redmineApi.testConnection().then(response => {
        if (response.ok) {
            status.textContent = 'Connection is OK';
        } else {
            console.log(response);
            status.textContent = 'Error: ' + response.statusText;
        }
    }).catch(error => {
        status.textContent = 'Error: ' + error.message;
    });

}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('testConnection').addEventListener('click', testConnection);
