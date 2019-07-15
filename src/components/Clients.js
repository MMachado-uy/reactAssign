import React, {Component} from 'react';

import './Clients.css';

import _ from 'lodash';

class Clients extends Component {
    constructor(props){
        super(props);
        this.state = {
            currSection: ''
        }
    }

    render() {
        let { clients, venues } = this.props;

        return(
            <div id="Clients">
                <h1>Clients</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Fav. Venues</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.firstName}</td>
                                    <td>{client.lastName}</td>
                                    <td>{client.age}</td>
                                    <td>{client.email}</td>
                                    <td>{client.favoriteVenues.map((venue, idx) => {
                                        let venueName = _.find(venues, ['id', venue]).name
                                        
                                        return `${(idx ? ', ' : '')}${venueName}`
                                    })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="addClient">
                    <input type="button" value="Add New Client" onClick={() => this.props.goTo('addClient')}/>
                </div>
            </div>
        )
    }
}

export default Clients;