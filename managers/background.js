chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'zendesk') {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': '__cfruid=7fc5310051ef6c220e36da2e4a3a8f09d1bd5d3b-1698857077; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--459ed01949a36415c1716b5711271c3d08918307; __cfruid=22f6cdec6ce76a9bd4cbc23882552122db9c98e8-1699000162',
                'Authorization': 'Basic bWV0ZWhhbi5jZXRpbmtheWFAdXNlaW5zaWRlci5jb206c3V3MTd1anJrcg=='
            },
            redirect: 'follow'
        };
    
        fetch(`https://useinsiderhelp.zendesk.com/api/v2/tickets/show_many.json?ids=${ request.ticketIds.join(',') }`, requestOptions)
            .then(response => response.json())
            .then(result => sendResponse(result));

        return true;
    }

    if (request.type === 'jira') {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic bWV0ZWhhbi5jZXRpbmtheWFAdXNlaW5zaWRlci5jb206QVRBVFQzeEZmR0YwbEZQLWdNTmJwWEhxNmEyZm1aWVNNcVBFUzN5QUlIODFGQy1KbDV4djR3bUN2TEpPV010NlBUTWJOYUw2RFZucVdwczVYMWZJV1BKRkFSdlhURGFsYTM0MFk1d1VGMUVsS2VXU0JpdzlnTTZlSUVVTm9SMHp1WDZtOG9UaWdSc1hsTTktODc3enBHOWNwcHRIN0x0am1EajV2bTJWWTBCWTdmQ3oxUGg3NGNZPTk1NUVEMkEx'
            },
            body: JSON.stringify({
                jql: `key in (${ request.taskIds.join(',') })`,
                maxResults: request.taskIds.length,
            })
        };
    
        fetch('https://winsider.atlassian.net/rest/api/3/search', requestOptions)
            .then(response => response.json())
            .then(result => sendResponse(result));

        return true;
    }
});