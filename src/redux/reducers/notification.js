
const notification = (state = 0, action) => {
    switch (action.type) {
        case 'set':
            return state + action.number
        default: 
            return state
    }
}

export default notification;