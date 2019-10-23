import React, { Component } from 'react';
import { Form, Input, Row, Col, Radio, Button, message, Tabs, Table } from 'antd';
import { DyPage, DyFormModal, DyUpload, DyExamineBox, DyControl } from 'dy-components';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import TicketLog from 'src/pages/finances/ticket/components/TicketLog';
import FileModal from 'src/pages/finances/ticket/components/FileModal';
import { isContain, getFileList, timeFormat, goBack } from 'src/utils/tools';
import { ticketT, ticketAuditT } from 'src/utils/statusReturn';
import { formItemLayout, gutter } from 'src/utils/gridInit';
const { TextArea } = Input;
const { TabPane } = Tabs;
@connect(({ ticketTrade, loading }) => ({
  ticketTrade,
  detailLoading: false,
}))
@Form.create()
class Index extends Component {
  state = {
    actionType: 'add',
    ticketType: '1',
    dealType: 'receive',
    uploadShow: false,
    fileVoListProp: [],
    fileParamList: [],
    passTicketList: [],
    rejectTicketList: [],
    billAuditLogVoList: [],
    openTicketTypeList: [],
    checkTicketTypeList: [],
    ticketId: '',
    visible: false,
    notexaminevisible: false,
    passAmount: '',
    rejectAmount: '',
    maxValue: '',
  }

