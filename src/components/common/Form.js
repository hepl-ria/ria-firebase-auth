import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Field, Spinner} from './';
import MainStyles from '../styles/MainStyles';
import firebase from 'firebase';

class Form extends Component{
  // l'état de notre formulaire par défaut est stocké dans ici, dans le state
  state ={email:'', password:'', error:'', loading:false}

  // C'est le composant formulaire qui sera responsable du contrôle des états de nos champs.

  // Lorsque l'utilisateur appuie sur le bouton, onButtonPress est appellé
  onButtonPress(){
    // on change deux propriétés de l'état du formulaire : le message d'erreur, error et le activityLoader à true.
    this.setState({error:'', loading:true});

    // On stocke, en déstructurant, l'email et le mot de passe qui ont été stocké lors de la saisie
    const {email, password} = this.state;

    // On déclenche le processus d'authentification avec la méthode signInWithEmailAndPassword en passant les deux arguments email et password

    // Si l'authentification réussi, on déclenche la fonction onLoginSuccess
    // Si l'authentification échoue, on essaye de créer un compte avec les arguments passés
    // Si l'authentification réussi, on déclenche la fonction onLoginSuccess
    // Si l'authentification échoue, on retourne un message d'échec
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(()=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }
  // La fonction onLoginSuccess change l'état du formulaire avec les propriétés suivantes
  onLoginSuccess(){
    this.setState({
      email:'',
      password:'',
      loading:false,
      error:'',
    })
  }
  // La fonction onLoginFail change l'état du formulaire avec les propriétés suivantes
  onLoginFail(){
    this.setState({
      error:'Problème Chef',
      loading:false,
    })
  }
  // La fonction renderButton affiche soit le Spinner, soit le Button en fonction de l'état.
  renderButton(){
    if(this.state.loading){
      return <Spinner />
    }
    // On ne précise pas de else et ce return est le contenu par défaut à retourner
    return(
      <Button
        title='Log In'
        onPress={this.onButtonPress.bind(this)}>
      </Button>
    );
  }

  render(){
    const {buttonContainerStyle} = MainStyles;
    return(
      <View>
        <Field
          label='Email'
          placeholder='example@test.com'
          value={this.state.email}
          onChangeText={text => this.setState({email:text})} />

        <Field
          // autoCorrect={false}
          secureTextEntry
          label='Password'
          placeholder='password'
          value={this.state.password}
          onChangeText={password => this.setState({password})} />

        <View style={buttonContainerStyle}>
          {this.renderButton()}
        </View>
        <Text>
          {this.state.message}
          {this.state.error}
        </Text>
      </View>
    )
  }
}

export {Form};


// test@mail.be
