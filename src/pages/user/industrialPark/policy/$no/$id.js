
import React, { Component } from 'react';
import { DyPage, DyUpload, DyAuditLog, DyExamineBox, DyFormModal } from 'dy-components';
import { Form, Input, Col, Row, Modal, message, Spin, Checkbox, Cascader } from 'antd';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import 'src/pages/user/index.less';
import { detailAction } from 'src/utils/actionReturn';
import { getFileList, goBack } from 'src/utils/tools';
import options from 'src/utils/regionData';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;

const pagePermission = '1001005002';
const pageProps = 'industrialPark';


const formData = [
  {
    key: 'remark',
    render() {
      return <Input.TextArea maxLength={40} placeholder="审核不通过原因"/>;
    },
    options: {
      rules: [{ required: true, message: '必填!' }],
    },
  },
];

@connect(({ attestation, loading }) => ({
  attestation,
  detailLoading: loading.effects[`${pageProps}/getPolicyDetail`],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    type: null,
    visible: false,
    showRequireSelectReceiveAndOfferBillType: false,
    fileParamList: [],
    industrialParkNo: '',
    industrialParkId: 0,
    checkboxValues:
      {
        // 接收增值税
        receiveVAT: false,
        receiveVATRatio: null,
        // 接收零税
        receiveZT: false,
        receiveZTRatio: null,
        // 接收其他
        receiveOthers: false,
        receiveOthersRatio: null,
        // // 开增值税
        // offerVAT: false,
        // offerVATRatio: null,
        // // 开零税
        // offerZT: false,
        // offerZTRatio: null,
        // // 开其他
        // offerOthers: false,
        // offerOthersRatio: null,
        // 场地
        placeSubsidy: false,
        placeSubsidyRemark: null,
        // 人才公寓
        talentApartmentSubsidy: false,
        talentApartmentSubsidyRemark: null,
        // 服务费退返
        serviceChargeBacklash: false,
        serviceChargeBacklashRatio: null,
        // 税收退返
        taxBacklash: false,
        taxBacklashRatio: null,
        othersRemark: null,
      },
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    let status = id === 'add' ? null : true;
    this.setState({
      status: status,
      industrialParkNo: this.props.location.query.industrialParkNo,
    }, () => {
      if (status) {
        console.log('componentDidMount checkboxValues = ', this.state.checkboxValues);
        this.getDetail(id);
      } else {
        this.props.form.setFieldsValue({});
      }
    });
  }

  renderCustomCheckboxWithRatio = (label, editable, checkValueKey, needInput, placeholder = '请输入', inputValueKey = 'defaultInputValueKey') => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let checked = getFieldValue(checkValueKey);
    return (
      <Row style={{ marginBottom: '5px' }}>
        <Col span={4}>
          <Form.Item>
            {getFieldDecorator(checkValueKey, {
              valuePropName: 'checked',
            })(<Checkbox
              disabled={!editable}>{label}</Checkbox>)}
          </Form.Item>
        </Col>
        {
          needInput ? (
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator(inputValueKey, {
                  rules: [
                    {
                      pattern: /^([1-9]\d?(\.\d{1,2})?|0.\d{1,2}|100)$/,
                      message: '必须大于0且不超过100，最多两位小数',
                    },
                  ],
                })(<Input disabled={(!checked) || (!editable)} placeholder={placeholder} suffix="%"/>)}
              </Form.Item>
            </Col>
          ) : ''
        }

      </Row>
    );
  };

  renderCustomCheckbox = (label, placeholder, editable, checkValueKey, inputValueKey) => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let checked = getFieldValue(checkValueKey);
    return (
      <Row style={{ marginBottom: '5px' }}>
        <Col span={4}>
          <Form.Item>
            {getFieldDecorator(checkValueKey, {
              valuePropName: 'checked',
            })(<Checkbox disabled={!editable}>{label}</Checkbox>)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            {getFieldDecorator(inputValueKey)(<Input disabled={(!checked) || (!editable)} placeholder={placeholder}/>)}
          </Form.Item>
        </Col>
      </Row>
    );
  };

  loadIndustrialInfo = async (industrialParkNo) => {
    let res = await this.props.dispatch({
      type: `${pageProps}/getIndustrialParkDetailByNo`,
      payload: { no: industrialParkNo },
    });
    let areaCode = [res.data.provinceCode, res.data.cityCode, res.data.regionCode];

    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      if (res.data[key]) {
        formKey[key] = res.data[key];
      }
    }
    this.setState(
      {
        industrialParkId: res.data.id,
      },
    );
    this.props.form.setFieldsValue({
      ...formKey, areaCode: areaCode,
    });
  };

  getDetail = async (policyId) => {
    this.loadIndustrialInfo(this.props.match.params.no);
    let [policyListRes, fileListRes] = await Promise.all([
      this.props.dispatch({
        type: `${pageProps}/getPolicyDetail`,
        payload: { id: policyId },
      }),
      this.props.dispatch({
        type: `${pageProps}/getIndustrialParkPolicyFiles`,
        payload: { id: policyId },
      }),
    ]);

    let fileParams;
    if (fileListRes.data) {
      fileParams = getFileList(fileListRes.data);
      this.setState({
        fileParamList: fileParams,
      });
    }

    if (policyListRes.data.policyVoList) {
      let temp = {};
      (policyListRes.data.policyVoList).map((item) => {
        console.log('getDetail 1temp :', temp);
        console.log('getDetail policyVoList map :', item.policyType, item.subType, item.numValue, item.strValue);
        switch (item.policyType) {
        case 11:
          switch (item.subType) {
          case 1:
            temp.receiveVAT = true;
            temp.receiveVATRatio = item.numValue;
            break;
          case 2:
            temp.receiveZT = true;
            temp.receiveZTRatio = item.numValue;
            break;
          case 99:
            temp.receiveOthers = true;
            temp.receiveOthersRatio = item.numValue;
            break;
          default:
            break;
          }
          break;
        case 21:
          switch (item.subType) {
          case 1:
            temp.placeSubsidy = true;
            temp.placeSubsidyRemark = item.strValue;
            break;
          case 2:
            temp.talentApartmentSubsidy = true;
            temp.talentApartmentSubsidyRemark = item.strValue;
            break;
          default:
            break;
          }
          break;
        case 31:
          switch (item.subType) {
          case 1:
            temp.serviceChargeBacklash = true;
            temp.serviceChargeBacklashRatio = item.numValue;
            break;
          case 2:
            temp.taxBacklash = true;
            temp.taxBacklashRatio = item.numValue;
            break;
          default:
            break;
          }
          break;
        case 99:
          temp.othersRemark = item.strValue;
          break;
        default:
          break;
        }
        console.log('getDetail 2temp = ', temp);
      });
      console.log('getDetail final temp = ', temp);
      this.setState({
        checkboxValues: temp,
      });
    }
    // let formKey = this.props.form.getFieldsValue();
    // for (let key in this.state.checkboxValues) {
    //   if (res.data[key]) {
    //     formKey[key] = res.data[key];
    //   }
    // }
    this.setState({
      status: policyListRes.data.status,
      // fileList: formKey.fileParamList,
    });

    console.log('getDetail this.state.checkboxValues =', this.state.checkboxValues);
    this.props.form.setFieldsValue({
      ...this.state.checkboxValues, fileParamList: fileParams,
    });
  };

  // numValue  number
  // 非必须
  // 数值类型设置结果
  // policyType  number
  // 必须
  // 政策类型，目前包括11、接收票务类型，12、开除票务类型，21、实物，31、货币，99、其他
  // strValue  string
  // 非必须
  // 字符串类型返回值，最长800个字符
  // subType number
  // 必须
  // 子类型（所有“其他”均为99），
  // 政策类型为税务，子类型为1、增值税，2、零税
  // 政策类型为实物，子类型为1、场所，2、人才公寓
  // 政策类型为货币，子类型为1、服务费，2、税收

  // 提交审核
  handleSubmit = (e, type) => {
    console.log('start submit ...');
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {

      let policyList = [];
      let require11 = 0;// 用户判断是否勾选了开票以及出票类型，必选
      // let require12 = 0;

      if (values.receiveVAT === true) {
        policyList.push({
          policyType: 11,
          subType: 1,
          numValue: values.receiveVATRatio,
        });
        policyList.push({
          policyType: 12,
          subType: 1,
          numValue: values.receiveVATRatio,
        });
        require11++;
      }
      if (values.receiveZT === true) {
        policyList.push({
          policyType: 11,
          subType: 2,
          numValue: values.receiveZTRatio,
        });
        policyList.push({
          policyType: 12,
          subType: 2,
          numValue: values.receiveZTRatio,
        });
        require11++;
      }
      if (values.receiveOthers === true) {
        policyList.push({
          policyType: 11,
          subType: 99,
          numValue: values.receiveOthersRatio,
        });
        policyList.push({
          policyType: 12,
          subType: 99,
          numValue: values.receiveOthersRatio,
        });
        require11++;
      }

      if (require11 < 1) {
        this.setState({ showRequireSelectReceiveAndOfferBillType: true });
        return;
      }

      if (!err) {
        let title;
        if (type === 'add') {
          title = '新增';
          values.industrialParkId = this.state.industrialParkId;
        } else {
          title = '提交';
          values.industrialParkId = this.state.industrialParkId;
        }
        // if (values.offerVAT === true) {
        //   policyList.push({
        //     policyType: 12,
        //     subType: 1,
        //     numValue: values.offerVATRatio,
        //   });
        //   require12++;
        // }
        // if (values.offerZT === true) {
        //   policyList.push({
        //     policyType: 12,
        //     subType: 2,
        //     numValue: values.offerZTRatio,
        //   });
        //   require12++;
        // }
        // if (values.offerOthers === true) {
        //   policyList.push({
        //     policyType: 12,
        //     subType: 99,
        //     numValue: values.offerOthersRatio,
        //   });
        //   require12++;
        // }
        if (values.placeSubsidy === true) policyList.push({
          policyType: 21,
          subType: 1,
          strValue: values.placeSubsidyRemark,
        });
        if (values.talentApartmentSubsidy === true) policyList.push({
          policyType: 21,
          subType: 2,
          strValue: values.talentApartmentSubsidyRemark,
        });
        if (values.serviceChargeBacklash === true) policyList.push({
          policyType: 31,
          subType: 1,
          numValue: values.serviceChargeBacklashRatio,
        });
        if (values.taxBacklash === true) policyList.push({
          policyType: 31,
          subType: 2,
          numValue: values.taxBacklashRatio,
        });

        if (values.othersRemark) policyList.push({
          policyType: 99,
          subType: 99,
          strValue: values.othersRemark,
        });

        // if (require12 < 1) {
        //   message.error('请选择开出票务类型');
        //   return;
        // }

        values = {
          policyList: policyList,
          fileParamList: values.fileParamList,
          industrialParkId: values.industrialParkId,
        };

        confirm({
          title: `确认${title}此项？`,
          onOk: () => {
            this.examineAction(values, type, e);
          },
        });
      } else {
        message.error('根据提示修改录入内容');
      }
    });
  };

  examineAction = async (values, type, e) => {
    e.persist();
    console.log('examineAction values = ', JSON.stringify(values));
    let res = type === 'add' ? (
      await this.props.dispatch({
        type: `${pageProps}/addPolicy`,
        payload: values,
      })
    ) : (
      await this.props.dispatch({
        type: `${pageProps}/updatePolicy`,
        payload: values,
      })
    );
    message.success(res.message);
    goBack(e, this);
  };
  // 打开审核框
  openModal = (e) => {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  };
  ;
  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  };
  // 审核不通过
  setAction = (data, e) => {
    this.toex(2, data, e);
  };
  // 审核通过
  examine = (e) => {
    this.toex(1, {}, e);
  };
  // 审核接口调用
  toex = async (passed, data, e) => {
    e.persist();
    let res = await this.props.dispatch({
      type: `${pageProps}/auditPolicy`,
      payload: {
        id: this.props.match.params.id,
        auditResult: passed,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(e, this);
  };
  industrialParkNoChange = (val) => {
    let value = val.target.value;
    let reg = RegExp.IndustrialParkNo.pattern;
    if (reg.test(value)) {
      this.setState({
        industrialParkNo: value,
      }, () => {
        this.loadIndustrialInfo(value);
      });
    } else {
      message.error('产业园编号输入不正确');
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
    console.log('this.props.match.params.id', this.props.match.params.id);
    let { actionlist, breadcrumbName, edit } = detailAction({
      type: this.state.status,
      permission: `${pagePermission}00`,
      props: pageProps,
      add: (e) => {
        this.handleSubmit(e, 'add');
      },
      back: (e) => {
        goBack(e, this);
      },
      sh: (e) => {
        this.openModal(e);
      },
      ed: (e) => {
        this.handleSubmit(e, 'edit');
      },
    });

    return (
      <DyPage className="user-manage-detail"
        breadcrumb=
          {
            [
              {
                name: '用户管理',
              },
              {
                name: '产业园管理',
                href: '/user/attestation',
              },
              {
                name: `产业园政策管理${breadcrumbName}`,
              },
            ]
          }
        action=
          {
            actionlist
          }
      >
        <Spin spinning={this.state.status ? detailLoading : false}>
          <DyAuditLog
            id={this.props.match.params.id} type={36}
          />
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '产业园编号', 'no', <Input disabled={this.props.match.params.id !== 'add'}
                onBlur={(e) => this.industrialParkNoChange(e)}/>,
              {
                rules: [
                  { required: true, message: '请输入产业园名称' },
                ],
              },
              )}
              {renderField(getFieldDecorator, '产业园名称', 'name', <Input disabled/>)}
              {renderField(getFieldDecorator, '统一社会信用代码', 'uscc', <Input disabled/>)}
              <Col span={24}>
                <Form.Item label="公司经营地址" {...formItemLayout_1}>
                  {getFieldDecorator('officeAddress')(<Input.TextArea rows={2} disabled/>)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Col span={12}>
                  <Form.Item
                    label="所属区域"
                  >
                    {getFieldDecorator('areaCode', {
                      rules: [
                        { type: 'array' },
                      ],
                    })(<Cascader showSearch placeholder="请选择地址" options={options}
                      disabled onChange={this.onAreaChange}/>)}
                  </Form.Item>
                </Col>
                {renderField(getFieldDecorator, '', 'registrationAddress', <Input placeholder="镇/街道/区" maxLength={50}
                  disabled/>)}
              </Col>
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">优惠政策</div>
              <div className="block-inline-title">税务补贴</div>
              <div style={{ marginLeft: '20px' }}>
                <Col span={24}>
                  <div className="block-inline-sub-title-require">接收/开出票务类型</div>
                  {this.state.showRequireSelectReceiveAndOfferBillType ?
                    <div style={{ color: ' #f5222d' }}>请选择接收/开出票务类型</div> : ''}
                  {this.renderCustomCheckboxWithRatio('增值税', !edit,
                    'receiveVAT', true, '请输入增值税税率', 'receiveVATRatio')}
                  {this.renderCustomCheckboxWithRatio('零税', !edit,
                    'receiveZT', false)}
                  {this.renderCustomCheckboxWithRatio('其他', !edit,
                    'receiveOthers', false)}
                </Col>
                {/* <Col span={12}>*/}
                {/* <div className="block-inline-sub-title-require">开出票务类型及比例</div>*/}
                {/* {this.renderCustomCheckboxWithRatio('增值税', !edit,*/}
                {/* 'offerVAT', true, '请输入增值税税率', 'offerVATRatio')}*/}
                {/* {this.renderCustomCheckboxWithRatio('零税', !edit,*/}
                {/* 'offerZT', false)}*/}
                {/* {this.renderCustomCheckboxWithRatio('其他', !edit,*/}
                {/* 'offerOthers', false)}*/}
                {/* </Col>*/}
              </div>
              <div className="block-inline-title">实物补贴</div>
              <div style={{ marginLeft: '20px' }}>
                <Col span={24}>
                  {this.renderCustomCheckbox('场所', '备注', !edit,
                    'placeSubsidy', 'placeSubsidyRemark')}
                  {this.renderCustomCheckbox('人才公寓', '备注', !edit,
                    'talentApartmentSubsidy', 'talentApartmentSubsidyRemark')}
                </Col>
              </div>
              <div className="block-inline-title">货币补贴</div>
              <div style={{ marginLeft: '20px' }}>
                <Col span={24}>
                  {this.renderCustomCheckboxWithRatio('服务费退返', !edit,
                    'serviceChargeBacklash', true, '请输入比例', 'serviceChargeBacklashRatio')}
                  {this.renderCustomCheckboxWithRatio('税收退返', !edit,
                    'taxBacklash', true, '请输入比例', 'taxBacklashRatio')}
                </Col>
              </div>
              <div className="block-inline-title">其他</div>
              <div style={{ marginLeft: '20px' }}>
                <Col span={4}>
                  {getFieldDecorator('othersRemark')(<Input placeholder="输入其他政策" disabled={edit}/>)}
                </Col>
              </div>
            </Row>
            <Row gutter={gutter} style={{ marginTop: '10px' }}>
              <div className="block-title">附件</div>
              {renderField(getFieldDecorator, '', 'fileParamList',
                <DyUpload app={this}
                  fileList={this.state.fileParamList}
                  fileListName={'fileParamList'} status={edit}
                />)}
            </Row>
          </Form>
        </Spin>
        <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
          app={this}/>
        <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
          visibleName={'notexaminevisible'} app={this}  action={this.setAction}/>
      </DyPage>
    );
  }
}

export default index;
