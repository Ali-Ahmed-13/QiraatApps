export interface EraItem {
  id: string;
  label: string;
}

export interface Scholar {
  id: string;
  name?: string;
  title?: string;
  era?: string;
  lifespan?: string;
  location?: string;
  bio?: string;
  fullBiography?: string;
  teachers?: string[];
  students?: string[];
  works?: string[];
  quotes?: string[];
  contributions?: string[];
  achievement?: string;
}

export interface ScholarsData {
  eras: EraItem[];
  scholars: Scholar[];
}
