
function checkPosition(e) {
    var s = $(document.documentElement).scrollTop() || $(document.body).scrollTop();
    s > e ? $(".toolbar-item-gotop").fadeIn() : $(".toolbar-item-gotop").fadeOut()
}

function Tips(e, s) {
    e.wrap('<div class="tips-box"></div>').after('<span class="tips">' + s + "</span>"), setTimeout(function () {
        e.unwrap().siblings().remove(".tips"), e.focus()
    }, 4e3)
}



function zy_Countdown() {
    zy_c_num--, $(".sendE2 span").html(zy_c_num + "s"), $(".zy_success span").html(zy_str), 58 > zy_c_num && $(".zy_success").addClass("upmove"), 0 >= zy_c_num && (zy_c_num = 60, $(".sendE2").hide(), $(".sendE").show(), clearInterval(sendECount))
}


function show_send_sms(e) {
    return $("#forgetpswMobileModal .send-verify,#verify_form .send-verify").html("重发验证码（" + e + "s）").css({background: "#D6D6D6"}).attr("disabled", "disabled"), 0 >= e ? ($(".verify-tips.success").hide(500), $("#forgetpswMobileModal .send-verify,#verify_form .send-verify").html("重发验证码").css({background: "#5ECFBA"}).removeAttr("disabled"), sendOFF = !0, void 0) : (e--, setTimeout("show_send_sms(" + e + ")", 1e3), void 0)
}

function send_sms_code() {
    show_send_sms(60);
    var e = $("#id_mobile_code").val(), s = "";
    ("" == e || void 0 == e) && (e = $("#id_mobile_f").val(), s = "change"), sendOFF && ($.ajax({
        cache: !1,
        type: "POST",
        url: "/user/register/mobile/sendsms_signup/",
        data: {
            mobile: e,
            geetest_challenge: $(".geetest_challenge").attr("value"),
            geetest_validate: $(".geetest_validate").attr("value"),
            geetest_seccode: $(".geetest_seccode").attr("value"),
            way: s
        },
        success: function (e) {
            e.mobile ? "" != s ? $("#mobile_code_password_form_message").css({background: "#f2dede"}).html(e.mobile) : $(".verify-tips").removeClass("success").addClass("error").html(e.mobile).show(500) : e.captcha ? "" != s ? $("#mobile_code_password_form_message").css({background: "#f2dede"}).html(e.captcha) : $(".verify-tips").removeClass("success").addClass("error").html(e.captcha).show(500) : "success" == e.status ? "" != s ? $("#mobile_code_password_form_message").css({background: "#f2dede"}).html("") : ($(".verify-tips").removeClass("error").addClass("success").html(e.info).show(500), show_send_sms(60)) : "failure" == e.status && ("" != s ? $("#mobile_code_password_form_message").css({background: "#f2dede"}).html("请稍后再试") : $(".verify-tips").removeClass("success").addClass("error").html("短信验证码发送失败").show(500))
        },
        complete: function () {
            $("#send-verify").html("重发验证码"), $("#send-verify").removeAttr("disabled")
        }
    }), sendOFF = !1)
}

function zy_validate_Email(e, s) {
    var o = !0;
    if (e) o = !0; else {
        $("#emailValidate .close").unbind().click(function () {
            $("#emailValidate").modal("hide")
        }), $("#registerModal").modal("hide"), $("#addemailModal").modal("hide"), $("#emailValidate").modal("show");
        var a = $(".zy_email .a>a"), t = s.split("@")[1];
        a.attr("href", hash[t]), $("#emailValidateEE span").html(s), (void 0 == hash[t] || null == hash[t]) && a.parent().hide(), o = !1
    }
    return o
}

function mobile_code_password_form_submit() {
    $.ajax({
        cache: !1,
        type: "POST",
        url: "/user/password/find/mobile/",
        data: $("#mobile_code_password_form").serialize(),
        beforeSend: function () {
            $("#mobile_code_password_btn").html("提交中..."), $("#mobile_code_password_btn").attr("disabled", "disabled")
        },
        success: function (e) {
            e.mobile_code_f ? ($("#mobile_code_password-tips").html(e.mobile_code_f).show(500), $("#id_mobile_code_f").focus()) : "success" == e.status && (account = $("#id_account").val(), code = $("#id_mobile_code_f").val(), location.href = "/user/password/reset/" + account + "/" + code)
        },
        complete: function () {
            $("#mobile_code_password_btn").html("提交"), $("#mobile_code_password_btn").removeAttr("disabled")
        }
    })
}

