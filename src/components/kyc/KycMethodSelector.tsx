
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Fingerprint, CreditCard, Video, Upload, Database } from 'lucide-react';

export type KycMethod = 'aadhaar' | 'pan' | 'video' | 'offline' | 'ckyc';

interface KycMethodOption {
  id: KycMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const kycMethods: KycMethodOption[] = [
  {
    id: 'aadhaar',
    label: 'Aadhaar eKYC',
    description: 'Verify using Aadhaar OTP or XML',
    icon: <Fingerprint className="h-5 w-5 text-loan-blue" />,
  },
  {
    id: 'pan',
    label: 'PAN Verification',
    description: 'Verify using PAN card details',
    icon: <CreditCard className="h-5 w-5 text-loan-blue" />,
  },
  {
    id: 'video',
    label: 'Video KYC',
    description: 'Complete verification via video call',
    icon: <Video className="h-5 w-5 text-loan-blue" />,
  },
  {
    id: 'offline',
    label: 'Offline Upload',
    description: 'Upload scanned ID documents',
    icon: <Upload className="h-5 w-5 text-loan-blue" />,
  },
  {
    id: 'ckyc',
    label: 'CKYC Fetch',
    description: 'Fetch existing KYC from central registry',
    icon: <Database className="h-5 w-5 text-loan-blue" />,
  },
];

interface KycMethodSelectorProps {
  value: KycMethod | '';
  onChange: (value: KycMethod) => void;
}

const KycMethodSelector: React.FC<KycMethodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select KYC Method</h3>
      <RadioGroup value={value} onValueChange={(val) => onChange(val as KycMethod)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kycMethods.map((method) => (
            <div key={method.id} className="relative">
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={method.id}
                className="flex items-start p-4 rounded-md border border-gray-200 bg-white cursor-pointer
                           hover:border-loan-blue hover:bg-loan-light-blue/20 transition-colors
                           peer-checked:border-loan-blue peer-checked:bg-loan-light-blue/30
                           peer-focus:ring-2 peer-focus:ring-loan-blue/30"
              >
                <div className="mr-3 mt-0.5">{method.icon}</div>
                <div>
                  <div className="font-medium">{method.label}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default KycMethodSelector;
