import { Promise } from 'q';

const localmenu = {
  data:
    [
      {
        'path': '/user',
        'name': '用户管理',
        'icon': 'iconyonghuguanli',
        'children':
          [
            {
              'path': '/distributor',
              'name': '经销商管理',
              'icon': 'iconwodeshouxinbao-7',
            },
            {
              'path': '/brans',
              'name': '品牌商管理',
              'icon': 'iconwodeshouxinbao-10',
            },
            {
              'path': '/license',
              'name': '持牌机构管理',
              'icon': 'iconjigou',
            },
            {
              'path': '/attestation',
              'name': '出资机构管理',
              'icon': 'iconwodeshouxinbao-',
            },
            {
              'path': '/storage',
              'name': '仓储公司管理',
              'icon': 'iconwodeshouxinbao-',
            },
            {
              'path': '/industrialPark',
              'name': '产业园管理',
              'icon': 'iconwodeshouxinbao-',
              'children':
                [
                  {
                    'path': '/industrialPark',
                    'name': '产业园管理',
                    'icon': 'iconwodeshouxinbao-6',
                  },
                  {
                    'path': '/policy',
                    'name': '产业园政策管理',
                    'icon': 'iconwodeshouxinbao-6',
                  },
                ],
            },
          ],
      },
      {
        'path': '/business',
        'name': '业务管理',
        'icon': 'iconyonghuguanli',
        'children':
          [
            {
              'path': '/businessIn',
              'name': '计划管理',
              'icon': 'iconluruxinxi',
            },
            {
              'path': '/order',
              'name': '合同管理',
              'icon': 'iconwodeshouxinbao-3',
            },
            {
              'path': '/lease',
              'name': '租赁管理',
              'icon': 'iconwodeshouxinbao-3',
            },
            // {
            //   'path': '/pledge',
            //   'name': '质/押物清单管理',
            //   'icon': 'iconwodeshouxinbao-3',
            // },
          ],
      },
      {
        'path': '/creditManage',
        'name': '额度管理',
        'icon': 'iconshouxinguanli-',
        'children':
          [
            {
              'path': '/dealerManage',
              'name': '经销商额度管理',
              'icon': 'iconwodeshouxinbao-6',
              'children':
                [
                  {

                    'path': '/dealerLimit',
                    'name': '经销商额度明细',
                    'icon': 'iconwodeshouxinbao-6',
                  },
                  {
                    'path': '/business',
                    'name': '经销商额度审批',
                    'icon': 'iconwodeshouxinbao-6',
                  },
                ],
            },
            {
              'path': '/license',
              'name': '出资机构额度管理',
              'icon': 'iconwodeshouxinbao-6',
            },
            {
              'path': '/dealer',
              'name': '持牌机构额度管理',
              'icon': 'iconwodeshouxinbao-6',
            },
            {
              'path': '/financing',
              'name': '融资额度管理',
              'icon': 'iconwodeshouxinbao-6',
            },
            {
              'path': '/credit',
              'name': '授信额度管理',
              'icon': 'iconwodeshouxinbao-6',
            },
          ],
      },
      {
        'path': '/finances',
        'name': '财务管理',
        'icon': 'iconcaiwuguanli',
        'children':
          [
            {
              'path': '/payRec',
              'name': '收付款管理',
              'icon': 'iconwodeshouxinbao-8',
            },
            {
              'path': '/account',
              'name': '账户管理',
              'icon': 'iconwodeshouxinbao-8',
              'children':
                [
                  {
                    'path': '/distributor',
                    'name': '经销商账户管理',
                    'icon': 'iconwodeshouxinbao-8',
                  },
                  {
                    'path': '/license',
                    'name': '持牌机构账户管理',
                    'icon': 'iconwodeshouxinbao-8',
                  },
                ],
            },
            {
              'path': '/accounts',
              'name': '账户管理2',
              'icon': 'iconwodeshouxinbao-8',
            },
            {
              'path': '/fee',
              'name': '服务费管理',
              'icon': 'iconwodeshouxinbao-8',
            },
            {
              'path': '/ticket',
              'name': '票务管理',
              'icon': 'iconcaiwuguanli',
              'children':
                [
                  {
                    'path': '/trade',
                    'name': '贸易票据',
                    'icon': 'iconwodeshouxinbao-8',
                  },
                  {
                    'path': '/lease',
                    'name': '金融服务费票据',
                    'icon': 'iconwodeshouxinbao-8',
                  },
                ],
            },
          ],
      },
      {
        'path': '/auth',
        'name': '权限管理',
        'icon': 'iconquanxianguanli',
        'children':
          [
            {
              'path': '/authority',
              'name': '权限设置',
              'icon': 'iconquanxianshezhi',
            },
            {
              'path': '/role',
              'name': '角色管理',
              'icon': 'iconquanxianshezhi',
            },
          ],
      },
      {
        'path': '/loanManage',
        'name': '租后管理',
        'icon': 'icondaihouchuli',
        'children':
          [
            {
              'path': '/repayMent',
              'name': '还款管理',
              'icon': 'iconwodeshouxinbao-11',
            },
            {
              'path': '/redeem',
              'name': '赎回管理',
              'icon': 'iconwodeshouxinbao-11',
            },
          ],
      },
      {
        'path': '/count',
        'name': '数据统计',
        'icon': 'icondaihouchuli',
        'children': [
          {
            'path': '/distributor',
            'name': '经销商融资额度统计',
            'icon': 'iconwodeshouxinbao-11',
          },
          {
            'path': '/licensee',
            'name': '持牌机构授信额度统计',
            'icon': 'iconwodeshouxinbao-11',
          },
          {
            'path': '/cash',
            'name': '头寸管理',
            'icon': 'iconwodeshouxinbao-2',
            children: [
              {
                'path': '/licensee',
                'name': '持牌机构纬度',
                'icon': 'iconwodeshouxinbao-2',
              },
              {
                'path': '/sponsor',
                'name': '出资机构纬度',
                'icon': 'iconwodeshouxinbao-2',
              },
              {
                'path': '/distributor',
                'name': '出资机构纬度',
                'icon': 'iconwodeshouxinbao-2',
              },
            ],
          },
        ],
      },
      {
        'path': '/cargoManage',
        'name': '货物管理',
        'icon': 'iconcunhuoguanli',
        'children':
          [

            {
              'path': '/goods',
              'name': '商品管理',
              'icon': 'iconwodeshouxinbao-4',
            },
            {
              'path': '/price',
              'name': '价格管理',
              'icon': 'iconwodeshouxinbao-4',
              'children':
                [
                  {
                    'path': '/basic',
                    'name': '基础价格管理',
                  },
                  {
                    'path': '/supervisedGoods',
                    'name': '监管物价格管理',
                  },
                ],
            },
            {
              'path': '/stock',
              'name': '库存管理',
              'icon': 'iconwodeshouxinbao-4',
            },
          ],
      },
      {
        'path': '/risk',
        'name': '风险管理',
        'icon': 'iconhuaban',
        'children':
          [
            {
              'path': '/price',
              'name': '经销商定价管理',
              'icon': 'iconwodeshouxinbao-2',
              'children':
                [
                  {
                    'path': '/distributorPrice',
                    'name': '经销商定价管理',
                    'icon': 'iconwodeshouxinbao-2',
                  },
                  {
                    'path': '/factor',
                    'name': '风险因素设置',
                    'icon': 'iconwodeshouxinbao-2',
                  },
                ],
            },
            {
              'path': '/water',
              'name': '水位管理',
              'icon': 'iconwodeshouxinbao-2',
            },

          ],
      },
    ],
};


class getMenu {
  list() {
    return new Promise((resolve, reject) => {
      resolve(localmenu);
    });
  }
}

export default new getMenu();
