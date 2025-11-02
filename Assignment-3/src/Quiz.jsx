import { useContext } from "react";
import { ScoreContext } from "./App";
import DisplayQuestion from "./DisplayQuestions";
import { questions } from "./Questions";
import {
  QuizContainer,
  HeaderRow,
  Title,
  Meta,
  Actions,
  NavButton,
  GhostButton,
  PrimaryButton,
} from "./styled";
import { FiChevronLeft, FiChevronRight, FiSend, FiXCircle, FiZap } from "react-icons/fi";

export default function Quiz({ state, dispatch, index }) {
  const { score, setScore } = useContext(ScoreContext);

  // Determine quiz title
  const Active_Quiz = index === 1 ? "C++" : index === 2 ? "Java" : "Python";

  const handleSubmit = () => {
    let tot_score = 0;

    // Create table rows for result
    const resultRows = score.ans.map((element, i) => {
      let status, correctAns;
      if (element === 1) {
        tot_score++;
        status = "✅ Correct";
        correctAns = "-";
      } else if (score.select[i] === null) {
        status = "⚠️ Not Attempted";
        correctAns = questions[index][i].answer;
      } else {
        status = "❌ Wrong";
        correctAns = questions[index][i].answer;
      }

      return (
        <tr key={i}>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{i + 1}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{status}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{correctAns}</td>
        </tr>
      );
    });

    const resultCard = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "25px",
            background: "#2c2c2cff",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "850px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            color: "white",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Result Summary</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            Total Score: {tot_score}/10
          </p>

          <table
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse: "collapse",
              background: "#ffffff",
              color: "black",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ background: "#007bff", color: "white" }}>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Q.No</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Status</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Correct Answer</th>
              </tr>
            </thead>
            <tbody>{resultRows}</tbody>
          </table>
        </div>

        <button
          style={{
            background: "#007bff",
            color: "white",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "25px",
            fontSize: "16px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => {
            setScore({
              ans: Array(10).fill(0),
              select: Array(10).fill(null),
              scorecard:null
            });
            dispatch({ type: "new" });
          }}
        >
          Restart Quiz
        </button>
      </div>
    );

    setScore({
      ans: Array(10).fill(0),
      select: Array(10).fill(null),
      scorecard: resultCard,
    });
  };

  const canGoPrev = state.Qno > 1;
  const canGoNext = state.Qno < 10;
  const hasSelection = score.select[state.Qno - 1] !== null;

  return (
    <QuizContainer>
      <HeaderRow>
        <Title>
          <FiZap style={{ marginRight: 8, verticalAlign: "-2px" }} />
          {Active_Quiz} Quiz
        </Title>
        <Meta>Question {state.Qno} of 10</Meta>
      </HeaderRow>

      <DisplayQuestion key={state.Qno} Qno={state.Qno} index={index} />

      <Actions>
        <NavButton
          onClick={() => dispatch({ type: "prev" })}
          disabled={!canGoPrev}
        >
          <FiChevronLeft style={{ marginRight: 8 }} /> Prev
        </NavButton>

        <NavButton
          onClick={() => dispatch({ type: "next" })}
          disabled={!canGoNext}
        >
          Next <FiChevronRight style={{ marginLeft: 8 }} />
        </NavButton>

        <GhostButton
          onClick={() => {
            const newScore = [...score.ans];
            const newSelect = [...score.select];
            newScore[state.Qno - 1] = 0;
            newSelect[state.Qno - 1] = null;
            setScore({ ...score, ans: newScore, select: newSelect });
          }}
          disabled={!hasSelection}
        >
          <FiXCircle style={{ marginRight: 8 }} /> Clear Response
        </GhostButton>

        <PrimaryButton onClick={handleSubmit}>
          <FiSend style={{ marginRight: 8 }} /> Submit
        </PrimaryButton>
      </Actions>
    </QuizContainer>
  );
}
