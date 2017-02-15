
import { CMD_DEFINE,CMD_DEFINE_OR, MSG_RECEIPT_CODE_OR} from './protoDefine'
import * as types from '../store/mutation-types'


var moment = require('moment');

function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

var mywebsocket	= window.WebSocket || window.MozWebSocket;
var funclsit    = {}

var HTCHAT  =  	{
    MYINFO    :{},
		id_seq 		:	0,
    connected_before : false,
    _ts_diff  : 0,
    logout    : false, //判断是否登出 决定 发消息是否重连
		initMyInfo:function( ){

			this.initChat()
		},
    reConnect : function(){

    },
    getNowTS:function( tf ){

			var timestamp =(new Date()).valueOf();
      if(tf){
        var oo = new Date()
        var day = moment.unix((timestamp - this._ts_diff)/1000)
        return day.format('YYYY-MM hh:mm:ss');
      }else{
			     return timestamp - this._ts_diff
      }
		},
		initChat: function(url,userid,cbok,cbfail){
			// 创建一个Socket实例
		  if(url){
        this._ws_url  = url
      }
      this.MYINFO.userid  = userid
      if(!this._ws_url){
        if(cbfail){
          cbfail()
        }
        return
      }
			this.socket = new mywebsocket(this._ws_url);

			var $this 	=	this
			this.socket.onclose = function(event) {
				console.error('Client notified socket has closed',event);
				$this.add_tips('socket.close:'  )
			};

      this.socket.onConnect   = function(evt){
        if(cbok){
          cbok(evt && evt.data)
        }
        $this.connected_before = true
      }

			 this.socket.onmessage = function(evt){
				if(evt && evt.data){
					$this.add_tips(' [Recv]:'+ evt.data)
          var data = null
					try{
						data = (JSON.parse(evt.data))
					}
					catch(e){
						console.log(e)
					}
          if(data){
            $this.recvHandler(data)
          }
				}
			 }

			this.socket.onerror = function(evt){
				console.error('WebSocketError!');
        if($this.connected_before==false && cbfail){
          cbfail(evt.data)
        }
				$this.add_tips('socket.error:'+ evt.data)
			};

		},
		genMsgID : function (){
			return randomString(32)
		},

		sendJsonMsg :function (msgCdi,touserid,cbAfterSend){

			var msg 	=	  {
					"msg_id"	: this.genMsgID(),
					"server_ts": this.getNowTS( ),
					"send_time": this.getNowTS(1),
					"msg_type": msgCdi.msg_type, // "text","translate","voice","image","introduction","location","voice_text"
					"msg_model":"normal", //  模式包括 "normal","language_exchange"
					"from_profile_ts":this.MYINFO.profile_ts,
					"from_nickname": this.MYINFO.my_info.NK,
			}

      // 不同消息的消息内容结构
      msg[msgCdi.msg_type] = msgCdi.content

			var pack 	=	{
				id		:	this.id_seq,
				typ		:	"msg",
				cmd		:	CMD_DEFINE.CMD_P2P_MESSAGE,
				from	:	this.MYINFO.userid,
				to		:	touserid,
				status	:	0,
				data 	:	msg || {}
			}
			this.sendJson(pack,'msg')
		},
		sendJson:function(pack,busi){
			var $this 			=	this
			var sdy 		   =	this.socket.readyState
			if(sdy== 1 ){
				this.id_seq++
				var jsonStr 	=	JSON.stringify(pack)
				$this.add_tips('[Send '+(busi || '' )+']:'+ jsonStr)
				$this.socket.send(jsonStr)
				$this.trigger(types.SEND_PACK ,{pack:pack,busi:busi} )
			}else{
        $this.trigger(types.SEND_PACK_FAIL ,{pack:pack,busi:busi} )
				if (sdy==3) {
					//setTimeout(this.initChat.bind($this),800)
				}
				console.error('socket.readyState:'+sdy)
			}
		},
    on  : function(evt,func){
      if( typeof funclsit[evt] === "undefined"  ){
           funclsit[evt] = []
      }
      funclsit[evt].push(func)

      return this
    },
    trigger : function(evt,data){
        if(evt && funclsit[evt]){
          var events = {
              type: evt,
              target: this,
              data:data
          };
          for (var length = funclsit[evt].length, start=0; start<length; start+=1) {
              funclsit[evt][start].call(this, events);
          }
        }
    },
		sendRecipt:function(recvPack,data){

			var pack 	=	{
				id		:	recvPack.id,
				cmd		:	recvPack.cmd+1,
				typ 	:	"ack",
				from	:	recvPack.from,
				to		:	recvPack.to,
				status	:	0,
				data 	:	data || {}
			}
			this.sendJson(pack,'ack')
		},
		sendMsgSeen:function(recvPack){

			var pack 	=	{
				id		:	recvPack.id+1,
				cmd		:	CMD_DEFINE.CMD_P2P_MESSAGESEEN_NOTIFY,
				typ 	:	"seen",
				from	:	recvPack.to,
				to		:	recvPack.from,
				status	:	0,
				data 	:  {msg_id:recvPack.data.msg_id}
			}
			this.sendJson(pack,'seen')
		},
		add_tips:function(text){
			console.log ( text )
		},

		login_handler: function(recvPack){
				var $this	=	this
				var add 	=	recvPack.data.info
				this.add_tips('login:'+add)

        if( recvPack.cmd == CMD_DEFINE.CMD_FORCE_USER_OUT
            || recvPack.cmd == CMD_DEFINE.CMD_USER_RELOGIN
            || recvPack.cmd == CMD_DEFINE.CMD_INVALID_SESSION
        ){
          if(recvPack.status!=0){
  					this.socket.close()
            console.error('logined in else where ')
  				}
          $this.trigger('logout')
        }

        if(CMD_DEFINE.CMD_LOGIN_AUTH_ACK == recvPack.cmd){
          if(recvPack.status==0){
              $this.MYINFO  = Object.assign($this.MYINFO,recvPack.data.Config)
              $this._ts_diff  =(new Date()).valueOf()-  $this.MYINFO.server_ts
              console.log('$this._ts_diff',$this._ts_diff)
              $this.trigger(types.LOG_SUCESS,recvPack.data.Config)
              return
          }
        }
        $this.trigger(types.LOG_FAIL)

				if(recvPack.status!=0){
					this.socket.close()
				}

		}
		,recvHandler: function(recvPack){
			if (recvPack && recvPack.cmd){
				var func 	=	recvPack.typ+'_handler'
				if( HTCHAT[func]){
					HTCHAT[func].call(HTCHAT,recvPack)
				}

				if(recvPack.id ){
					this.id_seq	=	recvPack.id
				}

				var cmdName 	=	 CMD_DEFINE_OR[recvPack.cmd]
				if ( cmdName && this.cmd_define[cmdName]){
					this.cmd_define[cmdName](this,recvPack)
				}
			}
		},
		recvOffline		:function(last_offline){
				if (!last_offline){
					return;
				}
					var pack 	=	{
						id		:	HTCHAT.id_seq,
						cmd		:	CMD_DEFINE.CMD_NEW_GET_OFFLINEMESSAGE,
						typ 	:	"offline",
						from	:	HTCHAT.MYINFO.userid,
						to		:	0,
						status	:	0,
						data 	:	last_offline ? { last_offline:last_offline } : {}
					}
					HTCHAT.sendJson(pack,'offline')

		},
    loadUserinfo : function(userid){
      if(typeof(userid)=='number' || typeof(userid)=='string'){

        userid  = [parseInt(userid)]
      }
      var pack 	=	{
        id		:	HTCHAT.id_seq,
        cmd		:	CMD_DEFINE.CMD_SHOW_USER_BASE_INFO,
        typ 	:	"getinfo",
        from	:	HTCHAT.MYINFO.userid,
        to		:	0,
        data 	:	userid
      }
      HTCHAT.sendJson(pack,'getinfo')
    },
		getRecentChatList		:function( ){
					var pack 	=	{
						id		:	HTCHAT.id_seq,
						cmd		:	CMD_DEFINE.CMD_GET_RECENT_CHAT_LIST,
						typ 	:	"getinfo",
						from	:	HTCHAT.MYINFO.userid,
						to		:	0,
						status	:	0,
					}
					HTCHAT.sendJson(pack,'getinfo')

		},getLoginCnf		:function( ){
					var pack 	=	{
						id		:	HTCHAT.id_seq,
						cmd		:	CMD_DEFINE.CMD_GET_LOGIN_CONFIG,
						typ 	:	"getinfo",
						from	:	HTCHAT.MYINFO.userid,
						to		:	0,
						status	:	0,
					}
					HTCHAT.sendJson(pack,'getinfo')

		},
		cmd_define 		:	{

			//收取离线消息
			CMD_NEW_GET_OFFLINEMESSAGE_ACK					:	function(obj,recvPack){

					if (recvPack && recvPack.data){

          /*
           $this.trigger(types.RECEIVE_OFFLINE_MESSAGE,recvPack.data)
            */
           var msgs = recvPack.data.msgs
						if (msgs &&msgs.forEach){
							msgs.forEach(function(v){
								 if(v.data){
                   v.data.offline 	=	1
                 }
								 obj.recvHandler(v)
							})
						}


						if (recvPack.data.info.any_more>0){

							obj.recvOffline(recvPack.data.info.last_offline)

							setTimeout(function(){this.recvOffline(recvPack.data.info.last_offline)}.bind(obj),500)

						}else{
							obj.add_tips('离线消息获取完毕')
						}


					}else{
						obj.add_tips('离线数据获取错误')
					}

			},
      CMD_GET_RECENT_CHAT_LIST_ACK: function(obj,recvPack){
        if(recvPack.status==0){
          if(recvPack.data  ){
            obj.trigger(types.GET_CHAT_LIST,recvPack.data)
          }
        }else{

        }
      },
      CMD_SHOW_USER_BASE_INFO_ACK:function(obj,recvPack){
        if(recvPack.status==0){
          if(recvPack.data  ){
            obj.trigger(types.SHOW_USER_BASE_INFO,recvPack.data)
          }
        }else{

        }
      },
			CMD_P2P_MESSAGE					:	function(obj,recvPack){

						if(recvPack.status==0){
							var add 	=	recvPack.data[recvPack.data.msg_type]
							obj.add_tips(typeof add=='string' ? add : JSON.stringify(add))
							//发小消息已读回执
							setTimeout(function(){obj.sendMsgSeen(recvPack)}.bind(obj),1500)

              obj.trigger(types.RECEIVE_MESSAGE,recvPack )

							if(recvPack.data.offline==1){
								//obj.add_tips('offline Message')
							}else{
								obj.sendRecipt(recvPack)
							}

						} else{
							obj.add_tips('recv a bad message')
						}



			} ,
			CMD_RECEIPT_MESSAGE					:	function(obj,recvPack){
					if(recvPack && recvPack.data && recvPack.data.code){
						if (recvPack.data.code!=0){
							obj.add_tips('消息发送失败：'+MSG_RECEIPT_CODE_OR[ recvPack.data.code])
              obj.trigger(types.SEND_MESSAGE_FAIL,recvPack.data)
						}else{
              $this.trigger(types.SEND_MESSAGE_OK,recvPack.data)
            }
					}

			} ,
			//收到电话邀请
			CMD_P2P_VIDEO_CHAT_INVITE		:	function(obj,recvPack){

				if(recvPack.data && recvPack.data.offline==1){
					obj.add_tips('offline VOIP INVITE')
          obj.trigger(types.SEND_MESSAGE_OK,recvPack.data)
					return;
				}

				var pack 	=	{
						id		:	obj.id_seq,
						cmd		:	CMD_DEFINE.CMD_P2P_VIDEO_CHAT_INVITE_ACCEPT,
						typ 	:	"voip",
						from	:	recvPack.to,
						to		:	recvPack.from,
						status	:	0,
						data 	:	{roomid:recvPack.data.roomid,ts:obj.getNowTS()}
					}
					obj.sendJson(pack,'voip')
			},
			//对方接受电话
			CMD_P2P_VIDEO_CHAT_INVITE_ACCEPT		:	function(obj,recvPack){
          //$this.trigger(types.SEND_MESSAGE_OK,recvPack.data)
			},
			//接受对方电话回执
			CMD_P2P_VOIP_INVITE_ACCEPT_RECEIPT		:	function(obj,recvPack){
				this.add_tips('VOIP:对方电话回执')
			},
			//接受对方电话回执
			CMD_P2P_VIDEO_CHAT_INVITE_ACCEPT_RECEIPT		:	function(obj,recvPack){
				this.add_tips('VOIP:对方电话回执')
			},
			CMD_P2P_MESSAGESEEN_NOTIFY		:	function(obj,recvPack){

        if(recvPack.data && recvPack.data.offline==1){
          //obj.add_tips('offline Message')
        }else{
          obj.sendRecipt(recvPack)
        }

        obj.trigger(types.P2P_MESSAGESEEN,recvPack)


			} ,
			CMD_P2P_PUBLIC_MESSAGE			:	function(obj,recvPack){ obj.sendRecipt(recvPack)} ,
			CMD_P2P_INPUTTING_NOTIFY		:	function(obj,recvPack){  obj.add_tips(recvPack.from +' is input ing')  } ,
		},

	};


  export default HTCHAT
