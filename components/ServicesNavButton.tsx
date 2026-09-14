'use client';

import { useOpenAssessmentModal } from './AssessmentModalProvider';

// A navigation item that opens the services popup instead of linking. It
// carries the same data-cta as the About the assessment button, since both
// open the same popup.
export default function ServicesNavButton({
  label,
  className,
  onOpen,
}: {
  label: string;
  className: string;
  onOpen?: () => void;
}) {
  const openModal = useOpenAssessmentModal();

  return (
    <button
      type="button"
      className={className}
      data-cta="assessment-detail"
      aria-haspopup="dialog"
      onClick={() => {
        onOpen?.();
        openModal();
      }}
    >
      {label}
    </button>
  );
}
