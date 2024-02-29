# Automated Email tracker and Organizer

## Description
> This is a **Google Apps Script** that retrieves today's emails and saves them in spreadsheets for each email address/group provided. It creates two spreadsheets, one with all the emails sent to the email address/group and another with only the emails received on the current day. It also sends an email with PDF attachments of both spreadsheets to the user who executed the script.


## How to Use this Code
> 1. Create a new Google Apps Script project by going to [script.google.com](https://script.google.com/home) , clicking on "New project" and giving it a name.
> 2. Copy the code from [EmailTracker.gs](https://github.com/brcnitk/Internship-Feb_2023/blob/main/Karthik_Shenoy/EmailTracker.gs) repository and paste it into the Script editor.
> 3. Do the necessary [customizations](https://github.com/brcnitk/Internship-Feb_2023/blob/main/Karthik_Shenoy/README.md#customization).
> 4. Save the script and authorize it to access your Gmail and Drive services.
> 5. In the `getMails` function, add the email addresses/groups that you want to check.
> 6. Run the script by clicking on the **"Run"** button or by setting a **time-driven trigger** to run it automatically.
> 7. Check your email inbox for the PDF attachments with the spreadsheets.


## Customization 
> This code can be easily customized to meet your specific needs. Here are some things you may want to modify:
> * **Email Addresses:** Update the *emailAddresses* array in the `getMails()` function to specify the email addresses or groups you want to receive emails for.
> * **Folder ID:** Add the *folder ID* of the Google Drive folder which you created to store the attachments.
> * **Date Format:** Update the *date* variable in the `getMails()` function to specify the date format you want to use in the email subject line and spreadsheet.
> * **Spreadsheet Formatting:** Modify the formatting of the spreadsheets created by the code to meet your needs. You can update the main and sub headings, adjust column widths, and change cell styles.
> * **Email Content:** Modify the email subject and body in the `GmailApp.sendEmail()` function to meet your needs.

## Sample Outputs
> ![Google script](https://user-images.githubusercontent.com/126340629/223623404-8008c55d-4d90-402c-ad46-9f34afab3ad1.png)
> :--:
> <b>Google script Page</b>
>
> ![Google sheets files created](https://user-images.githubusercontent.com/126340629/223623498-07507502-ee00-43ed-a2c5-4539427b1abd.png)
> :--:
> <b>Google sheets files created</b>
>
> ![Today mails spreadsheet](https://user-images.githubusercontent.com/126340629/223623587-bff6c2df-b2cc-4f13-83a4-912a7707cad2.png)
> :--:
> <b>Today mails spreadsheet</b>
>
> ![All mails spreadsheet](https://user-images.githubusercontent.com/126340629/223623657-2c7d59b0-1e98-4551-a20b-cf164ecf9023.png)
> :--:
> <b>All mails spreadsheet</b>
> 
> ![Email with Today mails pdf](https://user-images.githubusercontent.com/126340629/223623699-587e4cda-a147-41d3-8f58-9015cfe8f78a.png)
> :--:
> <b>Email with Today mails pdf</b>
> 
> ![Pdf of Todays mails](https://user-images.githubusercontent.com/126340629/223623773-0a1e6e18-f702-47a8-9297-df7689c41405.png)
> :--:
> <b>Pdf of Todays mails</b>

## Contributions 
> If you find any issues or have suggestions for improvement, please open an issue or create a pull request.
