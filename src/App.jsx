import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PokemonList from './PokemonList.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokemon: [],
            showMyPokemon: false,
            url: 'http://pokeapi.co/api/v2/pokemon?limit=20'
        };
    }

    componentWillMount() {
        fetch(this.state.url)
            .then(result => result.json())
            .then(pokemon => this.setState({ pokemon }))
    }

    goTo = () => {
        fetch(this.state.url)
            .then(result => result.json())
            .then(pokemon => this.setState({ pokemon }))
    };

    render() {
        return (
            <div>
                <Header
                    showMyPokemon={() => this.setState({ showMyPokemon: true})}
                />
                <PokemonList
                    pokemonList={this.state.pokemon}
                    showMyPokemon={this.state.showMyPokemon}
                    requestCloseFn={() => this.setState({ showMyPokemon: false})}
                />
                {!this.state.pokemon.previous ||
                    <button onClick={()=> this.setState({ url: this.state.pokemon.previous }, this.goTo)}>
                        Previous
                    </button>
                }
                {!this.state.pokemon.next ||
                    <button onClick={()=> this.setState({ url: this.state.pokemon.next }, this.goTo)}>
                        Next
                    </button>
                }
                <Footer />
            </div>
        );
    }
}
export default App;
