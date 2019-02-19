class RedmineApi {
    constructor(redmineUrl, login, password) {
        this.redmineUrl = redmineUrl;
        this.apiConfig = {
            headers: {
                'Authorization': 'Basic ' + window.btoa(login + ':' + password),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        };
    }

    testConnection() {
        return fetch(this.redmineUrl + '/projects.json', this.apiConfig);
    }

    fetchProjects() {
        fetch(this.redmineUrl + '/projects.json', this.apiConfig).then(response => {
            if (response.ok) {
                status.textContent = 'Connection is OK';
            } else {
                console.log(response);
                status.textContent = 'Error: ' + response.statusText;
            }
        }).catch(function(error) {
            status.textContent = 'Error: ' + error.message;
        });
    }
}
