'use strict';

module.exports = Franz => {
  function getMessages() {
    let directCount   = 0;
    let indirectCount = 0;

    const elements = document.querySelectorAll('div#_roomListArea li._unreadBadge > span');

    Array.prototype.forEach.call(elements, item => {
      const icon = item.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('img');
      let count  = 0;

      if (item.innerText) {
        count = parseInt(item.innerText, 10);
      }

      if (icon && icon.src.indexOf('://appdata.chatwork.com/icon/') != -1) {
        // Count incoming group messages as indirectCount
        indirectCount += count;
      } else {
        directCount += count;
      }
    });

    Franz.setBadge(directCount, indirectCount);
  }

  Franz.loop(getMessages);
};
