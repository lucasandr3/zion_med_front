import { Observable } from 'rxjs';

export interface upxDataListInterface {
    fields?: string[];

    getList(
        columns?: string[],
        conditions?: any,
        orders?: any,
        limit?: number,
        offset?: number,
        params?: any
    ): Observable<Object>;
}

export function isDataList(
    dataList: upxDataListInterface | undefined
): dataList is upxDataListInterface {
    return (dataList as upxDataListInterface).getList !== undefined;
}
