import { Outlet, useLocation } from "react-router-dom";
import { NavContainer, NavLinks, NavItem, NavLink } from "./styles";

export default function Navigation(){
    const location = useLocation();
    
    return(
        <>
            <NavContainer>
                <NavLinks>
                    <NavItem>
                        <NavLink to='/' className={location.pathname === '/' ? 'active' : ''}>
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/Countries' className={location.pathname === '/Countries' ? 'active' : ''}>
                            Countries
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/Bitcoininfo' className={location.pathname === '/Bitcoininfo' ? 'active' : ''}>
                            Cryptocurrencies
                        </NavLink>
                    </NavItem>
                </NavLinks>
            </NavContainer>
            <Outlet/>
        </>
    );
}