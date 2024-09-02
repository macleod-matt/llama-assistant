import React, { useEffect, useRef } from 'react';

export const ScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (elementRef.current) elementRef.current.scrollIntoView();
  });
  return <div ref={elementRef} />;
};
