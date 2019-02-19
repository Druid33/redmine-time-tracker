chrome.runtime.onMessage.addListener(function(message, callerInfo, callback) {
    var extensionId = callerInfo.id,
        tab = callerInfo.tab
    ;
    console.log('BS: incoming message', message);

    chrome.tabs.sendMessage(tab.id, {greeting: "i got it"}, function(response) {
      console.log(response);
    });

    callback({msg: 'i got it'});
});