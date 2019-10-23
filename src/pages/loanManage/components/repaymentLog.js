import React, { Component } from 'react';
import {  Table, Collapse } from 'antd';
import { timeFormat }from 'src/utils/tools';
const { Panel } = Collapse;

class DyLog extends Component {
  render() {
    const { dataSource }=this.props;
    const columns=[{
      title: '操作时间',
      dataIndex: 'createTime',
    }, {
      title: '操作人',
      dataIndex: 'name',
    }, {
      title: '操作',
      dataIndex: 'status',
      render: (key)=>{
        switch (key) {
        case 1:
          return '融资';
        case 2:
          return '到期';
        case 3:
          return '还款成功';
        case 4:
          return '还款失败';
        default:
          break;
        }
      },
    },   {
      title: '结果',
      dataIndex: 'result',
      render: (key)=>{
        switch (key) {
        case 2:
          return '通过';
        case 3:
          return '不通过';
        default:
          break;
        }
      },
    }, {
      title: '备注',
      dataIndex: 'remark',
      width: '200px',
    } ];
    return (
      <div>
        {dataSource.length>0? (
          <div style={{ marginBottom: '10px' }}>
            <Collapse accordion>
              <Panel header="审核记录" key="1" >
                <Table
                  rowKey="index"
                  size="small"
                  bordered
                  columns={columns}
                  dataSource={timeFormat(dataSource)}
                  pagination={false}
                />
              </Panel>
            </Collapse>
          </div>
        ):''}
      </div>
    );
  }
}

export default DyLog;