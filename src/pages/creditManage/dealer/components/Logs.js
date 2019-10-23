import React, { Component } from 'react';
import { Table, Collapse } from 'antd';
import { timeFormat } from 'src/utils/tools';

const { Panel } = Collapse;

class Logs extends Component {

  render() {
    const { tableData } = this.props;
    const columns = [{
      title: '操作时间',
      dataIndex: 'createTime',
    }, {
      title: '操作人',
      dataIndex: 'createName',
    }, {
      title: '操作',
      width: 130,
      dataIndex: 'type',
      render: (key) => {
        switch (key) {
        case 0:
          return '导入';
        case 1:
          return '提交';
        case 2:
          return '修改';
        case 3:
          return '审核';
        case 4:
          return '确认';
        default:
          break;
        }
      },
    }, {
      title: '结果',
      dataIndex: 'result',
      render: (key) => {
        switch (key) {
        case 1:
          return '成功';
        case 2:
          return '不通过';
        default:
          break;
        }
      },
    }, {
      title: '备注',
      dataIndex: 'remark',
      width: '200px',
    }];
    return (
      <div>
        {tableData.length > 0 ? (
          <div style={{ marginBottom: '10px' }}>
            <Collapse accordion>
              <Panel header="审核记录" key="1">
                <Table
                  rowKey="createTime"
                  size="small"
                  bordered
                  columns={columns}
                  dataSource={timeFormat(tableData)}
                  pagination={false}
                />
              </Panel>
            </Collapse>
          </div>
        ) : ''}
      </div>
    );
  }
}

export default Logs;
