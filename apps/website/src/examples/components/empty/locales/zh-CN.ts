import type { LocaleOf } from '@/i18n/locale-types';

import type { emptyExamplesEnUS } from './en-US';
export const emptyExamplesZhCN = {
  copy: {
    documentCreated: '文档已创建。',
    resetExample: '重置示例',
    documentsEmptyState: '文档空状态',
    noDocuments: '暂无文档',
    createYourFirstDocumentToGetStarted: '创建第一份文档，开始使用。',
    createDocument: '创建文档',
    emptyDocuments: '空文档列表',
    emptyProjects: '空条目列表',
    noProjectsYet: '暂无条目',
    createAProjectToOrganizeYourTeamSWork: '添加一个条目以显示内容。',
    noSearchResults: '无搜索结果',
    noMatchingResults: '没有匹配结果',
    tryADifferentSearchTerm: '尝试其他搜索词。',
    basicMessages: '基础消息',
    consumersOwnAllTitlesAndDescriptions: '所有标题与描述均由使用方提供。',
    iconAndAction: '图标与操作',
    theApplicationHandlesTheActionAndReplacesItsOwnEmpty: '应用处理操作并替换自身的空状态。',
    compactSearchState: '紧凑搜索状态',
    theSmallSizeFitsAConstrainedSurface: '小尺寸适合受限空间。',
    iconTitleDescriptionAction: 'Icon · Title · Description · Action',
    emptyDocumentsHeroState: '文档空状态主样例',
  },
} satisfies LocaleOf<typeof emptyExamplesEnUS>;
