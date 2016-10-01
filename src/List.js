import React, { PropTypes } from 'react';
import Card from './Card';

export default class List extends React.Component {
    render() {
        let cards = this.props.cards.map((card) => {
            return (<Card key={card.id}
                         title={card.title}
                         description={card.description}
                         color={card.color}
                         tasks={card.tasks} />);

        });

        return (
            <div className="list mdl-cell mdl-cell--4-col">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

List.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired
};