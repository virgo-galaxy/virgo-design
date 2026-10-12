import type { LocaleOf } from '@/i18n/locale-types';

import type { avatarExamplesEnUS } from './en-US';
export const avatarExamplesZhCN = {
  copy: {
    exampleCollection: '示例集合',
    demoUser: 'Demo User',
    exampleB: '示例 B',
    exampleAvatar: '示例头像',
    unavailablePortrait: '不可用头像',
    online: '在线',
    person: '个人',
    exampleLabel: '示例区域',
    smallAvatar: '小型头像',
    mediumAvatar: '中型头像',
    largeAvatar: '大型头像',
    imageAndFallback: '图像与后备内容',
    supplyAnImageUrlOrAShortIdentityFallback: '提供图像 URL 或简短身份后备内容。',
    sizes: '尺寸',
    useTheThreeTokenSizesWithoutChangingIdentityContent: '使用三种 token 尺寸，身份内容保持一致。',
    shapes: '形状',
    circleForAPersonSquareForATeamOrEntity: '个人使用圆形；分组或实体使用方形。',
    presenceBadge: '在线状态徽标',
    aBadgeSuppliesPresenceWithoutExpandingTheAvatarApi: 'Badge 提供在线状态，无需扩展 Avatar API。',
    avatarGroup: '头像分组',
    groupASmallCollectionWithAnAccessibleDescription: '通过无障碍描述组织小型集合。',
  },
} satisfies LocaleOf<typeof avatarExamplesEnUS>;
