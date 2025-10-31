export default function change_Question(state, action) {
    switch (action.type) {
        case "next":
            const next_val = state.Qno + 1;
            if (next_val > 10) return state;
            return { ...state, Qno: next_val };

        case "prev":
            const prev_val = state.Qno - 1;
            if (prev_val < 1) return state;
            return { ...state, Qno: prev_val };

        case "new":
            return { ...state, Qno: 1};
        default:
            return state;
    }
}