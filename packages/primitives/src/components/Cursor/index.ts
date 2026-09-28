import { useCursorPointer } from './context';
import { CursorFollower, CursorProvider } from './Cursor';

export const Cursor = {
  Provider: CursorProvider,
  Follower: CursorFollower,
  usePointer: useCursorPointer,
};
export type {
  CursorFollowerProps,
  CursorFollowOptions,
  CursorPointer,
  CursorProviderProps,
  CursorSnapshot,
} from './Cursor.types';
