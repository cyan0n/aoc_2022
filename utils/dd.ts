// deno-lint-ignore-file no-explicit-any
const dd = (...data: any[]) => {
  console.log(...data);
  Deno.exit();
};

export default dd;
