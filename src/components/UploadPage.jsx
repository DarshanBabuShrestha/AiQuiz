import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); //  Initialize navigate function

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage("Uploading...");
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      console.log(" Uploading file to FastAPI..."); // Debug log
  
      const response = await fetch("http://127.0.0.1:8080/upload", {
        method: "POST",
        body: formData,
      });
  
      console.log("📩 Raw Response Object:", response); // Debug log
  
      const data = await response.json();
      console.log("📩 Parsed Response (Received from FastAPI):", data); // Debug log
  
      if (data && data.audio_url) {
        setMessage("Upload successful!");
        setTimeout(() => navigate("/audio"), 1000);
      } else {
        throw new Error("Invalid response: No `audio_url` found");
      }
    } catch (error) {
      console.error("Error Upload failed:", error);
      setMessage(`Upload failed: ${error.message}`);
    }
    setUploading(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-96 p-4">
        <CardContent className="flex flex-col items-center gap-4">
          <Input type="file" accept=".pdf,.pptx" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
          {message && <p>{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
