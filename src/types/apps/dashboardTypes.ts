interface BaseData {
    from?: string
    to?: string
    select?: string
    sort_by?: string
    sort?: string | null
    with?: string
}

export type DashboardData = BaseData & {
    role?: string
    count?: string
    most_followed?: string
    most_liked?: string
    most_download?: string
    most_favorite?: string
    most_viewed?: string
    limit?: string
    paginate?: string
    top_donators?: string
    top_downloaded?: string
    sum?: string
}

export type ChartData = BaseData & {
    weekly?: string
    daily?: string
    monthly?: string
    yearly?: string
}

export type DataProps<T extends BaseData> = {
    data: T;
}

export type AllDashboardData = BaseData & ChartData & DashboardData;
