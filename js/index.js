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
				var box_list='<div class="box-list"><div class="list-img"><img src="img/'+info.img+'" alt=""></div><div class="list-text"><div class="text-title">'+info.title+'</div><div class="text-desc">'+info.desc+'</div></div></div>';
				$('.main-box').last().find('.boxboder').append(box_list);
			}
		}
	}
});
$(function(){
	// 左侧列表切换
	var index_list=0;
	var index_tag=0;
	var id=0;
	$('.leftside ul').on('click','li',function(){
		$(this).addClass('left-active').siblings().removeClass('left-active');
		index_list=$(this).index();
		index_tag=0;//切换后为第一页
		id=index_list.toString()+index_tag.toString();
		$('.main-tag').eq(index_list+1).css('display','').siblings('.main-tag').css('display','none');
		$('.main-tag').eq($(this).index()+1).find('.tag-list').first().addClass('tag-active').siblings().removeClass('tag-active');
		// box切换
		$('.main-box[data-id='+id+']').css('display','').siblings('.main-box').css('display','none');
	});

	// 顶部标签切换
	$('.main-tag ul').on('click','li',function(){
		$(this).addClass('tag-active').siblings().removeClass('tag-active');
		index_tag=$(this).index();
		id=index_list.toString()+index_tag.toString();
		// box切换
		$('.main-box[data-id='+id+']').css('display','').siblings('.main-box').css('display','none');
	});

	// 赋值点击链接
	$('.box-list').on('click',function(){
		id=index_list.toString()+index_tag.toString();
		// console.log(index_list,index_tag,id,$(this).index());
		var src=link.list[index_list].tag[index_tag].tag_box[$(this).index()].url
		window.open(src);
		// $(this).attr('href',src);
		// $(location).prop({'href':src},{'target':'_blank'});
		// $(location).attr({'href':src},{'target':'_blank'});
	});
});