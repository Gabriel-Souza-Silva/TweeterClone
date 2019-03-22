import React, {Component} from 'react';
import './Timeline.css'
import twitterlogo from '../twitter.svg'
import api from '../services/api'
import Tweet from '../components/Tweet'
import socket from 'socket.io-client'

export default class Timeline extends Component{
    state = {
        tweets: [],
        newTweet:'',
    };

    //METODO RESPONSAVEL PELO CARREGAMENTO DA TELA(SERVICE LOAD)
    async componentDidMount(){
        this.subscribeToEvents()
        //O AWAIT É IMPORTATE SE NAO DA NULLREFERENCE EXCEPTION POIS A REQUISICAO NAO ESTAVA COMPLETA
        const response = await api.get('tweets');

        this.setState({
            tweets: response.data
        });
    }

    
    subscribeToEvents = ()=>{
        const io = socket('http://192.168.15.17:3000');
        io.on('tweet',data=>{
            //PEGA O TWEET A PARTIR DO DATA E COLOCA ELE NO ULTIMO ITEM USANDO O '...'
            this.setState({tweets:[data, ...this.state.tweets]})
        });
        io.on('like', data =>{
            this.setState({tweets: this.state.tweets.map(tweet =>
                tweet._id === data._id ? data : tweet
            )});
        });
    }
    
    
    handleInputChange = (e) =>{
        this.setState({newTweet:e.target.value});
    }
    
    handleNewTweet = async (e) =>{
    
        if(e.keyCode !== 13) return;
        
        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');
        
        await api.post('tweets',{content, author});

        this.setState({newTweet: ''})
    }

    render(){
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterlogo} alt="GoTwitter"></img>
                <form>
                    <textarea 
                    value = {this.state.newTweet}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleNewTweet}
                    placeholder="O que está acontecendo?">
                    </textarea>
                </form>
                
                <ul className="tweet-list">
                {/*MAP PERCORRE CADA ITEM DA LISTA*/                     
                
                this.state.tweets.map(tweet =>(
                    <Tweet key={tweet._id} tweet = {tweet} />
                ))}
                </ul>
                
            </div>
        ); 
    }
}
