export interface BarcodeService<T> {
  FindByBarcode(barcode: string): Promise<T | null>;
  FindByText(text: string): Promise<T[] | null>;
}
