function getMails(){
  
  //Enter the email address/groups 
  var emailAddresses = ["example@googlegroup.com"];

  //Calls the function getEmails()
  getEmails(emailAddresses);
}

function getEmails(emailAddresses) {
  
  // ENter the folder ID 
  var folder = DriveApp.getFolderById("...");
  
  //Retrieves today's date
  var today = new Date();
  var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  
  //Checking for each email address's/groups
  for (var k = 0; k < emailAddresses.length; k++) {
    var email = emailAddresses[k];

    //Delete yesterday's file that was created
    var todaySSFiles = DriveApp.getFilesByName("Today's Mails for " + email);
    while (todaySSFiles.hasNext()) {
      var todaySSFile = todaySSFiles.next();
      todaySSFile.setTrashed(true);
    }
    
    //Create a new file to store only today's mails
    var todaySS = SpreadsheetApp.create("Today's Mails for " + email);
    var todaySheet = todaySS.getActiveSheet().setName("Mails");

    //Formatting the excel sheet according to requirements auch as fonts, size, color, alignment...
    var mainHeading = "Department of Computer Science and Engineering, NITK, Surathkal";
    var mainHeadingRange = todaySheet.getRange("A2:F2");
    mainHeadingRange.merge().setHorizontalAlignment("center").setValue(mainHeading).setFontSize(10).setFontWeight("bold");

    var subHeading = "Summary of emails sent to " + email + " on " + date;
    var subHeadingRange = todaySheet.getRange("A4:F4");
    subHeadingRange.merge().setHorizontalAlignment("center").setValue(subHeading).setFontSize(10).setBackground("yellow").setFontWeight("bold");

    var space = "   ";
    var spaceRange = todaySheet.getRange("A5:F5");
    spaceRange.merge().setHorizontalAlignment("center").setValue(space);

    //Wrap the subject column so that whole subject appears
    var subjectColumn = todaySheet.getRange("C:C");
    subjectColumn.setWrap(true);

    //Add headers to the sheet for each field
    todaySheet.appendRow(["Sl. no.", "Sent Time", "Subject", "Email Link", "Attachment-1", "Attachment-2"]);
    todaySheet.getRange("A6:F6").setFontWeight("bold").setHorizontalAlignment("center");
  
    //Search for today's mails and append it to the sheet
    var todayThreads = GmailApp.search('after:' + date + 'to:' + email);
    for (var i = 0; i < todayThreads.length; i++) {
      var todayMessages = todayThreads[i].getMessages();
      for (var j = 0; j < todayMessages.length; j++) {
        var id = todayMessages[j].getId();
        var time = todayMessages[j].getDate().toLocaleTimeString();
        var subject = todayMessages[j].getSubject();
        var link = "https://mail.google.com/mail/u/0/#inbox/" + id;
        var attachments = todayMessages[j].getAttachments();
        var attachmentLinks = [];

        for (var a = 0; a < attachments.length; a++) {
          var attachment = attachments[a];
          var file = folder.createFile(attachment);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fileUrl = file.getUrl();
          attachmentLinks.push('=HYPERLINK("' + fileUrl + '" , " Click here ")');
        }
      }
      todaySheet.appendRow([i+1, time, subject, '=HYPERLINK("' + link + '" , "Click here")'].concat(attachmentLinks));
    }

    //Delete the already existing file
    var allSSFiles = DriveApp.getFilesByName("All Mails for " + email);
    while (allSSFiles.hasNext()) {
      var allSSFile = allSSFiles.next();
      allSSFile.setTrashed(true);
    }

    //Create a new spreadsheet for storing all the mails
    var allSS = SpreadsheetApp.create("All Mails for " + email);
    var allSheet = allSS.getActiveSheet().setName("Mails");

    //Wrap the subject and date column so that whole subject/date appears
    var allDateColumn = allSheet.getRange("B:B");
    allDateColumn.setWrap(true);
    var allSubjectColumn = allSheet.getRange("C:C");
    allSubjectColumn.setWrap(true);

    //Add headers to the sheet for each field
    allSheet.appendRow(["Sl. No.", "Date", "Subject", "Email Link", "Attachment-1", "Attachment-2"])
  
    //Search for all mails and append it to the sheet
    var allThreads = GmailApp.search('to:' + email);
    for (var i = 0; i < allThreads.length; i++) {
      var allMessages = allThreads[i].getMessages();
      for (var j = 0; j < allMessages.length; j++) {
        var id = allMessages[j].getId();
        var day = allMessages[j].getDate();
        var subject = allMessages[j].getSubject();
        var link = "https://mail.google.com/mail/u/0/#inbox/" + id;
        var attachments = allMessages[j].getAttachments();
        var attachmentLinks = [];

        for (var a = 0; a < attachments.length; a++) {
          var attachment = attachments[a];
          var file = folder.createFile(attachment);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fileUrl = file.getUrl();
          attachmentLinks.push('=HYPERLINK("' + fileUrl + '" , " Click here ")');
        }
        allSheet.appendRow([i+1, day, subject, '=HYPERLINK("' + link + '" , "Click here")'].concat(attachmentLinks));
      }
    }
    
    //Convert the sheet to PDFs
    var pdfs = [];
    var blob = todaySS.getBlob().getAs('application/pdf');
    var pdf = {
      name: "Today's Mails for " + email + ".pdf",
      blob: blob
    };
    pdfs.push(pdf);
  
    // Send email with PDF attachments
    var altSubject = "Mails you recieved on " + today.toLocaleDateString();
    var altBody = "Please find attachment of the spreadsheet which includes the mails you recieved today.";
  
    var attachments = [];
    for (var i = 0; i < pdfs.length; i++) {
      attachments.push({
        fileName: pdfs[i].name,
        content: pdfs[i].blob.getBytes(),
        mimeType: 'application/pdf'
      });
    }
  
    GmailApp.sendEmail(email, altSubject, altBody, {
      attachments: attachments
    });
  }
}
