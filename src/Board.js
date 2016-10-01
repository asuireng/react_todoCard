import React ,{ PropTypes } from 'react';
import List from './List';

class Board extends React.Component {
    render() {
        return (
            <div className="app mdl-grid">
                <List id="todo" title="To Do" cards={
                    this.props.cards.filter((card)=> card.status==="todo")
                } />
                <List id="in-progress" title="In Progress" cards={
                    this.props.cards.filter((card)=> card.status==="in-progress")
                } />
                <List id="done" title="Done" cards={
                    this.props.cards.filter((card)=> card.status==="done")
                } />
            </div>
        );
    }
}
Board.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
}
export default Board;