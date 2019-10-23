import React, { Component } from 'react';
import { DyPage, DyExamineBox, DyFormModal, DyAuditLog  } from 'dy-components';
import { Form, Input,  Row, Modal, message, Spin, Radio } from 'antd';
import { connect } from 'dva';
import { detailAction } from 'src/utils/actionReturn';
import { formItemLayout_1, renderFieldAllLine, gutter } from 'src/utils/gridInit';
import { goBack } from 'src/utils/tools';
const confirm = Modal.confirm;
@connect(({ factor, loading }) => ({
  factor,
  tableLoading: loading.effects['factor/getDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    total: 0,
    tableData: [],
    visible: false,
    notexaminevisible: false,
    logs: [],
    yjType: 1,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id &&(id!=='add')) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'factor/getDetail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      if (res.data.info[key]) {
        formKey[key] = res.data.info[key];
      }
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
    this.setState({
      logs: res.data.logs,
      status: res.data.info.status,
    });
  }
  // 打开审核框
  openModal = (e) => {
    e.preventDefault();
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
  setAction = (data, e) => {
    this.toex(3, data, e);
  }
  // 审核通过
  examine = (e) => {
    this.toex(2, {}, e);
  }
  // 审核接口调用
  toex = async (type, data, e) => {
    e.persist();
    let res = await this.props.dispatch({
      type: 'factor/toExamine',
      payload: {
        id: this.props.match.params.id,
        result: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(e, this);
  }
  // 提交
  handleSubmit = (e, type) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let title;
        if (type === 'add') {
          title = '新增';
        } else if (type === 'edit') {
          title = '修改';
          values.id = this.props.match.params.id;
        } else if (type === 'examine') {
          this.openModal();
          return;
        }
        console.log('values', values);
        confirm({
          title: `确认${title}此项？`,
          onOk: () => {
            this.subAction(values, type, e);
          },
        });
      }
    });
  }
  subAction = async (values, type, e) => {
    e.persist();
    let res;
    if (type === 'add') {
      res = await this.props.dispatch({
        type: 'factor/toAdd',
        payload: values,
      });
    } else if (type === 'edit') {
      res = await this.props.dispatch({
        type: 'factor/toEdit',
        payload: values,
      });
    }
    message.success(res.message);
    goBack(e, this);
  }
  onChange = (e) => {
    let v = e.target.value;
    this.setState({
      yjType: v,
    });
  }
  render() {
    const { tableLoading } = this.props;
    let { actionlist, breadcrumbName, edit } = detailAction({
      type: this.state.status,
      permission: '100700200200',
      add: (e) => { this.handleSubmit(e, 'add'); },
      back: (e) => { goBack(e, this); },
      sh: (e) => { this.openModal(e); },
      ed: (e) => { this.handleSubmit(e, 'edit'); },
    });
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
    const { getFieldDecorator } = this.props.form;
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '风险管理',
        }, {
          name: '风险因素设置',
          href: '/risk/price/factor',
        }, {
          name: `风险因素${breadcrumbName}`,
        }]}
        action={actionlist}
      >
        <Spin spinning={this.state.status?tableLoading:false}>
          <DyAuditLog
            id={this.props.match.params.id} type={37}
          />
          <Form {...formItemLayout_1} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderFieldAllLine(getFieldDecorator, '因素名称', 'name', <Input  maxLength={20} disabled={edit} />, {
                rules: [
                  { required: true, message: '请输入因素名称名称' },
                ],
              })}
              {renderFieldAllLine(getFieldDecorator, '溢价类型', 'typesssssssss',
                <Radio.Group disabled={edit} onChange={this.onChange}>
                  <Radio value={1}>短期溢价</Radio>
                  <Radio value={2}>长期溢价</Radio>
                </Radio.Group>,
                {
                  rules: [
                    { required: true, message: '请选择类型' },
                  ],
                }
              )}
              {this.state.yjType === 1 &&renderFieldAllLine(getFieldDecorator, '因素类型', 'type',
                <Radio.Group disabled={edit}>
                  <Radio value={1}>事前因素</Radio>
                  <Radio value={2}>事后因素</Radio>
                </Radio.Group>,
                {
                  rules: [
                    { required: true, message: '请选择类型' },
                  ],
                }
              )}
              {renderFieldAllLine(getFieldDecorator, '说明', 'explain', <Input.TextArea rows={3} maxLength={10} disabled={edit} />, {
                rules: [
                  { required: true, message: '请输入说明' },
                ],
              })}
            </Row>
          </Form>
          <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
            app={this} />
          <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
            visibleName={'notexaminevisible'} app={this} action={this.setAction} />
        </Spin>
      </DyPage>
    );
  }
}
export default index;
