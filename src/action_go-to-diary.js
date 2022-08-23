//
// action_go-to-diary.js
// Code Monkey Drafts
// By Kyle Hughes
//

// Requires library_diary.js to be included in the Drafts Action.

(
    function () {
        editor.load(getOrMakeDailyDiaryDraft(draft.createdAt));
    }
)();