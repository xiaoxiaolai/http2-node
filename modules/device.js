/**
 * 终端设备（传感器）数据模型，
 * 其中可分为两部分
 * 1. 用户决定的数据：
 *      名称（name）、
 *      标签（tags）、
 *      坐标（lonlat，GPS传感器除外）、
 *      预警策略（alarms）、
 *      室内地图（mapId、indoorInfo）、
 *      所有者（owners）、
 *      指定显示类型（sensorTypes）、
 *      设备分组（deviceGroup）等信息；
 * 2. 设备（系统）决定的数据：其他如设备编号（sn）、appId、设备数据（sensorData）、IoT设备类型（deviceType）、联合类型（unionType）等信息。
 * 更新策略为避免竞态，尽量使用update等原子操作
 */

const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    sn: {type: String, unique: true},
    appId: {type: String},
    _oldAppId: {type: String},
    // 被分配到的账号
    owners: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // 室内地图id
    mapId: {type: mongoose.Schema.Types.ObjectId, ref: 'Indoormap'},
    // 室内地图详细信息
    indoorInfo: {
        type: mongoose.Schema.Types.Mixed,
        // 层数
        groupId: {type: Number},
        // 室内地图坐标
        x: {type: Number},
        // 室内地图坐标
        y: {type: Number},
    },
    name: {type: String},
    // 设备包含的传感器类型
    sensorTypes: {type: Array, default: []},
    deviceType: {type: String},
    // 设备类型唯一确定值
    unionType: {type: String},
    // 故障数据，格式化metaData的error {error_type: [1,2,3], error_msg: ''}
    /**
     * {
     *   [malfunctionTypeString]:{
     *      type: malfunctionType,
     *      typeDescription: malfunctionTypeString,
     *      description: typeDesc,
     *      details: {
     *          type: malfunctionSubType,
     *          typeDescription: malfunctionSubTypeString,
     *          description: SubTypeDesc,
     *      }
     *   },
     *   ...,
     *   description: error_msg}
     */
    malfunctionData: {
        type: mongoose.Schema.Types.Mixed,
    },
    // 传感器数据
    sensorData: {
        // nb smoke 信号相关值
        SNR: Number,
        CSQ: Number,
        RSRP: Number,
        battery: Number,
        // 传输周期, 单位S, 自定义数据中会有此字段
        interval: Number,
        // 温度
        temperature: Number,
        // 湿度
        humidity: Number,
        // 井盖传感器 ,false 打开, true 正常
        jinggai: Boolean,
        // 滴漏传感器   0 无滴漏 1 滴漏
        drop: {type: Number, enum: [0, 1]},
        // 一氧化碳传感器
        co: Number,
        // 二氧化碳传感器
        co2: Number,
        // 通断监测传感器
        connection: Boolean,
        // 甲烷传感器
        ch4: Number,
        // 废弃的甲烷传感器
        ch4_depre: Number,
        // pm2.5
        pm2_5: Number,
        // pm10
        pm10: Number,
        // 跑冒滴漏标准数据
        leak: Number,
        // 液化石油气标准数据
        lpg: Number,
        // 水位（测距）传感器数据
        distance: Number,
        // 水位（测距）传感器的标定值
        calibration: Number,
        // 光线传感器数据
        light: Number,
        // 标准井盖传感器，表示是否闭合 false:开启  true:正常
        cover: Boolean,
        // 标准井盖传感器，表示液位是否到达预警值, false: 正常  true: 水位预警
        level: Boolean,
        // 温度贴片
        temp1: Number,
        // 电压值
        vol_val: Number,
        // 电流值
        curr_val: Number,
        // 用电量
        elec_energy_val: Number,
        // rfid读卡器数据
        rfid: String,
        ID: Number,
        // 百分比甲烷
        lel: Number,
        // 压强
        pressure: Number,
        // 设备是否安装正确
        installed: Boolean,
        // 红外感应
        infrared: Boolean,
        // 功总电能
        TOTAL_POWER: Number,
        // A相电压
        VOLTAGE_A: Number,
        // B相电压
        VOLTAGE_B: Number,
        // C相电压
        VOLTAGE_C: Number,
        // A相电流
        CURRENT_A: Number,
        // B相电流
        CURRENT_B: Number,
        // C相电流
        CURRENT_C: Number,
        // 手动报警
        manual_alarm: Boolean,
        // 声光报警
        sound_light_alarm: Boolean,
        // 漏电流
        leakage_val: Number,
        // 电线温度
        temp_val: Number,
        // 功率
        power_val: Number,
        // 烟感      false:正常 true:撞击
        smoke: Boolean,
        // 门锁  false:打开 true:关闭
        door: Boolean,
        // 人工煤气
        artificialGas: Number,
        // 地磁传感器，表示是否有车辆经过 false:无 true:有车辆经过
        magnetic: Boolean,
        // 纬度值
        latitude: Number,
        // 经度值
        longitude: Number,
        // 海拔值
        altitude: Number,
        // 电线温度1
        t1_val: Number,
        // 电线温度2
        t2_val: Number,
        // 电线温度3
        t3_val: Number,
        // 电线温度4
        t4_val: Number,
        // A相电压
        a_val: Number,
        // B相电压
        b_val: Number,
        // C相电压
        c_val: Number,
        // A相电流
        a_curr: Number,
        // B相电流
        b_curr: Number,
        // C相电流
        c_curr: Number,
        // 总有功功率
        total_yg: Number,
        // 总无功功率
        total_wg: Number,
        // 总视在功率
        total_sz: Number,
        // 总功率因数
        total_factor: Number,
        // 有功功率
        yg: Number,
        // 总无功功率
        wg: Number,
        // 总视在功率
        sz: Number,
        // 总功率因数
        factor: Number,
        // 浪泳 for 曼顿空开 true 有浪涌 false 无浪涌
        surge: Boolean,
        // 短路 for 曼顿空开 true 短路 false 正常
        shortCircuit: Boolean,
        // 闭合状态 for 曼顿空开 true 合闸 false 分闸
        swOnOff: Boolean,
        // 电火花 for 曼顿空开 true 有电火花 false 无电火花
        spark: Boolean,
        // 电弧
        arc: Boolean,
        // 自定义数据
        customer: String,
        // 自研ch4
        ch4_bay: Number,
        ch4L1: Number,
        ch4L2: Number,
        ch4L3: Number,
        // 自研lpg
        lpg_bay: Number,
        lpgL1: Number,
        lpgL2: Number,
        lpgL3: Number,
        // 喷淋开关
        switch: Boolean,
        level_val: Number,
        // 撞击
        hit: Boolean,
        // 放水
        water_release: Boolean,
        // 上电状态
        ac_connection: Boolean,
    },
    tags: {type: Array},
    lonlat: {type: [Number], index: '2d', default: [0, 0]},
    // 传输周期, 单位S
    interval: Number,
    // 绑定的报警规则, 报警规则同时会下行到硬件
    alarms: {
        mappingList: [
            {
                sensorTypes: {type: String},
                // mapping的唯一id
                id: {type: String},
                // mapping类型值，自定义字段
                productType: {type: String},
                // mapping名称，自定义字段
                name: {type: String},
            },
        ],
        // 是否产生预警记录的时间段
        durations: [
            {
                // 开始时间 单位秒
                begin: Number,
                // 结束时间 单位秒
                end: Number,
                // 开启状态
                enabled: Boolean,
            }
        ],
        // 预警规则
        rules: [
            {
                sensorTypes: {type: String},
                // 阀值
                thresholds: {type: Number, required: true},
                conditionType: {type: String, enum: ['gt', 'gte', 'lt', 'lte']},
                alarmSwitch: {type: Boolean, default: true},
            },
        ],
        battery: [
            {
                thresholds: {type: Number},
                conditionType: {type: String, enum: ['gt', 'gte', 'lt', 'lte']},
                sensorTypes: {type: String},
            },
        ],
        // 单独的报警联系人
        notification: {
            contact: {type: String},
            content: {type: String},
            types: {type: String, enum: ['email', 'phone', 'landLine'], default: 'phone'},
        },
        // 报警多联系人
        notifications: [{
            contact: {type: String},
            content: {type: String},
            types: {type: String, enum: ['email', 'phone', 'landLine'], default: 'phone'},
        }],
        createTime: {type: Date, default: Date.now},
    },
    // 用于前端展示的状态值， 0 报警，1 正常，2 失联，3 未激活
    status: {type: Number},
    // status sorter field
    statusPriority: {type: Number},
    // 当前数据是否达到用户设定的报警状态 1 正常, 2, 报警
    alarmStatus: {type: Number},
    // 新的故障状态 1 正常, 2 故障
    malfunctionStatus: {
        type: Number,
    },
    // 设备是否处于自检状态
    selfCheckStatus: {type: Boolean, default: false},
    selfCheckAllowNotice: {type: Boolean, default: false},
    // 设备是否故障以及故障信息 // 旧的故障数据结构
    error: {
        // 故障状态
        status: {type: Boolean, default: false},
        // 故障类型
        type: {type: String},
        // 故障信息
        message: {type: String},
    },
    // 一个报警设置下可能有多个规则，只有所有规则都未报警，alarmStatus 才会为 1
    alarmsRecords: [
        {
            sensorTypes: {type: String},
            alarmStatus: Number,
        },
    ],
    // 记录一下之前的故障状态，方便后续判断是否需要推送
    malfunctionRecords: [
        {
            malfunctionType: {type: Number},
            malfunctionStatus: {type: Number},
        },
    ],
    // mapping规则可能对应多个id，只有所有规则未命中，alarmStatus 才会为 1
    hitsRecords: [
        {
            sensorTypes: {type: String},
            id: String,
            hit: Boolean,
        },
    ],
    // 信号状态
    signal: {
        // 信噪比
        snr: Number,
        // 信号强度
        rssi: Number,
        // 质量描述
        quality: String,
    },
    // 投保状态  0--未投保  1--已投保  2--投保过期
    sensorInsurance: { type: Number, default: 0 },

    other: {
        password: String,
        imei: String,
        imsi: String,
        iccid: String,
    },
    // 设备备注
    remark: String,
    // 关联时间
    relationTime: {type: Date, default: Date.now},
    // 部署标识位，只有部署的设备才能触发‘报警’，‘故障’等业务逻辑
    deployFlag: {type: Boolean, default: false},
    // 设备部署时间
    deployTime: {type: Date},
    createTime: {type: Date, default: Date.now},
    lastUpdatedTime: Date,
    msgId: String,
    // 百度鹰眼平台对应 entity_name 是否存在
    entityNameExist: {type: Boolean, default: false},
    updatedTime: Date,
    // 设备硬件版本号
    hardwareVersion: {type: String},
    // 设备固件版本号
    firmwareVersion: {type: String},
    deviceGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'DeviceGroup'},

    // 上行覆盖率
    upCoverage: {type: Number},
    // 上行成功率
    upSuccessRate: {type: Number},
    // status刷库标志位
    statusChanged: {type: Boolean, default: true},
    // 初始配置
    config: {type: mongoose.Schema.Types.Mixed},
    // 部署图片
    deployPics: {type: [String], default: []},
    // 设备是否处于演示模式
    demoMode: {type: Number, default: 0},
    // 设备的geohash值，用于地图聚合
    geohash: {type: String},

});


schema.index({'signal.quality': -1});
schema.index({sn: -1});
schema.index({indexTags: -1});
schema.index({status: -1});
schema.index({statusPriority: -1});
schema.index({appId: 1});
schema.index({owners: -1});
schema.index({sensorTypes: -1});
schema.index({indoormap: -1});
schema.index({deviceGroup: -1});
schema.index({'sensorData.interval': -1});
schema.index({'sensorData.battery': -1});
schema.index({status: -1, sn: -1});
schema.index({statusPriority: 1, updatedTime: -1});
schema.index({owners: 1, createTime: -1});
schema.index({upCoverage: -1});
schema.index({upSuccessRate: -1});
schema.index({name: -1}, {collation: {locale: 'zh'}, background: true, name: '_name_locale_zh_'});

schema.set('versionKey', false);

if (!schema.options.toJSON) {
    schema.options.toJSON = {
        minimize: false
    };
}

schema.options.toJSON.transform = function (doc, ret) {};

const deviceModel = mongoose.model('Device', schema);

module.exports = deviceModel;
