
import React, { useState } from 'react';
import { ApplicantsSection, ApplicantType } from '@/components/kyc/ApplicantCard';
import KycMethodSelector, { KycMethod } from '@/components/kyc/KycMethodSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AadhaarKycForm from '@/components/kyc/AadhaarKycForm';
import PanKycForm from '@/components/kyc/PanKycForm';
import VideoKycForm from '@/components/kyc/VideoKycForm';
import OfflineKycForm from '@/components/kyc/OfflineKycForm';
import CkycForm from '@/components/kyc/CkycForm';
import KycResultCard from '@/components/kyc/KycResultCard';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface NewApplicantFormData {
  name: string;
}

const KycVerification: React.FC = () => {
  const [applicants, setApplicants] = useState<ApplicantType[]>([
    {
      id: 'primary',
      name: 'Rajesh Kumar',
      isPrimary: true,
      status: 'not_started',
    }
  ]);
  
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>('primary');
  const [selectedMethod, setSelectedMethod] = useState<KycMethod | ''>('');
  const [addApplicantOpen, setAddApplicantOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<NewApplicantFormData>({
    defaultValues: {
      name: '',
    },
  });
  
  const selectedApplicant = applicants.find(a => a.id === selectedApplicantId);
  
  const handleAddApplicant = () => {
    setAddApplicantOpen(true);
  };
  
  const handleSubmitNewApplicant = (data: NewApplicantFormData) => {
    const newApplicant: ApplicantType = {
      id: `co-applicant-${Date.now()}`,
      name: data.name,
      isPrimary: false,
      status: 'not_started',
    };
    
    setApplicants([...applicants, newApplicant]);
    setSelectedApplicantId(newApplicant.id);
    setAddApplicantOpen(false);
    form.reset();
    
    toast({
      title: "Co-Applicant Added",
      description: `${data.name} has been added as a co-applicant`,
    });
  };
  
  const handleRemoveApplicant = (id: string) => {
    const updatedApplicants = applicants.filter(a => a.id !== id);
    setApplicants(updatedApplicants);
    
    if (selectedApplicantId === id) {
      setSelectedApplicantId(updatedApplicants[0].id);
    }
    
    toast({
      title: "Co-Applicant Removed",
      description: "The co-applicant has been removed",
    });
  };
  
  const handleKycComplete = (data: any) => {
    const updatedApplicants = applicants.map(a => {
      if (a.id === selectedApplicantId) {
        return {
          ...a,
          status: 'verified' as const,
          kycMethod: selectedMethod,
          kycData: data,
        };
      }
      return a;
    });
    
    setApplicants(updatedApplicants);
  };
  
  const resetKycMethod = () => {
    setSelectedMethod('');
  };
  
  const renderKycForm = () => {
    switch (selectedMethod) {
      case 'aadhaar':
        return <AadhaarKycForm onComplete={handleKycComplete} />;
      case 'pan':
        return <PanKycForm onComplete={handleKycComplete} />;
      case 'video':
        return <VideoKycForm onComplete={handleKycComplete} />;
      case 'offline':
        return <OfflineKycForm onComplete={handleKycComplete} />;
      case 'ckyc':
        return <CkycForm onComplete={handleKycComplete} />;
      default:
        return null;
    }
  };
  
  const isVerified = selectedApplicant?.status === 'verified';
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-2">KYC Verification</h1>
      <p className="text-gray-600 mb-8">
        Complete the Know Your Customer (KYC) verification for all loan applicants
      </p>
      
      <div className="space-y-8">
        <ApplicantsSection 
          applicants={applicants}
          selectedApplicantId={selectedApplicantId}
          onSelectApplicant={setSelectedApplicantId}
          onRemoveApplicant={handleRemoveApplicant}
          onAddApplicant={handleAddApplicant}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>
              KYC Details for {selectedApplicant?.isPrimary ? "Primary Applicant" : "Co-Applicant"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isVerified && selectedApplicant.kycData ? (
              <KycResultCard 
                data={selectedApplicant.kycData} 
                methodType={selectedApplicant.kycMethod || ''} 
                onReset={resetKycMethod}
              />
            ) : (
              <div className="space-y-8">
                {!selectedMethod ? (
                  <KycMethodSelector 
                    value={selectedMethod} 
                    onChange={setSelectedMethod} 
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold capitalize">
                        {selectedMethod.replace('_', ' ')} Verification
                      </h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={resetKycMethod}
                      >
                        Choose Different Method
                      </Button>
                    </div>
                    {renderKycForm()}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={addApplicantOpen} onOpenChange={setAddApplicantOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Co-Applicant</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitNewApplicant)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Co-Applicant Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setAddApplicantOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Co-Applicant
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KycVerification;
