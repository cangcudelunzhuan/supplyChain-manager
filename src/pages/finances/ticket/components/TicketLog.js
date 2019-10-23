import React, { Component } from 'react';
import { Table, Collapse } from 'antd';
import { timeFormat } from 'src/utils/tools';
const { Panel } = Collapse;

class TicketLog extends Component {
  render() {
    const { dataSource } = this.props;
    const columns = [{
      title: '操作时间',
      dataIndex: 'createTime',
    }, {
      title: '操作人',
      dataIndex: 'createName',
    }, {
      title: '操作类型',
      dataIndex: 'type',
      render: (txt) => {
        switch (txt) {
        case 1:
          return '上传发票';
        case 3:
          return '审核';
        default:
          break;
        }
      },
    }, {
      title: '发票金额（元）',
      dataIndex: 'amount',
    }, {
      title: '结果',
      dataIndex: 'result',
      render: (key) => {
        switch (key) {
        case 1:
          return '通过';
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
        {dataSource.length > 0 ? (
          <div style={{ marginBottom: '10px' }}>
            <Collapse accordion>
              <Panel header="审核记录" key="1" >
                <Table
                  rowKey="id"
                  size="small"
                  bordered
                  columns={columns}
                  dataSource={timeFormat(dataSource)}
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

export default TicketLog;