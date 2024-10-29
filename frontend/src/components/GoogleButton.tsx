import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleButton = () => {
  const handleClick = () => {
    console.log("Google button clicked");
  };

  return (
    <div style={{
            marginTop:'2rem'
          }}>
        <GoogleOAuthProvider clientId={''}>
            
                <GoogleLogin
                    onSuccess={handleClick}
                    onError={handleClick}
                    text="continue_with"
                    shape="pill"
                    size="large"
                    width={360}
                    theme="outline"
                />
            
        </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleButton;
