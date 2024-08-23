import { Button, Table, Form, FormItemProps, FormInstance, TableProps, ConfigProvider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Popconfirm from 'antd/es/popconfirm';
// import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, CheckOutlined } from '@bixi-design/icons';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { cloneDeep, isEqual, isFunction, isString, omit, get, isNumber } from 'lodash';
import React, { useState, useImperativeHandle, useEffect, useContext } from 'react';
import { ColumnType, ColumnsType } from 'antd/es/table';
import classNames from 'classnames';

interface IEditableTableColumn<T> extends ColumnType<T> {
    title: string;
    dataIndex: string;
    formComponent: React.ReactNode | ((value: any, record: any, index: number) => React.ReactNode);
    formItemProps?: FormItemProps;
}

export type IEditableTableColumns<T = any> = IEditableTableColumn<T>[];
export type IEditableTableDataSource = any[];

export interface IEditableTableActionRenderExtra {
    isEditing: boolean;
    isLocking: boolean;
    editingRowKey: string | number;
}
export interface IEditableTableProps<T = any> extends TableProps<T> {
    rowKey: string;
    columns: IEditableTableColumns;
    value?: IEditableTableDataSource;
    onChange?: (val: any) => void;
    disabled?: boolean;
    creatable?: boolean;
    updatable?: boolean;
    deletable?: boolean;
    autoScrollOnCreate?: boolean;
    actionRender?: (row: any, rowIndex: number, extra: IEditableTableActionRenderExtra) => React.ReactNode;
    addRow?: any | ((dataSource: any[]) => any);
    tableText?: {
        cancel?: string;
        create?: string;
        confirm?: string;
        deleteTitle?: string;
        operation?: string;
    };
    // FIXME: 注意，外部如果使用 rowIndex 去取数据，可能会导致数据不正确。因为当 table 使用排序等方法会导致 currentDataSource 和 dataSource 的顺序差异
    onItemClick?: (row: any, rowIndex: number, extra: IEditableTableActionRenderExtra) => void;
}

let count = 0;
function generateId() {
    count += 1;
    return `${new Date().getTime()}${count}`;
}

export interface IEditableTableRef {
    create: (index?: number) => void;
    close: () => void;
    edit: (index: number) => void;
    save: () => void;
    delete: (index: number) => void;
    getDataSource: () => any;
    getForm: () => FormInstance;
    isEditing: () => boolean;
}

const ROW_KEY = '__BIXI_EDITABLE_TABLE_ROW_KEY__';
const CREATING_FLAG = '__BIXI_EDITABLE_TABLE_CREATING_FLAG__';

export const EditableTable = React.forwardRef(function EditableTable(
    props: React.PropsWithChildren<IEditableTableProps>,
    ref: React.Ref<IEditableTableRef>
) {
    // const { core: locale } = useLocale();
    const [form] = useForm();
    const [editingRowKey, setEditingRowKey] = React.useState<string>('');
    const tableContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [_dataSource, setDataSource] = useState<any[]>([]);
    // 因为 table 自身的排序、过滤等行为不会变更原始数据，而我们的操作又是根据 index 来的，难免会出现问题，所以这里我们记录真实渲染的数据顺序。
    const [currentDataSource, setCurrentDataSource] = useState<any[]>([]);
    const lastValueRef = React.useRef<any[]>([]);
    const {
        value = [],
        onChange = () => { },
        columns,
        disabled = false,
        creatable = true,
        updatable = true,
        deletable = true,
        autoScrollOnCreate = false,
        actionRender,
        addRow,
        tableText,
        onItemClick
    } = props;
    const locking = !!editingRowKey;

    useImperativeHandle(ref, () => ({
        create: (index) => {
            return onCreate(index);
        },
        close: () => {
            return onCancel();
        },
        edit: (index: number) => {
            return onEdit(index);
        },
        save: () => {
            return onSave();
        },
        delete: (index: number) => {
            return onDelete(index);
        },
        getDataSource: () => {
            return _dataSource;
        },
        getForm: () => {
            return form;
        },
        isEditing: () => {
            return !!editingRowKey;
        }
    }));

    useEffect(() => {
        if (isEqual(lastValueRef.current, value)) return;
        lastValueRef.current = value;
        const nextDataSource = value.map((v, index) => {
            const prevValue = get(_dataSource, `${index}.${ROW_KEY}`);
            return {
                ...v,
                // 这里为了保证，数据更新后, ROW_KEY 保持不变，否则会导致编辑状态丢失
                [ROW_KEY]: v[ROW_KEY] ?? prevValue ?? generateId()
            };
        });
        setDataSource(nextDataSource);
    }, [value, lastValueRef]);
    const onCreate = (index?: number) => {
        if (editingRowKey) return;
        const newValue = addRow ? (isFunction(addRow) ? addRow(_dataSource) : addRow) : {};
        const newRow = { [ROW_KEY]: generateId(), [CREATING_FLAG]: true, ...newValue };
        const newDataSource = [...cloneDeep(_dataSource)];
        if (isNumber(index)) {
            newDataSource.splice(index, 0, newRow);
        } else {
            newDataSource.push(newRow);
        }
        setEditingRowKey(newRow[ROW_KEY] as string);
        form.setFieldsValue({
            ...newRow
        });
        setDataSource(newDataSource);
        if (autoScrollOnCreate) {
            setTimeout(() => {
                scrollToBottom();
            }, 0);
        }
    };

    const scrollToBottom = () => {
        const scrollElement = tableContainerRef.current?.querySelector('.ant-table-body');
        scrollElement?.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
    };

    const onSave = () => {
        form
            .validateFields()
            .then((row) => {
                const newDataSource = cloneDeep(_dataSource).map((item) => {
                    if (item[ROW_KEY] === editingRowKey)
                        return {
                            ...item,
                            ...row
                        };
                    return item;
                });
                // 因为 currentDataSource 是触发 onFilter、onSort 等方法后的数据，而且这个数据是编辑时的必要数据，数据更新需要更新 currentDataSource
                if (currentDataSource?.length) {
                    setCurrentDataSource(
                        cloneDeep(currentDataSource).map((item) => {
                            if (item[ROW_KEY] === editingRowKey)
                                return {
                                    ...item,
                                    ...row
                                };
                            return item;
                        })
                    );
                }
                if (!value) {
                    setDataSource(newDataSource);
                }
                onChange(newDataSource.map((item) => omit(item, [CREATING_FLAG, ROW_KEY])));
                form.resetFields();
                setEditingRowKey('');
            })
            .catch(() => { });
    };

    const onEdit = (index: number) => {
        const row = currentDataSource[index] || _dataSource[index];
        if (locking) return;
        form.resetFields();
        setEditingRowKey(row[ROW_KEY]);
        form.setFieldsValue({
            ...(row || {})
        });
    };

    const onDelete = (index: number) => {
        const row = currentDataSource[index] || _dataSource[index];
        if (locking) return;
        const newDataSource = _dataSource.filter((r) => {
            return r[ROW_KEY] !== row[ROW_KEY];
        });
        if (!value) {
            setDataSource(newDataSource);
        }
        onChange(newDataSource.map((item) => omit(item, [CREATING_FLAG, ROW_KEY])));
    };

    const onCancel = () => {
        const newDataSource = cloneDeep(_dataSource).filter((item) => !item[CREATING_FLAG]);
        setDataSource(newDataSource);
        setEditingRowKey('');
        form.resetFields();
    };

    const onFormItemClick = (row: any, index: number, extra: IEditableTableActionRenderExtra) => {
        onItemClick && onItemClick(row, index, extra);
    };

    const _columns: ColumnsType<any> = [
        ...columns.map((col) => {
            return {
                ...col,
                render(val: any, row: any, index: number) {
                    if (row[ROW_KEY] === editingRowKey) {
                        const formItemProps = {
                            ...(col.formItemProps || {})
                        };
                        return (
                            <span>
                                <Form.Item name={col.dataIndex} {...formItemProps}>
                                    {isFunction(col.formComponent) ? col.formComponent(val, row, index) : col.formComponent}
                                </Form.Item>
                            </span>
                        );
                    }
                    const _val = col.render ? col.render(val, row, index) : val;
                    return (
                        <span
                            title={isString(_val) ? _val : undefined}
                            onClick={() =>
                                onFormItemClick(row, index, {
                                    editingRowKey,
                                    isEditing: row[ROW_KEY] === editingRowKey,
                                    isLocking: locking
                                })
                            }
                        >
                            {_val}
                        </span>
                    );
                }
            };
        }),
        (updatable || deletable) && {
            // title: tableText?.operation || locale.editableTable.operation,
            title: tableText?.operation,
            dataIndex: 'operations',
            key: 'operations',
            width: '120px',
            align: 'center',
            render(val: any, row: any, index: number) {
                if (actionRender) {
                    return actionRender(row, index, {
                        editingRowKey,
                        isEditing: row[ROW_KEY] === editingRowKey,
                        isLocking: locking
                    });
                }
                if (row[ROW_KEY] === editingRowKey) {
                    return (
                        <span>
                            <Button type='link' onClick={onSave} disabled={disabled} icon={<CheckOutlined />} />
                            <Button type='link' onClick={onCancel} disabled={disabled} icon={<CloseOutlined />} />
                        </span>
                    );
                }
                return (
                    <span>
                        {updatable && <Button type='link' disabled={locking || disabled} onClick={() => onEdit(index)} icon={<EditOutlined />} />}
                        {deletable && (
                            <Popconfirm
                                onConfirm={() => onDelete(index)}
                                disabled={locking || disabled}
                                // title={tableText?.deleteTitle || locale.editableTable.deleteTitle}
                                // okText={tableText?.confirm || locale.editableTable.confirm}
                                // cancelText={tableText?.cancel || locale.editableTable.cancel}
                                title={tableText?.deleteTitle}
                                okText={tableText?.confirm}
                                cancelText={tableText?.cancel}
                            >
                                <Button type='link' disabled={locking || disabled} icon={<DeleteOutlined />} />
                            </Popconfirm>
                        )}
                    </span>
                );
            }
        }
    ].filter(Boolean) as ColumnsType<any>;

    const tableProps = omit(props, ['columns', 'value', 'onChange']);

    // const onTableChange = (pagination, filter, sorter, extra) => {
    //     const currentDataSource = extra.currentDataSource;
    //     setCurrentDataSource(currentDataSource);
    // };
    const onTableChange = () => { };

    const size = props.size || 'middle';

    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    return (
        <Form form={form} component='div'>
            <div ref={tableContainerRef}>
                <Table
                    size='small'
                    tableLayout='fixed'
                    pagination={false}
                    columns={_columns}
                    dataSource={_dataSource}
                    onChange={onTableChange}
                    {...tableProps}
                    rowKey={ROW_KEY}
                />
                {creatable ? (
                    <Button
                        type='dashed'
                        size={size}
                        onClick={() => onCreate()}
                        disabled={locking || disabled}
                        icon={<PlusOutlined />}
                        block
                    >
                        {/* {tableText?.create || locale.editableTable.create} */}
                        {tableText?.create}
                    </Button>
                ) : null}
            </div>
        </Form>
    );
});
