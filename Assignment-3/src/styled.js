import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

export const theme = {
	colors: {
		bg: "#0f1223",
		panel: "#151836",
		text: "#e7e8f1",
		muted: "#9aa0b4",
		primary: "#6c5ce7",
		primaryHover: "#7a6cff",
		accent: "#00d4ff"
	},
	radii: {
		sm: "8px",
		md: "12px",
		lg: "20px",
		round: "999px"
	},
	shadows: {
		md: "0 10px 30px rgba(0,0,0,0.35)",
		glow: "0 0 0 3px rgba(108,92,231,0.25)"
	}
};

export const GlobalStyles = createGlobalStyle`
	*, *::before, *::after { box-sizing: border-box; }
	html, body, #root { height: 100%; }
	body {
		margin: 0;
		font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji";
		color: ${({theme}) => theme.colors.text};
		background:
			radial-gradient(1200px 800px at 80% -200px, rgba(108,92,231,0.25), rgba(0,0,0,0)) ,
			radial-gradient(800px 600px at -20% 120%, rgba(0,212,255,0.18), rgba(0,0,0,0)) ,
			${({theme}) => theme.colors.bg};
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`;

export const AppContainer = styled.div`
	min-height: 100%;
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 32px 20px 48px;
`;

export const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 16px;
	max-width: 720px;
	margin: 0 auto;
`;

export const TabButton = styled.button`
	appearance: none;
	border: 0;
	cursor: pointer;
	padding: 16px 20px;
	min-height: 48px;
	font-size: 16px;
	line-height: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: ${({theme}) => theme.radii.md};
	background: ${({$active, theme}) => $active ? theme.colors.primary : theme.colors.panel};
	color: ${({$active, theme}) => $active ? '#ffffff' : theme.colors.text};
	box-shadow: ${({$active, theme}) => $active ? theme.shadows.md : 'inset 0 0 0 1px rgba(255,255,255,0.06)'};
	transition: transform .08s ease, background .2s ease, box-shadow .2s ease;

	&:hover { 
		background: ${({$active, theme}) => $active ? theme.colors.primaryHover : '#1b1f43'}; 
	}
	&:active { transform: translateY(1px); }
`;

export const QuizContainer = styled.section`
	max-width: 980px;
	width: 100%;
	margin: 0 auto;
	background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)) , ${({theme}) => theme.colors.panel};
	border-radius: ${({theme}) => theme.radii.lg};
	padding: 28px;
	box-shadow: 0 10px 30px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
    &:before{
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        padding: 1px;
        background: radial-gradient(120px 60px at 20% -10%, rgba(0,212,255,0.6), transparent),
                   radial-gradient(200px 100px at 120% 0%, rgba(108,92,231,0.5), transparent);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
        pointer-events: none;
    }
`;

export const HeaderRow = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 16px;
	margin-bottom: 10px;
`;

export const Title = styled.h2`
	margin: 0;
	font-size: 24px;
	letter-spacing: 0.5px;
`;

export const Meta = styled.span`
	color: ${({theme}) => theme.colors.muted};
`;

export const Actions = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 12px;
	margin-top: 16px;
`;

export const BaseButton = styled.button`
	appearance: none;
	border: 0;
	cursor: pointer;
	padding: 12px 14px;
	border-radius: ${({theme}) => theme.radii.md};
	font-weight: 600;
	transition: background .2s ease, transform .08s ease, box-shadow .2s ease, opacity .2s ease;
	&:active { transform: translateY(1px); }
	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		filter: grayscale(0.2);
	}
`;

export const NavButton = styled(BaseButton)`
	background: #1b1f43;
	color: ${({theme}) => theme.colors.text};
	box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
	&:hover:not(:disabled) { background: #22275a; }
`;

export const PrimaryButton = styled(BaseButton)`
	background: ${({theme}) => theme.colors.primary};
	color: #fff;
	box-shadow: ${({theme}) => theme.shadows.glow};
	&:hover { background: ${({theme}) => theme.colors.primaryHover}; }
`;

export const GhostButton = styled(BaseButton)`
	background: transparent;
	color: ${({theme}) => theme.colors.text};
	box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
	&:hover:not(:disabled) { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2); }
`;

export const QuestionCard = styled.div`
	background: rgba(255,255,255,0.02);
	border-radius: ${({theme}) => theme.radii.md};
	padding: 20px 22px;
	box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
`;

export const QuestionTitle = styled.h1`
	margin: 0 0 16px 0;
	font-size: 20px;
`;

export const OptionRow = styled.label`
	display: grid;
	grid-template-columns: 20px 1fr auto;
	align-items: center;
	gap: 10px;
	padding: 12px 14px;
	border-radius: ${({theme}) => theme.radii.sm};
	cursor: pointer;
	background: ${({$selected}) => $selected ? 'rgba(108,92,231,0.18)' : 'transparent'};
	box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
	transition: background .2s ease, box-shadow .2s ease;
	&:hover { background: rgba(255,255,255,0.06); }
	&:not(:first-child){ margin-top: 10px; }
`;

export const Background = styled.div`
	position: fixed;
	inset: 0;
	pointer-events: none;
	z-index: -1;
	&:after{
		content: "";
		position: absolute;
		inset: -20% -10% -10% -10%;
		background: 
			repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 6px);
		filter: blur(1px);
	}
`;

export const Radio = styled.input.attrs({ type: 'radio' })`
	accent-color: ${({theme}) => theme.colors.primary};
`;

export { ThemeProvider };


