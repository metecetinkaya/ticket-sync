(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}const o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.TYPE="jira",this.CONFIG={HEADER_TEXT:"Blocker Tasks Statuses"},this.CLASSES={ISSUE_KEY:".issuekey",TICKET_IDS:".customfield_16406",TICKET_IDS_HEADER:".headerrow-customfield_16406"}}var n,o;return n=t,(o=[{key:"init",value:function(){var t=this;this.reset(),this.createTableElements(),this.sendRequest(this.getTaskIds()).then((function(e){return t.createLabels(e)}))}},{key:"reset",value:function(){[].concat(e(Array.from(document.querySelectorAll(".ts-blocker-tasks-status-header"))),e(Array.from(document.querySelectorAll(".ts-blocker-task-status")))).forEach((function(t){return t.remove()}))}},{key:"createTableElements",value:function(){var t=this,e=document.querySelectorAll(this.CLASSES.TICKET_IDS_HEADER),n=document.querySelectorAll(this.CLASSES.TICKET_IDS);e.forEach((function(e){var n=document.createElement("th");n.textContent=t.CONFIG.HEADER_TEXT,n.classList.add("ts-blocker-tasks-status-header"),e.insertAdjacentElement("beforebegin",n)})),n.forEach((function(t){var e=document.createElement("td");e.classList.add("ts-blocker-task-status"),t.insertAdjacentElement("beforebegin",e)}))}},{key:"sendRequest",value:function(t){var e=this;return new Promise((function(n){chrome.runtime.sendMessage({type:e.TYPE,taskIds:t},n)}))}},{key:"getTaskIds",value:function(){return Array.from(document.querySelectorAll(this.CLASSES.ISSUE_KEY)).map((function(t){return t.textContent.trim()}))}},{key:"createLabels",value:function(t){console.log(t,"jira"),t.forEach((function(t){var e=document.querySelector('[data-issue-key="'.concat(t.key,'"]')).parentNode.parentNode,n=t.inwardIssues.reduce((function(t,e){return"".concat(t,'\n            <span class="ts-tag-container">\n                <a class="ts-blocker-task" href="https://winsider.atlassian.net/browse/').concat(e.inwardIssue.key,'">\n                    ').concat(e.inwardIssue.key,'\n                </a>\n                <span class="ts-status-label ts-status-').concat(e.inwardIssue.fields.status.statusCategory.colorName,'">\n                    ').concat(e.inwardIssue.fields.status.name,"\n                </span>\n            </span>")}),"");e.querySelector(".customfield_16406").previousElementSibling.innerHTML=n}))}}])&&r(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}();function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function a(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==i(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===i(o)?o:String(o)),r)}var o}const u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.TYPE="zendesk",this.CONFIG={HEADER_TEXT:"Zendesk Ticket Statuses"},this.CLASSES={TICKET_IDS:".customfield_16406",TICKET_IDS_HEADER:".headerrow-customfield_16406"}}var e,n;return e=t,(n=[{key:"init",value:function(){var t=this;this.reset(),this.createTableElements(),this.sendRequest(this.getTicketIds()).then((function(e){return t.createLabels(e)}))}},{key:"reset",value:function(){[].concat(a(Array.from(document.querySelectorAll(".ts-ticket-status-header"))),a(Array.from(document.querySelectorAll(".ts-ticket-status")))).forEach((function(t){return t.remove()}))}},{key:"createTableElements",value:function(){var t=this,e=document.querySelectorAll(this.CLASSES.TICKET_IDS_HEADER),n=document.querySelectorAll(this.CLASSES.TICKET_IDS);e.forEach((function(e){var n=document.createElement("th");n.textContent=t.CONFIG.HEADER_TEXT,n.classList.add("ts-ticket-status-header"),e.insertAdjacentElement("afterend",n)})),n.forEach((function(t){var e=document.createElement("td");e.classList.add("ts-ticket-status"),t.insertAdjacentElement("afterend",e)}))}},{key:"sendRequest",value:function(t){var e=this;return new Promise((function(n){chrome.runtime.sendMessage({type:e.TYPE,ticketIds:t},n)}))}},{key:"getTicketIds",value:function(){return Array.from(document.querySelectorAll(this.CLASSES.TICKET_IDS)).map((function(t){return t.textContent.trim()})).reduce((function(t,e){return e&&e.split(",").forEach((function(e){return t.push(e.trim())})),t}),[])}},{key:"createLabels",value:function(t){console.log(t,"zendesk"),t.forEach((function(t){var e=document.querySelectorAll(".customfield_16406"),n=Array.from(e).find((function(e){return e.textContent.includes(t.id)})),r=document.createElement("span"),o='\n            <div class="ts-zendesk-status-label ts-status-'.concat(t.status,'">').concat(t.status,'</div>\n            <div class="ts-ticket-duration">').concat(t.duration,"</div>");r.classList.add("ts-tag-container"),r.innerHTML=o,n.nextElementSibling.appendChild(r)}))}}])&&c(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}const d=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.TYPE="zendesk",this.CONFIG={HEADER_TEXT:"TicketSync",HEADER_LOGO:"https://i.ibb.co/fHvBZf6/512.png",LINKED_TICKET_STATUS:"Linked Ticket Status",ZENDESK_TICKET_PREFIX:"https://useinsiderhelp.zendesk.com/agent/tickets",NO_LINKED_TICKET_FOUNDED:"No linked ticket founded"},this.SELECTORS={TICKET_IDS:'[aria-label="Edit Zendesk Ticket IDs"]',APPEND_LOCATION:'[data-testid="issue-view-layout-templates-views.ui.context.visible-hidden.ui.primary-items"]'}}var e,n;return e=t,(n=[{key:"init",value:function(){var t=this;this.sendRequest(this.getTicketIds()).then((function(e){t.reset(),t.createTicketArea(e)}))}},{key:"reset",value:function(){var t;null===(t=document.querySelector(".ts-wrapper"))||void 0===t||t.remove()}},{key:"sendRequest",value:function(t){var e=this;return new Promise((function(n){chrome.runtime.sendMessage({type:e.TYPE,ticketIds:t},n)}))}},{key:"getTicketIds",value:function(){var t=document.querySelector(this.SELECTORS.TICKET_IDS).nextSibling.textContent.trim();return t.includes(",")?t.split(","):[t]}},{key:"createTicketArea",value:function(t){var e=this;console.log(t);var n=document.querySelector(this.SELECTORS.APPEND_LOCATION),r=document.createElement("div"),o='\n        <div class="ts-header">\n            <img class="ts-header-logo" src="'.concat(this.CONFIG.HEADER_LOGO,'">\n            ').concat(this.CONFIG.HEADER_TEXT,'\n        </div>\n        <div class="ts-container">\n            <div class="ts-item">\n                <div class="ts-title">').concat(this.CONFIG.LINKED_TICKET_STATUS,'</div>\n                <div class="ts-tag-wrapper">\n                ').concat(t.length?t.reduce((function(t,n){return"".concat(t,'\n                        <div class="ts-tag-container">\n                            <a class="ts-ticket-number" target="_blank" href="').concat(e.CONFIG.ZENDESK_TICKET_PREFIX,"/").concat(n.id,'">\n                                ').concat(n.id,'\n                            </a>\n                            <div class="ts-zendesk-status-label ts-status-').concat(n.status,'">').concat(n.status,'</div>\n                            <div class="ts-ticket-duration">').concat(n.duration,"</div>\n                        </div>")}),""):"<div>".concat(this.CONFIG.NO_LINKED_TICKET_FOUNDED,"</div>"),"\n                </div>\n            </div>\n        </div>");r.classList.add("ts-wrapper"),r.innerHTML=o,n.append(r)}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==y(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===y(o)?o:String(o)),r)}var o}new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.jiraManager=new o,this.zendeskManager=new u,this.browseManager=new d,this.setEvents()}var e,n;return e=t,(n=[{key:"start",value:function(){var t=this;setTimeout((function(){window.location.pathname.includes("dashboard")?(t.jiraManager.init(),t.zendeskManager.init()):window.location.pathname.includes("browse")&&t.browseManager.init()}),5e3)}},{key:"setEvents",value:function(){var t=this;window.navigation.addEventListener("navigate",(function(){t.start()})),chrome.runtime.onMessage.addListener((function(e){"syncJira"===e.action&&t.jiraManager.init(),"syncZendesk"===e.action&&(window.location.pathname.includes("browse")?t.browseManager.init():t.zendeskManager.init())}))}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}())})();