import { BarcodeService as NS } from "../interfaces/BarcodeService";
import { APIService } from "./APIService";

export class NutritionService implements NS<any> {
  private _services: APIService<any>[];

  constructor(services: APIService<any>[]) {
    this._services = services;
  }
  FindByBarcode(barcode: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  FindByText(text: string): Promise<any[] | null> {
    throw new Error("Method not implemented.");
  }
}
