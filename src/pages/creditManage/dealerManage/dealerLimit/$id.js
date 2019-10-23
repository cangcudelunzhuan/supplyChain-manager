import React, { Component } from 'react';
import { DyPage, DyControl } from 'dy-components';
import { Table, Form, Row, Input, Button, Modal, Select, Icon, message, Divider } from 'antd';
import { connect } from 'dva';
import { fundingT } from 'src/utils/statusReturn';
import { isContain, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
import LicenseTable from './components/LicenseTable';
import LicenseModal from './components/LicenseModal';
const { confirm } = Modal;

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
    status: '',
    licenseDatas: [],
    visible: false,
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
    this.setState({ status: res.data.status });
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
  // 数值改变清空指派相关信息
  cleartOrder = () => {
    this.props.form.setFieldsValue({
      licenseOrganizationName: '',
      licenseOrganizationAddress: '',
      contactName: '',
      contactPhone: '',
    });
  }
  // 年度计划指派
  order = (e) => {
    // 指派方法putOrder
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let id = this.props.match.params.id;
        let licenseOrganizationId = this.state.licenseId;
        let allValue = {
          id,
          licenseOrganizationId,
        };
        confirm({
          title: '确认指派持牌机构，指派后不可更改',
          icon: '',
          onOk: () => this.props.dispatch({
            type: 'dealerLimit/putOrder',
            payload: allValue,
          }).then((res) => {
            goBack(e, this);
          }),
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    });
  }
  // 通过编号获取相关信息
  getRelaInfo = () => {
    let licenseOrganizationNo = '';
    licenseOrganizationNo = this.props.form.getFieldValue('licenseOrganizationNo');
    if (licenseOrganizationNo && licenseOrganizationNo.length === 10) {
      this.props.dispatch({
        type: 'dealerLimit/getLicense',
        payload: { id: licenseOrganizationNo },
      }).then((res) => {
        const data = res.data;
        let licenseOrganizationName = data.licenseOrganizationName;
        let licenseOrganizationAddress = data.licenseOrganizationAddress;
        let contactName = data.contactName;
        let contactMobilePhone = data.contactMobilePhone;
        this.props.form.setFieldsValue({
          licenseOrganizationName,
          licenseOrganizationAddress,
          contactName,
          contactMobilePhone,
        });
        this.setState({
          licenseId: data.id,
        });
      });
    } else {
      this.props.form.setFieldsValue({
        'licenseOrganizationName': '',
        'licenseOrganizationAddress': '',
        'contactName': '',
        'contactMobilePhone': '',
      });
      this.setState({
        licenseId: '',
      });
    }
  }
  addLicense = (value) => {
    let { licenseDatas } = this.state;
    let licenids = licenseDatas.map((item) => {
      return item.licenseOrganizationNo;
    });
    if (!value.licenseOrganizationNo || value.licenseOrganizationNo.length !== 10) {
      return;
    }
    if (licenids.includes(value.licenseOrganizationNo)) {
      message.error('该持牌机构已添加！');
      return;
    }
    this.setState({
      licenseDatas: [...licenseDatas, { ...value, id: licenseDatas.length + 1 }],
    });
  }
  deleteItem = (key) => {
    let datas = [];
    this.state.licenseDatas.map((item) => {
      if (item.id !== key) {
        datas.push(item);
      }
    });
    this.setState({
      licenseDatas: datas,
    });
  }
  render() {
    const { tableData, total, current, licenseDatas } = this.state;
    const { tableLoading } = this.props;
    let isDisabled = true;
    let breadName = '经销商额度明细详情';
    let status = this.state.status;
    let action = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    switch (status) {
    case 5:
      if (isContain(1004002002002)) {
        breadName = '经销商额度明细指派';
        isDisabled = false;
        action.push(
          <Button key="audit" type="primary" onClick={this.order}>指派</Button>,
        );
      }
      break;
    default:
      break;
    }
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
        title: '计划额度编号',
        dataIndex: 'financeCreditNo',
      },
      {
        title: '类型',
        dataIndex: 'license',
        render: (data) => {
          switch (data) {
          case 1:
            return '年度计划';
          case 2:
            return '活动计划';
          default:
            break;
          }
        },
      },
      {
        title: '持牌机构',
        dataIndex: 'license',
      },
      {
        title: '计划额度',
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
            name: '经销商额度管理',
          }, {
            name: '经销商额度明细',
            href: '/creditManage/dealerManage/dealerLimit',
          }, {
            name: breadName,
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
              {renderField(getFieldDecorator, '计划额度编号', 'financeCreditNo', <Input disabled />)}
              {renderField(getFieldDecorator, '融资额度（元）', 'financeCreditAmount', <Input disabled />)}
              {renderField(getFieldDecorator, '额度生效日', 'startDate', <Input disabled />)}
              {renderField(getFieldDecorator, '额度到期日', 'expireDate', <Input disabled />)}
              {renderField(getFieldDecorator, '出资方式', 'type', <Select disabled>
                <Select.Option value={1} key={1}>{'先授信后放款 '}</Select.Option>
                <Select.Option value={2} key={2}>{'授信并放款'}</Select.Option>
              </Select>, { initialValue: 1 })}
              {renderField(getFieldDecorator, '创建时间', 'confirmDate', <Input disabled />)}
              {renderField(getFieldDecorator, '额度类型', '', '固定额度')}
              {/* 只有详情展示下面数据 */}
              <div>
                <Divider />
                {renderField(getFieldDecorator, '计划额度编号', 'financeCreditNo', <Input disabled />)}
                {renderField(getFieldDecorator, '融资额度（元）', 'financeCreditAmount', <Input disabled />)}
                {renderField(getFieldDecorator, '额度生效日', 'startDate', <Input disabled />)}
                {renderField(getFieldDecorator, '额度到期日', 'expireDate', <Input disabled />)}
                {renderField(getFieldDecorator, '出资方式', 'type', <Select disabled>
                  <Select.Option value={1} key={1}>{'先授信后放款 '}</Select.Option>
                  <Select.Option value={2} key={2}>{'授信并放款'}</Select.Option>
                </Select>, { initialValue: 1 })}
                {renderField(getFieldDecorator, '创建时间', 'confirmDate', <Input disabled />)}
                {renderField(getFieldDecorator, '额度类型', '', '临时额度')}
              </div>
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">关联持牌机构信息</div>
              {renderField(getFieldDecorator, '持牌机构编号', 'licenseOrganizationNo', <Input onChange={this.cleartOrder} disabled={isDisabled} onBlur={this.getRelaInfo} />, {
                rules: [
                  { required: true, message: '请输入持牌机构编号' },
                ],
              })}
              {renderField(getFieldDecorator, '持牌机构名称', 'licenseOrganizationName', <Input disabled />)}
              {renderField(getFieldDecorator, '持牌机构地址', 'licenseOrganizationAddress', <Input disabled />)}
              {renderField(getFieldDecorator, '联系人姓名', 'contactName', <Input disabled />)}
              {renderField(getFieldDecorator, '联系人手机号', 'contactMobilePhone', <Input disabled />)}
              <Button type="default" block style={{ marginBottom: '10px' }}
                disabled={isDisabled}
                onClick={() => this.setState({
                  visible: true,
                })}>
                <Icon type="plus" />
                新增持牌机构
              </Button>
              <LicenseTable tableData={licenseDatas} deleteItem={this.deleteItem} isDisabled={isDisabled} />
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
          <LicenseModal visible={this.state.visible} ok={this.addLicense}
            not={this.notexamine}
            app={this} />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
