const INITIAL_STATE ={
    searchInput:''
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'SEARCH':        
            return {...state,searchInput:action.searchInput}
        default :
            return state
    }
}