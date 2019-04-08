import React from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './BreadNav.less';

const findPath = (path,menuItem) => {
  let result = [];
  for(let item of menuItem){
    try{
      findExactPath(item,path,result)
    }catch(err){

    }
  }
  return result;
}

const findExactPath = (node,path,result) => {
  result.push(node);
  if(node.actionUrl === path){
    throw "Find node"
  }
  if(node.children){
    for(let item of node.children){
      findExactPath(item,path,result);
    }
  }
  result.pop();
}

const renderItem = (paths) => {
  return paths.map(item => {
    return (
      <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
    )
  })
}

const BreadNav = ({app,history}) => {
  const {menuItem } = app;
  const { location } = history;
  const path = findPath(location.pathname,menuItem);

  return (
    <div>
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          {renderItem(path)}
        </Breadcrumb>
      </div>
    </div>
  )
}

export default withRouter(connect(({ app }) => ({ app }))(BreadNav));
