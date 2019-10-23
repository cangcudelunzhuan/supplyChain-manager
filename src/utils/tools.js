import formats from 'src/utils/filter';
import {
  account,
  moneyArr,
  filterArr,
  public_key,
  private_key,
} from 'src/utils/formatKey';
import md5 from 'md5';
import { routerRedux } from 'dva/router';
const NodeRSA = require('node-rsa');

// Generate four random hex digits.
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

// 生成uuid
function guid() {
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
};

// 递归出第一个菜单路径
function getFirstMenuPath(menus) {
  if ((menus.children || []).length > 0) {
    return `${menus.path}${getFirstMenuPath(menus.children[0])}`;
  } else {
    return menus.path;
  }
}

/**
 * 获取当前路由线性数据
 * @param {*} menus
 * @param {*} currentPath
 */
function getPathName(menus, currentPath) {
  const pathArray = currentPath.split('/').slice(1);
  let temp = menus;
  let pathName = [];
  pathArray.forEach((path) => {
    if (temp) {
      const match = temp.find((item) => item.path === `/${path}`);
      pathName.push(match.name);
      temp = match.children;
    }

  });
  return pathName;
}

/** 获取滚动条宽度 */
function getScrollWidth() {
  var noScroll, scroll, oDiv = document.createElement('DIV');
  oDiv.style.cssText = 'position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;';
  noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = 'scroll';
  scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  return noScroll - scroll;
}

// 计算出有几个不重复的value
function calcuUniqNum(datas, keys) {
  let newdata = datas.map((item, index) => {
    return item[keys];
  });
  return (new Set(newdata)).size;
}

// 计算出有几个不重复的value
function calcuTotal(nums) {
  let sum = 0;
  nums.forEach((item) => {
    sum += item;
  });
  return sum;
}

// 递归id权限
function getIds(data, arr) {
  return data.map((item) => {
    if (item.children) {
      getIds(item.children, arr);
    }
    arr.push(item.permission);
  });
};
function getAllIds(data) {
  var arr = [];
  getIds(data, arr);
  return arr;
};

// 是否包含所属权限
function isContain(ids) {
  let id = ids + '';
  let AuthList = JSON.parse(window.localStorage.getItem('AuthList'));
  if (AuthList && AuthList.indexOf(id) !== -1) {
    return true;
  }
  return false;
}
// 获取附件数据，生成可展示的列表
function getFileList(arr) {
  if (!arr) {
    return;
  }
  let brandFileParams = [];
  arr.map((item, i) => {
    brandFileParams.push({
      uid: i,
      name: item.fileName,
      status: 'done',
      response: 'success', // custom error message to show
      url: item.fileUrl,
      ...item,
    });
  });
  return brandFileParams;
}

// 输入框银行卡号输入四位分割展示
function setAccount(name, app) {
  let value = app.props.form.getFieldValue(name);
  if (value) {
    app.props.form.setFieldsValue({
      [name]: formats.formatBankNumber(value),
    });
  }
}

// 输入框金额输入转换千位符
function setMoney(name, app) {
  let value = app.props.form.getFieldValue(name);
  if (value) {
    app.props.form.setFieldsValue({
      [name]: setThousands(value),
    });
  }
}

// 弹出层里输入框金额输入转换千位符
const formDataSetMoney = async (v, app)=>{
  let recordData =  app.child.props.form.getFieldsValue(); // 从当前实例获取弹出层form值
  recordData[v.target.id] = setThousands(v.target.value); // 转换金额字段
  await app.props.dispatch({ // 赋值给form
    type: 'global/updateState',
    payload: { recordData },
  });
};

// 千位副格式返回
function setThousands(value) {
  value = value.replace(/[^\d.]/g, '');  // 清除“数字”和“.”以外的字符
  value = value.replace(/^\.{1,}/g, '');  // 验证第一个字符是数字而不是.
  value = value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  return formats.formatThousands(value); // 千分位转换
}

