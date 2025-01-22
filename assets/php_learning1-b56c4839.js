const n=`---\r
title: PHP 学习\r
date: 2019-06-21\r
summary: 呐呐，不要一味的玩前端，久了可能会腻的，换个语言来玩，可以学点新的知识也是不错的。一直漫步在前端领域，对后台语言完全是一片空白啊。\r
---\r
\r
呐呐，不要一味的玩前端，久了可能会腻的，换个语言来玩，可以学点新的知识也是不错的。一直漫步在前端领域，对后台语言完全是一片空白啊。\r
我一开始看的是兄弟连的视频教程(进入懵逼状态)，后来跟着整整 100 个 php 实例走了一遍，算是入门了吧，于是在发现了[慕课网](http://www.imooc.com/)后，我又跟着那个商城的去做了，说实话，慕课的教程还真是很不错的。\r
\r
### Start\r
\r
我们要在本地运行 php，就要有适合 php 运行的环境，那么就要搭建环境啦(win 系统 WAMP，W 即\`Windows系统\`，A 即是\`Apache\`，M 即是\`MySQL\`还有 P 呢就是\`PHP\`)。我是直接用的\`phpStudy\`，很轻松的就完成了环境搭建，但是问题来了也是会搞得你死去活来的~网上有很多环境集成的软件，随便找一款，总有一款适合你的。\r
\r
### PHP、MySQL\r
\r
#### PHP\r
\r
我之前网上找来的过时的 php 实例，不过也没啥影响(大概吧)，有兴趣的话可以看[这里](https://git.coding.net/littlezong/PHPLearning.git)。\r
至于 MySQL，来来去去就\`增删查改\`几个命令，不怕的:\r
\r
#### MySQL 命令\r
\r
进入\`mysql/bin\`，键入\`mysql -u 用户名 -p\`，回车后输入密码就可以登录数据库了。\r
进入数据库后，执行\`show databases\`可以看到有已经建好的数据库了，我们就不要了，新建个：\r
\r
\`\`\`mysql\r
create database 数据库名;	//注意mysql命令操作一定要加上;\r
\`\`\`\r
\r
建好后再执行一下\`show databases\`就可以看到建好的数据库了，这时可以使用\`drop database 数据库名\`来删除数据库；\r
连接(or 使用)数据库：\`use 数据库名\`就可以了，会提示\`Database changed\`；\r
选择好数据库后，\`show tables\`会呈现出该数据库中的表，没有的话可以新建表(删表\`drop table 表名\`)：\r
\r
\`\`\`mysql\r
	create table '表名'(\r
		id int(11) not null auto_increment,\r
		workername varchar(20) not null,\r
		sex enum(F,M,S),\r
		employeddates date,\r
		department varchar(30),\r
		primary key(id)\r
	)\r
\`\`\`\r
\r
建完表后就可以执行增删查改等各种操作了：\r
\r
\`\`\`mysql\r
//增，即插入数据\r
insert into 表名 (key1,key2,...keyn) values (val1,val2,...valn);\r
如：insert into Class values(1,'John',23),(2,'Hoh',22);\r
\r
//删\r
delete from 表名 where 表达式\r
如： delete from Class where id=1;\r
\r
//查(*代表所有)\r
select * from 表名\r
\r
//改\r
update 表名 set 字段=新值,... where 条件\r
如：update Class set name='Mary' where id=1;\r
\r
//更改表名\r
rename table 旧表名 to 新表名\r
\r
//增加字段\r
alter table 表名 add 字段 类型 其他;\r
如：alter table Class add test int(4) not null;\r
\r
//更新字段内容\r
update 表名 set 字段名=新内容\r
如：update a set content=concat(' ',content);\r
\`\`\`\r
`;export{n as default};
