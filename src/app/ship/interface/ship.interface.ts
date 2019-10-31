export interface ShipInterface {
  name: string;
  MGLT: string;
  manufacturer: string;
  crew: string;
  starship_class: string;
}
export interface ShipsResponse {
  count: number;
  next: string;
  previous: null | string;
  results: ShipInterface[];
}