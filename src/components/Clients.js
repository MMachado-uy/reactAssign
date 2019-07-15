import React, {Component} from 'react';

import './Clients.css';

import _ from 'lodash';

class Clients extends Component {
    constructor(props){
        super(props);
        this.state = {
            minAge: null,
            maxAge: null,
            editMode: false,
            nowEditing: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFavs   = this.handleFavs.bind(this);
        this.closeEdit    = this.closeEdit.bind(this);
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

    // App logic

    handleFavs(event) {
        let { nowEditing } = this.state;
        
        if (!event.target.checked) {
            this.props.unfavVenue(nowEditing, parseInt(event.target.id));
        } else {
            this.props.favVenue(nowEditing, parseInt(event.target.id));
        }
    }

    // Parent comms

    startEdit(client) {
        let { editMode } = this.state;
        
        if (!editMode) {
            editMode = !editMode;
    
            this.setState({
                editMode,
                nowEditing: client
            }, () => {});
        }
    }

    closeEdit() {
        this.setState({
            editMode: false,
            nowEditing: null
        }, () => {});
    }

    // Renders

    renderClients() {
        let { clients } = this.props;
        let { minAge, maxAge, editMode, nowEditing } = this.state;

        return clients.map(client => {
            if ((minAge === null && maxAge === null)                    // No Filter defined
                || (minAge === null && client.age <= maxAge)            // Only maxAge defined
                || (maxAge === null && minAge <= client.age)            // Only minAge defined
                || (minAge !== null && maxAge !== null 
                    && minAge <= client.age && client.age <= maxAge)    // Both filters defined
            ) {
                return (
                    <tr key={client.id}>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.age}</td>
                        <td>{client.email}</td>
                        <td onClick={() => this.startEdit(client)}>
                            {(editMode && nowEditing !== null && nowEditing.id === client.id) ? 
                                this.editFavVenues(client) : this.renderFavVenues(client.favoriteVenues)}
                        </td>
                    </tr>
                )
            } else {
                return false;
            }
        })
    }

    renderFavVenues(favVenues) {
        let { venues } = this.props;

        return favVenues.map((venue, idx) => {
            let venueName = _.find(venues, ['id', venue]).name;
            
            return `${(idx ? ', ' : '')}${venueName}`;
        });
    }

    editFavVenues(client) {
        let { venues } = this.props;

        return (
            <div>
                {venues.map((venue, idx) => (
                <div key={idx}>
                    <input type="checkbox" 
                        id={venue.id} 
                        value={venue.name} 
                        onChange={this.handleFavs}
                        checked={client.favoriteVenues.lastIndexOf(venue.id) !== -1} />
                        {venue.name}
                </div>))}
                <input type="button" className="btn-small btn-clear" value="Close Edit" onClick={this.closeEdit} />
            </div>
        );
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