function flayer_show() {
    $("#fLayerdl").show(), $("#dd_listbox").hide()
}

function flayer_hide(e) {
    e ? setTimeout("$('#fLayerdl').hide();", e) : $("#fLayerdl").hide()
}

function listbox_show() {
    $("#dd_listbox").show(), $("#fLayerdl").hide()
}

function listbox_hide(e) {
    e ? setTimeout("$('#dd_listbox').hide();", e) : $("#dd_listbox").hide()
}

function searchajax(e) {
    $.ajax({
        url: "http://suggest.maiziedu.com/suggest/?keyword=" + e,
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (e) {
            var s = [], o = [], a = [], t = [], i = [];
            if ($.each(e, function (e, c) {
                    $.each(c.courses, function (e, n) {
                        s.push({
                            id: n.id,
                            name: c.name,
                            student_count: n.student_count
                        }), $.each(n.careers, function (e, s) {
                            s.student_count && (-1 == i.indexOf(s.name) && (o.push({
                                name: s.name,
                                short_name: s.short_name,
                                image: s.image,
                                description: s.description,
                                student_count: s.student_count
                            }), i.push(s.name)), $.each(s.teachers, function (e, s) {
                                -1 == t.indexOf(s.name) && (a.push({
                                    teacher_id: s.teacher_id,
                                    name: s.name,
                                    title: s.title,
                                    image: s.image,
                                    info: s.info
                                }), t.push(s.name))
                            }))
                        })
                    })
                }), 0 == s.length) return $(".dd_listbox").hide(), void 0;
            var c = "";
            $(".careercraft").remove(), $.each(s, function (e, s) {
                c = '<div class="careercraft"><a target="_blank" href="/course/' + s.id + '/"><p class="pull-left course_info">' + s.name + '</p><p class="pull-right study_count">' + s.student_count + "人正在学习</p></a></div>", $("#course_name_ledg").append(c)
            }), $(".chcourse").remove(), $.each(o, function (e, s) {
                c = '<div class="chcourse"><img src="/uploads/' + s.image + '" class="dd_courseimg img-circle"><a target="_blank" href="/course/' + s.short_name + '-px/" style="outline:none;"><p class="dd_coursedescriname">' + s.name + '</p><p class="radius"><span class="f_radius">毕业学员： <span class="finished_count">' + s.student_count + '</span>人</span></p><p class="dd_coursedescri">' + s.description + "</p>", $("#incld_careers").append(c)
            }), $(".careerteacher").remove(), $.each(a, function (e, s) {
                c = '<div class="careerteacher"><a target="_blank" href="/u/' + s.teacher_id + '/" style="outline:none;"><img src="/uploads/' + s.image + '" class="dd_courseimg img-circle"><p class="courseteacher">' + s.name + '</p><p class="ls">|</p><p class="teachertt">' + s.title + '</p><p class="teacherdes">' + s.info + "</p></a></div>", $("#incld_teachers").append(c)
            }), $("#data-search").val() && (0 == o.length ? ($("#dd_csitem").hide(), $("#incld_careers").hide()) : ($("#dd_csitem").show(), $("#incld_careers").show()), 0 == a.length ? ($("#dd_tutor").hide(), $("#incld_teachers").hide()) : ($("#dd_tutor").show(), $("#incld_teachers").show()), 0 == s.length ? ($("#dd_craft").hide(), $("#course_name_ledg").hide()) : ($("#dd_craft").show(), $("#course_name_ledg").show()), listbox_show())
        }
    })
}

function Search() {
    function e(e) {
        var e = e.replace("#", "u0023").replace("?", "u0022");
        if ($(".search_result_bg").length > 0) {
            var s = $(".search_app").val() ? $(".search_app").val() : "course";
            window.location.href = "/search/" + s + "/" + e + "-1/"
        } else window.open("/search/course/" + e + "-1/")
    }

    $(".search-btn").click(function () {
        e($("#data-search").val()), zhuge.track("搜索次数", {"搜索关键词": $("#data-search").val()})
    }), $("#data-search").keyup(function (s) {
        var o = s || window.event || arguments.callee.caller.arguments[0];
        return o && 13 == o.keyCode ? (e($(this).val()), void 0) : void 0
    })
}

