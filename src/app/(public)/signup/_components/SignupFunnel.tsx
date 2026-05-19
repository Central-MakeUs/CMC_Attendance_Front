'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Part } from '@/gql/graphql';
import { signupAction } from '@/lib/actions/auth';
import NameStep from './NameStep';
import PartStep from './PartStep';
import CredentialsStep from './CredentialsStep';
import InviteCodeStep from './InviteCodeStep';
import CompleteStep from './CompleteStep';

type Step = 1 | 2 | 3 | 4 | 5;

type SignupFormData = {
  name: string;
  nickname: string;
  part: Part | '';
  loginId: string;
  password: string;
  invitationCode: string;
};

const initialFormData: SignupFormData = {
  name: '',
  nickname: '',
  part: '',
  loginId: '',
  password: '',
  invitationCode: '',
};

interface SignupFunnelProps {
  parts: Part[];
}

export default function SignupFunnel({ parts }: SignupFunnelProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep((s) => (s - 1) as Step);
    }
  };

  const handleNext = (data: Partial<SignupFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((s) => (s + 1) as Step);
  };

  const handleSignup = async (
    invitationCode: string
  ): Promise<string | undefined> => {
    const result = await signupAction({
      name: formData.name,
      nickname: formData.nickname,
      part: formData.part as Part,
      loginId: formData.loginId,
      password: formData.password,
      invitationCode,
    });
    if (result?.error) return result.error;
    setStep(5);

    return;
  };

  return (
    <>
      {step === 1 && (
        <NameStep
          defaultValues={{ name: formData.name, nickname: formData.nickname }}
          onNext={(data) => handleNext(data)}
          onBack={handleBack}
        />
      )}
      {step === 2 && (
        <PartStep
          parts={parts}
          defaultValue={formData.part}
          onNext={(part) => handleNext({ part })}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <CredentialsStep
          defaultValues={{
            loginId: formData.loginId,
            password: formData.password,
          }}
          onNext={(data) => handleNext(data)}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <InviteCodeStep
          defaultValue={formData.invitationCode}
          onSubmit={handleSignup}
          onBack={handleBack}
        />
      )}
      {step === 5 && <CompleteStep />}
    </>
  );
}
