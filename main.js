import JiraManager from './managers/JiraManager.js';
import ZendeskManager from './managers/ZendeskManager.js';

class Main {
    constructor () {
        this.jiraManager = new JiraManager();
        this.zendeskManager = new ZendeskManager();

        setTimeout(() => {            
            this.jiraManager.init();
            this.zendeskManager.init();
            this.setEvents();
        }, 5000);
    }

    setEvents () {
        chrome.runtime.onMessage.addListener(request => {
            if (request.action === 'syncZendesk') this.zendeskManager.init();
            if (request.action === 'syncJira') this.jiraManager.init();
        });
    }
}

new Main();
