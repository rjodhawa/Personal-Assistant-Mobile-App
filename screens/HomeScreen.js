import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const windowHeight = Dimensions.get("screen").width;
const windowWidth = Dimensions.get("screen").height;
async function getQuote() {
  return new Promise((resolve, reject) => {
    fetch('http://quotes.rest/qod.json?category=inspire', {
      method: 'GET',
    }).then((response) => {
      const quoteElement = {
        quote: JSON.parse(response._bodyText).contents.quotes[0].quote,
        imageURL: JSON.parse(response._bodyText).contents.quotes[0].background,
        author: JSON.parse(response._bodyText).contents.quotes[0].author,
        copyright: JSON.parse(response._bodyText).contents.copyright
      }
      resolve(quoteElement);
    })
      .catch(function (error) {
        reject(error);
      });
  })

}
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      imageURL: '',
      copyright: '',
      author: '',
    }
  }
  componentDidMount() {
    getQuote()
      .then((response) => {
        console.log(response);
        this.setState({
          quote: '" '+response.quote + ' "',
          imageURL: response.imageURL,
          copyright: response.copyright,
          author: response.author
        })
      }).catch((error) => {
        console.log(error);
      })
  }
  render() {
    return ( 
      <View style={styles.container}>
        <Image source = {{uri: this.state.imageURL===''?'https://facebook.github.io/react/logo-og.png':this.state.imageURL}} style={styles.image} />
        <Text style={styles.quote}>{this.state.quote}</Text>
        <Text style = {styles.footerQuote}>Author: {this.state.author}, copyright: {this.state.copyright}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 20,
    marginTop: windowHeight * 0.4,
    marginBottom: windowHeight * 0.3,
    marginLeft: windowWidth * 0.05,
    marginRight: windowWidth * 0.05,
  },
  quote: {
    marginTop: windowHeight * 0.1,
    fontSize: windowWidth * 0.03,
    textAlign: 'center',
    color: '#990556'
  },
  image:{
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.03,
    width: windowWidth * 0.34,
    borderRadius: 20,
    marginLeft: windowWidth * 0.01,
    height: windowHeight * 0.5,
  },
  footerQuote: {
    marginTop: windowHeight * 0.3,
    fontSize: windowWidth * 0.01,
    textAlign: 'center',
  }
});
