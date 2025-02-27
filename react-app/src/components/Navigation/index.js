import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import PlantsyLogo from './LogoFolder/Plantsy.png'
import SearchBar from './SearchBar';

import { useEffect, useState } from 'react';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
	const cartItemsState = useSelector(state => state.cart.items)
	const [cartCount, setCartCount] = useState(0)
	console.log(cartItemsState)

	useEffect(() => {
		setCartCount(0);
		let total = 0
		for (let key in cartItemsState) {
			let item = cartItemsState[key]
			total += item.count
		}
		setCartCount(total)

	}, [cartItemsState]);


    return (
        <div className='other-container'>
            <div className='navigation-container'>

                <div>

                        <NavLink className="website-name" exact to="/">
                            <img src={PlantsyLogo} className="plantsy-logo" alt="" />
                        </NavLink>

                </div>

                    <SearchBar />
                <div className='icon-container'>
                <div className='profile-button-container'>
                    {isLoaded && (
                        // <li>
                            <ProfileButton user={sessionUser} />
                        // </li>
                    )}
                </div>
                <div>
                <NavLink className="checkout-button" exact to="/cart">
                                <i className="fas fa-shopping-cart"  />
								{cartCount}
                        </NavLink>
                </div>
                </div>

            </div>

        </div>
    );
}

export default Navigation;
