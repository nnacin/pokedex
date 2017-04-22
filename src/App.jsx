import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PokemonList from './PokemonList.jsx';
import Modal from 'react-modal';


class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            openMyPokemons: false
        };
    }

    componentWillMount() {
        fetch('http://pokeapi.co/api/v2/pokemon?limit=30')
            .then(result=>result.json())
            .then(items=>this.setState({items}))
    }

  render() {
    return (
        <div>
            <Header
                openMyPokemons={() => this.setState({ openMyPokemons: true})}
            />
            <PokemonList
                pokemons={this.state.items}
                openMyPokemons={this.state.openMyPokemons}
                requestCloseFn={() => this.setState({ openMyPokemons: false})}

            />
            <Footer />
        </div>
    );
  }
}
export default App;
