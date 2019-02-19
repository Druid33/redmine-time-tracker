class SimpleLogger {
    constructor() {
        this.off = true;
    }

    turnOn() {
        this.off = false;
        console.log('Redmine Time Tracked (RTT) logger is ON');
    }

    turnOff() {
        this.off = true;
        console.log('Redmine Time Tracked (RTT) logger is OFF');
    }

    log(msg) {
        if (this.off) {
            return;
        }
        console.log('RTT: ' + msg);
    }
}

var logger = new SimpleLogger();
