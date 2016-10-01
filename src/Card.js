import React, { PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';
let titlePropType = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value !== 'string' || value.length > 40) {
            return new Error(
                `${propName} in ${componentName} is longer than 40 characters`
            );
        }
    }
};
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
        this.click = this.click.bind(this);
    }

    click() {
        this.setState({ showDetails: !this.state.showDetails });
    }
    render() {
        let carDetails;
        if (this.state.showDetails) {
            carDetails = (
                <div className="car_details">
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} 
                               taskCallbacks={this.props.taskCallbacks}/>
                </div>
            );
        }
        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };
        return (
            <div className="card">
                <div style={sideColor}/>
                <div className={
                    this.state.showDetails ? "card_title card_title--is-open":"card_title"
                    } 
                    onClick={this.click}>{this.props.title}</div>
                {carDetails}
            </div>
        );
    }
}
Card.propTypes = {
    description: PropTypes.string,
    id: PropTypes.number,
    title: titlePropType,
    tasks: PropTypes.arrayOf(PropTypes.object),
    color: PropTypes.string,
    taskCallbacks:PropTypes.object
};
export default Card;