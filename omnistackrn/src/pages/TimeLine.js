import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
//adiciona o flatlist pq é melhor pra performance e permite umas funciolidades de scroll e de refresh
import {View,FlatList,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native';
import socket from 'socket.io-client'
import api from '../services/api'
import Tweet from '../components/Tweet'

export default class TimeLine extends Component{
       
    static navigationOptions = ({navigation}) => ({
        title:`Olá, ${ AsyncStorage.getItem('@OmniStack:username')}`,
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Icon
                    style = {{marginRight:20}}
                    name="add-circle-outline"
                    size={24}
                    color="#4bb0ee"
                />
            </TouchableOpacity>
        ),
    });

    state = {
        tweets: []
    }

    async componentDidMount(){
        this.subscribeToEvents();

        const response = await api.get("tweets");

        this.setState({tweets:response.data});
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

    render(){
        return(
            <View style={styles.container}>
                <FlatList 
                data={this.state.tweets}
                keyExtractor={tweet => tweet._id}
                renderItem={({item}) => <Tweet tweet={item}></Tweet>}>

                </FlatList>
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });
  


