class ZendeskManager {
    constructor () {
        this.CLASSES = {
            TICKET_IDS: 'customfield_16406',
            TICKET_IDS_HEADER: '.headerrow-customfield_16406',
        };

        this.CONFIG = {
            HEADER_TEXT: 'Zendesk Ticket Statuses',
        };
    }

    init () {
        this.reset();
        this.getTicketsStatus();
        this.createHeaderElement();
    }

    reset () {
        [
            ...Array.from(document.querySelectorAll('.ts-ticket-status-header')),
            ...Array.from(document.querySelectorAll('.ts-ticket-status')),
        ].forEach(element => element.remove());
    }

    getTicketsStatus () {
        const table = document.getElementsByClassName(this.CLASSES.TICKET_IDS);
    
        const promises = Array.from(table).map(row => {
            const ticketId = row.textContent.trim();
    
            if (ticketId.includes(',')) {
                const promiseArray = ticketId.split(',').map(ticket => this.sendRequest(ticket));
                
                return Promise.all(promiseArray).then(ticketStatuses => this.createRowElement(row, ticketStatuses.join(', ')));
            } else if (ticketId) {
                return this.sendRequest(ticketId).then(ticketStatus => this.createRowElement(row, ticketStatus));
            } else {
                this.createRowElement(row);
                
                return Promise.resolve();
            }
        });
    
        return Promise.all(promises);
    }

    sendRequest (ticketId) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ name: 'zendesk', ticketId }, (response) => {
                if (response && response.ticket && response.ticket.status) {
                    resolve(response.ticket.status);
                }
            });
        });
    }

    createRowElement (row, ticketStatus = '') {
        const newElement = document.createElement('td');
        newElement.innerHTML = `<span class="ts-zendesk-status-label ts-status-${ticketStatus}">${ticketStatus}</span>`;
        newElement.classList.add('ts-ticket-status');

        row.insertAdjacentElement('afterend', newElement);
    }

    createHeaderElement () {
        const tableHeaders = document.querySelectorAll(this.CLASSES.TICKET_IDS_HEADER);

        tableHeaders.forEach(header => {
            const newElement = document.createElement('th');
            newElement.textContent = this.CONFIG.HEADER_TEXT;
            newElement.classList.add('ts-ticket-status-header');

            header.insertAdjacentElement('afterend', newElement)
        });
    }
}

export default ZendeskManager;
