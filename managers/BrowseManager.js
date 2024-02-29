class BrowseManager {
    constructor () {
        this.TYPE = 'zendesk';
        this.CONFIG = {
            HEADER_TEXT: 'TicketSync',
            HEADER_LOGO: 'https://i.ibb.co/fHvBZf6/512.png',
            LINKED_TICKET_STATUS: 'Linked Ticket Status',
            ZENDESK_TICKET_PREFIX: 'https://useinsiderhelp.zendesk.com/agent/tickets',
            NO_LINKED_TICKET_FOUNDED: 'No linked ticket founded',
        };

        this.SELECTORS = {
            TICKET_IDS: '[aria-label="Edit Zendesk Ticket IDs"]',
            APPEND_LOCATION: '[data-testid="issue-view-layout-templates-views.ui.context.visible-hidden.ui.primary-items"]',
        };
    };

    /**
     * @returns {void}
     */
    init () {
        this.reset();
        this.sendRequest(this.getTicketIds()).then(response => this.createTicketArea(response));
    };

    /**
     * @returns {void}
     */
    reset () {
        document.querySelector('.ts-wrapper')?.remove();
    };

    /**
     * @param {string[]} ticketId
     * @returns {Promise[]}
     */
    sendRequest (ticketIds) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ type: this.TYPE, ticketIds }, resolve);
        });
    };

    /**
     * @returns {Array}
     */
    getTicketIds () {
        const ticketId = document.querySelector(this.SELECTORS.TICKET_IDS).nextSibling.textContent.trim();

        if (ticketId.includes(',')) {
            return ticketId.split(',');
        }

        return [ticketId];
    };

    /**
     * @param {Object[]} response 
     * @returns {void}
     */
    createTicketArea (response) {
        const element = document.querySelector(this.SELECTORS.APPEND_LOCATION);
        const newElement = document.createElement('div');
        const innerHTML = `
        <div class="ts-header">
            <img class="ts-header-logo" src="${ this.CONFIG.HEADER_LOGO }">
            ${ this.CONFIG.HEADER_TEXT }
        </div>
        <div class="ts-container">
            <div class="ts-item">
                <div class="ts-title">${ this.CONFIG.LINKED_TICKET_STATUS }</div>
                <div class="ts-tag-wrapper">
                ${ response.length 
                    ? response.reduce((acc, ticket) => {
                        return `${ acc }
                        <div class="ts-tag-container">
                            <a class="ts-ticket-number" target="_blank" href="${ this.CONFIG.ZENDESK_TICKET_PREFIX }/${ ticket.id }">
                                ${ ticket.id }
                            </a>
                            <div class="ts-zendesk-status-label ts-status-${ ticket.status }">${ ticket.status }</div>
                            <div class="ts-ticket-duration">${ ticket.duration || '2d 10h' }</div>
                        </div>`;
                    }, '')
                    : `<div>${ this.CONFIG.NO_LINKED_TICKET_FOUNDED }</div>`
                }
                </div>
            </div>
        </div>`;

        newElement.classList.add('ts-wrapper');
        newElement.innerHTML = innerHTML;
        element.append(newElement);
    };
};

export default BrowseManager;
