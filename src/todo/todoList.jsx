import React from 'react'
import { connect } from 'react-redux'

import { done, remove } from './todoActions'

import IconButton from '../template/iconButton'
import { bindActionCreators } from 'redux'

const TodoList = props => {
    const renderRows = () => {
        const { done, remove } = props
        const tasks = props.tasks || []
        return tasks.map(task => (
            <tr key={task._id}>
                <td className={ task.done ? 'markAsDone' : '' }>{task.description}</td>
                <td>
                    <IconButton style="warning" icon="undo" onClick={() => done(task, false)} hide={!task.done} />
                    <IconButton style="success" icon="check" onClick={() => done(task, true)} hide={task.done} />
                    <IconButton style="danger" icon="trash-o" onClick={() => remove(task)} />
                </td>
            </tr>
        ))
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th className='table-actions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                { renderRows() }
            </tbody>
        </table>
    )
}

function mapStateToProps(state) {
    return {
        tasks: state.todo.list
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators( { done, remove }, dispatch )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)