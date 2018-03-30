/**
 * Created by xieshangwu on 2018/3/11.
 * 详情页
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AppState,
} from 'react-native';
import {getWidth} from "../util/Utils"
import DateUtil from "../util/DateUtil";
import BaseScene from "./BaseScene";
import {Theme} from "../common/Theme";
import Stores from "../stores";
import AnalyticsUtil from '../util/um/AnalyticsUtil'
import {APP_EVENT} from "../common/Constants";

const REFRESH_TIME = 57;
export default class DetailScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '详情',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: 'white',
      day: '',
      hour: '',
      minute: '',
      second: '',
      millisecond: '',
      dateText: ''
    };
    this.handleData();
  }

  handleData() {
    // pain.todo 刷新优化
    this.data = Stores.dataStore.currentItemData;
    let timestamp = this.data.timestamp;
    let isOverdue = DateUtil.isOverdue(timestamp);

    this.name = isOverdue ?
      this.data.name + ' 已经' : '距离 ' + this.data.name + ' 还有';
    this.color = this.data.color || (isOverdue ? Theme.color.lightCyan : Theme.color.orange);
    this.day = DateUtil.getDaysCount(timestamp);
    this.hour = DateUtil.getHour(timestamp);
    this.minute = DateUtil.getMinute(timestamp);
    this.second = DateUtil.getSecond(timestamp);
    this.millisecond = DateUtil.getMillisecond(timestamp);
    this.dateText = DateUtil.getDataAndWeek(timestamp);

    this.setState({
      name: this.name,
      color: this.color,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      millisecond: this.millisecond,
      dateText: this.dateText
    })
  }

  componentDidMount() {
    AppState.addEventListener('change', (nextAppState) => this.handleAppStateChange(nextAppState));
    this.startTime();
    AnalyticsUtil.onEvent(APP_EVENT.DetailScene);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', (nextAppState) => this.handleAppStateChange(nextAppState));
    this.stopTime();
  }

  /**
   * app 前后台运行时 启动/停止 计时器
   * @param nextAppState
   */
  handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.startTime();
    } else {
      this.stopTime();
    }
  }

  /**
   * 启动计算器刷新
   */
  startTime() {
    this.timer = setInterval(() => this.handleData(), REFRESH_TIME)
  }

  /**
   * 停止计时器
   */
  stopTime() {
    this.timer && clearInterval(this.timer);
  }

  edit() {
    this.props.navigation.navigate('EditScene');
    AnalyticsUtil.onEvent(APP_EVENT.Edit);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={[styles.titleContainer, {backgroundColor: this.state.color}]}>
            <Text style={styles.name}>{this.state.name}</Text>
          </View>

          <View style={styles.dayContainer}>
            <Text style={styles.day}>{this.state.day}</Text>
            <Text style={styles.dayUnit}>天</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.number}>{this.state.hour}</Text>
            <Text style={styles.unit}>时</Text>
            <Text style={styles.number}>{this.state.minute}</Text>
            <Text style={styles.unit}>分</Text>
            <Text style={styles.number}>{this.state.second}</Text>
            <Text style={styles.unit}>秒</Text>
            <Text style={styles.number}>{this.state.millisecond}</Text>
          </View>

          <View style={styles.divide}/>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{this.state.dateText}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => this.edit()}
        >
          <Image
            source={require('../../res/image/edit.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: getWidth(303),
    marginTop: getWidth(52),
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: getWidth(8),
    elevation: 2,
    shadowColor: Theme.color.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },
  titleContainer: {
    width: '100%',
    height: getWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: getWidth(8),
    borderTopLeftRadius: getWidth(8),
    elevation: 2,
    shadowColor: Theme.color.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
  },
  name: {
    fontSize: getWidth(18),
    color: 'white',
  },

  dayContainer: {
    marginTop: getWidth(26),
    flexDirection: 'row'
  },
  day: {
    color: 'black',
    fontSize: getWidth(72),
    marginRight: getWidth(12)
  },
  dayUnit: {
    fontSize: getWidth(24),
    marginTop: getWidth(45)
  },

  timeContainer: {
    marginTop: getWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  number: {
    textAlign: 'center',
    fontSize: getWidth(24),
    color: '#4A4A4A',
    width: getWidth(30)
  },
  unit: {
    fontSize: getWidth(12),
    marginHorizontal: getWidth(4),
    marginTop: getWidth(12)
  },

  divide: {
    width: '100%',
    height: 0.5,
    opacity: 0.3,
    marginTop: getWidth(55),
    backgroundColor: Theme.color.divide,
  },

  dateContainer: {
    width: '100%',
    height: getWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F6F5',
    borderBottomLeftRadius: getWidth(8),
    borderBottomRightRadius: getWidth(8),
  },
  dateText: {
    fontSize: getWidth(18),
    color: '#4A4A4A',
  },

  imageContainer: {
    position: 'absolute',
    right: getWidth(36),
    bottom: getWidth(54),
    elevation: 2,
    shadowColor: '#666666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  }
});