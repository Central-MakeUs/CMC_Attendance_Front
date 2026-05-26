declare namespace kakao.maps.services {
  class Places {
    keywordSearch(
      keyword: string,
      callback: (result: PlaceSearchResult[], status: Status) => void,
    ): void;
  }

  interface PlaceSearchResult {
    place_name: string;
    address_name: string;
    road_address_name: string;
    x: string;
    y: string;
  }

  enum Status {
    OK = 'OK',
    ZERO_RESULT = 'ZERO_RESULT',
    ERROR = 'ERROR',
  }
}

declare namespace kakao.maps {
  function load(callback: () => void): void;
}

interface Window {
  kakao: typeof kakao;
}
