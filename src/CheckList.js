import React, { PropTypes } from 'react';

class CheckList extends React.Component {
    render() {
        let tasks = this.props.tasks.map((task) => (
            <li key={task.id} className="checklist_task">
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist_task--remove" />
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="check--add-task"
                       placeholder="Type then hit Enter to add a task" />
            </div>
        );
    }
}
CheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.Object)
};
export default CheckList;