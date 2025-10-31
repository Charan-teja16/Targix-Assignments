import { useContext } from "react";
import { ScoreContext } from "./App";
import { questions } from "./Questions";
import { QuestionCard, QuestionTitle, OptionRow, Radio } from "./styled";
import { FiCheckCircle } from "react-icons/fi";

export default function DisplayQuestion({ Qno ,index}) {
    const { score, setScore } = useContext(ScoreContext);
    const curr_Ques = questions[index][Qno - 1];

    const handleChange = (e) => {
        const ans = e.target.value;
        
        const newScore = {...score};

        newScore.select[Qno-1] = ans;

        if (ans === curr_Ques.answer) {
            newScore.ans[Qno-1] = 1;
        } else {
            newScore.ans[Qno-1] = 0;
        }

    setScore(newScore);
  };

  return (
	<QuestionCard>
	  <QuestionTitle>{curr_Ques.id}. {curr_Ques.question}</QuestionTitle>
	  {curr_Ques.options.map((option, index) => (
		<OptionRow key={index} $selected={score.select[Qno-1] === option}>
			<Radio name={`q${Qno}`} value={option} checked={score.select[Qno-1] === option} onChange={handleChange} />
			<span>{option}</span>
			{score.select[Qno-1] === option ? <FiCheckCircle style={{marginLeft:8, color:'#7a6cff'}} /> : null}
		</OptionRow>
	  ))}
	</QuestionCard>
  );
}