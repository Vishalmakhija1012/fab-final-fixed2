import React from 'react';

const iconMap = {
  confidence: '/confidence.svg',
  communication: '/communication.svg',
  leadership: '/leadership.svg',
  'clear-exams': '/clear-exams.svg',
  'clear-interviews': '/clear-interviews.svg',
  'speak-better': '/speak-better.svg',
  networking: '/networking.svg',
  'self-expression': '/self-expression.svg',
  all: '/all.svg',
};

export default function CrashCourseIcon({ goal, size = 28, className = '' }) {
  const src = iconMap[goal];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={goal}
      width={size}
      height={size}
      className={`inline-block align-middle ${className}`}
      style={{ objectFit: 'contain', width: size, height: size }}
      draggable={false}
    />
  );
}
