export const page = {
  description: "⚛ nextjs page",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Page name",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/app/{{pascalCase name}}/page.ts",
      templateFile: "./templates/page.hbs",
    },
  ],
}
