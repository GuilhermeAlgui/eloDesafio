import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../images/elogroupback.png'
import displayImg from '../images/logo-elo-group.png'
import '../styles/landing.css'

export default function Register(){
    const history = useHistory()

    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');


    function handleLogin(event){
        event.preventDefault();

        if(user === '' || password === '' || confirmPassword === '' ){
            alert('Preencha todos os campos')
            return 0;
        }
        if(password.length<8){
            alert('Senha precisa ter 8 ou mais caracteres')
            return 0;
        }

        
        if(/[0-9]/.test(password)){
            if(/[a-z]/.test(password) || /[A-Z]/.test(password)){
                if(/[!-\/:-@[-`{-~]/.test(password)){
                    if(password === confirmPassword){
                        /**
                         * 
                         * Chamada API para confirmação de informação no banco de dados
                         * 
                         */

                        alert('Registro com sucesso');
                        try {

                            const newUser = {
                                user: user,
                                password: password
                            }
                            let Users = localStorage.getItem('@eloUsers');
                            if(!!!Users){
                                Users= [JSON.stringify({user: '', password: ''})];
                            }
                            else{
                                Users = JSON.parse(Users)
                            }
                            Users.push(JSON.stringify(newUser))
                            
                            let newUsers = JSON.stringify(Users) 
                            localStorage.setItem('@eloUsers',newUsers)

                        } catch (error) {
                            
                        }


                        history.push('/leads')
                        return 1;
                    }


                }
            }
        }

        

        alert('Senha não contem numeros, caracteres especiais ou letras, ou a confirmação não condiz com a senha')

        
        



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
                <p>Confirmação Password *</p>
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)} 
                    name="" 
                    id=""/>
                <button type="submit">
                    Registrar
                </button>
            </form>
        </div>
    )

}