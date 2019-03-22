import React, {Component} from 'react';
import './Login.css'
import twitterLogo from '../twitter.svg'

export default class Login extends Component{
    state = {
        username: '',

    };

    //FUNCAO CHAMADA PELOS EVENTOS DE ONCLICK/ ONSUBMIT
    //EVENTOS SAO ADICONARDOS COMO ARROW FUNCTION O THIS SEMPRE VAI SER REFERIR A CLASSE
    handleInputChange = (e)=>{
        //PARA DEFINIÇÃO DE UM STATE SEMPRE PASSE O OBJERTO IGUAL AO COMPONENTE STATE
        this.setState({username: e.target.value}) 
    };

    handleSubmit = (e) =>{
        //ESSE METODO EVITA QUE O FORM FAÇA A AÇÃO PADRAO(MUDAR DE PAGINA POR EXEMPLO)
        e.preventDefault();

        const {username} = this.state;
        //SE NADA DIGITADO ENTAO RETORNA NADA
        if(!username.length) return;
        //SLAVA NO BROWSER
        localStorage.setItem('@GoTwitter:username', username);
        //PROPS SAO AS PROPRIEDADES DE CADA ELEMENTO (VALUE, ONCLICK), HISTORY.PUSH É PARA ALTERRAR A ROTA (ESTA NO PACOTE DO REACT-ROUTER-DOM)
        this.props.history.push('/timeline');
    };

    render(){
        return (
            <div className="login-wrapper" >
                <img src={twitterLogo} alt="GoTwitter"></img>
                <form onSubmit = {this.handleSubmit}>
                    <input 
                        placeholder="Nome de usuario" 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}

