import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type DisclosureUpdater = SetStateAction<boolean>;

export type ComponentExampleRuntimeContextValue = {
  examples: Readonly<Record<string, boolean>>;
  register: (id: string) => void;
  unregister: (id: string) => void;
  setExampleOpen: (id: string, update: DisclosureUpdater) => void;
  setAllOpen: (open: boolean) => void;
  allOpen: boolean;
  count: number;
};

export const ComponentExampleRuntimeContext =
  createContext<ComponentExampleRuntimeContextValue | null>(null);

export function useComponentExampleDisclosure(
  id: string,
): readonly [boolean, Dispatch<SetStateAction<boolean>>] {
  const runtime = useContext(ComponentExampleRuntimeContext);
  const [localOpen, setLocalOpen] = useState(false);
  const register = runtime?.register;
  const unregister = runtime?.unregister;
  const setExampleOpen = runtime?.setExampleOpen;

  useEffect(() => {
    if (!register || !unregister) return undefined;
    register(id);
    return () => unregister(id);
  }, [id, register, unregister]);

  const setOpen = useCallback<Dispatch<SetStateAction<boolean>>>(
    (update) => {
      if (setExampleOpen) setExampleOpen(id, update);
      else setLocalOpen(update);
    },
    [id, setExampleOpen],
  );

  return [runtime ? (runtime.examples[id] ?? false) : localOpen, setOpen] as const;
}
