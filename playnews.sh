#!/bin/bash
echo 'on 0' | cec-client -s -d 1
export DISPLAY=:0
/usr/bin/chromium-browser www.nos.nl/uitzendingen --start-fullscreen &
TASK_PID=$!
sleep 30m #wait 30 minutes before killing the browser and turning off the tv
kill $TASK_PID
echo 'standby 0' | cec-client -s -d 1