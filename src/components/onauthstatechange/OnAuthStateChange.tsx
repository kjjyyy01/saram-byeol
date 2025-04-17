'use client';

import { AuthStateChangeHandler } from '@/store/zustand/store';
import { useEffect } from 'react';

//onAuthStateChange호출 로직
const OnAuthStateChange = () => {
  useEffect(() => {
    const { subscription } = AuthStateChangeHandler();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};

export default OnAuthStateChange;
