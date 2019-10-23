import { isContain } from 'src/utils/tools';
import { Button } from 'antd';

/**
 * 通用列表页按钮操作状态
 * @method getAction
 * @param data.permission 权限id 2--修改/再申请 3--详情 4--审核 5--指派
 * @param data.props 模块标记 (根据这个进行特殊模块特殊逻辑判断)
 * @param data.status 当前订单状态 0--待申请 1--待审核 2--审核通过 3--审核不通过 4--已指派
 * @returns {{name: string, target: string}}
 */
function getAction(data) {
  let name = '';
  let target = '';
  switch (data.status - 0) {
  case 1:
    if (isContain(`${data.permission}4`)) {
      name = '审核';
    } else if (isContain(`${data.permission}3`)) {
      name = '详情';
      target = '_blank';
    }
    break;
  case 2:
    if (isContain(`${data.permission}5`) && (data.props === 'order')) {
      name = '指派';
    } else if (isContain(`${data.permission}3`)) {
      name = '详情';
      target = '_blank';
    }
    break;
  case 4:
    if (isContain(`${data.permission}3`)) {
      name = '详情';
      target = '_blank';
    }
    break;
  default:
    if (isContain(`${data.permission}2`)) {
      name = data.props === 'attestation' ? '再申请' : '修改';
    } else if (isContain(`${data.permission}3`)) {
      name = '详情';
      target = '_blank';
    }
    break;
  }
  return { name, target };
}


/**
 * 风险因素列表页启用作废状态
 * @method getRiskAction
 * @param data.permission 权限id 6--启用 7--作废
 * @param data.props 模块标记 (根据这个进行特殊模块特殊逻辑判断)
 * @param data.status 当前订单状态 1--待审核 2--审核通过 3--审核不通过
 * @param data.isIndustrialPark 1--产业园因素 2--非产业园因素 (产业园默认启用不可作废)
 * @returns {{name: string, target: string,rightType: number}}
 */
function getRiskAction(data) {
  let name = '';
  let target = '';
  let rightType = 6;
  switch (data.status - 0) {
  case 2:
    if (isContain(`${data.permission}6`)&&(data.isIndustrialPark === 2)) {
      switch (data.state-0) {
      case 1:
        name = '启用';
        break;
      case 3:
        name = '启用';
        break;
      default:
        break;
      }
    }
    if (isContain(`${data.permission}7`) && (data.isIndustrialPark === 2)) {
      switch(data.state-0) {
      case 2:
        name = '作废';
        rightType = 7;
        break;
      default:
        break;
      }
    }
    break;
  default:
    break;
  }
  return { name, target, rightType };
}


/**
 * 收付款列表页按钮操作状态
 * @method payRecListAction
 * @param data.permission 权限id 1--审核 2--详情 3--确认
 * @param data.props 模块标记 (根据这个进行特殊模块特殊逻辑判断)
 * @param data.status 当前订单状态  1--待审核 2--审核通过 3--审核不通过 4--确认不通过 5--确认通过
 * @returns {{name: string, target: string}}
 */
function payRecListAction(data) {
  let name = '';
  let target = '';
  switch (data.status - 0) {
  case 1:
    if (isContain(`${data.permission}1`)) {
      name = '审核';
    } else if (isContain(`${data.permission}2`)) {
      name = '详情';
    }
    break;
  case 2:
    if (isContain(`${data.permission}3`)) {
      name = '确认';
    } else if (isContain(`${data.permission}2`)) {
      name = '详情';
    }
    break;
  case 4:
    if (isContain(`${data.permission}1`)) {
      name = '审核';
    } else if (isContain(`${data.permission}2`)) {
      name = '详情';
    }
    break;
  default:
    if (isContain(`${data.permission}2`)) {
      name = '详情';
    }
    break;
  }
  return { name, target };
}


/**
 * 通用详情页按钮状态渲染
 * @method detailAction
 * @param data.permission 权限id 1--新增 2--修改 3--详情 4--审核 5--指派
 * @param data.props 模块标记 (根据这个进行特殊模块特殊逻辑判断)
 * @param data.status 当前订单状态  1--待审核 2--审核通过 3--审核不通过 4--已指派
 * @param data.back 返回按钮回调
 * @param data.add 新增按钮回调
 * @param data.sh 审核按钮回调
 * @param data.zp 指派按钮回调
 * @returns {{name: string, target: string, edit: boolean, zpEdit: boolean, breadcrumbName:string}}
 */
function detailAction(data) {
  let actionlist = [<Button key="back" onClick={data.back}>返回</Button>];
  let breadcrumbName = '';
  let type = data.type === null ? -1 : data.type;
  let edit = true;
  let zpEdit = true;
  switch (parseFloat(type)) {
  case -1:
    if (isContain(`${data.permission}1`)) {
      actionlist.push(
        <Button key="edit" type="primary" onClick={data.add}>新增</Button>,
      );
      breadcrumbName = '新增';
      edit = false;
    }
    break;
  case 1:
    if (isContain(`${data.permission}4`)) {
      actionlist.push(<Button key="audit" type="primary" onClick={data.sh}>审核</Button>);
      breadcrumbName = '审核';
    } else {
      breadcrumbName = '详情';
    }
    break;
  case 2:
    if (isContain(`${data.permission}5`) && (data.props === 'order')) {
      actionlist.push(<Button key="audit" type="primary" onClick={data.zp}>指派</Button>);
      breadcrumbName = '指派';
      zpEdit = false;
    } else {
      breadcrumbName = '详情';
    }
    break;
  case 4:
    breadcrumbName = '详情';
    break;
  default:
    if (isContain(`${data.permission}2`)) {
      actionlist.push(<Button key="edit" type="primary"
        onClick={data.ed}>{data.props === 'attestation' ? '再申请' : '修改'}</Button>);
      breadcrumbName = '修改';
      edit = false;
    } else {
      breadcrumbName = '详情';
    }
    break;
  }
  return { actionlist, breadcrumbName, edit, zpEdit };
}


/**
 * 收付款详情页按钮状态渲染
 * @method payRecAction
 * @param data.permission 权限id 1--提交 3--确认
 * @param data.props 模块标记 (根据这个进行特殊模块特殊逻辑判断)
 * @param data.status 当前订单状态  1--待审核 2--审核通过 3--审核不通过 4--已指派
 * @param data.back 返回按钮回调
 * @param data.sh 提交按钮回调
 * @param data.su 确认按钮回调
 * @returns {{name: string, target: string, edit: boolean, sureEdit: boolean, breadcrumbName:string}}
 */
function payRecAction(data) {
  let actionlist = [<Button key="back" onClick={data.back}>返回</Button>];
  let breadcrumbName = '详情';
  let type = data.type === null ? -1 : data.type;
  let edit = true;
  let sureEdit = true;
  switch (type - 0) {
  case 1:
    if (isContain(`${data.permission}1`)) {
      actionlist.push(<Button key="audit" type="primary" onClick={data.sh}>提交</Button>);
      breadcrumbName = '提交';
      edit = false;
    }
    break;
  case 2:
    if (isContain(`${data.permission}3`)) {
      actionlist.push(<Button key="edit" type="primary" onClick={data.su}>确认</Button>);
      breadcrumbName = '确认';
      sureEdit = false;
    }
    break;
  default:
    break;
  }
  return { actionlist, breadcrumbName, edit, sureEdit };
}

module.exports = {
  getAction,
  detailAction,
  payRecListAction,
  getRiskAction,
  payRecAction,
};