function cutTimer(e, s) {
    window.setInterval(function () {
        var o = 0, a = 0, t = 0, i = 0;
        e > 0 && (o = Math.floor(e / 86400), a = Math.floor(e / 3600) - 24 * o, t = Math.floor(e / 60) - 60 * 24 * o - 60 * a, i = Math.floor(e) - 60 * 60 * 24 * o - 60 * 60 * a - 60 * t), 9 >= t && (t = "0" + t), 9 >= i && (i = "0" + i), $(s + "#day_show").html(o + "天"), $(s + "#hour_show").html(a + "时"), $(s + "#minute_show").html(t + "分"), $(s + "#second_show").html(i + "秒"), e--
    }, 1e3)
}

function tab(e) {
    var s = {tabNav: ".tab_menu > li", tabBox: ".tab_box > div", select: "active", type: "show"}, o = e;
    $.extend(s, e);
    var a = $(s.tabNav || o.tabNav);
    a.click(function () {
        $(this).addClass(s.select || o.select).siblings().removeClass(s.select || o.select);
        var e = a.index(this);
        switch (s.type) {
            case"show":
                $(s.tabBox || o.tabBox).eq(e).show().siblings().hide();
                break;
            case"slide":
                $(s.tabBox || o.tabBox).eq(e).slideDown(300).siblings().slideUp(300);
                break;
            case"fade":
                $(s.tabBox || o.tabBox).eq(e).fadeIn(300).siblings().fadeOut(300)
        }
    })
}

function imgPopup(e) {
    var s = "", o = new Image;
    o.src = e, o.className = "img", s += '<div id="imgzoom"><div id="imgzoom-image-ctn"><i class="imgzoom-close"></i>', s += '<img class="img" src="' + o.src + '" alt=""/>', s += "</div></div>", $("body").append(s);
    var a = $("#imgzoom-image-ctn"), t = $("#imgzoom");
    o.onload = function () {
        var e = 0, s = 0;
        s = o.width, e = o.height, a.width() / a.height() >= s / e && (e > a.height() ? (a.find(".img").width(parseInt(a.height() * s / e)), a.find(".img").height(parseInt(a.height())), a.width(parseInt(a.height() * s / e)), a.height(parseInt(a.height()))) : (a.width(s), a.height(e))), a.css({
            left: "50%",
            top: "50%",
            marginLeft: -a.width() / 2,
            marginTop: -a.height() / 2
        }), a.fadeIn()
    }, t.fadeIn("fast", "linear"), t.find(".img").on("click", function (e) {
        var e = e || event;
        e.stopPropagation()
    }), $(".imgzoom-close, body").on("click", function () {
        $("#imgzoom").remove()
    })
}

function yueKeSuccess() {
    var e = $("#yueke-success");
    e.modal({
        show: !0,
        keyboard: !1,
        backdrop: "static"
    }), $("#yueke-success .close, #yueke-success .know").off().on("click", function () {
        e.modal("hide")
    })
}

function yueKeOver() {
    var e = $("#yueke-over");
    e.modal({
        show: !0,
        keyboard: !1,
        backdrop: "static"
    }), $("#yueke-over .close, #yueke-over .know").on("click", function () {
        e.modal("hide")
    })
}

function yueKeLastStep(e) {
    var s = $("#yueke-last-step"), o = $("#ops-user-name"), a = $("#ops-phone-num"), t = $("#ops-advisor"),
        i = $("#ops-verification"), c = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    i.val(), s.modal({
        show: !0,
        keyboard: !1,
        backdrop: "static"
    }), $("#yueke-last-step .close").on("click", function () {
        s.modal("hide")
    }), $("#yueke-last-step .know").off().on("click", function () {
        "" == o.val() ? (tipsMsg = "请输入你的姓名", Tips(o, tipsMsg)) : "" == a.val() ? (tipsMsg = "请输入正确的手机号", Tips(a, tipsMsg)) : c.test(a.val()) ? (t.selected = 0 == t.val()) ? (tipsMsg = "未选择", Tips(t, tipsMsg)) : "" == i.val() ? (tipsMsg = "手机验证码输入错误，请重试", Tips(i, tipsMsg)) : ops_verify(e) : (tipsMsg = "请输入正确的手机号", Tips(a, tipsMsg))
    }), $("#ops-send-verify").on("click", function () {
        "" == a.val() ? (tipsMsg = "请输入正确的手机号", Tips(a, tipsMsg)) : c.test(a.val()) ? ops_send_sms() : c.test(a.val()) || (tipsMsg = "请输入正确的手机号", Tips(a, tipsMsg))
    })
}

