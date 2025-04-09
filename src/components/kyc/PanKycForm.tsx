
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Calendar, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const panValidationSchema = z.object({
  panNumber: z
    .string()
    .min(10, 'PAN number must be 10 characters')
    .max(10, 'PAN number must be 10 characters')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format'),
  dob: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date format should be DD/MM/YYYY'),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters'),
});

type PanFormValues = z.infer<typeof panValidationSchema>;

interface PanKycFormProps {
  onComplete: (data: any) => void;
}

const PanKycForm: React.FC<PanKycFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  
  const form = useForm<PanFormValues>({
    resolver: zodResolver(panValidationSchema),
    defaultValues: {
      panNumber: '',
      dob: '',
      name: '',
    },
  });

  const onSubmit = (data: PanFormValues) => {
    toast({
      title: "Verification in Progress",
      description: "Your PAN details are being verified...",
    });
    
    // Simulate API verification delay
    setTimeout(() => {
      toast({
        title: "Verification Successful",
        description: "Your PAN verification has been completed successfully",
      });
      
      // Mock data that would typically come from the PAN API
      const mockKycData = {
        name: data.name,
        dob: data.dob,
        panNumber: data.panNumber,
        fatherName: "Suresh Kumar",
        verificationId: "NSDL-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        timestamp: new Date().toISOString(),
        status: "Active",
      };
      
      onComplete(mockKycData);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-loan-light-blue p-4 rounded-lg flex items-center space-x-3">
        <CreditCard className="h-5 w-5 text-loan-blue" />
        <p className="text-sm text-loan-blue">
          PAN verification requires accurate details. Make sure the name matches exactly as on your PAN card.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="panNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number</FormLabel>
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
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name (as on PAN)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <Input 
                      placeholder="DD/MM/YYYY" 
                      {...field} 
                      maxLength={10}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full mt-6">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Verify PAN
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PanKycForm;
