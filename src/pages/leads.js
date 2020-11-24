import React, {  useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import displayImg from '../images/logo-elo-group.png'

import '../styles/leads.css'


export default function Leads(){
    const history = useHistory()
    const [checkIfLogged,setCheckIfLogged] = useState( false);
    const [leadLoaded,setLeadLoaded] = useState(false)
    const [leadItems,setLeadsItems] = useState([])
    const [updateState,setUpdateState] = useState(true)
    

     function checkSession(){
        try {
            const checkUser = sessionStorage.getItem('@eloUser')

            if(!!!checkUser){
                history.replace('/')
            }

        } catch (error) {
            
        }

        setCheckIfLogged(true);

      


    }

    async function loadLeads(){
        try {
            const leadArray = localStorage.getItem('@eloLeads');
            setLeadsItems(JSON.parse(leadArray))
            setLeadLoaded(true)
        } catch (error) {
            
        }
    }

    if(!!!leadLoaded){
        loadLeads();
    }
    if(!!!checkIfLogged){
        checkSession();
    }


    function LeadContainer(){
        if(leadLoaded){
            return(leadItems.map(lead=>{
                
                return(<LeadItem key={lead} lead= {lead}/>)
            }))
            
        }
    }

    function dragItem(leadItem,lead){
        
            if(window.confirm('Você deseja arrastar esse elemento?'))
            for(let i =0; i<leadItems.length; i++){
                if(lead === leadItems[i]){
                    leadItem.position= leadItem.position+1;
                    leadItems[i] = JSON.stringify(leadItem)
                    setUpdateState(!updateState)
                }
            }
    }

    function LeadItem(item){
        const {lead} = item
        
        const leadItem = JSON.parse(lead);
       
        const {user, position, email} = leadItem;
        if(user=== ''){
            return(null)
        }

        return(
            <div className="leadItemContainer">
                <div className="leadItem"
                    
                    onClick={()=>{ if(position===0)dragItem(leadItem,lead)}}
                >
                    <p className="leadItemName">{ position===0 ? `${user}, ${email}` : ""}</p>
                </div>
                <div className="leadItem"
                     onClick={()=>{if(position===1)dragItem(leadItem,lead)}}
                >
                    <p className="leadItemName">{position ===1 ? `${user}, ${email}` : "" }</p>
                </div>
                <div className="leadItem">
                    <p className="leadItemName">{position ===2 ? `${user}, ${email}` : "" }</p>
                </div>
            </div>
        )



    }


    function saveLeads(){
        if(window.confirm('Deseja salvar alterações?')){
            try {
                
                const leadArray = JSON.stringify(leadItems)
                localStorage.setItem('@eloLeads', leadArray)
                setLeadLoaded(false)
            } catch (error) {
                
            }
        }
    }
    

    return(
        <div id="leadContainer">
            <div className="leadHeader">
                <img src={displayImg} alt='EloImg'/>
                <p>Painel de Leads</p>
                <div></div>
            </div>
            <div className="leadButtonContainer">
                <Link className="leadButton"
                   to="/newLead"
                >Novo Lead (+)</Link>
                <span/>
                <button
                    onClick={saveLeads}
                    className="leadButtonSave">
                    Salvar Leads
                </button>
            </div>
            <div className="leadTitleGrid">
                <div className="leadTitleContainer">
                    <p className="leadTitle">Cliente em Potencial</p>
                </div>
                <div  className="leadTitleContainer">
                    <p className="leadTitle">Dados confirmados</p>
                </div>
                <div className="leadTitleContainer">
                    <p className="leadTitle">Reunião Agendada</p>
                </div>
            </div>
            {LeadContainer()}
                
            
        </div>
    )
}