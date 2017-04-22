import React, {Component} from 'react';
import Modal from 'react-modal';

const styles = {
    openSidebar: {
        zIndex: '300',

        position: 'fixed',
        top: '0',
        bottom: '0',
        transition: '-webkit-transform 0.3s ease-out',
        willChange: 'transform',
        overflowY: 'auto',
        right: '0',
        width: '50px',
        transform: 'translateX(0%)',
        backgroundColor: 'grey'
    },
    closeSidebar: {
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
            pokemon: {},
            myPokemons: localStorage.pokemons ? JSON.parse(localStorage.pokemons) : [],
            showMyPokemons: false
        }
    }

    displayPokemon(url) {
        fetch(url)
            .then(result=>result.json())
            .then(item=>this.setState({pokemon: item}))
    }

    addToMyPokemons (pokemon) {
        const id = pokemon.url.split('/')[6];
        if (!this.state.myPokemons.find((pok) => pok.id === id)) {
            const newPokemon = {
                id,
                name: pokemon.name,
                url: pokemon.url
            };
            //var newPokemon  = {}
            //newPokemon[id] = pokemon
            //let newPokemon[id] = pokemon;
            const oldArray = this.state.myPokemons;
            oldArray.push(newPokemon)
            this.setState({myPokemons: oldArray})
            localStorage.setItem("pokemons", JSON.stringify(oldArray));
        }
    }

    removePokemon(pokemon) {
        console.log(this.state.myPokemons.find((pok) => pok.id === pokemon.id))
        const myArray = this.state.myPokemons.filter(function( pok ) {
            return pok.id !== pokemon.id;
        });
        console.log(myArray)
        this.setState({myPokemons: myArray})
        localStorage.setItem("pokemons", JSON.stringify(myArray));


    }

    handleRequestCloseFunc = () => {
        this.setState({ pokemon: {}})
    }

    render() {
        console.log('this.props', this.props);
        console.log('this.state', this.state);
        if (this.props.pokemons.results) {
            return (
                <div style={{ marginTop: '155px', display: 'flex', flexWrap: 'wrap', marginBottom: '70px' }}>
                    {this.props.pokemons.results.map((item, key) =>
                        <div style={{ maxWidth: '100px' }}>
                            <img
                                key={key}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`}
                                onClick={() => this.displayPokemon(item.url)}
                            />
                            {item.name}
                            {
                                !!this.state.myPokemons.find((pok) => pok.id===item.url.split('/')[6]) || <button onClick={() => this.addToMyPokemons(item)}>Add</button>
                            }
                        </div>)}
                    <Modal
                        isOpen={this.state.pokemon.abilities}
                        //onAfterOpen={afterOpenFn}
                        //onRequestClose={requestCloseFn}
                        onRequestClose={this.handleRequestCloseFunc}
                        //closeTimeoutMS={n}
                        //style={customStyle}
                        contentLabel="Modal"
                    >
                        <h1>{this.state.pokemon.forms ? this.state.pokemon.forms[0].name : ''}</h1>
                        <p>Etc.</p>
                    </Modal>
                    <Modal
                        isOpen={false}
                        //isOpen={this.props.openMyPokemons}
                        //onAfterOpen={afterOpenFn}
                        onRequestClose={this.props.requestCloseFn}
                        //closeTimeoutMS={n}
                        //style={customStyle}
                        contentLabel="Modal"
                    >
                        {this.state.myPokemons.map((item, key) =>
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
                    style={this.props.openMyPokemons ? styles.openSidebar : styles.closeSidebar}
                    >
                        <button onClick={this.props.requestCloseFn}>Close</button>
                        test
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
export default PokemonList;