  componentDidMount() {
    let ids = this.props.match.params.ids;
    let actionType = this.props.history.location.query.actionType;
    let ticketType = this.props.history.location.query.ticketType;
    let dealType = this.props.history.location.query.dealType;
    let maxValue = this.props.history.location.query.maxValue;
    if (maxValue) {
      maxValue = Number(maxValue.replace(',', ''));
    }
    this.getTickets(ids);
    this.setState({
      actionType,
      ticketType,
      dealType,
      maxValue,
    });
    // 请求详情用列表中该条数据的id 即为id
    if (actionType === 'detail') {
      switch (dealType) {
      case 'receive':
        this.getDetail(ids, 'getRDetail');
        break;
      case 'open':
        this.getDetail(ids, 'getODetail');
        break;
      default:
        break;
      }
    }
    if (actionType === 'check') {
      this.getTicket(ids);
    }

  }
  // 获取票据类型数组
  getTickets = async (id) => {
    let res = await this.props.dispatch({
      type: 'ticketTrade/getTickets',
      payload: { id },
    });
    const { openTicketTypeList, checkTicketTypeList } = res.data;
    this.setState({
      openTicketTypeList: openTicketTypeList ? openTicketTypeList : [],
      checkTicketTypeList: checkTicketTypeList ? checkTicketTypeList : [],
    });
  }
  // 获取票据详情
  getTicket = async (id) => {
    let res = await this.props.dispatch({
      type: 'ticketTrade/getTicketInfo',
      payload: { id },
    });
    this.setState({
      fileParamList: getFileList(res.data.fileVoList),
      ticketId: res.data.id,
    });
    this.props.form.setFieldsValue({
      ...res.data,
      ticketType: res.data.ticketType.toString(),
    });
  }
  // 获取详情
  getDetail = async (id, type) => {
    let res = await this.props.dispatch({
      type: `ticketTrade/${type}`,
      payload: { id },
    });
    const data = res.data;
    this.setState({
      passAmount: data.passAmount,
      rejectAmount: data.rejectAmount,
      passTicketList: data.passTicketList || [],
      rejectTicketList: data.rejectTicketList || [],
      billAuditLogVoList: data.billAuditLogVoList || [],
    });
  }
  // 提交新增
  handleSubmit = (e) => {
    e.preventDefault();
    let { dealType } = this.state;
    let tradeBillRentId = this.props.match.params.ids;
    let fileParamList = this.state.fileParamList;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let allValue = {
          ...values,
          tradeBillRentId,
          fileParamList,
        };
        this.props.dispatch({
          type: dealType === 'receive' ? 'ticketTrade/putReceive' : 'ticketTrade/putOpen',
          payload: allValue,
        }).then((res) => {
          message.success('操作成功！');
          goBack(e, this);
        });
      }
    });
  }
  // 打开审核框
  openModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  }
  // 审核不通过
  setAction = (data) => {
    this.toex(3, data);
  }
  // 审核通过
  examine = () => {
    this.toex(2);
  }
  // 审核接口调用
  toex = async (type, data) => {
    let { dealType, ticketId } = this.state;
    let res = await this.props.dispatch({
      type: dealType === 'receive' ? 'ticketTrade/putAuditR' : 'ticketTrade/putAuditO',
      payload: {
        ticketId: ticketId,
        status: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(null, this);
  }

  // 渲染表单组件
  renderField = (label, key, component, options = {
    rules: [
      { required: true, whitespace: true, message: '不能为空' },
    ],
  }, col = 18) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={col}>
        <Form.Item
          label={label}
        >
          {key ? getFieldDecorator(key, options)(component) : component}
        </Form.Item>
      </Col>
    );
  }
  // 显示附件弹窗
  uploadInfo = (fileVoList) => {
    this.setState({
      uploadShow: true,
      fileVoListProp: getFileList(fileVoList),
    });
  }
  checks = (r, v, callback) => {
    let { maxValue } = this.state;
    console.log(maxValue);
    if (v > maxValue) {
      callback(`最大金额为${maxValue}`);
    }
    if (!RegExp.Money.pattern.test(v)) {
      callback('必须大于0且最多两位小数，整数不超过15位');
    }
    callback();
  }
  render() {
    const formData = [
      {
        key: 'remark',
        render() {
          return <Input.TextArea maxLength={40} placeholder="审核不通过原因" />;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
    ];
    const { fileParamList, actionType, ticketType, dealType, rejectAmount, passAmount, billAuditLogVoList, rejectTicketList, passTicketList, openTicketTypeList, checkTicketTypeList } = this.state;
    const { detailLoading } = this.props;
    let radioArr = [];
    if (dealType === 'receive') {
      radioArr = checkTicketTypeList;
    } else {
      radioArr = openTicketTypeList;
    }
    let id = this.props.match.params.id;
    let isDisabled = true;
    let action = [
      <Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>,
    ];
    if (isContain(dealType === 'receive' ? 1005004001003 : 1005004001008) && actionType === 'add') {
      action.push(<Button key="add" type="primary" onClick={this.handleSubmit}>新增</Button>);
      isDisabled = false;
    }
    if (isContain(dealType === 'receive' ? 1005004001004 : 1005004001009) && actionType === 'check') {
      action.push(<Button key="edit" type="primary" onClick={this.openModal}>审核</Button>);
    }

    const columns = [{
      title: '发票金额（元）',
      dataIndex: 'ticketAmount',
    }, {
      title: '税票类型',
      dataIndex: 'ticketType',
      render: (txt) => {
        return ticketT(txt);
      },
    }, {
      title: '审核结果',
      dataIndex: 'status',
      render: (txt) => {
        return ticketAuditT(txt);
      },
    }, {
      title: '审核时间',
      dataIndex: 'updateTime',
    }, {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
    }, {
      title: '附件',
      render: (record) => {
        return (
          <Button onClick={() => this.uploadInfo(record.fileVoList)} type="primary" size="small">查看</Button>
        );
      },
    },
    ];
    return (
      <DyControl permission={dealType === 'receive' ? '1005004001002' : '1005004001007'} key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '财务管理',
          }, {
            name: '票务管理',
          }, {
            name: '贸易票据',
            href: '/finances/ticket/trade',
          }, {
            name: '贸易票据详情',
            href: `/finances/ticket/trade/${id}/${dealType}`,
          }]}
          action={action}
        >
          {actionType !== 'detail' && (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Row gutter={gutter}>
                <div className="block-title">发票信息</div>
                {this.renderField('发票金额（元）', 'ticketAmount', <Input disabled={isDisabled} />, {
                  rules: [
                    { required: true, validator: this.checks },
                  ],
                })}
                {this.renderField('税票类型', 'ticketType',
                  <Radio.Group disabled={isDisabled || ticketType === '1'}>
                    {radioArr.includes(1) && <Radio value={'1'} >{'增值税'}</Radio>}
                    {radioArr.includes(2) && <Radio value={'2'} >{'零税'}</Radio>}
                    {radioArr.includes(3) && <Radio value={'3'} >{'其他'}</Radio>}
                  </Radio.Group>, {
                    initialValue: '1',
                    rules: [
                      { required: true, message: '必选' },
                    ],
                  })}
                {this.renderField('附件', 'fileParamList',
                  <DyUpload app={this}
                    fileList={fileParamList}
                    action={'global/toUpload'}
                    fileListName={'fileParamList'}
                    status={isDisabled}
                  />, {
                    rules: [
                      { required: true, message: '不能为空' },
                    ],
                  })}
                {this.renderField('备注', 'remark', <TextArea maxLength={20} disabled={isDisabled} />, {
                  rules: [
                    { required: true, message: '不能为空' },
                  ],
                })}
              </Row>
            </Form>
          )}
          {actionType === 'detail' && (
            <Form {...formItemLayout} >
              <Row gutter={gutter}>
                <TicketLog dataSource={billAuditLogVoList} />
                <div className="block-title" >发票信息</div>
                <Col span={12}>
                  <Form.Item label="审核通过金额（元）">
                    <Input disabled={isDisabled} value={passAmount} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="审核不通过金额（元">
                    <Input disabled={isDisabled} value={rejectAmount} />
                  </Form.Item></Col>
              </Row>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="审核通过" key="1">
                  <Table
                    rowKey="id"
                    loading={detailLoading}
                    columns={columns}
                    dataSource={timeFormat(passTicketList)}
                    pagination={false}
                    onChange={this.onTableChange}
                    size="small"
                  />
                </TabPane>
                <TabPane tab="审核不通过" key="2">
                  <Table
                    rowKey="id"
                    loading={detailLoading}
                    columns={columns}
                    dataSource={timeFormat(rejectTicketList)}
                    pagination={false}
                    onChange={this.onTableChange}
                    size="small"
                  />
                </TabPane>
              </Tabs>
            </Form>
          )}

          <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
            app={this} />
          <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
            visibleName={'notexaminevisible'} app={this} action={this.setAction} />
          <FileModal
            uploadShow={this.state.uploadShow}
            fileVoListProp={this.state.fileVoListProp}
            close={() => this.setState({ uploadShow: false })}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;
