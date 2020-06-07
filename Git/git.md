# git常用命令

## git 设置用户名密码

```shell
git config --global user.name "xxxx"
git config --global user.email "xxxx@xxx.com"
```

## 克隆新的git仓储

```shell
git clone xxxx:xxx.git
cd project
touch READER.MD
git add READER.MD
git commit -m 'add READER'
git push -u origin master
```

## 关联已存在的文件夹

```shell
cd existing_folder
git init
git remote add origin xxxx:xxx.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

## 关联已存在的git仓储

```shell
cd exiting_repo
git remote rename origin old-origin
git remote add origin xxxx:xxx.git
git push -u origin --all
git push -u origin --tags
```
