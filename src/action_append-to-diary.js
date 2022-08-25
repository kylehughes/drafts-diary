//
// action_append-to-diary.js
// Code Monkey Drafts
// By Kyle Hughes
//

// Requires library_diary.js to be included in the Drafts Action.

(
    function () {
        let entryDate = draft.createdAt;
        let entryBody = editor.getText()
        let diaryDraft = getOrMakeDailyDiaryDraft(entryDate);

        if (diaryDraft == null) {
            context.fail(
                `More than one draft has the title of the diary ` +
                `(or a substring matches)`
            );
        } else if (draft.uuid == diaryDraft.uuid) {
            context.fail(`Cannot process the diary draft itself`);
        } else {
            appendEntryToDraft(entryDate, entryBody, diaryDraft);
        }
    }
)();