// 加密方法
function encrypt(data) {
  var key = new NodeRSA();
  key.setOptions({ encryptionScheme: 'pkcs1' });
  key.importKey(public_key, 'pkcs8-public');
  let cipherText = key.encrypt(data, 'base64');
  return cipherText;

}
// 解密方法
function decrypt(response) {
  var key = new NodeRSA();
  key.setOptions({ encryptionScheme: 'pkcs1' });
  key.importKey(private_key, 'pkcs8-private');
  let rawText = key.decrypt(response, 'utf8');
  return rawText;
}

// 是否匹配日期方法
function getKey(key, filterArr, keyValue) {
  let res = { status: false, type: 'formatDate' };
  filterArr.map((item) => {
    let reg = /^(1((\d{9})|(\d{12})))$/;
    if (key.indexOf(item) !== -1 && reg.test(keyValue)) {
      if (item === 'Time') {
        (key === 'deliveryTime') ? (res.type = 'formatDate') : (res.type = 'formatDateTime');
      }
      else if(key.indexOf('Time')===-1) {
        res.type = 'formatDate';
      }
      res.status = true;
    }
  });
  return res;
}

// 是否匹关键字通用方法（除日期外）
function getmoney(key, filterArr) {
  let res = { status: false };
  filterArr.map((item) => {
    if (key.indexOf(item) !== -1 && key.indexOf('Name') === -1) {
      res.status = true;
    }
  });
  return res;
}

// 对返回的数据做(日期-千位符-银行卡四位分割)格式化
function timeFormat(data) {
  if (!data) {
    return;
  }
  if (Array.isArray(data)) {
    data.map((item, i) => {
      for (let k in item) {
        // 日期
        let res = getKey(k, filterArr, item[k]);
        if (res.status) {
          item[k] = (res.type === 'formatDateTime') ? formats.formatDateTime(item[k]) : formats.formatDate(item[k]);
        }
        // 金额
        let moneyStatus = getmoney(k, moneyArr);
        if (moneyStatus.status && typeof (item[k]) === 'number' && (/^[0-9]*$/.test(`${item[k]}`))) {
          item[k] = formats.formatThousands(item[k]);
        }
        // 银行卡
        let accountStatus = getmoney(k, account);
        if (accountStatus.status && typeof (item[k]) === 'string' && (/^[0-9]*$/.test(`${item[k]}`))) {
          item[k] = formats.formatBankNumber(item[k]);
        }
      }
      if (item instanceof Object) {
        item.index = i + 1;
      }
    });
  } else {
    let item = data || {};
    for (let k in item) {
      let res = getKey(k, filterArr, item[k]);
      if (res.status) {
        data[k] = (res.type === 'formatDateTime') ? formats.formatDateTime(item[k]) : formats.formatDate(item[k]);
      }
      let accountStatus = getmoney(k, account);
      if (accountStatus.status && typeof (item[k]) === 'string' && (/^[0-9]*$/.test(`${item[k]}`))) {
        data[k] = formats.formatBankNumber(`${item[k]}`);
      }
      let moneyStatus = getmoney(k, moneyArr);
      if (moneyStatus.status && typeof (item[k]) === 'number' && (/^[0-9]*$/.test(`${item[k]}`))) {
        data[k] = formats.formatThousands(item[k]);
      }
    }
  }
  return data;
}


// 数组值md5加密
const passMd5 = (data) => {
  for (let k in data) {
    data[k] = md5(data[k]);
  }
  return data;
};

/**
 * @method goBack 返回上一页
 * @param e 不存在的情况传null即可
 * @param app this 实例
 */
const goBack = (e=window.event, app) => {
  if (e) {
    e.preventDefault();
  }
  // 获取路由t的参数 存在表示是新打开页面 执行关闭窗口事件
  let t = app.props.location.query.t;
  if (t) {
    window.close();
  }
  app.props.dispatch(
    routerRedux.go(-1)
  );
};

module.exports = {
  guid,
  getFirstMenuPath,
  getPathName,
  getScrollWidth,
  calcuUniqNum,
  calcuTotal,
  getAllIds,
  isContain,
  getFileList,
  encrypt,
  decrypt,
  timeFormat,
  passMd5,
  setAccount,
  setMoney,
  setThousands,
  formDataSetMoney,
  getmoney,
  getKey,
  goBack,
};
