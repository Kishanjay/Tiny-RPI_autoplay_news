// ==UserScript==
// @name         Autoplay featured news
// @version      1.0
// @description  Autoplays NOS featured news
// @author       Kishan Nirghin
// @match        https://nos.nl/uitzendingen/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector(".broadcast-link--featured").click()
})();