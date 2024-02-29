chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'zendesk') {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                list: request.ticketIds,
            })
        };

        fetch('https://optimus-insight.useinsider.com/api/public/ticket-sync/zendesk', requestOptions)
            .then(response => response.json())
            .then(result => sendResponse(result))
            .catch(err => console.log(err));

        return true;
    }

    if (request.type === 'jira') {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                list: request.taskIds,
            })
        };
    
        fetch('https://optimus-insight.useinsider.com/api/public/ticket-sync/jira', requestOptions)
            .then(response => response.json())
            .then(result => sendResponse(result))
            .catch(err => console.log(err));

        return true;
    }
});