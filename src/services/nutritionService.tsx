import { APIService } from "./APIService";
import { BarcodeService as NS } from "../interfaces/BarcodeService";

export class NutritionService implements NS<unknown> {
  private _services: APIService<unknown>[];

  constructor(services: APIService<unknown>[]) {
    this._services = services;
  }
  FindByBarcode(_: string): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  FindByText(_: string): Promise<unknown[] | null> {
    throw new Error("Method not implemented.");
  }
}
