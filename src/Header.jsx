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
        top: '0'
    }
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
                    style={{ float: 'right'}}
                >
                    My pokemon
                </button>
            </header>
        );
    }
}
export default Header;
