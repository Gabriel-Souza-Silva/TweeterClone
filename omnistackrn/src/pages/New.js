import React, { Component } from 'react';

import { View,SafeAreaView,Text, TouchableOpacity, TextInput,AsyncStorage,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../services/api'

// import styles from './styles';

export default class New extends Component {
   static navigationOptions = {
       header: null
   } 

   state = {
       newTweet:'',
   }

   goBack = () =>{
        this.props.navigation.pop();
   }

   handleTweet = async () =>{
        const content = this.state.newTweet;
        const author = await AsyncStorage.getItem('@OmniStack:username'); 

        await api.post("tweets",{author,content});
        this.goBack();
   }

   handleInputChange = (newTweet) =>{
       this.setState({newTweet});
   }

  render() {

  return(
        //SafeAreaView garante que o layout nao use as partes de note e a parte inferior dos apps
        <SafeAreaView style={styles.container}>
            <View style = {styles.header}>
                <TouchableOpacity onPress={()=>{this.goBack()}}>
                    <Icon name="close" size={24} color="#4bb0ee"></Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.handleTweet}>
                    <Text style={styles.buttonText}>Tweetar</Text>
                </TouchableOpacity>
            </View>

            <TextInput 
                style={styles.input}
                multiline
                placeholder="O que está acontecendo?"
                placeholderTextColor="#999"
                onChangeText={this.handleInputChange}
                returnKeyType="send"
                value={this.state.newTweet}
                onSubmitEditing={this.handleTweet}></TextInput>
        </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
  
