import React, { Component } from 'react';
import { Table, Collapse } from 'antd';
import { timeFormat } from 'src/utils/tools';
import { connect } from 'dva';

const { Panel } = Collapse;

@connect()
class DyAuditLog extends Component {
  state = {
    tableData: [],
  };

  componentDidMount() {
    const { id, type = 1 } = this.props;
    if (id !== 'add') {
      this.getDetail(id, type);
    }
  }

  getDetail = async (id, type) => {
    let audits = await this.props.dispatch({
      type: 'global/getAuditLog',
      payload: { businessId: id, businessType: type },
    });
    if (audits.data) {
      this.setState({
        tableData: audits.data,
      });
    }
  };

  render() {
    const { tableData } = this.state;
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
        case 5:
          return '启用';
        case 6:
          return '作废';
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

export default DyAuditLog;
