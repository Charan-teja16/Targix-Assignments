```markdown
# Quiz App — React + Context API + styled-components

A multi-topic quiz application demonstrating global state management using React Context API and dynamic, theme-driven styling via styled-components. The UI embraces a futuristic neon/glass aesthetic with icons, accessibility considerations, and responsive layout.

## What It Does
- Lets users switch between Python, C++, and Java quizzes.
- Navigates through 10 questions per topic with Prev/Next controls.
- Tracks per-question selections and total score globally.
- Allows clearing the current answer and submitting to view the score.

## Highlights
- Context-powered global state for answers and selections.
- Reducer-driven question navigation with guardrails (1–10).
- Styled-components theming with global styles, glass panels, and neon accents.
- Dynamic styling based on state:
  - Active tab highlighting
  - Disabled buttons when at bounds
  - Selected option glow and right-aligned tick
- Icons for language tabs and actions to enhance clarity and aesthetics.
- Responsive, space-efficient layout that fits a single page comfortably.

## Architecture Overview
- `App.jsx`: Root provider for `ScoreContext`, language tabs, and quiz routing.
- `Quiz.jsx`: Header, metadata (current question), actions (Prev/Next/Clear/Submit).
- `DisplayQuestions.jsx`: Renders the current question with radio options.
- `Change_Question.jsx`: Reducer for `prev`, `next`, and `new` actions.
- `Questions.jsx`: Static data for Python, C++, and Java quizzes.
- `styled.js`: Theme tokens, global styles, and all styled UI components.

## State Management
- `ScoreContext`: `{ ans: number[10], select: (string|null)[10] }`
  - `ans[i]` = 1 if correct, 0 otherwise
  - `select[i]` stores the chosen option for the i-th question
- `useReducer` manages the current question index (`Qno`) with safe bounds.

## UI/UX Details
- Tabs with icons for Python, C++, Java.
- Glassy quiz panel with subtle neon borders and depth.
- Clear sectioning: header (title + progress), question card, actions row.
- Selected option shows a tick aligned on the right.
- Keyboard- and screen-reader-friendly via native radios and ARIA for tabs.

```
