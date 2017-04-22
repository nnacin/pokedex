import React, {Component, PropTypes} from 'react';
import ReactSpinner from 'react-spinjs';
import Pokemon from './Pokemon.jsx';

const styles = {
    openMyPokemon: {
        zIndex: '4',
        position: 'fixed',
        top: '0',
        bottom: '0',
        transition: '-webkit-transform 0.3s ease-out',
        willChange: 'transform',
        overflowY: 'auto',
        right: '0',
        width: '25%',
        transform: 'translateX(0%)',
        backgroundColor: '#5B604A',
    },
    closeMyPokemon: {
        zIndex: '300',
        position: 'fixed',
        top: '0',
        bottom: '0',
        transition: '-webkit-transform 0.3s ease-out',
        willChange: 'transform',
        overflowY: 'auto',
        right: '0',
        width: '50px',
        transform: 'translateX(120%)'
    },
    pokemonLabel: {
        display: 'block',
        textAlign: 'center'
    },
    addButton: {
        display: 'block',
        fontFamily: 'Pokemon',
        width: '100%',
        borderRadius: 'none',
        height: '25px',
        outline: 'none',
        border: 'none',
        cursor: 'pointer'
    },
    addButtonDisabled : {
        display: 'block',
        fontFamily: 'Pokemon',
        width: '100%',
        borderRadius: 'none',
        height: '25px',
        cursor: 'not-allowed',
        opacity: '0.3'
    },
    image: {
        cursor: 'pointer'
    },
    removeButton: {
        display: 'block',
        fontFamily: 'Pokemon',
        borderRadius: 'none',
        outline: 'none',
        width: '100%',
        height: '25px',
        backgroundColor: '#DD092F',
        opacity: '0.3',
        border: 'none'
    },
    pokemon: {
        maxWidth: '120px',
        border: '4px solid gray',
        minHeight: '160px',
        margin: '5px 5px'
    },
    myPokemon: {
        textAlign: 'center',
    },
    closeButton: {
        all: 'unset',
        cursor: 'pointer',
        float: 'right',
        padding: '0 5px',
        color: 'white',
        fontFamily: 'Helvetica, Sans-Serif'
    }
};

class PokemonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPokemon: {},
            myPokemon: localStorage.myPokemon ? JSON.parse(localStorage.myPokemon) : [],
            showMyPokemon: false
        }
    }

    displayPokemon = (url) => {
        fetch(url)
            .then(result=>result.json())
            .then(pokemon => this.setState({ selectedPokemon: pokemon }))
    };

    addToMyPokemons = (pokemon) => {
        const id = pokemon.url.split('/')[6];
        if (!this.state.myPokemon.find((pok) => pok.id === id)) {
            const newPokemon = {
                id,
                name: pokemon.name,
                url: pokemon.url
            };
            const pokemonArray = this.state.myPokemon;
            pokemonArray.push(newPokemon);
            this.setState({ myPokemon: pokemonArray });
            localStorage.setItem("myPokemon", JSON.stringify(pokemonArray));
        }
    };

    removePokemon = (pokemon) => {
        const pokemonArray = this.state.myPokemon.filter((pok) => pok.id !== pokemon.id);
        this.setState({ myPokemon: pokemonArray });
        localStorage.setItem("myPokemon", JSON.stringify(pokemonArray));
    };

    checkImageValid = (src) => {
        let http = new XMLHttpRequest();
        http.open('HEAD', src, false);
        http.send();

        if (http.status === 404) {
            return 'styles/pokemonPlaceholder.png'
        } else {
            return src;
        }
    };

    render() {
        if (this.props.pokemonList.results) {
            return (
                <div style={{  minHeight: '100vh', height: 'auto', marginTop: '185px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
                    {this.props.pokemonList.results.map((item, key) =>
                        <div style={styles.pokemon} key={key}>
                            <img
                                style={styles.image}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`}
                                onClick={() => this.displayPokemon(item.url)}
                            />
                            <span style={styles.pokemonLabel}>{item.name}</span>
                            <br/>
                            {
                                //!!this.state.myPokemon.find((pok) => pok.id===item.url.split('/')[6]) ||
                                <button
                                    onClick={() => !!this.state.myPokemon.find((pok) => pok.id===item.url.split('/')[6]) || this.addToMyPokemons(item)}
                                    style={this.state.myPokemon.find((pok) => pok.id===item.url.split('/')[6]) ? styles.addButtonDisabled : styles.addButton}
                                    title={this.state.myPokemon.find((pok) => pok.id===item.url.split('/')[6]) ? 'Already in My pokemon list.' : ''}
                                >
                                    Add</button>
                            }
                        </div>)
                    }
                    {!this.state.selectedPokemon.abilities ||
                        <Pokemon
                            selectedPokemon={this.state.selectedPokemon}
                            handleRequestCloseFunc={() => this.setState({ selectedPokemon: {} })}
                        />

                    }
                    <div
                    style={this.props.showMyPokemon ? styles.openMyPokemon : styles.closeMyPokemon}
                    >
                        <button
                            onClick={this.props.requestCloseFn}
                            style={styles.closeButton}
                        >
                            X
                        </button>
                        {this.state.myPokemon.map((item, key) =>
                            <div style={styles.myPokemon} key={key}>
                                <img
                                    style={styles.image}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`}
                                    onClick={() => this.displayPokemon(item.url)}
                                />
                                <span style={styles.pokemonLabel}>
                                    {item.name}
                                </span>

                                <button
                                    style={styles.removeButton}
                                    onClick={() => this.removePokemon(item)}>Remove</button>

                            </div>)}
                    </div>
                </div>
            );
        } else {
            const configObject ={
                width: 10,
                radius: 25,
                length: 20
            };
            return <div style={style}><ReactSpinner config={configObject} /></div>
        }
    }
}

Pokemon.PokemonList = {
    pokemonList: PropTypes.array,
    showMyPokemon: PropTypes.bool,
    requestCloseFn: PropTypes.func,
};

export default PokemonList;
