// src/components/molecules/SocialLogin.tsx
import React from "react";
import {
  NIconButtonLogin,
  NGoogleIcon,
  NFacebookIcon,
  NGithubIcon,
  NTwitterIcon,
} from "../../atoms";
import { cn } from "../../../utils";
interface SocialLoginProps {
  className?: string;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  onGithubLogin: () => void;
  onTwitterLogin: () => void;
}

const NSocialLogin: React.FC<SocialLoginProps> = ({
  className,
  onGoogleLogin,
  onFacebookLogin,
  onGithubLogin,
  onTwitterLogin,
}) => {
  const style = "social-link flex space-x-4 self-start";
  return (
    <div className={cn(style, className)}>
      <NIconButtonLogin onClick={onGoogleLogin} icon={<NGoogleIcon />} />
      <NIconButtonLogin onClick={onFacebookLogin} icon={<NFacebookIcon />} />
      <NIconButtonLogin onClick={onGithubLogin} icon={<NGithubIcon />} />
      <NIconButtonLogin onClick={onTwitterLogin} icon={<NTwitterIcon />} />
    </div>
  );
};

export default NSocialLogin;
