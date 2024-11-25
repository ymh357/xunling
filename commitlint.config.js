module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', [
        'feat',    // 新功能
        'fix',     // 修复问题
        'docs',    // 文档修改
        'style',   // 代码格式修改
        'refactor',// 代码重构
        'test',    // 测试用例修改
        'chore'    // 其他修改
      ]]
    }
  };