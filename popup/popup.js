document.addEventListener('DOMContentLoaded', () => {
    function sync(action) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: action });
        });
    }
    
    document.getElementById('zendesk-card').addEventListener('click', () => {
        sync('syncZendesk');
    });

    document.getElementById('jira-card').addEventListener('click', () => {
        sync('syncJira');
    });
    
});
