import { delay } from 'roadhog-api-doc';

const api = {
  'GET /menus': [
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
          icon: 'iconjingxiaoshangguanli',
        },
        {
          path: '/brans',
          name: '品牌商管理',
          icon: 'iconpinpai',
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
          icon: 'iconhuankuan',
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
          icon: 'iconrenzheng',
        },
        {
          path: '/market',
          name: '市场授信额度管理',
          icon: 'iconeduguanli',
        },
        {
          path: '/custom',
          name: '客户授信额度管理',
          icon: 'iconeduguanli',
        },
        {
          path: '/statistics',
          name: '授信额度统计',
          icon: 'icontongji',
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
          icon: 'iconbaozhengjin',
        },
        {
          path: '/loan',
          name: '用款管理',
          icon: 'iconfangkuanguanli',
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
};

export default delay(api, 0);