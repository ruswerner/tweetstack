export default store => next => action => {
  next(action);
  if (localStorage) {
    const queries = store.getState().stacks.map(s => s.query).toJSON();
    localStorage.setItem('stackQueries', JSON.stringify(queries));
  }
};
