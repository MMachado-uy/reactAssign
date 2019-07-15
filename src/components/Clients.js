import React, {Component} from 'react';

import './Clients.css';

import _ from 'lodash';

class Clients extends Component {
    constructor(props){
        super(props);
        this.state = {
            minAge: null,
            maxAge: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        let {
            id,
            value
        } = event.target;

        let newState = {};

        newState[id] = parseInt(value) || null;

        this.setState(newState, () => {});
    }

    renderClients() {
        let { clients, venues } = this.props;
        let { minAge, maxAge } = this.state;

        return clients.map(client => {
            if ((minAge === null && maxAge === null)            // No Filter defined
                || (minAge === null && client.age <= maxAge)    // Only maxAge defined
                || (maxAge === null && minAge <= client.age)    // Only minAge defined
                || (minAge !== null && maxAge !== null && minAge <= client.age && client.age <= maxAge) // Both filters defined
            ) {
                return (
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
                )
            } else {
                return false;
            }
        })
    }

    render() {
        return(
            <div id="Clients">
                <h1>Clients</h1>
                <div>
                    <div>Filter</div>
                    <label>
                        Min Age:
                        <input type="number" id="minAge" step="1" min="0" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Max Age:
                        <input type="number" id="maxAge" step="1" min="0" onChange={this.handleChange}/>
                    </label>
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
                            {this.renderClients()}
                        </tbody>
                    </table>
                </div>
                <div className="btn-bottom">
                    <input type="button" value="Add New Client" onClick={() => this.props.goTo('addClient')}/>
                </div>
            </div>
        )
    }
}

export default Clients;