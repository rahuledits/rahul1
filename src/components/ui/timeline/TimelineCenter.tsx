
import React from 'react';

interface TimelineCenterProps {
  children?: React.ReactNode;
}

export default function TimelineCenter({
  children
}: TimelineCenterProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      {children}
    </div>
  );
}
