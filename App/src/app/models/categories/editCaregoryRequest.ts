export type EditCategoryRequest = {
    categoryId: string,
    name: string,
    subCategories: SubCategoryData[],
}

export type SubCategoryData = {
    subcategoryId: string,
    name: string,
}