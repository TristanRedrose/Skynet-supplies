export type Category = {
    categoryId: string,
    name: string,
    subcategories: SubCategory[],
}

export type SubCategory = {
    subcategoryId: string,
    name: string,
    categoryId: string,
}
