type LPAResponse = {
  entities: LPAEntity[];
};

type LPAEntity = {
  "entry-date": string;
  "start-date": string;
  "end-date": string;
  entity: number;
  name: string;
  dataset: string;
  typology: string;
  reference: string;
  prefix: string;
  "organisation-entity": string;
  geometry: string;
  point: string;
  region: string;
  website: string;
  wikidata: string;
  "billing-authority": string;
  "local-authority-type": string;
  "parliament-thesaurus": string;
  "addressbase-custodian": string;
  "statistical-geography": string;
  "local-resilience-forum": string;
  "opendatacommunities-uri": string;
  "local-authority-district": string;
};

export const fetchLPAs = async (): Promise<LPAResponse> => {
  try {
    const response = await fetch(
      "https://www.planning.data.gov.uk/entity.json?dataset=local-authority&limit=400"
    );
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch LPAs: " + error.message);
    }
    
    throw new Error("Failed to fetch LPAs: " + JSON.stringify(error));
  }
};
