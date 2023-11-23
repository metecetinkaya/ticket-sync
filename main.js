import JiraManager from './managers/JiraManager.js';
import ZendeskManager from './managers/ZendeskManager.js';

class Main {
    constructor() {
        this.jiraManager = new JiraManager();
        this.zendeskManager = new ZendeskManager();

        setTimeout(() => {            
            this.jiraManager.init();
            this.zendeskManager.init();
            this.setEvents();
        }, 5000);
    }

    setEvents() {
        chrome.runtime.onMessage.addListener(request => {
            if (request.action === 'syncZendesk') this.zendeskManager.init();
            //if (request.action === 'syncZendesk') chrome.runtime.sendMessage({ type: 'zendesk', list: ['134576', '140561'] });
            //if (request.action === 'syncJira') chrome.runtime.sendMessage({ type: 'jira', taskIds: ['OPT-141573', 'OPT-142298', 'OPT-141296'] });
            if (request.action === 'syncJira') this.jiraManager.init();
        });
    }
}

new Main();
