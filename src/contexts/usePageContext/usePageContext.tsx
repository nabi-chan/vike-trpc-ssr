import { useContext } from 'react';
import { Context } from './Context';

export function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}
