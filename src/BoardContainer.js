import React, { Component } from 'react';
import update from 'react-addons-update';
import Board from './Board';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'my'
};

export default class BoardContainer extends Component {
    constructor() {
        super();
        this.state = {
            cards: [],
        };
        this.toggleTask = this.toggleTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    componentDidMount() {
        fetch(`${API_URL}/cards`, { headers: API_HEADERS })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ cards: responseData });
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }
    addTask(cardId, taskName) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newTask = { id: Date.now(), name: taskName, done: false };
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $push: [newTask] }
            }
        });

        this.setState({ cards: nextState });

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newTask)
            })
            .then((response) => response.json())
            .then((responseData) => {
                newTask.id = responseData.id;
                this.setState({ cards: nextState });
            });

    }
    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $splice: [
                        [taskIndex, 1]
                    ]
                }
            }
        });
        this.setState({ cards: nextState });

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        });
    }
    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });

        this.setState({ cards: nextState });

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({ done: newDoneValue })
        });
    }

    render() {
        return (<Board cards={this.state.cards} 
                    taskCallbacks={{
                        toggle: this.toggleTask,
                        delete: this.deleteTask,
                           add: this.addTask }}/>);
    }
}