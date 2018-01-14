// On importe les composants et librairies dont notre application (ici composant principal) a besoin.

import React, {Component} from 'react';
import {View,Button} from 'react-native';
import {Header, Form, Spinner} from './src/components/common';
import firebase from 'firebase';

// On crée un class based component qui étend la classe Component de React.
export default class App extends Component{
  // Dans cette application nous n'utilisons pas de structure particulière pour gérer l'état de l'application. Le state est ici définit

  // Est-ce que l'utilisateur est connecté ou non ?

  // Pour cette application nous utilisons un booléen qui détermine si l'utilisateur est connecté ou pas. Comme il s'agit ici d'une requête asynchrone, il est conseillé d'utiliser un état intermédaire (en attendant le retour de la requête du service Firebase) et l'on définit ainsi le state à null (pas TRUE, ni FALSE mais NULL)

  state = {loggedIn:null}

  // Juste avant le rendu du composant...
  // Cette méthode n'est appelée qu'une fois, avant le rendu du composant (attention, le composant est re-rendu à chaque modification). Il n'est pas possible d'accéder à des données UI (Dom, etc.) via cette Life Cycle Method.

  componentWillMount(){
    // On initialise notre connexion avec le service de Firebase en passant toute une série de paramètres sous forme d'un objet.
    firebase.initializeApp({
      apiKey: 'AIzaSyBptbu5_-cOLVm2Cr9we3Kzc81fFLg6jzU',
      authDomain: 'authtest-79037.firebaseapp.com',
      databaseURL: 'https://authtest-79037.firebaseio.com',
      projectId: 'authtest-79037',
      storageBucket: 'authtest-79037.appspot.com',
      messagingSenderId: '574181781341'
    });

    // lorsque l'utilisateur se connecte ou se déconnecte execute cette fonction.
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn:true});
      }
      else {
        this.setState({loggedIn:false});
      }
    });
  }

  // La fonction renderContent() nous permet de filtrer ce qui doit être afficher ou non en fonction de l'état de l'application (state).
  renderContent(){
    // On récupère le state du composant et on test la valeur stockée dans loggedIn. En fonction du cas rencontré, on retourne tel ou tel composant.
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button
            onPress={() => firebase.auth().signOut()}
            title='Log Out'>
          </Button>
        );

      case false:
        return <Form />;

      default:
        <Spinner />;
    }
  }
  // La fonction render() retourne un seul élément, le View qui contient le Header et une helper fonction qui permettra de filtrer le contenu à afficher en fonction de l'état (state) de l'application.
  render(){
    return(
      <View>
        <Header headerText={"Authentification"} />
        {this.renderContent()}
      </View>
    )
  }
}
