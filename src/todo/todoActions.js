import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (newDescription) => ({
    type: 'DESCRIPTION_CHANGE',
    payload: newDescription
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'TODO_SEARCH', payload: resp.data }))
            .catch(error => {
                console.log(error.message)
                dispatch({type: 'TODO_SEARCH', payload: [] })
            })
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
        .then(resp => dispatch(
            {
                type: 'TODO_CLEAR'
            }
        ))
        .then(resp => dispatch(search()))
        .catch(error => console.log(error.message))
    }
}

export const done = (task, done) => {
    return dispatch => {
        axios.put(`${URL}/${task._id}`, { ...task, done })
        .then(resp => dispatch(search()))
        .catch(error => console.log(error.message))
    }
}

export const remove = (task) => {
    return dispatch => {
        axios.delete(`${URL}/${task._id}`)
        .then(resp => dispatch(search()))
        .catch(error => console.log(error.message))
    }
}

export const clear = () => {
    return [
        {
            type: 'TODO_CLEAR'
        },
        search()
    ]
}