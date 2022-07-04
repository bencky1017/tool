// link.list.length
// link.list[0].name
// link.list[0].tag.length
// link.list[0].tag[0].tag_name
// link.list[0].tag[0].tag_box.length
// link.list[0].tag[0].tag_box[0].title	url,img,desc

$(function(){
	// 初始化表格
	var num_list=link.list.length;
	for (var i = 0; i < num_list; i++) {
		// 左侧列表
		if (i==0) {
			let left_list='<li class="left-list left-active">'+link.list[i].name+'</li>';
			$('.leftside ul').append(left_list);
		}else{
			let left_list='<li class="left-list">'+link.list[i].name+'</li>';
			$('.leftside ul').append(left_list);
		}

		// 顶部标签
		if (i==0){
			let main_tag='<div class="main-tag" data-desc=""><ul></ul></div>';
			$('.main-tag').eq(i).after(main_tag);
		}else {
			let main_tag='<div class="main-tag" data-desc="" style="display: none;"><ul></ul></div>';
			$('.main-tag').eq(i).after(main_tag);
		}
	}

	// 标签添加
	for (var i = 0; i < num_list; i++) {
		var num_tag=link.list[i].tag.length;/*标签个数*/
		for (var j = 0; j < num_tag; j++) {
			if (j==0) {
				let tag_list='<li class="tag-list tag-active">'+link.list[i].tag[j].tag_name+'</li>';
				$('.main-tag').eq(i+1).find('ul').append(tag_list);
				$('.main-tag').eq(i+1).attr('data-desc',link.list[i].name);
			}else{
				let tag_list='<li class="tag-list">'+link.list[i].tag[j].tag_name+'</li>';
				$('.main-tag').eq(i+1).find('ul').append(tag_list);
				$('.main-tag').eq(i+1).attr('data-desc',link.list[i].name);
			}
		}
	}

	// 盒子添加
	for (var i = 0; i < num_list; i++) {
		var num_tag=link.list[i].tag.length;
		for (var j = 0; j < num_tag; j++) {
			if (i==0&&j==0) {
				var main_box='<div class="main-box" data-id="'+i+j+'" data-desc="'+link.list[i].tag[j].tag_name+'"><div class="boxboder"></div></div>';
			}else{
				var main_box='<div class="main-box" data-id="'+i+j+'" data-desc="'+link.list[i].tag[j].tag_name+'" style="display: none;"><div class="boxboder"></div></div>';
			}
			$('.mainpart').append(main_box);

			// 添加内容
			var num_box=link.list[i].tag[j].tag_box.length;
			for (var k = 0; k < num_box; k++) {
				var info=link.list[i].tag[j].tag_box[k];
				if (info.power==0) {
					var box_list='<div class="box-list" data-boxid="'+info.id+'"><div class="list-img"><img src="img/'+info.img+'" alt=""></div><div class="list-text"><div class="text-title">'+info.title+'</div><div class="text-desc">'+info.desc+'</div></div></div>';
					$('.main-box').last().find('.boxboder').append(box_list);
				}
			}
		}
	}
});

// 开发查询序列
var index_list=0,index_tag=0,id='00',index_box='00';
var log={list:index_list,tag:index_tag,id:'00',box:index_box};

$(function(){
	// 左侧列表切换
	$('.leftside ul').on('click','li',function(){
		$(this).addClass('left-active').siblings().removeClass('left-active');
		index_list=$(this).index();
		index_tag=0;//切换后为第一页
		id=index_list.toString()+index_tag.toString();
		$('.main-tag').eq(index_list+1).css('display','').siblings('.main-tag').css('display','none');
		$('.main-tag').eq($(this).index()+1).find('.tag-list').first().addClass('tag-active').siblings().removeClass('tag-active');
		// box切换
		$('.main-box[data-id='+id+']').css('display','').siblings('.main-box').css('display','none');
		log.list=index_list;log.tag=index_tag;log.id=id;
		console.clear();
		console.log(log);
	});

	// 顶部标签切换
	$('.main-tag ul').on('click','li',function(){
		$(this).addClass('tag-active').siblings().removeClass('tag-active');
		index_tag=$(this).index();
		id=index_list.toString()+index_tag.toString();
		// box切换
		$('.main-box[data-id='+id+']').css('display','').siblings('.main-box').css('display','none');
		log.list=index_list;log.tag=index_tag;log.id=id;
		console.clear();
		console.log(log);
	});

	// 赋值点击链接
	var id_mainbox='';
	var id_boxlist='';
	var src='';
	var title='';
	$('.box-list').off('click').on('click',function(){
		// id=index_list.toString()+index_tag.toString();
		// console.log(index_list,index_tag,id,$(this).index());
		id_mainbox=$(this).parents('.main-box').data('id').toString();
		id_boxlist=$(this).data('boxid').toString();
		src=link.list[id_mainbox[0]].tag[id_mainbox[1]].tag_box[parseInt(id_boxlist)].url;
		// console.log(src);
		window.open(src);//打开链接
		// $(this).attr('href',src);
		// $(location).prop({'href':src},{'target':'_blank'});
		// $(location).attr({'href':src},{'target':'_blank'});	
	});
});