function ovoService() {
    function e() {
        s.modal({show: !0, keyboard: !1, backdrop: "static"}), $("#ovo-service .know").off().on("click", function () {
            s.modal("hide"), yueKeLastStep("1")
        }), $("#ovo-service .close").on("click", function () {
            s.modal("hide")
        })
    }

    var s = $("#ovo-service");
    ops_is_exist("1", e)
}

function openService() {
    function e() {
        s.modal({show: !0, keyboard: !1, backdrop: "static"}), $("#open-service .know").off().on("click", function () {
            s.modal("hide"), yueKeLastStep("2")
        }), $("#open-service .close").on("click", function () {
            s.modal("hide")
        })
    }

    var s = $("#open-service");
    ops_is_exist("2", e)
}

function ops_verify(e) {
    var s, o = $("#ops-verification");
    $.ajax({
        type: "POST",
        url: "/lps4/ajax_ops_verify/",
        data: {
            mobile: $("#ops-phone-num").val(),
            mobile_code: $("#yueke-last-step .verification").val(),
            career_id: career_id,
            source: e,
            username: $("#ops-user-name").val(),
            advisor: $("#ops-advisor").val(),
            status: $("#ops-status").val()
        },
        dataType: "json",
        success: function (e) {
            e.success ? ($("#yueke-last-step").modal("hide"), yueKeSuccess()) : (s = e.message, Tips(o, s))
        }
    })
}

function ops_is_exist(e, s) {
    $.ajax({
        type: "POST",
        url: "/lps4/ajax_ops_is_exist/",
        data: {career_id: career_id, source: e},
        dataType: "json",
        success: function (e) {
            e.success ? e.data.is_exist ? yueKeOver() : s() : layer.alert(e.message, {
                skin: "layui-layer-molv",
                closeBtn: 0
            })
        }
    })
}

function ops_send_sms() {
    var e, s = $("#ops-phone-num").val(), o = $("#ops-verification"), a = $("#ops-send-verify");
    $.ajax({
        type: "POST",
        url: "/lps4/mobile/sendsms/",
        data: {mobile: s, retry: 1},
        dataType: "json",
        success: function (s) {
            s.success ? Cuttime(a, 60) : (e = s.message, Tips(o, e))
        }
    })
}

function Cuttime(e, s) {
    var o = null;
    e.addClass("send").val("60s").attr("disabled", "disabled"), o = setInterval(function () {
        s--, e.val(s + "s"), 0 >= s && (clearInterval(o), e.removeClass("send").val("重新发送").removeAttr("disabled"))
    }, 1e3)
}

