import type OnFire from './onfire'
import OnFireClass from './onfire'

export const EVENTS = {
  /** 图片预览 */
  IMAGE_PREVIEW: 'image:preview',
  /** 显示Toast */
  SHOW_TOAST: 'toast:show',
  /** 隐藏Toast */
  REMOVE_TOAST: 'toast:remove',

  /** 路由转化 */
  ROUTE_CHANGE: 'router:change',
  /** 显示评论面板 */
  COMMENT_SHOW: 'comment:show',
  /** 隐藏评论面板 */
  COMMENT_HIDE: 'comment:hide',
  /** 添加评论 */
  COMMENT_ADD: 'comment:add',
  /** 删除评论 */
  COMMENT_REMOVE: 'comment:remove',
  /** 回复批改人 */
  COMMENT_REPLY_EXAMINER: 'comment:reply:examiner',
  /** 点赞 & 取消点赞 */
  LIKE_TOGGLE: 'like:toggle',
  /** 删除动态 */
  MOMENT_REMOVE: 'moment:remove',
  /** 动态隐私权限更改 */
  MOMENT_VISIBLE_CHANGE: 'moment:visible:change',
  /** 动态列表刷新 */
  MOMENT_LIST_REFRESH: 'moment:list:refresh',
  /** 添加批改作业 */
  HOMEWORK_MARK_ADD: 'homework:mark:add',
  /** 删除批改作业 */
  HOMEWORK_MARK_REMOVE: 'homework:mark:remove',
  /** 训练营动态分享 */
  CAMP_MOMENT_SHARE: 'camp:moment:share',
  /** 媒体相关 */
  media: {
    /** 音频播放 */
    PLAY_LIST_SET: 'play:list:set',
    /** 音频播放 */
    AUDIO_PLAY: 'audio:play',
    /** 音频暂停 */
    AUDIO_PAUSE: 'audio:pause',
    /** 视频播放 */
    VIDEO_PLAY: 'video:play',
    /** 视频暂停 */
    VIDEO_PAUSE: 'video:pause',
    /** 视频播放 */
    PLAY_VIDEO: 'play:video',
    /** 音频播放 */
    PLAY_AUDIO: 'play:audio',
    /** 视频播放某个时间点 */
    TRACK_VIDEO: 'track:video',
    /** 音频播放某个时间点 */
    TRACK_AUDIO: 'track:audio'
  },
  im: {
    /** 消息引用 */
    MESSAGE_QUOTE: 'im:message:quote',
    /** 设置主容器 marginRight */
    MAIN_RIGHT_TOGGLE: 'im:main:right:toggle',
    /** 开始单聊 */
    SINGLE_START: 'im:single:start',
    /** 更新聊天室数据 */
    CHATROOM_UPDATE: 'im:chatroom:update',
    /** 有新的消息 */
    MESSAGE_NEW: 'im:message:has:new',
    /** 讲座聊天室有新通知 */
    LECTURE_NOTIFICATION: 'im:lecture:message'
  },
  search: {
    SHOW: 'search:show',
    HIDE: 'search:hide'
  }
}

/**
 * 全局事件总线实例
 * 用于应用内跨组件通信
 */
const eventBus = new OnFireClass('Magnet-Event-Bus') as OnFire & {
  events: typeof EVENTS
}

export default eventBus

eventBus.events = EVENTS
