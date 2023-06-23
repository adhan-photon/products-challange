const productGroups = [
  {
    items: [
      { name: "XXX", price: "1" },
      { name: "zzz", price: "3" },
    ],
  },
  { items: [{ name: "YYY", price: "2" }] },
];

const result = [
  { name: "zzz", price: "3" },
  { name: "YYY", price: "2" },
  { name: "XXX", price: "1" },
];

// const map1 = productGroups.map((product) => product.items);
// console.log(map1, "product");
// const flatMap1 = productGroups.flatMap((product) => product.items);
// console.log(flatMap1, "flatMap");

const result1 = productGroups
  .flatMap((group) => group.items)
  .sort((a, b) => a.price - b.price);

console.log(result1, "result1");
