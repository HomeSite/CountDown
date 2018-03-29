/**
 * Created by pain.xie on 2018/3/26.
 * 备份页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import BaseScene from "./BaseScene";
import {inject, observer} from 'mobx-react';
import {getWidth} from "../util/Utils";
import DescribeView from "../component/setting/DescribeView";
import BackupList from "../component/BackupList";
import {Theme} from "../common/Theme";
import Stores from "../stores";
import {useStrict, toJS} from 'mobx';

@inject('dataStore')
@observer
export default class BackupScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '备份/还原',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dataStore.fetchBackupData();
  }

  backup() {
    this.props.dataStore.backup();
  }

  restore() {

  }

  render() {
    let store = this.props.dataStore;
    return (
      <View style={styles.container}>

        <View>
          <DescribeView
            text='自动备份'
          />
          <BackupList
            data={toJS(store.autoBackupData)}
          />
          <DescribeView
            text='手动备份'
          />
          <BackupList
            data={toJS(store.backupData)}
          />
        </View>

        <View style={styles.btnContainer}>

          <Text
            style={styles.btnBackup}
            onPress={() => this.backup()}
          >备份</Text>
          <Text
            style={styles.btnRestore}
            onPress={() => this.restore()}
          >还原</Text>
        </View>

        <Text style={styles.account}>
          {`当前账户: ${Stores.userStore.username}`}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: getWidth(28)

  },
  btnBackup: {
    fontSize: getWidth(18),
    paddingHorizontal: getWidth(50),
    paddingVertical: getWidth(10),
    borderRadius: getWidth(2),
    borderWidth: 1,
    color: Theme.color.btnBlue,
    borderColor: Theme.color.btnBlue,
  },
  btnRestore: {
    fontSize: getWidth(18),
    paddingHorizontal: getWidth(50),
    paddingVertical: getWidth(10),
    borderRadius: getWidth(2),
    borderWidth: 1,
    color: Theme.color.red,
    borderColor: Theme.color.red
  },
  account: {
    color: Theme.color.textGray,
    marginTop: getWidth(12),
    fontSize: 12,
    alignSelf: 'center'
  }
});