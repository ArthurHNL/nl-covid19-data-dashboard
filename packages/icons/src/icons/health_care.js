import React, { forwardRef } from 'react';

const HealthCare = forwardRef(({ ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      role="img"
      focusable="false"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="currentColor"
      {...rest}
    >
      <path d="M10.6808 22.1612H14.871V26.3514C14.871 26.9276 15.3424 27.399 15.9186 27.399H20.1088C20.6849 27.399 21.1563 26.9276 21.1563 26.3514V22.1612H25.3465C25.9227 22.1612 26.3941 21.6898 26.3941 21.1137V16.9235C26.3941 16.3473 25.9227 15.8759 25.3465 15.8759H21.1563V11.6857C21.1563 11.1096 20.6849 10.6382 20.1088 10.6382H15.9186C15.3424 10.6382 14.871 11.1096 14.871 11.6857V15.8759H10.6808C10.1047 15.8759 9.6333 16.3473 9.6333 16.9235V21.1137C9.6333 21.6898 10.1047 22.1612 10.6808 22.1612Z" />
    </svg>
  );
});

HealthCare.displayName = 'HealthCare';

export default HealthCare;
