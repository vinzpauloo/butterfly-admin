export type BaseData =  {
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

export type DashboardProps = {
    data: DashboardData
}

export type ChartProps = {
    data: ChartData
}

export type AllDashboardData = BaseData & ChartData & DashboardData;
export type AllDashboardDataProps = {
    data: AllDashboardData
}