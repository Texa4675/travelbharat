'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Camera, RefreshCw, Scan } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ScanPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const capturePhoto = () => {
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
    toast({
      title: "Photo Captured",
      description: "AI monument identification is not available in this version.",
    });
  };

  const reset = () => {
    setCapturedImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">Monument Scanner</h1>
            <p className="text-muted-foreground">Point your camera at a monument to capture it.</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Card className="overflow-hidden border-2 border-primary/20 w-full max-w-xl">
              <div className="relative aspect-video bg-black">
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
              </div>
              <CardContent className="p-4 flex justify-center gap-4">
                {!capturedImage ? (
                  <Button
                    onClick={capturePhoto}
                    disabled={!hasCameraPermission}
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-xl"
                  >
                    <Scan className="h-6 w-6 mr-2" /> Capture Photo
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

            {!capturedImage && (
              <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl opacity-50 w-full max-w-xl">
                <Camera className="h-16 w-16 mb-4 text-muted-foreground" />
                <p className="text-lg">Captured results will appear here</p>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}