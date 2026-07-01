import { useEditMode } from '@/contexts/EditModeContext';
import { Pencil, Check, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/** Floating toolbar visible only to admins on the public site. */
export function EditModeToolbar() {
  const { enabled, setEnabled, canEdit } = useEditMode();
  if (!canEdit) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] flex items-center gap-2">
      <button
        onClick={() => setEnabled(!enabled)}
        className={`group inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] font-medium transition-all shadow-lg ${
          enabled
            ? 'bg-accent text-paper hover:bg-accent/90'
            : 'bg-ink text-paper hover:bg-ink/90'
        }`}
        title={enabled ? 'Sair do modo de edição' : 'Entrar no modo de edição'}
      >
        {enabled ? <Check className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
        <span className="hidden xs:inline">{enabled ? 'Editando' : 'Editar'}</span>
      </button>
      <Link
        to="/admin/content"
        className="inline-flex items-center gap-2 px-3 py-2 sm:py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] font-medium bg-paper text-ink border border-ink/15 hover:bg-paper/80 transition-all shadow-lg"
        title="Abrir editor completo"
      >
        <Settings2 className="h-3.5 w-3.5" />
        <span className="hidden xs:inline">Painel</span>
      </Link>
    </div>
  );
}
