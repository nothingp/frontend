const React = require('react');
const ReactDOM = require('react-dom');

import { Carousel,Grid,Flex,WhiteSpace } from 'antd-mobile';

import {Link} from 'react-router-dom';

import styles from '../index.less';

const data = Array.from(new Array(20)).map((_val, i) => ({
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
    >Item</div>
);


export default class Index extends React.Component{
    componentDidMount () {
    }
    render(){
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
                <Grid data={data} columnNum={5}  />
            </div>

        )
    }
}
