export interface TableFilter {
    page: number;
    limit: number;
    userId?: number;
    sortField?: number;
    sortOrder?: string;
    status?: string;
}