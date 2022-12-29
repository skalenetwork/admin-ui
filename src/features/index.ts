import { Store } from '@reduxjs/toolkit';

let store: Store;

/**
 * Injectable store for using features outside react
 */

export function init<T>(payload: { store: Store<T> }) {
  store = payload.store;
}

export function getStore<S>() {
  return store as Store<S>;
}
