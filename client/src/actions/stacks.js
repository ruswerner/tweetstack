export const AUTO_ADD_DELAY = 300;

export function addStack() {
  return {
    type: 'ADD_STACK'
  };
}

export function removeStack(index) {
  return function(dispatch, getState) {
    if (getState().stacks.size === 1) {
      setTimeout(() => dispatch(addStack()), AUTO_ADD_DELAY);
    }
    dispatch({
      type: 'REMOVE_STACK',
      index
    });

  };
}

export function refreshStack(index) {
  return function(dispatch, getState) {
    const query = getState().stacks.get(index).query;
    return searchStack(index, query)(dispatch);
  };
}

export function searchStack(index, query) {
  return function(dispatch) {

    dispatch({
      type: 'STACK_SEARCH_LOADING',
      index,
      query
    });

    return fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(async resp => {
        const tweets = await resp.json();
        dispatch({
          type: 'STACK_SEARCH_COMPLETE',
          index,
          tweets
        });
      })
      .catch(error => {
        dispatch({
          type: 'STACK_SEARCH_COMPLETE',
          index,
          tweets: [],
          error
        });
      });

  };
}

export function clearAllStacks(autoAdd = true) {
  return function(dispatch) {
    if (autoAdd) {
      setTimeout(() => dispatch(addStack()), AUTO_ADD_DELAY);
    }
    dispatch({
      type: 'CLEAR_ALL_STACKS'
    });
  };
}

export function rehydrateStacks() {
  return function(dispatch) {
    // Rehydrate state using actions because only part of the state is persisted (the query)
    // The rest of the data (tweets) should be refreshed from the server
    if (localStorage) {
      const stackQueries = localStorage.getItem('stackQueries');
      if (stackQueries) {
        dispatch(clearAllStacks(false));
        JSON.parse(stackQueries).forEach((query, i) => {
          dispatch(addStack());
          if (query.length > 0) {
            dispatch(searchStack(i, query));
          }
        });
      }
    }
  }
}