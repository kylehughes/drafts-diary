//
// library_diary.js
// Code Monkey Drafts
// By Kyle Hughes
//

////////////////////////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////////////////////////

/**
 * Tag of the diary draft.
 */
 let tag = "diary";

 /**
  * Prefix of the title of the diary draft, followed by the date.
  */
 let titlePrefix = "# Diary for ";
 
 ////////////////////////////////////////////////////////////////////////////////
 // Constants
 ////////////////////////////////////////////////////////////////////////////////
 
 /**
  * - Capture Group 1 = Timestamp
  * - Capture Group 2 = Body
  */
  let entryRegex = /\-\s+\[(.+)\]\s(.+)/gm;
 
 ////////////////////////////////////////////////////////////////////////////////
 // Content Handling
 ////////////////////////////////////////////////////////////////////////////////
 
 /**
  * @param {string} string 
  * @returns {string}
  */
 function guaranteeEndsInNewline(string) {
     if (string.slice(-1) != "\n") {
         return string + "\n";
     } else {
         return string;
     }
 }
 
 /**
  * @param {Date} date
  * @param {string} body
  * @returns {[Date, string]}
  */
  function makeTypedEntry(date, body) {
     return [date, body];
 }
 
 /**
  * @param {string} draftDateString
  * @param {string} entryTimeString
  * @param {string} body
  * @returns {[Date, string]}
  */
  function makeTypedEntryFromStrings(draftDateString, entryTimeString, body) {
     let entryDateString = draftDateString + " " + entryTimeString;
     let entryDate = new Date(entryDateString);
 
     return makeTypedEntry(entryDate, body);
 }
 
 /**
  * @param {Date} date
  * @param {string} body
  * @returns {string}
  */
 function makeUntypedEntryFromUnprocessedText(date, body) {
     return postprocessEntry(preprocessEntry(body, date));
 }
 
 /**
  * @param {Date} date 
  * @returns {string}
  */
 function makeTitleForDraftOfDiary(date) {
     return titlePrefix + formatDateForDraftTitle(date);
 }
 
 /**
  * @param {string} entry
  * @param {Date} entryDate
  * @returns {string}
  */
 function preprocessEntry(entry, entryDate) {
     var entry = entry.trim();
 
     if ("-".indexOf(entry[0]) != -1) {
         return entry;
     }
 
     let timestamp = formatDateForEntryTimestamp(entryDate);
 
     return "- [" + timestamp + "] " + entry;
 }
 
 /**
  * @param {string} entry
  * @returns {string}
  */
 function postprocessEntry(entry) {
     var entry = entry.trim();
 
     entry = guaranteeEndsInNewline(entry);
 
     return entry;
 }
 
 ////////////////////////////////////////////////////////////////////////////////
 // Date Handling
 ////////////////////////////////////////////////////////////////////////////////
 
 /**
  * @param {Date} date
  * @returns {string}
  */
 function formatDateForDraftTitle(date) {
     return date.toDateString();
 }
 
 /**
  * @param {Date} date
  * @returns {string}
  */
 function formatDateForEntryTimestamp(date) {
     let fullTimestamp = date.toTimeString();
 
     return fullTimestamp.slice(0, 8) + fullTimestamp.slice(12, 17);
 }
 
 ////////////////////////////////////////////////////////////////////////////////
 // Draft Handling
 ////////////////////////////////////////////////////////////////////////////////
 
 /**
  * @param {Date} entryDate
  * @param {string} entryBody
  * @param {Draft} diaryDraft
  */
 function appendEntryToDraft(entryDate, entryBody, diaryDraft) {
     let draftContent = diaryDraft.content;
     let firstLine = draftContent.split("\n")[0];
     let draftDateString = firstLine.slice(-15);
 
     /**
      * @type {[Date, string][]}
      */
     var typedEntries = [];
 
     /**
      * @type {RegExpExecArray}
      */
     var match;
     while (match = entryRegex.exec(draftContent)) {
         typedEntries.push(
             makeTypedEntryFromStrings(draftDateString, match[1], match[2])
         );
     }
 
     typedEntries.push(makeTypedEntry(entryDate, entryBody));
 
     let sortedTypedEntries = typedEntries.sort(
         (a, b) => a[0].getTime() - b[0].getTime()
     );
 
     var newContent = firstLine + "\n\n";
 
     for (let typedEntry of sortedTypedEntries) {
         newContent += makeUntypedEntryFromUnprocessedText(
             typedEntry[0], 
             typedEntry[1]
         );
     }
 
     diaryDraft.content = guaranteeEndsInNewline(newContent);
     diaryDraft.update();
 }
 
 /**
  * @param {Date} entryDate
  * @returns {?Draft}
  */
 function getOrMakeDailyDiaryDraft(entryDate) {
     let title = makeTitleForDraftOfDiary(entryDate);
     let drafts = Draft.query(`"${title}"`, "all", [tag], [], "created", false, false);
 
     if (0 == drafts.length) {
         var newDraft = Draft.create();
         newDraft.content = title + "\n\n";
         newDraft.addTag(tag);
         newDraft.update();
 
         return newDraft;
     } else if (1 == drafts.length) {
         return drafts[0];
     } else {
         return null;
     }
 }