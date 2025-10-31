import { useContext } from "react";
import { ScoreContext } from "./App";
import DisplayQuestion from "./DisplayQuestions";
import { questions } from "./Questions";
import { QuizContainer, HeaderRow, Title, Meta, Actions, NavButton, GhostButton, PrimaryButton } from "./styled";
import { FiChevronLeft, FiChevronRight, FiSend, FiXCircle, FiZap } from "react-icons/fi";

export default function Quiz({state,dispatch,index}){
    const { score, setScore } = useContext(ScoreContext);
    let Active_Quiz = 'Python';
    if (index === 1){
        Active_Quiz = 'C++';
    }
    else if(index === 2){
        Active_Quiz = 'Java';
    }
    const handleSubmit = () => {
        let tot_score = 0;
        let result="";
        score.ans.forEach((element,i) => {
            if (element === 1){
                tot_score+=element;
                result+=String(i+1)+" Q - Correct ✅\n";
            }
            else{
                if (score.select[i]===null){
                    result+=String(i+1)+" Q - Not Attempted | Answer - "+String(questions[index][i].answer)+"\n";
                }
                else{
                    result+=String(i+1)+" Q - Wrong Answer ❌| Correct Answer - "+String(questions[index][i].answer)+"\n";
                }
            }
        });

        alert("Total Scored: " + tot_score + " / 10 \n"+result);

        setScore({ans:Array(10).fill(0),select:Array(10).fill(null)});
        dispatch({type:"new"});
    };

	const canGoPrev = state.Qno > 1;
	const canGoNext = state.Qno < 10;
	const hasSelection = score.select[state.Qno-1] !== null;

	return (
		<QuizContainer>
			<HeaderRow>
				<Title><FiZap style={{marginRight:8, verticalAlign:'-2px'}} />{Active_Quiz} Quiz</Title>
				<Meta>Question {state.Qno} of 10</Meta>
			</HeaderRow>
			<DisplayQuestion key={state.Qno} Qno={state.Qno} index={index}/>
			<Actions>
				<NavButton onClick={() => dispatch({ type: "prev" })} disabled={!canGoPrev}><FiChevronLeft style={{marginRight:8}} />Prev</NavButton>
				<NavButton onClick={() => dispatch({ type: "next" })} disabled={!canGoNext}>Next<FiChevronRight style={{marginLeft:8}} /></NavButton>
				<GhostButton onClick={() => {
					const newScore = [...score.ans];
					const newSelect = [...score.select];
					newScore[state.Qno-1]=0;
					newSelect[state.Qno-1]=null;
					setScore({ ...score, ans: newScore, select: newSelect });
				}} disabled={!hasSelection}><FiXCircle style={{marginRight:8}} />Clear Response</GhostButton>
				<PrimaryButton onClick={handleSubmit}><FiSend style={{marginRight:8}} />Submit</PrimaryButton>
			</Actions>
		</QuizContainer>
	);
}