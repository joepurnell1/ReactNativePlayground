import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import searchArtist from './ArtistService';
import Artist from './Artist';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchResults: [],
    };
  }

  handleOnChange = (artist) => {
    this.setState({"searchValue": artist})
    searchArtist(artist)
      .then(response => this.setState({"searchResults": response}));
  }

  renderSearchResults = () => {

    if (this.state.searchResults.length === 0) {
      return [];
    }

    if (typeof this.state.searchResults[0] === 'string') {
      return (
        <View style={styles.panelView}>
          <Text style={styles.error}>{this.state.searchResults}</Text>
        </View>
      );
    }

    return(
      <ScrollView style={styles.resultContainer}>
        <Text style={styles.welcome}>Results:</Text>
        {
          this.state.searchResults.map((result) => (
            <Artist
              key={result.id}
              name={result.name}
              imageSrc={result.images[0] ? result.images[0].url : undefined}
              popularity={result.popularity}
            />
          ))
        }
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Music Artist Search</Text>
        <TextInput
          style={styles.searchBox}
          placeholder='Search Artist...'
          value={this.state.searchValue}
          onChangeText={this.handleOnChange}
        />
        {this.renderSearchResults()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  panelView: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: '600',
  },
  error: {
    fontSize: 15,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBox: {
    height: 40,
    width: '75%',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 25,
  },
  resultContainer: {
    marginTop: 15,
  }
});
