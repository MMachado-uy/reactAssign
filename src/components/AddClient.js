import React, {Component} from 'react';

import './AddClient.css';

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
                    <table border="0">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="firstName">Name:</label>
                                </td>
                                <td>
                                    <input type="text" id="firstName" onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="lastName">Last Name:</label>
                                </td>
                                <td>
                                    <input type="text" id="lastName" onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="name">Username:</label>
                                </td>
                                <td>
                                    <input type="text" id="name" onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="age">Age:</label>
                                </td>
                                <td>
                                    <input type="text" id="age" onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="email">Email:</label>
                                </td>
                                <td>
                                    <input type="text" id="email" onChange={this.handleChange} />
                                </td>
                            </tr>
                            {venues.map((venue, idx) => (
                                <tr key={idx}>
                                    <td colSpan="2">
                                        <input type="checkbox" id={`fav-${venue.id}`} value={venue.name} onChange={this.handleChange} />{venue.name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="btn-bottom">
                        <input type="button" value="Add client" onClick={this.handleSubmit} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddClient;