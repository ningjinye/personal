$(function(){
    document.onmousedown=function(e){
        e.preventDefault();
    };
    //雪花
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;
    var imgbox=document.querySelector(".imgbox");
    var arr=[];
    for(i=0;i<200;i++){
        var div=document.createElement("div");
        div.style.cssText="width:2px;height:6px;background:#fff;position:absolute;top:-10px;left:"+(50+Math.random()*(clientw-100))+"px;filter:blur(1px);transition:transform 3s linear "+(3*Math.random())+"s";
        imgbox.appendChild(div);
        arr.push(div);
    }
    setTimeout(function(){
        for(j=0;j<arr.length;j++){
            arr[j].style.transform="translate(0,"+(clienth-25)+"px)";
            arr[j].addEventListener("webkitTransitionEnd",function(){
                this.style.transition="none";
                this.style.transform="translate(0,0)";
                var that=this;
                setTimeout(function(){
                    that.style.transition="transform 3s linear "+((1+3)*Math.random())+"s";
                    that.style.transform="translate(0,"+(clienth-25)+"px)";
                },0)
            })

        }
    },0);
    // 小轮播
    function wheel(){
        $(".grtx>a").css({left:"100%"}).eq(0).css("left","0");
        var now=0;
        var next=0;
        function move(){
            next++;
            if(next>=$(".grtx>a").length){
                next=0;
            }
            $(".grtx>a").eq(now).css({left:"0"});
            $(".grtx>a").eq(next).css({left:"100%"});
            $(".grtx>a").eq(now).animate({left:"-100%"});
            $(".grtx>a").eq(next).animate({left:"0"});
            now=next;
        }
        var t=setInterval(move,2000);
    }
    wheel();

    // 时钟
    var clock=document.getElementsByClassName("clock")[0];
    createMark();
    function createMark(){
        for(i=1;i<=60;i++){
            if(i%5==0){
                w=2;
                h=10;
            }else{
                w=2;
                h=5;
            }
            var div=document.createElement("div");
            div.style.cssText="width:"+w+"px;height:"+h+"px;background:#ccc;position:absolute;top:0;left:0";
            div.style.transform="translate("+(140-w)/2+"px,0) rotate("+i*6+"deg)";
            div.style.transformOrigin="center 70.5px";
            clock.appendChild(div);

        }
    }

    function pointer(w,h,c,d){
        var div=document.createElement("div");
        div.style.cssText="width:"+w+"px;height:"+h+"px;background:"+c+";position:absolute;top:0;left:0";
        div.style.transform="translate("+(140-w)/2+"px,"+(70-h)+"px) rotate("+d+"deg)";
        div.style.transformOrigin="center bottom";
        div.w=w;
        div.h=h;
        clock.appendChild(div);
        return div;
    }
    var time=new Date();
    var h=pointer(3,35,"pink",time.getHours()*30+time.getMinutes()*6/12);
    var m=pointer(2,50,"pink",time.getMinutes()*6);
    var s=pointer(2,60,"#000",time.getSeconds()*6);
    setInterval(function(){
        var time=new Date();
        h.style.transform="translate("+(140-h.w)/2+"px,"+(70-h.h)+"px) rotate("+(time.getHours()*30+time.getMinutes()*6/12)+"deg)";
        m.style.transform="translate("+(140-m.w)/2+"px,"+(70-m.h)+"px) rotate("+(time.getMinutes()*6)+"deg)";
        s.style.transform="translate("+(140-s.w)/2+"px,"+(70-s.h)+"px) rotate("+(time.getSeconds()*6)+"deg)";
    },1000);

    // 遮罩
    $(".tpzs").hover(function(){
        var index=$(".tpzs").index(this);
        $(".zhezhao").hide().eq(index).slideDown(100);
        $(".zhe-top").css({animation:"zhe-top 2s ease forwards"});
        $(".zhe-bottom").css({animation:"zhe-bottom 2s ease forwards"});
    },function(){
        var index=$(".tpzs").index(this);
        $(".zhezhao").hide().eq(index).slideUp(100);
    });

    //预览
    var btn=$("button");
    var flag=true;
    btn.click(function(){
        if(flag){
            $(".ms-dev").css({transform:"rotateY(-30deg) rotateX(90deg) translateZ(-15px) translateZ(-97px)"});
            $(".ms-label").css({display:"block"});
            $(".ms-per").css({perspective:1200});
            $(".ms-screen3").css({left:17.99996,transition:"left 1.8s ease"});
            $(".ms-screen5").css({left:17.99996,transition:"left 1.5s ease"});
            $(".ms-screen2").css({left:17.99996,transition:"left 1.8s ease"});
            $(".ms-screen4").css({left:17.99996,transition:"left 1.5s ease"});
            flag=false;
        }else{
            $(".ms-dev").css({transform:"rotateY(0deg) rotateX(0deg) translateZ(0px) translateZ(0px)"});
            $(".ms-label").css({display:"none"});
            $(".ms-per").css({perspective:2200});
            $(".ms-screen3").css({left:-270,transition:"left 1.8s ease"});
            $(".ms-screen5").css({left:-270,transition:"left 1.5s ease"});
            $(".ms-screen2").css({left:310,transition:"left 1.8s ease"});
            $(".ms-screen4").css({left:310,transition:"left 1.5s ease"});
            flag=true;
        }


    });


    // 音波
    var audio=document.querySelector("audio");
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var audioObj=new AudioContext();
    var sources=audioObj.createMediaElementSource(audio);  //音频源
    var analyser=audioObj.createAnalyser();                //分析器
    //音频源-分析器-与输出设备连接
    sources.connect(analyser);
    analyser.connect(audioObj.destination);

    setInterval(function(){
        cobj.clearRect(0,0,600,300);
        var array=new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var rate=array.length/canvas.width;
        cobj.save();
        cobj.translate(0,300);
        cobj.beginPath();
        for(var i=0;i<array.length;i++){
            cobj.lineTo(i,-array[i]);
        }
        cobj.strokeStyle="#FFF";
        cobj.stroke();
        cobj.restore();
    },40);

    // 技能
    var skill=document.querySelector(".skill");
    var zpzs=document.querySelector(".zpzs");
    document.documentElement.scrollTop=1;
    var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    window.onscroll=function(){
        if(obj.scrollTop>=skill.offsetTop-300&&obj.scrollTop<zpzs.offsetTop){
            $(".sk1").css({transform:"translate(0,0) rotateY(360deg)"});
            $(".sk2").css({transform:"translate(0,0) rotateY(360deg)"});
            $(".sk3").css({transform:"translate(0,0) rotateY(360deg)"});
            $(".sk4").css({transform:"translate(0,0) rotateY(360deg)"});
        }else{
            $(".sk1").css({transform:"translate(-500px,0) rotateY(180deg)"});
            $(".sk2").css({transform:"translate(-800px,0) rotateY(180deg)"});
            $(".sk3").css({transform:"translate(800px,0) rotateY(180deg)"});
            $(".sk4").css({transform:"translate(500px,0) rotateY(180deg)"});
        }

    }
});