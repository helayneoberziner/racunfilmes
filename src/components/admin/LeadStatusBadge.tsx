import { cn } from '@/lib/utils';
import { LEAD_STATUSES } from '@/hooks/useLeads';

interface LeadStatusBadgeProps {
  status: string;
  className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const statusInfo = LEAD_STATUSES.find(s => s.value === status) || {
    label: status,
    color: 'bg-muted',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white",
        statusInfo.color,
        className
      )}
    >
      {statusInfo.label}
    </span>
  );
}
