'use client';

import CopyValueModal from '@/components/ui/CopyValueModal';

interface Props {
  invitationCode: string | null;
  onClose: () => void;
}

export default function InviteCodeModal({ invitationCode, onClose }: Props) {
  return (
    <CopyValueModal
      title="초대 코드"
      description="초대 코드를 복사해 챌린저에게 공유해 주세요."
      value={invitationCode}
      copySuccessMessage="초대 코드가 복사되었습니다."
      onClose={onClose}
    />
  );
}
