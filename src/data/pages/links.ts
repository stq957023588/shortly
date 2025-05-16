

export type Sorting = {
    sortBy: 'project_owner' | 'team' | 'created_at'
    sortingOrder: 'asc' | 'desc' | null
  }

  export type Pagination = {
    page: number
    perPage: number
    total: number
  }

export const getLinks = async (options: Partial<Sorting> & Pagination) => {
  const json: any = await import('./links-db.json');
  return {
    data: json.default,
    pagination: {
      page: options.page,
      perPage: options.perPage,
      total: json.default.length,
    },
  }
}