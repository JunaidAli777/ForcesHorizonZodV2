import React, { useCallback, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ siteKey, onVerify }) => {
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const handleVerify = useCallback((token: string | null) => {
    onVerify(token);
  }, [onVerify]);

  return (
    <div className="flex items-center justify-center">
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleVerify}
        ref={captchaRef}
      />
    </div>
  );
};

export default Captcha;