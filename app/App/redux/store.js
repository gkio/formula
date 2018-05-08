import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

function createReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers,
  });
}

const middlewares = [thunk];

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  process.env.NODE_ENV === 'production' ||
  typeof window.devToolsExtension !== 'function'
    ? f => f
    : window.devToolsExtension(),
);
const store = createStore(reducer, composedEnhancers);
store.asyncReducers = {};
export default store;

store.asyncReducers = {};
export function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
