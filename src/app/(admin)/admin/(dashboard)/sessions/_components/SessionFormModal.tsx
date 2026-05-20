'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import SelectField from '@/components/ui/SelectField';
import { SearchIcon } from '@/components/icons';
import type { SessionsQuery } from '@/gql/graphql';

type Session = SessionsQuery['sessions'][number];

export interface SessionFormData {
  sessionName: string;
  placeName: string;
  year: string;
  month: string;
  day: string;
  startTime: string;
  endTime: string;
  attendanceStartTime: string;
  attendanceEndTime: string;
  description: string;
}

interface Props {
  mode: 'create' | 'edit';
  session?: Session;
  onClose: () => void;
  onSubmit: (data: SessionFormData) => void;
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
}: Props) {
  const [form, setForm] = useState<SessionFormData>(() => {
    if (mode === 'edit' && session) {
      const { year, month, day } = parseDate(session.sessionDate);
      return {
        sessionName: session.sessionName,
        placeName: session.placeName,
        year,
        month,
        day,
        startTime: parseTime(session.startTime),
        endTime: parseTime(session.endTime),
        attendanceStartTime: parseTime(session.attendanceStartTime),
        attendanceEndTime: parseTime(session.attendanceEndTime),
        description: session.description ?? '',
      };
    }
    return {
      sessionName: '',
      placeName: '',
      year: '',
      month: '',
      day: '',
      startTime: '',
      endTime: '',
      attendanceStartTime: '',
      attendanceEndTime: '',
      description: '',
    };
  });

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

          <div className="flex flex-col gap-1 w-full">
            <TextField.Label className="text-base leading-normal">
              장소
            </TextField.Label>
            <TextField.Input
              prefix={<SearchIcon />}
              value={form.placeName}
              onChange={(e) => set('placeName')(e.target.value)}
              placeholder="장소 검색"
            />
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

          <div className="flex flex-col gap-1 w-full">
            <SelectField.Label className="text-base leading-normal">
              출석 가능 시간
            </SelectField.Label>
            <div className="flex items-center gap-3">
              <SelectField.Input
                options={TIME_OPTIONS}
                value={form.attendanceStartTime}
                onChange={set('attendanceStartTime')}
                placeholder="10:00"
                className="flex-1 min-w-0"
              />
              <div className="w-3 h-px bg-grayscale-300 shrink-0" />
              <SelectField.Input
                options={TIME_OPTIONS}
                value={form.attendanceEndTime}
                onChange={set('attendanceEndTime')}
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
          <Button size="sm" className="flex-1" onClick={() => onSubmit(form)}>
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
