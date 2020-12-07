import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => {

    return (
        <nav>
            <ul>
                <div className="logo">
                    <NavLink exact to="/">
                      <p>Easy Keys</p>  
                    </NavLink>
                </div>
                <div className="items">
                <li>
                   <NavLink activeClassName="selected"
                   exact to="/products">
                       Products
                   </NavLink>
               </li>
               <li>
                   <NavLink className="avatar" activeClassName="selected"
                   exact to="/profile">
                       Profile
                   </NavLink>
               </li>
                <li>
                   <NavLink activeClassName="selected"
                   exact to="/login">
                       Login
                   </NavLink>
               </li>
               <li>
                   <NavLink activeClassName="selected"
                   exact to="/singUp">
                       Sign-up
                   </NavLink>
               </li>
               <li>
                   <NavLink activeClassName="selected"
                   exact to="/singOut">
                       Sign-out
                   </NavLink>
               </li> 

                </div>
            </ul>
        </nav>
    );
};

export default Nav;