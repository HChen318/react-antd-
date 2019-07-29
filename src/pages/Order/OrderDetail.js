import React, { Component } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import Utils from '../../utils/utils'
import Axios from '../../axios'
import './order.less'

export default class OrderDetail extends Component {
    constructor() {
        super()
        this.state = {
            orderDetail: {}
        }
    }


    componentDidMount() {
        let id = this.props.match.params
        id && this.getOrderDetail(id)

    }
    //获取数据
    getOrderDetail = (id) => {
        Axios.ajaxAxios({
            url: 'order_detail',
            data: {
                param: id
            }
        }).then(res => {
            console.log(res);
            if (res.code == 0) {
                this.setState({
                    orderDetail: res.result
                })
                this.renderMap(res.result)
            }

        })
    }

    renderMap = (result) => {
        this.map = new window.BMap.Map("orderdetailMap");          // 创建地图实例  
        this.point = new window.BMap.Point(116.404, 39.915);  // 创建点坐标  
        this.map.centerAndZoom(this.point, 11);
        //添加控件
        this.addMapControl()
        // 调用路线图绘制方法
        this.drawBikeRoute(result.position_list);
        // 绘制区域
        this.drwaServiceArea(result.area)
    }

    addMapControl = () => {
        let map = this.map
        console.log(map);
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));

    }


    drawBikeRoute = (result) => {
        console.log(result);
        let startPoint = ''
        let endPoint = ''
        if (result.length > 0) {
            console.log(111);
            //起点
            startPoint = new window.BMap.Point(result[0].lon, result[0].lat)
            var startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                anchor: new window.BMap.Size(10, 25),
                imageSize: new window.BMap.Size(36, 42),
                // imageOffset: new window.BMap.Size(0, 10)
            })
            var startMark = new window.BMap.Marker(startPoint, { icon: startIcon })
            this.map.addOverlay(startMark);
            //终点
            endPoint = new window.BMap.Point(result[result.length - 1].lon, result[result.length - 1].lat)
            var endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                anchor: new window.BMap.Size(10, 25),
                imageSize: new window.BMap.Size(36, 42),
                // imageOffset: new window.BMap.Size(0, 10)
            })
            var endMark = new window.BMap.Marker(endPoint, { icon: endIcon })
            this.map.addOverlay(endMark);
            //绘制起点终点
            let trackPoint = []
            for (let obj of result) {
                trackPoint.push(new window.BMap.Point(obj.lon, obj.lat))
            }
            var polyline = new window.BMap.Polyline(trackPoint, { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 })
            this.map.addOverlay(polyline)
        }

    }
    // 绘制服务区
    drwaServiceArea = (positionList) => {
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polygon);
    }






    render() {
        const { orderDetail } = this.state
        return (
            <div className="order-detail">
                <Card >
                    <div className="orderdetail-Map" id="orderdetailMap" style={{ width: '100%', height: 500 }}></div>
                    <div className="detail-items">
                        <div className="item-title"> 基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-left">用车模式</div>
                                <div className="detail-right">{orderDetail.mode == 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-left">订单编号</div>
                                <div className="detail-right">{orderDetail.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-left">车辆编号</div>
                                <div className="detail-right">{orderDetail.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-left">用户姓名</div>
                                <div className="detail-right">{orderDetail.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-left">手机号码</div>
                                <div className="detail-right">{orderDetail.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title"> 行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-left">用车模式</div>
                                <div className="detail-right">{orderDetail.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-left">订单编号</div>
                                <div className="detail-right">{orderDetail.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-left">车辆编号</div>
                                <div className="detail-right">{orderDetail.distance / 1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>

            </div>
        )
    }
}
