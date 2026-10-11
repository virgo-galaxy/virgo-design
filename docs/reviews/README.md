# Review 记录与资产保留规则

`docs/reviews` 长期保存 review Markdown、最终 summary、结构化 JSON 审计记录，以及少量用于解释设计的 canonical screenshots。

## 视觉审计产物

浏览器验收截图、主题／语言／尺寸矩阵、before/after、过程调试截图、contact sheets 和录屏默认是临时 artifacts。新的视觉审计将这些文件输出到仓库根目录的 `artifacts/visual-audits/<审计名称>/`，或系统临时目录；这些临时截图不长期提交到 Git。Playwright CLI 的 `.playwright-cli/` 目录也由 Git 忽略。

审计结束后，将结论、覆盖范围、关键结果和局限写入 review Markdown；需要保留的计算样式、几何、交互和检查结果保存为结构化 JSON。JSON 中原有的截图文件名或路径属于历史运行记录，不保证对应的临时图片长期存在。

## Canonical screenshots

长期展示图集中存放在 `assets/canonical/`。每张图应有明确的文档用途，并由 Markdown 引用；只选择代表最终设计的少量图片，不把验收矩阵或调试过程搬入此目录。

当前不保留截图，历史过程截图、矩阵图和展示图均已清理；保留原有 Markdown 审计结论与 JSON 记录。

`.gitignore` 默认忽略 `docs/reviews` 中新增的截图。以后确实需要增加 canonical screenshot 时，在此说明长期文档用途、添加 Markdown 引用，并在 `.gitignore` 中显式放行对应文件。

清理临时截图时，同步移除 Markdown 中对应的图片嵌入和图片链接；保留文字审计结论与 JSON 原始记录。
