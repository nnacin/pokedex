import React, {Component} from 'react';
import Modal from 'react-modal';

const styles = {
    openMyPokemon: {
        zIndex: '300',
        position: 'fixed',
        top: '0',
        bottom: '0',
        transition: '-webkit-transform 0.3s ease-out',
        willChange: 'transform',
        overflowY: 'auto',
        right: '0',
        width: '100px',
        transform: 'translateX(0%)',
        backgroundColor: 'grey'
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
    }
};

class PokemonList extends Component {
    constructor() {
        super();
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

    handleRequestCloseFunc = () => {
        this.setState({ selectedPokemon: {} })
    };

    render() {
        if (this.props.pokemonList.results) {
            return (
                <div style={{ marginTop: '155px', display: 'flex', flexWrap: 'wrap', marginBottom: '70px' }}>
                    {this.props.pokemonList.results.map((item, key) =>
                        <div style={{ maxWidth: '100px' }}>
                            <img
                                key={key}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`}
                                onClick={() => this.displayPokemon(item.url)}
                            />
                            {item.name}
                            {
                                !!this.state.myPokemon.find((pok) => pok.id===item.url.split('/')[6]) || <button onClick={() => this.addToMyPokemons(item)}>Add</button>
                            }
                        </div>)}
                    <Modal
                        isOpen={this.state.selectedPokemon.abilities}
                        //onAfterOpen={afterOpenFn}
                        //onRequestClose={requestCloseFn}
                        onRequestClose={this.handleRequestCloseFunc}
                        //closeTimeoutMS={n}
                        //style={customStyle}
                        contentLabel="Modal"
                    >
                        <h1>{this.state.selectedPokemon.forms ? this.state.selectedPokemon.forms[0].name : ''}</h1>
                        <p>Etc.</p>
                    </Modal>
                    <Modal
                        isOpen={false}
                        //isOpen={this.props.showMyPokemon}
                        //onAfterOpen={afterOpenFn}
                        onRequestClose={this.props.requestCloseFn}
                        //closeTimeoutMS={n}
                        //style={customStyle}
                        contentLabel="Modal"
                    >
                        {this.state.myPokemon.map((item, key) =>
                            <div style={{ maxWidth: '100px' }}>
                                <img
                                    key={key}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`}
                                    onClick={() => this.displayPokemon(item.url)}
                                />
                                {item.name}

                                    <button onClick={() => this.removePokemon(item)}>Remove</button>

                            </div>)}
                    </Modal>
                    <div
                    style={this.props.showMyPokemon ? styles.openMyPokemon : styles.closeMyPokemon}
                    >
                        <button onClick={this.props.requestCloseFn}>Close</button>
                        {this.state.myPokemon.map((item, key) =>
                            <div style={{ maxWidth: '100px' }}>
                                <img
                                    key={key}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`}
                                    onClick={() => this.displayPokemon(item.url)}
                                />
                                {item.name}

                                <button onClick={() => this.removePokemon(item)}>Remove</button>

                            </div>)}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
export default PokemonList;
