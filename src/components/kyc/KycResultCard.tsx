
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, User, MapPin, Clock } from 'lucide-react';

interface KycResultCardProps {
  data: Record<string, any>;
  methodType: string;
  onReset: () => void;
}

const KycResultCard: React.FC<KycResultCardProps> = ({ data, methodType, onReset }) => {
  return (
    <Card className="border-green-100 shadow-card">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-1.5 rounded-full">
              <CheckCircle2 size={18} className="text-green-600" />
            </div>
            <CardTitle className="text-base font-medium text-green-800">
              KYC Verification Successful
            </CardTitle>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <Download size={14} className="mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {data.photo && (
              <div className="w-24 h-24 bg-gray-100 rounded-md border overflow-hidden flex-shrink-0">
                <img 
                  src={data.photo} 
                  alt="Applicant" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/100?text=Photo";
                  }}
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Name</div>
                  <div className="font-medium">{data.name || 'Not Available'}</div>
                </div>
                
                {data.dob && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Date of Birth</div>
                    <div className="font-medium">{data.dob}</div>
                  </div>
                )}
                
                {data.gender && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Gender</div>
                    <div className="font-medium">{data.gender}</div>
                  </div>
                )}
                
                {(data.aadhaarNumber || data.panNumber || data.documentId) && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {methodType === 'aadhaar' 
                        ? 'Aadhaar Number' 
                        : methodType === 'pan' 
                          ? 'PAN Number'
                          : 'Document ID'}
                    </div>
                    <div className="font-medium">
                      {data.aadhaarNumber || data.panNumber || data.documentId || 'Not Available'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {data.address && (
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPin size={14} className="mr-1" />
                Address
              </div>
              <div className="font-medium">{data.address}</div>
            </div>
          )}
          
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1 flex items-center">
                <Clock size={12} className="mr-1" />
                Verification Time
              </div>
              <div className="text-sm">
                {new Date(data.timestamp).toLocaleString()}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">Verification ID</div>
              <div className="text-sm font-mono">{data.verificationId}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">Verification Method</div>
              <div className="text-sm capitalize">{methodType.replace('_', ' ')} KYC</div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={onReset}
          >
            Choose Different Verification Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycResultCard;
