import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import displayImg from '../images/logo-elo-group.png'

import '../styles/newLead.css'

export default function NewLead(){
    const history = useHistory()

    const [user,setUser] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [all,setAllBoolean] = useState(false)
    const [RPA,setRPA] = useState(false);
    const [digitalProduct,setDigitalProduct] = useState(false);
    const [analytics,setAnalytics] = useState(false);
    const [BPM,setBPM] = useState(false);


    function pressAll(){

        if(all){
            setAllBoolean(false)
            setRPA(false)
            setDigitalProduct(false)
            setAnalytics(false)
            setBPM(false)
        }
        else{
            setAllBoolean(true)
            setRPA(true)
            setDigitalProduct(true)
            setAnalytics(true)
            setBPM(true)
        }
        
        

    }

    function handleNewLead(){
        if(user=== '' || phone=== '' || email=== ''){
            alert("Insira todos os valores")
            return -1;

        }
        const newLead = {
            user, phone,email, RPA, digitalProduct, analytics, BPM, position: 0
        }
        try {
            let Leads = localStorage.getItem('@eloLeads');
            if(!!!Leads){
                Leads = [JSON.stringify({user: '', phone: '', email: '', RPA: false, digitalProduct: false, analytics: false, BPM: false, position: 0})]

            }
            else{
                Leads = JSON.parse(Leads)
            }
            Leads.push(JSON.stringify(newLead))
            localStorage.setItem('@eloLeads',JSON.stringify(Leads))
            alert('Lead Cadastrado com sucesso')
            history.replace('/leads')
        } catch (error) {
            
        }
        

    }


    return(<div id="newLeadContainer">
        <header id="newLeadHead">
            <img src={displayImg}/>
            <p>Novo Lead</p>
        </header>
        <div className="newLeadInfo">
            <section className="newLeadForm">
                <p>Nome *</p>
                <input 
                    type="text"
                    value={user}
                    onChange={event => setUser(event.target.value)}
                    />
                <p>Telefone *</p>
                <input 
                    type="tel"
                    value={phone}
                    onChange={event => setPhone(event.target.value)}/>
                <p>Email *</p>
                <input 
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </section>
            <section className="newLeadOportunities">
                <p className="newLeadTitle">Oportunidades *</p>
                <div className="newLeadOportunitiesContainer">
                    <div>
                        <span className="newLeadCheckBox" > 
                        <input 
                            type="checkbox"
                            checked= {all}
                            onChange= {()=> pressAll()}
                            /> </span>
                        
                        <span className="newLeadOportunitiesName"></span>
                    </div>
                    <div>
                        <span className="newLeadCheckBox" > 
                            <input 
                                type="checkbox"
                                checked={RPA}
                                onChange={() =>setRPA(!RPA)}
                                /> </span>
                        <span className="newLeadOportunitiesName"><p>RPA</p></span>
                    </div>
                    <div>
                        <span className="newLeadCheckBox" > 
                            <input 
                                type="checkbox"
                                checked={digitalProduct}
                                onChange={() =>setDigitalProduct(!digitalProduct)}
                                /> 
                         </span>

                        <span className="newLeadOportunitiesName"><p>Produto Digital</p></span>
                    </div>
                    <div>
                        <span className="newLeadCheckBox" > 
                            <input 
                                type="checkbox"
                                checked={analytics}
                                onChange={() =>setAnalytics(!analytics)}
                                /> 
                        </span>
                        <span className="newLeadOportunitiesName"><p>Analytics</p></span>
                    </div>
                    <div>
                        <span className="newLeadCheckBox" > 
                            <input 
                                type="checkbox"
                                checked={BPM}
                                onChange={() =>setBPM(!BPM)}
                                />  
                        </span>
                        <span className="newLeadOportunitiesName"><p>BPM</p></span>
                    </div>
                    <div>
                        <span className="newLeadCheckBox" > </span>
                        <span className="newLeadOportunitiesName"></span>
                    </div>
                </div>

                <button className="newLeadButton"
                    onClick={()=>{
                        handleNewLead()
                    }}
                >Salvar</button>

            </section>
        </div>
    </div>)


}