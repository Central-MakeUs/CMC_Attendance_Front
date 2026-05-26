'use client';

import { useEffect, useRef, useState } from 'react';
import { SearchIcon, MapPinIcon } from '@/components/icons';
import TextField from '@/components/ui/TextField';
import { useKakaoLoader } from '@/hooks/useKakaoLoader';

type PlaceResult = kakao.maps.services.PlaceSearchResult;

const MOCK_PLACES: PlaceResult[] = [
  {
    place_name: '마루 180',
    road_address_name: '서울 강남구 역삼로 180',
    address_name: '서울 강남구 역삼동 790-6',
    x: '127.0388326104599',
    y: '37.49543341237481',
  },
  {
    place_name: '프론트원',
    road_address_name: '서울 마포구 마포대로 122',
    address_name: '서울 마포구 공덕동 254-5',
    x: '126.9525465',
    y: '37.5453577',
  },
];

interface Props {
  value: string;
  onChange: (value: string, coords?: { latitude: number; longitude: number }) => void;
}

export default function PlaceSearchInput({ value, onChange }: Props) {
  const kakaoState = useKakaoLoader();
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const psRef = useRef<kakao.maps.services.Places | null>(null);

  useEffect(() => {
    if (kakaoState === 'ready') {
      psRef.current = new window.kakao.maps.services.Places();
    }
  }, [kakaoState]);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    onChange(q);

    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    if (!psRef.current) {
      const filtered = MOCK_PLACES.filter((p) =>
        p.place_name.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered);
      setOpen(filtered.length > 0);
      return;
    }

    psRef.current.keywordSearch(q, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setResults(data.slice(0, 5) as PlaceResult[]);
        setOpen(true);
      } else {
        setResults([]);
        setOpen(false);
      }
    });
  }

  function handleSelect(place: PlaceResult) {
    setQuery(place.place_name);
    onChange(place.place_name, {
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    });
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <TextField.Input
        prefix={<SearchIcon className="text-grayscale-300" />}
        value={query}
        onChange={handleChange}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="장소 검색"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-10 top-full mt-1 w-full bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(0,0,0,0.03),0px_4px_12px_0px_rgba(0,0,0,0.16)] overflow-hidden">
          {results.map((place, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full flex items-start gap-1 px-4 py-3 hover:bg-grayscale-50 transition-colors text-left"
              >
                <MapPinIcon className="shrink-0 mt-0.5 text-grayscale-500" />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-base font-medium text-grayscale-700 leading-normal">
                    {highlightMatch(place.place_name, query)}
                  </span>
                  <span className="text-sm text-grayscale-400 leading-normal truncate">
                    {place.road_address_name || place.address_name}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function highlightMatch(text: string, query: string) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-primary">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
}
