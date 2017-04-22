import React, {Component} from 'react';

const styles = {
    footer: {
        color: '#ffffff',
        backgroundColor: '#DD092F',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: 'auto',
        padding: '20px 0 15px 0',
        fontSize: '20px',
        bottom: '0',
        display: 'inline-block',
        fontFamily: 'Pokemon',
        textDecoration: 'none',
    },
    footerLink: {
        all: 'unset',
        textDecoration: 'none',
        padding: '5px 25px',
        color: 'black'
    },
    footerIcon: {
        height: '20px',
        padding: '0 5px'
    }
};

class Footer extends Component {
    render() {
        return (
            <footer style={styles.footer}>
                <a
                    href='http://pokeapi.co/'
                    target='_blank'
                    style={styles.footerLink}
                >
                    Pokéapi
                </a>
                <img src='styles/iconPokeball.png' style={styles.footerIcon}/>
                <a
                    href='http://pokemon.wikia.com/wiki/Pok%C3%A9dex'
                    target='_blank'
                    style={styles.footerLink}
                >
                    Pokédex
                </a>
                <img src='styles/iconPokeball.png' style={styles.footerIcon}/>
                <a
                    href='https://infinum.co/'
                    target='_blank'
                    style={styles.footerLink}
                >
                    Infinum
                </a>
            </footer>
        );
    }
}
export default Footer;
