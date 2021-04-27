import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import AppHeader from '../components/AppHeader';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: ''
    });
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json";

    return fetch(url)
      .then((data) => {
        if(data.status === 200) {
          return data.json();
        }
        else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if(responseObject) {
          var wordData = responseObject.definitions[0];

          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;

          this.setState({
            "word": this.state.text,
            "definition": definition,
            "lexicalCategory": lexicalCategory,
          });
        }
        else {
          this.setState({
            "word": this.state.text,
            "definition": "Not Found"
          });
        }
      });
  }

  render(){
    return (
        <View>
          <AppHeader />
          <View style={styles.appContainer}>
            <TextInput style={styles.textInput}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: 'Loading...',
                lexicalCategory: '',
                examples: [],
                definition: ''
              });
            }}
            value={this.state.text}
            />

            <TouchableOpacity style={styles.searchButton}
            onPress={() => {
              this.setState({isSearchPressed: true});
              this.getWord(this.state.text);
            }}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            <View style={styles.details}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word: {" "}</Text>
                <Text style={{fontSize: 15, marginTop: 3}}>{this.state.word}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type: {" "}</Text>
                <Text style={{fontSize: 15, marginTop: 3}}>{this.state.lexicalCategory}</Text>
              </View>

              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={styles.detailsTitle}>Definition: {" "}</Text>
                <Text style={{fontSize: 15, marginTop: 3}}>{this.state.definition}</Text>
              </View>
            </View>
            
            <View>
              <TouchableOpacity style={styles.soundButton}>
                <Text style={styles.soundButtonText}>{this.state.word}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10
  },
  details: {
    padding: 10,
    marginTop: 35
  },
  textInput: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    textTransform: 'lowercase'
  },
  searchButton: {
    alignSelf: 'center',
    height: 48,
    marginTop: 20,
    borderWidth: 2.5,
    width: "40%",
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  searchButtonText: {
    lineHeight: 40,
    fontWeight: 'bold',
    fontSize: 20
  },
  detailsTitle: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 18
  },
  soundButton: {
    alignSelf: 'center',
    backgroundColor: 'orange',
    width: "50%",
    borderWidth: 2,
    height: 35,
    borderRadius: 7,
    marginTop: 20,
  },
  soundButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 30
  }
});