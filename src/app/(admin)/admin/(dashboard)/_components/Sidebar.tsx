'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, usePathname } from 'next/navigation';
import { SessionsIcon, UsersIcon, MailIcon } from '@/components/icons';
import Button from '@/components/ui/Button';
import { gql } from '@/gql';
import type { GenerationsQuery, Role } from '@/gql/graphql';
import { createBrowserClient } from '@/lib/graphql/client';
import InviteCodeModal from './InviteCodeModal';

const GenerationInvitationCodeQuery = gql(`
  query GenerationInvitationCode($generationNumber: Int!) {
    generationInvitationCode(generationNumber: $generationNumber) {
      id
      number
      invitationCode
    }
  }
`);

type Generation = GenerationsQuery['generations'][number];

interface Props {
  generations: Generation[];
  viewerRole: Role | null;
}

const MENU_ITEMS = [
  { label: '세션 관리', path: '/admin/sessions', Icon: SessionsIcon, roles: null },
  { label: '챌린저 관리', path: '/admin/challengers', Icon: UsersIcon, roles: null },
  { label: '유저 관리', path: '/admin/users', Icon: UsersIcon, roles: ['ROOT'] as Role[] },
];

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-');
  return `${year.slice(2)}.${month}.${day}`;
}

export default function Sidebar({ generations, viewerRole }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const generationNumber = searchParams.get('generationNumber');
  const generation = generations.find((g) => String(g.number) === generationNumber);

  const handleOpenModal = async () => {
    if (!invitationCode && generationNumber) {
      const client = createBrowserClient();
      const data = await client.request(GenerationInvitationCodeQuery, {
        generationNumber: Number(generationNumber),
      });
      setInvitationCode(data.generationInvitationCode.invitationCode);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-[250px] h-full bg-[#f1f1f4] shrink-0">
      <div className="flex items-center gap-2 px-7 pt-6 pb-0">
        <Image src="/cmc-logo.svg" alt="CMC 로고" width={22} height={22} />
        <span className="text-grayscale-900 text-[18px] font-semibold tracking-[-0.36px]">
          CMC
        </span>
      </div>

      <div className="flex flex-col flex-1 justify-between p-4">
        <div className="flex flex-col gap-2">
          {MENU_ITEMS.filter(({ roles }) => !roles || (viewerRole && roles.includes(viewerRole))).map(({ label, path, Icon }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={`${path}?generationNumber=${generationNumber}`}
                className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
                  isActive ? 'bg-white' : 'hover:bg-white/50'
                }`}
              >
                <Icon isActive={isActive} />
                <span
                  className={`text-[16px] leading-normal ${
                    isActive
                      ? 'font-semibold text-grayscale-900'
                      : 'font-medium text-grayscale-700'
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="bg-white flex flex-col gap-4 p-3 rounded-2xl">
          <div className="flex flex-col gap-4">
            <span className="bg-[#eff1ff] text-primary font-semibold text-[16px] px-3 py-1.5 rounded-full w-fit whitespace-nowrap">
              CMC {generationNumber}기
            </span>
            <div className="flex items-center gap-2 text-[14px]">
              <span className="text-grayscale-700 font-medium whitespace-nowrap">기간</span>
              <div className="w-px h-[17px] bg-grayscale-300 shrink-0" />
              <span className="text-grayscale-900 font-medium whitespace-nowrap">
                {generation
                  ? `${formatDate(generation.startDate)} ~ ${formatDate(generation.endDate)}`
                  : '-'}
              </span>
            </div>
          </div>
          <Button size="sm" className="gap-2" onClick={handleOpenModal}>
            <MailIcon />
            <span>초대코드 보기</span>
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <InviteCodeModal
          invitationCode={invitationCode}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
