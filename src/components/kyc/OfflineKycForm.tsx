
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Check, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type DocumentType = 'aadhaar' | 'pan' | 'passport' | 'voter' | 'driving';

interface DocumentOption {
  id: DocumentType;
  label: string;
}

const documentTypes: DocumentOption[] = [
  { id: 'aadhaar', label: 'Aadhaar Card' },
  { id: 'pan', label: 'PAN Card' },
  { id: 'passport', label: 'Passport' },
  { id: 'voter', label: 'Voter ID' },
  { id: 'driving', label: 'Driving License' },
];

interface OfflineKycFormProps {
  onComplete: (data: any) => void;
}

const OfflineKycForm: React.FC<OfflineKycFormProps> = ({ onComplete }) => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | ''>('');
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDocumentChange = (value: string) => {
    setSelectedDocument(value as DocumentType);
    setFrontUploaded(false);
    setBackUploaded(false);
  };

  const simulateUpload = (type: 'front' | 'back' | 'selfie') => {
    toast({
      title: "Uploading Document",
      description: "Please wait while we upload your document",
    });
    
    // Simulate upload delay
    setTimeout(() => {
      toast({
        title: "Upload Complete",
        description: "Document has been uploaded successfully",
      });
      
      if (type === 'front') setFrontUploaded(true);
      if (type === 'back') setBackUploaded(true);
      if (type === 'selfie') setSelfieUploaded(true);
    }, 1500);
  };

  const submitDocuments = () => {
    if (!selectedDocument || !frontUploaded || !selfieUploaded || (selectedDocument !== 'pan' && !backUploaded)) {
      toast({
        title: "Missing Documents",
        description: "Please upload all required documents",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    toast({
      title: "Processing Documents",
      description: "Your documents are being verified",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      toast({
        title: "Verification Complete",
        description: "Your documents have been successfully verified",
      });
      
      // Mock data that would typically come from document verification
      const mockKycData = {
        name: "Rajesh Kumar",
        dob: "15/05/1985",
        documentType: selectedDocument,
        documentId: selectedDocument === 'aadhaar' 
          ? 'XXXX XXXX 4567' 
          : selectedDocument === 'pan' 
            ? 'ABCDE1234F' 
            : 'A12345678',
        verificationId: "DOC-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        timestamp: new Date().toISOString(),
        ocrConfidence: "86%",
      };
      
      setIsProcessing(false);
      onComplete(mockKycData);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-loan-light-blue p-4 rounded-lg flex items-center space-x-3">
        <FileText className="h-5 w-5 text-loan-blue" />
        <p className="text-sm text-loan-blue">
          Upload clear, color scanned copies of your documents. All pages must be visible and text should be readable.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Select Document Type</h3>
        <RadioGroup value={selectedDocument} onValueChange={handleDocumentChange}>
          <div className="grid grid-cols-2 gap-4">
            {documentTypes.map((doc) => (
              <div key={doc.id} className="relative">
                <RadioGroupItem
                  value={doc.id}
                  id={doc.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={doc.id}
                  className="flex items-center p-3 rounded-md border border-gray-200 bg-white cursor-pointer
                            hover:border-loan-blue hover:bg-loan-light-blue/20 transition-colors
                            peer-checked:border-loan-blue peer-checked:bg-loan-light-blue/30
                            peer-focus:ring-2 peer-focus:ring-loan-blue/30"
                >
                  <div className="font-medium text-sm">{doc.label}</div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      
      {selectedDocument && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <div className="mb-3 text-sm font-medium">Front Side</div>
              {frontUploaded ? (
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 mb-2">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-green-600">Uploaded</p>
                  <Button 
                    variant="link" 
                    className="text-xs" 
                    onClick={() => setFrontUploaded(false)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => simulateUpload('front')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              )}
            </div>
            
            {selectedDocument !== 'pan' && (
              <div className="border rounded-lg p-4 text-center">
                <div className="mb-3 text-sm font-medium">Back Side</div>
                {backUploaded ? (
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mb-2">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-green-600">Uploaded</p>
                    <Button 
                      variant="link" 
                      className="text-xs" 
                      onClick={() => setBackUploaded(false)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={() => simulateUpload('back')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="mb-3 text-sm font-medium">Selfie with Document</div>
            {selfieUploaded ? (
              <div className="flex flex-col items-center">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mb-2">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-sm text-green-600">Uploaded</p>
                <Button 
                  variant="link" 
                  className="text-xs" 
                  onClick={() => setSelfieUploaded(false)}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => simulateUpload('selfie')}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            )}
          </div>
          
          <Button 
            className="w-full"
            onClick={submitDocuments}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            {isProcessing ? "Processing Documents..." : "Submit Documents"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OfflineKycForm;
