import { BarcodeService } from "interfaces/BarcodeService";
import { APIResponse } from "openfoodfacts-nodejs";
import { APIService } from "./APIService";

export class OpenFoodFactsService implements APIService<APIResponse.Products>, BarcodeService<APIResponse.Products> {
  FindByText(text: string): Promise<APIResponse.Products[] | null> {
    throw new Error("Method not implemented.");
  }
  ApiURL: string = "https://world.openfoodfacts.org/api/v2/product";

  Get(id: string) {
    throw new Error("Method not implemented.");
    return {} as any;
  }

  GetAll(): any[] {
    throw new Error("Method not implemented.");
  }

  async FindByBarcode(barcode: string): Promise<APIResponse.Products | null> {
    if (!barcode) throw new Error("Invalid barcode");

    const url = `${this.ApiURL}/${barcode}.json`;

    const result = await fetch(url);

    if (result.ok) return (await result.json()) as APIResponse.Products;

    throw new Error(result.statusText);
  }

  Create(data: any) {
    throw new Error("Method not implemented.");
    return {} as any;
  }
  Update(data: any): boolean {
    throw new Error("Method not implemented.");
  }
  Delete(id: string): boolean {
    throw new Error("Method not implemented.");
  }
}
