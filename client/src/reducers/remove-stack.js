export default function(state, {index}) {
  if(state.get(index)) {
    return state.splice(index, 1);
  }
  return state;
}
