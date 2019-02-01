// ==UserScript==
// @name         Fullscreen news broadcast
// @version      1.0
// @description  Waits until the player is ready, puts it into fullscreen modus; When the broadcast has ended display todays weather.
// @author       Kishan Nirghin
// @match        https://nos.nl/uitzending/*.html
// @grant        none
// ==/UserScript==
(function() {
    doFullScreen();
})();

/**
 * Since the full-screen button is not very javascript friendly,
 * A hack-around is used to have the player appear in fullscreen.
 *
 * Essentially we monitor the classes of the video player, as soon as it
 * takes on one of the VID_ELE_READY_CLASSES, it means that the videoplayer has
 * finished loading; and thus we can put it into fullscreen.
 * To put the player into fullscreen we overwrite the class to VID_ELE_FULLSCREEN_CLASS
 */
function doFullScreen(){
    var VID_ELE_READY_CLASSES = ["jwplayer jw-reset jw-state-playing jw-stretch-uniform jw-flag-aspect-mode jw-skin-nos jw-breakpoint-5 jw-no-focus", "jwplayer jw-reset jw-state-playing jw-stretch-uniform jw-flag-aspect-mode jw-skin-nos jw-breakpoint-5 jw-flag-user-inactive"];
    var VID_ELE_FULLSCREEN_CLASS = "jwplayer jw-reset jw-state-playing jw-stretch-uniform jw-flag-aspect-mode jw-skin-nos jw-breakpoint-7 jw-no-focus jw-flag-fullscreen";

    var vidEle = document.getElementById("video0"); /* The video player wrapper */
    var vidClasses = vidEle.getAttribute("class");

    if (VID_ELE_READY_CLASSES.includes(vidClasses)){
        vidEle.setAttribute("class", VID_ELE_FULLSCREEN_CLASS);

        /* Hide the video controls */
        document.querySelector(".jw-controls").style.display = "none";

        /* when the broadcast has ended, go and display the weather */
        document.querySelector("video").addEventListener('ended', function () {
            window.location.href = "https://www.weerplaza.nl/nederland/amsterdam/5575/";
        });

        return;
    }

    console.log("Player not ready for fullscreen");
    setTimeout(doFullScreen, 3000);
}