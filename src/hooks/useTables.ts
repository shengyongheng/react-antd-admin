import { useRequest } from "ahooks";
import { Options } from "ahooks/es/useRequest/src/types";
import { useState } from "react";
import type { TablePaginationConfig } from 'antd/es/table';
import { Table } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';

export const useTables = <ITableData, IPrarms>(getTableData: (params?: IPrarms) => Promise<ITableData>, options?: Options<ITableData, IPrarms[]>) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [pagination, setPagination] = useState<TablePaginationConfig | false>({
        total: 0,
        current: 0,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<any> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: '选中偶数行',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: '选中奇数行',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    const {
        loading,
        data, // 表格数据
        error,
        run, // 手动请求
        cancel // 停止轮询
    } = useRequest(getTableData, {
        ...options,
        onSuccess(data: any) {
            setPagination((pre => {
                return {
                    ...pre,
                    current: data.current,
                    total: data.total,
                    pageSize: data.pageSize,
                }
            }));
        }
    })

    return {
        loading,
        // 表格数据
        tableData: data,
        error,
        selectedRowKeys, // 选中的行
        rowSelection, // 多选框配置
        pagination: data.length < 10 ? pagination : false, // 分页配置
        run,
        cancel,
    };
}