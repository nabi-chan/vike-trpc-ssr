import type { PageContext } from '#/types/types';
import { createContext } from 'react';

export const Context = createContext<PageContext>(undefined as unknown as PageContext);
