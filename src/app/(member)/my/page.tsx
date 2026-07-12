import Link from 'next/link';
import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
import { verifySession } from '@/lib/dal';
import {
  ChevronLeftIcon,
  InfoFillIcon,
  LockIcon,
  LogOutIcon,
} from '@/components/icons';
import type { Part } from '@/gql/graphql';
import SettingRow from './_components/SettingRow';
import LogoutButton from './_components/LogoutButton';

const MyPageQuery = gql(`
  query MyPage {
    myPage {
      nickname
      part
      attendanceScore
    }
  }
`);

const PART_LABELS: Record<Part, string> = {
  PM: 'PM',
  Designer: 'Design',
  Web: 'Web',
  iOS: 'iOS',
  Android: 'Android',
  Server: 'Server',
  Flutter: 'Flutter',
};

function formatScore(score: number): string {
  if (score > 0) return `+ ${score}`;
  if (score < 0) return `- ${Math.abs(score)}`;
  return '0';
}

export default async function MyPage() {
  await verifySession();
  const accessToken = await getAccessToken();

  const { myPage } = await gqlClient.request(MyPageQuery, undefined, {
    Authorization: `Bearer ${accessToken}`,
  });

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <header className="flex items-center h-[54px] px-4 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="뒤로가기">
            <ChevronLeftIcon />
          </Link>
          <span className="text-[18px] font-semibold text-grayscale-900 tracking-[-0.02em] leading-normal">
            마이페이지
          </span>
        </div>
      </header>
      <section className="px-4 py-5 flex flex-col gap-2">
        <div className="bg-[#eff1ff] rounded-xl px-3 py-2">
          <div className="flex items-center gap-2">
            <InfoFillIcon className="size-4 shrink-0" />
            <p className="flex-1 text-xs font-medium text-grayscale-900">
              출석 점수 0점 미만이면 수료가 어려워요.
            </p>
          </div>
        </div>
        <div className="border border-grayscale-100 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-semibold text-grayscale-900 tracking-[-0.02em]">
              {myPage.nickname}
            </span>
            <span className="bg-grayscale-50 text-grayscale-700 text-xs font-semibold px-2 py-1 rounded-full">
              {PART_LABELS[myPage.part]}
            </span>
          </div>
          <div className="bg-grayscale-50 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <span className="bg-white text-grayscale-700 text-xs font-semibold px-2 py-1 rounded-full">
                출석 점수
              </span>
              <span className="text-sm font-medium text-grayscale-700">
                {formatScore(myPage.attendanceScore)}
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="h-1.5 bg-grayscale-50 shrink-0" />
      <section className="px-4 py-5 flex flex-col">
        <p className="text-xs font-medium text-grayscale-700 tracking-[-0.02em]">
          보안
        </p>
        <Link href="/my/change-password">
          <SettingRow icon={<LockIcon className="size-5" />} label="비밀번호 변경" />
        </Link>
        <LogoutButton>
          <SettingRow icon={<LogOutIcon className="size-5" />} label="로그아웃" />
        </LogoutButton>
      </section>
    </div>
  );
}
