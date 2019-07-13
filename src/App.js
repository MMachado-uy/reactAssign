import React, {Component} from 'react';

import './App.css';
import MockBackend from './MockBackend';

import Menu from './components/Menu';
import Clients from './components/Clients';
import Venues from './components/Venues';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currSection: 'clients',
            clients: MockBackend.listClients(),
            venues: MockBackend.listVenues(),
            sections: ['clients', 'venues']
        }

        this.menuHandler = this.menuHandler.bind(this);
        this.addVenue = this.addVenue.bind(this);
    }

    renderComponent() {
        let { currSection, clients, venues } = this.state;

        switch(currSection) {
            case 'clients':
                return <Clients clients={clients} venues={venues}/>;
            case 'venues':
                return <Venues venues={venues} addVenue={this.addVenue}/>
            case 'coso':
                return <div>Hola</div>;
            default:
                return <div>Woops! Something went wrong!</div>
        }
    }

    menuHandler(section) {
        this.setState({
            currSection: section
        }, () => {})
    }

    addVenue(newVenue) {

        if (newVenue !== '' || newVenue !== null) {
            MockBackend.addVenue({ name: newVenue });
    
            this.setState({
                venues: MockBackend.listVenues()
            }, () => {})
        }
    }

    render() {
        let { sections, currSection } = this.state;
        let menuProps = {
            currSection,
            sections,
            menuHandler: this.menuHandler
        }

        return (
            <div>
                <Menu {...menuProps}/>
                { this.renderComponent() }
            </div>
        );
    }
}

export default App;
