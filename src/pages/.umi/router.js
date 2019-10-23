import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/index.js'),
        })
      : require('../../layouts/index.js').default,
    routes: [
      {
        path: '/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../404.js'),
            })
          : require('../404.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/auth/authority',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/authority.js').then(
                  m => {
                    return { namespace: 'authority', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/role.js').then(
                  m => {
                    return { namespace: 'role', ...m.default };
                  },
                ),
              ],
              component: () => import('../auth/authority/index.js'),
            })
          : require('../auth/authority/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/auth/authority/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/authority.js').then(
                  m => {
                    return { namespace: 'authority', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/role.js').then(
                  m => {
                    return { namespace: 'role', ...m.default };
                  },
                ),
              ],
              component: () => import('../auth/authority/$id.js'),
            })
          : require('../auth/authority/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/auth/role',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/authority.js').then(
                  m => {
                    return { namespace: 'authority', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/role.js').then(
                  m => {
                    return { namespace: 'role', ...m.default };
                  },
                ),
              ],
              component: () => import('../auth/role/index.js'),
            })
          : require('../auth/role/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/auth/role/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/authority.js').then(
                  m => {
                    return { namespace: 'authority', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/auth/models/role.js').then(
                  m => {
                    return { namespace: 'role', ...m.default };
                  },
                ),
              ],
              component: () => import('../auth/role/$id.js'),
            })
          : require('../auth/role/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/businessIn',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/businessIn/index.js'),
            })
          : require('../business/businessIn/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/businessIn/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/businessIn/$id.js'),
            })
          : require('../business/businessIn/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/lease',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/lease/index.js'),
            })
          : require('../business/lease/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/lease/:id/bill',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/lease/$id/bill.js'),
            })
          : require('../business/lease/$id/bill.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/lease/:id/cash',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/lease/$id/cash.js'),
            })
          : require('../business/lease/$id/cash.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/lease/:id/collateral',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/lease/$id/collateral.js'),
            })
          : require('../business/lease/$id/collateral.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/order',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/order/index.js'),
            })
          : require('../business/order/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/order/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/order/$id.js'),
            })
          : require('../business/order/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/pledge',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/pledge/index.js'),
            })
          : require('../business/pledge/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/business/pledge/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/businesIn.js').then(
                  m => {
                    return { namespace: 'businesIn', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/lease.js').then(
                  m => {
                    return { namespace: 'lease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/order.js').then(
                  m => {
                    return { namespace: 'order', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/business/models/pledge.js').then(
                  m => {
                    return { namespace: 'pledge', ...m.default };
                  },
                ),
              ],
              component: () => import('../business/pledge/$id.js'),
            })
          : require('../business/pledge/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/goods',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () => import('../cargoManage/goods/index.js'),
            })
          : require('../cargoManage/goods/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/goods/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () => import('../cargoManage/goods/$id.js'),
            })
          : require('../cargoManage/goods/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/price/basic',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () => import('../cargoManage/price/basic/index.js'),
            })
          : require('../cargoManage/price/basic/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/price/basic/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () => import('../cargoManage/price/basic/$id.js'),
            })
          : require('../cargoManage/price/basic/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/price/supervisedGoods',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../cargoManage/price/supervisedGoods/index.js'),
            })
          : require('../cargoManage/price/supervisedGoods/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/price/supervisedGoods/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../cargoManage/price/supervisedGoods/$id.js'),
            })
          : require('../cargoManage/price/supervisedGoods/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/stock',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () => import('../cargoManage/stock/index.js'),
            })
          : require('../cargoManage/stock/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/cargoManage/stock/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/goods.js').then(
                  m => {
                    return { namespace: 'goods', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/price.js').then(
                  m => {
                    return { namespace: 'price', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/cargoManage/models/stock.js').then(
                  m => {
                    return { namespace: 'stock', ...m.default };
                  },
                ),
              ],
              component: () => import('../cargoManage/stock/$id.js'),
            })
          : require('../cargoManage/stock/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/count/cash/licensee',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/cash/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
              ],
              component: () => import('../count/cash/licensee/index.js'),
            })
          : require('../count/cash/licensee/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/count/cash/licensee/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/cash/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
              ],
              component: () => import('../count/cash/licensee/$id.js'),
            })
          : require('../count/cash/licensee/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/count/distributor',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
              ],
              component: () => import('../count/distributor/index.js'),
            })
          : require('../count/distributor/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/count/distributor/:id/detail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
              ],
              component: () => import('../count/distributor/$id/detail.js'),
            })
          : require('../count/distributor/$id/detail.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/count/licensee',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
              ],
              component: () => import('../count/licensee/index.js'),
            })
          : require('../count/licensee/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/count/licensee/:id/detail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/count/models/licensee.js').then(
                  m => {
                    return { namespace: 'licensee', ...m.default };
                  },
                ),
              ],
              component: () => import('../count/licensee/$id/detail.js'),
            })
          : require('../count/licensee/$id/detail.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/credit',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/credit/models/business_l.js').then(
                  m => {
                    return { namespace: 'business_l', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/credit/index.js'),
            })
          : require('../creditManage/credit/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/credit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/credit/models/business_l.js').then(
                  m => {
                    return { namespace: 'business_l', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/credit/$id.js'),
            })
          : require('../creditManage/credit/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/dealer',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/dealer/models/dealerLimit.js').then(
                  m => {
                    return { namespace: 'dealerLimit', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/dealer/index.js'),
            })
          : require('../creditManage/dealer/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/dealer/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/dealer/models/dealerLimit.js').then(
                  m => {
                    return { namespace: 'dealerLimit', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/dealer/$id.js'),
            })
          : require('../creditManage/dealer/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/dealerManage/business',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/dealerManage/business/models/business.js').then(
                  m => {
                    return { namespace: 'business', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../creditManage/dealerManage/business/index.js'),
            })
          : require('../creditManage/dealerManage/business/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/dealerManage/business/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/dealerManage/business/models/business.js').then(
                  m => {
                    return { namespace: 'business', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../creditManage/dealerManage/business/$id.js'),
            })
          : require('../creditManage/dealerManage/business/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/dealerManage/dealerLimit',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/dealerManage/dealerLimit/models/dealerLimit.js').then(
                  m => {
                    return { namespace: 'dealerLimit', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../creditManage/dealerManage/dealerLimit/index.js'),
            })
          : require('../creditManage/dealerManage/dealerLimit/index.js')
              .default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/dealerManage/dealerLimit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/dealerManage/dealerLimit/models/dealerLimit.js').then(
                  m => {
                    return { namespace: 'dealerLimit', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../creditManage/dealerManage/dealerLimit/$id.js'),
            })
          : require('../creditManage/dealerManage/dealerLimit/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/financing',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/financing/models/dealerLimit.js').then(
                  m => {
                    return { namespace: 'dealerLimit', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/financing/index.js'),
            })
          : require('../creditManage/financing/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/financing/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/financing/models/dealerLimit.js').then(
                  m => {
                    return { namespace: 'dealerLimit', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/financing/$id.js'),
            })
          : require('../creditManage/financing/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/license',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/license/models/business_l.js').then(
                  m => {
                    return { namespace: 'business_l', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/license/index.js'),
            })
          : require('../creditManage/license/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/creditManage/license/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/creditManage/license/models/business_l.js').then(
                  m => {
                    return { namespace: 'business_l', ...m.default };
                  },
                ),
              ],
              component: () => import('../creditManage/license/$id.js'),
            })
          : require('../creditManage/license/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/account/distributor',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_d.js').then(
                  m => {
                    return { namespace: 'account_d', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_L.js').then(
                  m => {
                    return { namespace: 'account_L', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../finances/account/distributor/index.js'),
            })
          : require('../finances/account/distributor/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/account/distributor/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_d.js').then(
                  m => {
                    return { namespace: 'account_d', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_L.js').then(
                  m => {
                    return { namespace: 'account_L', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/account/distributor/$id.js'),
            })
          : require('../finances/account/distributor/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/account/license',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_d.js').then(
                  m => {
                    return { namespace: 'account_d', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_L.js').then(
                  m => {
                    return { namespace: 'account_L', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/account/license/index.js'),
            })
          : require('../finances/account/license/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/account/license/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_d.js').then(
                  m => {
                    return { namespace: 'account_d', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/account/models/account_L.js').then(
                  m => {
                    return { namespace: 'account_L', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/account/license/$id.js'),
            })
          : require('../finances/account/license/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/fee',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/fee/index.js'),
            })
          : require('../finances/fee/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/fee/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/fee/$id.js'),
            })
          : require('../finances/fee/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/loan',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/loan/index.js'),
            })
          : require('../finances/loan/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/loan/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/loan/$id.js'),
            })
          : require('../finances/loan/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/index.js'),
            })
          : require('../finances/payRec/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/utils',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/utils/index.js'),
            })
          : require('../finances/payRec/utils/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/advance',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/advance.js'),
            })
          : require('../finances/payRec/$id/advance.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/common',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/common.js'),
            })
          : require('../finances/payRec/$id/common.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/interest',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/interest.js'),
            })
          : require('../finances/payRec/$id/interest.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/redeem',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/redeem.js'),
            })
          : require('../finances/payRec/$id/redeem.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/refinance',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/refinance.js'),
            })
          : require('../finances/payRec/$id/refinance.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/repayment',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/repayment.js'),
            })
          : require('../finances/payRec/$id/repayment.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/riskAdvance',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/riskAdvance.js'),
            })
          : require('../finances/payRec/$id/riskAdvance.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/serverFee',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/serverFee.js'),
            })
          : require('../finances/payRec/$id/serverFee.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/ticketBond',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/ticketBond.js'),
            })
          : require('../finances/payRec/$id/ticketBond.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/payRec/:id/trade',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/payRec/$id/trade.js'),
            })
          : require('../finances/payRec/$id/trade.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/ticket/lease',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketFee.js').then(
                  m => {
                    return { namespace: 'ticketFee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketLease.js').then(
                  m => {
                    return { namespace: 'ticketLease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketTrade.js').then(
                  m => {
                    return { namespace: 'ticketTrade', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/ticket/lease/index.js'),
            })
          : require('../finances/ticket/lease/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/ticket/lease/:id/leaseDetail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketFee.js').then(
                  m => {
                    return { namespace: 'ticketFee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketLease.js').then(
                  m => {
                    return { namespace: 'ticketLease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketTrade.js').then(
                  m => {
                    return { namespace: 'ticketTrade', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../finances/ticket/lease/$id/leaseDetail.js'),
            })
          : require('../finances/ticket/lease/$id/leaseDetail.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/ticket/lease/:id/:ids',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketFee.js').then(
                  m => {
                    return { namespace: 'ticketFee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketLease.js').then(
                  m => {
                    return { namespace: 'ticketLease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketTrade.js').then(
                  m => {
                    return { namespace: 'ticketTrade', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/ticket/lease/$id/$ids.js'),
            })
          : require('../finances/ticket/lease/$id/$ids.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/ticket/trade',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketFee.js').then(
                  m => {
                    return { namespace: 'ticketFee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketLease.js').then(
                  m => {
                    return { namespace: 'ticketLease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketTrade.js').then(
                  m => {
                    return { namespace: 'ticketTrade', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/ticket/trade/index.js'),
            })
          : require('../finances/ticket/trade/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/ticket/trade/:id/open',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketFee.js').then(
                  m => {
                    return { namespace: 'ticketFee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketLease.js').then(
                  m => {
                    return { namespace: 'ticketLease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketTrade.js').then(
                  m => {
                    return { namespace: 'ticketTrade', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/ticket/trade/$id/open.js'),
            })
          : require('../finances/ticket/trade/$id/open.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/ticket/trade/:id/receive',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketFee.js').then(
                  m => {
                    return { namespace: 'ticketFee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketLease.js').then(
                  m => {
                    return { namespace: 'ticketLease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketTrade.js').then(
                  m => {
                    return { namespace: 'ticketTrade', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../finances/ticket/trade/$id/receive.js'),
            })
          : require('../finances/ticket/trade/$id/receive.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/finances/ticket/trade/:id/:ids',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketFee.js').then(
                  m => {
                    return { namespace: 'ticketFee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketLease.js').then(
                  m => {
                    return { namespace: 'ticketLease', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/ticket/models/ticketTrade.js').then(
                  m => {
                    return { namespace: 'ticketTrade', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/account.js').then(
                  m => {
                    return { namespace: 'account', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/bond.js').then(
                  m => {
                    return { namespace: 'bond', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/fee.js').then(
                  m => {
                    return { namespace: 'fee', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/finances/models/payRec.js').then(
                  m => {
                    return { namespace: 'payRec', ...m.default };
                  },
                ),
              ],
              component: () => import('../finances/ticket/trade/$id/$ids.js'),
            })
          : require('../finances/ticket/trade/$id/$ids.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../index.js'),
            })
          : require('../index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/loanManage/redeem',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/redeem.js').then(
                  m => {
                    return { namespace: 'redeem', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/repay.js').then(
                  m => {
                    return { namespace: 'repay', ...m.default };
                  },
                ),
              ],
              component: () => import('../loanManage/redeem/index.js'),
            })
          : require('../loanManage/redeem/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/loanManage/redeem/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/redeem.js').then(
                  m => {
                    return { namespace: 'redeem', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/repay.js').then(
                  m => {
                    return { namespace: 'repay', ...m.default };
                  },
                ),
              ],
              component: () => import('../loanManage/redeem/$id.js'),
            })
          : require('../loanManage/redeem/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/loanManage/repayMent',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/redeem.js').then(
                  m => {
                    return { namespace: 'redeem', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/repay.js').then(
                  m => {
                    return { namespace: 'repay', ...m.default };
                  },
                ),
              ],
              component: () => import('../loanManage/repayMent/index.js'),
            })
          : require('../loanManage/repayMent/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/loanManage/repayMent/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/redeem.js').then(
                  m => {
                    return { namespace: 'redeem', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/loanManage/models/repay.js').then(
                  m => {
                    return { namespace: 'repay', ...m.default };
                  },
                ),
              ],
              component: () => import('../loanManage/repayMent/$id.js'),
            })
          : require('../loanManage/repayMent/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/login',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/login/models/login.js').then(
                  m => {
                    return { namespace: 'login', ...m.default };
                  },
                ),
              ],
              component: () => import('../login/index.js'),
            })
          : require('../login/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/risk/price/distributorPrice',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/distributorPrice.js').then(
                  m => {
                    return { namespace: 'distributorPrice', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/factor.js').then(
                  m => {
                    return { namespace: 'factor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/models/water.js').then(
                  m => {
                    return { namespace: 'water', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../risk/price/distributorPrice/index.js'),
            })
          : require('../risk/price/distributorPrice/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/risk/price/distributorPrice/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/distributorPrice.js').then(
                  m => {
                    return { namespace: 'distributorPrice', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/factor.js').then(
                  m => {
                    return { namespace: 'factor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/models/water.js').then(
                  m => {
                    return { namespace: 'water', ...m.default };
                  },
                ),
              ],
              component: () => import('../risk/price/distributorPrice/$id.js'),
            })
          : require('../risk/price/distributorPrice/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/risk/price/factor',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/distributorPrice.js').then(
                  m => {
                    return { namespace: 'distributorPrice', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/factor.js').then(
                  m => {
                    return { namespace: 'factor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/models/water.js').then(
                  m => {
                    return { namespace: 'water', ...m.default };
                  },
                ),
              ],
              component: () => import('../risk/price/factor/index.js'),
            })
          : require('../risk/price/factor/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/risk/price/factor/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/distributorPrice.js').then(
                  m => {
                    return { namespace: 'distributorPrice', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/price/models/factor.js').then(
                  m => {
                    return { namespace: 'factor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/models/water.js').then(
                  m => {
                    return { namespace: 'water', ...m.default };
                  },
                ),
              ],
              component: () => import('../risk/price/factor/$id.js'),
            })
          : require('../risk/price/factor/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/risk/water',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/models/water.js').then(
                  m => {
                    return { namespace: 'water', ...m.default };
                  },
                ),
              ],
              component: () => import('../risk/water/index.js'),
            })
          : require('../risk/water/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/risk/water/:id/add',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/models/water.js').then(
                  m => {
                    return { namespace: 'water', ...m.default };
                  },
                ),
              ],
              component: () => import('../risk/water/$id/add.js'),
            })
          : require('../risk/water/$id/add.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/risk/water/:id/detail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/risk/models/water.js').then(
                  m => {
                    return { namespace: 'water', ...m.default };
                  },
                ),
              ],
              component: () => import('../risk/water/$id/detail.js'),
            })
          : require('../risk/water/$id/detail.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/stock/inventoryDetails/productStatistics',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/stock/models/productStatistics.js').then(
                  m => {
                    return { namespace: 'productStatistics', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../stock/inventoryDetails/productStatistics.js'),
            })
          : require('../stock/inventoryDetails/productStatistics.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/attestation',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/attestation/index.js'),
            })
          : require('../user/attestation/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/attestation/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/attestation/$id.js'),
            })
          : require('../user/attestation/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/brans',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/brans/index.js'),
            })
          : require('../user/brans/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/brans/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/brans/$id.js'),
            })
          : require('../user/brans/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/distributor',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/distributor/index.js'),
            })
          : require('../user/distributor/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/distributor/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/distributor/$id.js'),
            })
          : require('../user/distributor/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/industrialPark/industrialPark',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../user/industrialPark/industrialPark/index.js'),
            })
          : require('../user/industrialPark/industrialPark/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/industrialPark/industrialPark/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../user/industrialPark/industrialPark/$id.js'),
            })
          : require('../user/industrialPark/industrialPark/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/industrialPark/policy',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/industrialPark/policy/index.js'),
            })
          : require('../user/industrialPark/policy/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/industrialPark/policy/:no/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () =>
                import('../user/industrialPark/policy/$no/$id.js'),
            })
          : require('../user/industrialPark/policy/$no/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/license/deal/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/license/deal/$id.js'),
            })
          : require('../user/license/deal/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/license',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/license/index.js'),
            })
          : require('../user/license/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/license/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/license/$id.js'),
            })
          : require('../user/license/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/storage',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/storage/index.js'),
            })
          : require('../user/storage/index.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        path: '/user/storage/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/attestation.js').then(
                  m => {
                    return { namespace: 'attestation', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/brans.js').then(
                  m => {
                    return { namespace: 'brans', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/distributor.js').then(
                  m => {
                    return { namespace: 'distributor', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/industrialPark.js').then(
                  m => {
                    return { namespace: 'industrialPark', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/license.js').then(
                  m => {
                    return { namespace: 'license', ...m.default };
                  },
                ),
                import('/Users/cristenc/Desktop/dayu-supplyChain-manager/src/pages/user/models/storage.js').then(
                  m => {
                    return { namespace: 'storage', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/storage/$id.js'),
            })
          : require('../user/storage/$id.js').default,
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/cristenc/Desktop/dayu-supplyChain-manager/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
        _title: '大鱼供应链',
        _title_default: '大鱼供应链',
      },
    ],
    _title: '大鱼供应链',
    _title_default: '大鱼供应链',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/cristenc/Desktop/dayu-supplyChain-manager/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
    _title: '大鱼供应链',
    _title_default: '大鱼供应链',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
