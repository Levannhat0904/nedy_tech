"use-client";
import {
  NLoginContainer,
  NLoginContent,
  NLoginMainContent,
  NLoginWrapper,
  NLogoContentBg,
} from "@/components/atoms";
import { NSignInForm } from "@/components/organisms";

const NLoginPage: React.FC = () => {
  return (
    <NLoginWrapper>
      <NLoginContainer>
        <NLoginMainContent>
          <NLoginContent className="w-[40%]">
            <NLogoContentBg />
          </NLoginContent>
          <NLoginContent className="w-[60%]">
            <NSignInForm />
          </NLoginContent>
        </NLoginMainContent>
      </NLoginContainer>
    </NLoginWrapper>
  );
};

export default NLoginPage;
