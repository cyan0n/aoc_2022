// deno-lint-ignore-file no-explicit-any
const dd = (...data: any[]) => {
  console.log(...data);
  // Need to use somethign else
  Deno.exit();
};

export default dd;
