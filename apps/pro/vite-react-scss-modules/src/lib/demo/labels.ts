import type { WorkLocationDto } from '@/api/users/types';

const zh: Record<string, string> = {
  China: '中国',
  'United Kingdom': '英国',
  Japan: '日本',
  India: '印度',
  Indonesia: '印度尼西亚',
  Philippines: '菲律宾',
  'United Arab Emirates': '阿联酋',
  Ghana: '加纳',
  'United States': '美国',
  Nigeria: '尼日利亚',
  'South Korea': '韩国',
  Germany: '德国',
  Brazil: '巴西',
  Mexico: '墨西哥',
  Singapore: '新加坡',
  Shanghai: '上海',
  Tokyo: '东京',
  Bengaluru: '班加罗尔',
  Jakarta: '雅加达',
  Manila: '马尼拉',
  Dubai: '迪拜',
  Accra: '阿克拉',
  'New York': '纽约',
  Lagos: '拉各斯',
  London: '伦敦',
  Seoul: '首尔',
  Berlin: '柏林',
  'São Paulo': '圣保罗',
  'Mexico City': '墨西哥城',
  'October release handoff': '十月版本交接',
  'Support release handoff': '客服版本交接',
  'Review delivered support workflows with the team.': '与团队共同检查已交付的客服工作流程。',
  'Review product, order and payment delivery before the online store release.':
    '在商城发布前检查商品、订单与支付的交付情况。',
  'Online Store': '网上商城',
  'Booking System': '预约系统',
  'Support Desk': '客服工单系统',
  'Inventory System': '库存管理系统',
  Products: '商品管理',
  Search: '搜索',
  Cart: '购物车',
  Orders: '订单',
  Payments: '支付',
  'After-sales': '售后',
  'Service catalog': '服务目录',
  Availability: '预约时段',
  Reservations: '预约下单',
  Rescheduling: '改期取消',
  Reminders: '通知提醒',
  Administration: '管理后台',
  'Ticket intake': '工单提交',
  Routing: '分类分派',
  Collaboration: '处理协作',
  Notifications: '消息通知',
  'Knowledge base': '知识库',
  Reporting: '服务统计',
  'Item catalog': '商品档案',
  Receiving: '采购入库',
  Dispatch: '销售出库',
  Stocktaking: '库存盘点',
  'Stock alerts': '库存预警',
  'Audit log': '操作记录',
  Administrator: '平台管理员',
  Platform: '平台',
  'Project manager': '项目经理',
  'Product manager': '产品经理',
  'Product designer': '产品设计师',
  'Frontend engineer': '前端工程师',
  'Backend engineer': '后端工程师',
  'QA engineer': '测试工程师',
  'DevOps engineer': '运维工程师',
  'Project management': '项目管理',
  Product: '产品',
  Design: '设计',
  Engineering: '研发',
  'Quality assurance': '测试',
  Operations: '运维',
  'Plan delivery': '制定交付计划',
  'Define requirements': '梳理产品需求',
  'Design screens and interactions': '设计页面与交互',
  'Build the main screen': '开发主要页面',
  'Implement the main API': '实现核心接口',
  'Handle validation and recovery': '完善校验与异常恢复',
  'Enforce business rules': '实现业务规则',
  'Test the complete user journey': '测试完整业务流程',
  'Verify errors and accessibility': '验证异常与无障碍体验',
  'Configure deployment and monitoring': '配置部署与监控',
  'Optimize queries and response times': '优化查询与响应速度',
  'Polish mobile and dense layouts': '完善移动端与紧凑布局',
  'Requirements agreed': '需求确认',
  'Integration review': '联调评审',
  'Release checkpoint': '发布检查',
  'Browse products, place orders and pay online.': '浏览商品、提交订单并在线支付。',
  'Choose a service and reserve an available time.': '选择服务并预约可用时段。',
  'Submit customer issues and track their resolution.': '提交客户问题，跟踪工单处理结果。',
  'Track stock received, dispatched and counted.': '管理入库、出库和盘点，掌握库存变化。',
  'Deliver a reliable shopping journey from product discovery to payment and after-sales support.':
    '串联商品浏览、下单支付与售后，提供可靠的购物体验。',
  'Let customers book, reschedule and cancel appointments without time conflicts.':
    '让客户方便地预约、改期和取消，避免时段冲突。',
  'Give customers and support agents a clear path from a reported issue to a resolved ticket.':
    '让客户与客服看清问题从提交到解决的全过程。',
  'Keep inventory accurate with traceable stock movements, reconciliation and low-stock alerts.':
    '通过可追溯的库存变动、盘点核对和低库存预警，保持库存准确。',
  'Confirm scope, ownership and the release checkpoint.': '确认范围、人员分工和发布检查点。',
  'Document the user journey, business rules and acceptance examples.':
    '明确用户流程、业务规则与验收示例。',
  'Provide responsive screens with loading, empty and error states.':
    '提供响应式页面，涵盖加载、空数据和错误状态。',
  'Connect the main screen to its API and support keyboard navigation.':
    '将主要页面接入接口，并支持键盘操作。',
  'Validate inputs and return the documented success and error responses.':
    '校验输入，按照接口约定返回成功和错误响应。',
  'Keep user input on failure and offer a clear retry action.':
    '失败时保留输入，并提供清晰的重试入口。',
  'Cover duplicate requests, invalid transitions and boundary conditions.':
    '处理重复请求、无效状态变化和边界情况。',
  'Verify the successful journey across screens and APIs.': '验证跨页面和接口的完整业务流程。',
  'Check keyboard access, readable errors and failure recovery.':
    '检查键盘访问、错误提示和失败恢复。',
  'Prepare the staging configuration, health checks and rollback notes.':
    '准备测试环境配置、健康检查和回滚说明。',
  'Measure the main queries and verify indexes and paginated responses.':
    '测量主要查询性能，验证索引和分页响应。',
  'Verify small screens, long labels and the dense table layout.':
    '检查小屏幕、长文本和紧凑表格布局。',
  'Review the working screens, APIs and test results with the project manager.':
    '与项目经理共同检查页面、接口和测试结果。',
  'Confirm delivery readiness, deployment and remaining follow-up tasks.':
    '确认交付准备、部署安排和剩余跟进任务。',
  'Anika Rao': 'Anika Rao（阿妮卡）',
  'Leo Martin': 'Leo Martin（利奥）',
  'Nina Wu': 'Nina Wu（妮娜）',
  'Ren Sato': 'Ren Sato（莲）',
  'Mei Lin': 'Mei Lin（美琳）',
  'Arjun Mehta': 'Arjun Mehta（阿尔琼）',
  'Maya Singh': 'Maya Singh（玛雅）',
  'Adi Pratama': 'Adi Pratama（阿迪）',
  'Linh Nguyen': 'Linh Nguyen（琳）',
  'Paolo Santos': 'Paolo Santos（保罗）',
  'Nour Haddad': 'Nour Haddad（努尔）',
  'Omar Nasser': 'Omar Nasser（奥马尔）',
  'Salma Mansour': 'Salma Mansour（萨尔玛）',
  'Kwame Mensah': 'Kwame Mensah（夸梅）',
  'Ama Boateng': 'Ama Boateng（阿玛）',
  'Malik Johnson': 'Malik Johnson（马利克）',
  'Zuri Okafor': 'Zuri Okafor（祖里）',
  'Ethan Reed': 'Ethan Reed（伊桑）',
  'Clara Evans': 'Clara Evans（克拉拉）',
  'Jun Park': 'Jun Park（俊）',
  'Elena Meyer': 'Elena Meyer（埃琳娜）',
  'Mateo Silva': 'Mateo Silva（马特奥）',
  'Lucia Moreno': 'Lucia Moreno（露西亚）',
  'Alex Rivera': 'Alex Rivera（亚历克斯）',
};
export function businessLabel(value: string, language: string): string {
  if (!language.startsWith('zh')) return value;
  if (zh[value]) return zh[value];
  if (value.endsWith(' · Virgo Studio'))
    return `${businessLabel(value.slice(0, -15), language)} · Virgo Studio`;
  const titleParts = value.split(': ');
  if (titleParts.length === 2 && zh[titleParts[0]!] && zh[titleParts[1]!])
    return `${zh[titleParts[0]!]}：${zh[titleParts[1]!]}`;
  const description = value.match(
    /^(.+\.) Scope: (.+) in (.+)\. The project manager confirms delivery after submission\.$/,
  );
  if (description && zh[description[1]!] && zh[description[2]!] && zh[description[3]!])
    return `${zh[description[1]!]}范围：${zh[description[3]!]}的${zh[description[2]!]}模块。提交后由项目经理确认交付。`;
  const milestone = value.match(/^Agree on the six modules and acceptance criteria for (.+)\.$/);
  if (milestone && zh[milestone[1]!]) return `确认${zh[milestone[1]!]}的六个模块与验收标准。`;
  return value;
}

export function formatWorkLocation({ region, city }: WorkLocationDto, language: string): string {
  const regionLabel = businessLabel(region, language);
  const cityLabel = businessLabel(city, language);
  if (region === city) return cityLabel;
  return language.startsWith('zh')
    ? `${regionLabel} · ${cityLabel}`
    : `${cityLabel}, ${regionLabel}`;
}
