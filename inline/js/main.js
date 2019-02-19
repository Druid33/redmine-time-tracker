
if (document.readyState === "complete") {
    onPageLoad();
} else {
    window.addEventListener("load", function(event) {
        console.log('event load called');
        onPageLoad();
    });
}


function onPageLoad() {
    var displayedPage = new DisplayedPage(logger),
        timeTrackManager,
        trackButtons,
        onTrackStartClick,
        onTrackStopClick,
        activeTrack
    ;
    logger.turnOn();
    logger.log('Redmine Time Tracker is loaded');

    displayedPage.parsePageContent();

    if (displayedPage.issueId === false) {
        logger.log('Displayed page doesnt contain trackable page');
        return;
    }
    logger.log('Trackable page detected');

    chrome.runtime.onMessage.addListener(function(message, callerInfo, callback) {
        console.log('INLINE ' + displayedPage.issueId + ': incoming message', message);
    });

    chrome.runtime.sendMessage({greeting: "hello", issueId: displayedPage.issueId}, function(response) {
        console.log('response from BS:', response);
    });

    trackButtons = new TrackButtons(logger);

    timeTrackManager = new TimeTrackManager();
    timeTrackManager.loadTracks().then(items => {
        activeTrack = timeTrackManager.getActiveTrack();
        logger.log('active track: ' + activeTrack.id);
        if (activeTrack && (activeTrack.id === displayedPage.issueId)) {
            trackButtons.switchToTrackingActiveState();
        } else {
            trackButtons.switchToTrackingInactiveState();
        }
    });

    onTrackStartClick = function() {
        logger.log('start btn clicked');
        timeTrackManager.startTrackTime(displayedPage.issueId);
        trackButtons.switchToTrackingActiveState();
    };
    onTrackStopClick = function() {
        logger.log('stop btn clicked');
        timeTrackManager.stopTrackTime();
        trackButtons.switchToTrackingInactiveState();
    };


    trackButtons.addStartBtnClickListener(onTrackStartClick);
    trackButtons.addStopBtnClickListener(onTrackStopClick);

    displayedPage.addTrackButton(trackButtons.getHtmlElement());
}
