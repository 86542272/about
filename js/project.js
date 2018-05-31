var h = window.innerHeight;
var w = window.innerWidth;
var debug = false; //调试模式
var openTime = 0;
var badcont = 0;

function bad() {
	byid("head").src = "BadAppleImg/" + "BadApple_" + pad(badcont, 4) + ".svg";
	badcont++;
}
//var bader = setInterval(bad,33);
function pad(num, n) {
	var len = num.toString().length;
	for(; len < n; len++) {
		num = "0" + num;
	}
	return num;
}

//运行速度测试fun函数，cont次数（默认500次）
function funTest(fun,cont,data,data2){
	if(cont==undefined) cont=500;
	console.log("开始测试  "+console.dir(fun)+" 次数 "+cont)
	timer.start();
	for(var i=0;i<cont;i++){fun(data,data2)}
	console.log("耗时"+timer.stop()+"毫秒 运行次数:"+cont);
}

//加载完成后运行
function loaddone() {
	cycle(-360);
	//加载时间计时结束
	var t = new Date();
	console.log("网页加载耗时" + timer.stop()/1000 + "秒");
	lastInfo();
	if(w < 750) {
		cycle_b(false);
	}

}
//然并卵的入口
function about_main() {
	//加载时间计时开始
	timer.start();
	//然并卵的检测分辨率
	if(w < 500) {
		alert('当前屏幕分辨率过低，可能无法显示全部内容');
	}
	//测试用用
	if(debug) logout('测试');

	//点击播放音乐 未完成
	var playes = document.getElementsByName('play_music');
	for(i in playes) {
		playes[i].onclick = function() {
			player.play();
			player.dom.container.toggleClass('mp-show');
		};
	};

	//阻止手势
	/*document.querySelector('body').addEventListener('touchstart', function (ev) {
	    event.preventDefault();
	});*/
	cycle(0, 0);
}
var timer = {
	time: undefined,
	start: function() {
		var t = new Date();
		time = t.getTime();
	},
	stop: function() {
		var t = new Date();
		return t - time;
	}
}
//统计访问时间
function lastInfo() {
	var tdate = new Date();
	var last = cokie.get("runInfo");
	if(last == null) {
		last = {
			"day": tdate.toLocaleString(),
			"time": tdate.getTime(),
			"cont": 1
		}
		cokie.set("runInfo", JSON.stringify(last));
		console.log("初次见面，还请多多指教");
	} else {
		last = JSON.parse(cokie.get("runInfo"));
		console.log("上次访问时间" + last.day);
		console.log("统计访问次数" + last.cont);
		last.day = tdate.toLocaleString();
		last.time = tdate.getTime();
		if(tdate.getTime() - last.day < 60000) last.cont++; //1分钟之内只统计一次访问次数
		cokie.set("runInfo", JSON.stringify(last));
	}

}
//Cookie
var cokie = {
	//写cookies
	set: function(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},

	//读取cookies

	get: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg)) return unescape(arr[2]);
		else return null;
	},

	//删除cookies

	del: function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.del(name);
		if(cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}
//图片预加载
function preLoadImg() {
	var img = new Image();
	img.src = "url"
}

//随机数
function RandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	var num = Min + Math.round(Rand * Range);
	return num;
}
//气泡旋转 a为角度b为轴距
function cycle(a, b) {
	var cycarr = document.getElementsByClassName("cycle_a");
	var aa = a;
	if(b == undefined) b = 200;
	for(var i = 0; i < cycarr.length; i++) {
		aa += 120;
		cycarr[i].style.animation = "none"
		cycarr[i].style.transform = "rotate(" + (aa - (aa * 2)) + "deg) translateX(+" + b + "px) rotate(" + aa + "deg)";
	}
}
//气泡变形
var cycle_b_flag = false;

function cycle_b(b) {
	var cycarr = document.getElementsByClassName("cycle_item");
	if(b != undefined) cycle_b_flag = b;
	if(cycle_b_flag = !cycle_b_flag) {

		cycarr[0].classList.add("cycle_item_b")

	} else {
		cycarr[0].classList.remove("cycle_item_b")
	}
}

function byid(s) {
	return document.getElementById(s);
}

//动态执行 调试用
function ev(msg) {
	try {
		eval(a);
	} catch(err) {
		alert(err.message);
	}
}

//主动调试输出 如果k为true 那么覆盖输出否则累计
var logflg = {
	s: "",
	i: 2
};

function logout(m, k) {
	var e = byid('mydebug');
	if(k) {
		e.innerText = m;
	} else if(m == logflg.s) {
		var m = e.innerText.split("\n");
		var en = logflg.s + " " + logflg.i;
		m[m.length - 2] = en;
		m = m.join("\n");
		e.innerText = m;
		logflg.i ++;
	} else {
		e.innerText = e.innerText + m + "\n";
		logflg.s = m;
		logflg.i = 2;
	}
}

//计算间隔天数
function getDateDiff(st, en) {
	var BirthDay = new Date(st);
	var today;
	if(en != undefined) {
		today = new Date(en)
	} else {
		today = new Date()
	};
	var timeold = (today.getTime() - BirthDay.getTime());
	var sectimeold = timeold / 1000;
	var secondsold = Math.floor(sectimeold);
	var msPerDay = 24 * 60 * 60 * 1000;
	var e_daysold = timeold / msPerDay;
	var daysold = Math.floor(e_daysold);
	var e_hrsold = (e_daysold - daysold) * 24;
	var hrsold = Math.floor(e_hrsold);
	var e_minsold = (e_hrsold - hrsold) * 60;
	var minsold = Math.floor((e_hrsold - hrsold) * 60);
	var seconds = Math.floor((e_minsold - minsold) * 60);
	return checkTime(daysold) + "天" + checkTime(hrsold) + "小时" + checkTime(minsold) + "分" + checkTime(seconds) + "秒";
}

//更新存活时间
function show_date_time() {
	var tm = document.getElementsByName('show_time');
	for(var i = 0; i < tm.length; i++) {
		tm[i].innerText = "Sakura & Erii の主页已存活" + getDateDiff(tm[i].title);
	}
	window.setTimeout("show_date_time()", 1000);
}
var show_date_timer=setInterval(show_date_time,1000);

function checkTime(i) {
	if(i < 10) {
		i = "0" + i;
	}
	return i;
}

//获取URL数据
function urlData(n) {
	var sc = window.location.search;
	var vr = window.location.search.split('&');
	var v = {};
	if(vr.length > 0) {
		for(i in vr) {
			var str = vr[i].split('=');
			if(str[0] = n) {
				return str[1];
			}
		}
	}
	return null;
}
//加载js
function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(typeof(callback) != "undefined") {
		if(script.readyState) {
			script.onreadystatechange = function() {
				if(script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function() {
				callback();
			};
		}
	}
	script.src = url;
	document.body.appendChild(script);
}
/*获取URL数据
 * url:地址
 * fum:加载完成后运行
 * bool:为true时同步执行 反之异步
 */
function getURL(url, fun, bool) {
	var xmlhttp;
	if(bool == undefined) bool = true;
	if(window.XMLHttpRequest) {
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//logout(xmlhttp.responseText);
			fun(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
about_main();