# 发布 Checklist

## 首次发版（v1.1.0）

```bash
# 已经改好了版本号，只需打 tag 推送
git tag v1.1.0
git push --tags
# → GitHub Actions 自动创建 Release + 发布到 npm
```

## 后续发版流程

```bash
# 1. 更新版本号 + 自动打 tag
npm version patch   # 1.0.4 → 1.0.5（修复 bug）
npm version minor   # 1.0.4 → 1.1.0（新增功能）
npm version major   # 1.0.4 → 2.0.0（不兼容变更）

# 2. 推送到远程 → 自动触发 Release
git push --tags
```

## 触发后 GitHub Actions 自动完成

- [ ] `npm ci` + `npm run build` — 构建
- [ ] 创建 GitHub Release（自动生成 release notes）
- [ ] 发布到 npm（使用 `NPM_TOKEN`）

## 如果手动发布

```bash
npm login
npm publish
```

## CI 流程（每次 push 自动运行）

- `ci.yml` — type-check / lint / build / test-example
- `deploy.yml` — 部署 demo 到 GitHub Pages
