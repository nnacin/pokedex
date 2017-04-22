import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PokemonList from './PokemonList.jsx';

const style = {
    button: {
        outline: 'none',
        border: 'none',
        //borderRadius: '2px',
        display: 'inline-block',
        height: '36px',
        lineHeight: '36px',
        padding: '0 2rem',
        textTransform: 'uppercase',
        fontFamily: 'Pokemon',
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
            url: 'http://pokeapi.co/api/v2/pokemon/?limit=15'
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
                        style={Object.assign(style.previousButton, style.button)}
                        //style={style.previousButton}
                    >
                        &lt;&lt; Previous
                    </button>
                }
                {!this.state.pokemon.next ||
                    <button
                        onClick={()=> this.setState({ url: this.state.pokemon.next }, this.goTo)}
                        style={Object.assign(style.nextButton, style.button)}
                        //style={style.nextButton}
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
