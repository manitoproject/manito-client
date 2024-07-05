import { useCallback, useRef, useState } from 'react';

import regex, { RegexType } from '../lib/regexPatterns';

export default function useNameForm(type: RegexType) {
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const isSuccess = regex[type].test(value);
      setIsError(!isSuccess);
      setName(e.target.value);
    },
    [type],
  );

  const handleNameReset = useCallback(() => {
    setName('');
    setIsError(false);
    nameRef.current?.focus();
  }, []);

  return { name, handleNameChange, handleNameReset, nameRef, isError };
}
