import { timeFormat  } from 'src/utils/tools';
import moment from 'moment';

function resFilter(response, app) {
  let initProps = {
    name: '合同',
    rateName: '业务保证金比例',
    rentName: '融资',
  };
  let res = {
    data: {
      ...response.data.baseVo,
      ...response.data.payVo,
      ...response.data.payeeVo,
      ...response.data.financeVo,
      ...response.data.tickerPayVo,
      payBankBranchName: response.data.payVo.bankBranchName,
      payBankName: response.data.payVo.bankName,
      payBankCardNo: response.data.payVo.bankCardNo,
      payAccountType: response.data.payVo.accountType,
      payeeBankBranchName: response.data.payeeVo?response.data.payeeVo.bankBranchName:'',
      payeeBankName: response.data.payeeVo?response.data.payeeVo.bankName:'',
      payeeAccountType: response.data.payeeVo?response.data.payeeVo.accountType:'',
      payeeBankCardNo: response.data.payeeVo?response.data.payeeVo.bankCardNo:'',
      tickerPayBankBranchName: response.data.tickerPayVo?response.data.tickerPayVo.bankBranchName:'',
      tickerPayBankName: response.data.tickerPayVo?response.data.tickerPayVo.bankName:'',
      tickerPayAccountType: response.data.tickerPayVo?response.data.tickerPayVo.accountType:'',
      tickerPayBankCardNo: response.data.tickerPayVo?response.data.tickerPayVo.bankCardNo:'',
    },
  };
  res.data = timeFormat(res.data);
  app.setState({
    payDayShow: res.data.interestType === 1 ? true : false,
  });
  switch (res.data.status) {
  case 1:
    app.setState({
      type: 1,
    });
    break;
  case 2:
    app.setState({
      type: 2,
    });
    break;
  case 3:
    app.setState({
      examineStatus: 3,
      type: 3,
    });
    break;
  case 4:
    app.setState({
      type: 4,
    });
    break;
  case 5:
    app.setState({
      type: 5,
    });
    break;
  default:
    break;
  }
  if (res.data.sourceType===2) {
    initProps = {
      name: '质/抵押合同',
      rateName: '质/抵押率',
      rentName: '租赁',
    };
  }
  // 返回资金类型 风险和票据的期末退款不能选择审核不通过状态（10,11,12的状态）
  initProps.receiptPayType = res.data.receiptPayType;
  // 返回支付方式
  initProps.payWay = res.data.payWay;
  app.setState({
    initProps: initProps,
  });
  let formKey = app.props.form.getFieldsValue();
  for (let key in formKey) {
    if (key === 'status') {
      switch (res.data[key]) {
      case 1:
        formKey[key] = 2;
        break;
      case 2:
        formKey[key] = 5;
        break;
      default:
        formKey[key] = res.data[key];
        break;
      }
    } else if (key === 'date' && (res.data.date)) {
      formKey[key] = moment(res.data[key], 'YYYY-MM-DD');
    } else if (key === 'endDate' && (res.data.endDate)){
      formKey[key] = moment(res.data[key], 'YYYY-MM-DD');
    }
    else {
      formKey[key] = res.data[key];
    }
  }

  app.setState({
    fileList: formKey.fileList,
    organizationType: formKey.organizationType,
  });
  app.props.form.setFieldsValue({
    ...formKey,
  });
  return { formKey, initProps };
}
module.exports = {
  resFilter,
};