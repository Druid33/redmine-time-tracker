if (document.readyState === "complete") {
    onPageLoad();
} else {
    window.addEventListener("load", function(event) {
        console.log('event load called');
        onPageLoad();
    });
}


function onPageLoad() {
    var me = this,
        timeTrackManager = new TimeTrackManager(),
        clearBtn = document.getElementById('clearTrackHistoryBtn');
    ;

    timeTrackManager.loadTracks().then(items => {
        me._displayActiveTrack(items.activeTrack);
        me._clearTracksHistory();
        me._addTracksToHistory(items.oldTracks);
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', (event) => {
            var clearConfirmation;
            console.log('click');
            clearConfirmation = confirm('Clear track history?');
            if (clearConfirmation) {
                timeTrackManager.clearTrackHistory();
                _clearTracksHistory();
            }
        });
    }

}

function _displayActiveTrack(track) {
    var activeTrackDiv = document.getElementById("activeTrack"),
        element
    ;
    track = Object.assign({}, track);
    track.stop = Date.now();
    element = createElementForTrack(track);
    activeTrackDiv.appendChild(element);
}


function _clearTracksHistory() {
    var trackHistoryDiv = document.getElementById("trackHistory")
    ;
    while (trackHistoryDiv.hasChildNodes()) {
        trackHistoryDiv.removeChild(trackHistoryDiv.lastChild);
    }
}


function _addTracksToHistory(tracks) {
    var me = this,
        element,
        trackHistoryDiv = document.getElementById("trackHistory")
    ;

    tracks.forEach(track => {
        element = me.createElementForTrack(track);
        trackHistoryDiv.appendChild(element);
    });
}

function createElementForTrack(track) {
    var start, stop, duration, html, startDate, stopDate
    ;
    startDate = new Date(track.start);
    stopDate = new Date(track.stop);
    start = startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString();
    stop = stopDate.toLocaleDateString() + ' ' + stopDate.toLocaleTimeString();
    duration = secToString(Math.floor((track.stop - track.start) / 1000));

    return getElementForTrack(track.id, start, stop, duration);
}

function getElementForTrack(id, start, stop, duration) {
    var html;

    html = '<div class="trackHistoryRow">';
    html += '<span class="track-id">#' + id + '</span>';
    html += '<span class="track-start">' + start + '</span>';
    html += '<span class="track-stop">' + stop + '</span>';
    html += '<span class="track-duration">' + duration + '</span>';
    html += '</div>';

    return document.createRange().createContextualFragment(html);
}

/**
 * secToString
 *
 * skonvertuje pocet sekund na citatelny ludsky retazec v tvare XX hodin XX minut
 *
 * @author Peter Skultety
 * @param  {[type]} seconds [description]
 * @return {[type]}         [description]
 */
function secToString(seconds) {
    var
        years = Math.floor(seconds / (3600 * 24 * 30 * 12)),
        months = Math.floor((seconds - (years * 3600 * 24 * 30 * 12)) / (3600 * 24 * 30)),
        days = Math.floor((seconds - (years * 3600 * 24 * 30 * 12) - (months * 3600 * 24 * 30)) / (3600 * 24)),
        hours = Math.floor((seconds - (years * 3600 * 24 * 30 * 12) - (months * 3600 * 24 * 30) - (days * 3600 * 24)) / 3600),
        minutes = Math.floor((seconds - (years * 3600 * 24 * 30 * 12) - (months * 3600 * 24 * 30) - (days * 3600 * 24) - (hours * 3600)) / 60),
        dayStr = '',
        hourStr = '',
        minuteStr = '',
        monthStr = '',
        yearStr = ''
        ;

    if (years > 0) {
        yearStr = years + 'y';
    }

    if (months > 0) {
        monthStr = months + 'mo';
    }

    if (days > 0) {
        dayStr = days + 'd';
    }

    if (hours > 0) {
        hourStr = hours + 'h';
    }

    if (minutes > 0) {
        minuteStr = minutes + 'mi';
    }

    if (years > 0) {
        return yearStr + ' ' + monthStr + ' ' + dayStr + ' ' + hourStr + ' ' + minuteStr;
    }

    if (months > 0) {
        return monthStr + ' ' + dayStr + ' ' + hourStr + ' ' + minuteStr;
    }

    if (days > 0) {
        return dayStr + ' ' + hourStr + ' ' + minuteStr;
    }

    if (hours > 0) {
        return hourStr + ' ' + minuteStr;
    }

    if (minutes > 0) {
        return minuteStr;
    }

    // trvanie mensie ako 60s chceme zobrazit ako netrackovane
    return '-';
}
