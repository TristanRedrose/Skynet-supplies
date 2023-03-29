export type Category = {
    name: string,
    subCategories: SubCategory[],
}

export type SubCategory = {
    name: string,
    products: []
}
