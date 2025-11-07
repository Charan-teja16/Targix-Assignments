import {
  HomeContainer,
  HomeTitle,
  HomeSubtitle,
  HomeLinks,
  HomeCard,
} from "./styles";

export default function Home(){
    return (
        <HomeContainer>
            <HomeTitle>Welcome to Data Explorer</HomeTitle>
            <HomeSubtitle>Explore countries and cryptocurrencies with ease</HomeSubtitle>
            <HomeLinks>
                <HomeCard to="/Countries">
                    <span>🌍 Explore Countries</span>
                </HomeCard>
                <HomeCard to="/Bitcoininfo">
                    <span>₿ Cryptocurrencies</span>
                </HomeCard>
            </HomeLinks>
        </HomeContainer>
    );
}