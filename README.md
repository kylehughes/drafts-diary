# Drafts Diary

[Action Group in Directory](https://directory.getdrafts.com/g/2C1)

## Overview

### Production

These files are used directly in Drafts.

- `src/library_*.js` scripts contain common code use acrossed actions. Each script should be placed into an individual Action called "Load library_*.js".
- `src/action_*.js` scripts contain the script for a single named action. Each script should be placed into an individual Action and should have an Include Action step that includes any libraries that the script depends on.

### Development

These files are used to improve the local development experience and should not be included in Drafts in any way.

- `jsconfig.json` contains the configuration use by local editors to make local development easier, such as defining where the Typescript definitions are and what ECMAScript version is used.
- `@types/` contains Typescript definitions.