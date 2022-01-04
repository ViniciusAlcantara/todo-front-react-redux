const initialState = {
    description: '',
    list: [
        {
            _id: 1,
            description: 'Task 1',
            done: true
        },
        {
            _id: 2,
            description: 'Task 2',
            done: false
        },
        {
            _id: 3,
            description: 'Task 3',
            done: false
        },
    ]
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'DESCRIPTION_CHANGE':
            return {
                ...state,
                description: action.payload
            }
        case 'TODO_SEARCH':
            return {
                ...state,
                list: action.payload
            }
        case 'TODO_CLEAR':
            return {
                ...state,
                description: ''
            }
        default:
            return state
    }
}