
class JiraManager {
    constructor () {
        this.CLASSES = {
            ISSUE_KEY: 'issuekey',
            TICKET_IDS: '.customfield_16406',
            TICKET_IDS_HEADER: '.headerrow-customfield_16406',
        };

        this.CONFIG = {
            HEADER_TEXT: 'Blocker Tasks Statuses',
        };
    }
  
    init () {
        this.reset();
        this.getTasksStatuses();
        this.createHeaderElement();
    }

    reset () {
        [
            ...Array.from(document.querySelectorAll('.ts-blocker-tasks-status-header')),
            ...Array.from(document.querySelectorAll('.ts-blocker-task-status')),
        ].forEach(element => element.remove());
    }

    getTasksStatuses () {
        const table = document.getElementsByClassName(this.CLASSES.ISSUE_KEY);
        const promises = Array.from(table).map(row => {
            const taskId = row.textContent.trim();

            return this.sendRequest(taskId).then(response => this.createRowElement(row, response));
        });
    
        return Promise.all(promises);
    }
    
  
    sendRequest (taskId) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ name: 'jira', taskId }, resolve);
        });
    }
  
    createRowElement (row, response = '') {
        const newElement = document.createElement('td');
        const linkedIssues = response.fields.issuelinks
            .filter(task => task.hasOwnProperty('inwardIssue'))
            .map(task => `
                <a href="https://winsider.atlassian.net/browse/${ task.inwardIssue.key }">
                    ${ task.inwardIssue.key }
                    <span class="ts-status-label ts-status-${ task.inwardIssue.fields.status.statusCategory.colorName }">
                        ${ task.inwardIssue.fields.status.name }
                    </span>
                </a>`
            ).join('<br/>');
    
        newElement.innerHTML = linkedIssues;
        newElement.classList.add('ts-blocker-task-status');
    
        row.parentNode.insertBefore(newElement, row.parentNode.querySelector(this.CLASSES.TICKET_IDS));
    }
  
    createHeaderElement () {
        const tableHeaders = document.querySelectorAll(this.CLASSES.TICKET_IDS_HEADER);
    
        tableHeaders.forEach(header => {
            const newElement = document.createElement('th');
            newElement.textContent = this.CONFIG.HEADER_TEXT;
            newElement.classList.add('ts-blocker-tasks-status-header');

            header.parentNode.insertBefore(newElement, header.parentNode.querySelector(this.CLASSES.TICKET_IDS_HEADER));
        });
    }
};

export default JiraManager;
