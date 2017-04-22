import React, {Component} from 'react';
import '../styles/fonts.scss';

const styles = {
    header: {
        height: 'auto',
        width: '100%',
        //background: url('../../assets/bg-chalkboard.jpg') repeat top center;
        borderBottom: '10px solid $black',
        backgroundColor: '#DD092F',
        //box-shadow: 0 10px 29px 0 rgba(0, 0, 0, 0.45);
        paddingBottom: '0',
        marginBottom: '0',
        //zIndex: '100',
        position: 'fixed',
        //marginLeft: '-8px',
        //marginTop: '-8px',
        //width: '100%'
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '25px',
        fontFamily: 'Pokemon',
        top: '0'
    }
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            showMyPokemons: false
        }
    }

    render() {
        return (
            <header
                style={styles.header}
            >
                Pokémon Encyclopedia<br /><br/>
                Pokedex<br/>
                <button
                    onClick={() => this.props.openMyPokemons() }
                    style={{ float: 'right'}}
                >
                    Show my
                </button>
            </header>
        );
    }
}
export default Header;
