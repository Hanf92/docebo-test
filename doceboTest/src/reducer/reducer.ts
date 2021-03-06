import {combineReducers} from 'redux';
import {loadingReducer} from 'reducer/loading/loading.reducer';
import {usersReducer} from 'reducer/users/users.reducer';
import {userReducer} from 'reducer/user/user.reducer';

const rootReducer = combineReducers({
  loadingReducer,
  usersReducer,
  userReducer
});
export default rootReducer;
