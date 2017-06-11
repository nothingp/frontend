const React = require('react');
const ReactDOM = require('react-dom');

import {observer, inject} from 'mobx-react'

import { Carousel,Grid,Flex,WhiteSpace } from 'antd-mobile';

import {Link} from 'react-router-dom';

import styles from '../index.less';

const data = Array.from(new Array(16)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `name${i}`,
}));

const PlaceHolder = props => (
	<div
		style={{
            backgroundColor: '#ebebef',
            color: '#bbb',
            textAlign: 'center',
            height: '2rem',
            lineHeight: '1rem',
            width: '100%',
        }}
        {...props}
	><Link to="/list">Item</Link></div>
);

@inject('TestStore')
@observer
export default class Index extends React.Component{
	componentDidMount () {
	}
	render(){
		console.log(this.props.TestStore);
        return(
            <div>
				<Carousel className="carousel"
						  swiping={false}
						  autoplay
						  infinite>
					<div className="v-item">图片1</div>
					<div className="v-item">图片2</div>
					<div className="v-item">图片3</div>
				</Carousel>
				<Grid data={data} columnNum={4} carouselMaxRow={2} isCarousel={true} hasLine={false} />
				<div className="flex-container">
					<div className="sub-title">基本</div>
					<Flex>
						<Flex.Item><PlaceHolder /></Flex.Item>
						<Flex.Item><PlaceHolder /></Flex.Item>
					</Flex>
					<WhiteSpace size="lg" />
					<Flex>
						<Flex.Item><PlaceHolder /></Flex.Item>
						<Flex.Item><PlaceHolder /></Flex.Item>
					</Flex>
					<WhiteSpace size="lg" />
					<Flex>
						<Flex.Item><PlaceHolder /></Flex.Item>
						<Flex.Item><PlaceHolder /></Flex.Item>
					</Flex>
					<WhiteSpace size="lg" />
					<Flex>
						<Flex.Item><PlaceHolder /></Flex.Item>
						<Flex.Item><PlaceHolder /></Flex.Item>
					</Flex>
				</div>
		  	</div>

        )
    }
}
