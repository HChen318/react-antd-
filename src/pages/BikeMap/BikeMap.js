import React, { Component } from 'react';
import { Card, Button } from 'antd';
import Utils from '../../utils/utils'
import Axios from '../../axios'
import BaseForm from '../../components/BaseForm/BaseForm'
import moment from 'moment';

export default class BikeMap extends Component {
    constructor() {
        super()
        this.state = {
            selectedRowKeys: [],
            selectedRows: {}
        }
    }
    param = {
        page: 1
    }

    formList = [
        {
            type: 'Select_type',
            label: '城市',
            field: "city",
            initialValue: '1',
            width: 150,
            value: [{ id: "1", value: '全部' }, { id: "2", value: '北京市' }, { id: "3", value: '深圳市' }]
        },
        {
            type: 'Input_type',
            label: '测试',
            initialValue: 's',
            field: "test",
            width: 150,
        },
        {
            type: 'RangePicker_type',
            label: '订单时间',
            field: "order_time",
            startTime: moment().subtract(1, 'months').format('YYYY-MM-DD'),
            endTime: moment().format("YYYY-MM-DD"),
            initialValue: '1',
            width: 150,
        },
        {
            type: 'Select_type',
            label: '订单状态',
            initialValue: '1',
            width: 150,
            field: "order_status",
            value: [{ id: "1", value: '全部' }, { id: "2", value: '进行中' }, { id: "3", value: '结束行程' }]
        },

    ]

    componentDidMount() {
        Axios.ajaxAxios({
            url: '/bike/list',
            data: {
                param: {
                    page: this.param.page
                }
            }
        }).then(res => {
            if (res.code == 0) {
                console.log(res);
                this.renderMap(res.result)
            }
        })
    }




    renderMap = (result) => {
        //单车起始/结束点
        let bikeList = result.route_list
        //1.创建地图实例
        this.map = new window.BMap.Map("bikeMap");
        let startPoint = bikeList[0].split(',')
        let endPoint = bikeList[bikeList.length - 1].split(',')
        //2.设置中心点
        var point = new window.BMap.Point(endPoint[0], endPoint[1]);
        //2.对地图进行初始化
        this.map.centerAndZoom(point, 11);
        //启用滚轮放大缩小
        this.map.enableScrollWheelZoom()

        //添加控件
        this.map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));
        this.map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));

        // 添加图标
        this.addIcon(startPoint, endPoint, result.route_list)
        //添加服务区域
        this.addArea(result.service_list)
        //创建标注
        this.addLabel(result.bike_list)

    }

    //添加图标及折线
    addIcon = (start, end, bikeList) => {
        //添加图标
        //单车起始左边
        var startPoint = new window.BMap.Point(start[0], start[1]);
        var startIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
            anchor: new window.BMap.Size(18, 42),
            imageSize: new window.BMap.Size(36, 42),
        });
        // 创建标注对象并添加到地图   
        var startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
        //添加标注方法   
        this.map.addOverlay(startMarker);
        //单车结束
        var endPoint = new window.BMap.Point(end[0], end[1]);
        var endIcon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36, 42), {
            anchor: new window.BMap.Size(18, 42),
            imageSize: new window.BMap.Size(36, 42),
        });
        var endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
        this.map.addOverlay(endMarker);
        //绘制折线
        let drawLine = []
        if (bikeList && bikeList.length) {
            bikeList.forEach((ele, i) => {
                let lon = ele.split(',')[0]
                let lat = ele.split(',')[1]
                drawLine.push(new window.BMap.Point(lon, lat))
            })
            let polyline = new window.BMap.Polyline(drawLine, {
                strokeColor: "red", strokeWeight: 3, strokeOpacity: 1
            })
            this.map.addOverlay(polyline)
        }
    }

    //添加服务区域
    addArea = (list) => {
        //绘制区域
        let serviceList = []
        if (list && list.length) {
            list.forEach((ele, i) => {
                serviceList.push(new window.BMap.Point(ele.lon, ele.lat))
            })
            let polyServiceLine = new window.BMap.Polygon(serviceList, {
                strokeColor: "#ef4136", strokeWeight: 3, strokeOpacity: 1,fillColor:''
            })
            this.map.addOverlay(polyServiceLine)
        }
    }

    //创建标注
    addLabel = (item) => {
        let pointLabel = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(36, 42), {
            anchor: new window.BMap.Size(18, 42),
            imageSize: new window.BMap.Size(36, 42),
        });
        
        if (item && item.length > 0) {
            item.forEach(ele => {
                let lng = ele.split(',')[0]
                let lat = ele.split(',')[1]
                let point = new window.BMap.Point(lng, lat)
                var marker = new window.BMap.Marker(point,{icon:pointLabel}); 
                this.map.addOverlay(marker);
            })

        }
    }








    render() {
        const { } = this.state

        return (
            <div>
                <Card>
                    {/* <ListSearch search={this.search} /> */}
                    <BaseForm formList={this.formList} searchVal={this.searchVal} />
                </Card>
                <Card>
                    <div id="bikeMap" style={{ height: 600, width: '100%', minHeight: 500, background: '#fff', marginBottom: 10 }} >

                    </div>
                </Card>

            </div>
        )
    }

}