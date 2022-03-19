import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";


const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () =>{
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <MyButton><Link  className="link" to="/About">О сайте </Link></MyButton>
                <MyButton style={{marginLeft:"10px"}}><Link className="link" to="/Posts">Посты</Link></MyButton>
            </div>
        </div>
    );
};

export default Navbar;