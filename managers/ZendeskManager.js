class ZendeskManager {
    constructor () {
        this.TYPE = 'zendesk';
        this.CONFIG = {
            HEADER_TEXT: 'Zendesk Ticket Statuses',
        };
        this.CLASSES = {
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
        this.sendRequest(this.getTicketIds()).then(response => this.createLabels(response));
    }

    /**
     * @returns {void}
     */
    reset () {
        [
            ...Array.from(document.querySelectorAll('.ts-ticket-status-header')),
            ...Array.from(document.querySelectorAll('.ts-ticket-status')),
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
            newElement.classList.add('ts-ticket-status-header');

            header.insertAdjacentElement('afterend', newElement)
        });

        tableRows.forEach(row => {
            const newElement = document.createElement('td');
            newElement.classList.add('ts-ticket-status');

            row.insertAdjacentElement('afterend', newElement)
        });
    }

    /**
     * @param {string[]} ticketIds
     * @returns {Promise[]}
     */
    sendRequest (ticketIds) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ type: this.TYPE, ticketIds }, resolve);
        });
    }

    /**
     * @returns {Array}
     */
    getTicketIds () {
        const ticketIds = Array.from(document.querySelectorAll(this.CLASSES.TICKET_IDS)).map(row => row.textContent.trim());

        return ticketIds.reduce((newArray, item) => {
            if (item) {
                item.split(',').forEach(id => newArray.push(id.trim()));
            }

            return newArray;
        }, []);
    }

    /**
     * @param {Object[]} response 
     * @returns {void}
     */
    createLabels (response) {
        // TODO: will need to implement to backend
        response = response.tickets.map(ticket =>{
            return {
                id: ticket.id,
                status: ticket.status,
            }
        })

        response.forEach(ticket => {
            const elements = document.querySelectorAll('.customfield_16406');
            const row = Array.from(elements).find(element => element.textContent.includes(ticket.id));
            const newElement = document.createElement('span');
            newElement.classList.add('ts-zendesk-status-label');
            newElement.classList.add(`ts-status-${ ticket.status }`);
            newElement.textContent = ticket.status

            row.nextElementSibling.appendChild(newElement);
        });
    }
}

export default ZendeskManager;
