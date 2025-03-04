import React, { forwardRef } from 'react';

const Thuiswerken = forwardRef(({ ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      role="img"
      focusable="false"
      width={32}
      height={32}
      fill="currentColor"
      viewBox="0 0 32 32"
      {...rest}
    >
      <path
        d="M18.173 11.772l-5.772-1.38 3.137 4.768.502-1.38 1.882 1.129.753-1.13-1.882-1.129 1.38-.878z"
        fill="#000"
      />
      <path
        d="M28.086 21.936l-2.635-4.016-.502-10.54c0-.753-.627-1.38-1.38-1.38H7.257c-.879 0-1.506.627-1.506 1.38l-.502 10.666-2.635 4.015a.959.959 0 00-.251.628v2.007c0 .502.376 1.004 1.004 1.004h23.966c.502 0 1.004-.376 1.004-1.004v-2.008c0-.25-.126-.501-.251-.752zm-16.061.376l1.004-1.882h4.768l.878 1.882h-6.65zm12.798-4.266H5.752s0-.126.125-.126c.628-.125 1.255-.376 1.255-.376l.377-9.536H22.94l.377 9.536s.502.125 1.255.376c.25-.125.25 0 .25.126z"
        fill="currentColor"
      />
    </svg>
  );
});

Thuiswerken.displayName = 'Thuiswerken';

export default Thuiswerken;