$(".class53").click(function () {
    $("#KFLOGO .Lelem").eq(0).trigger("click")
}), $(".toolbar-item-weibo>div").hover(function () {
}, function () {
    $(this).stop().hide("fast")
}), $(".toolbar-item-weibo").click(function () {
    $(".lixianB").show()
}), $(".toolbar-item-weixin, .toolbar-kf").unbind().click(function () {
    $("#KFLOGO .Lelem").eq(0).trigger("click"), $(".toolbar-kf").hide()
}), $(window).on("scroll", function () {
    checkPosition($(window).height())
}), checkPosition($(window).height()), $(".toolbar-item-gotop").click(function () {
    $("html,body").stop().animate({scrollTop: "0px"}, 800)
}), $(".globalLoginBtn").on("click", login_popup), $(".globalLogin").on("click", function () {
    login_form_submit("login-form-tips")
}), function () {
    var e = [];
    $(".modal").on("show.bs.modal", function () {
        for (var s = 0; e.length > s; s++) e[s] && (e[s].modal("hide"), e[s] = null);
        e.push($(this));
        var o = $(this), a = o.find(".modal-dialog"),
            t = $('<div style="display:table; width:100%; height:100%;"></div>');
        t.html('<div style="vertical-align:middle; display:table-cell;"></div>'), t.children("div").html(a), o.html(t)
    })
}();
var zy_c_num = 60, zy_str = "", sendECount;
$(".sendE a").click(function () {
    sendECount = setInterval(zy_Countdown, 1e3), $(".zy_success").removeClass("upmove"), $(this).parent().hide(), $(".sendE2").show().find("span").html("60s"), $.ajax({
        type: "GET",
        url: "/user/send_again_email",
        data: {username: $("#id_account_l").val()},
        dataType: "html",
        success: function (e) {
            zy_str = "验证邮件发送成功", e && zy_Countdown()
        },
        error: function () {
            zy_str = "验证邮件发送失败"
        }
    })
});
var sendOFF = !0, OFF = !0;
$("#btnForgetpsw").on("click", function () {
    captchaObjF3 && captchaObjF3.refresh(), OFF && (captcha(".newcaptcha"), OFF = !1), $("#forgetpswModal").modal("show"), $("#loginModal").modal("hide")
}), $("#forgetpswMobileModal .send-verify").click(function () {
    send_sms_code("verify_form", "verify-tips")
}), $("#mobile_code_password_btn").click(mobile_code_password_form_submit);
var zyemail = "", zyUname = "", hash = {
    "qq.com": "http://mail.qq.com",
    "gmail.com": "http://mail.google.com",
    "sina.com": "http://mail.sina.com.cn",
    "163.com": "http://mail.163.com",
    "126.com": "http://mail.126.com",
    "yeah.net": "http://www.yeah.net/",
    "sohu.com": "http://mail.sohu.com/",
    "tom.com": "http://mail.tom.com/",
    "sogou.com": "http://mail.sogou.com/",
    "139.com": "http://mail.10086.cn/",
    "hotmail.com": "http://www.hotmail.com",
    "live.com": "http://login.live.com/",
    "live.cn": "http://login.live.cn/",
    "live.com.cn": "http://login.live.com.cn",
    "189.com": "http://webmail16.189.cn/webmail/",
    "yahoo.com.cn": "http://mail.cn.yahoo.com/",
    "yahoo.cn": "http://mail.cn.yahoo.com/",
    "eyou.com": "http://www.eyou.com/",
    "21cn.com": "http://mail.21cn.com/",
    "188.com": "http://www.188.com/",
    "foxmail.coom": "http://www.foxmail.com"
};
Search(), $(document).ready(function () {
    $("#data-search").focus(function () {
        keywd = $("#data-search").val(), "" == keywd ? flayer_show() : searchajax(keywd)
    }).blur(function () {
        flayer_hide(500)
    }), $("#data-search").keyup(function () {
        return keywd = $("#data-search").val(), "" == keywd ? (listbox_hide(), flayer_show(), void 0) : (searchajax(keywd), void 0)
    }).blur(function () {
        return keywd = $("#data-search").val(), "" == keywd ? (listbox_hide(), void 0) : (listbox_hide(500), void 0)
    })
});
var _Login = $(".topRight").attr("login");
if ("True" == _Login) {
    var _nickName = $(".nick_name a:first-child");
    _nickName.attr("data-name").length >= 4 ? _nickName.text(_nickName.attr("data-name").substring(0, 4) + "...") : _nickName.text(_nickName.attr("data-name"))
}
$(".finished").parent().on("click", function () {
    var e = $(this).attr("meeting_id"), s = $(this).attr("href_url");
    $.ajax({
        type: "POST",
        url: "/home/t/ajax_insert_onevone_attendance/",
        data: {meeting_id: e},
        dataType: "json",
        success: function () {
        }
    }), window.open(s)
}), $(".live-btn.living").on("click", function () {
    var e = $(this).attr("meeting_id"), s = $(this).attr("href_url");
    $.ajax({
        type: "POST",
        url: "/home/t/ajax_insert_onevone_attendance/",
        data: {meeting_id: e},
        dataType: "json",
        success: function () {
        }
    }), window.open(s)
});