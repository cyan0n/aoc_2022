const dd = (...data: any[]) => {
  console.log(...data);
  Deno.exit();
};

export default dd;
