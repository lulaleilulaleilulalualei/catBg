import Vue from 'vue'
import md5 from 'js-md5';
import config from '@/config'
// import store from '../../vuex/store'

const api = {
	isEmptyObject: function(obj) {//判定是否为空对象
        for(let key in obj ) {
            return false
        }
        return true
	},
	toFilterObj: function(obj) { //过滤对象
		let keyArr = Object.keys(obj)
		for(var i=0; i<keyArr.length; i++) {
			let a = keyArr[i]
			if(obj[a] === null) {
				delete obj[a]
			}
		}
		return obj
	},
	objKeySort: function (param) {
		var obj = this.toFilterObj(param)
		var newkey = Object.keys(obj).sort();
		var newObj = {}, str = ''
		for (var i = 0; i < newkey.length; i++) {
			newObj[newkey[i]] = obj[newkey[i]];
			str+=`${newkey[i]}=${obj[newkey[i]]}&`
		}
		str = str + 'utravel&2019'
		return md5(str)
	},
    trim: function (strs) { 
        if(Object.prototype.toString.call(strs) === "[object String]") {
 			return strs.replace(/(^\s*)|(\s*$)/g, '');
 		}
	},
    timeFormat: function() {
    	let nowTime = new Date(),
    		nowHours = nowTime.getHours() + 1,
    		nowMinutes = nowTime.getMinutes(),
    		nowSeconds = nowTime.getSeconds()

    	if(nowHours < 10) nowHours = '0' + nowHours
    	if(nowMinutes < 10) nowMinutes = '0' + nowMinutes
    	if(nowSeconds < 10) nowSeconds = '0' + nowSeconds

    	return `${nowHours}:${nowMinutes}:${nowSeconds}`
    },
    textFilter:function(txt){
        if(txt) {
            return txt.replace(/\n/g,'<br/>')
        }else {
            return ''
        }
    },
    randomNum:function(min, max) {
    	return Math.floor(Math.random()*(max-min)+min)
    },
    countDown: function(callback) {
    	var downObj = {
    		maxTime : 60,
    		countTxt: '',
    		status: false,
    		timer: '',
    		downTime: function() {
    			var $this = this
    			if(this.maxTime > 1) {
    				this.maxTime--
    				this.countTxt = this.maxTime + '秒后获取'
    				this.status = true
    				typeof callback == 'function' && callback($this.countTxt, $this.status)
    				this.timer = setTimeout(function(){
    					$this.downTime()
    				}, 1000)
    			}else {
    				this.status = false
    				this.timer = setTimeout(function() {
    					typeof callback == 'function' && callback('获取验证码', $this.status)
    				}, 1000)
    			}
    		}
    	}
    	downObj.downTime()
    },
    hasClass: function(ele, cName) {
        return !!ele.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
    },
    addClass: function(ele, cName) {
        if( !this.hasClass( ele,cName ) ){
            ele.className += " " + cName
        }
    },
    removeClass: function(ele, cName) {
        if( this.hasClass( ele,cName ) ){
            ele.className = ele.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " )
        }
    },
    strToArr(str) {
		if(str) {
			return str.split(',')
		}
    },
    compareDistance(index, sportArr) {
        if(index < sportArr.length -1) {
            let startPos = new AMap.LngLat(sportArr[index].longitude, sportArr[index].latitude)
            var myDistance = startPos.distance([sportArr[index+1].longitude,sportArr[index+1].latitude]);//这里测量距离
            return (myDistance/1000).toFixed(2) + 'km'
        }
	},
	inputTest(val, type) {
		var telReg = /^\s*1[3456789]\d{9}$/,
		  codeReg = /^\d{4}$/,
		  cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		  mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
		  
		  if(type == 'tel') {
			  if(telReg.test(val)) {
				  return true
			  }else {
				// Message.warning({
				// 	message: '请输入正确的手机号码',
				// 	center: true
				// })
				return false
			  }
		  }else if(type == 'card') {
			  if(cardReg.test(val)) {
				  return true
			  }else {
				// Message.warning({
				// 	message: '请输入正确的身份证号码',
				// 	center: true
				// })
				return false
			  }
		  }else if(type == 'mail') {
			  if(mailReg.test(val)) {
				  return true
			  }else {
				// Message.warning({
				// 	message: '请输入正确的邮箱',
				// 	center: true
				// })
				  return false
			  }
		  }else if(type == 'code') {
			  if(codeReg.test(val)) {
				  return true
			  }else {
				// Message.warning({
				// 	message: '请输入正确位数的验证码',
				// 	center: true
				// })
				return false
			  }
		  }
	},
	getCookie: function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
		    var c = ca[i];
		    while (c.charAt(0) == ' ') c = c.substring(1);
		    if (c.indexOf(name) != -1){
		      return c.substring(name.length, c.length);
		    }
		}
		return "";
	}
}

export default api;