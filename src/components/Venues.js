import React, {Component} from 'react';

import './Venues.css';

class Venues extends Component {
    constructor(props){
        super(props);
        this.state = {
            newVenue: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let { value } = event.target

        this.setState({
            newVenue: value
        }, () => {})
    }

    handleSubmit() {
        let { newVenue } = this.state;

        this.props.addVenue(newVenue);
    }

    render() {
        let { venues } = this.props;

        return(
            <div id="Venues">
                <h1>Venues</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venues.map(venue => (
                                <tr key={venue.id}>
                                    <td>{venue.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="btn-bottom">
                    <input type="text" id="newVenue" onChange={this.handleChange} />
                    <input type="button" value="Add venue" onClick={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

export default Venues;