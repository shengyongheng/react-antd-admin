module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [2, "never"],
    "scope-empty": [2, "never"],
    "subject-empty": [2, "never"],

    "body-empty": [2, "always"],
    "footer-empty": [2, "always"],

    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "chore",
      ],
    ],
  },
  prompt: {
    questions: {
      type: {
        description: "<类型> 选择您要提交的更改类型：",
        enum: {
          feat: {
            description: "新功能",
            title: "Features",
          },
          fix: {
            description: "修复bug",
            title: "Bug Fixes",
          },
          docs: {
            description: "单纯的文档内容的改动",
            title: "Documentation",
          },
          style: {
            description: "不影响代码含义或功能的修改（比如代码格式等）",
            title: "Styles",
          },
          refactor: {
            description: "既不是 bug 修复也不是功能添加的代码，如：重构",
            title: "Code Refactoring",
          },
          perf: {
            description: "性能优化方面的代码",
            title: "Performance Improvements",
          },
          test: {
            description: "测试补全",
            title: "Tests",
          },
          build: {
            description:
              "影响构建系统或外部依赖项的更改（示例范围：docker、cicd...）",
            title: "Builds",
          },
          chore: {
            description: "杂项，比如代码构建流程、辅助工具等的修改",
            title: "Chores",
          },
        },
      },
      scope: {
        description: "<范围> 此更改的范围是什么（例如组件或文件名）",
      },
      subject: {
        description: "<主题> 为变更写一个简短的、命令式的时态描述",
      },
      body: {
        description: "正文部分写这次改动的动机。（可选）",
      },
      footer: {
        description: "注脚（可选）",
      },
    },
  },
};
