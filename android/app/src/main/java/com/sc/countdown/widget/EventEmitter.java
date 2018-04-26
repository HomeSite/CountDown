package com.sc.countdown.widget;

import android.appwidget.AppWidgetManager;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by xieshangwu on 2018/4/22
 */

public class EventEmitter {
    private static final String EVENT_SELECT = "event_select";
    private static final String EVENT_DETAIL = "event_detail";
    private static final String EVENT_NORMAL = "event_normal";

    /**
     * 向js发送广播 进入选择状态
     */
    static public void select(ReactContext context, int appWidgetId) {
        Log.e("pain.xie", "EventEmitter select");

        final WritableMap map = Arguments.createMap();
        map.putInt(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        sendEvent(context, EVENT_SELECT, map);
    }

    /**
     * 向js发送广播 进入详情状态
     */
    static public void detail(ReactContext context, String id) {
        Log.e("pain.xie", "EventEmitter detail");

        final WritableMap map = Arguments.createMap();
        map.putString(WidgetBean.KEY_ID, id);
        sendEvent(context, EVENT_DETAIL, map);
    }

    /**
     * 向js发送广播 正常进入界面
     */
    static public void normal(ReactContext context) {
        Log.e("pain.xie", "EventEmitter cancel");
        sendEvent(context, EVENT_NORMAL, Arguments.createMap());
    }

    static private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        try {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        } catch(Exception e) {
            Log.e("pain.xie", "reactContext is null");
        }
    }


}
