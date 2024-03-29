import {request,storeLoginData} from '../utils';

export async function fetchIndex(){
	const {success} = await request('/api',{
		method: 'get'
	});
	return success;
}

export async function fetchUser(){
	const {data} = await request('/api/readLoginUserInfo',{
		method: 'get'
	});
	return {
		...data
	}
}

export async function fetchApp(){
	const {data} = await request('/api/common/param/menu/list_app',{
		method: 'get'
	});
	return data;
}

export async function fetchMenu(appId) {
	const {data} = await request(`/api/common/param/menu/tree/${appId}`,{
		method: 'get'
	});
	return data;
}

export async function fetchAppInfo(){
	return fetchApp().then((data) => {
		let appId = localStorage.getItem('app_id') || '';
		const appList = data;
		if(appId === ''){
			appId = appList[0].id;
		}
		return fetchMenu(appId).then(data => {
			return {
				appId: appId,
				appList: appList,
				menuItem: data
			}
		})
	})
}

export async function refresh_token(){
	const refresh_token = localStorage.getItem('refresh_token');
	
	const {data} = await request(`oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`,{
		method: 'post'
	});
	storeLoginData(data);
}
