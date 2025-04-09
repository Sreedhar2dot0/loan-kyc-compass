
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Check, Loader2, MapPin, RefreshCw, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoKycFormProps {
  onComplete: (data: any) => void;
}

const VideoKycForm: React.FC<VideoKycFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'instructions' | 'capture' | 'verification'>('instructions');
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureComplete, setCaptureComplete] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const { toast } = useToast();

  const startVideoCapture = () => {
    setStep('capture');
    setIsCapturing(true);
    
    // Simulate video capture process
    setTimeout(() => {
      setCaptureComplete(true);
      setIsCapturing(false);
      toast({
        title: "Face Capture Complete",
        description: "Your identity verification is being processed",
      });
    }, 3000);
  };

  const confirmLocation = () => {
    setLocationConfirmed(true);
    toast({
      title: "Location Confirmed",
      description: "Your current location has been recorded",
    });
  };

  const completeVerification = () => {
    setStep('verification');
    
    // Simulate verification process
    setTimeout(() => {
      toast({
        title: "Verification Successful",
        description: "Your Video KYC has been completed successfully",
      });
      
      // Mock data that would typically come from the Video KYC process
      const mockKycData = {
        name: "Rajesh Kumar",
        verificationId: "VKYC-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        timestamp: new Date().toISOString(),
        faceMatchScore: "98.5%",
        location: "Bangalore, Karnataka (12.9716° N, 77.5946° E)",
        deviceInfo: "Chrome on Windows",
        ipAddress: "103.xx.xx.xx",
        livenessCheckPassed: true,
        selfieImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAAu0lEQVR42u3RAQ0AAAQAMPro1P4bZeQGNcCM5gBCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCuLdoOb51wCZOAAAAAElFTkSuQmCC",
      };
      
      onComplete(mockKycData);
    }, 2000);
  };

  const renderInstructions = () => (
    <div className="space-y-6">
      <div className="bg-loan-light-blue p-4 rounded-lg space-y-3">
        <div className="flex items-center space-x-3">
          <Video className="h-5 w-5 text-loan-blue" />
          <h3 className="font-medium text-loan-blue">Video KYC Requirements</h3>
        </div>
        <ul className="list-disc pl-8 text-sm text-gray-700 space-y-2">
          <li>Ensure you're in a well-lit room with a clear background</li>
          <li>Keep your ID document (Aadhaar/PAN/Passport) ready for verification</li>
          <li>Your face should be clearly visible during the entire process</li>
          <li>Location services should be enabled on your device</li>
          <li>The process typically takes 2-3 minutes to complete</li>
        </ul>
      </div>
      
      <Button 
        className="w-full" 
        onClick={startVideoCapture}
      >
        <Camera className="h-4 w-4 mr-2" />
        Start Video KYC
      </Button>
    </div>
  );

  const renderVideoCapture = () => (
    <div className="space-y-6">
      <div className="video-kyc-container bg-gray-900 rounded-lg overflow-hidden relative">
        {isCapturing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <p>Capturing face data...</p>
          </div>
        ) : captureComplete ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-60">
            <Check className="h-12 w-12 text-green-400 mb-2" />
            <p className="font-medium text-lg">Face Captured</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="text-lg">Camera preview will appear here</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          disabled={isCapturing}
          onClick={() => setCaptureComplete(false)}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
        
        <Button
          disabled={!captureComplete || locationConfirmed}
          onClick={confirmLocation}
          variant={locationConfirmed ? "outline" : "default"}
        >
          <MapPin className="h-4 w-4 mr-2" />
          {locationConfirmed ? "Location Confirmed" : "Confirm Location"}
        </Button>
      </div>
      
      <Button 
        className="w-full" 
        disabled={!captureComplete || !locationConfirmed || isCapturing}
        onClick={completeVerification}
      >
        <Check className="h-4 w-4 mr-2" />
        Complete Verification
      </Button>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-4">
      <div className="p-6 rounded-lg bg-gray-50 text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-loan-blue" />
        <h3 className="font-medium text-lg mb-2">Processing Your Verification</h3>
        <p className="text-gray-500 text-sm">
          Please wait while we verify your identity. This may take a few moments.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {step === 'instructions' && renderInstructions()}
      {step === 'capture' && renderVideoCapture()}
      {step === 'verification' && renderVerification()}
    </div>
  );
};

export default VideoKycForm;
