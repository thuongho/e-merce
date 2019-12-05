// align type to reducer type
export const setCurrentUser = user => ({
  // use capital and snake case for string that will never change
  type: 'SET_CURRENT_USER',
  payload: user
});
