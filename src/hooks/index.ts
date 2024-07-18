import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store';

export { default as useDisableScroll } from './useDisableScroll';
export { default as useNameForm } from './useNameForm';
export { default as useOutsideClick } from './useOutsideClick';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
