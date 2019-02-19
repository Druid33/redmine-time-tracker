class TimeTrack {
    constructor(id, start, stop = null) {
        this.id = id;
        this.start = start;
        this.stop = stop;
    }
}

class TimeTrackManager {

    constructor() {
        // todo nacitat tie veci
        this.activeTrack = null;
        this.oldTracks = [];
    }

    loadTracks() {
        var me = this;
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get({
                "sample": null,
                "sample2": null,
                "activeTrack": null,
                "oldTracks": [],
            }, function(items) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                    return;
                }
                me.activeTrack = items.activeTrack;
                me.oldTracks = items.oldTracks;
                logger.log('tracks loaded');
                logger.log(me.activeTrack);
                logger.log(me.oldTracks);
                resolve(items);
            });
        });
    }

    getActiveTrack() {
        return this.activeTrack;
    }

    startTrackTime(issueId) {
        var newTrack;

        this.stopTrackTime();

        newTrack = new TimeTrack(issueId, Date.now(), null);
        this.activeTrack = newTrack;
        this._saveTracks();
    }

    stopTrackTime() {
        if (this.activeTrack) {
            this.activeTrack.stop = Date.now();
            this.oldTracks.push(this.activeTrack);
        }
    }

    clearTrackHistory() {
        this.oldTracks = [];
        this._saveTracks();
    }

    _saveTracks() {
        chrome.storage.sync.set({
            activeTrack: this.activeTrack,
            oldTracks: this.oldTracks
        }, function() {
            if (chrome.runtime.lastError) {
                logger.log(chrome.runtime.lastError);
            } else {
                logger.log('time tracks saved');
            }
        });
    }
}