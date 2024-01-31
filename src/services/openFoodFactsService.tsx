import { APIResponse } from "openfoodfacts-nodejs";
import { BarcodeService } from "interfaces/BarcodeService";
import { APIService } from "./APIService";

export class OpenFoodFactsService implements APIService<APIResponse.Products>, BarcodeService<APIResponse.Products> {
  Get(_: string): APIResponse.Products {
    throw new Error("Method not implemented.");
  }
  GetAll(): APIResponse.Products[] {
    throw new Error("Method not implemented.");
  }
  Create(_: APIResponse.Products): APIResponse.Products {
    throw new Error("Method not implemented.");
  }
  Update(_: APIResponse.Products): boolean {
    throw new Error("Method not implemented.");
  }
  Delete(_: string): boolean {
    throw new Error("Method not implemented.");
  }
  FindByText(_: string): Promise<APIResponse.Products[] | null> {
    throw new Error("Method not implemented.");
  }
  ApiURL: string = "https://world.openfoodfacts.org/api/v2/product";

  async FindByBarcode(barcode: string): Promise<APIResponse.Products | null> {
    if (!barcode) throw new Error("Invalid barcode");

    const url = `${this.ApiURL}/${barcode}.json`;

    const result = await fetch(url);

    if (result.ok) return (await result.json()) as APIResponse.Products;

    throw new Error(result.statusText);
  }
}
