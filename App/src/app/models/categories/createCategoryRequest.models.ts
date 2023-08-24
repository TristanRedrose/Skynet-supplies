export type CreateCategoryRequest = {
    name: string,
    subCategories: SubCategoryRequest[],
}

export type SubCategoryRequest = {
    name: string,
}