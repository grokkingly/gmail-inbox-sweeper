function daysToMs_(days){
  return days*24*60*60*1000;
}

// protected labels - do not archive
function getProtectedLabels_(){
  var labels = ["active/do", "active/hold"];
  
  return labels
}

/*
 * forEach taken from Marijn Haverbeke's "Eloquent JavaScript"
 * http://eloquentjavascript.net/
 */
function forEach_(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

// checks GmailLabel array for the presence of one or more label names from 
function commonValue_(gmailLabels, textLabels) {
 for (var i = 0; i < gmailLabels.length; i++)
   for (var j = 0; j < textLabels.length; j++)
     if (gmailLabels[i].getName === textLabels[j])
       return true;
  return false;
}

// archives read emails in Inbox, older than "archivalPeriod"
function sweepInbox(){
  var page, thread, offset, now;
  var PAGE_LENGTH = 100;
  var archivalPeriod = daysToMs_(7);
  var protectedLabels = getProtectedLabels_();
  
  page = null;
  offset = 0; //counter for not yet expired threads
  now = new Date();
    
  /*
   * Get threads in "pages" of PAGE_LENGTH at a time
   * Technique from the Gmail Snooze code, updated to use 'offset'
   * http://googleappsdeveloper.blogspot.com/2011/07/gmail-snooze-with-apps-script.html
   */
  while(!page || page.length == PAGE_LENGTH) {
   page = GmailApp.getInboxThreads(offset, PAGE_LENGTH);

    forEach_(page, function(thread) {
      if (thread.isUnread()) {
        offset++; //don't archive unread threads
      }
      else {
        if (commonValue_(thread.getLabels(), protectedLabels)) {
          offset++; //don't archive threads labeled with one or more of the protected labels
        }
        else {
          if ((now - thread.getLastMessageDate()) <= archivalPeriod){
            offset++; //keep in Inbox
          }
          else {
            thread.moveToArchive();
          }
        }
      }
    });
  }
}
