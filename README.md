# RPI News autoplayer
Thought it would be cool to autoplay the latest news on my TV every morning.
To achieve this I used a RaspberryPI model 3B+.

Essentially what the PI should do is:
- Turn on the TV every morning at 9AM
- Open up a webbrowser
- Navigate to www.nos.nl/uitzendingen
- Play the latest news broadcast
- Set the player to full-screen
- When the broadcast ends: close the browser and turn off TV

## SETUP
### Requirements
chromium
_Should be preinstalled on RPI_

tampermonkey plugin for chromium
https://tampermonkey.net/

cec-utils
`apt-get install cec-utils`

### HOW-TO-SETUP
1. Import both tampermonkey scripts to chromium
2. Download playnews.sh to your desktop
3. Run `chmod +x playnews.sh` from terminal (to make playnews exacutable)
3. Run `crontab -e` from the terminal
4. Add this line: `0 9 * * * /home/pi/Desktop/playnews.sh`

## HOW-TO-DEVELOP Building blocks
The necessary building blocks to achieve such a result are described below

### TV control
To control the TV the HDMI CEC controller can be used.
`apt-get install cec-utils`

Turn off TV:
 `echo 'standby 0' | cec-client -s -d 1`

 Turn on TV:
 `echo 'on 0' | cec-client -s -d 1`


### Open webbrowser
Ideally a webdriver should be used to controll the browser and its behaviour.
But for simplicity I used the default PI browser chromium.

So opening up a webbrowser can be done using the terminal command:
`/usr/bin/chromium-browser www.nos.nl/uitzendingen --start-fullscreen`

This opens up the browser in full-screen at the desired page.

_This may require `export DISPLAY=:0` to work (e.g. over ssh, or via cronjobs)_

### Interact with website
To interact with the website, we are using javascript.

With the help of the tampermonkey plugin we can execute any JS code
at any given time.

A tampermonkey script is created to click on the featured news broadcast
whenever the www.nos.nl/uitzendingen page is loaded
_See tampermonkey/script1.js_

Once the featured news item starts playing, the player should be put into
fullscreen mode.
A tampermonkey script is created that does this for every URL that matches:
www.nos.nl/uitzending/*.html
_See tampermonkey/script2.js_

### Connecting the pieces
The building blocks above are added to a bash file.

_see playnews.sh_

This script does everything that is required for a good autoplayer.
It opens up the browser; the tampermonkey plugin then takes controll and plays
the desired news item.

After 30 minutes the broadcast has ended, and the browser process is killed
and the TV gets turned off.

To run this script every morning at 9AM a cronjob is added