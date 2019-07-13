import React, {Component} from 'react';
import './Menu.css';

import _ from 'lodash';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        let { sections, currSection } = this.props;

        return(
            <div id="Menu">
                <ul>
                    {sections.map( (section, idx) => (
                        <li key={idx}
                            className={(section === currSection) ? 'active' : ''}
                            onClick={() => this.props.menuHandler(section)}>
                            {_.capitalize(section)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Menu;