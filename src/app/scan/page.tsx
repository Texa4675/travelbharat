'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Camera, RefreshCw, Scan, History, Lightbulb, MapPin, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { identifyMonument, type IdentifyMonumentOutput } from '@/ai/flows/identify-monument-flow';

export default function ScanPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<IdentifyMonumentOutput | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const captureAndIdentify = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    
    setIsAnalyzing(true);
    setResult(null);

    try {
      const aiResult = await identifyMonument({ photoDataUri: imageData });
      setResult(aiResult);
      if (!aiResult.isIndianMonument) {
        toast({
          title: "Unknown Location",
          description: "We couldn't identify a known Indian monument in this photo.",
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Identification Failed',
        description: 'Something went wrong while analyzing the image.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">AI Vision Scanner</h1>
          <p className="text-muted-foreground">Point your camera at a monument to uncover its history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Camera/Capture Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="relative aspect-video bg-black">
                {/* Always show video tag irrespective of permission to prevent race condition */}
                <video 
                  ref={videoRef} 
                  className={`w-full h-full object-cover ${capturedImage ? 'hidden' : 'block'}`} 
                  autoPlay 
                  muted 
                  playsInline
                />
                
                {capturedImage && (
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                )}

                {!hasCameraPermission && hasCameraPermission !== null && !capturedImage && (
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <Alert variant="destructive">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access to use this feature.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                    <p className="font-bold animate-pulse">Analyzing Landmark...</p>
                  </div>
                )}
              </div>
              <CardContent className="p-4 flex justify-center gap-4">
                {!capturedImage ? (
                  <Button 
                    onClick={captureAndIdentify} 
                    disabled={!hasCameraPermission || isAnalyzing}
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-xl"
                  >
                    <Scan className="h-6 w-6 mr-2" /> Capture & Scan
                  </Button>
                ) : (
                  <Button 
                    onClick={reset} 
                    variant="outline" 
                    className="w-full py-6 text-lg rounded-xl"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" /> Retake Photo
                  </Button>
                )}
              </CardContent>
            </Card>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {!result && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl opacity-50">
                <Camera className="h-16 w-16 mb-4 text-muted-foreground" />
                <p className="text-lg">Captured results will appear here</p>
              </div>
            )}

            {result && result.isIndianMonument && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <Card className="border-primary/30">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge className="bg-primary text-primary-foreground mb-2">Monument Identified</Badge>
                      <span className="text-xs text-muted-foreground">AI Confidence: {(result.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <CardTitle className="text-3xl font-headline">{result.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {result.location?.city}, {result.location?.state}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                         Overview
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{result.description}</p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-xl border">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <History className="h-4 w-4 text-primary" /> Historical Significance
                      </h4>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        {result.history}
                      </p>
                    </div>

                    {result.funFacts && result.funFacts.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-bold flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" /> Did You Know?
                        </h4>
                        {result.funFacts.map((fact, idx) => (
                          <div key={idx} className="flex gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10 text-sm">
                            <span className="text-primary font-bold">#{idx + 1}</span>
                            <p>{fact}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {result && !result.isIndianMonument && (
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="p-8 text-center">
                  <X className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Identification Unsuccessful</h3>
                  <p className="text-muted-foreground">
                    We couldn't clearly identify an Indian monument in this image. Try getting a clearer shot with better lighting.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
