import React, {Component} from 'react';
import '../styles/fonts.scss';

const styles = {
    header: {
        height: 'auto',
        width: '100%',
        borderBottom: '10px solid $black',
        backgroundColor: '#DD092F',
        paddingBottom: '0',
        marginBottom: '0',
        position: 'fixed',
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '25px',
        fontFamily: 'Pokemon',
        top: '0',
        zIndex: '3'
    },
    button: {
        outline: 'none',
        border: 'none',
        //borderRadius: '2px',
        display: 'inline-block',
        height: '36px',
        lineHeight: '36px',
        padding: '0 2rem',
        textTransform: 'uppercase',
        float: 'right',
        backgroundColor: 'black',
        marginRight: '5px',
        color: 'white',
        fontFamily: 'Pokemon',
    },
};

class Header extends Component {
    render() {
        return (
            <header
                style={styles.header}
            >
                Pokémon Encyclopedia<br /><br/>
                Pokedex<br/>
                <button
                    onClick={() => this.props.showMyPokemon()}
                    style={styles.button}
                >
                    My pokemon
                </button>
            </header>
        );
    }
}
export default Header;
