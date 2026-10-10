import { ClassValue } from "clsx";
import { Accordion, AlertDialog, Avatar as Avatar$1, Checkbox as Checkbox$1, ContextMenu as ContextMenu$1, Dialog, DropdownMenu as DropdownMenu$1, Popover as Popover$1, RadioGroup as RadioGroup$2, Select as Select$1, Switch as Switch$1, Tabs as Tabs$1, Tooltip as Tooltip$1 } from "radix-ui";
import * as React$2 from "react";
import React$1 from "react";
import { VariantProps } from "cva";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { AriaDatePickerProps, CalendarProps, I18nProviderProps } from "react-aria";
import { AccessorFn, AccessorFnColumnDef, AccessorKeyColumnDef, CellContext, Column, ColumnDef, ColumnFilter, ColumnOrderState, ColumnOrderState as ColumnOrderState$1, ColumnSort, DeepKeys, DeepValue, DisplayColumnDef, HeaderContext, IdIdentifier, IdentifiedColumnDef, PaginationState, Row, RowData, RowSelectionState, SortDirection, StringHeaderIdentifier, StringOrTemplateHeader, TableOptions, VisibilityState, VisibilityState as VisibilityState$1, useReactTable } from "@tanstack/react-table";
import Primitive from "react-currency-input-field";
import { Toaster as Toaster$1 } from "sonner";
//#region src/blocks/data-table/components/data-table-column-visibility-menu.d.ts
interface DataTableColumnVisibilityMenuProps {
  className?: string;
  tooltip?: string;
}
declare const DataTableColumnVisibilityMenu: ({ className, tooltip }: DataTableColumnVisibilityMenuProps) => import("react").JSX.Element | null;
//#endregion
//#region src/blocks/data-table/components/data-table-command-bar.d.ts
interface DataTableCommandBarProps {
  /**
   * The label to show when items are selected. If a function is passed,
   * it will be called with the count of selected items.
   */
  selectedLabel?: ((count: number) => string) | string;
}
declare function DataTableCommandBar(props: DataTableCommandBarProps): React$2.JSX.Element | null;
declare namespace DataTableCommandBar {
  var displayName: string;
}
//#endregion
//#region src/blocks/data-table/components/data-table-filter-bar.d.ts
interface DataTableFilterBarProps {
  /**
   * The label for the button that clears all active filters.
   * @default "Clear all"
   */
  clearAllFiltersLabel?: string;
  alwaysShow?: boolean;
  children?: React$2.ReactNode;
}
declare function DataTableFilterBar({ clearAllFiltersLabel, alwaysShow, children }: DataTableFilterBarProps): React$2.JSX.Element | null;
declare namespace DataTableFilterBar {
  var displayName: string;
}
//#endregion
//#region src/blocks/data-table/components/data-table-filter-menu.d.ts
interface DataTableFilterMenuProps {
  /**
   * The tooltip to show when hovering over the filter menu.
   */
  tooltip?: string;
  /**
   * Callback when a filter is added
   */
  onAddFilter?: (id: string, value: unknown) => void;
}
declare function DataTableFilterMenu({ tooltip, onAddFilter }: DataTableFilterMenuProps): import("react").JSX.Element;
declare namespace DataTableFilterMenu {
  var displayName: string;
}
//#endregion
//#region src/components/table/table.d.ts
interface TablePaginationProps extends React$2.HTMLAttributes<HTMLDivElement> {
  count: number;
  pageSize: number;
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  translations?: {
    of?: string;
    results?: string;
    pages?: string;
    prev?: string;
    next?: string;
  };
  previousPage: () => void;
  nextPage: () => void;
}
declare const Table: React$2.ForwardRefExoticComponent<React$2.HTMLAttributes<HTMLTableElement> & React$2.RefAttributes<HTMLTableElement>> & {
  Row: React$2.ForwardRefExoticComponent<React$2.HTMLAttributes<HTMLTableRowElement> & React$2.RefAttributes<HTMLTableRowElement>>;
  Cell: React$2.ForwardRefExoticComponent<React$2.HTMLAttributes<HTMLTableCellElement> & React$2.RefAttributes<HTMLTableCellElement>>;
  Header: React$2.ForwardRefExoticComponent<React$2.HTMLAttributes<HTMLTableSectionElement> & React$2.RefAttributes<HTMLTableSectionElement>>;
  HeaderCell: React$2.ForwardRefExoticComponent<React$2.TdHTMLAttributes<HTMLTableCellElement> & React$2.RefAttributes<HTMLTableCellElement>>;
  Body: React$2.ForwardRefExoticComponent<React$2.HTMLAttributes<HTMLTableSectionElement> & React$2.RefAttributes<HTMLTableSectionElement>>;
  Pagination: React$2.ForwardRefExoticComponent<TablePaginationProps & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/blocks/data-table/components/data-table-pagination.d.ts
interface DataTablePaginationProps {
  /**
   * The translations for strings in the pagination component.
   */
  translations?: React$2.ComponentProps<typeof Table.Pagination>['translations'];
}
declare function DataTablePagination(props: DataTablePaginationProps): React$2.JSX.Element;
declare namespace DataTablePagination {
  var displayName: string;
}
//#endregion
//#region src/blocks/data-table/components/data-table-search.d.ts
interface DataTableSearchProps {
  /**
   * If true, the search input will be focused on mount.
   */
  autoFocus?: boolean;
  /**
   * Additional classes to pass to the search input.
   */
  className?: string;
  /**
   * The placeholder text to show in the search input.
   */
  placeholder?: string;
}
declare function DataTableSearch(props: DataTableSearchProps): import("react").JSX.Element;
declare namespace DataTableSearch {
  var displayName: string;
}
//#endregion
//#region src/blocks/data-table/components/data-table-sorting-menu.d.ts
interface DataTableSortingMenuProps {
  /**
   * The tooltip to show when hovering over the sorting menu.
   */
  tooltip?: string;
}
declare function DataTableSortingMenu(props: DataTableSortingMenuProps): React$2.JSX.Element;
declare namespace DataTableSortingMenu {
  var displayName: string;
}
//#endregion
//#region src/blocks/data-table/types.d.ts
type DataTableRowData = RowData;
type DataTableRow<TData extends DataTableRowData> = Row<TData>;
type DataTableAction<TData> = {
  label: string;
  onClick: (ctx: CellContext<TData, unknown>) => void;
  icon?: React.ReactNode;
};
interface DataTableCellContext<TData extends DataTableRowData, TValue> extends CellContext<TData, TValue> {}
interface DataTableHeaderContext<TData extends DataTableRowData, TValue> extends HeaderContext<TData, TValue> {}
type DataTableSortDirection = SortDirection;
interface DataTableActionColumnDef<TData> extends Pick<DisplayColumnDef<TData>, 'meta'> {
  actions: DataTableAction<TData>[] | DataTableAction<TData>[][] | ((ctx: DataTableCellContext<TData, unknown>) => DataTableAction<TData>[] | DataTableAction<TData>[][]);
}
interface DataTableSelectColumnDef<TData> extends Pick<DisplayColumnDef<TData>, 'cell' | 'header'> {}
type DataTableSortableColumnDef = {
  /**
   * The label to display in the sorting menu.
   */
  sortLabel?: string;
  /**
   * The label to display in the sorting menu when sorting in ascending order.
   */
  sortAscLabel?: string;
  /**
   * The label to display in the sorting menu when sorting in descending order.
   */
  sortDescLabel?: string;
  /**
   * Whether the column is sortable.
   * @default false
   */
  enableSorting?: boolean;
};
type DataTableColumnAlignment = 'left' | 'center' | 'right';
type DataTableAlignableColumnDef = {
  /**
   * The alignment of the header content.
   * @default 'left'
   * @deprecated Use `align`, which aligns both the header and the body cell.
   */
  headerAlign?: DataTableColumnAlignment;
  /**
   * The alignment of both the header and the body cell content.
   * @default 'left'
   */
  align?: DataTableColumnAlignment;
};
type DataTableTruncatableColumnDef = {
  /**
   * Whether a hover tooltip showing the full value is displayed when the body
   * cell content is truncated. Disable it for cells that manage their own
   * overflow.
   * @default true
   */
  truncateTooltip?: boolean;
};
interface DataTableColumn<TData extends DataTableRowData, TValue = unknown> extends Column<TData, TValue> {}
type DataTableColumnDef<TData extends DataTableRowData, TValue = unknown> = ColumnDef<TData, TValue>;
type DataTableColumnIdentifiers<TData extends DataTableRowData, TValue> = IdIdentifier<TData, TValue> | StringHeaderIdentifier;
type DataTableDisplayColumnDef<TData extends DataTableRowData, TValue = unknown> = Pick<DisplayColumnDef<TData, TValue>, 'meta' | 'header' | 'cell' | 'minSize' | 'maxSize' | 'size'> & DataTableColumnIdentifiers<TData, TValue>;
interface DataTableIdentifiedColumnDef<TData extends DataTableRowData, TValue> extends Pick<IdentifiedColumnDef<TData, TValue>, 'meta' | 'header' | 'cell' | 'minSize' | 'maxSize' | 'size'> {
  id?: string;
  header?: StringOrTemplateHeader<TData, TValue>;
}
interface DataTableColumnHelper<TData> {
  /**
   * Create a accessor column.
   *
   * @param accessor The accessor to create the column for.
   * @param column The column to create for the accessor.
   * @returns The created accessor.
   */
  accessor: <TAccessor extends AccessorFn<TData> | DeepKeys<TData>, TValue extends TAccessor extends AccessorFn<TData, infer TReturn> ? TReturn : TAccessor extends DeepKeys<TData> ? DeepValue<TData, TAccessor> : never>(accessor: TAccessor, column: TAccessor extends AccessorFn<TData> ? DataTableDisplayColumnDef<TData, TValue> & DataTableSortableColumnDef & DataTableAlignableColumnDef & DataTableTruncatableColumnDef : DataTableIdentifiedColumnDef<TData, TValue> & DataTableSortableColumnDef & DataTableAlignableColumnDef & DataTableTruncatableColumnDef) => TAccessor extends AccessorFn<TData> ? AccessorFnColumnDef<TData, TValue> : AccessorKeyColumnDef<TData, TValue>;
  /**
   * Create a display column.
   *
   * @param column The column to create the display for.
   * @returns The created display column.
   */
  display: (column: DataTableDisplayColumnDef<TData>) => DisplayColumnDef<TData>;
  /**
   * Create an action column.
   *
   * @param props The props to create the action column for.
   * @returns The created action column.
   */
  action: (props: DataTableActionColumnDef<TData>) => DisplayColumnDef<TData, unknown>;
  /**
   * Create a select column.
   *
   * @param props The props to create the select column for.
   * @returns The created select column.
   */
  select: (props?: DataTableSelectColumnDef<TData>) => DisplayColumnDef<TData, unknown>;
}
interface DataTableSortingState extends ColumnSort {}
interface DataTableRowSelectionState extends RowSelectionState {}
interface DataTablePaginationState extends PaginationState {}
type DataTableFilteringState<T extends Record<string, unknown> = Record<string, unknown>> = { [K in keyof T]: T[K]; };
type DataTableFilterType = 'radio' | 'select' | 'date' | 'multiselect' | 'string' | 'number' | 'custom';
type DataTableFilterOption<T = string> = {
  label: string;
  value: T;
};
interface DataTableBaseFilterProps {
  type: DataTableFilterType;
  label: string;
}
interface DataTableRadioFilterProps extends DataTableBaseFilterProps {
  type: 'radio';
  options: DataTableFilterOption[];
}
interface DataTableSelectFilterProps extends DataTableBaseFilterProps {
  type: 'select';
  options: DataTableFilterOption[];
}
interface DataTableDateFilterProps extends DataTableBaseFilterProps {
  type: 'date';
  /**
   * The format of the date.
   * @default "date"
   */
  format?: 'date' | 'date-time';
  /**
   * The label to display for the range option.
   */
  rangeOptionLabel?: string;
  /**
   * The label to display for the start of the range option.
   */
  rangeOptionStartLabel?: string;
  /**
   * The label to display for the end of the range option.
   */
  rangeOptionEndLabel?: string;
  /**
   * Whether to disable the range option.
   */
  disableRangeOption?: boolean;
  /**
   * A function to format the date value.
   *
   * @example
   * ```tsx
   * formatDateValue={(value) => value.toLocaleDateString()}
   * ```
   */
  formatDateValue?: (value: Date) => string;
  /**
   * The options to display in the filter.
   *
   * @example
   * ```tsx
   * options: [
   *   { label: "Today", value: { $gte: new Date().toISOString() } },
   *   { label: "Yesterday", value: { $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString() } },
   * ]
   * ```
   */
  options: DataTableFilterOption<DataTableDateComparisonOperator>[];
}
interface DataTableMultiselectFilterProps extends DataTableBaseFilterProps {
  type: 'multiselect';
  options: DataTableFilterOption[];
  /**
   * Whether to show a search input for the options.
   * @default true
   */
  searchable?: boolean;
}
interface DataTableStringFilterProps extends DataTableBaseFilterProps {
  type: 'string';
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
}
interface DataTableNumberFilterProps extends DataTableBaseFilterProps {
  type: 'number';
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Whether to include comparison operators.
   * @default true
   */
  includeOperators?: boolean;
}
interface DataTableCustomFilterProps extends DataTableBaseFilterProps {
  type: 'custom';
  /**
   * Custom render function for the filter.
   */
  render: (props: {
    value: unknown;
    onChange: (value: unknown) => void;
    onRemove: () => void;
  }) => React.ReactNode;
}
type DataTableFilterProps = DataTableRadioFilterProps | DataTableSelectFilterProps | DataTableDateFilterProps | DataTableMultiselectFilterProps | DataTableStringFilterProps | DataTableNumberFilterProps | DataTableCustomFilterProps;
type DataTableFilter<T extends DataTableFilterProps = DataTableFilterProps> = T & {
  id: string;
};
declare const DataTableEmptyState: {
  readonly EMPTY: 'EMPTY';
  readonly FILTERED_EMPTY: 'FILTERED_EMPTY';
  readonly POPULATED: 'POPULATED';
};
type DataTableEmptyState = (typeof DataTableEmptyState)[keyof typeof DataTableEmptyState];
type DataTableDateComparisonOperator = {
  /**
   * The filtered date must be greater than or equal to this value.
   */
  $gte?: string;
  /**
   * The filtered date must be less than or equal to this value.
   */
  $lte?: string;
  /**
   * The filtered date must be less than this value.
   */
  $lt?: string;
  /**
   * The filtered date must be greater than this value.
   */
  $gt?: string;
};
type DataTableNumberComparisonOperator = {
  /**
   * The filtered number must be greater than or equal to this value.
   */
  $gte?: number;
  /**
   * The filtered number must be less than or equal to this value.
   */
  $lte?: number;
  /**
   * The filtered number must be less than this value.
   */
  $lt?: number;
  /**
   * The filtered number must be greater than this value.
   */
  $gt?: number;
  /**
   * The filtered number must be equal to this value.
   */
  $eq?: number;
};
type DataTableCommandAction = (selection: DataTableRowSelectionState) => void | Promise<void>;
interface DataTableCommand {
  /**
   * The label to display in the command bar.
   */
  label: string;
  /**
   * The action to perform when the command is selected.
   */
  action: DataTableCommandAction;
  /**
   * The shortcut to use for the command.
   *
   * @example "i"
   */
  shortcut: string;
}
type DataTableEmptyStateContent = {
  /**
   * The heading to display in the empty state.
   */
  heading?: string;
  /**
   * The description to display in the empty state.
   */
  description?: string;
  /**
   * A custom component to display in the empty state, if provided it will override the heading and description.
   */
  custom?: React.ReactNode;
};
type DataTableEmptyStateProps = {
  /**
   * The empty state to display when the table is filtered, but no rows are found.
   */
  filtered?: DataTableEmptyStateContent;
  /**
   * The empty state to display when the table is empty.
   */
  empty?: DataTableEmptyStateContent;
};
interface DataTableColumnFilter extends ColumnFilter {}
//#endregion
//#region src/blocks/data-table/components/data-table-table.d.ts
interface DataTableTableProps {
  /**
   * The empty state to display when the table is empty.
   */
  emptyState?: DataTableEmptyStateProps;
}
declare function DataTableTable(props: DataTableTableProps): React$2.JSX.Element;
declare namespace DataTableTable {
  var displayName: string;
}
//#endregion
//#region src/blocks/data-table/components/data-table-toolbar.d.ts
interface DataTableToolbarTranslations {
  /**
   * The label for the clear all filters button
   * @default "Clear all"
   */
  clearAll?: string;
  /**
   * The tooltip for the sorting menu
   */
  sort?: string;
  /**
   * The tooltip for the columns menu
   */
  columns?: string;
}
interface DataTableToolbarProps {
  /**
   * Additional classes to pass to the wrapper `div` of the component.
   */
  className?: string;
  /**
   * The children to show in the toolbar.
   */
  children?: React$2.ReactNode;
  /**
   * The translations of strings in the toolbar.
   */
  translations?: DataTableToolbarTranslations;
  /**
   * Custom content to render in the filter bar
   */
  filterBarContent?: React$2.ReactNode;
  /**
   * Whether to always render the filter bar, even when there are no active
   * filters or custom content. Useful to reserve its space and avoid layout
   * shifts when filters are added or removed.
   */
  alwaysShowFilterBar?: boolean;
}
/**
 * Toolbar shown for the data table.
 */
declare const DataTableToolbar: (props: DataTableToolbarProps) => React$2.JSX.Element;
//#endregion
//#region src/blocks/data-table/use-data-table.d.ts
interface DataTableOptions<TData> extends Pick<TableOptions<TData>, 'data' | 'getRowId'> {
  /**
   * The columns to use for the table.
   */
  columns: DataTableColumnDef<TData, unknown>[];
  /**
   * The filters which the user can apply to the table.
   */
  filters?: DataTableFilter[];
  /**
   * The commands which the user can apply to selected rows.
   */
  commands?: DataTableCommand[];
  /**
   * Whether the data for the table is currently being loaded.
   */
  isLoading?: boolean;
  /**
   * The state and callback for the filtering.
   */
  filtering?: {
    state: DataTableFilteringState;
    onFilteringChange: (state: DataTableFilteringState) => void;
  };
  /**
   * The state and callback for the row selection.
   */
  rowSelection?: {
    state: DataTableRowSelectionState;
    onRowSelectionChange: (state: DataTableRowSelectionState) => void;
    enableRowSelection?: boolean | ((row: DataTableRow<TData>) => boolean) | undefined;
  };
  /**
   * The state and callback for the sorting.
   */
  sorting?: {
    state: DataTableSortingState | null;
    onSortingChange: (state: DataTableSortingState) => void;
  };
  /**
   * The state and callback for the search, with optional debounce.
   */
  search?: {
    state: string;
    onSearchChange: (state: string) => void;
    /**
     * Debounce time in milliseconds for the search callback.
     * @default 300
     */
    debounce?: number;
  };
  /**
   * The state and callback for the pagination.
   */
  pagination?: {
    state: DataTablePaginationState;
    onPaginationChange: (state: DataTablePaginationState) => void;
  };
  /**
   * The function to execute when a row is clicked.
   */
  onRowClick?: (event: React$2.MouseEvent<HTMLTableRowElement, MouseEvent>, row: TData) => void;
  /**
   * The total count of rows. When working with pagination, this will be the total
   * number of rows available, not the number of rows currently being displayed.
   */
  rowCount?: number;
  /**
   * Whether the page index should be reset the filtering, sorting, or pagination changes.
   *
   * @default true
   */
  autoResetPageIndex?: boolean;
  /**
   * The state and callback for the column visibility.
   */
  columnVisibility?: {
    state: VisibilityState$1;
    onColumnVisibilityChange: (state: VisibilityState$1) => void;
  };
  /**
   * The state and callback for the column order.
   */
  columnOrder?: {
    state: ColumnOrderState$1;
    onColumnOrderChange: (state: ColumnOrderState$1) => void;
  };
}
interface UseDataTableReturn<TData> extends Pick<ReturnType<typeof useReactTable<TData>>, 'getHeaderGroups' | 'getRowModel' | 'getCanNextPage' | 'getCanPreviousPage' | 'nextPage' | 'previousPage' | 'getPageCount' | 'getAllColumns' | 'setColumnVisibility' | 'setColumnOrder'> {
  getSorting: () => DataTableSortingState | null;
  setSorting: (sortingOrUpdater: DataTableSortingState | ((prev: DataTableSortingState | null) => DataTableSortingState)) => void;
  getFilters: () => DataTableFilter[];
  getFilterOptions: <T extends string | string[] | DataTableDateComparisonOperator>(id: string) => DataTableFilterOption<T>[] | null;
  getFilterMeta: (id: string) => DataTableFilter | null;
  getFiltering: () => DataTableFilteringState;
  addFilter: (filter: DataTableColumnFilter) => void;
  removeFilter: (id: string) => void;
  clearFilters: () => void;
  updateFilter: (filter: DataTableColumnFilter) => void;
  getSearch: () => string;
  onSearchChange: (search: string) => void;
  getCommands: () => DataTableCommand[];
  getRowSelection: () => DataTableRowSelectionState;
  onRowClick?: (event: React$2.MouseEvent<HTMLTableRowElement, MouseEvent>, row: TData) => void;
  emptyState: DataTableEmptyState;
  isLoading: boolean;
  showSkeleton: boolean;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  enablePagination: boolean;
  enableFiltering: boolean;
  enableSorting: boolean;
  enableSearch: boolean;
  enableColumnVisibility: boolean;
  enableColumnOrder: boolean;
  columnOrder: ColumnOrderState$1;
  setColumnOrderFromArray: (order: string[]) => void;
}
declare const useDataTable: <TData>({ rowCount, filters, commands, rowSelection, sorting, filtering, pagination, search, onRowClick, autoResetPageIndex, isLoading, columnVisibility, columnOrder, ...options }: DataTableOptions<TData>) => UseDataTableReturn<TData>;
//#endregion
//#region src/blocks/data-table/data-table.d.ts
/**
 * The props of the `DataTable` component.
 */
interface DataTableProps<TData> {
  /**
   * The instance returned by the `useDataTable` hook.
   */
  instance: UseDataTableReturn<TData>;
  /**
   * The children of the component.
   */
  children?: React$2.ReactNode;
  /**
   * Additional classes to pass to the wrapper `div` of the component.
   */
  className?: string;
}
/**
 * This component creates a data table with filters, pagination, sorting, and more.
 * It's built on top of the `Table` component while expanding its functionality.
 * The `DataTable` is useful to create tables similar to those in the cms Admin dashboard.
 */
declare const Root$7: {
  <TData>({ instance, children, className }: DataTableProps<TData>): React$2.JSX.Element;
  displayName: string;
};
declare const DataTable: typeof Root$7 & {
  Table: typeof DataTableTable;
  Toolbar: typeof DataTableToolbar;
  Search: typeof DataTableSearch;
  SortingMenu: typeof DataTableSortingMenu;
  FilterMenu: typeof DataTableFilterMenu;
  FilterBar: typeof DataTableFilterBar;
  ColumnVisibilityMenu: typeof DataTableColumnVisibilityMenu;
  Pagination: typeof DataTablePagination;
  CommandBar: typeof DataTableCommandBar;
};
//#endregion
//#region src/blocks/data-table/utils/create-data-table-column-helper.d.ts
declare const createDataTableColumnHelper: <TData>() => DataTableColumnHelper<TData>;
//#endregion
//#region src/blocks/data-table/utils/create-data-table-command-helper.d.ts
declare const createDataTableCommandHelper: () => {
  command: (command: DataTableCommand) => DataTableCommand;
};
//#endregion
//#region src/blocks/data-table/utils/create-data-table-filter-helper.d.ts
declare const createDataTableFilterHelper: <TData>() => {
  accessor: (accessor: DeepKeys<TData>, props: DataTableFilterProps) => {
    label: string;
    type: 'custom';
    render: (props: {
      value: unknown;
      onChange: (value: unknown) => void;
      onRemove: () => void;
    }) => React.ReactNode;
    id: DeepKeys<TData>;
  } | {
    label: string;
    type: 'date';
    format?: 'date' | 'date-time';
    rangeOptionLabel?: string;
    rangeOptionStartLabel?: string;
    rangeOptionEndLabel?: string;
    disableRangeOption?: boolean;
    formatDateValue?: (value: Date) => string;
    options: DataTableFilterOption<DataTableDateComparisonOperator>[];
    id: DeepKeys<TData>;
  } | {
    label: string;
    type: 'multiselect';
    options: DataTableFilterOption[];
    searchable?: boolean;
    id: DeepKeys<TData>;
  } | {
    label: string;
    type: 'number';
    placeholder?: string;
    includeOperators?: boolean;
    id: DeepKeys<TData>;
  } | {
    label: string;
    type: 'radio';
    options: DataTableFilterOption[];
    id: DeepKeys<TData>;
  } | {
    label: string;
    type: 'select';
    options: DataTableFilterOption[];
    id: DeepKeys<TData>;
  } | {
    label: string;
    type: 'string';
    placeholder?: string;
    id: DeepKeys<TData>;
  };
  custom: <T extends DataTableFilterProps>(props: DataTableFilter<T>) => DataTableFilter<T>;
};
//#endregion
//#region src/components/alert/alert.d.ts
interface AlertProps extends React$2.ComponentPropsWithoutRef<'div'> {
  variant?: 'error' | 'success' | 'warning' | 'info';
  dismissible?: boolean;
}
/**
 * This component is based on the div element and supports all of its props
 *
 * @excludeExternal
 */
export declare const Alert: React$2.ForwardRefExoticComponent<AlertProps & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/avatar/avatar.d.ts
declare const avatarVariants: (props?: ({
  variant?: "rounded" | "squared" | undefined;
  size?: "2xsmall" | "base" | "large" | "small" | "xlarge" | "xsmall" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface AvatarProps extends Omit<React$2.ComponentPropsWithoutRef<typeof Avatar$1.Root>, 'asChild' | 'children' | 'size'>, VariantProps<typeof avatarVariants> {
  src?: string;
  fallback: string;
}
/**
 * This component is based on the [Radix UI Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) primitive.
 */
declare const Avatar: React$2.ForwardRefExoticComponent<AvatarProps & React$2.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/badge/badge.d.ts
declare const badgeColorVariants: (props?: ({
  color?: "blue" | "green" | "grey" | "orange" | "purple" | "red" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
declare const badgeSizeVariants: (props?: ({
  size?: "2xsmall" | "base" | "large" | "small" | "xsmall" | undefined;
  rounded?: "base" | "full" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface BadgeProps extends Omit<React$2.HTMLAttributes<HTMLSpanElement>, 'color'>, VariantProps<typeof badgeSizeVariants>, VariantProps<typeof badgeColorVariants> {
  asChild?: boolean;
}
/**
 * This component is based on the `div` element and supports all of its props
 */
declare const Badge: React$2.ForwardRefExoticComponent<BadgeProps & React$2.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/button/button.d.ts
declare const buttonVariants: (props?: ({
  variant?: "danger" | "primary" | "secondary" | "transparent" | undefined;
  size?: "base" | "large" | "small" | "xlarge" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface ButtonProps extends React$2.ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}
/**
 * This component is based on the `button` element and supports all of its props
 */
declare const Button: React$2.ForwardRefExoticComponent<ButtonProps & React$2.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/calendar/calendar.d.ts
interface CalendarValueProps {
  /**
   * The currently selected date.
   */
  value?: Date | null;
  /**
   * The date that is selected when the calendar first mounts (uncontrolled).
   */
  defaultValue?: Date | null;
  /**
   * A function that is triggered when the selected date changes.
   */
  onChange?: (value: Date | null) => void;
  /**
   * A function that determines whether a date is unavailable for selection.
   */
  isDateUnavailable?: (date: Date) => boolean;
  /**
   * The minimum date that can be selected.
   */
  minValue?: Date;
  /**
   * The maximum date that can be selected.
   */
  maxValue?: Date;
}
interface CalendarProps$1 extends Omit<CalendarProps<CalendarDate>, keyof CalendarValueProps>, CalendarValueProps {}
/**
 * Calendar component used to select a date.
 * Its props are based on [React Aria Calendar](https://react-spectrum.adobe.com/react-aria/Calendar.html#calendar-1).
 *
 * @excludeExternal
 */
declare const Calendar: (props: CalendarProps$1) => React$2.JSX.Element;
//#endregion
//#region src/components/checkbox/types.d.ts
type CheckboxCheckedState = Checkbox$1.CheckedState;
//#endregion
//#region src/components/checkbox/checkbox.d.ts
/**
 * This component is based on the [Radix UI Checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox) primitive.
 */
declare const Checkbox: React$2.ForwardRefExoticComponent<Omit<Checkbox$1.CheckboxProps & React$2.RefAttributes<HTMLButtonElement>, "ref"> & {
  checked?: CheckboxCheckedState | undefined;
} & React$2.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/code/code.d.ts
/**
 * This component is based on the `code` element and supports all of its props
 */
declare const Code: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React$2.RefAttributes<HTMLElement>>;
//#endregion
//#region src/components/code-block/code-block.d.ts
type CodeSnippet = {
  /**
   * The label of the code snippet's tab or file name.
   */
  label: string;
  /**
   * The language of the code snippet. For example, `tsx`, `bash`, `json`.
   */
  language: string;
  /**
   * The code snippet string.
   */
  code: string;
  /**
   * Whether to hide the line numbers shown at the left side of the code snippet.
   */
  hideLineNumbers?: boolean;
  /**
   * Whether to hide the copy button.
   */
  hideCopy?: boolean;
};
type RootProps = {
  snippets: CodeSnippet[];
};
/**
 * CodeBlock component formatted according to Medusa UI specifications.
 */
declare const Root$6: {
  ({ snippets, className, children, ...props }: React$2.HTMLAttributes<HTMLDivElement> & RootProps): React$2.JSX.Element;
  displayName: string;
};
type HeaderProps$1 = {
  hideLabels?: boolean;
};
declare const HeaderComponent: {
  ({ children, className, hideLabels, ...props }: React$2.HTMLAttributes<HTMLDivElement> & HeaderProps$1): React$2.JSX.Element;
  displayName: string;
};
declare const Meta: {
  ({ className, ...props }: React$2.HTMLAttributes<HTMLDivElement>): React$2.JSX.Element;
  displayName: string;
};
declare const Body: {
  ({ className, children, ...props }: React$2.HTMLAttributes<HTMLDivElement>): React$2.JSX.Element;
  displayName: string;
};
declare const CodeBlock: typeof Root$6 & {
  Body: typeof Body;
  Header: typeof HeaderComponent & {
    Meta: typeof Meta;
  };
  Meta: typeof Meta;
};
//#endregion
//#region src/components/command/command.d.ts
/**
 * This component is based on the div element and supports all of its props
 */
declare const CommandComponent: {
  ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
  displayName: string;
};
declare const Command: typeof CommandComponent & {
  Copy: React$1.ForwardRefExoticComponent<Omit<React$1.HTMLAttributes<HTMLButtonElement> & {
    content: string;
    variant?: 'mini' | 'default' | null;
    asChild?: boolean;
  } & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
};
//#endregion
//#region src/components/command-bar/command-bar.d.ts
interface CommandBarProps extends React$2.PropsWithChildren {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  disableAutoFocus?: boolean;
}
/**
 * The root component of the command bar. This component manages the state of the command bar.
 */
declare const Root$5: {
  ({ open, onOpenChange, defaultOpen, disableAutoFocus, children }: CommandBarProps): React$2.JSX.Element;
  displayName: string;
};
interface CommandProps extends Omit<React$2.ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'> {
  action: () => void | Promise<void>;
  label: string;
  shortcut: string;
}
declare const CommandBar: typeof Root$5 & {
  Command: React$2.ForwardRefExoticComponent<CommandProps & React$2.RefAttributes<HTMLButtonElement>>;
  Value: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Bar: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Seperator: React$2.ForwardRefExoticComponent<Omit<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "children"> & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/components/container/container.d.ts
/**
 * This component is based on the `div` element and supports all of its props
 */
declare const Container: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/context-menu/context-menu.d.ts
/**
 * This component is based on the [Radix UI Context Menu](https://www.radix-ui.com/primitives/docs/components/context-menu) primitive.
 */
declare const Root: React$2.FC<ContextMenu$1.ContextMenuProps>;
/**
 * This component is based on the [Radix UI Context Menu Trigger](https://www.radix-ui.com/primitives/docs/components/context-menu#trigger) primitive.
 */
declare const Trigger: React$2.ForwardRefExoticComponent<ContextMenu$1.ContextMenuTriggerProps & React$2.RefAttributes<HTMLSpanElement>>;
/**
 * This component is based on the [Radix UI Context Menu Group](https://www.radix-ui.com/primitives/docs/components/context-menu#group) primitive.
 */
declare const Group: React$2.ForwardRefExoticComponent<ContextMenu$1.ContextMenuGroupProps & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu Portal](https://www.radix-ui.com/primitives/docs/components/context-menu#portal) primitive.
 */
declare const Portal: React$2.FC<ContextMenu$1.ContextMenuPortalProps>;
/**
 * This component is based on the [Radix UI Context Menu Sub](https://www.radix-ui.com/primitives/docs/components/context-menu#sub) primitive.
 */
declare const SubMenu: React$2.FC<ContextMenu$1.ContextMenuSubProps>;
/**
 * This component is based on the [Radix UI Context Menu RadioGroup](https://www.radix-ui.com/primitives/docs/components/context-menu#radiogroup) primitive.
 */
declare const RadioGroup: React$2.ForwardRefExoticComponent<ContextMenu$1.ContextMenuRadioGroupProps & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu SubTrigger](https://www.radix-ui.com/primitives/docs/components/context-menu#subtrigger) primitive.
 */
declare const SubMenuTrigger: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuSubTriggerProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu SubContent](https://www.radix-ui.com/primitives/docs/components/context-menu#subcontent) primitive.
 */
declare const SubMenuContent: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuSubContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu Content](https://www.radix-ui.com/primitives/docs/components/context-menu#content) primitive.
 */
declare const Content: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu Item](https://www.radix-ui.com/primitives/docs/components/context-menu#item) primitive.
 */
declare const Item: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu CheckboxItem](https://www.radix-ui.com/primitives/docs/components/context-menu#checkboxitem) primitive.
 */
declare const CheckboxItem: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuCheckboxItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu RadioItem](https://www.radix-ui.com/primitives/docs/components/context-menu#radioitem) primitive.
 */
declare const RadioItem: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuRadioItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu Label](https://www.radix-ui.com/primitives/docs/components/context-menu#label) primitive.
 */
declare const Label: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuLabelProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
/**
 * This component is based on the [Radix UI Context Menu Separator](https://www.radix-ui.com/primitives/docs/components/context-menu#separator) primitive.
 */
declare const Separator: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuSeparatorProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
declare function Shortcut({ className, ...props }: React$2.HTMLAttributes<HTMLSpanElement>): React$2.JSX.Element;
declare namespace Shortcut {
  var displayName: string;
}
declare function Hint({ className, ...props }: React$2.HTMLAttributes<HTMLSpanElement>): React$2.JSX.Element;
declare namespace Hint {
  var displayName: string;
}
declare const ContextMenu: React$2.FC<ContextMenu$1.ContextMenuProps> & {
  Trigger: React$2.ForwardRefExoticComponent<ContextMenu$1.ContextMenuTriggerProps & React$2.RefAttributes<HTMLSpanElement>>;
  Group: React$2.ForwardRefExoticComponent<ContextMenu$1.ContextMenuGroupProps & React$2.RefAttributes<HTMLDivElement>>;
  Portal: React$2.FC<ContextMenu$1.ContextMenuPortalProps>;
  SubMenu: React$2.FC<ContextMenu$1.ContextMenuSubProps>;
  SubMenuContent: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuSubContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  SubMenuTrigger: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuSubTriggerProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Content: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Item: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  CheckboxItem: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuCheckboxItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  RadioGroup: React$2.ForwardRefExoticComponent<ContextMenu$1.ContextMenuRadioGroupProps & React$2.RefAttributes<HTMLDivElement>>;
  RadioItem: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuRadioItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Label: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuLabelProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Separator: React$2.ForwardRefExoticComponent<Omit<ContextMenu$1.ContextMenuSeparatorProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Shortcut: typeof Shortcut;
  Hint: typeof Hint;
};
//#endregion
//#region src/components/copy/copy.d.ts
/**
 * This component is based on the `button` element and supports all of its props
 */
declare const Copy: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLButtonElement> & {
  content: string;
  variant?: 'mini' | 'default' | null;
  asChild?: boolean;
} & React$1.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/currency-input/currency-input.d.ts
declare const currencyInputVariants: (props?: ({
  size?: "base" | "small" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface CurrencyInputProps extends Omit<React$2.ComponentPropsWithoutRef<typeof Primitive>, 'prefix' | 'suffix' | 'size'>, VariantProps<typeof currencyInputVariants> {
  symbol: string;
  code: string;
}
/**
 * This component is based on the input element and supports all of its props
 *
 * @excludeExternal
 */
declare const CurrencyInput: React$2.ForwardRefExoticComponent<CurrencyInputProps & React$2.RefAttributes<HTMLInputElement>>;
//#endregion
//#region src/types.d.ts
export type ProgressStatus = 'not-started' | 'in-progress' | 'completed';
export type DateRange = {
  /**
   * The range's start date.
   */
  from: Date | undefined;
  /**
   * The range's end date.
   */
  to?: Date | undefined;
};
export type ToasterPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'loading' | 'message';
export type ToastActionVariant = 'default' | 'destructive';
export type ToastAction = {
  /**
   * The button's text.
   */
  label: string;
  /**
   * The button's alt text.
   */
  altText: string;
  /**
   * The function to execute when the button is clicked.
   */
  onClick: () => void | Promise<void>;
  /**
   * The button's variant.
   */
  variant?: ToastActionVariant;
};
export type Granularity = 'day' | 'hour' | 'minute' | 'second';
//#endregion
//#region src/components/date-picker/date-picker.d.ts
type DatePickerValueProps = {
  defaultValue?: Date | null;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  isDateUnavailable?: (date: Date) => boolean;
  minValue?: Date;
  maxValue?: Date;
  shouldCloseOnSelect?: boolean;
  granularity?: Granularity;
  size?: 'base' | 'small';
  className?: string;
  modal?: boolean;
};
interface DatePickerProps extends Omit<AriaDatePickerProps<CalendarDateTime | CalendarDate>, keyof DatePickerValueProps>, DatePickerValueProps {}
declare const DatePicker: React$2.ForwardRefExoticComponent<DatePickerProps & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/divider/divider.d.ts
interface DividerProps extends Omit<React$2.ComponentPropsWithoutRef<'div'>, 'children'> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'dashed' | 'solid';
}
export declare const Divider: ({ orientation, variant, className, ...props }: DividerProps) => React$2.JSX.Element;
//#endregion
//#region src/components/drawer/drawer.d.ts
interface DrawerRootProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Root> {}
/**
 * This component is based on the [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitives.
 */
declare const DrawerRoot: {
  (props: DrawerRootProps): React$2.JSX.Element;
  displayName: string;
};
interface DrawerTriggerProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Trigger> {}
interface DrawerCloseProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Close> {}
interface DrawerPortalProps extends Dialog.DialogPortalProps {}
/**
 * The `Drawer.Content` component uses this component to wrap the drawer content.
 * It accepts props from the [Radix UI Dialog Portal](https://www.radix-ui.com/primitives/docs/components/dialog#portal) component.
 */
declare const DrawerPortal: {
  (props: DrawerPortalProps): React$2.JSX.Element;
  displayName: string;
};
interface DrawerOverlayProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Overlay> {}
/**
 * This component is used to create the overlay for the drawer.
 * It accepts props from the [Radix UI Dialog Overlay](https://www.radix-ui.com/primitives/docs/components/dialog#overlay) component.
 */
declare const DrawerOverlay: React$2.ForwardRefExoticComponent<DrawerOverlayProps & React$2.RefAttributes<HTMLDivElement>>;
interface DrawerContentProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Content> {
  /**
   * Props for the overlay component.
   * It accepts props from the [Radix UI Dialog Overlay](https://www.radix-ui.com/primitives/docs/components/dialog#overlay) component.
   */
  overlayProps?: React$2.ComponentPropsWithoutRef<typeof DrawerOverlay>;
  /**
   * Props for the portal component that wraps the drawer content.
   * It accepts props from the [Radix UI Dialog Portal](https://www.radix-ui.com/primitives/docs/components/dialog#portal) component.
   */
  portalProps?: React$2.ComponentPropsWithoutRef<typeof DrawerPortal>;
}
interface DrawerHeaderProps extends React$2.ComponentPropsWithoutRef<'div'> {}
interface DrawerBodyProps extends React$2.ComponentPropsWithoutRef<'div'> {}
interface DrawerFooterProps extends React$2.HTMLAttributes<HTMLDivElement> {}
/**
 * This component is used to wrap the footer content of the drawer.
 * This component is based on the `div` element and supports all of its props.
 */
declare const DrawerFooter: {
  ({ className, ...props }: DrawerFooterProps): React$2.JSX.Element;
  displayName: string;
};
interface DrawerDescriptionProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Description> {}
declare const Drawer: typeof DrawerRoot & {
  Body: React$2.ForwardRefExoticComponent<DrawerBodyProps & React$2.RefAttributes<HTMLDivElement>>;
  Close: React$2.ForwardRefExoticComponent<DrawerCloseProps & React$2.RefAttributes<HTMLButtonElement>>;
  Content: React$2.ForwardRefExoticComponent<DrawerContentProps & React$2.RefAttributes<HTMLDivElement>>;
  Description: React$2.ForwardRefExoticComponent<DrawerDescriptionProps & React$2.RefAttributes<HTMLParagraphElement>>;
  Footer: typeof DrawerFooter;
  Header: React$2.ForwardRefExoticComponent<DrawerHeaderProps & React$2.RefAttributes<HTMLDivElement>>;
  Title: React$2.ForwardRefExoticComponent<Dialog.DialogTitleProps & React$2.RefAttributes<HTMLHeadingElement>>;
  Trigger: React$2.ForwardRefExoticComponent<DrawerTriggerProps & React$2.RefAttributes<HTMLButtonElement>>;
};
//#endregion
//#region src/components/dropdown-menu/dropdown-menu.d.ts
/**
 * This component is based on the `span` element and supports all of its props
 */
declare const Shortcut$1: {
  ({ className, ...props }: React$2.HTMLAttributes<HTMLSpanElement>): React$2.JSX.Element;
  displayName: string;
};
/**
 * This component is based on the `span` element and supports all of its props
 */
declare const Hint$2: {
  ({ className, ...props }: React$2.HTMLAttributes<HTMLSpanElement>): React$2.JSX.Element;
  displayName: string;
};
declare const DropdownMenu: React$2.FC<DropdownMenu$1.DropdownMenuProps> & {
  Trigger: React$2.ForwardRefExoticComponent<DropdownMenu$1.DropdownMenuTriggerProps & React$2.RefAttributes<HTMLButtonElement>>;
  Group: React$2.ForwardRefExoticComponent<DropdownMenu$1.DropdownMenuGroupProps & React$2.RefAttributes<HTMLDivElement>>;
  SubMenu: React$2.FC<DropdownMenu$1.DropdownMenuSubProps>;
  SubMenuContent: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuSubContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  SubMenuTrigger: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuSubTriggerProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Content: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Item: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  CheckboxItem: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuCheckboxItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  RadioGroup: React$2.ForwardRefExoticComponent<DropdownMenu$1.DropdownMenuRadioGroupProps & React$2.RefAttributes<HTMLDivElement>>;
  RadioItem: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuRadioItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Label: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuLabelProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Separator: React$2.ForwardRefExoticComponent<Omit<DropdownMenu$1.DropdownMenuSeparatorProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Shortcut: typeof Shortcut$1;
  Hint: typeof Hint$2;
};
//#endregion
//#region src/components/focus-modal/focus-modal.d.ts
/**
 * @prop defaultOpen - Whether the modal is opened by default.
 * @prop open - Whether the modal is opened.
 * @prop onOpenChange - A function to handle when the modal is opened or closed.
 */
interface FocusModalRootProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Root> {}
/**
 * This component is based on the [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitives.
 */
declare const FocusModalRoot: {
  (props: FocusModalRootProps): React$2.JSX.Element;
  displayName: string;
};
interface FocusModalTriggerProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Trigger> {}
interface FocusModalPortalProps extends Dialog.DialogPortalProps {}
/**
 * The `FocusModal.Content` component uses this component to wrap the modal content.
 * It accepts props from the [Radix UI Dialog Portal](https://www.radix-ui.com/primitives/docs/components/dialog#portal) component.
 */
declare const FocusModalPortal: {
  (props: FocusModalPortalProps): React$2.JSX.Element;
  displayName: string;
};
/**
 * This component is used to create the overlay for the modal.
 * It accepts props from the [Radix UI Dialog Overlay](https://www.radix-ui.com/primitives/docs/components/dialog#overlay) component.
 */
declare const FocusModalOverlay: React$2.ForwardRefExoticComponent<Omit<Dialog.DialogOverlayProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
interface FocusModalTitleProps extends React$2.ComponentPropsWithoutRef<typeof Dialog.Title> {}
declare const FocusModal: typeof FocusModalRoot & {
  Trigger: React$2.ForwardRefExoticComponent<FocusModalTriggerProps & React$2.RefAttributes<HTMLButtonElement>>;
  Title: React$2.ForwardRefExoticComponent<FocusModalTitleProps & React$2.RefAttributes<HTMLHeadingElement>>;
  Description: React$2.ForwardRefExoticComponent<Dialog.DialogDescriptionProps & React$2.RefAttributes<HTMLParagraphElement>>;
  Content: React$2.ForwardRefExoticComponent<Omit<Dialog.DialogContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & {
    overlayProps?: React$2.ComponentPropsWithoutRef<typeof FocusModalOverlay>;
    portalProps?: React$2.ComponentPropsWithoutRef<typeof FocusModalPortal>;
  } & React$2.RefAttributes<HTMLDivElement>>;
  Header: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Body: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Close: React$2.ForwardRefExoticComponent<Dialog.DialogCloseProps & React$2.RefAttributes<HTMLButtonElement>>;
  Footer: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/components/heading/heading.d.ts
declare const headingVariants: (props?: ({
  level?: "h1" | "h2" | "h3" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface HeadingProps extends VariantProps<typeof headingVariants>, React$2.HTMLAttributes<HTMLHeadingElement> {}
/**
 * This component is based on the heading element (`h1`, `h2`, etc...) depeneding on the specified level
 * and supports all of its props
 */
declare const Heading: ({ level, className, ...props }: HeadingProps) => React$2.JSX.Element;
//#endregion
//#region src/components/hint/hint.d.ts
declare const hintVariants: (props?: ({
  variant?: "error" | "info" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface HintProps extends VariantProps<typeof hintVariants>, React$2.ComponentPropsWithoutRef<'span'> {}
declare const Hint$1: React$2.ForwardRefExoticComponent<HintProps & React$2.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/i18n-provider/i18n-provider.d.ts
interface I18nProviderProps$1 extends I18nProviderProps {}
declare const I18nProvider: (props: I18nProviderProps$1) => import("react").JSX.Element;
//#endregion
//#region src/components/icon-badge/icon-badge.d.ts
declare const iconBadgeVariants: (props?: ({
  size?: "base" | "large" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface IconBadgeProps extends Omit<React$2.ComponentPropsWithoutRef<'span'>, 'color'>, VariantProps<typeof badgeColorVariants>, VariantProps<typeof iconBadgeVariants> {
  asChild?: boolean;
}
/**
 * This component is based on the `span` element and supports all of its props
 */
declare const IconBadge: React$2.ForwardRefExoticComponent<IconBadgeProps & React$2.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/icon-button/icon-button.d.ts
declare const iconButtonVariants: (props?: ({
  variant?: "primary" | "transparent" | undefined;
  size?: "2xsmall" | "base" | "large" | "small" | "xlarge" | "xsmall" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface IconButtonProps extends React$2.ComponentPropsWithoutRef<'button'>, VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}
/**
 * This component is based on the `button` element and supports all of its props
 */
declare const IconButton: React$2.ForwardRefExoticComponent<IconButtonProps & React$2.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/inline-tip/inline-tip.d.ts
interface InlineTipProps extends React$2.ComponentPropsWithoutRef<'div'> {
  label: string;
  variant?: 'info' | 'warning' | 'error' | 'success';
}
/**
 * This component is based on the `div` element and supports all of its props.
 */
export declare const InlineTip: React$2.ForwardRefExoticComponent<InlineTipProps & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/input/input.d.ts
declare const inputVariants: (props?: ({
  size?: "base" | "small" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface InputProps extends VariantProps<typeof inputVariants>, Omit<React$2.InputHTMLAttributes<HTMLInputElement>, 'size'> {}
/**
 * This component is based on the `input` element and supports all of its props
 */
declare const Input: React$2.ForwardRefExoticComponent<InputProps & React$2.RefAttributes<HTMLInputElement>>;
//#endregion
//#region src/components/kbd/kbd.d.ts
/**
 * This component is based on the `kbd` element and supports all of its props
 */
declare const Kbd: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React$2.RefAttributes<HTMLElement>>;
//#endregion
//#region src/components/label/label.d.ts
declare const labelVariants: (props?: ({
  size?: "base" | "large" | "small" | "xsmall" | undefined;
  weight?: "plus" | "regular" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface LabelProps extends React$2.ComponentPropsWithoutRef<'label'>, VariantProps<typeof labelVariants> {}
/**
 * This component is based on the [Radix UI Label](https://www.radix-ui.com/primitives/docs/components/label) primitive.
 */
declare const Label$1: React$2.ForwardRefExoticComponent<LabelProps & React$2.RefAttributes<HTMLLabelElement>>;
//#endregion
//#region src/components/otp-input/otp-input.d.ts
interface OtpInputProps extends Omit<React$2.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Whether the inputs should focus the first field on mount.
   */
  autoFocus?: boolean;
  /**
   * Whether the inputs are disabled.
   */
  disabled?: boolean;
  /**
   * How many digits to show before rendering a separator.
   */
  groupSize?: number;
  /**
   * Additional class name for each input.
   */
  inputClassName?: string;
  /**
   * The number of digits in the code.
   */
  length?: number;
  /**
   * Called with the sanitized code whenever it changes.
   */
  onChange: (value: string) => void;
  /**
   * Called when the sanitized code reaches the configured length.
   */
  onComplete?: (value: string) => void;
  /**
   * Whether the inputs are read-only.
   */
  readOnly?: boolean;
  /**
   * The separator rendered between groups.
   */
  separator?: React$2.ReactNode;
  /**
   * The controlled code value.
   */
  value: string;
}
/**
 * A controlled segmented input for one-time passwords, PINs, and short numeric verification codes.
 */
declare const OtpInput: React$2.ForwardRefExoticComponent<OtpInputProps & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/popover/popover.d.ts
/**
 * This component is based on the [Radix UI Popover](https://www.radix-ui.com/primitives/docs/components/popover) primitves.
 */
declare const Root$4: {
  (props: React$2.ComponentPropsWithoutRef<typeof Popover$1.Root>): React$2.JSX.Element;
  displayName: string;
};
interface ContentProps extends React$2.ComponentPropsWithoutRef<typeof Popover$1.Content> {}
declare const Popover: typeof Root$4 & {
  Trigger: React$2.ForwardRefExoticComponent<Omit<Popover$1.PopoverTriggerProps & React$2.RefAttributes<HTMLButtonElement>, "ref"> & React$2.RefAttributes<HTMLButtonElement>>;
  Anchor: React$2.ForwardRefExoticComponent<Omit<Popover$1.PopoverAnchorProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Close: React$2.ForwardRefExoticComponent<Omit<Popover$1.PopoverCloseProps & React$2.RefAttributes<HTMLButtonElement>, "ref"> & React$2.RefAttributes<HTMLButtonElement>>;
  Content: React$2.ForwardRefExoticComponent<ContentProps & React$2.RefAttributes<HTMLDivElement>>;
  Seperator: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/components/progress-accordion/progress-accordion.d.ts
/**
 * This component is based on the [Radix UI Accordion](https://radix-ui.com/primitives/docs/components/accordion) primitves.
 */
declare const Root$3: {
  (props: React$2.ComponentPropsWithoutRef<typeof Accordion.Root>): React$2.JSX.Element;
  displayName: string;
};
interface HeaderProps extends React$2.ComponentPropsWithoutRef<typeof Accordion.Header> {
  status?: ProgressStatus;
}
declare const ProgressAccordion: typeof Root$3 & {
  Item: React$2.ForwardRefExoticComponent<Omit<Accordion.AccordionItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Header: React$2.ForwardRefExoticComponent<HeaderProps & React$2.RefAttributes<HTMLHeadingElement>>;
  Content: React$2.ForwardRefExoticComponent<Omit<Accordion.AccordionContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/components/progress-tabs/progress-tabs.d.ts
/**
 * This component is based on the [Radix UI Tabs](https://radix-ui.com/primitives/docs/components/tabs) primitves.
 *
 */
declare const ProgressTabsRoot: {
  (props: Tabs$1.TabsProps): React$2.JSX.Element;
  displayName: string;
};
interface ProgressTabsTriggerProps extends Omit<React$2.ComponentPropsWithoutRef<typeof Tabs$1.Trigger>, 'asChild'> {
  status?: ProgressStatus;
}
declare const ProgressTabs: typeof ProgressTabsRoot & {
  Trigger: React$2.ForwardRefExoticComponent<ProgressTabsTriggerProps & React$2.RefAttributes<HTMLButtonElement>>;
  List: React$2.ForwardRefExoticComponent<Omit<Tabs$1.TabsListProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Content: React$2.ForwardRefExoticComponent<Omit<Tabs$1.TabsContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/components/prompt/prompt.d.ts
type PromptVariant = 'danger' | 'confirmation';
/**
 * This component is based on the [Radix UI Alert Dialog](https://www.radix-ui.com/primitives/docs/components/alert-dialog) primitives.
 */
declare const Root$2: {
  ({ variant, ...props }: React$2.ComponentPropsWithoutRef<typeof AlertDialog.Root> & {
    variant?: PromptVariant;
  }): React$2.JSX.Element;
  displayName: string;
};
/**
 * This component is based on the `div` element and supports all of its props
 */
declare const Header: {
  ({ className, ...props }: React$2.HTMLAttributes<HTMLDivElement>): React$2.JSX.Element;
  displayName: string;
};
/**
 * This component is based on the `div` element and supports all of its props
 */
declare const Footer: {
  ({ className, ...props }: React$2.HTMLAttributes<HTMLDivElement>): React$2.JSX.Element;
  displayName: string;
};
declare const Prompt: typeof Root$2 & {
  Trigger: React$2.ForwardRefExoticComponent<AlertDialog.AlertDialogTriggerProps & React$2.RefAttributes<HTMLButtonElement>>;
  Content: React$2.ForwardRefExoticComponent<Omit<AlertDialog.AlertDialogContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Title: React$2.ForwardRefExoticComponent<Omit<Omit<AlertDialog.AlertDialogTitleProps & React$2.RefAttributes<HTMLHeadingElement>, "ref">, "asChild"> & React$2.RefAttributes<HTMLHeadingElement>>;
  Description: React$2.ForwardRefExoticComponent<Omit<AlertDialog.AlertDialogDescriptionProps & React$2.RefAttributes<HTMLParagraphElement>, "ref"> & React$2.RefAttributes<HTMLParagraphElement>>;
  Action: React$2.ForwardRefExoticComponent<Omit<Omit<AlertDialog.AlertDialogActionProps & React$2.RefAttributes<HTMLButtonElement>, "ref">, "asChild"> & React$2.RefAttributes<HTMLButtonElement>>;
  Cancel: React$2.ForwardRefExoticComponent<Omit<Omit<AlertDialog.AlertDialogCancelProps & React$2.RefAttributes<HTMLButtonElement>, "ref">, "asChild"> & React$2.RefAttributes<HTMLButtonElement>>;
  Header: typeof Header;
  Footer: typeof Footer;
};
//#endregion
//#region src/components/radio-group/radio-group.d.ts
interface ChoiceBoxProps extends React$2.ComponentPropsWithoutRef<typeof RadioGroup$2.Item> {
  label: string;
  description: string;
}
declare const RadioGroup$1: React$2.ForwardRefExoticComponent<Omit<RadioGroup$2.RadioGroupProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>> & {
  Item: React$2.ForwardRefExoticComponent<Omit<RadioGroup$2.RadioGroupItemProps & React$2.RefAttributes<HTMLButtonElement>, "ref"> & React$2.RefAttributes<HTMLButtonElement>>;
  ChoiceBox: React$2.ForwardRefExoticComponent<ChoiceBoxProps & React$2.RefAttributes<HTMLButtonElement>>;
};
//#endregion
//#region src/components/select/select.d.ts
interface SelectProps extends React$2.ComponentPropsWithoutRef<typeof Select$1.Root> {
  size?: 'base' | 'small';
}
/**
 * This component is based on [Radix UI Select](https://www.radix-ui.com/primitives/docs/components/select).
 * It also accepts all props of the HTML `select` component.
 */
declare const Root$1: {
  ({ children, size, ...props }: SelectProps): React$2.JSX.Element;
  displayName: string;
};
interface SelectContentProps extends React$2.ComponentPropsWithoutRef<typeof Select$1.Content> {}
declare const Select: typeof Root$1 & {
  Group: React$2.ForwardRefExoticComponent<Select$1.SelectGroupProps & React$2.RefAttributes<HTMLDivElement>>;
  Value: React$2.ForwardRefExoticComponent<Select$1.SelectValueProps & React$2.RefAttributes<HTMLSpanElement>>;
  Trigger: React$2.ForwardRefExoticComponent<Omit<Select$1.SelectTriggerProps & React$2.RefAttributes<HTMLButtonElement>, "ref"> & React$2.RefAttributes<HTMLButtonElement>>;
  Content: React$2.ForwardRefExoticComponent<SelectContentProps & React$2.RefAttributes<HTMLDivElement>>;
  Label: React$2.ForwardRefExoticComponent<Omit<Select$1.SelectLabelProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Item: React$2.ForwardRefExoticComponent<Omit<Select$1.SelectItemProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Separator: React$2.ForwardRefExoticComponent<Omit<Select$1.SelectSeparatorProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/components/skeleton/skeleton.d.ts
declare function Skeleton({ className, ...props }: React$2.HTMLAttributes<HTMLDivElement>): React$2.JSX.Element;
//#endregion
//#region src/components/status-badge/status-badge.d.ts
declare const statusBadgeVariants: (props?: ({
  color?: "blue" | "green" | "grey" | "orange" | "purple" | "red" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface StatusBadgeProps extends Omit<React$2.ComponentPropsWithoutRef<'span'>, 'color'>, VariantProps<typeof statusBadgeVariants> {}
/**
 * This component is based on the span element and supports all of its props
 */
declare const StatusBadge: React$2.ForwardRefExoticComponent<StatusBadgeProps & React$2.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/switch/switch.d.ts
declare const switchVariants: (props?: ({
  size?: "base" | "small" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface SwitchProps extends Omit<React$2.ComponentPropsWithoutRef<typeof Switch$1.Root>, 'asChild'>, VariantProps<typeof switchVariants> {}
/**
 * This component is based on the [Radix UI Switch](https://www.radix-ui.com/primitives/docs/components/switch) primitive.
 */
declare const Switch: React$2.ForwardRefExoticComponent<SwitchProps & React$2.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/tabs/tabs.d.ts
/**
 * This component is based on the [Radix UI Tabs](https://radix-ui.com/primitives/docs/components/tabs) primitves
 */
declare const TabsRoot: {
  (props: React$2.ComponentPropsWithoutRef<typeof Tabs$1.Root>): React$2.JSX.Element;
  displayName: string;
};
declare const Tabs: typeof TabsRoot & {
  Trigger: React$2.ForwardRefExoticComponent<Omit<Tabs$1.TabsTriggerProps & React$2.RefAttributes<HTMLButtonElement>, "ref"> & React$2.RefAttributes<HTMLButtonElement>>;
  List: React$2.ForwardRefExoticComponent<Omit<Tabs$1.TabsListProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
  Content: React$2.ForwardRefExoticComponent<Omit<Tabs$1.TabsContentProps & React$2.RefAttributes<HTMLDivElement>, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
};
//#endregion
//#region src/components/text/text.d.ts
declare const textVariants: (props?: ({
  size?: "base" | "large" | "small" | "xlarge" | "xsmall" | undefined;
  weight?: "plus" | "regular" | undefined;
  family?: "mono" | "sans" | undefined;
  leading?: "compact" | "normal" | undefined;
} & ({
  class?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
  className?: never;
} | {
  class?: never;
  className?: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined)[] | {
    [x: string]: any;
  } | null | undefined;
})) | undefined) => string;
interface TextProps extends React$2.ComponentPropsWithoutRef<'p'>, VariantProps<typeof textVariants> {
  asChild?: boolean;
  as?: 'p' | 'span' | 'div';
}
/**
 * This component is based on the `p` element and supports all of its props
 */
declare const Text: React$2.ForwardRefExoticComponent<TextProps & React$2.RefAttributes<HTMLParagraphElement>>;
//#endregion
//#region src/components/textarea/textarea.d.ts
/**
 * This component is based on the `textarea` element and supports all of its props
 */
declare const Textarea: React$2.ForwardRefExoticComponent<Omit<React$2.DetailedHTMLProps<React$2.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & React$2.RefAttributes<HTMLTextAreaElement>>;
//#endregion
//#region src/components/toast/toast.d.ts
interface ToastComponentProps {
  id: string | number;
  variant?: ToastVariant;
  title: React$2.ReactNode;
  description?: React$2.ReactNode;
  action?: ToastAction;
  icon?: React$2.ReactNode;
  dismissable?: boolean;
}
/**
 * This component is based on the [Sonner](https://sonner.emilkowal.ski/toast) toast library.
 */
export declare const Toast: ({ id, variant, title, icon: _icon, description, action, dismissable }: ToastComponentProps) => React$2.JSX.Element;
//#endregion
//#region src/components/toaster/toaster.d.ts
interface ToasterProps extends Omit<React$2.ComponentPropsWithoutRef<typeof Toaster$1>, 'richColors' | 'closeButton' | 'icons' | 'theme' | 'invert' | 'loadingIcon' | 'cn' | 'toastOptions'> {}
/**
 * This component is based on the [Toaster component of the Sonner library](https://sonner.emilkowal.ski/toaster).
 */
declare const Toaster: ({ position, gap, offset, duration, ...props }: ToasterProps) => React$2.JSX.Element;
//#endregion
//#region src/components/tooltip/tooltip.d.ts
interface TooltipProps extends Omit<Tooltip$1.TooltipContentProps, 'content' | 'onClick'>, Pick<Tooltip$1.TooltipProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration'> {
  content: React$2.ReactNode;
  onClick?: React$2.MouseEventHandler<HTMLButtonElement>;
  side?: 'bottom' | 'left' | 'top' | 'right';
  maxWidth?: number;
}
/**
 * This component is based on the [Radix UI Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip) primitive.
 *
 * @excludeExternal
 */
declare const Tooltip: ({ children, content, open, defaultOpen, onOpenChange, delayDuration, maxWidth, className, side, sideOffset, onClick, ...props }: TooltipProps) => React$2.JSX.Element;
interface TooltipProviderProps extends Tooltip$1.TooltipProviderProps {}
declare const TooltipProvider: ({ children, delayDuration, skipDelayDuration, ...props }: TooltipProviderProps) => React$2.JSX.Element;
//#endregion
//#region src/components/permissions/types.d.ts
export type PermissionAction = 'create' | 'read' | 'edit' | 'delete' | 'publish';
export interface PermissionCatalogResource<R extends string = string> {
  key: R;
  actions: PermissionAction[];
}
export interface PermissionCatalog<R extends string = string> {
  resources: PermissionCatalogResource<R>[];
  actions: PermissionAction[];
}
export type PermissionsMatrixState = Record<string, Partial<Record<PermissionAction, boolean>>>;
export interface ResourceCategory {
  id: string;
  label: string;
  description?: string;
  resources: string[];
}
//#endregion
//#region src/components/permissions/PermissionMatrix.d.ts
interface PermissionMatrixProps {
  catalog: PermissionCatalog;
  value: PermissionsMatrixState;
  onChange?: (value: PermissionsMatrixState) => void;
  readonly?: boolean;
  categories?: ResourceCategory[];
  resourceLabels?: Record<string, string>;
  resourceDescriptions?: Record<string, string>;
  className?: string;
}
export declare const PermissionMatrix: React$2.FC<PermissionMatrixProps>;
//#endregion
//#region src/components/permissions/RoleEditorPanel.d.ts
interface RoleEditorPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  roleName: string;
  onRoleNameChange: (name: string) => void;
  roleDescription?: string;
  onRoleDescriptionChange?: (description: string) => void;
  isDefault?: boolean;
  onIsDefaultChange?: (isDefault: boolean) => void;
  catalog: PermissionCatalog;
  permissions: PermissionsMatrixState;
  onPermissionsChange: (permissions: PermissionsMatrixState) => void;
  categories?: ResourceCategory[];
  resourceLabels?: Record<string, string>;
  resourceDescriptions?: Record<string, string>;
  onSave: () => void | Promise<void>;
  isSaving?: boolean;
}
export declare const RoleEditorPanel: React$2.FC<RoleEditorPanelProps>;
//#endregion
//#region src/hooks/use-prompt/render-prompt.d.ts
interface RenderPromptProps {
  open: boolean;
  title: string;
  description: string;
  variant?: 'danger' | 'confirmation';
  verificationText?: string;
  verificationInstruction?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
//#endregion
//#region src/hooks/use-prompt/use-prompt.d.ts
type UsePromptProps = Omit<RenderPromptProps, 'onConfirm' | 'onCancel' | 'open'>;
declare const usePrompt: () => (props: UsePromptProps) => Promise<boolean>;
//#endregion
//#region src/hooks/use-toggle-state/use-toggle-state.d.ts
type StateType = [boolean, () => void, () => void, () => void] & {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};
declare const useToggleState: (initial?: boolean) => StateType;
//#endregion
//#region src/utils/clx.d.ts
export declare function clx(...args: ClassValue[]): string;
//#endregion
//#region src/utils/toast.d.ts
interface BaseToastProps {
  id?: string | number;
  position?: ToasterPosition;
  duration?: number;
  dismissable?: boolean;
  icon?: React$2.ReactNode;
}
interface ToastProps extends BaseToastProps {
  description?: React$2.ReactNode;
  action?: ToastAction;
}
declare function message(
/**
 * The title of the toast.
 */
title: string,
/**
 * The props of the toast.
 */
props?: ToastProps): string | number;
interface VariantToastProps extends Omit<ToastProps, 'icon'> {}
declare function info( /**
 * The title of the toast.
 */ title: string,
/**
 * The props of the toast.
 */
props?: VariantToastProps): string | number;
declare function error( /**
 * The title of the toast.
 */ title: string,
/**
 * The props of the toast.
 */
props?: VariantToastProps): string | number;
declare function success( /**
 * The title of the toast.
 */ title: string,
/**
 * The props of the toast.
 */
props?: VariantToastProps): string | number;
declare function warning( /**
 * The title of the toast.
 */ title: string,
/**
 * The props of the toast.
 */
props?: VariantToastProps): string | number;
declare function loading( /**
 * The title of the toast.
 */ title: string,
/**
 * The props of the toast.
 */
props?: VariantToastProps): string | number;
type PromiseStateProps = string | {
  title: string;
  description?: string;
};
interface PromiseToastProps extends Omit<BaseToastProps, 'icon'> {
  loading: PromiseStateProps;
  success: PromiseStateProps;
  error: PromiseStateProps;
}
declare function promise<TData>(
/**
 * The promise to be resolved.
 */
promise: Promise<TData> | (() => Promise<TData>),
/**
 * The props of the toast.
 */
props: PromiseToastProps): Promise<string | number>;
export declare const toast: typeof message & {
  info: typeof info;
  error: typeof error;
  warning: typeof warning;
  success: typeof success;
  promise: typeof promise;
  loading: typeof loading;
  dismiss: (id?: number | string) => string | number;
};
//#endregion
export { Avatar, Badge, Button, Calendar, Checkbox, type CheckboxCheckedState, Code, CodeBlock, type ColumnOrderState, Command, CommandBar, Container, ContextMenu, CheckboxItem as ContextMenuCheckboxItem, Content as ContextMenuContent, Group as ContextMenuGroup, Hint as ContextMenuHint, Item as ContextMenuItem, Label as ContextMenuLabel, Portal as ContextMenuPortal, RadioGroup as ContextMenuRadioGroup, RadioItem as ContextMenuRadioItem, Root as ContextMenuRoot, Separator as ContextMenuSeparator, Shortcut as ContextMenuShortcut, SubMenu as ContextMenuSub, SubMenuContent as ContextMenuSubContent, SubMenuTrigger as ContextMenuSubTrigger, Trigger as ContextMenuTrigger, Copy, CurrencyInput, DataTable, type DataTableAction, type DataTableCellContext, type DataTableColumn, type DataTableColumnAlignment, type DataTableColumnDef, type DataTableColumnFilter, type DataTableCommand, type DataTableDateComparisonOperator, type DataTableEmptyState, type DataTableEmptyStateContent, type DataTableEmptyStateProps, type DataTableFilter, type DataTableFilteringState, type DataTableHeaderContext, type DataTableNumberComparisonOperator, type DataTableOptions, type DataTablePaginationState, type DataTableProps, type DataTableRow, type DataTableRowData, type DataTableRowSelectionState, type DataTableSortDirection, type DataTableSortingState, DatePicker, Drawer, DropdownMenu, FocusModal, Heading, Hint$1 as Hint, I18nProvider, IconBadge, IconButton, Input, Kbd, Label$1 as Label, OtpInput, type OtpInputProps, type PermissionMatrixProps, Popover, ProgressAccordion, ProgressTabs, Prompt, RadioGroup$1 as RadioGroup, type RoleEditorPanelProps, Select, Skeleton, StatusBadge, Switch, Table, Tabs, Text, Textarea, Toaster, Tooltip, TooltipProvider, type UseDataTableReturn, type VisibilityState, createDataTableColumnHelper, createDataTableCommandHelper, createDataTableFilterHelper, useDataTable, usePrompt, useToggleState };