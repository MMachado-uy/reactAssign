import React, {Component} from 'react';

import _ from 'lodash';

class AddClient extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            age: '',
            firstName: '',
            lastName: '',
            favoriteVenues: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let newState = {};
        let { favoriteVenues } = this.state;
        let {
            id,
            value,
            checked
        } = event.target;
        
        if (id.match(/fav-*/g)) {
            let favVenue = parseInt(id.replace('fav-', ''));

            if (checked) {
                favoriteVenues.push(favVenue);
            } else {
                _.remove(favoriteVenues, elem => elem === favVenue);
            }
            
            newState.favoriteVenues = favoriteVenues;
        } else {
            newState[id] = value;
        }

        this.setState(newState, () => {});
    }

    handleSubmit() {
        let {
            name,
            email,
            age,
            firstName,
            lastName,
            favoriteVenues
        } = this.state;

        if (name !== '' && email !== '') {
            this.props.addClient({
                name,
                email,
                age,
                firstName,
                lastName,
                favoriteVenues
            });
    
            this.props.goTo('clients');
        }
    }

    render() {
        let { venues } = this.props
        return(
            <div id="AddClient">
                <h1>Add New Client</h1>
                <div>
                    <label>
                        Name:
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </label>
                    <label>
                        Username:
                        <input type="text" id="name" onChange={this.handleChange} />
                    </label>
                    <label>
                        Age:
                        <input type="text" id="age" onChange={this.handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" id="email" onChange={this.handleChange} />
                    </label>
                    {venues.map((venue, idx) => (
                        <div key={idx}><input type="checkbox" id={`fav-${venue.id}`} value={venue.name} onChange={this.handleChange} />{venue.name}</div>
                    ))}
                    <input type="button" value="Add client" onClick={this.handleSubmit} /> 
                </div>
            </div>
        )
    }
}

export default AddClient;