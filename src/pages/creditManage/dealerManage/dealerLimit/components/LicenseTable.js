import React, { Component } from 'react';
import { Table } from 'antd';

class index extends Component {


  render() {
    const { tableData, isDisabled } = this.props;
    const columns = [
      {
        title: '持牌机构名称',
        dataIndex: 'licenseOrganizationName',
      },
      {
        title: '统一社会信用代码',
        dataIndex: 'licenseOrganizationNo',
      },
      {
        title: '持牌机构地址',
        dataIndex: 'licenseOrganizationAddress',
      },
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
      },
      {
        title: '联系人手机号',
        dataIndex: 'contactMobilePhone',
      },
      {
        title: '操作',
        fixed: 'right',
        width: 130,
        render: (data) => {
          return (
            <a onClick={() => isDisabled ? '' : this.props.deleteItem(data.id)}>删除</a >
          );
        },
      },
    ];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        pagination={false}
        onChange={this.onTableChange}
        size={'small'}
      />
    );
  }
}

export default index;
