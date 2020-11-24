import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../images/elogroupback.png'
import displayImg from '../images/logo-elo-group.png'
import '../styles/landing.css'

export default function Register(){
    const history = useHistory()

    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');


    function handleLogin(event){
        event.preventDefault();

        let Users;

        if(user === '' || password === '' ){
            alert('Preencha todos os campos')
            return 0;
        }

        try {
            Users = localStorage.getItem('@eloUsers')
            Users = JSON.parse(Users)
            
            
            for(let i = 0; i<Users.length; i++){
                const userItem = JSON.parse(Users[i]);
                const {user: oUser, password: oPassword} = userItem;
                if(user === oUser){
                    if(password===oPassword){
                        sessionStorage.setItem('@eloUser',user)
                        history.push('/leads')
                        return 1
                    }
                }


            }


        } catch (error) {
            
        }

        
     

        alert('Usuario ou senha incorreto')

        
        



    }

    return(
        <div className="landingContainer">
            
            <form onSubmit={handleLogin} className="landingForm">
                <img src={displayImg} alt="logo img"/>
                <p>Usuário *</p>
                <input 
                    type="text" 
                    value={user}
                    onChange={event => setUser(event.target.value)}
                    name="" 
                    id=""/>
                <p>Password *</p>
                <input 
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)} 
                    name="" 
                    id=""/>
                <Link to="/register"><p>Registrar</p></Link>
                
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )

}