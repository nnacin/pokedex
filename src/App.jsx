import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PokemonList from './PokemonList.jsx';

const styles = {
    button: {
        outline: 'none',
        border: 'none',
        display: 'inline-block',
        height: '36px',
        lineHeight: '36px',
        padding: '0 2rem',
        textTransform: 'uppercase',
        fontFamily: 'Pokemon',
        marginTop: '5px',
        cursor: 'pointer'
    },
    previousButton: {
        width: '50%',
        float: 'left',
        backgroundColor: '#FBFBFB'
    },
    nextButton: {
        width: '50%',
        float: 'right',
        backgroundColor: '#DFDFDF'
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokemon: [],
            showMyPokemon: false,
            url: 'http://pokeapi.co/api/v2/pokemon/?limit=25'
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
                    <button
                        onClick={()=> this.setState({ url: this.state.pokemon.previous }, this.goTo)}
                        style={Object.assign(styles.previousButton, styles.button)}
                    >
                        &lt;&lt; Previous
                    </button>
                }
                {!this.state.pokemon.next ||
                    <button
                        onClick={()=> this.setState({ url: this.state.pokemon.next }, this.goTo)}
                        style={Object.assign(styles.nextButton, styles.button)}
                    >
                        Next >>
                    </button>
                }
                <Footer />
            </div>
        );
    }
}
export default App;
