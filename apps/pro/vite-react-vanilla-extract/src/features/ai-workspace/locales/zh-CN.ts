import type { LocaleOf } from '@/i18n';

import type { aiWorkspaceEnUS } from './en-US';

export const aiWorkspaceZhCN = {
  agentMode: 'Agent 模式',
  returnToWorkspace: '返回工作台',
  previewHandle: '拖动窗口',
  previewResize: '等比缩放',
  voicePrompt: '说出你想处理的事情',
  voiceReady: '开始语音对话',
  listening: '正在聆听…',
  microphoneRequest: '等待麦克风权限…',
  voiceHint: '点击麦克风，开始说话',
  recordingHint: '说完后点击停止',
  startRecording: '开始录音',
  stopRecording: '停止录音',
  voiceRecording: '你的语音录音',
  discardRecording: '删除录音',
  microphoneUnsupported: '当前浏览器不支持麦克风录音。',
  microphoneDenied: '无法使用麦克风，请检查浏览器权限。',
  accountModeFailed: '模式切换失败，请重试。',
} satisfies LocaleOf<typeof aiWorkspaceEnUS>;
