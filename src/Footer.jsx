import React, {Component} from 'react';

const styles = {
    footer: {
        color: '#ffffff',
        backgroundColor: '#DD092F',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: '70px',
        padding: '20px 0 15px 0',
        fontSize: '20px',
        position: 'fixed',
        bottom: '0',
        //marginLeft: '-8px',
        display: 'inline-block'
    }
};

class Footer extends Component {
    render() {
        return (
            <footer
                style={styles.footer}
            >
                test
            </footer>
        );
    }
}
export default Footer;
