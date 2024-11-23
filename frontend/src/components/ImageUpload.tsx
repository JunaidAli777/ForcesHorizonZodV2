import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const processFile = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        onImageUpload(file);
      };
    }
  };

  return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '24px'
              }}>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#B0BEC5',
                cursor: 'pointer',
                overflow: 'hidden',
                marginBottom: '18px'
              }}
              onClick={handleContainerClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
            
                  <CameraAltOutlinedIcon style={{ fontSize: 18, 
                                                  color: 'white',
                                                }} />
              )}
            </div>
            {
              imageSrc ? (
                <div style={{
                  marginTop: '-24px'
                }}
                onClick={handleContainerClick}
                >
                  <Form.Label className="d-flex justify-content-center align-items-center"
                              style={{ 
                                backgroundColor: '#ECEFF1',
                                borderRadius: '85.29px',
                                color: '#455A64',
                                boxShadow: '0px 1px 3px 0px #1018281A',
                                fontSize: '0.7875rem',
                                fontFamily: 'Manrope, sans-serif',
                                width: '122px',
                                height: '34.65px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center'
                                    }}
                  >Change Profile</Form.Label>
                </div>
              ) : (
                <div>
                  <Form.Label className="text-center mt-3 mb-2"
                              style={{
                                fontSize: '0.75rem',
                                fontFamily: 'sans-serif',
                                color: '#546E7A'
                              }}>Upload Profile Photo</Form.Label>
                </div>
              )
            }
              
            </div>
  );
};

export default ImageUpload;