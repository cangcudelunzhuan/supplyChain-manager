import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Card, Layout } from 'antd';
import Link from 'umi/link';
import classnames from 'classnames';
import { getPathName, getScrollWidth } from 'src/utils/tools';
// import LastPath from './lastpath';
import './index.less';

const BreadcrumbItem = Breadcrumb.Item;
const { Content } = Layout;
@connect(({ global }) => ({
  global,
}))
class DyLayout extends Component {

  static propTypes = {
    action: PropTypes.array,
  }

  static defaultProps = {
    action: [],
  }

  state = {
    collapsed: false,
    fix: false,
  };

  constructor(props){
    super(props);
    this.contentRef = React.createRef();
    this.scrollWidth = getScrollWidth();
  }

  componentDidMount(){
    this.dyContentDom = ReactDOM.findDOMNode(this.contentRef.current);
  }

  handelScroll = () => {
    const { action } = this.props;
    if(action.length === 0)return;
    const { scrollTop } = this.dyContentDom;
    const { fix } = this.state;
    if(scrollTop > 100 && !fix){
      this.setState({
        fix: true,
      });
    }
    if(scrollTop < 100 && fix){
      this.setState({
        fix: false,
      });
    }
  }

  render() {
    const { fix } = this.state;
    const {
      className,
      action,
      children,
      breadcrumb = [],
      global: {
        menus,
        currentMenuPath,
        // sessionPath
      },
    } = this.props;
    /** 面包屑只能读到已配置菜单的路径，额外的页面（如详情页）需要自己指定breadcrumb */
    let breadcrumb_render;
    if (breadcrumb.length > 0) {
      breadcrumb_render = (
        <Breadcrumb>
          {
            breadcrumb.map((item) => (
              <BreadcrumbItem key="item">
                {item.href ? (
                  <Link to={item.href}>{item.name}</Link>
                ) : item.name}
              </BreadcrumbItem>
            ))
          }
        </Breadcrumb>
      );
    } else {
      let pathName = [];
      if(menus.length > 0){
        pathName = getPathName(menus, currentMenuPath);
      }
      breadcrumb_render = (
        <Breadcrumb>
          {
            pathName.map((item) => <BreadcrumbItem key="item">{item}</BreadcrumbItem>)
          }
        </Breadcrumb>
      );
    }
    return (
      <Content className="dy-content" onScroll={this.handelScroll} ref={this.contentRef}>
        <div className={classnames('dy-page', className)} >
          <div className="dy-static-block">
            <div className={classnames('dy-sub-header', { fix })} style={{ marginRight: fix?this.scrollWidth:0 }}>
              {breadcrumb_render}
              {/* {(sessionPath.length>1)&&<LastPath data={sessionPath}/>} */}
              {action.length > 0 &&(
                <div className="dy-sub-header-common-btn">
                  {action.map((item, index)=>{ return item ; })}
                </div>
              )}
            </div>
          </div>
          <Card bordered={false} className="dy-page-card">
            {children}
          </Card>
        </div>
      </Content>

    );
  }
}

export default DyLayout;