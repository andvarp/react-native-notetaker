import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBPWjjHm4kvNND9j7XJ69Wx1hUwqAXAHS4',
      authDomain: 'react-native-auth-53389.firebaseapp.com',
      databaseURL: 'https://react-native-auth-53389.firebaseio.com',
      projectId: 'react-native-auth-53389',
      storageBucket: 'react-native-auth-53389.appspot.com',
      messagingSenderId: '125528683636'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (<Button onPress={() => firebase.auth().signOut()} >
          Log out
        </Button>);
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Auth 🔑'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
