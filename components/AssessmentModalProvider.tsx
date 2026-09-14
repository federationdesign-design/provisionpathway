'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import AssessmentModal from './AssessmentModal';

// The lightbox is rendered once, from the root layout, so every page shares
// the same instance. Triggers anywhere below the provider open it through
// useOpenAssessmentModal rather than owning their own copy.
const OpenContext = createContext<(() => void) | null>(null);

export function useOpenAssessmentModal() {
  const open = useContext(OpenContext);
  if (!open) {
    throw new Error('useOpenAssessmentModal must be used inside AssessmentModalProvider');
  }
  return open;
}

export default function AssessmentModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <OpenContext.Provider value={open}>
      {children}
      <AssessmentModal open={isOpen} onClose={close} />
    </OpenContext.Provider>
  );
}
