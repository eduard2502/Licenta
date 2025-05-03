export interface Product {
    id: number;
    nume: string;
    procesor: string;
    memorie: number;      // în GB
    stoc: number;         // cantitate în stoc
    pret: number;         // în lei
    imagineUrl?: string;  // opțional
  }
  