# A simple script to archive read messages

## tl;dr
Archives read messages after *x* days in Inbox, unless tagged.

## More
Keeps your Inbox tidy by archiving all read messages after a number of days, skipping over messages tagged with one or more of your *'protected'* labels.

## How-to:
1. Install the script. Start [here](http://www.google.com/script/start/ "Google Apps Script").
2. Set-up your *'protected'* labels in `getProtectedLabels_()`.
3. Set your archival period *(in days)* in `sweepInbox()` - `var archivalPeriod = daysToMs_(7);`.
4. Set `sweepInbox()` to run every night.
