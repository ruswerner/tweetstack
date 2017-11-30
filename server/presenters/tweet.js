const userPresenter = require('./user');

module.exports = ({id_str, text, user, created_at}) => ({
  id: id_str,
  text,
  created_at,
  user: userPresenter(user)
});
