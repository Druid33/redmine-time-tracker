class TrackButtons {

    // constructor(onStartBtnClick, onStopBtnClick) {
    //     this.startBtn = this._createStartBtn(onStartBtnClick);
    //     this.stopBtn = this._createStopBtn(onStopBtnClick);
    //     this.htmlElement = this._createHtmlElement(this.startBtn, this.stopBtn);
    // }

    constructor(logger) {
        this.logger = logger;
        this.startBtn = this._createStartBtn();
        this.stopBtn = this._createStopBtn();
        this.htmlElement = this._createHtmlElement(this.startBtn, this.stopBtn);
    }

    getHtmlElement() {
        return this.htmlElement;
    }

    addStartBtnClickListener(listener) {
        this.startBtn.addEventListener('click', listener);
    }

    addStopBtnClickListener(listener) {
        this.stopBtn.addEventListener('click', listener);
    }

    switchToTrackingActiveState() {
        this.logger.log('switch to tracking state');
        this._showBtn(this.stopBtn);
        this._hideBtn(this.startBtn);
    }

    switchToTrackingInactiveState() {
        this.logger.log('switch to non tracking state');
        this._showBtn(this.startBtn);
        this._hideBtn(this.stopBtn);
    }

    _createHtmlElement(startBtn, stopBtn) {
        var span = document.createElement("SPAN")
        ;
        span.appendChild(startBtn);
        span.appendChild(stopBtn);
        return span;
    }

    _createStartBtn() {
        var btn = document.createElement("IMG"),
            src = chrome.extension.getURL("inline/img/playBtn.png")
        ;
        btn.setAttribute("src", src);
        btn.setAttribute("class", "start-stop-btn");
        btn.setAttribute("title", "Start tracking time on this issue");
        return btn;
    }

    _createStopBtn() {
        var btn = document.createElement("IMG"),
            src = chrome.extension.getURL("inline/img/stopBtn.png")
        ;
        btn.setAttribute("src", src);
        btn.setAttribute("class", "start-stop-btn");
        btn.setAttribute("title", "Stop tracking time on this issue");
        return btn;
    }

    _showBtn(btn) {
        btn.style.display = 'inline';
    }

    _hideBtn(btn) {
        btn.style.display = 'none';
    }
}
