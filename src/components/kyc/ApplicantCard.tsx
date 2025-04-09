
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserPlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KycStatusBadge, { KycStatus } from './KycStatusBadge';

interface ApplicantCardProps {
  name: string;
  isPrimary: boolean;
  status: KycStatus;
  isSelected: boolean;
  index: number;
  onSelect: () => void;
  onRemove?: () => void;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  name,
  isPrimary,
  status,
  isSelected,
  index,
  onSelect,
  onRemove
}) => {
  return (
    <Card 
      className={`relative cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-loan-blue shadow-md' 
          : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${isPrimary ? 'bg-loan-light-blue' : 'bg-gray-100'}`}>
              <User size={16} className={isPrimary ? 'text-loan-blue' : 'text-gray-500'} />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">
                {isPrimary ? 'Primary Applicant' : `Co-Applicant ${index}`}
              </CardTitle>
              <CardDescription className="text-xs">{name}</CardDescription>
            </div>
          </div>
          <KycStatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        {!isPrimary && onRemove && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export interface ApplicantType {
  id: string;
  name: string;
  isPrimary: boolean;
  status: KycStatus;
  kycMethod?: string;
  kycData?: Record<string, any>;
}

interface ApplicantsSectionProps {
  applicants: ApplicantType[];
  selectedApplicantId: string;
  onSelectApplicant: (id: string) => void;
  onRemoveApplicant: (id: string) => void;
  onAddApplicant: () => void;
}

export const ApplicantsSection: React.FC<ApplicantsSectionProps> = ({
  applicants,
  selectedApplicantId,
  onSelectApplicant,
  onRemoveApplicant,
  onAddApplicant
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Applicants</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-loan-blue border-loan-blue hover:bg-loan-light-blue"
          onClick={onAddApplicant}
        >
          <UserPlus size={16} className="mr-1" />
          Add Co-Applicant
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applicants.map((applicant, index) => (
          <ApplicantCard
            key={applicant.id}
            name={applicant.name}
            isPrimary={applicant.isPrimary}
            status={applicant.status}
            isSelected={selectedApplicantId === applicant.id}
            index={applicant.isPrimary ? 0 : index}
            onSelect={() => onSelectApplicant(applicant.id)}
            onRemove={!applicant.isPrimary ? () => onRemoveApplicant(applicant.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
};
