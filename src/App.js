import React, { Component } from 'react';
import Header from './Header';
import Board from './Board';
// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
let cardsList = [{
        id: 1,
        title: "Read the Book",
        description: "I should read the whole book",
        color: '#BD8D31',
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book.The complete source can be found at [github](https://github.com/pro-react)",
        color: '#3A7E28',
        status: "todo",
        tasks: [{
                id: 1,
                name: "ContactList Example",
                done: true
            },
            {
                id: 2,
                name: "Kanban Example",
                done: false
            },
            {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    },
    {
        id: 3,
        title: "something done",
        description: "have been done",
        color: '#3f51b5',
        status: "done",
        tasks: []

    }

];
export default class App extends Component {
    render() {
        return (
            <Header>
                <Board cards={cardsList} />
            </Header>
        );
    }
}