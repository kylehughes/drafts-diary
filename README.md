# Drafts Diary

[Action Group in Directory](https://directory.getdrafts.com/g/2C1)

## Overview

- `jsconfig.json` contains the configuration use by local editors to make local development easier. This is only for development and is not included in Drafts in any way.
- `@types/` contain Typescript definitions to make local development easier. These are only for development and are not included in Drafts in any way.
- `src/library_*.js` scripts contain common code use acrossed actions. Each script should be placed into an individual Action called "Load library_*.js".
- `src/action_*.js` scripts contain the script for a single named action. Each script should be placed into an individual Action and should have an Include Action step that includes any libraries that the script depends on.