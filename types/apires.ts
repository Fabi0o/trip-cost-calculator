interface APIres {
  results: results;
  summary: summary;
}

type results = Array<resultsItem>;

interface resultsItem {
  address: {
    country: string;
    countryCode: string;
    countryCodeISO3: string;
    countrySecondarySubdivision: string;
    countrySubdivision: string;
    freeformAddress: string;
    localName: string;
    municipality: string;
    municipalitySubdivision: string;
    postalCode: string;
    streetName: string;
    streetNumber?: string;
  };
  entryPoints: Array<{
    position: { lat: number; lon: number };
    type: string;
  }>;
  id: string;
  matchConfidence: { score: number };
  position: { lat: number; lon: number };
  score: number;
  type: string;
  viewport: {
    btmRightPoint: { lat: number; lon: number };
    topLeftPoint: { lat: number; lon: number };
  };
}

interface summary {
  fuzzyLevel: number;
  numResults: number;
  offset: number;
  query: string;
  queryTime: number;
  queryType: string;
  totalResults: number;
}

export type { APIres, results, resultsItem };
