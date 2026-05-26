'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import SelectField from '@/components/ui/SelectField';
import PlaceSearchInput from './PlaceSearchInput';
import type { Part, SessionsQuery } from '@/gql/graphql';

type Session = SessionsQuery['sessions'][number];

const PARTS: Part[] = [
  'PM',
  'Designer',
  'Web',
  'iOS',
  'Android',
  'Server',
  'Flutter',
];
const PART_LABELS: Record<Part, string> = {
  PM: 'PM',
  Designer: 'Design',
  Web: 'Web',
  iOS: 'iOS',
  Android: 'Android',
  Server: 'Server',
  Flutter: 'Flutter',
};

export interface SessionFormData {
  sessionName: string;
  placeName: string;
  placeDetail: string;
  latitude: number;
  longitude: number;
  year: string;
  month: string;
  day: string;
  startTime: string;
  endTime: string;
  description: string;
  targetParts: Part[];
}

interface Props {
  mode: 'create' | 'edit';
  session?: Session;
  onClose: () => void;
  onSubmit: (data: SessionFormData) => void;
  isLoading?: boolean;
}

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

function parseDate(dateStr: string) {
  const match = dateStr.match(/(\d{4})[.\-\/\s]+(\d{1,2})[.\-\/\s]+(\d{1,2})/);
  return {
    year: match?.[1] ?? '',
    month: match?.[2]?.padStart(2, '0') ?? '',
    day: match?.[3]?.padStart(2, '0') ?? '',
  };
}

function parseTime(timeStr: string) {
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return '';
  return `${match[1].padStart(2, '0')}:${match[2]}`;
}

export default function SessionFormModal({
  mode,
  session,
  onClose,
  onSubmit,
  isLoading = false,
}: Props) {
  const [form, setForm] = useState<SessionFormData>(() => {
    if (mode === 'edit' && session) {
      const { year, month, day } = parseDate(session.sessionDate);
      return {
        sessionName: session.sessionName,
        placeName: session.placeName,
        placeDetail: session.placeDetail ?? '',
        latitude: 0,
        longitude: 0,
        year,
        month,
        day,
        startTime: parseTime(session.startTime),
        endTime: parseTime(session.endTime),
        description: session.description ?? '',
        targetParts: session.targetParts ?? [],
      };
    }
    return {
      sessionName: '',
      placeName: '',
      placeDetail: '',
      latitude: 0,
      longitude: 0,
      year: '',
      month: '',
      day: '',
      startTime: '',
      endTime: '',
      description: '',
      targetParts: [...PARTS],
    };
  });

  const [isAllSelected, setIsAllSelected] = useState(
    () => mode !== 'edit' || !session?.targetParts?.length
  );

  function toggleAll() {
    setIsAllSelected(true);
    setForm((prev) => ({ ...prev, targetParts: [...PARTS] }));
  }

  function togglePart(part: Part) {
    if (isAllSelected) {
      setIsAllSelected(false);
      setForm((prev) => ({ ...prev, targetParts: [part] }));
      return;
    }
    setForm((prev) => {
      const has = prev.targetParts.includes(part);
      const next = has
        ? prev.targetParts.filter((p) => p !== part)
        : [...prev.targetParts, part];
      if (next.length === 0) {
        setIsAllSelected(true);
        return { ...prev, targetParts: [...PARTS] };
      }
      return { ...prev, targetParts: next };
    });
  }

  const set = (key: keyof SessionFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center py-4 bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),0px_4px_14px_0px_rgba(0,0,0,0.1)] w-full max-w-mobile mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-4 shrink-0">
          <p className="text-[20px] font-bold leading-normal text-[#30323d]">
            {mode === 'create' ? '세션 생성' : '세션 수정'}
          </p>
        </div>

        <div className="flex flex-col gap-4 px-5 pb-5 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-1 w-full">
            <TextField.Label className="text-base leading-normal">
              세션명
            </TextField.Label>
            <TextField.Input
              value={form.sessionName}
              onChange={(e) => set('sessionName')(e.target.value)}
              placeholder="세션명"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <TextField.Label className="text-base leading-normal">
              파트
            </TextField.Label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={toggleAll}
                className={`px-4 py-2 rounded-full text-[15px] font-semibold transition-colors ${
                  isAllSelected
                    ? 'bg-primary-light text-primary'
                    : 'bg-grayscale-50 text-grayscale-700 font-medium'
                }`}
              >
                전체
              </button>
              {PARTS.map((part) => {
                const selected =
                  !isAllSelected && form.targetParts.includes(part);
                return (
                  <button
                    key={part}
                    type="button"
                    onClick={() => togglePart(part)}
                    className={`px-4 py-2 rounded-full text-[15px] transition-colors ${
                      selected
                        ? 'bg-primary-light text-primary font-semibold'
                        : 'bg-grayscale-50 text-grayscale-700 font-medium'
                    }`}
                  >
                    {PART_LABELS[part]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <TextField.Label className="text-base leading-normal">
              장소
            </TextField.Label>
            <div className="flex flex-col gap-3 w-full">
              <PlaceSearchInput
                value={form.placeName}
                onChange={(value, coords) =>
                  setForm((prev) => ({
                    ...prev,
                    placeName: value,
                    ...(coords ?? {}),
                  }))
                }
              />
              <TextField.Input
                value={form.placeDetail}
                onChange={(e) => set('placeDetail')(e.target.value)}
                placeholder="(추가) 세부장소 입력"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <TextField.Label className="text-base leading-normal">
              날짜
            </TextField.Label>
            <div className="flex gap-3 w-full">
              <TextField.Input
                className="flex-1 min-w-0"
                inputMode="numeric"
                suffix="년"
                value={form.year}
                onChange={(e) => set('year')(e.target.value.replace(/\D/g, ''))}
                placeholder="ex) 2026"
              />
              <TextField.Input
                className="flex-1 min-w-0"
                inputMode="numeric"
                suffix="월"
                value={form.month}
                onChange={(e) =>
                  set('month')(e.target.value.replace(/\D/g, ''))
                }
                placeholder="ex) 05"
              />
              <TextField.Input
                className="flex-1 min-w-0"
                inputMode="numeric"
                suffix="일"
                value={form.day}
                onChange={(e) => set('day')(e.target.value.replace(/\D/g, ''))}
                placeholder="ex) 13"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <SelectField.Label className="text-base leading-normal">
              시간
            </SelectField.Label>
            <div className="flex items-center gap-3">
              <SelectField.Input
                options={TIME_OPTIONS}
                value={form.startTime}
                onChange={set('startTime')}
                placeholder="10:00"
                className="flex-1 min-w-0"
              />
              <div className="w-3 h-px bg-grayscale-300 shrink-0" />
              <SelectField.Input
                options={TIME_OPTIONS}
                value={form.endTime}
                onChange={set('endTime')}
                placeholder="16:00"
                className="flex-1 min-w-0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <TextField.Label className="text-base leading-normal">
              설명
            </TextField.Label>
            <textarea
              value={form.description}
              onChange={(e) => set('description')(e.target.value)}
              placeholder="세션 설명"
              className="w-full h-[134px] border border-grayscale-100 rounded-xl p-4 text-base text-grayscale-900 placeholder:text-grayscale-300 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex gap-2 px-5 pt-2 pb-5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onSubmit(form)}
            disabled={isLoading}
          >
            {isLoading ? '저장 중...' : '완료'}
          </Button>
        </div>
      </div>
    </div>
  );
}
