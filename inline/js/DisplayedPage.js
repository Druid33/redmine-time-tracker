class DisplayedPage {
    constructor(logger) {
        this.issueId = false;
        this.logger = logger;
    }

    // parse displayed page and find relevant elements:
    // - issue title element
    // - issiu number
    parsePageContent() {
        var taskTitleElement;

        taskTitleElement = this._getElementByXpath('//*[@id="content"]/h2');
        if (taskTitleElement) {
            let matches = taskTitleElement.innerHTML.match(/#([0-9]+)/);
            if (matches && matches[1]) {
                this.taskTitleElement = taskTitleElement;
                this.issueId = matches[1];
                this.logger.log('Find issue #' + this.issueId);
            } else {
                this.logger.log('regexp doesnt match any issue number in: ' + taskTitleElement.innerHTML);
            }
        } else {
            this.logger.log('task title doesnt exist');
        }
    }

    addTrackButton(button) {
        this.taskTitleElement.appendChild(button);
    }

    _getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
}
