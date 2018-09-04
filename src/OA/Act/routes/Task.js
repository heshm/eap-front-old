import React,{PureComponent} from 'react';
import {Tabs} from 'antd';
import ToDoTasks from '../components/ToDoTasks';

const TabPane = Tabs.TabPane;
class Task extends PureComponent {
	render(){
		return (
			<Tabs>
				<TabPane tab="可处理" key="doing">
					<ToDoTasks />
				</TabPane>
				<TabPane tab="新任务" key="new">

				</TabPane>

			</Tabs>
		)
	}
}

export default Task;