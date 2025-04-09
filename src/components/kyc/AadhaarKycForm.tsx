
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Fingerprint, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const aadhaarValidationSchema = z.object({
  aadhaarNumber: z
    .string()
    .min(12, 'Aadhaar number must be 12 digits')
    .max(12, 'Aadhaar number must be 12 digits')
    .regex(/^[0-9]+$/, 'Aadhaar number must contain only digits'),
  otp: z.string().optional(),
});

type AadhaarFormValues = z.infer<typeof aadhaarValidationSchema>;

interface AadhaarKycFormProps {
  onComplete: (data: any) => void;
}

const AadhaarKycForm: React.FC<AadhaarKycFormProps> = ({ onComplete }) => {
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<AadhaarFormValues>({
    resolver: zodResolver(aadhaarValidationSchema),
    defaultValues: {
      aadhaarNumber: '',
      otp: '',
    },
  });

  const sendOTP = () => {
    const isValid = form.trigger('aadhaarNumber');
    
    if (isValid) {
      toast({
        title: "OTP Sent",
        description: "Please enter the OTP sent to your registered mobile number",
      });
      setOtpSent(true);
    }
  };

  const onSubmit = (data: AadhaarFormValues) => {
    toast({
      title: "Verification Successful",
      description: "Your Aadhaar verification has been completed successfully",
    });
    
    // Mock data that would typically come from the Aadhaar API
    const mockKycData = {
      name: "Rajesh Kumar",
      dob: "15/05/1985",
      gender: "Male",
      address: "123 MG Road, Bangalore, Karnataka - 560001",
      photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAAu0lEQVR42u3RAQ0AAAQAMPro1P4bZeQGNcCM5gBCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCuLdoOb51wCZOAAAAAElFTkSuQmCC",
      phone: "99XXXXXX45",
      verificationId: "UIDAI-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      timestamp: new Date().toISOString(),
    };
    
    onComplete(mockKycData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-loan-light-blue p-4 rounded-lg flex items-center space-x-3">
        <Fingerprint className="h-5 w-5 text-loan-blue" />
        <p className="text-sm text-loan-blue">
          Aadhaar eKYC verification will require OTP authentication on your registered mobile number.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="aadhaarNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhaar Number</FormLabel>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="XXXX XXXX XXXX"
                      {...field}
                      maxLength={12}
                      className={otpSent ? "bg-gray-100" : ""}
                      readOnly={otpSent}
                    />
                    {!otpSent && (
                      <Button type="button" onClick={sendOTP}>
                        Send OTP
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {otpSent && (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-3">
                      <KeyRound className="h-5 w-5 text-gray-400" />
                      <Input placeholder="Enter 6-digit OTP" {...field} maxLength={6} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {otpSent && (
            <Button type="submit" className="w-full">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Verify Aadhaar
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AadhaarKycForm;
