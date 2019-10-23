import { delay } from 'roadhog-api-doc';
import Mock from 'mockjs';

const api = {
  'GET /demo/get': { users: [1, 2] },
  'POST /demo/list': (req, res) => {
    let key;
    if (req.body.current === 1) {
      key = 'data|3';
    } else {
      key = 'data|6';
    }
    res.send(Mock.mock({
      [key]: [{
        id: '@natural',
        fullName: '@cname',
        city: '@city',
        date: '@date',
      }],
      total: 9,
    }));
  },
  'POST /demo/testList': (req, res) => {
    let key;
    if (req.body.current === 1) {
      key = 'data|3';
    } else {
      key = 'data|6';
    }
    res.send(Mock.mock({
      [key]: [{
        a1: '@cname',
        a2: '@city',
        a3: '@date',
        'a4|10-100.99': 1,
        a5: '全款',
        a6: '@date',
        a7: '已还',
        a8: '@date',
        'a9|1': 'jsadfkl',
      }],
      total: 9,
    }));
  },
  'GET /demo/menu': (req, res) => {
    res.send(Mock.mock(

      [
        {
          path: '/demo',
          name: 'DEMO',
          icon: 'iconyonghuguanli',
          children: [
            {
              path: '/list',
              name: 'LIST',
            },
          ],
        },
        {
          path: '/user',
          name: '用户管理',
          icon: 'iconyonghuguanli',
          children: [
            {
              path: '/distributor',
              name: '经销商管理',
            },
            {
              path: '/brans',
              name: '品牌商管理',
            },
          ],
        },
        {
          path: '/financing',
          name: '租赁管理',
          icon: 'iconrongziguanli',
          children: [
            {
              path: '/order',
              name: '采购订单管理',
              children: [
                {
                  path: '/search',
                  name: '采购订单查询',
                },
                {
                  path: '/toFinancing',
                  name: '采购订单转融资',
                },
              ],
            },
          ],
        }, {
          path: '/loanManage',
          name: '租后管理',
          icon: 'icondaihouchuli',
          children: [
            {
              path: '/repayMent',
              name: '赎回管理',
            },
          ],
        },
        {
          path: '/creditManage',
          name: '授信管理',
          icon: 'iconshouxinguanli-',
          children: [
            {
              path: '/attestation',
              name: '出资机构认证',
            },
            {
              path: '/market',
              name: '市场授信额度管理',
            },
            {
              path: '/custom',
              name: '客户授信额度管理',
            },
            {
              path: '/statistics',
              name: '授信额度统计',
              children: [
                {
                  path: '/market',
                  name: '市场授信额度统计',
                },
                {
                  path: '/custom',
                  name: '客户授信额度统计',
                },
              ],
            },
          ],
        },
        {
          path: '/finances',
          name: '财务管理',
          icon: 'iconcaiwuguanli',
          children: [
            {
              path: '/bond',
              name: '保证金管理',
            },
            {
              path: '/loan',
              name: '用款管理',
            },
          ],
        },
        {
          path: '/stock',
          name: '存货管理',
          icon: 'iconcunhuoguanli',
          children: [
            {
              path: '/inventoryDetails',
              name: '库存明细',
              children: [
                {
                  path: '/productStatistics',
                  name: '商品统计',
                },
              ],
            },
          ],
        }, {
          path: '/risk',
          name: '风险管理',
          icon: 'iconhuaban',
          children: [
            {
              path: '/priceManage',
              name: '价格管理',
              children: [
                {
                  path: '/toFinance',
                  name: '租赁商品管理',
                },
              ],
            }, {
              path: '/riskWarning',
              name: '风险预警',
            },
          ],
        },
      ],

    ));
  },
  'POST /demo/repaymentList': (req, res) => {
    let key;
    if (req.body.current === 1) {
      key = 'data|3';
    } else {
      key = 'data|6';
    }
    res.send(Mock.mock({
      [key]: [{
        a1: '@cname',
        a2: '@city',
        a3: '@date',
      }],
      total: 9,
    }));
  },
  'POST /demo/add': (req, res) => {
    res.send({ success: true });
  },
  'POST /demo/audit': (req, res) => {
    res.send({ success: true });
  },
};

export default delay(api, 300);