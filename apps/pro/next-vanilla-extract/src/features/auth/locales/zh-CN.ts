import type { LocaleOf } from '@/i18n';

import type { authEnUS } from './en-US';

export const authZhCN = {
  login: {
    pageControls: '语言与外观',
    workspace: '团队项目工作空间',
    heroTitle: '让每个想法，',
    heroAccent: '都有清晰的下一步。',
    heroDescription:
      '在一个工作空间里连接项目、任务与团队。明确分工，推动协作，让每一步进展都看得见。',
    features: {
      projects: {
        title: '项目有条理',
        description: '从项目到模块，清晰组织每项工作。',
      },
      collaboration: {
        title: '协作有分工',
        description: '不同身份，各有自己的工作视图。',
      },
      progress: {
        title: '进展看得见',
        description: '任务、工作台与分析同步呈现进度。',
      },
    },
    teamWorkspace: '团队工作空间',
    projects: '演示项目',
    people: '团队成员',
    tasks: '关联任务',
    sampleTask: '开发商品列表与详情页',
    sampleProject: '网上商城 / 商品管理',
    previewNote: '项目、模块和任务，串成一个完整的工作过程。',
    welcome: '欢迎回来',
    description: '登录 Virgo Studio，继续你的工作。',
    account: '账号',
    password: '密码',
    accountPlaceholder: '输入你的账号',
    passwordPlaceholder: '输入密码',
    showPassword: '显示密码',
    hidePassword: '隐藏密码',
    signIn: '登录工作空间',
    signingIn: '正在登录…',
    invalidCredentials: '账号或密码不正确，请检查后重试。',
    failed: '登录失败，请稍后重试。',
    expired: '登录已过期，请重新登录。',
    demoTitle: '体验不同的角色',
    demoBadge: '演示账号',
    demoDescription: '选择一个账号，体验对应的工作视图。',
    chooseAccount: '选择演示账号',
    sharedPassword: '所有演示账号使用相同密码',
    fillPassword: '填入密码',
    allProjects: '全部项目与平台设置',
    retryAccounts: '重新加载演示账号',
    loadingAccounts: '正在加载演示账号…',
    footer: '让工作更清晰，让协作更轻松。',
    roles: {
      admin: '平台管理员',
      manager: '项目经理',
      member: '团队成员',
    },
  },
  signOut: '退出系统',
  signingOut: '正在退出…',
  signOutFailed: '退出失败，请重试。',
} satisfies LocaleOf<typeof authEnUS>;
