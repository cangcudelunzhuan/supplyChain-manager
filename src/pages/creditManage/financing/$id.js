import React, { Component } from 'react';
import { DyPage, DyControl } from 'dy-components';
import { Table, Form, Row, Input, Button, Modal, Select } from 'antd';
import { connect } from 'dva';
import { isContain, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';

@connect(({ dealerLimit, loading }) => ({
  dealerLimit,
  tableLoading: loading.effects['dealerLimit/getDealerLimitDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    this.getDealerDetail(id);
  }
  getDealerDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'dealerLimit/getDealerDetail',
      payload: {
        id,
      },
    });
    this.props.form.setFieldsValue({
      ...res.data,
    });
    this.getTableData({
      current: 1,
      id: res.data.dealerId,
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'dealerLimit/getDealerLimitDetail',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    });
  };

  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
    });
  };

  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    let isDisabled = true;
    let action = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
      },
      {
        title: '创建时间',
        dataIndex: 'confirmDate',
      },
      {
        title: '额度编号',
        dataIndex: 'financeCreditNo',
      },
      {
        title: '类型',
        dataIndex: 'license',
        render: (data) => {
          switch (data) {
          case 1:
            return '固定额度';
          case 2:
            return '临时额度';
          default:
            break;
          }
        },
      },
      {
        title: '额度',
        dataIndex: 'amount',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '额度生效日',
        dataIndex: 'startDate',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '额度到期日',
        dataIndex: 'endDate',
        render: (data) => {
          return data ? data : '/';
        },
      },
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1004002002001" key="control">
        <DyPage
          breadcrumb={[{
            name: '额度管理',
          }, {
            name: '融资额度管理',
            href: '/creditManage/financing',
          }, {
            name: '融资额度详情',
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled />)}
              {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">融资额度</div>
              {renderField(getFieldDecorator, '融资额度（元）', 'financeCreditAmount', <Input disabled />)}
              {renderField(getFieldDecorator, '额度生效日', 'startDate', <Input disabled />)}
              {renderField(getFieldDecorator, '额度到期日', 'expireDate', <Input disabled />)}
              {renderField(getFieldDecorator, '出资方式', 'type', <Select disabled>
                <Select.Option value={1} key={1}>{'先授信后放款 '}</Select.Option>
                <Select.Option value={2} key={2}>{'授信并放款'}</Select.Option>
              </Select>, { initialValue: 1 })}
              {renderField(getFieldDecorator, '创建时间', 'confirmDate', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">关联持牌机构信息</div>
              {renderField(getFieldDecorator, '持牌机构编号', 'licenseOrganizationNo', <Input disabled={isDisabled} />, {
                rules: [
                  { required: true, message: '请输入持牌机构编号' },
                ],
              })}
              {renderField(getFieldDecorator, '持牌机构名称', 'licenseOrganizationName', <Input disabled />)}
              {renderField(getFieldDecorator, '持牌机构地址', 'licenseOrganizationAddress', <Input disabled />)}
              {renderField(getFieldDecorator, '联系人姓名', 'contactName', <Input disabled />)}
              {renderField(getFieldDecorator, '联系人手机号', 'contactMobilePhone', <Input disabled />)}
            </Row>
          </Form>
          <div className="block-title" style={{ marginTop: '20px' }}>历史记录</div>
          <Table
            rowKey="index"
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            pagination={{
              total,
              current,
            }}
            onChange={this.onTableChange}
            size="small"
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
