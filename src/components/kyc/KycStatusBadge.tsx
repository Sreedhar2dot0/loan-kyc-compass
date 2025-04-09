
import React from 'react';
import { CheckCircle2, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type KycStatus = 'not_started' | 'in_progress' | 'verified' | 'rejected';

interface KycStatusBadgeProps {
  status: KycStatus;
  className?: string;
}

const KycStatusBadge: React.FC<KycStatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: <CheckCircle2 size={14} className="mr-1" />,
          label: 'Verified'
        };
      case 'in_progress':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: <Clock size={14} className="mr-1" />,
          label: 'In Progress'
        };
      case 'rejected':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: <X size={14} className="mr-1" />,
          label: 'Rejected'
        };
      case 'not_started':
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: <Clock size={14} className="mr-1" />,
          label: 'Not Started'
        };
    }
  };

  const { bgColor, textColor, icon, label } = getStatusConfig();

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
      bgColor,
      textColor,
      className
    )}>
      {icon}
      {label}
    </span>
  );
};

export default KycStatusBadge;
