//
// action_go-to-diary.js
// Code Monkey Drafts
// By Kyle Hughes
//

// Requires library_diary.js to be included in the Drafts Action.

(
    function () {
        let diaryDraft = getOrMakeDailyDiaryDraft(draft.createdAt);

        if (diaryDraft == null) {
            context.fail(
                `More than one draft has the title of the diary ` +
                `(or a substring matches)`
            );
        } else {
            editor.load(diaryDraft);
        }
    }
)();