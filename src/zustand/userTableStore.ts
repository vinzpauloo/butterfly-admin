// userTableStore.ts
import {create} from 'zustand';

type SortType = 'asc' | 'desc' | undefined | null;

type DrawerType = 'SUPERVISOR' | 'SA' | 'CC' | null

type UserTableState = {

    // Define your state properties here
    page: number;
    pageSize: number;
    role: string;
    roleId: any;
    columnType: string;
    rowCount: any;
    subRole: string;
    sort: SortType;
    sortName: string;
    search: string | undefined;
    emailSearchValue: string | undefined;
    mobileSearchValue: string | undefined;
    searchValue: string | undefined;
    initialLoad: boolean;
    activeTab: string | undefined;
    languages: string[];
    currencies: string[];
    rowData: [];
    openDrawer: DrawerType | null;
    drawerRole: DrawerType | null;
    drawerData: any | null; 
    supervisorPage: number;
    saPage: number;
    ccPage: number;

    // Define actions here
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setRole: (role: string) => void;
    setRoleId: (roleId: any) => void;
    setColumnType: (columnType: string) => void;
    setRowCount: (rowCount: any) => void;
    setSubRole: (subRole: string) => void;
    setSort: (sort: SortType) => void;
    setSortName: (sortName: string) => void;
    setSearch: (search: string | undefined) => void;
    setEmailSearchValue: (emailSearchValue: string | undefined) => void;
    setMobileSearchValue: (mobileSearchValue: string | undefined) => void;
    setSearchValue: (searchValue: string | undefined) => void;
    setInitialLoad: (initialLoad: boolean) => void;
    setActiveTab: (activeTab: string | undefined) => void;
    setLanguages: (languages: string[] | undefined) => void;
    setCurrencies: (currencies: string[] | undefined) => void;
    setRowData: (rowData: [] | undefined) => void;
    setOpenDrawer: (openDrawer: DrawerType) => void;
    setDrawerRole: (drawerRole: DrawerType) => void;
    setSupervisorPage: (supervisorPage: number) => void;
    setSaPage: (saPage: number) => void;
    setCcPage: (ccPage: number) => void;

    // Functions
    handleChange: (event: any, value: string | undefined) => void;
    handleRoleChange: (newRole: string | undefined) => void;
    handlePageChange: (newPage: number) => void;
    handleSearch: (value: string, type: string) => void;
    handleDrawerToggle: (role: string | null) => void;
    handleOpenDrawer: (role: DrawerType, data: any) => void;
};

export const useUserTableStore = create<UserTableState>((set) => ({
    // Define initial state
    page: 1,
    pageSize: 10,
    role: 'SUPERVISOR',
    roleId: null,
    columnType: 'SUPERVISOR',
    rowCount: null,
    subRole: 'role',
    sort: 'desc',
    sortName: 'created_at',
    search: undefined,
    emailSearchValue: undefined,
    mobileSearchValue: undefined,
    searchValue: undefined,
    initialLoad: true,
    activeTab: undefined,
    languages: [],
    currencies: [],
    rowData: [],
    openDrawer: null,
    drawerRole: null,
    drawerData: null,
    supervisorPage: 1,
    saPage: 1,
    ccPage: 1,

    // Define actions
    setPage: (page) => set({ page }),
    setPageSize: (pageSize) => set({ pageSize }),
    setRole: (role) => set({ role }),
    setRoleId: (roleId) => set({ roleId }),
    setColumnType: (columnType) => set({ columnType }),
    setRowCount: (rowCount) => set({ rowCount }),
    setSubRole: (subRole) => set({ subRole }),
    setSort: (sort) => set({ sort }),
    setSortName: (sortName) => set({ sortName }),
    setSearch: (search) => set({ search }),
    setEmailSearchValue: (emailSearchValue) => set({ emailSearchValue }),
    setMobileSearchValue: (mobileSearchValue) => set({ mobileSearchValue }),
    setSearchValue: (searchValue) => set({ searchValue }),
    setInitialLoad: (initialLoad) => set({ initialLoad }),
    setActiveTab: (activeTab) => set({ activeTab }),
    setLanguages: (languages) => set({ languages }),
    setCurrencies: (currencies) => set({ currencies }),
    setRowData: (rowData) => set({ rowData }),
    setOpenDrawer: (openDrawer) => set({ openDrawer }),
    setDrawerRole: (drawerRole) => set({ drawerRole }),
    setSupervisorPage: (supervisorPage) => set({ supervisorPage }),
    setSaPage: (saPage) => set({ saPage }),
    setCcPage: (ccPage) => set({ ccPage }),

    // Functions
    handleChange: (event, value) => set({activeTab: value}),
    handleRoleChange: (newRole) => {
        set({ role: newRole });

        switch (newRole) {
            case 'SUPERVISOR':
        set({ columnType: 'operators' });
            break;
            case 'SA':
        set({ columnType: 'superagent' });
            break;
            case 'CC':
        set({ columnType: 'contentcreators' });
            break;
            
            default:
            break;
        }
    },

    // handlePageChange: (value) => set({ page: value + 1 }),
    handlePageChange: (value) => {
        set((state) => {
            set({ page: value + 1 });

            if (state.activeTab === 'SUPERVISOR') {
            return { supervisorPage: value + 1 };
            } else if (state.activeTab === 'SA') {
            return { saPage: value + 1 };
            } else if (state.activeTab === 'CC') {
            return { ccPage: value + 1 };
            }
            
            return {};
        })       
    },
    handleSearch: (value, type) => {
        set({ search: type });

        switch (type) {
            case 'username':
                set({ searchValue: value });
                break;
            case 'email':
                set({ emailSearchValue: value });
                break;
            case 'mobile':
                set({ mobileSearchValue: value });
                break;
            
            default:
                break;
        }
    },
    handleDrawerToggle: (role) => {
        let drawerType: DrawerType

        switch (role) {
            case 'SUPERVISOR':
                drawerType = 'SUPERVISOR'
                break;
            case 'SA':
                drawerType = 'SA'
                break;
            case 'CC':
                drawerType = 'CC'
                break;
            default:
                drawerType = null;
                break;
        }
        set((state) => {
            const newOpenDrawer = state.openDrawer === drawerType ? null : drawerType;
            
            return { openDrawer: newOpenDrawer };
        });
    },
    handleOpenDrawer: (role, data) => {
        set({ drawerRole: role });
        set({ drawerData: data })
    }
}));