$(function(){
	// 控制操作
	// 取消右击菜单mouseenter
	$('.box-list').off('contextmenu').on('contextmenu',function(event){
		event.preventDefault();//取消默认程序
		index_box=$(this).data('boxid').toString();
		log.box=index_box;
		let list=link.list[log.id[0]].tag[log.id[1]].tag_index;
		let box=link.list[log.id[0]].tag[log.id[1]].tag_box[parseInt(index_box)].id;
		console.clear();
		console.log(log);
	});

	// JTippyJS提示信息
	$('.box-list').on('contextmenu',function(){
		var tag_box_id=parseInt($(this).data('boxid').toString());
		var list_mark=link.list[log.list].tag[log.tag].tag_box[tag_box_id].mark;
		var len_mark=list_mark.length;
		var temp_list='';
		if (len_mark!=0) {
			for (var i = 0; i < len_mark; i++) {
				// 修改了a标签的CSS效果 .jt-title a
				temp_list+='<a href="'+list_mark[i]+'">'+list_mark[i]+'</a>';
			}
			$('.jtippy').remove();
			$(this).jTippy({
				title: temp_list,        //内容 date-title=显示内容
				trigger: 'click',               //触发 date-trigger=click,focus,hover,hoverfocus
				position: 'right',                    //定位 data-position=auto,bottom,top,left,right
				class: '',                           //类名 
				theme: 'lt-gray',                      //主题 data-theme=black,white,lt-gray,green,red,blue
				size: 'tiny',                       //大小 data-size=large,medium,small,tiny
				backdrop: false,                     //背景 data-backdrop=black,white,blurred,false
				singleton: true,                     //仅显示一个提示条
				close_on_outside_click: true,        //点击外部可关闭
			});
		}
		
	});

	// 取消高级模式登录框
	$('.btn-cancel').on('click',function(event){
		event.stopPropagation();/*阻止冒泡事件*/
		$('.mask').css('display','none');
	});

});
$(function(){
	// 高级模式
	var jsonData={'key':'','value':'','power':0,'last_power':0};
	window.localStorage.setItem('bk_tool_devmode',JSON.stringify(jsonData));


	// 登录权限
	$('.header-login').on('click',function(){
		$('.mask').css('display','');
		$('.mask-login').css('display','');
		$('.mask-input').val('').focus();
		$('.mask-tip').html('').css('color','#f00');
	});

	// 高级模式确认
	$('.mask-login .btn-sure').on('click',function(){
		var bk_tool_devmode=window.localStorage.getItem('bk_tool_devmode');
		console.log(bk_tool_devmode);

		if (bk_tool_devmode!=null&bk_tool_devmode!=undefined) {
			var last_power=JSON.parse(bk_tool_devmode).power;
			jsonData.last_power=last_power;
			window.localStorage.setItem('bk_tool_devmode',JSON.stringify(jsonData));
		}

		// let login_prompt=prompt("请输入密钥序列：",123);
		let login_prompt=$('.mask-input').val();
		let get_key=login_prompt==''|login_prompt==null?0:mdbk(login_prompt);

		var isexist=0;//密钥存在判断
		for (var i = 0; i < link.keylist.length; i++) {
			for (var key in link.keylist[i]){
				if (get_key == key) {
					isexist=1;//密钥存在列表中
					// alert("【"+link.keylist[i][key]+":"+link.keylist[i].power+"】"+"身份确认，进入高级模式！\n【刷新页面后重置身份！】");
					$('.mask-login,.mask').css('display','none');
					new NoticeJs({
						title: 'Success',                 //标题：可为null
						text: '【'+link.keylist[i][key]+':'+link.keylist[i].power+'】'+'<br>身份确认，进入高级模式！<br>【刷新页面后重置身份！】',     //提示内容：不建议为空
						type: 'success',                    //类型：四种类型
						position: 'topCenter',            //定位：九种定位
						timeout: 30,                      //消失时间：30表示3秒
						progressBar: true,                //进度条：布尔值
						closeWith: ['button','click'],    //关闭方式：按钮、点击
						animation: {                      //引用外部特效
						    open: 'animated bounceIn',    //必须加animated
						    close: 'animated bounceOut'   //后面跟特效名
						},
						modal: false,                     //模态框：背景不可点击
						scroll: null                      //
					}).show();

					//添加localStorage存储
					jsonData.key=get_key;
					jsonData.value=link.keylist[i][key];
					jsonData.power=link.keylist[i].power;

					window.localStorage.setItem('bk_tool_devmode',JSON.stringify(jsonData));//json转换为string
					$('.header-login').text(jsonData.value+':'+jsonData.power);
					break;
				}else if (isexist == 0 & i == link.keylist.length-1) {
					// $('.mask-tip').html("密钥错误！联系管理员确认密钥。");
					new NoticeJs({
						title: 'Error',                        //标题：可为null
					    text: '密钥错误！联系管理员确认密钥。',     //提示内容：不建议为空
						type: 'error',                    //类型：四种类型
						position: 'topCenter',            //定位：九种定位
						timeout: 15,                      //消失时间：30表示3秒
						progressBar: true,                //进度条：布尔值
						closeWith: ['button'],    //关闭方式：按钮、点击
						animation: {                      //引用外部特效
						    open: 'animated bounceIn',    //必须加animated
						    close: 'animated bounceOut'   //后面跟特效名
						},
						modal: true,                     //模态框：背景不可点击
						scroll: null                      //
					}).show();
					break;
				}
			}
		}
		
		// localStorage参数处理
		bk_tool_devmode=window.localStorage.getItem('bk_tool_devmode');
		var getpw=bk_tool_devmode!=null&bk_tool_devmode!=undefined?JSON.parse(bk_tool_devmode).power:0;
		var power=JSON.parse(bk_tool_devmode).power;
		var last_power=JSON.parse(bk_tool_devmode).last_power;
		var boxcount=0;
		var powercount=0;

		var num_list=link.list.length;//左侧列表数
		for (var i = 0; i < num_list; i++) {
			var num_tag=link.list[i].tag.length;//对应列表标签数
			boxcount+=num_tag;//计算盒子数量
			for (var j = 0; j < num_tag; j++) {
				var id=i.toString()+j.toString();//data-id
				var num_box=link.list[i].tag[j].tag_box.length;//对应标签盒子数
				powercount=0;
				// 计算权限盒子数
				for (var m = 0; m < num_box; m++) {
					if (link.list[i].tag[j].tag_box[m].power!=0) {
						powercount+=1;
					}
				}
				// console.log(num_box,num_box-powercount);
				for (var k = 0; k < num_box; k++) {
					var info=link.list[i].tag[j].tag_box[k];//盒子信息
					if(info.power>0&info.power<=getpw&(power<last_power?power:last_power)<info.power){
						var box_list='<div class="box-list" data-boxid="'+info.id+'" data-power="pw-'+info.power+'"><div class="list-img"><img src="img/'+info.img+'" alt=""></div><div class="list-text"><div class="text-title">'+info.title+'</div><div class="text-desc">'+info.desc+'</div></div></div>';
						var temp_boxid=parseInt(info.id)-1;
						var len_power=$('.main-box[data-id='+id+']').find('.box-list[data-boxid="'+temp_boxid+'"]').length;
						while(len_power){
							temp_boxid-=1;
							len_power=$('.main-box[data-id='+id+']').find('.box-list[data-boxid="'+temp_boxid+'"]').length;
							console.log(id+'\t'+temp_boxid+'\t'+len_power);
						}
						// console.log('后：'+temp_boxid);
						$('.main-box[data-id='+id+']').find('.box-list[data-boxid="'+(parseInt(info.id)-1)+'"]').after(box_list);

					}else if (info.power>getpw){
						//去除权限不够的盒子
						$('.box-list[data-power^="pw-'+info.power+'"]').remove();
					}
				}
			}
		}
		// 高级权限下的样式
		$('.box-list[data-power^="pw-"]').addClass('advance');
		$('.box-list').off('click').on('click',function(){
			var id_mainbox=$(this).parents('.main-box').data('id').toString();
			var id_boxlist=$(this).data('boxid').toString();
			var src=link.list[id_mainbox[0]].tag[id_mainbox[1]].tag_box[parseInt(id_boxlist)].url
			window.open(src);
		});

		// 取消右击菜单mouseenter
		$('.box-list').off('contextmenu').on('contextmenu',function(event){
			event.preventDefault();//取消默认程序
			index_box=$(this).data('boxid').toString();
			log.box=index_box;
			console.clear();
			console.log(log);
		});
	});
	
	// 右击菜单
	$('.header-login').on('contextmenu',function(event){
		event.preventDefault();//取消默认程序
		var pos_X=event.pageX+5;//文档左边距离
		var pos_Y=event.pageY+5;//文档顶部距离
		var doc_X=$(window).scrollLeft();//网页左边距离
		var doc_Y=$(window).scrollTop();//网页顶部距离
		var menu_logout='<div class="header-login-menu" style="display:none;"><ul><li class="menu_help">帮助</li><li class="menu_quit">退出</li></ul></div>';
		var menu_login='<div class="header-login-menu" style="display:none;"><ul><li class="menu_help">帮助</li></ul></div>';
		$('.header-login-menu').remove();
		$('.header-login').text()=='高级模式'?$('.header-login').after(menu_login):$('.header-login').after(menu_logout);
		console.log(pos_X,pos_Y,doc_X,doc_Y);
		$('.header-login-menu').css({left:pos_X-doc_X,top:pos_Y-doc_Y}).show();

		// 帮助按钮
		$('.menu_help').off().on('click',function(){
			// alert('【管理员】权限值:100\n【普通用户】权限值:10\n【测试用户】权限值:0');
			new NoticeJs({
				title: 'Infomation',                 //标题：可为null
			    text: '【管理员】权限值:100<br>【普通用户】权限值:10<br>【测试用户】权限值:0',     //提示内容：不建议为空
				type: 'info',                    //类型：四种类型
				position: 'middleCenter',            //定位：九种定位
				timeout: 40,                      //消失时间：30表示3秒
				progressBar: false,                //进度条：布尔值
				closeWith: ['click','button'],    //关闭方式：按钮、点击
				animation: {                      //引用外部特效
				    open: 'animated bounceIn',    //必须加animated
				    close: 'animated bounceOut'   //后面跟特效名
				},
				modal: true,                     //模态框：背景不可点击
				scroll: null                      //
			}).show();
		});

		// 退出按钮
		$('.menu_quit').off().on('click',function(){
			$('.header-login').text('高级模式');
			jsonData.key='';
			jsonData.value='';
			jsonData.power=0;
			jsonData.last_power=0;
			window.localStorage.setItem('bk_tool_devmode',JSON.stringify(jsonData));

			//去除权限不够的盒子
			$('.box-list[data-power^="pw-"]').remove();

			new NoticeJs({
				title: '',                 //标题：可为null
			    text: '退出成功',     //提示内容：不建议为空
				type: 'success',                    //类型：四种类型
				position: 'topCenter',            //定位：九种定位
				timeout: 10,                      //消失时间：30表示3秒
				progressBar: true,                //进度条：布尔值
				closeWith: [],    //关闭方式：按钮、点击
				animation: {                      //引用外部特效
				    open: 'animated bounceIn',    //必须加animated
				    close: 'animated bounceOutUp'   //后面跟特效名
				},
				modal: false,                     //模态框：背景不可点击
				scroll: null                      //
			}).show();
		});
	});

	// 公告按钮
	$('.web_notice_btn').on('click',function(){
		$('.web_notice').show();
	})
});
$(function(){
	// 全局快捷键
	$(document).on('click',function(){
		$('.header-login-menu').remove();
	});

	$(document).on('keydown',function(event){
		if (event.keyCode == 27){//按下Esc
			$('.mask-login .btn-cancel').click();
			$('.header-login-menu').remove();
			$('.web_notice').css({'display':'none'});
		}
	});

	// 按键绑定
	$('.mask-input').on('focus keydown',function(event){
		// 你按了键盘enter
		if (event.keyCode == 13){
			$('.mask-login .btn-sure').click();
		}
	});

});
$(function(){
	var str={"id":"aaa","power":0,"img":"default.png","url":"xxxxxxxxxxxxx","title":"xxxxxx","desc":"xxxxxx"};
});