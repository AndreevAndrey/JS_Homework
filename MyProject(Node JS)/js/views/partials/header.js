import Component from '../../views/component.js';

class Header extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`
                 <header class="header"> 
                     <img class="airplane" src="./.././.././.././styles/Img/kisspng-airplane-wide-body-aircraft-flight-aircraft-5a911953467258.7168305315194586432886 (2) (1).png">
                     <a class="header__link ${!resource ? 'active' : ''}" href="/#/">
                         Стартовая страница
                     </a>
                     <a class="header__link ${resource === 'test' ? 'active' : ''}" href="/#/test">
                         Tест
                     </a> 
                     <a class="header__link ${resource === 'game' ? 'active' : ''}" href="/#/game">
                         Игра
                     </a>                                            
                </header>
            `);
        });
    }

    getHideLink() {
        let headStart = document.getElementsByClassName('header__link')[0],
            headTest = document.getElementsByClassName('header__link')[1],
            headGame = document.getElementsByClassName('header__link')[2];
        return headStart.classList.add('hide'), headTest.classList.add('hide'), headGame.classList.add('hide');
    }

    getShowLink() {
        let headStart = document.getElementsByClassName('header__link')[0],
            headTest = document.getElementsByClassName('header__link')[1],
            headGame = document.getElementsByClassName('header__link')[2];
        return headStart.classList.remove('hide'), headGame.classList.remove('hide'), headTest.classList.remove('hide');
    }
}

export default Header;