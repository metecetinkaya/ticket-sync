class JiraManager {
    constructor () {
        this.TYPE = 'jira';
        this.CONFIG = {
            HEADER_TEXT: 'Blocker Tasks Statuses',
        };

        this.CLASSES = {
            ISSUE_KEY: '.issuekey',
            TICKET_IDS: '.customfield_16406',
            TICKET_IDS_HEADER: '.headerrow-customfield_16406',
        };
    }

    /**
     * @returns {void}
     */
    init () {
        this.reset();
        this.createTableElements();
        this.sendRequest(this.getTaskIds()).then(response => this.createLabels(response));
    }

    /**
     * @returns {void}
     */
    reset () {
        [
            ...Array.from(document.querySelectorAll('.ts-blocker-tasks-status-header')),
            ...Array.from(document.querySelectorAll('.ts-blocker-task-status')),
        ].forEach(element => element.remove());
    }

    /**
     * @returns {void}
     */
    createTableElements () {
        const tableHeaders = document.querySelectorAll(this.CLASSES.TICKET_IDS_HEADER);
        const tableRows = document.querySelectorAll(this.CLASSES.TICKET_IDS);

        tableHeaders.forEach(header => {
            const newElement = document.createElement('th');
            newElement.textContent = this.CONFIG.HEADER_TEXT;
            newElement.classList.add('ts-blocker-tasks-status-header');

            header.insertAdjacentElement('beforebegin', newElement)
        });

        tableRows.forEach(row => {
            const newElement = document.createElement('td');
            newElement.classList.add('ts-blocker-task-status');

            row.insertAdjacentElement('beforebegin', newElement)
        });
    }

    /**
     * @param {string[]} ticketIds
     * @returns {Promise[]}
     */
    sendRequest (taskIds) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ type: this.TYPE, taskIds }, resolve);
        });
    }

    /**
     * @returns {Array}
     */
    getTaskIds () {
        return Array.from(document.querySelectorAll(this.CLASSES.ISSUE_KEY)).map(row => row.textContent.trim());
    }

    /**
     * @param {Object[]} response 
     * @returns {void}
     */
    createLabels (response) {
        response.forEach(task => {
            const row = document.querySelector(`[data-issue-key="${ task.key }"]`).parentNode.parentNode;
            const labels = task.inwardIssues.reduce((acc, task) => `${ acc }
                <a href="https://winsider.atlassian.net/browse/${ task.inwardIssue.key }">
                    ${ task.inwardIssue.key }
                    <span class="ts-status-label ts-status-${ task.inwardIssue.fields.status.statusCategory.colorName }">
                        ${ task.inwardIssue.fields.status.name }
                    </span>
                </a><br/>`
            ,'');

            row.querySelector('.customfield_16406').previousElementSibling.innerHTML = labels;
        });
    }
};

export default JiraManager;
