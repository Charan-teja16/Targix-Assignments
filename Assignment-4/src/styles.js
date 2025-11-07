import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Global Styles
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
  }
`;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Navigation Styles
export const NavContainer = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-block;
  min-width: 120px;
  text-align: center;
  border: 2px solid transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
    z-index: 0;
  }

  &:hover::before {
    left: 100%;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    border-color: transparent;
  }

  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
  }
`;

// Home Styles
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
`;

export const HomeTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${fadeInDown} 0.8s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HomeSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const HomeLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeIn} 1s ease;
`;

export const HomeCard = styled(Link)`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem 3rem;
  border-radius: 20px;
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    color: white;
  }

  span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    font-size: 1.1rem;
  }
`;

// Shared Components (used by both Countries and Bitcoininfo)
export const FilterSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterInput = styled.input`
  padding: 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 200px;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Loading = styled.div`
  text-align: center;
  color: white;
  font-size: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 2rem auto;
  max-width: 500px;
`;

export const Error = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.5rem;
  padding: 2rem;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 15px;
  margin: 2rem auto;
  max-width: 500px;
`;

export const NoResults = styled.div`
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 2rem auto;
`;

export const ResultsCount = styled.p`
  color: white;
  text-align: center;
  margin-bottom: 1rem;
`;

// Countries Styles
export const CountriesContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const CountriesHeader = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const CountriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CountryCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const CountryFlag = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 2px solid #e0e0e0;
`;

export const CountryName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const CountryInfo = styled.p`
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.95rem;

  strong {
    color: #667eea;
  }
`;

// Bitcoininfo Styles
export const BitcoinContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const BitcoinHeader = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const CryptoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CryptoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const CryptoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const CryptoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CryptoNameSection = styled.div`
  flex: 1;
`;

export const CryptoName = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.2rem;
`;

export const CryptoSymbol = styled.p`
  color: #999;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

export const CryptoPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin: 1rem 0;
`;

export const CryptoInfo = styled.p`
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.95rem;

  strong {
    color: #667eea;
  }
`;

export const PriceChange = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  background: ${props => props.positive 
    ? 'rgba(76, 175, 80, 0.1)' 
    : 'rgba(244, 67, 54, 0.1)'};
  color: ${props => props.positive 
    ? '#4caf50' 
    : '#f44336'};
`;

