export async function GET() {
  console.log("test");
  //   const { barcode } = req.query;
  //   let service = new OpenFoodFactsService();
  //   console.log({ barcode });
  //   let result = await service.GetByBarcode(barcode as string);

  return Response.json({ status: "ok" });
  //   return Response.json(result);
}
