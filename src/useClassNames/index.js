import { useMemo } from 'react';

const useClassNames = (states = {}, separator = ' ') =>
  useMemo(
    () =>
      Object.keys(states)
        .filter((key) => states[key])
        .join(separator)
        .trim(),
    [states, separator]
  );

export default useClassNames;
