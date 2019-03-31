import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { Layout  } from 'antd';
import {Aside,BreadNav,LayoutHeader,Setting} from './Layout';
import Loader from './components/Loader/';
import { loadUserInfo, loadAppInfo } from './actions';
import Common from './Common/';
import Developer from './Developer/';
import Ledger from './Ledger/';
import Stock from './Stock/';
import Crm from './Crm/';
import OA from './OA/';

import {refresh_token} from './services/Main';

const { Content, Footer } = Layout;
class Main extends PureComponent{
	state = {
		hasError: false
	}
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(loadUserInfo());
		dispatch(loadAppInfo());
		this.interval = setInterval(() => {
			refresh_token();
		}, 600000);  
	}
	componentWillUnmount(){
		clearInterval(this.interval);
	}
	/* componentDidCatch(error, info) {
		this.setState({
			hasError: true
		})
	} */
	render(){
		/* if(this.state.hasError){
			return (<Redirect to="/login"/>)
		} */
		const {menuCollapsed,menuItem,smallScreen} = this.props.app;
		const asideProps = {menuCollapsed,menuItem}
		return(
			<Layout className="ant-layout-has-sider">
				<Loader fullScreen spinning={this.props.app.loading} />
				{smallScreen ? <div/> : <Aside {...asideProps} />}
				<Layout>
					<LayoutHeader />
					<BreadNav />
					<Content className="content">
						<Switch>
							<Route path="/common" component={Common}/>
							<Route path="/crm" component={Crm}/>
							<Route path="/ledger" component={Ledger}/>
							<Route path="/stock" component={Stock}/>
							<Route path="/oa" component={OA}/>
							<Route path="/developer" component={Developer}/>
						</Switch>
					</Content>
					<Footer className="footer">
						ERPNext ©2018 Created by Heshm
					</Footer>
					<Setting />
				</Layout>
			</Layout>
		)
	}
}

export default withRouter(connect(({app}) => ({app}))(Main));