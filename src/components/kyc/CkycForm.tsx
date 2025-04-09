
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Database, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ckycValidationSchema = z.object({
  ckycNumber: z
    .string()
    .min(14, 'CKYC number must be 14 characters')
    .max(14, 'CKYC number must be 14 characters'),
  panNumber: z
    .string()
    .min(10, 'PAN number must be 10 characters')
    .max(10, 'PAN number must be 10 characters')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format'),
});

type CkycFormValues = z.infer<typeof ckycValidationSchema>;

interface CkycFormProps {
  onComplete: (data: any) => void;
}

const CkycForm: React.FC<CkycFormProps> = ({ onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<CkycFormValues>({
    resolver: zodResolver(ckycValidationSchema),
    defaultValues: {
      ckycNumber: '',
      panNumber: '',
    },
  });

  const onSubmit = (data: CkycFormValues) => {
    setIsProcessing(true);
    toast({
      title: "Fetching CKYC Data",
      description: "Please wait while we fetch your details from Central KYC Registry",
    });
    
    // Simulate API verification delay
    setTimeout(() => {
      toast({
        title: "CKYC Data Retrieved",
        description: "Your KYC details have been successfully fetched",
      });
      
      // Mock data that would typically come from the CKYC API
      const mockKycData = {
        name: "Rajesh Kumar",
        dob: "15/05/1985",
        gender: "Male",
        ckycNumber: data.ckycNumber,
        panNumber: data.panNumber,
        address: "123 MG Road, Bangalore, Karnataka - 560001",
        photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAAu0lEQVR42u3RAQ0AAAQAMPro1P4bZeQGNcCM5gBCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCuLdoOb51wCZOAAAAAElFTkSuQmCC",
        phone: "99XXXXXX45",
        verificationId: "CKYC-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        timestamp: new Date().toISOString(),
        kycLevelStatus: "Full KYC",
        lastUpdated: "12/03/2023",
      };
      
      setIsProcessing(false);
      onComplete(mockKycData);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-loan-light-blue p-4 rounded-lg flex items-center space-x-3">
        <Database className="h-5 w-5 text-loan-blue" />
        <p className="text-sm text-loan-blue">
          CKYC fetch will retrieve your existing KYC data from the Central KYC Registry maintained by CERSAI.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="ckycNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CKYC Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="14-digit CKYC Number" 
                    {...field} 
                    maxLength={14}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="panNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number (for verification)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ABCDE1234F" 
                    {...field} 
                    maxLength={10}
                    className="uppercase"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-6"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            )}
            {isProcessing ? "Fetching CKYC Data..." : "Fetch CKYC Data"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CkycForm;
