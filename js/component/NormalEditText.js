/**
 * Created by pain.xie on 2018/3/17.
 * 标准输入框
 */


import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Platform,
  DeviceEventEmitter
} from 'react-native';
import EditText from './EditText';

export default class NormalEditText extends EditText {
  constructor(props) {
    super(props);
  }

}