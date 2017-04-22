import React, {Component} from 'react';
import Modal from 'react-modal';
import '../styles/fonts.scss';

const styles = {
    modal: {
        overlay : {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: '4'
        },
        content : {
            top: '40px',
            left: '40px',
            right: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            zIndex: '4',
            height: 'auto',
            fontFamily: 'Helvetica, Sans-Serif'
        }
    },
    title: {
        color: '#DD092F',
        fontFamily: 'Pokemon',
    }
};

class Pokemon extends Component {


    displaySettings = (pokemon, setting, options) => {
         if (options) {
             return <li key={pokemon.id}>{pokemon[setting].name} (&nbsp;
                 {options.map((option) => <span>{option}: {pokemon[option]}&nbsp;</span>)})
                    </li>
         } else {
            return <li key={pokemon.id}>{pokemon[setting].name}</li>
         }
    };

    render() {
        const { selectedPokemon: pokemon } = this.props;

        console.log(pokemon)
        return (
            <Modal
                isOpen={pokemon}
                onRequestClose={this.props.handleRequestCloseFunc}
                style={styles.modal}
                contentLabel="Modal"
            >
                <h2 style={styles.title}>
                    {pokemon.forms[0].name.charAt(0).toUpperCase() + pokemon.forms[0].name.substr(1).toLowerCase()}
                </h2>
                <p>
                    <b>Order: </b>
                    {pokemon.order}
                </p>
                <p>
                    <b>Weight: </b>
                    {pokemon.weight}
                </p>
                <p>
                    <b>Height: </b>
                    {pokemon.height}
                </p>
                <p>
                    <b>Base experience: </b>
                    {pokemon.base_experience}
                </p>
                <p>
                    <b>Abilities: </b>
                    {pokemon.abilities.map((node) => this.displaySettings(node, 'ability'))}
                </p>
                <p>
                    <b>Types: </b>
                    {pokemon.types.map((node) => this.displaySettings(node, 'type'))}
                </p>
                <p>
                    <b>Stats: </b>
                    {pokemon.stats.map((node) => this.displaySettings(node, 'stat', ['base_stat', 'effort']))}
                </p>
                <p>
                    <b>Held items: </b>
                    {pokemon.held_items.map((node) => this.displaySettings(node, 'item'))}
                </p>
                <p>
                    <b>Moves: </b>
                    {pokemon.moves.map((node) => this.displaySettings(node, 'move'))}
                </p>
            </Modal>
        );
    }
}
export default Pokemon;
