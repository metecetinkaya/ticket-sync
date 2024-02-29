import JiraManager from './managers/JiraManager.js';
import ZendeskManager from './managers/ZendeskManager.js';
import BrowseManager from './managers/BrowseManager.js';

class Main {
    constructor () {
        this.jiraManager = new JiraManager();
        this.zendeskManager = new ZendeskManager();
        this.browseManager = new BrowseManager();

        this.setEvents();
    };

    start () {
        setTimeout(() => {    
            if (window.location.pathname.includes('dashboard')) {
                this.jiraManager.init();
                this.zendeskManager.init();
            } else if (window.location.pathname.includes('browse')) {        
                this.browseManager.init();
            }
        }, 5000);
    };

    setEvents () {
        window.navigation.addEventListener('navigate', () => {
            this.start();
        });

        chrome.runtime.onMessage.addListener(request => {
            if (request.action === 'syncJira') this.jiraManager.init();
            if (request.action === 'syncZendesk') {
                window.location.pathname.includes('browse') ? this.browseManager.init() : this.zendeskManager.init();
            }
        });
    };
};

new Main();
