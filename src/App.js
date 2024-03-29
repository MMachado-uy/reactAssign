import React, {Component} from 'react';

import './App.css';
import MockBackend from './MockBackend';

import Menu from './components/Menu';
import Clients from './components/Clients';
import AddClient from './components/AddClient';
import Venues from './components/Venues';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currSection: 'clients',
            clients: MockBackend.listClients(),
            venues: MockBackend.listVenues(),
            sections: ['clients', 'venues', 'addClient']
        }

        this.goTo       = this.goTo.bind(this);
        this.addVenue   = this.addVenue.bind(this);
        this.addClient  = this.addClient.bind(this);
        this.favVenue   = this.favVenue.bind(this);
        this.unfavVenue = this.unfavVenue.bind(this);
    }

    // App logic

    goTo(section) {
        this.setState({
            currSection: section
        }, () => {});
    }

    // Backend calls

    addVenue(newVenue) {

        if (newVenue !== '' || newVenue !== null) {
            MockBackend.addVenue({ name: newVenue });
    
            this.setState({
                venues: MockBackend.listVenues()
            }, () => {});
        }
    }

    addClient(newClient) {

        if (newClient !== '' || newClient != null) {
            MockBackend.addClient(newClient);

            this.setState({
                client: MockBackend.listClients()
            }, () => {});
        }
    }

    favVenue(client, venueId) {
        if (client !== null && venueId !== null) {
            MockBackend.addFavoriteVenueToClient(client.id, venueId);

            this.setState({
                clients: MockBackend.listClients()
            }, () => {});
        }
    }

    unfavVenue(client, venueId) {
        if (client !== null && venueId !== null) {
            MockBackend.removeFavoriteVenueFromClient(client.id, venueId);

            this.setState({
                clients: MockBackend.listClients()
            }, () => {});
        }
    }

    // Renders

    renderComponent() {
        let { currSection, clients, venues } = this.state;

        switch(currSection) {
            case 'clients':
                return <Clients clients={clients} 
                                venues={venues} 
                                goTo={this.goTo}
                                favVenue={this.favVenue}
                                unfavVenue={this.unfavVenue} />;
            case 'addClient':
                return <AddClient venues={venues} goTo={this.goTo} addClient={this.addClient}/>
            case 'venues':
                return <Venues venues={venues} addVenue={this.addVenue}/>
            default:
                return <div>Woops! Something went wrong!</div>
        }
    }

    render() {
        let { sections, currSection } = this.state;
        let menuProps = {
            currSection,
            sections,
            goTo: this.goTo
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
