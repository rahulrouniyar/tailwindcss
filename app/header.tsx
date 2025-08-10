// components/Header.tsx
import React from 'react';

type HeaderProps = {
  label: string;
};

export function Header({ label }: HeaderProps) {
  return (
    <header className="text-2xl font-bold text-gray-800 p-4">
      {label}
    </header>
  );
}
