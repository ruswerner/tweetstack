import StackRecord from '../records/stack';

export default function(state) {
  return state.push(new StackRecord());
}
