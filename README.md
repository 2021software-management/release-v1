# release-v3 by zjr



## CI/CD

本仓库现已支持CICD.

当新代码被 `commit` 或者 `pull request`被推送至 `main` 分支时，会触发脚本进行自动编译与部署。

因此，你的任意一次错误提交将有可能导致线上版本的缺陷产生，请提交前完成自测。

如果你发现自己的某次提交导致了线上错误，可以使用以下代码回滚：

```powershell
# 首先找到上一个可以正常运行的版本，记录其版本号，例如 3f3fed8
git checkout main
git fetch
git reset --soft 3f3fed8 # 这里替换为可运行的版本号
git stash
git push -f origin main
git stash pop
```



另外，极其不建议直接在 `main` 分支直接开发。