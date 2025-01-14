"use-client";
import {
  NLoginContainer,
  NLoginContent,
  NLoginMainContent,
  NLoginWrapper,
  NLogoContentBg,
} from "@/components/atoms";
import { NSignInForm } from "@/components/organisms";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const NLoginPage: React.FC = () => {
  // const navigate = useNavigate();

  // const { isLoggedIn } = useAuthContext();
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/dashboard"); // Hoặc trang chính của bạn
  //   }
  // }, [isLoggedIn, navigate]);
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
