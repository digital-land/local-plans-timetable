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

export const fetchLPAs = (): Promise<LPAResponse> => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://www.planning.data.gov.uk/entity.json?dataset=local-authority&limit=400"
    )
      .then((response) => {
        response
          .json()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(new Error(error));
          });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};
