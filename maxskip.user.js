// ==UserScript==
// @name         No ESIA Max
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto-click "Skip" button when download.max.ru link is detected
// @author       edwardcode
// @match        https://esia.gosuslugi.ru/*
// @grant        none
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gosuslugi.ru
// @updateURL    https://github.com/mraliscoder/skip-max-esia/raw/refs/heads/main/maxskip.user.js
// @downloadURL  https://github.com/mraliscoder/skip-max-esia/raw/refs/heads/main/maxskip.user.js
// ==/UserScript==

(function() {
    'use strict';

    function checkAndClick() {
        const targetLink = document.querySelector('a[href="https://download.max.ru/"]');
        if (targetLink) {
            const buttons = document.querySelectorAll('button.plain-button-inline');
            for (let button of buttons) {
                const buttonText = button.textContent.replace(/\s+/g, ' ').trim();
                if (buttonText.includes('Пропустить')) {
                    button.click();
                    return true;
                }
            }
        }
        return false;
    }
    checkAndClick();

    const observer = new MutationObserver((mutations) => {
        if (checkAndClick()) {
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
