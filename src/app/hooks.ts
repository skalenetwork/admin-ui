/**
 * Wrapper hooks for Redux-Toolkit
 * for contextualizing types to our app features
 */

import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import type { RootState, Dispatch } from './store';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<Dispatch>();
