import { useEffect, useRef, ElementType } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface Props {
  sectionKey: string;
  fieldKey: string;
  value: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
}

/**
 * Renders text from CMS that becomes contentEditable when the admin
 * turns Edit Mode on. Saves on blur. Use this for visible titles, subtitles,
 * paragraphs and CTAs across the public site.
 */
export function EditableText({ sectionKey, fieldKey, value, as: Tag = 'span', className = '', multiline = false }: Props) {
  const { enabled, canEdit, saveField } = useEditMode();
  const active = enabled && canEdit;
  const ref = useRef<HTMLElement | null>(null);

  // Sync DOM when value updates externally (e.g. after save invalidates cache)
  useEffect(() => {
    if (active && ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value ?? '';
    }
  }, [active, value]);

  if (!active) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as any}
      className={`${className} outline-none rounded-[3px] ring-1 ring-dashed ring-accent/30 hover:ring-accent/70 focus:ring-2 focus:ring-accent focus:bg-accent/5 transition-all cursor-text`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e: any) => {
        const next = (e.currentTarget.textContent ?? '').replace(/\s+$/g, '').replace(/^\s+/g, ' ').trimEnd();
        if (next !== value) {
          saveField(sectionKey, fieldKey, next);
        }
      }}
      onKeyDown={(e: any) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}
