// App.jsx
import { useReducer, createContext, useState } from "react";
import change_Question from "./Change_Question";
import Quiz from "./Quiz";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme, AppContainer, Tabs, TabButton, Background } from "./styled";
import { FaPython, FaJava } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";

export const ScoreContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(change_Question, { Qno: 1 });
  const [score, setScore] = useState({
    ans: Array(10).fill(0),
    select: Array(10).fill(null),
    scorecard: null, 
  });
  const [activeQuiz, setActiveQuiz] = useState(0);

  const handleQuizChange = (quizIndex) => {
    setActiveQuiz(quizIndex);
    dispatch({ type: "new" });
    setScore({
      ans: Array(10).fill(0),
      select: Array(10).fill(null),
      scorecard: null,
    });
  };

  const quizContent = <Quiz state={state} dispatch={dispatch} index={activeQuiz} />;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Background />
      <AppContainer>
        <ScoreContext.Provider value={{ score, setScore }}>
          <Tabs role="tablist" aria-label="Quiz Selector">
            <TabButton
              $active={activeQuiz === 0}
              onClick={() => handleQuizChange(0)}
              aria-selected={activeQuiz === 0}
            >
              <FaPython style={{ marginRight: 8 }} /> Python
            </TabButton>

            <TabButton
              $active={activeQuiz === 1}
              onClick={() => handleQuizChange(1)}
              aria-selected={activeQuiz === 1}
            >
              <SiCplusplus style={{ marginRight: 8 }} /> C++
            </TabButton>

            <TabButton
              $active={activeQuiz === 2}
              onClick={() => handleQuizChange(2)}
              aria-selected={activeQuiz === 2}
            >
              <FaJava style={{ marginRight: 8 }} /> Java
            </TabButton>
          </Tabs>
          {score.scorecard ? score.scorecard : quizContent}
        </ScoreContext.Provider>
      </AppContainer>
    </ThemeProvider>
  );
}