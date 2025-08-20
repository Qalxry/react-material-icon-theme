import { MaterialIcon, availableIcons, hasIcon, getIconSvg } from './dist/index.esm.js';

console.log('📦 React Material Icon Theme - 构建测试');
console.log('================================');

// 测试图标数据
console.log(`✅ 可用图标总数: ${availableIcons.length}`);

// 测试一些常见图标
const testIcons = ['react', 'javascript', 'typescript', 'css', 'html'];
testIcons.forEach(iconName => {
  const exists = hasIcon(iconName);
  const svg = getIconSvg(iconName);
  console.log(`${exists ? '✅' : '❌'} ${iconName}: ${exists ? '存在' : '不存在'} ${svg ? `(${svg.length} 字符)` : ''}`);
});

// 测试浅色主题变体
console.log('\n🌙 浅色主题测试:');
const lightVariants = ['nodejs', 'blink', 'copilot'];
lightVariants.forEach(iconName => {
  const lightName = `${iconName}_light`;
  const exists = hasIcon(lightName);
  console.log(`${exists ? '✅' : '❌'} ${lightName}: ${exists ? '存在' : '不存在'}`);
});

console.log('\n🎉 构建测试完成！');
