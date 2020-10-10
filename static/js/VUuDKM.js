function sizeup987() {
  $('#jcornerBig').css('top', 0);
  $('#jcornerSmall').css('top', '-1000px');
}
function sizedown987() {
  $('#jcornerSmall').css('top', 0);
  $('#jcornerBig').css('top', '-1000px');
}
function HideBars(n) {
  var t = 0;
  n == 'navbar' &&
    ((t += $('#navbar').height()),
    $.browser.msie && $.browser.version == '7.0' && (t += 2));
  n == 'cc-container' && (t += $('#cc-container').height());
  $('#navbar').length != 0 &&
    $('#navbar').css('top', parseInt($('#navbar').css('top')) - t + 'px');
}
function DisplayBars(n) {
  var t, i;
  $.browser.msie &&
    $.browser.version == '7.0' &&
    ($('#container').parent('#wrapcontainer').length == 0 &&
      $('#container').wrap(
        '<div id="wrapcontainer" style="position: relative;"></div>'
      ),
    $('#container').css('margin-top', '0px'));
  t = 0;
  $('#cc-container').length != 0 && (t += $('#cc-container').height());
  i = 0;
  $('#navbar').length != 0 && (i += $('#navbar').height());
  $('#cc-container').css('top', '0px');
  $('#navbar').css('top', t + 'px');
}
function LoadAddressByPostBack(n, t, i) {
  if (!validatePostcode($('#' + t).val())) {
    $('#tdPostcode').empty();
    $('#trPostcode').hide();
    $('#divEmptyListAddress').remove();
    return;
  }
  n += '&postcode=' + $('#' + t).val() + '&width=' + i;
  $.ajax({
    type: 'GET',
    url: n,
    contentType: 'application/html; charset=windows-1251',
    beforeSend: function () {},
    success: function (n) {
      $('#divEmptyListAddress').remove();
      n == '1'
        ? ($('#' + t)
            .parent()
            .append(
              '<div id="divEmptyListAddress" class="infored" style="font-size:10px;">Sorry, invalid postcode, please check and try again</div>'
            ),
          $('#tdPostcode').empty(),
          $('#trPostcode').hide())
        : n != '0' &&
          ($('#tdPostcode').empty(),
          $('#tdPostcode').html(n),
          $('#trPostcode').show());
    },
    error: function () {},
  });
}
function AutoFillAddress(n, t) {
  if ((ClearPostcodeFields(), $('#' + t).val() == '0')) return !1;
  n += '&id=' + $('#' + t).val();
  $.getJSON(n, {}, function (n) {
    $.each(n, function (n, t) {
      var s = '',
        h = '',
        c = '',
        i,
        r,
        u,
        f,
        e,
        o,
        n;
      if (
        ((s =
          t.Company != ''
            ? t.Company
            : t.SubBuilding != ''
            ? t.SubBuilding
            : t.BuildingNumber != ''
            ? t.BuildingNumber
            : t.BuildingName),
        (h =
          t.SubBuilding != ''
            ? t.BuildingName + ', ' + t.PrimaryStreet
            : t.DependentLocality != ''
            ? t.PrimaryStreet
            : t.Company != '' && t.Line2 == ''
            ? t.BuildingNumber + ', ' + t.PrimaryStreet
            : t.PrimaryStreet),
        t.DependentLocality != '' && (c = t.DependentLocality),
        (i = prmAddressline1.split(',')),
        i.length > 0)
      )
        for (n = 0; n != i.length; n++) $('#' + i[n]).val(h);
      if (((r = prmAddressline2.split(',')), r.length > 0))
        for (n = 0; n != r.length; n++) $('#' + r[n]).val(c);
      if (((u = prmHouse.split(',')), u.length > 0))
        for (n = 0; n != u.length; n++) $('#' + u[n]).val(s);
      if (((f = prmTown.split(',')), f.length > 0))
        for (n = 0; n != f.length; n++) $('#' + f[n]).val(t.PostTown);
      if (((e = prmCompany.split(',')), e.length > 0))
        for (n = 0; n != e.length; n++) $('#' + e[n]).val(t.Company);
      if (((o = prmCounty.split(',')), o.length > 0))
        for (n = 0; n != o.length; n++) $('#' + o[n]).val(t.County);
    });
  });
}
function ClearPostcodeFields() {
  var e = prmAddressline1.split(','),
    t,
    i,
    r,
    u,
    f,
    n;
  if (e.length > 0) for (n = 0; n != e.length; n++) $('#' + e[n]).val('');
  if (((t = prmAddressline2.split(',')), t.length > 0))
    for (n = 0; n != t.length; n++) $('#' + t[n]).val('');
  if (((i = prmHouse.split(',')), i.length > 0))
    for (n = 0; n != i.length; n++) $('#' + i[n]).val('');
  if (((r = prmTown.split(',')), r.length > 0))
    for (n = 0; n != r.length; n++) $('#' + r[n]).val('');
  if (((u = prmCompany.split(',')), u.length > 0))
    for (n = 0; n != u.length; n++) $('#' + u[n]).val('');
  if (((f = prmCounty.split(',')), f.length > 0))
    for (n = 0; n != f.length; n++) $('#' + f[n]).val('');
}
function isValidDate(n, t, i) {
  var e = t + '-' + i + '-' + n,
    f = 'MDY',
    c = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/,
    l = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/,
    r,
    o,
    s,
    u,
    h;
  return c.test(e) == !1 && l.test(e) == !1
    ? !1
    : ((r = e.split(RegExp.$1)),
      (o =
        f.substring(0, 1) == 'M'
          ? r[0]
          : f.substring(1, 2) == 'M'
          ? r[1]
          : r[2]),
      (s =
        f.substring(0, 1) == 'D'
          ? r[0]
          : f.substring(1, 2) == 'D'
          ? r[1]
          : r[2]),
      (u =
        f.substring(0, 1) == 'Y'
          ? r[0]
          : f.substring(1, 2) == 'Y'
          ? r[1]
          : r[2]),
      parseFloat(u) <= 50 && (u = (parseFloat(u) + 2e3).toString()),
      parseFloat(u) <= 99 && (u = (parseFloat(u) + 1900).toString()),
      (h = new Date(
        parseFloat(u),
        parseFloat(o) - 1,
        parseFloat(s),
        0,
        0,
        0,
        0
      )),
      parseFloat(s) != h.getDate())
    ? !1
    : parseFloat(o) - 1 != h.getMonth()
    ? !1
    : !0;
}
function CheckupObj() {
  return isEmpty(document.getElementById('" + txtUsername.ClientID + "'))
    ? (alert('Enter Username!'), !1)
    : isEmpty(document.getElementById('" + txtPassword.ClientID + "'))
    ? (alert('Enter Password!'), !1)
    : isEmpty(document.getElementById('" + txtPasswordConfirm.ClientID + "'))
    ? (alert('Enter Confirm Password!'), !1)
    : document.getElementById('" + txtPassword.ClientID + "').value !=
      document.getElementById('" + txtPasswordConfirm.ClientID + "').value
    ? (alert('Confirm Password does not match to Password!'), !1)
    : !0;
}
function AddFormAction(n) {
  var r = document.getElementById('aspnetForm'),
    t,
    i;
  r != null && (r.action = n);
  t = document.getElementById('FormManageAcct');
  t != null && (t.action = n);
  i = document.getElementById('formagegate');
  i != null && (i.action = n);
}
function IsExistsHTMLTags(n) {
  if (
    n.indexOf('</') > -1 ||
    n.indexOf('$(') > -1 ||
    n.indexOf('%%') > -1 ||
    n.indexOf('function ()') > -1 ||
    n.indexOf('(document)') > -1
  )
    return !0;
  var t = new RegExp('((<|&alt;)[a-zA-Z]+?)+?');
  return n.match(t) ? !0 : !1;
}
function CheckupEmail(n, t) {
  var i = new RegExp(
    '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
  );
  return n.match(i)
    ? !0
    : (t != ''
        ? alert('Enter correct "' + t + '"!')
        : alert('Please check the email format.'),
      !1);
}
function IsEmailOk(n) {
  var t = new RegExp(
    '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
  );
  return n.match(t) ? !0 : !1;
}
function IsCorrectEmail(n) {
  var t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return t.test(n) ? !0 : !1;
}
function IsValueInDDLOk(n) {
  for (var t = 0; t < n.length; t++)
    if (n[t].selected && n[t].value == '-1') return (n.selectedIndex = 0), !1;
  return !0;
}
function isEmpty(n) {
  return n.value != '' ? !1 : !0;
}
function IsEmptyTextbox(n) {
  return n != '' ? !1 : !0;
}
function IsValidNumber(n) {
  var t = /^\d+$/,
    i = n.match(t);
  return i == null ? !1 : !0;
}
function isCheck(n) {
  return n.checked ? !0 : !1;
}
function getChar(n) {
  return (n.which || n.keyCode) && (n.which == 13 || n.keyCode == 13) ? !0 : !1;
}
function setFocus(n, t) {
  return getChar(t) ? (document.getElementById(n).focus(), !0) : !1;
}
function SetFocus(n) {
  return (
    $('#' + n).keydown(function (t) {
      if (t.keyCode && t.keyCode == 13) return $('#' + n).focus(), !0;
    }),
    !1
  );
}
function CheckAll(n, t) {
  for (
    var i, u = document.getElementById(t), r = 0;
    r < document.forms[0].elements.length;
    r++
  )
    (i = document.forms[0].elements[r]),
      i.name.search(n) > 0 && (alert(i), (i.checked = u.checked ? !0 : !1));
}
function JumpToPage(n) {
  var t = $('select#' + n).val();
  t != '' && (window.location.href = t);
}
function MathRound(n, t) {
  return Math.round(n * Math.pow(10, t)) / Math.pow(10, t);
}
function show_submenu(n, t) {
  $('#' + n).css('visibility', 'visible');
  var i = t;
  $('#' + n + ' a.submenulink').each(function () {
    $(this).width() > i && (i = $(this).width());
  });
  $('#' + n).css('width', i);
}
function hide_submenu(n) {
  $('#' + n).css('visibility', 'hidden');
}
function getWindowWidth() {
  document.body.style.overflow = 'hidden';
  var n = $(window).width();
  return (document.body.style.overflow = ''), n;
}
function LoadArticles(n, t, i, r, u) {
  return (
    $(n).val().length > 0
      ? ($('#' + r).click(function () {
          $(this).hide();
          $('#' + t).empty();
          $('#' + t).hide();
          $(n).val('Search!');
        }),
        $.ajax({
          type: 'GET',
          url: i + 'handler.aspx?action=searcharticle&kw=' + $(n).val(),
          beforeSend: function (n, t, i) {
            $('#' + u).show();
          },
          success: function (n) {
            $('#' + u).hide();
            $('#' + t).show();
            $('#' + t).html(n);
            $('#' + r).show();
          },
        }))
      : ($('#' + r).hide(), $('#' + u).hide(), $('#' + t).hide()),
    !1
  );
}
function getPosition(n) {
  for (var t = 0, i = 0; n; )
    (t += n.offsetLeft - n.scrollLeft + n.clientLeft),
      (i += n.offsetTop - n.scrollTop + n.clientTop),
      (n = n.offsetParent);
  return { x: t, y: i };
}
function LoadAddressByPostBack(n, t, i) {
  if (!validatePostcode($('#' + t).val())) {
    $('#tdPostcode').empty();
    $('#trPostcode').hide();
    $('#divEmptyListAddress').remove();
    return;
  }
  n += '&postcode=' + $('#' + t).val() + '&width=' + i;
  $.ajax({
    type: 'GET',
    url: n,
    contentType: 'application/html; charset=windows-1251',
    beforeSend: function () {},
    success: function (n) {
      $('#divEmptyListAddress').remove();
      n == '1'
        ? ($('#' + t)
            .parent()
            .append(
              '<div id="divEmptyListAddress" class="infored" style="font-size:10px;">Sorry, invalid postcode, please check and try again</div>'
            ),
          $('#tdPostcode').empty(),
          $('#trPostcode').hide())
        : n != '0' &&
          ($('#tdPostcode').empty(),
          $('#tdPostcode').html(n),
          $('#trPostcode').show());
    },
    error: function () {},
  });
}
function AutoFillAddress(n, t) {
  if ((ClearPostcodeFields(), $('#' + t).val() == '0')) return !1;
  n += '&id=' + $('#' + t).val();
  $.getJSON(n, {}, function (n) {
    $.each(n, function (n, t) {
      var s = '',
        h = '',
        c = '',
        i,
        r,
        u,
        f,
        e,
        o,
        n;
      if (
        ((s =
          t.Company != ''
            ? t.Company
            : t.SubBuilding != ''
            ? t.SubBuilding
            : t.BuildingNumber != ''
            ? t.BuildingNumber
            : t.BuildingName),
        (h =
          t.SubBuilding != ''
            ? t.BuildingName + ', ' + t.PrimaryStreet
            : t.DependentLocality != ''
            ? t.PrimaryStreet
            : t.Company != '' && t.Line2 == ''
            ? t.BuildingNumber + ', ' + t.PrimaryStreet
            : t.PrimaryStreet),
        t.DependentLocality != '' && (c = t.DependentLocality),
        (i = prmAddressline1.split(',')),
        i.length > 0)
      )
        for (n = 0; n != i.length; n++) $('#' + i[n]).val(h);
      if (((r = prmAddressline2.split(',')), r.length > 0))
        for (n = 0; n != r.length; n++) $('#' + r[n]).val(c);
      if (((u = prmHouse.split(',')), u.length > 0))
        for (n = 0; n != u.length; n++) $('#' + u[n]).val(s);
      if (((f = prmTown.split(',')), f.length > 0))
        for (n = 0; n != f.length; n++) $('#' + f[n]).val(t.PostTown);
      if (((e = prmCompany.split(',')), e.length > 0))
        for (n = 0; n != e.length; n++) $('#' + e[n]).val(t.Company);
      if (((o = prmCounty.split(',')), o.length > 0))
        for (n = 0; n != o.length; n++) $('#' + o[n]).val(t.County);
    });
  });
}
function ClearPostcodeFields() {
  var e = prmAddressline1.split(','),
    t,
    i,
    r,
    u,
    f,
    n;
  if (e.length > 0) for (n = 0; n != e.length; n++) $('#' + e[n]).val('');
  if (((t = prmAddressline2.split(',')), t.length > 0))
    for (n = 0; n != t.length; n++) $('#' + t[n]).val('');
  if (((i = prmHouse.split(',')), i.length > 0))
    for (n = 0; n != i.length; n++) $('#' + i[n]).val('');
  if (((r = prmTown.split(',')), r.length > 0))
    for (n = 0; n != r.length; n++) $('#' + r[n]).val('');
  if (((u = prmCompany.split(',')), u.length > 0))
    for (n = 0; n != u.length; n++) $('#' + u[n]).val('');
  if (((f = prmCounty.split(',')), f.length > 0))
    for (n = 0; n != f.length; n++) $('#' + f[n]).val('');
}
function isValidDate(n, t, i) {
  var e = t + '-' + i + '-' + n,
    f = 'MDY',
    c = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/,
    l = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/,
    r,
    o,
    s,
    u,
    h;
  return c.test(e) == !1 && l.test(e) == !1
    ? !1
    : ((r = e.split(RegExp.$1)),
      (o =
        f.substring(0, 1) == 'M'
          ? r[0]
          : f.substring(1, 2) == 'M'
          ? r[1]
          : r[2]),
      (s =
        f.substring(0, 1) == 'D'
          ? r[0]
          : f.substring(1, 2) == 'D'
          ? r[1]
          : r[2]),
      (u =
        f.substring(0, 1) == 'Y'
          ? r[0]
          : f.substring(1, 2) == 'Y'
          ? r[1]
          : r[2]),
      parseFloat(u) <= 50 && (u = (parseFloat(u) + 2e3).toString()),
      parseFloat(u) <= 99 && (u = (parseFloat(u) + 1900).toString()),
      (h = new Date(
        parseFloat(u),
        parseFloat(o) - 1,
        parseFloat(s),
        0,
        0,
        0,
        0
      )),
      parseFloat(s) != h.getDate())
    ? !1
    : parseFloat(o) - 1 != h.getMonth()
    ? !1
    : !0;
}
function CheckupObj() {
  return isEmpty(document.getElementById('" + txtUsername.ClientID + "'))
    ? (alert('Enter Username!'), !1)
    : isEmpty(document.getElementById('" + txtPassword.ClientID + "'))
    ? (alert('Enter Password!'), !1)
    : isEmpty(document.getElementById('" + txtPasswordConfirm.ClientID + "'))
    ? (alert('Enter Confirm Password!'), !1)
    : document.getElementById('" + txtPassword.ClientID + "').value !=
      document.getElementById('" + txtPasswordConfirm.ClientID + "').value
    ? (alert('Confirm Password does not match to Password!'), !1)
    : !0;
}
function AddFormAction(n) {
  var r = document.getElementById('aspnetForm'),
    t,
    i;
  r != null && (r.action = n);
  t = document.getElementById('FormManageAcct');
  t != null && (t.action = n);
  i = document.getElementById('formagegate');
  i != null && (i.action = n);
}
function IsExistsHTMLTags(n) {
  var t = new RegExp('((<|&alt;)[a-zA-Z]+?)+?');
  return n.match(t) ? !0 : !1;
}
function CheckupEmail(n, t) {
  var i = new RegExp(
    '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
  );
  return n.match(i)
    ? !0
    : (t != ''
        ? alert('Enter correct "' + t + '"!')
        : alert('Please check the email format.'),
      !1);
}
function IsEmailOk(n) {
  var t = new RegExp(
    '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
  );
  return n.match(t) ? !0 : !1;
}
function IsCorrectEmail(n) {
  var t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return t.test(n) ? !0 : !1;
}
function IsValueInDDLOk(n) {
  for (var t = 0; t < n.length; t++)
    if (n[t].selected && n[t].value == '-1') return (n.selectedIndex = 0), !1;
  return !0;
}
function isEmpty(n) {
  return n.value != '' ? !1 : !0;
}
function IsEmptyTextbox(n) {
  return n != '' ? !1 : !0;
}
function IsValidNumber(n) {
  var t = /^\d+$/,
    i = n.match(t);
  return i == null ? !1 : !0;
}
function isCheck(n) {
  return n.checked ? !0 : !1;
}
function getChar(n) {
  return (n.which || n.keyCode) && (n.which == 13 || n.keyCode == 13) ? !0 : !1;
}
function setFocus(n, t) {
  return getChar(t) ? (document.getElementById(n).focus(), !0) : !1;
}
function SetFocus(n) {
  return (
    $('#' + n).keydown(function (t) {
      if (t.keyCode && t.keyCode == 13) return $('#' + n).focus(), !0;
    }),
    !1
  );
}
function CheckAll(n, t) {
  for (
    var i, u = document.getElementById(t), r = 0;
    r < document.forms[0].elements.length;
    r++
  )
    (i = document.forms[0].elements[r]),
      i.name.search(n) > 0 && (alert(i), (i.checked = u.checked ? !0 : !1));
}
function JumpToPage(n) {
  var t = $('select#' + n).val();
  t != '' && (window.location.href = t);
}
function MathRound(n, t) {
  return Math.round(n * Math.pow(10, t)) / Math.pow(10, t);
}
function show_submenu(n, t) {
  $('#' + n).css('visibility', 'visible');
  var i = t;
  $('#' + n + ' a.submenulink').each(function () {
    $(this).width() > i && (i = $(this).width());
  });
  $('#' + n).css('width', i);
}
function hide_submenu(n) {
  $('#' + n).css('visibility', 'hidden');
}
function LoadArticles(n, t, i, r, u) {
  return (
    $(n).val().length > 0
      ? ($('#' + r).click(function () {
          $(this).hide();
          $('#' + t).empty();
          $('#' + t).hide();
          $(n).val('Search!');
        }),
        $.ajax({
          type: 'GET',
          url: i + 'handler.aspx?action=searcharticle&kw=' + $(n).val(),
          beforeSend: function (n, t, i) {
            $('#' + u).show();
          },
          success: function (n) {
            $('#' + u).hide();
            $('#' + t).show();
            $('#' + t).html(n);
            $('#' + r).show();
          },
        }))
      : ($('#' + r).hide(), $('#' + u).hide(), $('#' + t).hide()),
    !1
  );
}
function hasNumbers(n) {
  for (var i = !1, t = 0; t < n.length; t++) isNaN(n.charAt(t)) || (i = !0);
  return i;
}
function isNumeric(n) {
  for (var i = !0, t = 0; t < n.length; t++) isNaN(n.charAt(t)) && (i = !1);
  return i;
}
function isAlpha(n) {
  for (var i = !0, t = 0; t < n.length; t++)
    (n.charAt(t) < 'A' || n.charAt(t) > 'z') && (i = !1);
  return i;
}
function isAlphaAndNumeric(n) {
  for (var i = !0, t = 0; t < n.length; t++)
    hasNumbers(n.charAt(t)) || isAlpha(n.charAt(t)) || (i = !1);
  return i;
}
function trimSpaces(n) {
  for (var i = '', t = 0; t < n.length; t++)
    n.charAt(t) != ' ' && (i += n.charAt(t));
  return i;
}
function isValidPartialPostcode(n) {
  var i = !1,
    t = trimSpaces('' + n);
  return (
    (t.length == 2 || t.length == 5) &&
      isAlpha(t.charAt(0)) &&
      isNumeric(t.charAt(1)) &&
      (i = !0),
    (t.length == 3 || t.length == 6) &&
      ((isAlpha(t.charAt(0)) &&
        isNumeric(t.charAt(1)) &&
        isNumeric(t.charAt(2))) ||
        (isAlpha(t.charAt(0)) &&
          isAlpha(t.charAt(1)) &&
          isNumeric(t.charAt(2))) ||
        (isAlpha(t.charAt(0)) &&
          isNumeric(t.charAt(1)) &&
          isAlpha(t.charAt(2)))) &&
      (i = !0),
    (t.length == 4 || t.length == 7) &&
      ((isAlpha(t.charAt(0)) &&
        isAlpha(t.charAt(1)) &&
        isNumeric(t.charAt(2)) &&
        isNumeric(t.charAt(3))) ||
        (isAlpha(t.charAt(0)) &&
          isAlpha(t.charAt(1)) &&
          isNumeric(t.charAt(2)) &&
          isAlpha(t.charAt(3)))) &&
      (i = !0),
    i
  );
}
function arrayContainsElement(n, t) {
  for (var i = 0; i < n.length; i++) if (n[i] == t) return !0;
  return !1;
}
function hasCIKMOV(n) {
  for (var i = !1, t = 0; t < n.length; t++)
    arrayContainsElement(
      hasCIKMOV.arguments,
      hasCIKMOV.arguments[0].charAt(t)
    ) && (i = !0);
  return i;
}
function validatePostcode(n) {
  var i = !0,
    t = trimSpaces('' + n);
  if (t == '') return;
  else
    isAlphaAndNumeric(t) || t == ''
      ? t.length < 2 || t.length > 7
        ? (alert('Please enter a postcode length between 2 - 7 characters'),
          (i = !1))
        : hasCIKMOV(
            t.substring(t.length, t.length - 2).toLowerCase(),
            'c',
            'i',
            'k',
            'm',
            'o',
            'v'
          )
        ? (alert('Please enter a valid postcode'), (i = !1))
        : isValidPartialPostcode(n)
        ? !(t.length > 4) ||
          (isAlpha(t.charAt(0)) &&
            isAlpha(t.charAt(t.length - 1)) &&
            isAlpha(t.charAt(t.length - 2)) &&
            isNumeric(t.charAt(t.length - 3))) ||
          (alert('Please enter a valid postcode'), (i = !1))
        : (alert('Please enter a valid postcode'), (i = !1))
      : (alert('Please enter a valid postcode (letters and numbers only)'),
        (i = !1));
  return i;
}
(function (n, t) {
  typeof module == 'object' && typeof module.exports == 'object'
    ? (module.exports = n.document
        ? t(n, !0)
        : function (n) {
            if (!n.document)
              throw new Error('jQuery requires a window with a document');
            return t(n);
          })
    : t(n);
})(typeof window != 'undefined' ? window : this, function (n, t) {
  function ii(n) {
    var t = !!n && 'length' in n && n.length,
      r = i.type(n);
    return r === 'function' || i.isWindow(n)
      ? !1
      : r === 'array' ||
          t === 0 ||
          (typeof t == 'number' && t > 0 && t - 1 in n);
  }
  function ri(n, t, r) {
    if (i.isFunction(t))
      return i.grep(n, function (n, i) {
        return !!t.call(n, i, n) !== r;
      });
    if (t.nodeType)
      return i.grep(n, function (n) {
        return (n === t) !== r;
      });
    if (typeof t == 'string') {
      if (bf.test(t)) return i.filter(t, n, r);
      t = i.filter(t, n);
    }
    return i.grep(n, function (n) {
      return lt.call(t, n) > -1 !== r;
    });
  }
  function hr(n, t) {
    while ((n = n[t]) && n.nodeType !== 1);
    return n;
  }
  function kf(n) {
    var t = {};
    return (
      i.each(n.match(h) || [], function (n, i) {
        t[i] = !0;
      }),
      t
    );
  }
  function yt() {
    u.removeEventListener('DOMContentLoaded', yt);
    n.removeEventListener('load', yt);
    i.ready();
  }
  function et() {
    this.expando = i.expando + et.uid++;
  }
  function lr(n, t, r) {
    var u;
    if (r === undefined && n.nodeType === 1)
      if (
        ((u = 'data-' + t.replace(cr, '-$&').toLowerCase()),
        (r = n.getAttribute(u)),
        typeof r == 'string')
      ) {
        try {
          r =
            r === 'true'
              ? !0
              : r === 'false'
              ? !1
              : r === 'null'
              ? null
              : +r + '' === r
              ? +r
              : df.test(r)
              ? i.parseJSON(r)
              : r;
        } catch (f) {}
        e.set(n, t, r);
      } else r = undefined;
    return r;
  }
  function vr(n, t, r, u) {
    var h,
      e = 1,
      l = 20,
      c = u
        ? function () {
            return u.cur();
          }
        : function () {
            return i.css(n, t, '');
          },
      s = c(),
      o = (r && r[3]) || (i.cssNumber[t] ? '' : 'px'),
      f = (i.cssNumber[t] || (o !== 'px' && +s)) && ot.exec(i.css(n, t));
    if (f && f[3] !== o) {
      o = o || f[3];
      r = r || [];
      f = +s || 1;
      do (e = e || '.5'), (f = f / e), i.style(n, t, f + o);
      while (e !== (e = c() / s) && e !== 1 && --l);
    }
    return (
      r &&
        ((f = +f || +s || 0),
        (h = r[1] ? f + (r[1] + 1) * r[2] : +r[2]),
        u && ((u.unit = o), (u.start = f), (u.end = h))),
      h
    );
  }
  function o(n, t) {
    var r =
      typeof n.getElementsByTagName != 'undefined'
        ? n.getElementsByTagName(t || '*')
        : typeof n.querySelectorAll != 'undefined'
        ? n.querySelectorAll(t || '*')
        : [];
    return t === undefined || (t && i.nodeName(n, t)) ? i.merge([n], r) : r;
  }
  function ui(n, t) {
    for (var i = 0, u = n.length; i < u; i++)
      r.set(n[i], 'globalEval', !t || r.get(t[i], 'globalEval'));
  }
  function kr(n, t, r, u, f) {
    for (
      var e,
        s,
        p,
        a,
        w,
        v,
        h = t.createDocumentFragment(),
        y = [],
        l = 0,
        b = n.length;
      l < b;
      l++
    )
      if (((e = n[l]), e || e === 0))
        if (i.type(e) === 'object') i.merge(y, e.nodeType ? [e] : e);
        else if (br.test(e)) {
          for (
            s = s || h.appendChild(t.createElement('div')),
              p = (pr.exec(e) || ['', ''])[1].toLowerCase(),
              a = c[p] || c._default,
              s.innerHTML = a[1] + i.htmlPrefilter(e) + a[2],
              v = a[0];
            v--;

          )
            s = s.lastChild;
          i.merge(y, s.childNodes);
          s = h.firstChild;
          s.textContent = '';
        } else y.push(t.createTextNode(e));
    for (h.textContent = '', l = 0; (e = y[l++]); ) {
      if (u && i.inArray(e, u) > -1) {
        f && f.push(e);
        continue;
      }
      if (
        ((w = i.contains(e.ownerDocument, e)),
        (s = o(h.appendChild(e), 'script')),
        w && ui(s),
        r)
      )
        for (v = 0; (e = s[v++]); ) wr.test(e.type || '') && r.push(e);
    }
    return h;
  }
  function pt() {
    return !0;
  }
  function nt() {
    return !1;
  }
  function gr() {
    try {
      return u.activeElement;
    } catch (n) {}
  }
  function fi(n, t, r, u, f, e) {
    var o, s;
    if (typeof t == 'object') {
      typeof r != 'string' && ((u = u || r), (r = undefined));
      for (s in t) fi(n, s, r, u, t[s], e);
      return n;
    }
    if (
      (u == null && f == null
        ? ((f = r), (u = r = undefined))
        : f == null &&
          (typeof r == 'string'
            ? ((f = u), (u = undefined))
            : ((f = u), (u = r), (r = undefined))),
      f === !1)
    )
      f = nt;
    else if (!f) return n;
    return (
      e === 1 &&
        ((o = f),
        (f = function (n) {
          return i().off(n), o.apply(this, arguments);
        }),
        (f.guid = o.guid || (o.guid = i.guid++))),
      n.each(function () {
        i.event.add(this, t, f, u, r);
      })
    );
  }
  function nu(n, t) {
    return i.nodeName(n, 'table') &&
      i.nodeName(t.nodeType !== 11 ? t : t.firstChild, 'tr')
      ? n.getElementsByTagName('tbody')[0] ||
          n.appendChild(n.ownerDocument.createElement('tbody'))
      : n;
  }
  function ee(n) {
    return (n.type = (n.getAttribute('type') !== null) + '/' + n.type), n;
  }
  function oe(n) {
    var t = ue.exec(n.type);
    return t ? (n.type = t[1]) : n.removeAttribute('type'), n;
  }
  function tu(n, t) {
    var f, c, o, s, h, l, a, u;
    if (t.nodeType === 1) {
      if (
        r.hasData(n) &&
        ((s = r.access(n)), (h = r.set(t, s)), (u = s.events), u)
      ) {
        delete h.handle;
        h.events = {};
        for (o in u)
          for (f = 0, c = u[o].length; f < c; f++) i.event.add(t, o, u[o][f]);
      }
      e.hasData(n) && ((l = e.access(n)), (a = i.extend({}, l)), e.set(t, a));
    }
  }
  function se(n, t) {
    var i = t.nodeName.toLowerCase();
    i === 'input' && yr.test(n.type)
      ? (t.checked = n.checked)
      : (i === 'input' || i === 'textarea') &&
        (t.defaultValue = n.defaultValue);
  }
  function b(n, t, u, e) {
    t = gi.apply([], t);
    var l,
      p,
      c,
      a,
      s,
      w,
      h = 0,
      v = n.length,
      d = v - 1,
      y = t[0],
      k = i.isFunction(y);
    if (k || (v > 1 && typeof y == 'string' && !f.checkClone && re.test(y)))
      return n.each(function (i) {
        var r = n.eq(i);
        k && (t[0] = y.call(this, i, r.html()));
        b(r, t, u, e);
      });
    if (
      v &&
      ((l = kr(t, n[0].ownerDocument, !1, n, e)),
      (p = l.firstChild),
      l.childNodes.length === 1 && (l = p),
      p || e)
    ) {
      for (c = i.map(o(l, 'script'), ee), a = c.length; h < v; h++)
        (s = l),
          h !== d &&
            ((s = i.clone(s, !0, !0)), a && i.merge(c, o(s, 'script'))),
          u.call(n[h], s, h);
      if (a)
        for (w = c[c.length - 1].ownerDocument, i.map(c, oe), h = 0; h < a; h++)
          (s = c[h]),
            wr.test(s.type || '') &&
              !r.access(s, 'globalEval') &&
              i.contains(w, s) &&
              (s.src
                ? i._evalUrl && i._evalUrl(s.src)
                : i.globalEval(s.textContent.replace(fe, '')));
    }
    return n;
  }
  function iu(n, t, r) {
    for (var u, e = t ? i.filter(t, n) : n, f = 0; (u = e[f]) != null; f++)
      r || u.nodeType !== 1 || i.cleanData(o(u)),
        u.parentNode &&
          (r && i.contains(u.ownerDocument, u) && ui(o(u, 'script')),
          u.parentNode.removeChild(u));
    return n;
  }
  function ru(n, t) {
    var r = i(t.createElement(n)).appendTo(t.body),
      u = i.css(r[0], 'display');
    return r.detach(), u;
  }
  function oi(n) {
    var r = u,
      t = ei[n];
    return (
      t ||
        ((t = ru(n, r)),
        (t !== 'none' && t) ||
          ((wt = (
            wt || i("<iframe frameborder='0' width='0' height='0'/>")
          ).appendTo(r.documentElement)),
          (r = wt[0].contentDocument),
          r.write(),
          r.close(),
          (t = ru(n, r)),
          wt.detach()),
        (ei[n] = t)),
      t
    );
  }
  function tt(n, t, r) {
    var o,
      s,
      h,
      u,
      e = n.style;
    return (
      (r = r || bt(n)),
      (u = r ? r.getPropertyValue(t) || r[t] : undefined),
      (u !== '' && u !== undefined) ||
        i.contains(n.ownerDocument, n) ||
        (u = i.style(n, t)),
      r &&
        !f.pixelMarginRight() &&
        si.test(u) &&
        uu.test(t) &&
        ((o = e.width),
        (s = e.minWidth),
        (h = e.maxWidth),
        (e.minWidth = e.maxWidth = e.width = u),
        (u = r.width),
        (e.width = o),
        (e.minWidth = s),
        (e.maxWidth = h)),
      u !== undefined ? u + '' : u
    );
  }
  function ci(n, t) {
    return {
      get: function () {
        if (n()) {
          delete this.get;
          return;
        }
        return (this.get = t).apply(this, arguments);
      },
    };
  }
  function su(n) {
    if (n in ou) return n;
    for (var i = n[0].toUpperCase() + n.slice(1), t = eu.length; t--; )
      if (((n = eu[t] + i), n in ou)) return n;
  }
  function hu(n, t, i) {
    var r = ot.exec(t);
    return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || 'px') : t;
  }
  function cu(n, t, r, u, f) {
    for (
      var e = r === (u ? 'border' : 'content') ? 4 : t === 'width' ? 1 : 0,
        o = 0;
      e < 4;
      e += 2
    )
      r === 'margin' && (o += i.css(n, r + w[e], !0, f)),
        u
          ? (r === 'content' && (o -= i.css(n, 'padding' + w[e], !0, f)),
            r !== 'margin' && (o -= i.css(n, 'border' + w[e] + 'Width', !0, f)))
          : ((o += i.css(n, 'padding' + w[e], !0, f)),
            r !== 'padding' &&
              (o += i.css(n, 'border' + w[e] + 'Width', !0, f)));
    return o;
  }
  function lu(n, t, r) {
    var o = !0,
      u = t === 'width' ? n.offsetWidth : n.offsetHeight,
      e = bt(n),
      s = i.css(n, 'boxSizing', !1, e) === 'border-box';
    if (u <= 0 || u == null) {
      if (
        ((u = tt(n, t, e)),
        (u < 0 || u == null) && (u = n.style[t]),
        si.test(u))
      )
        return u;
      o = s && (f.boxSizingReliable() || u === n.style[t]);
      u = parseFloat(u) || 0;
    }
    return u + cu(n, t, r || (s ? 'border' : 'content'), o, e) + 'px';
  }
  function au(n, t) {
    for (var e, u, s, o = [], f = 0, h = n.length; f < h; f++)
      ((u = n[f]), u.style) &&
        ((o[f] = r.get(u, 'olddisplay')),
        (e = u.style.display),
        t
          ? (o[f] || e !== 'none' || (u.style.display = ''),
            u.style.display === '' &&
              st(u) &&
              (o[f] = r.access(u, 'olddisplay', oi(u.nodeName))))
          : ((s = st(u)),
            (e === 'none' && s) ||
              r.set(u, 'olddisplay', s ? e : i.css(u, 'display'))));
    for (f = 0; f < h; f++)
      ((u = n[f]), u.style) &&
        ((t && u.style.display !== 'none' && u.style.display !== '') ||
          (u.style.display = t ? o[f] || '' : 'none'));
    return n;
  }
  function s(n, t, i, r, u) {
    return new s.prototype.init(n, t, i, r, u);
  }
  function pu() {
    return (
      n.setTimeout(function () {
        it = undefined;
      }),
      (it = i.now())
    );
  }
  function dt(n, t) {
    var r,
      u = 0,
      i = { height: n };
    for (t = t ? 1 : 0; u < 4; u += 2 - t)
      (r = w[u]), (i['margin' + r] = i['padding' + r] = n);
    return t && (i.opacity = i.width = n), i;
  }
  function wu(n, t, i) {
    for (
      var u,
        f = (l.tweeners[t] || []).concat(l.tweeners['*']),
        r = 0,
        e = f.length;
      r < e;
      r++
    )
      if ((u = f[r].call(i, t, n))) return u;
  }
  function le(n, t, u) {
    var f,
      a,
      p,
      v,
      o,
      w,
      h,
      b,
      l = this,
      y = {},
      s = n.style,
      c = n.nodeType && st(n),
      e = r.get(n, 'fxshow');
    u.queue ||
      ((o = i._queueHooks(n, 'fx')),
      o.unqueued == null &&
        ((o.unqueued = 0),
        (w = o.empty.fire),
        (o.empty.fire = function () {
          o.unqueued || w();
        })),
      o.unqueued++,
      l.always(function () {
        l.always(function () {
          o.unqueued--;
          i.queue(n, 'fx').length || o.empty.fire();
        });
      }));
    n.nodeType === 1 &&
      ('height' in t || 'width' in t) &&
      ((u.overflow = [s.overflow, s.overflowX, s.overflowY]),
      (h = i.css(n, 'display')),
      (b = h === 'none' ? r.get(n, 'olddisplay') || oi(n.nodeName) : h),
      b === 'inline' &&
        i.css(n, 'float') === 'none' &&
        (s.display = 'inline-block'));
    u.overflow &&
      ((s.overflow = 'hidden'),
      l.always(function () {
        s.overflow = u.overflow[0];
        s.overflowX = u.overflow[1];
        s.overflowY = u.overflow[2];
      }));
    for (f in t)
      if (((a = t[f]), vu.exec(a))) {
        if (
          (delete t[f], (p = p || a === 'toggle'), a === (c ? 'hide' : 'show'))
        )
          if (a === 'show' && e && e[f] !== undefined) c = !0;
          else continue;
        y[f] = (e && e[f]) || i.style(n, f);
      } else h = undefined;
    if (i.isEmptyObject(y))
      (h === 'none' ? oi(n.nodeName) : h) === 'inline' && (s.display = h);
    else {
      e ? 'hidden' in e && (c = e.hidden) : (e = r.access(n, 'fxshow', {}));
      p && (e.hidden = !c);
      c
        ? i(n).show()
        : l.done(function () {
            i(n).hide();
          });
      l.done(function () {
        var t;
        r.remove(n, 'fxshow');
        for (t in y) i.style(n, t, y[t]);
      });
      for (f in y)
        (v = wu(c ? e[f] : 0, f, l)),
          f in e ||
            ((e[f] = v.start),
            c &&
              ((v.end = v.start),
              (v.start = f === 'width' || f === 'height' ? 1 : 0)));
    }
  }
  function ae(n, t) {
    var r, f, e, u, o;
    for (r in n)
      if (
        ((f = i.camelCase(r)),
        (e = t[f]),
        (u = n[r]),
        i.isArray(u) && ((e = u[1]), (u = n[r] = u[0])),
        r !== f && ((n[f] = u), delete n[r]),
        (o = i.cssHooks[f]),
        o && 'expand' in o)
      ) {
        u = o.expand(u);
        delete n[f];
        for (r in u) r in n || ((n[r] = u[r]), (t[r] = e));
      } else t[f] = e;
  }
  function l(n, t, r) {
    var f,
      o,
      s = 0,
      a = l.prefilters.length,
      e = i.Deferred().always(function () {
        delete c.elem;
      }),
      c = function () {
        if (o) return !1;
        for (
          var s = it || pu(),
            t = Math.max(0, u.startTime + u.duration - s),
            h = t / u.duration || 0,
            i = 1 - h,
            r = 0,
            f = u.tweens.length;
          r < f;
          r++
        )
          u.tweens[r].run(i);
        return (
          e.notifyWith(n, [u, i, t]),
          i < 1 && f ? t : (e.resolveWith(n, [u]), !1)
        );
      },
      u = e.promise({
        elem: n,
        props: i.extend({}, t),
        opts: i.extend(!0, { specialEasing: {}, easing: i.easing._default }, r),
        originalProperties: t,
        originalOptions: r,
        startTime: it || pu(),
        duration: r.duration,
        tweens: [],
        createTween: function (t, r) {
          var f = i.Tween(
            n,
            u.opts,
            t,
            r,
            u.opts.specialEasing[t] || u.opts.easing
          );
          return u.tweens.push(f), f;
        },
        stop: function (t) {
          var i = 0,
            r = t ? u.tweens.length : 0;
          if (o) return this;
          for (o = !0; i < r; i++) u.tweens[i].run(1);
          return (
            t
              ? (e.notifyWith(n, [u, 1, 0]), e.resolveWith(n, [u, t]))
              : e.rejectWith(n, [u, t]),
            this
          );
        },
      }),
      h = u.props;
    for (ae(h, u.opts.specialEasing); s < a; s++)
      if (((f = l.prefilters[s].call(u, n, h, u.opts)), f))
        return (
          i.isFunction(f.stop) &&
            (i._queueHooks(u.elem, u.opts.queue).stop = i.proxy(f.stop, f)),
          f
        );
    return (
      i.map(h, wu, u),
      i.isFunction(u.opts.start) && u.opts.start.call(n, u),
      i.fx.timer(i.extend(c, { elem: n, anim: u, queue: u.opts.queue })),
      u
        .progress(u.opts.progress)
        .done(u.opts.done, u.opts.complete)
        .fail(u.opts.fail)
        .always(u.opts.always)
    );
  }
  function k(n) {
    return (n.getAttribute && n.getAttribute('class')) || '';
  }
  function ff(n) {
    return function (t, r) {
      typeof t != 'string' && ((r = t), (t = '*'));
      var u,
        f = 0,
        e = t.toLowerCase().match(h) || [];
      if (i.isFunction(r))
        while ((u = e[f++]))
          u[0] === '+'
            ? ((u = u.slice(1) || '*'), (n[u] = n[u] || []).unshift(r))
            : (n[u] = n[u] || []).push(r);
    };
  }
  function ef(n, t, r, u) {
    function e(s) {
      var h;
      return (
        (f[s] = !0),
        i.each(n[s] || [], function (n, i) {
          var s = i(t, r, u);
          if (typeof s != 'string' || o || f[s]) {
            if (o) return !(h = s);
          } else return t.dataTypes.unshift(s), e(s), !1;
        }),
        h
      );
    }
    var f = {},
      o = n === yi;
    return e(t.dataTypes[0]) || (!f['*'] && e('*'));
  }
  function wi(n, t) {
    var r,
      u,
      f = i.ajaxSettings.flatOptions || {};
    for (r in t) t[r] !== undefined && ((f[r] ? n : u || (u = {}))[r] = t[r]);
    return u && i.extend(!0, n, u), n;
  }
  function ke(n, t, i) {
    for (var e, u, f, o, s = n.contents, r = n.dataTypes; r[0] === '*'; )
      r.shift(),
        e === undefined &&
          (e = n.mimeType || t.getResponseHeader('Content-Type'));
    if (e)
      for (u in s)
        if (s[u] && s[u].test(e)) {
          r.unshift(u);
          break;
        }
    if (r[0] in i) f = r[0];
    else {
      for (u in i) {
        if (!r[0] || n.converters[u + ' ' + r[0]]) {
          f = u;
          break;
        }
        o || (o = u);
      }
      f = f || o;
    }
    if (f) return f !== r[0] && r.unshift(f), i[f];
  }
  function de(n, t, i, r) {
    var h,
      u,
      f,
      s,
      e,
      o = {},
      c = n.dataTypes.slice();
    if (c[1]) for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
    for (u = c.shift(); u; )
      if (
        (n.responseFields[u] && (i[n.responseFields[u]] = t),
        !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)),
        (e = u),
        (u = c.shift()),
        u)
      )
        if (u === '*') u = e;
        else if (e !== '*' && e !== u) {
          if (((f = o[e + ' ' + u] || o['* ' + u]), !f))
            for (h in o)
              if (
                ((s = h.split(' ')),
                s[1] === u && ((f = o[e + ' ' + s[0]] || o['* ' + s[0]]), f))
              ) {
                f === !0
                  ? (f = o[h])
                  : o[h] !== !0 && ((u = s[0]), c.unshift(s[1]));
                break;
              }
          if (f !== !0)
            if (f && n.throws) t = f(t);
            else
              try {
                t = f(t);
              } catch (l) {
                return {
                  state: 'parsererror',
                  error: f ? l : 'No conversion from ' + e + ' to ' + u,
                };
              }
        }
    return { state: 'success', data: t };
  }
  function bi(n, t, r, u) {
    var f;
    if (i.isArray(t))
      i.each(t, function (t, i) {
        r || no.test(n)
          ? u(n, i)
          : bi(
              n + '[' + (typeof i == 'object' && i != null ? t : '') + ']',
              i,
              r,
              u
            );
      });
    else if (r || i.type(t) !== 'object') u(n, t);
    else for (f in t) bi(n + '[' + f + ']', t[f], r, u);
  }
  function hf(n) {
    return i.isWindow(n) ? n : n.nodeType === 9 && n.defaultView;
  }
  var y = [],
    u = n.document,
    v = y.slice,
    gi = y.concat,
    ti = y.push,
    lt = y.indexOf,
    at = {},
    af = at.toString,
    ft = at.hasOwnProperty,
    f = {},
    nr = '2.2.4',
    i = function (n, t) {
      return new i.fn.init(n, t);
    },
    vf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    yf = /^-ms-/,
    pf = /-([\da-z])/gi,
    wf = function (n, t) {
      return t.toUpperCase();
    },
    p,
    ur,
    fr,
    er,
    or,
    sr,
    h,
    vt,
    a,
    g,
    br,
    wt,
    ei,
    it,
    kt,
    vu,
    yu,
    bu,
    rt,
    ku,
    du,
    gt,
    gu,
    nf,
    li,
    sf,
    ut,
    ki,
    ni,
    di,
    cf,
    lf;
  i.fn = i.prototype = {
    jquery: nr,
    constructor: i,
    selector: '',
    length: 0,
    toArray: function () {
      return v.call(this);
    },
    get: function (n) {
      return n != null
        ? n < 0
          ? this[n + this.length]
          : this[n]
        : v.call(this);
    },
    pushStack: function (n) {
      var t = i.merge(this.constructor(), n);
      return (t.prevObject = this), (t.context = this.context), t;
    },
    each: function (n) {
      return i.each(this, n);
    },
    map: function (n) {
      return this.pushStack(
        i.map(this, function (t, i) {
          return n.call(t, i, t);
        })
      );
    },
    slice: function () {
      return this.pushStack(v.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (n) {
      var i = this.length,
        t = +n + (n < 0 ? i : 0);
      return this.pushStack(t >= 0 && t < i ? [this[t]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: ti,
    sort: y.sort,
    splice: y.splice,
  };
  i.extend = i.fn.extend = function () {
    var e,
      f,
      r,
      t,
      o,
      s,
      n = arguments[0] || {},
      u = 1,
      c = arguments.length,
      h = !1;
    for (
      typeof n == 'boolean' && ((h = n), (n = arguments[u] || {}), u++),
        typeof n == 'object' || i.isFunction(n) || (n = {}),
        u === c && ((n = this), u--);
      u < c;
      u++
    )
      if ((e = arguments[u]) != null)
        for (f in e)
          ((r = n[f]), (t = e[f]), n !== t) &&
            (h && t && (i.isPlainObject(t) || (o = i.isArray(t)))
              ? (o
                  ? ((o = !1), (s = r && i.isArray(r) ? r : []))
                  : (s = r && i.isPlainObject(r) ? r : {}),
                (n[f] = i.extend(h, s, t)))
              : t !== undefined && (n[f] = t));
    return n;
  };
  i.extend({
    expando: 'jQuery' + (nr + Math.random()).replace(/\D/g, ''),
    isReady: !0,
    error: function (n) {
      throw new Error(n);
    },
    noop: function () {},
    isFunction: function (n) {
      return i.type(n) === 'function';
    },
    isArray: Array.isArray,
    isWindow: function (n) {
      return n != null && n === n.window;
    },
    isNumeric: function (n) {
      var t = n && n.toString();
      return !i.isArray(n) && t - parseFloat(t) + 1 >= 0;
    },
    isPlainObject: function (n) {
      var t;
      if (
        i.type(n) !== 'object' ||
        n.nodeType ||
        i.isWindow(n) ||
        (n.constructor &&
          !ft.call(n, 'constructor') &&
          !ft.call(n.constructor.prototype || {}, 'isPrototypeOf'))
      )
        return !1;
      for (t in n);
      return t === undefined || ft.call(n, t);
    },
    isEmptyObject: function (n) {
      for (var t in n) return !1;
      return !0;
    },
    type: function (n) {
      return n == null
        ? n + ''
        : typeof n == 'object' || typeof n == 'function'
        ? at[af.call(n)] || 'object'
        : typeof n;
    },
    globalEval: function (n) {
      var t,
        r = eval;
      n = i.trim(n);
      n &&
        (n.indexOf('use strict') === 1
          ? ((t = u.createElement('script')),
            (t.text = n),
            u.head.appendChild(t).parentNode.removeChild(t))
          : r(n));
    },
    camelCase: function (n) {
      return n.replace(yf, 'ms-').replace(pf, wf);
    },
    nodeName: function (n, t) {
      return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase();
    },
    each: function (n, t) {
      var r,
        i = 0;
      if (ii(n)) {
        for (r = n.length; i < r; i++) if (t.call(n[i], i, n[i]) === !1) break;
      } else for (i in n) if (t.call(n[i], i, n[i]) === !1) break;
      return n;
    },
    trim: function (n) {
      return n == null ? '' : (n + '').replace(vf, '');
    },
    makeArray: function (n, t) {
      var r = t || [];
      return (
        n != null &&
          (ii(Object(n))
            ? i.merge(r, typeof n == 'string' ? [n] : n)
            : ti.call(r, n)),
        r
      );
    },
    inArray: function (n, t, i) {
      return t == null ? -1 : lt.call(t, n, i);
    },
    merge: function (n, t) {
      for (var u = +t.length, i = 0, r = n.length; i < u; i++) n[r++] = t[i];
      return (n.length = r), n;
    },
    grep: function (n, t, i) {
      for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++)
        (u = !t(n[r], r)), u !== o && f.push(n[r]);
      return f;
    },
    map: function (n, t, i) {
      var e,
        u,
        r = 0,
        f = [];
      if (ii(n))
        for (e = n.length; r < e; r++)
          (u = t(n[r], r, i)), u != null && f.push(u);
      else for (r in n) (u = t(n[r], r, i)), u != null && f.push(u);
      return gi.apply([], f);
    },
    guid: 1,
    proxy: function (n, t) {
      var u, f, r;
      return (typeof t == 'string' && ((u = n[t]), (t = n), (n = u)),
      !i.isFunction(n))
        ? undefined
        : ((f = v.call(arguments, 2)),
          (r = function () {
            return n.apply(t || this, f.concat(v.call(arguments)));
          }),
          (r.guid = n.guid = n.guid || i.guid++),
          r);
    },
    now: Date.now,
    support: f,
  });
  typeof Symbol == 'function' && (i.fn[Symbol.iterator] = y[Symbol.iterator]);
  i.each(
    'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
      ' '
    ),
    function (n, t) {
      at['[object ' + t + ']'] = t.toLowerCase();
    }
  );
  p = (function (n) {
    function u(n, t, r, u) {
      var l,
        w,
        a,
        s,
        nt,
        d,
        y,
        g,
        p = t && t.ownerDocument,
        v = t ? t.nodeType : 9;
      if (
        ((r = r || []),
        typeof n != 'string' || !n || (v !== 1 && v !== 9 && v !== 11))
      )
        return r;
      if (
        !u &&
        ((t ? t.ownerDocument || t : c) !== i && b(t), (t = t || i), h)
      ) {
        if (v !== 11 && (d = sr.exec(n)))
          if ((l = d[1])) {
            if (v === 9)
              if ((a = t.getElementById(l))) {
                if (a.id === l) return r.push(a), r;
              } else return r;
            else if (p && (a = p.getElementById(l)) && et(t, a) && a.id === l)
              return r.push(a), r;
          } else if (d[2]) return k.apply(r, t.getElementsByTagName(n)), r;
          else if (
            (l = d[3]) &&
            f.getElementsByClassName &&
            t.getElementsByClassName
          )
            return k.apply(r, t.getElementsByClassName(l)), r;
        if (f.qsa && !lt[n + ' '] && (!o || !o.test(n))) {
          if (v !== 1) (p = t), (g = n);
          else if (t.nodeName.toLowerCase() !== 'object') {
            for (
              (s = t.getAttribute('id'))
                ? (s = s.replace(hr, '\\$&'))
                : t.setAttribute('id', (s = e)),
                y = ft(n),
                w = y.length,
                nt = yi.test(s) ? '#' + s : "[id='" + s + "']";
              w--;

            )
              y[w] = nt + ' ' + yt(y[w]);
            g = y.join(',');
            p = (gt.test(n) && ii(t.parentNode)) || t;
          }
          if (g)
            try {
              return k.apply(r, p.querySelectorAll(g)), r;
            } catch (tt) {
            } finally {
              s === e && t.removeAttribute('id');
            }
        }
      }
      return si(n.replace(at, '$1'), t, r, u);
    }
    function ni() {
      function n(r, u) {
        return (
          i.push(r + ' ') > t.cacheLength && delete n[i.shift()],
          (n[r + ' '] = u)
        );
      }
      var i = [];
      return n;
    }
    function l(n) {
      return (n[e] = !0), n;
    }
    function a(n) {
      var t = i.createElement('div');
      try {
        return !!n(t);
      } catch (r) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t);
        t = null;
      }
    }
    function ti(n, i) {
      for (var r = n.split('|'), u = r.length; u--; ) t.attrHandle[r[u]] = i;
    }
    function wi(n, t) {
      var i = t && n,
        r =
          i &&
          n.nodeType === 1 &&
          t.nodeType === 1 &&
          (~t.sourceIndex || li) - (~n.sourceIndex || li);
      if (r) return r;
      if (i) while ((i = i.nextSibling)) if (i === t) return -1;
      return n ? 1 : -1;
    }
    function cr(n) {
      return function (t) {
        var i = t.nodeName.toLowerCase();
        return i === 'input' && t.type === n;
      };
    }
    function lr(n) {
      return function (t) {
        var i = t.nodeName.toLowerCase();
        return (i === 'input' || i === 'button') && t.type === n;
      };
    }
    function it(n) {
      return l(function (t) {
        return (
          (t = +t),
          l(function (i, r) {
            for (var u, f = n([], i.length, t), e = f.length; e--; )
              i[(u = f[e])] && (i[u] = !(r[u] = i[u]));
          })
        );
      });
    }
    function ii(n) {
      return n && typeof n.getElementsByTagName != 'undefined' && n;
    }
    function bi() {}
    function yt(n) {
      for (var t = 0, r = n.length, i = ''; t < r; t++) i += n[t].value;
      return i;
    }
    function ri(n, t, i) {
      var r = t.dir,
        u = i && r === 'parentNode',
        f = ki++;
      return t.first
        ? function (t, i, f) {
            while ((t = t[r])) if (t.nodeType === 1 || u) return n(t, i, f);
          }
        : function (t, i, o) {
            var s,
              h,
              c,
              l = [v, f];
            if (o) {
              while ((t = t[r]))
                if ((t.nodeType === 1 || u) && n(t, i, o)) return !0;
            } else
              while ((t = t[r]))
                if (t.nodeType === 1 || u)
                  if (
                    ((c = t[e] || (t[e] = {})),
                    (h = c[t.uniqueID] || (c[t.uniqueID] = {})),
                    (s = h[r]) && s[0] === v && s[1] === f)
                  )
                    return (l[2] = s[2]);
                  else if (((h[r] = l), (l[2] = n(t, i, o)))) return !0;
          };
    }
    function ui(n) {
      return n.length > 1
        ? function (t, i, r) {
            for (var u = n.length; u--; ) if (!n[u](t, i, r)) return !1;
            return !0;
          }
        : n[0];
    }
    function ar(n, t, i) {
      for (var r = 0, f = t.length; r < f; r++) u(n, t[r], i);
      return i;
    }
    function pt(n, t, i, r, u) {
      for (var e, o = [], f = 0, s = n.length, h = t != null; f < s; f++)
        (e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
      return o;
    }
    function fi(n, t, i, r, u, f) {
      return (
        r && !r[e] && (r = fi(r)),
        u && !u[e] && (u = fi(u, f)),
        l(function (f, e, o, s) {
          var l,
            c,
            a,
            p = [],
            y = [],
            w = e.length,
            b = f || ar(t || '*', o.nodeType ? [o] : o, []),
            v = n && (f || !t) ? pt(b, p, n, o, s) : b,
            h = i ? (u || (f ? n : w || r) ? [] : e) : v;
          if ((i && i(v, h, o, s), r))
            for (l = pt(h, y), r(l, [], o, s), c = l.length; c--; )
              (a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
          if (f) {
            if (u || n) {
              if (u) {
                for (l = [], c = h.length; c--; )
                  (a = h[c]) && l.push((v[c] = a));
                u(null, (h = []), l, s);
              }
              for (c = h.length; c--; )
                (a = h[c]) &&
                  (l = u ? nt(f, a) : p[c]) > -1 &&
                  (f[l] = !(e[l] = a));
            }
          } else (h = pt(h === e ? h.splice(w, h.length) : h)), u ? u(null, e, h, s) : k.apply(e, h);
        })
      );
    }
    function ei(n) {
      for (
        var o,
          u,
          r,
          s = n.length,
          h = t.relative[n[0].type],
          c = h || t.relative[' '],
          i = h ? 1 : 0,
          l = ri(
            function (n) {
              return n === o;
            },
            c,
            !0
          ),
          a = ri(
            function (n) {
              return nt(o, n) > -1;
            },
            c,
            !0
          ),
          f = [
            function (n, t, i) {
              var r =
                (!h && (i || t !== ht)) ||
                ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
              return (o = null), r;
            },
          ];
        i < s;
        i++
      )
        if ((u = t.relative[n[i].type])) f = [ri(ui(f), u)];
        else {
          if (((u = t.filter[n[i].type].apply(null, n[i].matches)), u[e])) {
            for (r = ++i; r < s; r++) if (t.relative[n[r].type]) break;
            return fi(
              i > 1 && ui(f),
              i > 1 &&
                yt(
                  n
                    .slice(0, i - 1)
                    .concat({ value: n[i - 2].type === ' ' ? '*' : '' })
                ).replace(at, '$1'),
              u,
              i < r && ei(n.slice(i, r)),
              r < s && ei((n = n.slice(r))),
              r < s && yt(n)
            );
          }
          f.push(u);
        }
      return ui(f);
    }
    function vr(n, r) {
      var f = r.length > 0,
        e = n.length > 0,
        o = function (o, s, c, l, a) {
          var y,
            nt,
            d,
            g = 0,
            p = '0',
            tt = o && [],
            w = [],
            it = ht,
            rt = o || (e && t.find.TAG('*', a)),
            ut = (v += it == null ? 1 : Math.random() || 0.1),
            ft = rt.length;
          for (
            a && (ht = s === i || s || a);
            p !== ft && (y = rt[p]) != null;
            p++
          ) {
            if (e && y) {
              for (
                nt = 0, s || y.ownerDocument === i || (b(y), (c = !h));
                (d = n[nt++]);

              )
                if (d(y, s || i, c)) {
                  l.push(y);
                  break;
                }
              a && (v = ut);
            }
            f && ((y = !d && y) && g--, o && tt.push(y));
          }
          if (((g += p), f && p !== g)) {
            for (nt = 0; (d = r[nt++]); ) d(tt, w, s, c);
            if (o) {
              if (g > 0) while (p--) tt[p] || w[p] || (w[p] = gi.call(l));
              w = pt(w);
            }
            k.apply(l, w);
            a && !o && w.length > 0 && g + r.length > 1 && u.uniqueSort(l);
          }
          return a && ((v = ut), (ht = it)), tt;
        };
      return f ? l(o) : o;
    }
    var rt,
      f,
      t,
      st,
      oi,
      ft,
      wt,
      si,
      ht,
      w,
      ut,
      b,
      i,
      s,
      h,
      o,
      d,
      ct,
      et,
      e = 'sizzle' + 1 * new Date(),
      c = n.document,
      v = 0,
      ki = 0,
      hi = ni(),
      ci = ni(),
      lt = ni(),
      bt = function (n, t) {
        return n === t && (ut = !0), 0;
      },
      li = -2147483648,
      di = {}.hasOwnProperty,
      g = [],
      gi = g.pop,
      nr = g.push,
      k = g.push,
      ai = g.slice,
      nt = function (n, t) {
        for (var i = 0, r = n.length; i < r; i++) if (n[i] === t) return i;
        return -1;
      },
      kt =
        'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      r = '[\\x20\\t\\r\\n\\f]',
      tt = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
      vi =
        '\\[' +
        r +
        '*(' +
        tt +
        ')(?:' +
        r +
        '*([*^$|!~]?=)' +
        r +
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        tt +
        '))|)' +
        r +
        '*\\]',
      dt =
        ':(' +
        tt +
        ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
        vi +
        ')*)|.*)\\)|)',
      tr = new RegExp(r + '+', 'g'),
      at = new RegExp('^' + r + '+|((?:^|[^\\\\])(?:\\\\.)*)' + r + '+$', 'g'),
      ir = new RegExp('^' + r + '*,' + r + '*'),
      rr = new RegExp('^' + r + '*([>+~]|' + r + ')' + r + '*'),
      ur = new RegExp('=' + r + '*([^\\]\'"]*?)' + r + '*\\]', 'g'),
      fr = new RegExp(dt),
      yi = new RegExp('^' + tt + '$'),
      vt = {
        ID: new RegExp('^#(' + tt + ')'),
        CLASS: new RegExp('^\\.(' + tt + ')'),
        TAG: new RegExp('^(' + tt + '|[*])'),
        ATTR: new RegExp('^' + vi),
        PSEUDO: new RegExp('^' + dt),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
            r +
            '*(even|odd|(([+-]|)(\\d*)n|)' +
            r +
            '*(?:([+-]|)' +
            r +
            '*(\\d+)|))' +
            r +
            '*\\)|)',
          'i'
        ),
        bool: new RegExp('^(?:' + kt + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
            r +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            r +
            '*((?:-\\d)?\\d*)' +
            r +
            '*\\)|)(?=[^-]|$)',
          'i'
        ),
      },
      er = /^(?:input|select|textarea|button)$/i,
      or = /^h\d$/i,
      ot = /^[^{]+\{\s*\[native \w/,
      sr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      gt = /[+~]/,
      hr = /'|\\/g,
      y = new RegExp('\\\\([\\da-f]{1,6}' + r + '?|(' + r + ')|.)', 'ig'),
      p = function (n, t, i) {
        var r = '0x' + t - 65536;
        return r !== r || i
          ? t
          : r < 0
          ? String.fromCharCode(r + 65536)
          : String.fromCharCode((r >> 10) | 55296, (r & 1023) | 56320);
      },
      pi = function () {
        b();
      };
    try {
      k.apply((g = ai.call(c.childNodes)), c.childNodes);
      g[c.childNodes.length].nodeType;
    } catch (yr) {
      k = {
        apply: g.length
          ? function (n, t) {
              nr.apply(n, ai.call(t));
            }
          : function (n, t) {
              for (var i = n.length, r = 0; (n[i++] = t[r++]); );
              n.length = i - 1;
            },
      };
    }
    f = u.support = {};
    oi = u.isXML = function (n) {
      var t = n && (n.ownerDocument || n).documentElement;
      return t ? t.nodeName !== 'HTML' : !1;
    };
    b = u.setDocument = function (n) {
      var v,
        u,
        l = n ? n.ownerDocument || n : c;
      return l === i || l.nodeType !== 9 || !l.documentElement
        ? i
        : ((i = l),
          (s = i.documentElement),
          (h = !oi(i)),
          (u = i.defaultView) &&
            u.top !== u &&
            (u.addEventListener
              ? u.addEventListener('unload', pi, !1)
              : u.attachEvent && u.attachEvent('onunload', pi)),
          (f.attributes = a(function (n) {
            return (n.className = 'i'), !n.getAttribute('className');
          })),
          (f.getElementsByTagName = a(function (n) {
            return (
              n.appendChild(i.createComment('')),
              !n.getElementsByTagName('*').length
            );
          })),
          (f.getElementsByClassName = ot.test(i.getElementsByClassName)),
          (f.getById = a(function (n) {
            return (
              (s.appendChild(n).id = e),
              !i.getElementsByName || !i.getElementsByName(e).length
            );
          })),
          f.getById
            ? ((t.find.ID = function (n, t) {
                if (typeof t.getElementById != 'undefined' && h) {
                  var i = t.getElementById(n);
                  return i ? [i] : [];
                }
              }),
              (t.filter.ID = function (n) {
                var t = n.replace(y, p);
                return function (n) {
                  return n.getAttribute('id') === t;
                };
              }))
            : (delete t.find.ID,
              (t.filter.ID = function (n) {
                var t = n.replace(y, p);
                return function (n) {
                  var i =
                    typeof n.getAttributeNode != 'undefined' &&
                    n.getAttributeNode('id');
                  return i && i.value === t;
                };
              })),
          (t.find.TAG = f.getElementsByTagName
            ? function (n, t) {
                if (typeof t.getElementsByTagName != 'undefined')
                  return t.getElementsByTagName(n);
                else if (f.qsa) return t.querySelectorAll(n);
              }
            : function (n, t) {
                var i,
                  r = [],
                  f = 0,
                  u = t.getElementsByTagName(n);
                if (n === '*') {
                  while ((i = u[f++])) i.nodeType === 1 && r.push(i);
                  return r;
                }
                return u;
              }),
          (t.find.CLASS =
            f.getElementsByClassName &&
            function (n, t) {
              if (typeof t.getElementsByClassName != 'undefined' && h)
                return t.getElementsByClassName(n);
            }),
          (d = []),
          (o = []),
          (f.qsa = ot.test(i.querySelectorAll)) &&
            (a(function (n) {
              s.appendChild(n).innerHTML =
                "<a id='" +
                e +
                "'></a><select id='" +
                e +
                "-\r\\' msallowcapture=''><option selected=''></option></select>";
              n.querySelectorAll("[msallowcapture^='']").length &&
                o.push('[*^$]=' + r + '*(?:\'\'|"")');
              n.querySelectorAll('[selected]').length ||
                o.push('\\[' + r + '*(?:value|' + kt + ')');
              n.querySelectorAll('[id~=' + e + '-]').length || o.push('~=');
              n.querySelectorAll(':checked').length || o.push(':checked');
              n.querySelectorAll('a#' + e + '+*').length || o.push('.#.+[+~]');
            }),
            a(function (n) {
              var t = i.createElement('input');
              t.setAttribute('type', 'hidden');
              n.appendChild(t).setAttribute('name', 'D');
              n.querySelectorAll('[name=d]').length &&
                o.push('name' + r + '*[*^$|!~]?=');
              n.querySelectorAll(':enabled').length ||
                o.push(':enabled', ':disabled');
              n.querySelectorAll('*,:x');
              o.push(',.*:');
            })),
          (f.matchesSelector = ot.test(
            (ct =
              s.matches ||
              s.webkitMatchesSelector ||
              s.mozMatchesSelector ||
              s.oMatchesSelector ||
              s.msMatchesSelector)
          )) &&
            a(function (n) {
              f.disconnectedMatch = ct.call(n, 'div');
              ct.call(n, "[s!='']:x");
              d.push('!=', dt);
            }),
          (o = o.length && new RegExp(o.join('|'))),
          (d = d.length && new RegExp(d.join('|'))),
          (v = ot.test(s.compareDocumentPosition)),
          (et =
            v || ot.test(s.contains)
              ? function (n, t) {
                  var r = n.nodeType === 9 ? n.documentElement : n,
                    i = t && t.parentNode;
                  return (
                    n === i ||
                    !!(
                      i &&
                      i.nodeType === 1 &&
                      (r.contains
                        ? r.contains(i)
                        : n.compareDocumentPosition &&
                          n.compareDocumentPosition(i) & 16)
                    )
                  );
                }
              : function (n, t) {
                  if (t) while ((t = t.parentNode)) if (t === n) return !0;
                  return !1;
                }),
          (bt = v
            ? function (n, t) {
                if (n === t) return (ut = !0), 0;
                var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
                return r
                  ? r
                  : ((r =
                      (n.ownerDocument || n) === (t.ownerDocument || t)
                        ? n.compareDocumentPosition(t)
                        : 1),
                    r & 1 ||
                      (!f.sortDetached && t.compareDocumentPosition(n) === r))
                  ? n === i || (n.ownerDocument === c && et(c, n))
                    ? -1
                    : t === i || (t.ownerDocument === c && et(c, t))
                    ? 1
                    : w
                    ? nt(w, n) - nt(w, t)
                    : 0
                  : r & 4
                  ? -1
                  : 1;
              }
            : function (n, t) {
                if (n === t) return (ut = !0), 0;
                var r,
                  u = 0,
                  o = n.parentNode,
                  s = t.parentNode,
                  f = [n],
                  e = [t];
                if (o && s) {
                  if (o === s) return wi(n, t);
                } else
                  return n === i
                    ? -1
                    : t === i
                    ? 1
                    : o
                    ? -1
                    : s
                    ? 1
                    : w
                    ? nt(w, n) - nt(w, t)
                    : 0;
                for (r = n; (r = r.parentNode); ) f.unshift(r);
                for (r = t; (r = r.parentNode); ) e.unshift(r);
                while (f[u] === e[u]) u++;
                return u
                  ? wi(f[u], e[u])
                  : f[u] === c
                  ? -1
                  : e[u] === c
                  ? 1
                  : 0;
              }),
          i);
    };
    u.matches = function (n, t) {
      return u(n, null, null, t);
    };
    u.matchesSelector = function (n, t) {
      if (
        ((n.ownerDocument || n) !== i && b(n),
        (t = t.replace(ur, "='$1']")),
        f.matchesSelector &&
          h &&
          !lt[t + ' '] &&
          (!d || !d.test(t)) &&
          (!o || !o.test(t)))
      )
        try {
          var r = ct.call(n, t);
          if (
            r ||
            f.disconnectedMatch ||
            (n.document && n.document.nodeType !== 11)
          )
            return r;
        } catch (e) {}
      return u(t, i, null, [n]).length > 0;
    };
    u.contains = function (n, t) {
      return (n.ownerDocument || n) !== i && b(n), et(n, t);
    };
    u.attr = function (n, r) {
      (n.ownerDocument || n) !== i && b(n);
      var e = t.attrHandle[r.toLowerCase()],
        u =
          e && di.call(t.attrHandle, r.toLowerCase()) ? e(n, r, !h) : undefined;
      return u !== undefined
        ? u
        : f.attributes || !h
        ? n.getAttribute(r)
        : (u = n.getAttributeNode(r)) && u.specified
        ? u.value
        : null;
    };
    u.error = function (n) {
      throw new Error('Syntax error, unrecognized expression: ' + n);
    };
    u.uniqueSort = function (n) {
      var r,
        u = [],
        t = 0,
        i = 0;
      if (
        ((ut = !f.detectDuplicates),
        (w = !f.sortStable && n.slice(0)),
        n.sort(bt),
        ut)
      ) {
        while ((r = n[i++])) r === n[i] && (t = u.push(i));
        while (t--) n.splice(u[t], 1);
      }
      return (w = null), n;
    };
    st = u.getText = function (n) {
      var r,
        i = '',
        u = 0,
        t = n.nodeType;
      if (t) {
        if (t === 1 || t === 9 || t === 11)
          if (typeof n.textContent == 'string') return n.textContent;
          else for (n = n.firstChild; n; n = n.nextSibling) i += st(n);
        else if (t === 3 || t === 4) return n.nodeValue;
      } else while ((r = n[u++])) i += st(r);
      return i;
    };
    t = u.selectors = {
      cacheLength: 50,
      createPseudo: l,
      match: vt,
      attrHandle: {},
      find: {},
      relative: {
        '>': { dir: 'parentNode', first: !0 },
        ' ': { dir: 'parentNode' },
        '+': { dir: 'previousSibling', first: !0 },
        '~': { dir: 'previousSibling' },
      },
      preFilter: {
        ATTR: function (n) {
          return (
            (n[1] = n[1].replace(y, p)),
            (n[3] = (n[3] || n[4] || n[5] || '').replace(y, p)),
            n[2] === '~=' && (n[3] = ' ' + n[3] + ' '),
            n.slice(0, 4)
          );
        },
        CHILD: function (n) {
          return (
            (n[1] = n[1].toLowerCase()),
            n[1].slice(0, 3) === 'nth'
              ? (n[3] || u.error(n[0]),
                (n[4] = +(n[4]
                  ? n[5] + (n[6] || 1)
                  : 2 * (n[3] === 'even' || n[3] === 'odd'))),
                (n[5] = +(n[7] + n[8] || n[3] === 'odd')))
              : n[3] && u.error(n[0]),
            n
          );
        },
        PSEUDO: function (n) {
          var i,
            t = !n[6] && n[2];
          return vt.CHILD.test(n[0])
            ? null
            : (n[3]
                ? (n[2] = n[4] || n[5] || '')
                : t &&
                  fr.test(t) &&
                  (i = ft(t, !0)) &&
                  (i = t.indexOf(')', t.length - i) - t.length) &&
                  ((n[0] = n[0].slice(0, i)), (n[2] = t.slice(0, i))),
              n.slice(0, 3));
        },
      },
      filter: {
        TAG: function (n) {
          var t = n.replace(y, p).toLowerCase();
          return n === '*'
            ? function () {
                return !0;
              }
            : function (n) {
                return n.nodeName && n.nodeName.toLowerCase() === t;
              };
        },
        CLASS: function (n) {
          var t = hi[n + ' '];
          return (
            t ||
            ((t = new RegExp('(^|' + r + ')' + n + '(' + r + '|$)')) &&
              hi(n, function (n) {
                return t.test(
                  (typeof n.className == 'string' && n.className) ||
                    (typeof n.getAttribute != 'undefined' &&
                      n.getAttribute('class')) ||
                    ''
                );
              }))
          );
        },
        ATTR: function (n, t, i) {
          return function (r) {
            var f = u.attr(r, n);
            return f == null
              ? t === '!='
              : t
              ? ((f += ''),
                t === '='
                  ? f === i
                  : t === '!='
                  ? f !== i
                  : t === '^='
                  ? i && f.indexOf(i) === 0
                  : t === '*='
                  ? i && f.indexOf(i) > -1
                  : t === '$='
                  ? i && f.slice(-i.length) === i
                  : t === '~='
                  ? (' ' + f.replace(tr, ' ') + ' ').indexOf(i) > -1
                  : t === '|='
                  ? f === i || f.slice(0, i.length + 1) === i + '-'
                  : !1)
              : !0;
          };
        },
        CHILD: function (n, t, i, r, u) {
          var s = n.slice(0, 3) !== 'nth',
            o = n.slice(-4) !== 'last',
            f = t === 'of-type';
          return r === 1 && u === 0
            ? function (n) {
                return !!n.parentNode;
              }
            : function (t, i, h) {
                var p,
                  w,
                  y,
                  c,
                  a,
                  b,
                  k = s !== o ? 'nextSibling' : 'previousSibling',
                  d = t.parentNode,
                  nt = f && t.nodeName.toLowerCase(),
                  g = !h && !f,
                  l = !1;
                if (d) {
                  if (s) {
                    while (k) {
                      for (c = t; (c = c[k]); )
                        if (
                          f ? c.nodeName.toLowerCase() === nt : c.nodeType === 1
                        )
                          return !1;
                      b = k = n === 'only' && !b && 'nextSibling';
                    }
                    return !0;
                  }
                  if (((b = [o ? d.firstChild : d.lastChild]), o && g)) {
                    for (
                      c = d,
                        y = c[e] || (c[e] = {}),
                        w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                        p = w[n] || [],
                        a = p[0] === v && p[1],
                        l = a && p[2],
                        c = a && d.childNodes[a];
                      (c = (++a && c && c[k]) || (l = a = 0) || b.pop());

                    )
                      if (c.nodeType === 1 && ++l && c === t) {
                        w[n] = [v, a, l];
                        break;
                      }
                  } else if (
                    (g &&
                      ((c = t),
                      (y = c[e] || (c[e] = {})),
                      (w = y[c.uniqueID] || (y[c.uniqueID] = {})),
                      (p = w[n] || []),
                      (a = p[0] === v && p[1]),
                      (l = a)),
                    l === !1)
                  )
                    while ((c = (++a && c && c[k]) || (l = a = 0) || b.pop()))
                      if (
                        (f
                          ? c.nodeName.toLowerCase() === nt
                          : c.nodeType === 1) &&
                        ++l &&
                        (g &&
                          ((y = c[e] || (c[e] = {})),
                          (w = y[c.uniqueID] || (y[c.uniqueID] = {})),
                          (w[n] = [v, l])),
                        c === t)
                      )
                        break;
                  return (l -= u), l === r || (l % r == 0 && l / r >= 0);
                }
              };
        },
        PSEUDO: function (n, i) {
          var f,
            r =
              t.pseudos[n] ||
              t.setFilters[n.toLowerCase()] ||
              u.error('unsupported pseudo: ' + n);
          return r[e]
            ? r(i)
            : r.length > 1
            ? ((f = [n, n, '', i]),
              t.setFilters.hasOwnProperty(n.toLowerCase())
                ? l(function (n, t) {
                    for (var u, f = r(n, i), e = f.length; e--; )
                      (u = nt(n, f[e])), (n[u] = !(t[u] = f[e]));
                  })
                : function (n) {
                    return r(n, 0, f);
                  })
            : r;
        },
      },
      pseudos: {
        not: l(function (n) {
          var t = [],
            r = [],
            i = wt(n.replace(at, '$1'));
          return i[e]
            ? l(function (n, t, r, u) {
                for (var e, o = i(n, null, u, []), f = n.length; f--; )
                  (e = o[f]) && (n[f] = !(t[f] = e));
              })
            : function (n, u, f) {
                return (t[0] = n), i(t, null, f, r), (t[0] = null), !r.pop();
              };
        }),
        has: l(function (n) {
          return function (t) {
            return u(n, t).length > 0;
          };
        }),
        contains: l(function (n) {
          return (
            (n = n.replace(y, p)),
            function (t) {
              return (t.textContent || t.innerText || st(t)).indexOf(n) > -1;
            }
          );
        }),
        lang: l(function (n) {
          return (
            yi.test(n || '') || u.error('unsupported lang: ' + n),
            (n = n.replace(y, p).toLowerCase()),
            function (t) {
              var i;
              do
                if (
                  (i = h
                    ? t.lang
                    : t.getAttribute('xml:lang') || t.getAttribute('lang'))
                )
                  return (
                    (i = i.toLowerCase()), i === n || i.indexOf(n + '-') === 0
                  );
              while ((t = t.parentNode) && t.nodeType === 1);
              return !1;
            }
          );
        }),
        target: function (t) {
          var i = n.location && n.location.hash;
          return i && i.slice(1) === t.id;
        },
        root: function (n) {
          return n === s;
        },
        focus: function (n) {
          return (
            n === i.activeElement &&
            (!i.hasFocus || i.hasFocus()) &&
            !!(n.type || n.href || ~n.tabIndex)
          );
        },
        enabled: function (n) {
          return n.disabled === !1;
        },
        disabled: function (n) {
          return n.disabled === !0;
        },
        checked: function (n) {
          var t = n.nodeName.toLowerCase();
          return (
            (t === 'input' && !!n.checked) || (t === 'option' && !!n.selected)
          );
        },
        selected: function (n) {
          return n.parentNode && n.parentNode.selectedIndex, n.selected === !0;
        },
        empty: function (n) {
          for (n = n.firstChild; n; n = n.nextSibling)
            if (n.nodeType < 6) return !1;
          return !0;
        },
        parent: function (n) {
          return !t.pseudos.empty(n);
        },
        header: function (n) {
          return or.test(n.nodeName);
        },
        input: function (n) {
          return er.test(n.nodeName);
        },
        button: function (n) {
          var t = n.nodeName.toLowerCase();
          return (t === 'input' && n.type === 'button') || t === 'button';
        },
        text: function (n) {
          var t;
          return (
            n.nodeName.toLowerCase() === 'input' &&
            n.type === 'text' &&
            ((t = n.getAttribute('type')) == null || t.toLowerCase() === 'text')
          );
        },
        first: it(function () {
          return [0];
        }),
        last: it(function (n, t) {
          return [t - 1];
        }),
        eq: it(function (n, t, i) {
          return [i < 0 ? i + t : i];
        }),
        even: it(function (n, t) {
          for (var i = 0; i < t; i += 2) n.push(i);
          return n;
        }),
        odd: it(function (n, t) {
          for (var i = 1; i < t; i += 2) n.push(i);
          return n;
        }),
        lt: it(function (n, t, i) {
          for (var r = i < 0 ? i + t : i; --r >= 0; ) n.push(r);
          return n;
        }),
        gt: it(function (n, t, i) {
          for (var r = i < 0 ? i + t : i; ++r < t; ) n.push(r);
          return n;
        }),
      },
    };
    t.pseudos.nth = t.pseudos.eq;
    for (rt in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
      t.pseudos[rt] = cr(rt);
    for (rt in { submit: !0, reset: !0 }) t.pseudos[rt] = lr(rt);
    return (
      (bi.prototype = t.filters = t.pseudos),
      (t.setFilters = new bi()),
      (ft = u.tokenize = function (n, i) {
        var e,
          f,
          s,
          o,
          r,
          h,
          c,
          l = ci[n + ' '];
        if (l) return i ? 0 : l.slice(0);
        for (r = n, h = [], c = t.preFilter; r; ) {
          (!e || (f = ir.exec(r))) &&
            (f && (r = r.slice(f[0].length) || r), h.push((s = [])));
          e = !1;
          (f = rr.exec(r)) &&
            ((e = f.shift()),
            s.push({ value: e, type: f[0].replace(at, ' ') }),
            (r = r.slice(e.length)));
          for (o in t.filter)
            (f = vt[o].exec(r)) &&
              (!c[o] || (f = c[o](f))) &&
              ((e = f.shift()),
              s.push({ value: e, type: o, matches: f }),
              (r = r.slice(e.length)));
          if (!e) break;
        }
        return i ? r.length : r ? u.error(n) : ci(n, h).slice(0);
      }),
      (wt = u.compile = function (n, t) {
        var r,
          u = [],
          f = [],
          i = lt[n + ' '];
        if (!i) {
          for (t || (t = ft(n)), r = t.length; r--; )
            (i = ei(t[r])), i[e] ? u.push(i) : f.push(i);
          i = lt(n, vr(f, u));
          i.selector = n;
        }
        return i;
      }),
      (si = u.select = function (n, i, r, u) {
        var s,
          e,
          o,
          a,
          v,
          l = typeof n == 'function' && n,
          c = !u && ft((n = l.selector || n));
        if (((r = r || []), c.length === 1)) {
          if (
            ((e = c[0] = c[0].slice(0)),
            e.length > 2 &&
              (o = e[0]).type === 'ID' &&
              f.getById &&
              i.nodeType === 9 &&
              h &&
              t.relative[e[1].type])
          ) {
            if (((i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0]), i))
              l && (i = i.parentNode);
            else return r;
            n = n.slice(e.shift().value.length);
          }
          for (s = vt.needsContext.test(n) ? 0 : e.length; s--; ) {
            if (((o = e[s]), t.relative[(a = o.type)])) break;
            if (
              (v = t.find[a]) &&
              (u = v(
                o.matches[0].replace(y, p),
                (gt.test(e[0].type) && ii(i.parentNode)) || i
              ))
            ) {
              if ((e.splice(s, 1), (n = u.length && yt(e)), !n))
                return k.apply(r, u), r;
              break;
            }
          }
        }
        return (
          (l || wt(n, c))(
            u,
            i,
            !h,
            r,
            !i || (gt.test(n) && ii(i.parentNode)) || i
          ),
          r
        );
      }),
      (f.sortStable = e.split('').sort(bt).join('') === e),
      (f.detectDuplicates = !!ut),
      b(),
      (f.sortDetached = a(function (n) {
        return n.compareDocumentPosition(i.createElement('div')) & 1;
      })),
      a(function (n) {
        return (
          (n.innerHTML = "<a href='#'></a>"),
          n.firstChild.getAttribute('href') === '#'
        );
      }) ||
        ti('type|href|height|width', function (n, t, i) {
          if (!i) return n.getAttribute(t, t.toLowerCase() === 'type' ? 1 : 2);
        }),
      (f.attributes &&
        a(function (n) {
          return (
            (n.innerHTML = '<input/>'),
            n.firstChild.setAttribute('value', ''),
            n.firstChild.getAttribute('value') === ''
          );
        })) ||
        ti('value', function (n, t, i) {
          if (!i && n.nodeName.toLowerCase() === 'input') return n.defaultValue;
        }),
      a(function (n) {
        return n.getAttribute('disabled') == null;
      }) ||
        ti(kt, function (n, t, i) {
          var r;
          if (!i)
            return n[t] === !0
              ? t.toLowerCase()
              : (r = n.getAttributeNode(t)) && r.specified
              ? r.value
              : null;
        }),
      u
    );
  })(n);
  i.find = p;
  i.expr = p.selectors;
  i.expr[':'] = i.expr.pseudos;
  i.uniqueSort = i.unique = p.uniqueSort;
  i.text = p.getText;
  i.isXMLDoc = p.isXML;
  i.contains = p.contains;
  var d = function (n, t, r) {
      for (var u = [], f = r !== undefined; (n = n[t]) && n.nodeType !== 9; )
        if (n.nodeType === 1) {
          if (f && i(n).is(r)) break;
          u.push(n);
        }
      return u;
    },
    tr = function (n, t) {
      for (var i = []; n; n = n.nextSibling)
        n.nodeType === 1 && n !== t && i.push(n);
      return i;
    },
    ir = i.expr.match.needsContext,
    rr = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    bf = /^.[^:#\[\.,]*$/;
  i.filter = function (n, t, r) {
    var u = t[0];
    return (
      r && (n = ':not(' + n + ')'),
      t.length === 1 && u.nodeType === 1
        ? i.find.matchesSelector(u, n)
          ? [u]
          : []
        : i.find.matches(
            n,
            i.grep(t, function (n) {
              return n.nodeType === 1;
            })
          )
    );
  };
  i.fn.extend({
    find: function (n) {
      var t,
        u = this.length,
        r = [],
        f = this;
      if (typeof n != 'string')
        return this.pushStack(
          i(n).filter(function () {
            for (t = 0; t < u; t++) if (i.contains(f[t], this)) return !0;
          })
        );
      for (t = 0; t < u; t++) i.find(n, f[t], r);
      return (
        (r = this.pushStack(u > 1 ? i.unique(r) : r)),
        (r.selector = this.selector ? this.selector + ' ' + n : n),
        r
      );
    },
    filter: function (n) {
      return this.pushStack(ri(this, n || [], !1));
    },
    not: function (n) {
      return this.pushStack(ri(this, n || [], !0));
    },
    is: function (n) {
      return !!ri(this, typeof n == 'string' && ir.test(n) ? i(n) : n || [], !1)
        .length;
    },
  });
  fr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  er = i.fn.init = function (n, t, r) {
    var f, e;
    if (!n) return this;
    if (((r = r || ur), typeof n == 'string'))
      if (
        ((f =
          n[0] === '<' && n[n.length - 1] === '>' && n.length >= 3
            ? [null, n, null]
            : fr.exec(n)),
        f && (f[1] || !t))
      )
        if (f[1]) {
          if (
            ((t = t instanceof i ? t[0] : t),
            i.merge(
              this,
              i.parseHTML(f[1], t && t.nodeType ? t.ownerDocument || t : u, !0)
            ),
            rr.test(f[1]) && i.isPlainObject(t))
          )
            for (f in t)
              i.isFunction(this[f]) ? this[f](t[f]) : this.attr(f, t[f]);
          return this;
        } else
          return (
            (e = u.getElementById(f[2])),
            e && e.parentNode && ((this.length = 1), (this[0] = e)),
            (this.context = u),
            (this.selector = n),
            this
          );
      else
        return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n);
    else if (n.nodeType)
      return (this.context = this[0] = n), (this.length = 1), this;
    else if (i.isFunction(n)) return r.ready !== undefined ? r.ready(n) : n(i);
    return (
      n.selector !== undefined &&
        ((this.selector = n.selector), (this.context = n.context)),
      i.makeArray(n, this)
    );
  };
  er.prototype = i.fn;
  ur = i(u);
  or = /^(?:parents|prev(?:Until|All))/;
  sr = { children: !0, contents: !0, next: !0, prev: !0 };
  i.fn.extend({
    has: function (n) {
      var t = i(n, this),
        r = t.length;
      return this.filter(function () {
        for (var n = 0; n < r; n++) if (i.contains(this, t[n])) return !0;
      });
    },
    closest: function (n, t) {
      for (
        var r,
          f = 0,
          o = this.length,
          u = [],
          e = ir.test(n) || typeof n != 'string' ? i(n, t || this.context) : 0;
        f < o;
        f++
      )
        for (r = this[f]; r && r !== t; r = r.parentNode)
          if (
            r.nodeType < 11 &&
            (e
              ? e.index(r) > -1
              : r.nodeType === 1 && i.find.matchesSelector(r, n))
          ) {
            u.push(r);
            break;
          }
      return this.pushStack(u.length > 1 ? i.uniqueSort(u) : u);
    },
    index: function (n) {
      return n
        ? typeof n == 'string'
          ? lt.call(i(n), this[0])
          : lt.call(this, n.jquery ? n[0] : n)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (n, t) {
      return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))));
    },
    addBack: function (n) {
      return this.add(n == null ? this.prevObject : this.prevObject.filter(n));
    },
  });
  i.each(
    {
      parent: function (n) {
        var t = n.parentNode;
        return t && t.nodeType !== 11 ? t : null;
      },
      parents: function (n) {
        return d(n, 'parentNode');
      },
      parentsUntil: function (n, t, i) {
        return d(n, 'parentNode', i);
      },
      next: function (n) {
        return hr(n, 'nextSibling');
      },
      prev: function (n) {
        return hr(n, 'previousSibling');
      },
      nextAll: function (n) {
        return d(n, 'nextSibling');
      },
      prevAll: function (n) {
        return d(n, 'previousSibling');
      },
      nextUntil: function (n, t, i) {
        return d(n, 'nextSibling', i);
      },
      prevUntil: function (n, t, i) {
        return d(n, 'previousSibling', i);
      },
      siblings: function (n) {
        return tr((n.parentNode || {}).firstChild, n);
      },
      children: function (n) {
        return tr(n.firstChild);
      },
      contents: function (n) {
        return n.contentDocument || i.merge([], n.childNodes);
      },
    },
    function (n, t) {
      i.fn[n] = function (r, u) {
        var f = i.map(this, t, r);
        return (
          n.slice(-5) !== 'Until' && (u = r),
          u && typeof u == 'string' && (f = i.filter(u, f)),
          this.length > 1 &&
            (sr[n] || i.uniqueSort(f), or.test(n) && f.reverse()),
          this.pushStack(f)
        );
      };
    }
  );
  h = /\S+/g;
  i.Callbacks = function (n) {
    n = typeof n == 'string' ? kf(n) : i.extend({}, n);
    var o,
      r,
      h,
      f,
      t = [],
      e = [],
      u = -1,
      c = function () {
        for (f = n.once, h = o = !0; e.length; u = -1)
          for (r = e.shift(); ++u < t.length; )
            t[u].apply(r[0], r[1]) === !1 &&
              n.stopOnFalse &&
              ((u = t.length), (r = !1));
        n.memory || (r = !1);
        o = !1;
        f && (t = r ? [] : '');
      },
      s = {
        add: function () {
          return (
            t &&
              (r && !o && ((u = t.length - 1), e.push(r)),
              (function add(r) {
                i.each(r, function (r, u) {
                  i.isFunction(u)
                    ? (n.unique && s.has(u)) || t.push(u)
                    : u && u.length && i.type(u) !== 'string' && add(u);
                });
              })(arguments),
              r && !o && c()),
            this
          );
        },
        remove: function () {
          return (
            i.each(arguments, function (n, r) {
              for (var f; (f = i.inArray(r, t, f)) > -1; )
                t.splice(f, 1), f <= u && u--;
            }),
            this
          );
        },
        has: function (n) {
          return n ? i.inArray(n, t) > -1 : t.length > 0;
        },
        empty: function () {
          return t && (t = []), this;
        },
        disable: function () {
          return (f = e = []), (t = r = ''), this;
        },
        disabled: function () {
          return !t;
        },
        lock: function () {
          return (f = e = []), r || (t = r = ''), this;
        },
        locked: function () {
          return !!f;
        },
        fireWith: function (n, t) {
          return (
            f ||
              ((t = t || []),
              (t = [n, t.slice ? t.slice() : t]),
              e.push(t),
              o || c()),
            this
          );
        },
        fire: function () {
          return s.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!h;
        },
      };
    return s;
  };
  i.extend({
    Deferred: function (n) {
      var u = [
          ['resolve', 'done', i.Callbacks('once memory'), 'resolved'],
          ['reject', 'fail', i.Callbacks('once memory'), 'rejected'],
          ['notify', 'progress', i.Callbacks('memory')],
        ],
        f = 'pending',
        r = {
          state: function () {
            return f;
          },
          always: function () {
            return t.done(arguments).fail(arguments), this;
          },
          then: function () {
            var n = arguments;
            return i
              .Deferred(function (f) {
                i.each(u, function (u, e) {
                  var o = i.isFunction(n[u]) && n[u];
                  t[e[1]](function () {
                    var n = o && o.apply(this, arguments);
                    n && i.isFunction(n.promise)
                      ? n
                          .promise()
                          .progress(f.notify)
                          .done(f.resolve)
                          .fail(f.reject)
                      : f[e[0] + 'With'](
                          this === r ? f.promise() : this,
                          o ? [n] : arguments
                        );
                  });
                });
                n = null;
              })
              .promise();
          },
          promise: function (n) {
            return n != null ? i.extend(n, r) : r;
          },
        },
        t = {};
      return (
        (r.pipe = r.then),
        i.each(u, function (n, i) {
          var e = i[2],
            o = i[3];
          r[i[1]] = e.add;
          o &&
            e.add(
              function () {
                f = o;
              },
              u[n ^ 1][2].disable,
              u[2][2].lock
            );
          t[i[0]] = function () {
            return t[i[0] + 'With'](this === t ? r : this, arguments), this;
          };
          t[i[0] + 'With'] = e.fireWith;
        }),
        r.promise(t),
        n && n.call(t, t),
        t
      );
    },
    when: function (n) {
      var t = 0,
        u = v.call(arguments),
        r = u.length,
        e = r !== 1 || (n && i.isFunction(n.promise)) ? r : 0,
        f = e === 1 ? n : i.Deferred(),
        h = function (n, t, i) {
          return function (r) {
            t[n] = this;
            i[n] = arguments.length > 1 ? v.call(arguments) : r;
            i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i);
          };
        },
        o,
        c,
        s;
      if (r > 1)
        for (o = new Array(r), c = new Array(r), s = new Array(r); t < r; t++)
          u[t] && i.isFunction(u[t].promise)
            ? u[t]
                .promise()
                .progress(h(t, c, o))
                .done(h(t, s, u))
                .fail(f.reject)
            : --e;
      return e || f.resolveWith(s, u), f.promise();
    },
  });
  i.fn.ready = function (n) {
    return i.ready.promise().done(n), this;
  };
  i.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (n) {
      n ? i.readyWait++ : i.ready(!0);
    },
    ready: function (n) {
      (n === !0 ? --i.readyWait : i.isReady) ||
        ((i.isReady = !0), n !== !0 && --i.readyWait > 0) ||
        (vt.resolveWith(u, [i]),
        i.fn.triggerHandler &&
          (i(u).triggerHandler('ready'), i(u).off('ready')));
    },
  });
  i.ready.promise = function (t) {
    return (
      vt ||
        ((vt = i.Deferred()),
        u.readyState !== 'complete' &&
        (u.readyState === 'loading' || u.documentElement.doScroll)
          ? (u.addEventListener('DOMContentLoaded', yt),
            n.addEventListener('load', yt))
          : n.setTimeout(i.ready)),
      vt.promise(t)
    );
  };
  i.ready.promise();
  a = function (n, t, r, u, f, e, o) {
    var s = 0,
      c = n.length,
      h = r == null;
    if (i.type(r) === 'object') {
      f = !0;
      for (s in r) a(n, t, s, r[s], !0, e, o);
    } else if (
      u !== undefined &&
      ((f = !0),
      i.isFunction(u) || (o = !0),
      h &&
        (o
          ? (t.call(n, u), (t = null))
          : ((h = t),
            (t = function (n, t, r) {
              return h.call(i(n), r);
            }))),
      t)
    )
      for (; s < c; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
    return f ? n : h ? t.call(n) : c ? t(n[0], r) : e;
  };
  g = function (n) {
    return n.nodeType === 1 || n.nodeType === 9 || !+n.nodeType;
  };
  et.uid = 1;
  et.prototype = {
    register: function (n, t) {
      var i = t || {};
      return (
        n.nodeType
          ? (n[this.expando] = i)
          : Object.defineProperty(n, this.expando, {
              value: i,
              writable: !0,
              configurable: !0,
            }),
        n[this.expando]
      );
    },
    cache: function (n) {
      if (!g(n)) return {};
      var t = n[this.expando];
      return (
        t ||
          ((t = {}),
          g(n) &&
            (n.nodeType
              ? (n[this.expando] = t)
              : Object.defineProperty(n, this.expando, {
                  value: t,
                  configurable: !0,
                }))),
        t
      );
    },
    set: function (n, t, i) {
      var r,
        u = this.cache(n);
      if (typeof t == 'string') u[t] = i;
      else for (r in t) u[r] = t[r];
      return u;
    },
    get: function (n, t) {
      return t === undefined
        ? this.cache(n)
        : n[this.expando] && n[this.expando][t];
    },
    access: function (n, t, r) {
      var u;
      return t === undefined || (t && typeof t == 'string' && r === undefined)
        ? ((u = this.get(n, t)),
          u !== undefined ? u : this.get(n, i.camelCase(t)))
        : (this.set(n, t, r), r !== undefined ? r : t);
    },
    remove: function (n, t) {
      var f,
        r,
        e,
        u = n[this.expando];
      if (u !== undefined) {
        if (t === undefined) this.register(n);
        else
          for (
            i.isArray(t)
              ? (r = t.concat(t.map(i.camelCase)))
              : ((e = i.camelCase(t)),
                (t in u)
                  ? (r = [t, e])
                  : ((r = e), (r = (r in u) ? [r] : r.match(h) || []))),
              f = r.length;
            f--;

          )
            delete u[r[f]];
        (t === undefined || i.isEmptyObject(u)) &&
          (n.nodeType ? (n[this.expando] = undefined) : delete n[this.expando]);
      }
    },
    hasData: function (n) {
      var t = n[this.expando];
      return t !== undefined && !i.isEmptyObject(t);
    },
  };
  var r = new et(),
    e = new et(),
    df = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    cr = /[A-Z]/g;
  i.extend({
    hasData: function (n) {
      return e.hasData(n) || r.hasData(n);
    },
    data: function (n, t, i) {
      return e.access(n, t, i);
    },
    removeData: function (n, t) {
      e.remove(n, t);
    },
    _data: function (n, t, i) {
      return r.access(n, t, i);
    },
    _removeData: function (n, t) {
      r.remove(n, t);
    },
  });
  i.fn.extend({
    data: function (n, t) {
      var o,
        f,
        s,
        u = this[0],
        h = u && u.attributes;
      if (n === undefined) {
        if (
          this.length &&
          ((s = e.get(u)), u.nodeType === 1 && !r.get(u, 'hasDataAttrs'))
        ) {
          for (o = h.length; o--; )
            h[o] &&
              ((f = h[o].name),
              f.indexOf('data-') === 0 &&
                ((f = i.camelCase(f.slice(5))), lr(u, f, s[f])));
          r.set(u, 'hasDataAttrs', !0);
        }
        return s;
      }
      return typeof n == 'object'
        ? this.each(function () {
            e.set(this, n);
          })
        : a(
            this,
            function (t) {
              var r, f;
              if (u && t === undefined)
                return ((r =
                  e.get(u, n) || e.get(u, n.replace(cr, '-$&').toLowerCase())),
                r !== undefined)
                  ? r
                  : ((f = i.camelCase(n)), (r = e.get(u, f)), r !== undefined)
                  ? r
                  : ((r = lr(u, f, undefined)), r !== undefined)
                  ? r
                  : void 0;
              f = i.camelCase(n);
              this.each(function () {
                var i = e.get(this, f);
                e.set(this, f, t);
                n.indexOf('-') > -1 && i !== undefined && e.set(this, n, t);
              });
            },
            null,
            t,
            arguments.length > 1,
            null,
            !0
          );
    },
    removeData: function (n) {
      return this.each(function () {
        e.remove(this, n);
      });
    },
  });
  i.extend({
    queue: function (n, t, u) {
      var f;
      if (n)
        return (
          (t = (t || 'fx') + 'queue'),
          (f = r.get(n, t)),
          u &&
            (!f || i.isArray(u)
              ? (f = r.access(n, t, i.makeArray(u)))
              : f.push(u)),
          f || []
        );
    },
    dequeue: function (n, t) {
      t = t || 'fx';
      var r = i.queue(n, t),
        e = r.length,
        u = r.shift(),
        f = i._queueHooks(n, t),
        o = function () {
          i.dequeue(n, t);
        };
      u === 'inprogress' && ((u = r.shift()), e--);
      u &&
        (t === 'fx' && r.unshift('inprogress'), delete f.stop, u.call(n, o, f));
      !e && f && f.empty.fire();
    },
    _queueHooks: function (n, t) {
      var u = t + 'queueHooks';
      return (
        r.get(n, u) ||
        r.access(n, u, {
          empty: i.Callbacks('once memory').add(function () {
            r.remove(n, [t + 'queue', u]);
          }),
        })
      );
    },
  });
  i.fn.extend({
    queue: function (n, t) {
      var r = 2;
      return (typeof n != 'string' && ((t = n), (n = 'fx'), r--),
      arguments.length < r)
        ? i.queue(this[0], n)
        : t === undefined
        ? this
        : this.each(function () {
            var r = i.queue(this, n, t);
            i._queueHooks(this, n);
            n === 'fx' && r[0] !== 'inprogress' && i.dequeue(this, n);
          });
    },
    dequeue: function (n) {
      return this.each(function () {
        i.dequeue(this, n);
      });
    },
    clearQueue: function (n) {
      return this.queue(n || 'fx', []);
    },
    promise: function (n, t) {
      var u,
        e = 1,
        o = i.Deferred(),
        f = this,
        s = this.length,
        h = function () {
          --e || o.resolveWith(f, [f]);
        };
      for (
        typeof n != 'string' && ((t = n), (n = undefined)), n = n || 'fx';
        s--;

      )
        (u = r.get(f[s], n + 'queueHooks')),
          u && u.empty && (e++, u.empty.add(h));
      return h(), o.promise(t);
    },
  });
  var ar = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ot = new RegExp('^(?:([+-])=|)(' + ar + ')([a-z%]*)$', 'i'),
    w = ['Top', 'Right', 'Bottom', 'Left'],
    st = function (n, t) {
      return (
        (n = t || n),
        i.css(n, 'display') === 'none' || !i.contains(n.ownerDocument, n)
      );
    };
  var yr = /^(?:checkbox|radio)$/i,
    pr = /<([\w:-]+)/,
    wr = /^$|\/(?:java|ecma)script/i,
    c = {
      option: [1, "<select multiple='multiple'>", '</select>'],
      thead: [1, '<table>', '</table>'],
      col: [2, '<table><colgroup>', '</colgroup></table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: [0, '', ''],
    };
  c.optgroup = c.option;
  c.tbody = c.tfoot = c.colgroup = c.caption = c.thead;
  c.th = c.td;
  (br = /<|&#?\w+;/),
    (function () {
      var i = u.createDocumentFragment(),
        n = i.appendChild(u.createElement('div')),
        t = u.createElement('input');
      t.setAttribute('type', 'radio');
      t.setAttribute('checked', 'checked');
      t.setAttribute('name', 't');
      n.appendChild(t);
      f.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
      n.innerHTML = '<textarea>x</textarea>';
      f.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue;
    })();
  var gf = /^key/,
    ne = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    dr = /^([^.]*)(?:\.(.+)|)/;
  i.event = {
    global: {},
    add: function (n, t, u, f, e) {
      var v,
        y,
        w,
        p,
        b,
        c,
        s,
        l,
        o,
        k,
        d,
        a = r.get(n);
      if (a)
        for (
          u.handler && ((v = u), (u = v.handler), (e = v.selector)),
            u.guid || (u.guid = i.guid++),
            (p = a.events) || (p = a.events = {}),
            (y = a.handle) ||
              (y = a.handle = function (t) {
                return typeof i != 'undefined' && i.event.triggered !== t.type
                  ? i.event.dispatch.apply(n, arguments)
                  : undefined;
              }),
            t = (t || '').match(h) || [''],
            b = t.length;
          b--;

        )
          ((w = dr.exec(t[b]) || []),
          (o = d = w[1]),
          (k = (w[2] || '').split('.').sort()),
          o) &&
            ((s = i.event.special[o] || {}),
            (o = (e ? s.delegateType : s.bindType) || o),
            (s = i.event.special[o] || {}),
            (c = i.extend(
              {
                type: o,
                origType: d,
                data: f,
                handler: u,
                guid: u.guid,
                selector: e,
                needsContext: e && i.expr.match.needsContext.test(e),
                namespace: k.join('.'),
              },
              v
            )),
            (l = p[o]) ||
              ((l = p[o] = []),
              (l.delegateCount = 0),
              (s.setup && s.setup.call(n, f, k, y) !== !1) ||
                (n.addEventListener && n.addEventListener(o, y))),
            s.add &&
              (s.add.call(n, c), c.handler.guid || (c.handler.guid = u.guid)),
            e ? l.splice(l.delegateCount++, 0, c) : l.push(c),
            (i.event.global[o] = !0));
    },
    remove: function (n, t, u, f, e) {
      var y,
        k,
        c,
        v,
        p,
        s,
        l,
        a,
        o,
        b,
        d,
        w = r.hasData(n) && r.get(n);
      if (w && (v = w.events)) {
        for (t = (t || '').match(h) || [''], p = t.length; p--; ) {
          if (
            ((c = dr.exec(t[p]) || []),
            (o = d = c[1]),
            (b = (c[2] || '').split('.').sort()),
            !o)
          ) {
            for (o in v) i.event.remove(n, o + t[p], u, f, !0);
            continue;
          }
          for (
            l = i.event.special[o] || {},
              o = (f ? l.delegateType : l.bindType) || o,
              a = v[o] || [],
              c =
                c[2] &&
                new RegExp('(^|\\.)' + b.join('\\.(?:.*\\.|)') + '(\\.|$)'),
              k = y = a.length;
            y--;

          )
            (s = a[y]),
              (e || d === s.origType) &&
                (!u || u.guid === s.guid) &&
                (!c || c.test(s.namespace)) &&
                (!f || f === s.selector || (f === '**' && s.selector)) &&
                (a.splice(y, 1),
                s.selector && a.delegateCount--,
                l.remove && l.remove.call(n, s));
          k &&
            !a.length &&
            ((l.teardown && l.teardown.call(n, b, w.handle) !== !1) ||
              i.removeEvent(n, o, w.handle),
            delete v[o]);
        }
        i.isEmptyObject(v) && r.remove(n, 'handle events');
      }
    },
    dispatch: function (n) {
      n = i.event.fix(n);
      var o,
        s,
        e,
        u,
        t,
        h = [],
        c = v.call(arguments),
        l = (r.get(this, 'events') || {})[n.type] || [],
        f = i.event.special[n.type] || {};
      if (
        ((c[0] = n),
        (n.delegateTarget = this),
        !f.preDispatch || f.preDispatch.call(this, n) !== !1)
      ) {
        for (
          h = i.event.handlers.call(this, n, l), o = 0;
          (u = h[o++]) && !n.isPropagationStopped();

        )
          for (
            n.currentTarget = u.elem, s = 0;
            (t = u.handlers[s++]) && !n.isImmediatePropagationStopped();

          )
            (!n.rnamespace || n.rnamespace.test(t.namespace)) &&
              ((n.handleObj = t),
              (n.data = t.data),
              (e = (
                (i.event.special[t.origType] || {}).handle || t.handler
              ).apply(u.elem, c)),
              e !== undefined &&
                (n.result = e) === !1 &&
                (n.preventDefault(), n.stopPropagation()));
        return f.postDispatch && f.postDispatch.call(this, n), n.result;
      }
    },
    handlers: function (n, t) {
      var e,
        u,
        f,
        o,
        h = [],
        s = t.delegateCount,
        r = n.target;
      if (
        s &&
        r.nodeType &&
        (n.type !== 'click' || isNaN(n.button) || n.button < 1)
      )
        for (; r !== this; r = r.parentNode || this)
          if (r.nodeType === 1 && (r.disabled !== !0 || n.type !== 'click')) {
            for (u = [], e = 0; e < s; e++)
              (o = t[e]),
                (f = o.selector + ' '),
                u[f] === undefined &&
                  (u[f] = o.needsContext
                    ? i(f, this).index(r) > -1
                    : i.find(f, this, null, [r]).length),
                u[f] && u.push(o);
            u.length && h.push({ elem: r, handlers: u });
          }
      return s < t.length && h.push({ elem: this, handlers: t.slice(s) }), h;
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(
      ' '
    ),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (n, t) {
        return (
          n.which == null &&
            (n.which = t.charCode != null ? t.charCode : t.keyCode),
          n
        );
      },
    },
    mouseHooks: {
      props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(
        ' '
      ),
      filter: function (n, t) {
        var e,
          i,
          r,
          f = t.button;
        return (
          n.pageX == null &&
            t.clientX != null &&
            ((e = n.target.ownerDocument || u),
            (i = e.documentElement),
            (r = e.body),
            (n.pageX =
              t.clientX +
              ((i && i.scrollLeft) || (r && r.scrollLeft) || 0) -
              ((i && i.clientLeft) || (r && r.clientLeft) || 0)),
            (n.pageY =
              t.clientY +
              ((i && i.scrollTop) || (r && r.scrollTop) || 0) -
              ((i && i.clientTop) || (r && r.clientTop) || 0))),
          n.which ||
            f === undefined ||
            (n.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0),
          n
        );
      },
    },
    fix: function (n) {
      if (n[i.expando]) return n;
      var f,
        e,
        o,
        r = n.type,
        s = n,
        t = this.fixHooks[r];
      for (
        t ||
          (this.fixHooks[r] = t = ne.test(r)
            ? this.mouseHooks
            : gf.test(r)
            ? this.keyHooks
            : {}),
          o = t.props ? this.props.concat(t.props) : this.props,
          n = new i.Event(s),
          f = o.length;
        f--;

      )
        (e = o[f]), (n[e] = s[e]);
      return (
        n.target || (n.target = u),
        n.target.nodeType === 3 && (n.target = n.target.parentNode),
        t.filter ? t.filter(n, s) : n
      );
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== gr() && this.focus) return this.focus(), !1;
        },
        delegateType: 'focusin',
      },
      blur: {
        trigger: function () {
          if (this === gr() && this.blur) return this.blur(), !1;
        },
        delegateType: 'focusout',
      },
      click: {
        trigger: function () {
          if (
            this.type === 'checkbox' &&
            this.click &&
            i.nodeName(this, 'input')
          )
            return this.click(), !1;
        },
        _default: function (n) {
          return i.nodeName(n.target, 'a');
        },
      },
      beforeunload: {
        postDispatch: function (n) {
          n.result !== undefined &&
            n.originalEvent &&
            (n.originalEvent.returnValue = n.result);
        },
      },
    },
  };
  i.removeEvent = function (n, t, i) {
    n.removeEventListener && n.removeEventListener(t, i);
  };
  i.Event = function (n, t) {
    if (!(this instanceof i.Event)) return new i.Event(n, t);
    n && n.type
      ? ((this.originalEvent = n),
        (this.type = n.type),
        (this.isDefaultPrevented =
          n.defaultPrevented ||
          (n.defaultPrevented === undefined && n.returnValue === !1)
            ? pt
            : nt))
      : (this.type = n);
    t && i.extend(this, t);
    this.timeStamp = (n && n.timeStamp) || i.now();
    this[i.expando] = !0;
  };
  i.Event.prototype = {
    constructor: i.Event,
    isDefaultPrevented: nt,
    isPropagationStopped: nt,
    isImmediatePropagationStopped: nt,
    isSimulated: !1,
    preventDefault: function () {
      var n = this.originalEvent;
      this.isDefaultPrevented = pt;
      n && !this.isSimulated && n.preventDefault();
    },
    stopPropagation: function () {
      var n = this.originalEvent;
      this.isPropagationStopped = pt;
      n && !this.isSimulated && n.stopPropagation();
    },
    stopImmediatePropagation: function () {
      var n = this.originalEvent;
      this.isImmediatePropagationStopped = pt;
      n && !this.isSimulated && n.stopImmediatePropagation();
      this.stopPropagation();
    },
  };
  i.each(
    {
      mouseenter: 'mouseover',
      mouseleave: 'mouseout',
      pointerenter: 'pointerover',
      pointerleave: 'pointerout',
    },
    function (n, t) {
      i.event.special[n] = {
        delegateType: t,
        bindType: t,
        handle: function (n) {
          var u,
            f = this,
            r = n.relatedTarget,
            e = n.handleObj;
          return (
            (r && (r === f || i.contains(f, r))) ||
              ((n.type = e.origType),
              (u = e.handler.apply(this, arguments)),
              (n.type = t)),
            u
          );
        },
      };
    }
  );
  i.fn.extend({
    on: function (n, t, i, r) {
      return fi(this, n, t, i, r);
    },
    one: function (n, t, i, r) {
      return fi(this, n, t, i, r, 1);
    },
    off: function (n, t, r) {
      var u, f;
      if (n && n.preventDefault && n.handleObj)
        return (
          (u = n.handleObj),
          i(n.delegateTarget).off(
            u.namespace ? u.origType + '.' + u.namespace : u.origType,
            u.selector,
            u.handler
          ),
          this
        );
      if (typeof n == 'object') {
        for (f in n) this.off(f, t, n[f]);
        return this;
      }
      return (
        (t === !1 || typeof t == 'function') && ((r = t), (t = undefined)),
        r === !1 && (r = nt),
        this.each(function () {
          i.event.remove(this, n, r, t);
        })
      );
    },
  });
  var te = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    ie = /<script|<style|<link/i,
    re = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ue = /^true\/(.*)/,
    fe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  i.extend({
    htmlPrefilter: function (n) {
      return n.replace(te, '<$1></$2>');
    },
    clone: function (n, t, r) {
      var u,
        c,
        s,
        e,
        h = n.cloneNode(!0),
        l = i.contains(n.ownerDocument, n);
      if (
        !f.noCloneChecked &&
        (n.nodeType === 1 || n.nodeType === 11) &&
        !i.isXMLDoc(n)
      )
        for (e = o(h), s = o(n), u = 0, c = s.length; u < c; u++)
          se(s[u], e[u]);
      if (t)
        if (r)
          for (s = s || o(n), e = e || o(h), u = 0, c = s.length; u < c; u++)
            tu(s[u], e[u]);
        else tu(n, h);
      return (
        (e = o(h, 'script')), e.length > 0 && ui(e, !l && o(n, 'script')), h
      );
    },
    cleanData: function (n) {
      for (
        var u, t, f, s = i.event.special, o = 0;
        (t = n[o]) !== undefined;
        o++
      )
        if (g(t)) {
          if ((u = t[r.expando])) {
            if (u.events)
              for (f in u.events)
                s[f] ? i.event.remove(t, f) : i.removeEvent(t, f, u.handle);
            t[r.expando] = undefined;
          }
          t[e.expando] && (t[e.expando] = undefined);
        }
    },
  });
  i.fn.extend({
    domManip: b,
    detach: function (n) {
      return iu(this, n, !0);
    },
    remove: function (n) {
      return iu(this, n);
    },
    text: function (n) {
      return a(
        this,
        function (n) {
          return n === undefined
            ? i.text(this)
            : this.empty().each(function () {
                (this.nodeType === 1 ||
                  this.nodeType === 11 ||
                  this.nodeType === 9) &&
                  (this.textContent = n);
              });
        },
        null,
        n,
        arguments.length
      );
    },
    append: function () {
      return b(this, arguments, function (n) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var t = nu(this, n);
          t.appendChild(n);
        }
      });
    },
    prepend: function () {
      return b(this, arguments, function (n) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var t = nu(this, n);
          t.insertBefore(n, t.firstChild);
        }
      });
    },
    before: function () {
      return b(this, arguments, function (n) {
        this.parentNode && this.parentNode.insertBefore(n, this);
      });
    },
    after: function () {
      return b(this, arguments, function (n) {
        this.parentNode && this.parentNode.insertBefore(n, this.nextSibling);
      });
    },
    empty: function () {
      for (var n, t = 0; (n = this[t]) != null; t++)
        n.nodeType === 1 && (i.cleanData(o(n, !1)), (n.textContent = ''));
      return this;
    },
    clone: function (n, t) {
      return (
        (n = n == null ? !1 : n),
        (t = t == null ? n : t),
        this.map(function () {
          return i.clone(this, n, t);
        })
      );
    },
    html: function (n) {
      return a(
        this,
        function (n) {
          var t = this[0] || {},
            r = 0,
            u = this.length;
          if (n === undefined && t.nodeType === 1) return t.innerHTML;
          if (
            typeof n == 'string' &&
            !ie.test(n) &&
            !c[(pr.exec(n) || ['', ''])[1].toLowerCase()]
          ) {
            n = i.htmlPrefilter(n);
            try {
              for (; r < u; r++)
                (t = this[r] || {}),
                  t.nodeType === 1 &&
                    (i.cleanData(o(t, !1)), (t.innerHTML = n));
              t = 0;
            } catch (f) {}
          }
          t && this.empty().append(n);
        },
        null,
        n,
        arguments.length
      );
    },
    replaceWith: function () {
      var n = [];
      return b(
        this,
        arguments,
        function (t) {
          var r = this.parentNode;
          i.inArray(this, n) < 0 &&
            (i.cleanData(o(this)), r && r.replaceChild(t, this));
        },
        n
      );
    },
  });
  i.each(
    {
      appendTo: 'append',
      prependTo: 'prepend',
      insertBefore: 'before',
      insertAfter: 'after',
      replaceAll: 'replaceWith',
    },
    function (n, t) {
      i.fn[n] = function (n) {
        for (var u, f = [], e = i(n), o = e.length - 1, r = 0; r <= o; r++)
          (u = r === o ? this : this.clone(!0)),
            i(e[r])[t](u),
            ti.apply(f, u.get());
        return this.pushStack(f);
      };
    }
  );
  ei = { HTML: 'block', BODY: 'block' };
  var uu = /^margin/,
    si = new RegExp('^(' + ar + ')(?!px)[a-z%]+$', 'i'),
    bt = function (t) {
      var i = t.ownerDocument.defaultView;
      return (i && i.opener) || (i = n), i.getComputedStyle(t);
    },
    hi = function (n, t, i, r) {
      var f,
        u,
        e = {};
      for (u in t) (e[u] = n.style[u]), (n.style[u] = t[u]);
      f = i.apply(n, r || []);
      for (u in t) n.style[u] = e[u];
      return f;
    },
    ht = u.documentElement;
  (function () {
    function o() {
      t.style.cssText =
        '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%';
      t.innerHTML = '';
      ht.appendChild(r);
      var i = n.getComputedStyle(t);
      s = i.top !== '1%';
      c = i.marginLeft === '2px';
      e = i.width === '4px';
      t.style.marginRight = '50%';
      h = i.marginRight === '4px';
      ht.removeChild(r);
    }
    var s,
      e,
      h,
      c,
      r = u.createElement('div'),
      t = u.createElement('div');
    t.style &&
      ((t.style.backgroundClip = 'content-box'),
      (t.cloneNode(!0).style.backgroundClip = ''),
      (f.clearCloneStyle = t.style.backgroundClip === 'content-box'),
      (r.style.cssText =
        'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute'),
      r.appendChild(t),
      i.extend(f, {
        pixelPosition: function () {
          return o(), s;
        },
        boxSizingReliable: function () {
          return e == null && o(), e;
        },
        pixelMarginRight: function () {
          return e == null && o(), h;
        },
        reliableMarginLeft: function () {
          return e == null && o(), c;
        },
        reliableMarginRight: function () {
          var f,
            i = t.appendChild(u.createElement('div'));
          return (
            (i.style.cssText = t.style.cssText =
              '-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0'),
            (i.style.marginRight = i.style.width = '0'),
            (t.style.width = '1px'),
            ht.appendChild(r),
            (f = !parseFloat(n.getComputedStyle(i).marginRight)),
            ht.removeChild(r),
            t.removeChild(i),
            f
          );
        },
      }));
  })();
  var he = /^(none|table(?!-c[ea]).+)/,
    ce = { position: 'absolute', visibility: 'hidden', display: 'block' },
    fu = { letterSpacing: '0', fontWeight: '400' },
    eu = ['Webkit', 'O', 'Moz', 'ms'],
    ou = u.createElement('div').style;
  i.extend({
    cssHooks: {
      opacity: {
        get: function (n, t) {
          if (t) {
            var i = tt(n, 'opacity');
            return i === '' ? '1' : i;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: 'cssFloat' },
    style: function (n, t, r, u) {
      if (n && n.nodeType !== 3 && n.nodeType !== 8 && n.style) {
        var e,
          h,
          o,
          s = i.camelCase(t),
          c = n.style;
        if (
          ((t = i.cssProps[s] || (i.cssProps[s] = su(s) || s)),
          (o = i.cssHooks[t] || i.cssHooks[s]),
          r !== undefined)
        ) {
          if (
            ((h = typeof r),
            h === 'string' &&
              (e = ot.exec(r)) &&
              e[1] &&
              ((r = vr(n, t, e)), (h = 'number')),
            r == null || r !== r)
          )
            return;
          h === 'number' && (r += (e && e[3]) || (i.cssNumber[s] ? '' : 'px'));
          f.clearCloneStyle ||
            r !== '' ||
            t.indexOf('background') !== 0 ||
            (c[t] = 'inherit');
          (o && 'set' in o && (r = o.set(n, r, u)) === undefined) || (c[t] = r);
        } else
          return o && 'get' in o && (e = o.get(n, !1, u)) !== undefined
            ? e
            : c[t];
      }
    },
    css: function (n, t, r, u) {
      var f,
        s,
        o,
        e = i.camelCase(t);
      return ((t = i.cssProps[e] || (i.cssProps[e] = su(e) || e)),
      (o = i.cssHooks[t] || i.cssHooks[e]),
      o && 'get' in o && (f = o.get(n, !0, r)),
      f === undefined && (f = tt(n, t, u)),
      f === 'normal' && t in fu && (f = fu[t]),
      r === '' || r)
        ? ((s = parseFloat(f)), r === !0 || isFinite(s) ? s || 0 : f)
        : f;
    },
  });
  i.each(['height', 'width'], function (n, t) {
    i.cssHooks[t] = {
      get: function (n, r, u) {
        if (r)
          return he.test(i.css(n, 'display')) && n.offsetWidth === 0
            ? hi(n, ce, function () {
                return lu(n, t, u);
              })
            : lu(n, t, u);
      },
      set: function (n, r, u) {
        var f,
          e = u && bt(n),
          o =
            u && cu(n, t, u, i.css(n, 'boxSizing', !1, e) === 'border-box', e);
        return (
          o &&
            (f = ot.exec(r)) &&
            (f[3] || 'px') !== 'px' &&
            ((n.style[t] = r), (r = i.css(n, t))),
          hu(n, r, o)
        );
      },
    };
  });
  i.cssHooks.marginLeft = ci(f.reliableMarginLeft, function (n, t) {
    if (t)
      return (
        (parseFloat(tt(n, 'marginLeft')) ||
          n.getBoundingClientRect().left -
            hi(n, { marginLeft: 0 }, function () {
              return n.getBoundingClientRect().left;
            })) + 'px'
      );
  });
  i.cssHooks.marginRight = ci(f.reliableMarginRight, function (n, t) {
    if (t) return hi(n, { display: 'inline-block' }, tt, [n, 'marginRight']);
  });
  i.each({ margin: '', padding: '', border: 'Width' }, function (n, t) {
    i.cssHooks[n + t] = {
      expand: function (i) {
        for (
          var r = 0, f = {}, u = typeof i == 'string' ? i.split(' ') : [i];
          r < 4;
          r++
        )
          f[n + w[r] + t] = u[r] || u[r - 2] || u[0];
        return f;
      },
    };
    uu.test(n) || (i.cssHooks[n + t].set = hu);
  });
  i.fn.extend({
    css: function (n, t) {
      return a(
        this,
        function (n, t, r) {
          var f,
            e,
            o = {},
            u = 0;
          if (i.isArray(t)) {
            for (f = bt(n), e = t.length; u < e; u++)
              o[t[u]] = i.css(n, t[u], !1, f);
            return o;
          }
          return r !== undefined ? i.style(n, t, r) : i.css(n, t);
        },
        n,
        t,
        arguments.length > 1
      );
    },
    show: function () {
      return au(this, !0);
    },
    hide: function () {
      return au(this);
    },
    toggle: function (n) {
      return typeof n == 'boolean'
        ? n
          ? this.show()
          : this.hide()
        : this.each(function () {
            st(this) ? i(this).show() : i(this).hide();
          });
    },
  });
  i.Tween = s;
  s.prototype = {
    constructor: s,
    init: function (n, t, r, u, f, e) {
      this.elem = n;
      this.prop = r;
      this.easing = f || i.easing._default;
      this.options = t;
      this.start = this.now = this.cur();
      this.end = u;
      this.unit = e || (i.cssNumber[r] ? '' : 'px');
    },
    cur: function () {
      var n = s.propHooks[this.prop];
      return n && n.get ? n.get(this) : s.propHooks._default.get(this);
    },
    run: function (n) {
      var t,
        r = s.propHooks[this.prop];
      return (
        (this.pos = this.options.duration
          ? (t = i.easing[this.easing](
              n,
              this.options.duration * n,
              0,
              1,
              this.options.duration
            ))
          : (t = n)),
        (this.now = (this.end - this.start) * t + this.start),
        this.options.step && this.options.step.call(this.elem, this.now, this),
        r && r.set ? r.set(this) : s.propHooks._default.set(this),
        this
      );
    },
  };
  s.prototype.init.prototype = s.prototype;
  s.propHooks = {
    _default: {
      get: function (n) {
        var t;
        return n.elem.nodeType !== 1 ||
          (n.elem[n.prop] != null && n.elem.style[n.prop] == null)
          ? n.elem[n.prop]
          : ((t = i.css(n.elem, n.prop, '')), !t || t === 'auto' ? 0 : t);
      },
      set: function (n) {
        i.fx.step[n.prop]
          ? i.fx.step[n.prop](n)
          : n.elem.nodeType === 1 &&
            (n.elem.style[i.cssProps[n.prop]] != null || i.cssHooks[n.prop])
          ? i.style(n.elem, n.prop, n.now + n.unit)
          : (n.elem[n.prop] = n.now);
      },
    },
  };
  s.propHooks.scrollTop = s.propHooks.scrollLeft = {
    set: function (n) {
      n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now);
    },
  };
  i.easing = {
    linear: function (n) {
      return n;
    },
    swing: function (n) {
      return 0.5 - Math.cos(n * Math.PI) / 2;
    },
    _default: 'swing',
  };
  i.fx = s.prototype.init;
  i.fx.step = {};
  vu = /^(?:toggle|show|hide)$/;
  yu = /queueHooks$/;
  i.Animation = i.extend(l, {
    tweeners: {
      '*': [
        function (n, t) {
          var i = this.createTween(n, t);
          return vr(i.elem, n, ot.exec(t), i), i;
        },
      ],
    },
    tweener: function (n, t) {
      i.isFunction(n) ? ((t = n), (n = ['*'])) : (n = n.match(h));
      for (var r, u = 0, f = n.length; u < f; u++)
        (r = n[u]),
          (l.tweeners[r] = l.tweeners[r] || []),
          l.tweeners[r].unshift(t);
    },
    prefilters: [le],
    prefilter: function (n, t) {
      t ? l.prefilters.unshift(n) : l.prefilters.push(n);
    },
  });
  i.speed = function (n, t, r) {
    var u =
      n && typeof n == 'object'
        ? i.extend({}, n)
        : {
            complete: r || (!r && t) || (i.isFunction(n) && n),
            duration: n,
            easing: (r && t) || (t && !i.isFunction(t) && t),
          };
    return (
      (u.duration = i.fx.off
        ? 0
        : typeof u.duration == 'number'
        ? u.duration
        : u.duration in i.fx.speeds
        ? i.fx.speeds[u.duration]
        : i.fx.speeds._default),
      (u.queue == null || u.queue === !0) && (u.queue = 'fx'),
      (u.old = u.complete),
      (u.complete = function () {
        i.isFunction(u.old) && u.old.call(this);
        u.queue && i.dequeue(this, u.queue);
      }),
      u
    );
  };
  i.fn.extend({
    fadeTo: function (n, t, i, r) {
      return this.filter(st)
        .css('opacity', 0)
        .show()
        .end()
        .animate({ opacity: t }, n, i, r);
    },
    animate: function (n, t, u, f) {
      var s = i.isEmptyObject(n),
        o = i.speed(t, u, f),
        e = function () {
          var t = l(this, i.extend({}, n), o);
          (s || r.get(this, 'finish')) && t.stop(!0);
        };
      return (
        (e.finish = e),
        s || o.queue === !1 ? this.each(e) : this.queue(o.queue, e)
      );
    },
    stop: function (n, t, u) {
      var f = function (n) {
        var t = n.stop;
        delete n.stop;
        t(u);
      };
      return (
        typeof n != 'string' && ((u = t), (t = n), (n = undefined)),
        t && n !== !1 && this.queue(n || 'fx', []),
        this.each(function () {
          var s = !0,
            t = n != null && n + 'queueHooks',
            o = i.timers,
            e = r.get(this);
          if (t) e[t] && e[t].stop && f(e[t]);
          else for (t in e) e[t] && e[t].stop && yu.test(t) && f(e[t]);
          for (t = o.length; t--; )
            o[t].elem === this &&
              (n == null || o[t].queue === n) &&
              (o[t].anim.stop(u), (s = !1), o.splice(t, 1));
          (s || !u) && i.dequeue(this, n);
        })
      );
    },
    finish: function (n) {
      return (
        n !== !1 && (n = n || 'fx'),
        this.each(function () {
          var t,
            e = r.get(this),
            u = e[n + 'queue'],
            o = e[n + 'queueHooks'],
            f = i.timers,
            s = u ? u.length : 0;
          for (
            e.finish = !0,
              i.queue(this, n, []),
              o && o.stop && o.stop.call(this, !0),
              t = f.length;
            t--;

          )
            f[t].elem === this &&
              f[t].queue === n &&
              (f[t].anim.stop(!0), f.splice(t, 1));
          for (t = 0; t < s; t++) u[t] && u[t].finish && u[t].finish.call(this);
          delete e.finish;
        })
      );
    },
  });
  i.each(['toggle', 'show', 'hide'], function (n, t) {
    var r = i.fn[t];
    i.fn[t] = function (n, i, u) {
      return n == null || typeof n == 'boolean'
        ? r.apply(this, arguments)
        : this.animate(dt(t, !0), n, i, u);
    };
  });
  i.each(
    {
      slideDown: dt('show'),
      slideUp: dt('hide'),
      slideToggle: dt('toggle'),
      fadeIn: { opacity: 'show' },
      fadeOut: { opacity: 'hide' },
      fadeToggle: { opacity: 'toggle' },
    },
    function (n, t) {
      i.fn[n] = function (n, i, r) {
        return this.animate(t, n, i, r);
      };
    }
  );
  i.timers = [];
  i.fx.tick = function () {
    var r,
      n = 0,
      t = i.timers;
    for (it = i.now(); n < t.length; n++)
      (r = t[n]), r() || t[n] !== r || t.splice(n--, 1);
    t.length || i.fx.stop();
    it = undefined;
  };
  i.fx.timer = function (n) {
    i.timers.push(n);
    n() ? i.fx.start() : i.timers.pop();
  };
  i.fx.interval = 13;
  i.fx.start = function () {
    kt || (kt = n.setInterval(i.fx.tick, i.fx.interval));
  };
  i.fx.stop = function () {
    n.clearInterval(kt);
    kt = null;
  };
  i.fx.speeds = { slow: 600, fast: 200, _default: 400 };
  (i.fn.delay = function (t, r) {
    return (
      (t = i.fx ? i.fx.speeds[t] || t : t),
      (r = r || 'fx'),
      this.queue(r, function (i, r) {
        var u = n.setTimeout(i, t);
        r.stop = function () {
          n.clearTimeout(u);
        };
      })
    );
  }),
    (function () {
      var n = u.createElement('input'),
        t = u.createElement('select'),
        i = t.appendChild(u.createElement('option'));
      n.type = 'checkbox';
      f.checkOn = n.value !== '';
      f.optSelected = i.selected;
      t.disabled = !0;
      f.optDisabled = !i.disabled;
      n = u.createElement('input');
      n.value = 't';
      n.type = 'radio';
      f.radioValue = n.value === 't';
    })();
  rt = i.expr.attrHandle;
  i.fn.extend({
    attr: function (n, t) {
      return a(this, i.attr, n, t, arguments.length > 1);
    },
    removeAttr: function (n) {
      return this.each(function () {
        i.removeAttr(this, n);
      });
    },
  });
  i.extend({
    attr: function (n, t, r) {
      var u,
        f,
        e = n.nodeType;
      if (e !== 3 && e !== 8 && e !== 2) {
        if (typeof n.getAttribute == 'undefined') return i.prop(n, t, r);
        if (
          ((e === 1 && i.isXMLDoc(n)) ||
            ((t = t.toLowerCase()),
            (f =
              i.attrHooks[t] || (i.expr.match.bool.test(t) ? bu : undefined))),
          r !== undefined)
        ) {
          if (r === null) {
            i.removeAttr(n, t);
            return;
          }
          return f && 'set' in f && (u = f.set(n, r, t)) !== undefined
            ? u
            : (n.setAttribute(t, r + ''), r);
        }
        return f && 'get' in f && (u = f.get(n, t)) !== null
          ? u
          : ((u = i.find.attr(n, t)), u == null ? undefined : u);
      }
    },
    attrHooks: {
      type: {
        set: function (n, t) {
          if (!f.radioValue && t === 'radio' && i.nodeName(n, 'input')) {
            var r = n.value;
            return n.setAttribute('type', t), r && (n.value = r), t;
          }
        },
      },
    },
    removeAttr: function (n, t) {
      var r,
        u,
        e = 0,
        f = t && t.match(h);
      if (f && n.nodeType === 1)
        while ((r = f[e++]))
          (u = i.propFix[r] || r),
            i.expr.match.bool.test(r) && (n[u] = !1),
            n.removeAttribute(r);
    },
  });
  bu = {
    set: function (n, t, r) {
      return t === !1 ? i.removeAttr(n, r) : n.setAttribute(r, r), r;
    },
  };
  i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
    var r = rt[t] || i.find.attr;
    rt[t] = function (n, t, i) {
      var u, f;
      return (
        i ||
          ((f = rt[t]),
          (rt[t] = u),
          (u = r(n, t, i) != null ? t.toLowerCase() : null),
          (rt[t] = f)),
        u
      );
    };
  });
  ku = /^(?:input|select|textarea|button)$/i;
  du = /^(?:a|area)$/i;
  i.fn.extend({
    prop: function (n, t) {
      return a(this, i.prop, n, t, arguments.length > 1);
    },
    removeProp: function (n) {
      return this.each(function () {
        delete this[i.propFix[n] || n];
      });
    },
  });
  i.extend({
    prop: function (n, t, r) {
      var f,
        u,
        e = n.nodeType;
      if (e !== 3 && e !== 8 && e !== 2)
        return ((e === 1 && i.isXMLDoc(n)) ||
          ((t = i.propFix[t] || t), (u = i.propHooks[t])),
        r !== undefined)
          ? u && 'set' in u && (f = u.set(n, r, t)) !== undefined
            ? f
            : (n[t] = r)
          : u && 'get' in u && (f = u.get(n, t)) !== null
          ? f
          : n[t];
    },
    propHooks: {
      tabIndex: {
        get: function (n) {
          var t = i.find.attr(n, 'tabindex');
          return t
            ? parseInt(t, 10)
            : ku.test(n.nodeName) || (du.test(n.nodeName) && n.href)
            ? 0
            : -1;
        },
      },
    },
    propFix: { for: 'htmlFor', class: 'className' },
  });
  f.optSelected ||
    (i.propHooks.selected = {
      get: function (n) {
        var t = n.parentNode;
        return t && t.parentNode && t.parentNode.selectedIndex, null;
      },
      set: function (n) {
        var t = n.parentNode;
        t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
      },
    });
  i.each(
    [
      'tabIndex',
      'readOnly',
      'maxLength',
      'cellSpacing',
      'cellPadding',
      'rowSpan',
      'colSpan',
      'useMap',
      'frameBorder',
      'contentEditable',
    ],
    function () {
      i.propFix[this.toLowerCase()] = this;
    }
  );
  gt = /[\t\r\n\f]/g;
  i.fn.extend({
    addClass: function (n) {
      var o,
        r,
        t,
        u,
        f,
        s,
        e,
        c = 0;
      if (i.isFunction(n))
        return this.each(function (t) {
          i(this).addClass(n.call(this, t, k(this)));
        });
      if (typeof n == 'string' && n)
        for (o = n.match(h) || []; (r = this[c++]); )
          if (
            ((u = k(r)),
            (t = r.nodeType === 1 && (' ' + u + ' ').replace(gt, ' ')),
            t)
          ) {
            for (s = 0; (f = o[s++]); )
              t.indexOf(' ' + f + ' ') < 0 && (t += f + ' ');
            e = i.trim(t);
            u !== e && r.setAttribute('class', e);
          }
      return this;
    },
    removeClass: function (n) {
      var o,
        r,
        t,
        u,
        f,
        s,
        e,
        c = 0;
      if (i.isFunction(n))
        return this.each(function (t) {
          i(this).removeClass(n.call(this, t, k(this)));
        });
      if (!arguments.length) return this.attr('class', '');
      if (typeof n == 'string' && n)
        for (o = n.match(h) || []; (r = this[c++]); )
          if (
            ((u = k(r)),
            (t = r.nodeType === 1 && (' ' + u + ' ').replace(gt, ' ')),
            t)
          ) {
            for (s = 0; (f = o[s++]); )
              while (t.indexOf(' ' + f + ' ') > -1)
                t = t.replace(' ' + f + ' ', ' ');
            e = i.trim(t);
            u !== e && r.setAttribute('class', e);
          }
      return this;
    },
    toggleClass: function (n, t) {
      var u = typeof n;
      return typeof t == 'boolean' && u === 'string'
        ? t
          ? this.addClass(n)
          : this.removeClass(n)
        : i.isFunction(n)
        ? this.each(function (r) {
            i(this).toggleClass(n.call(this, r, k(this), t), t);
          })
        : this.each(function () {
            var t, e, f, o;
            if (u === 'string')
              for (e = 0, f = i(this), o = n.match(h) || []; (t = o[e++]); )
                f.hasClass(t) ? f.removeClass(t) : f.addClass(t);
            else
              (n === undefined || u === 'boolean') &&
                ((t = k(this)),
                t && r.set(this, '__className__', t),
                this.setAttribute &&
                  this.setAttribute(
                    'class',
                    t || n === !1 ? '' : r.get(this, '__className__') || ''
                  ));
          });
    },
    hasClass: function (n) {
      for (var t, r = 0, i = ' ' + n + ' '; (t = this[r++]); )
        if (
          t.nodeType === 1 &&
          (' ' + k(t) + ' ').replace(gt, ' ').indexOf(i) > -1
        )
          return !0;
      return !1;
    },
  });
  gu = /\r/g;
  nf = /[\x20\t\r\n\f]+/g;
  i.fn.extend({
    val: function (n) {
      var t,
        r,
        f,
        u = this[0];
      return arguments.length
        ? ((f = i.isFunction(n)),
          this.each(function (r) {
            var u;
            this.nodeType === 1 &&
              ((u = f ? n.call(this, r, i(this).val()) : n),
              u == null
                ? (u = '')
                : typeof u == 'number'
                ? (u += '')
                : i.isArray(u) &&
                  (u = i.map(u, function (n) {
                    return n == null ? '' : n + '';
                  })),
              (t =
                i.valHooks[this.type] ||
                i.valHooks[this.nodeName.toLowerCase()]),
              (t && 'set' in t && t.set(this, u, 'value') !== undefined) ||
                (this.value = u));
          }))
        : u
        ? ((t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()]),
          t && 'get' in t && (r = t.get(u, 'value')) !== undefined)
          ? r
          : ((r = u.value),
            typeof r == 'string' ? r.replace(gu, '') : r == null ? '' : r)
        : void 0;
    },
  });
  i.extend({
    valHooks: {
      option: {
        get: function (n) {
          var t = i.find.attr(n, 'value');
          return t != null ? t : i.trim(i.text(n)).replace(nf, ' ');
        },
      },
      select: {
        get: function (n) {
          for (
            var o,
              t,
              s = n.options,
              r = n.selectedIndex,
              u = n.type === 'select-one' || r < 0,
              h = u ? null : [],
              c = u ? r + 1 : s.length,
              e = r < 0 ? c : u ? r : 0;
            e < c;
            e++
          )
            if (
              ((t = s[e]),
              (t.selected || e === r) &&
                (f.optDisabled
                  ? !t.disabled
                  : t.getAttribute('disabled') === null) &&
                (!t.parentNode.disabled ||
                  !i.nodeName(t.parentNode, 'optgroup')))
            ) {
              if (((o = i(t).val()), u)) return o;
              h.push(o);
            }
          return h;
        },
        set: function (n, t) {
          for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--; )
            (r = f[o]),
              (r.selected = i.inArray(i.valHooks.option.get(r), e) > -1) &&
                (u = !0);
          return u || (n.selectedIndex = -1), e;
        },
      },
    },
  });
  i.each(['radio', 'checkbox'], function () {
    i.valHooks[this] = {
      set: function (n, t) {
        if (i.isArray(t)) return (n.checked = i.inArray(i(n).val(), t) > -1);
      },
    };
    f.checkOn ||
      (i.valHooks[this].get = function (n) {
        return n.getAttribute('value') === null ? 'on' : n.value;
      });
  });
  li = /^(?:focusinfocus|focusoutblur)$/;
  i.extend(i.event, {
    trigger: function (t, f, e, o) {
      var w,
        s,
        c,
        b,
        a,
        v,
        l,
        p = [e || u],
        h = ft.call(t, 'type') ? t.type : t,
        y = ft.call(t, 'namespace') ? t.namespace.split('.') : [];
      if (
        ((s = c = e = e || u), e.nodeType !== 3 && e.nodeType !== 8) &&
        !li.test(h + i.event.triggered) &&
        (h.indexOf('.') > -1 && ((y = h.split('.')), (h = y.shift()), y.sort()),
        (a = h.indexOf(':') < 0 && 'on' + h),
        (t = t[i.expando] ? t : new i.Event(h, typeof t == 'object' && t)),
        (t.isTrigger = o ? 2 : 3),
        (t.namespace = y.join('.')),
        (t.rnamespace = t.namespace
          ? new RegExp('(^|\\.)' + y.join('\\.(?:.*\\.|)') + '(\\.|$)')
          : null),
        (t.result = undefined),
        t.target || (t.target = e),
        (f = f == null ? [t] : i.makeArray(f, [t])),
        (l = i.event.special[h] || {}),
        o || !l.trigger || l.trigger.apply(e, f) !== !1)
      ) {
        if (!o && !l.noBubble && !i.isWindow(e)) {
          for (
            b = l.delegateType || h, li.test(b + h) || (s = s.parentNode);
            s;
            s = s.parentNode
          )
            p.push(s), (c = s);
          c === (e.ownerDocument || u) &&
            p.push(c.defaultView || c.parentWindow || n);
        }
        for (w = 0; (s = p[w++]) && !t.isPropagationStopped(); )
          (t.type = w > 1 ? b : l.bindType || h),
            (v = (r.get(s, 'events') || {})[t.type] && r.get(s, 'handle')),
            v && v.apply(s, f),
            (v = a && s[a]),
            v &&
              v.apply &&
              g(s) &&
              ((t.result = v.apply(s, f)),
              t.result === !1 && t.preventDefault());
        return (
          (t.type = h),
          o ||
            t.isDefaultPrevented() ||
            ((!l._default || l._default.apply(p.pop(), f) === !1) &&
              g(e) &&
              a &&
              i.isFunction(e[h]) &&
              !i.isWindow(e) &&
              ((c = e[a]),
              c && (e[a] = null),
              (i.event.triggered = h),
              e[h](),
              (i.event.triggered = undefined),
              c && (e[a] = c))),
          t.result
        );
      }
    },
    simulate: function (n, t, r) {
      var u = i.extend(new i.Event(), r, { type: n, isSimulated: !0 });
      i.event.trigger(u, null, t);
    },
  });
  i.fn.extend({
    trigger: function (n, t) {
      return this.each(function () {
        i.event.trigger(n, t, this);
      });
    },
    triggerHandler: function (n, t) {
      var r = this[0];
      if (r) return i.event.trigger(n, t, r, !0);
    },
  });
  i.each(
    'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(
      ' '
    ),
    function (n, t) {
      i.fn[t] = function (n, i) {
        return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t);
      };
    }
  );
  i.fn.extend({
    hover: function (n, t) {
      return this.mouseenter(n).mouseleave(t || n);
    },
  });
  f.focusin = 'onfocusin' in n;
  f.focusin ||
    i.each({ focus: 'focusin', blur: 'focusout' }, function (n, t) {
      var u = function (n) {
        i.event.simulate(t, n.target, i.event.fix(n));
      };
      i.event.special[t] = {
        setup: function () {
          var i = this.ownerDocument || this,
            f = r.access(i, t);
          f || i.addEventListener(n, u, !0);
          r.access(i, t, (f || 0) + 1);
        },
        teardown: function () {
          var i = this.ownerDocument || this,
            f = r.access(i, t) - 1;
          f
            ? r.access(i, t, f)
            : (i.removeEventListener(n, u, !0), r.remove(i, t));
        },
      };
    });
  var ct = n.location,
    ai = i.now(),
    vi = /\?/;
  i.parseJSON = function (n) {
    return JSON.parse(n + '');
  };
  i.parseXML = function (t) {
    var r;
    if (!t || typeof t != 'string') return null;
    try {
      r = new n.DOMParser().parseFromString(t, 'text/xml');
    } catch (u) {
      r = undefined;
    }
    return (
      (!r || r.getElementsByTagName('parsererror').length) &&
        i.error('Invalid XML: ' + t),
      r
    );
  };
  var ve = /#.*$/,
    tf = /([?&])_=[^&]*/,
    ye = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    pe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    we = /^(?:GET|HEAD)$/,
    be = /^\/\//,
    rf = {},
    yi = {},
    uf = '*/'.concat('*'),
    pi = u.createElement('a');
  pi.href = ct.href;
  i.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ct.href,
      type: 'GET',
      isLocal: pe.test(ct.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': uf,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON',
      },
      converters: {
        '* text': String,
        'text html': !0,
        'text json': i.parseJSON,
        'text xml': i.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (n, t) {
      return t ? wi(wi(n, i.ajaxSettings), t) : wi(i.ajaxSettings, n);
    },
    ajaxPrefilter: ff(rf),
    ajaxTransport: ff(yi),
    ajax: function (t, r) {
      function b(t, r, u, h) {
        var v,
          rt,
          it,
          p,
          b,
          a = r;
        s !== 2 &&
          ((s = 2),
          d && n.clearTimeout(d),
          (l = undefined),
          (k = h || ''),
          (e.readyState = t > 0 ? 4 : 0),
          (v = (t >= 200 && t < 300) || t === 304),
          u && (p = ke(f, e, u)),
          (p = de(f, p, e, v)),
          v
            ? (f.ifModified &&
                ((b = e.getResponseHeader('Last-Modified')),
                b && (i.lastModified[o] = b),
                (b = e.getResponseHeader('etag')),
                b && (i.etag[o] = b)),
              t === 204 || f.type === 'HEAD'
                ? (a = 'nocontent')
                : t === 304
                ? (a = 'notmodified')
                : ((a = p.state), (rt = p.data), (it = p.error), (v = !it)))
            : ((it = a), (t || !a) && ((a = 'error'), t < 0 && (t = 0))),
          (e.status = t),
          (e.statusText = (r || a) + ''),
          v ? nt.resolveWith(c, [rt, a, e]) : nt.rejectWith(c, [e, a, it]),
          e.statusCode(w),
          (w = undefined),
          y && g.trigger(v ? 'ajaxSuccess' : 'ajaxError', [e, f, v ? rt : it]),
          tt.fireWith(c, [e, a]),
          y &&
            (g.trigger('ajaxComplete', [e, f]),
            --i.active || i.event.trigger('ajaxStop')));
      }
      typeof t == 'object' && ((r = t), (t = undefined));
      r = r || {};
      var l,
        o,
        k,
        p,
        d,
        a,
        y,
        v,
        f = i.ajaxSetup({}, r),
        c = f.context || f,
        g = f.context && (c.nodeType || c.jquery) ? i(c) : i.event,
        nt = i.Deferred(),
        tt = i.Callbacks('once memory'),
        w = f.statusCode || {},
        it = {},
        rt = {},
        s = 0,
        ut = 'canceled',
        e = {
          readyState: 0,
          getResponseHeader: function (n) {
            var t;
            if (s === 2) {
              if (!p)
                for (p = {}; (t = ye.exec(k)); ) p[t[1].toLowerCase()] = t[2];
              t = p[n.toLowerCase()];
            }
            return t == null ? null : t;
          },
          getAllResponseHeaders: function () {
            return s === 2 ? k : null;
          },
          setRequestHeader: function (n, t) {
            var i = n.toLowerCase();
            return s || ((n = rt[i] = rt[i] || n), (it[n] = t)), this;
          },
          overrideMimeType: function (n) {
            return s || (f.mimeType = n), this;
          },
          statusCode: function (n) {
            var t;
            if (n)
              if (s < 2) for (t in n) w[t] = [w[t], n[t]];
              else e.always(n[e.status]);
            return this;
          },
          abort: function (n) {
            var t = n || ut;
            return l && l.abort(t), b(0, t), this;
          },
        };
      if (
        ((nt.promise(e).complete = tt.add),
        (e.success = e.done),
        (e.error = e.fail),
        (f.url = ((t || f.url || ct.href) + '')
          .replace(ve, '')
          .replace(be, ct.protocol + '//')),
        (f.type = r.method || r.type || f.method || f.type),
        (f.dataTypes = i
          .trim(f.dataType || '*')
          .toLowerCase()
          .match(h) || ['']),
        f.crossDomain == null)
      ) {
        a = u.createElement('a');
        try {
          a.href = f.url;
          a.href = a.href;
          f.crossDomain =
            pi.protocol + '//' + pi.host != a.protocol + '//' + a.host;
        } catch (ft) {
          f.crossDomain = !0;
        }
      }
      if (
        (f.data &&
          f.processData &&
          typeof f.data != 'string' &&
          (f.data = i.param(f.data, f.traditional)),
        ef(rf, f, r, e),
        s === 2)
      )
        return e;
      y = i.event && f.global;
      y && i.active++ == 0 && i.event.trigger('ajaxStart');
      f.type = f.type.toUpperCase();
      f.hasContent = !we.test(f.type);
      o = f.url;
      f.hasContent ||
        (f.data &&
          ((o = f.url += (vi.test(o) ? '&' : '?') + f.data), delete f.data),
        f.cache === !1 &&
          (f.url = tf.test(o)
            ? o.replace(tf, '$1_=' + ai++)
            : o + (vi.test(o) ? '&' : '?') + '_=' + ai++));
      f.ifModified &&
        (i.lastModified[o] &&
          e.setRequestHeader('If-Modified-Since', i.lastModified[o]),
        i.etag[o] && e.setRequestHeader('If-None-Match', i.etag[o]));
      ((f.data && f.hasContent && f.contentType !== !1) || r.contentType) &&
        e.setRequestHeader('Content-Type', f.contentType);
      e.setRequestHeader(
        'Accept',
        f.dataTypes[0] && f.accepts[f.dataTypes[0]]
          ? f.accepts[f.dataTypes[0]] +
              (f.dataTypes[0] !== '*' ? ', ' + uf + '; q=0.01' : '')
          : f.accepts['*']
      );
      for (v in f.headers) e.setRequestHeader(v, f.headers[v]);
      if (f.beforeSend && (f.beforeSend.call(c, e, f) === !1 || s === 2))
        return e.abort();
      ut = 'abort';
      for (v in { success: 1, error: 1, complete: 1 }) e[v](f[v]);
      if (((l = ef(yi, f, r, e)), l)) {
        if (((e.readyState = 1), y && g.trigger('ajaxSend', [e, f]), s === 2))
          return e;
        f.async &&
          f.timeout > 0 &&
          (d = n.setTimeout(function () {
            e.abort('timeout');
          }, f.timeout));
        try {
          s = 1;
          l.send(it, b);
        } catch (ft) {
          if (s < 2) b(-1, ft);
          else throw ft;
        }
      } else b(-1, 'No Transport');
      return e;
    },
    getJSON: function (n, t, r) {
      return i.get(n, t, r, 'json');
    },
    getScript: function (n, t) {
      return i.get(n, undefined, t, 'script');
    },
  });
  i.each(['get', 'post'], function (n, t) {
    i[t] = function (n, r, u, f) {
      return (
        i.isFunction(r) && ((f = f || u), (u = r), (r = undefined)),
        i.ajax(
          i.extend(
            { url: n, type: t, dataType: f, data: r, success: u },
            i.isPlainObject(n) && n
          )
        )
      );
    };
  });
  i._evalUrl = function (n) {
    return i.ajax({
      url: n,
      type: 'GET',
      dataType: 'script',
      async: !1,
      global: !1,
      throws: !0,
    });
  };
  i.fn.extend({
    wrapAll: function (n) {
      var t;
      return i.isFunction(n)
        ? this.each(function (t) {
            i(this).wrapAll(n.call(this, t));
          })
        : (this[0] &&
            ((t = i(n, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                for (var n = this; n.firstElementChild; )
                  n = n.firstElementChild;
                return n;
              })
              .append(this)),
          this);
    },
    wrapInner: function (n) {
      return i.isFunction(n)
        ? this.each(function (t) {
            i(this).wrapInner(n.call(this, t));
          })
        : this.each(function () {
            var t = i(this),
              r = t.contents();
            r.length ? r.wrapAll(n) : t.append(n);
          });
    },
    wrap: function (n) {
      var t = i.isFunction(n);
      return this.each(function (r) {
        i(this).wrapAll(t ? n.call(this, r) : n);
      });
    },
    unwrap: function () {
      return this.parent()
        .each(function () {
          i.nodeName(this, 'body') || i(this).replaceWith(this.childNodes);
        })
        .end();
    },
  });
  i.expr.filters.hidden = function (n) {
    return !i.expr.filters.visible(n);
  };
  i.expr.filters.visible = function (n) {
    return (
      n.offsetWidth > 0 || n.offsetHeight > 0 || n.getClientRects().length > 0
    );
  };
  var ge = /%20/g,
    no = /\[\]$/,
    of = /\r?\n/g,
    to = /^(?:submit|button|image|reset|file)$/i,
    io = /^(?:input|select|textarea|keygen)/i;
  return (
    (i.param = function (n, t) {
      var r,
        u = [],
        f = function (n, t) {
          t = i.isFunction(t) ? t() : t == null ? '' : t;
          u[u.length] = encodeURIComponent(n) + '=' + encodeURIComponent(t);
        };
      if (
        (t === undefined && (t = i.ajaxSettings && i.ajaxSettings.traditional),
        i.isArray(n) || (n.jquery && !i.isPlainObject(n)))
      )
        i.each(n, function () {
          f(this.name, this.value);
        });
      else for (r in n) bi(r, n[r], t, f);
      return u.join('&').replace(ge, '+');
    }),
    i.fn.extend({
      serialize: function () {
        return i.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var n = i.prop(this, 'elements');
          return n ? i.makeArray(n) : this;
        })
          .filter(function () {
            var n = this.type;
            return (
              this.name &&
              !i(this).is(':disabled') &&
              io.test(this.nodeName) &&
              !to.test(n) &&
              (this.checked || !yr.test(n))
            );
          })
          .map(function (n, t) {
            var r = i(this).val();
            return r == null
              ? null
              : i.isArray(r)
              ? i.map(r, function (n) {
                  return { name: t.name, value: n.replace(of, '\r\n') };
                })
              : { name: t.name, value: r.replace(of, '\r\n') };
          })
          .get();
      },
    }),
    (i.ajaxSettings.xhr = function () {
      try {
        return new n.XMLHttpRequest();
      } catch (t) {}
    }),
    (sf = { 0: 200, 1223: 204 }),
    (ut = i.ajaxSettings.xhr()),
    (f.cors = !!ut && 'withCredentials' in ut),
    (f.ajax = ut = !!ut),
    i.ajaxTransport(function (t) {
      var i, r;
      if (f.cors || (ut && !t.crossDomain))
        return {
          send: function (u, f) {
            var o,
              e = t.xhr();
            if (
              (e.open(t.type, t.url, t.async, t.username, t.password),
              t.xhrFields)
            )
              for (o in t.xhrFields) e[o] = t.xhrFields[o];
            t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType);
            t.crossDomain ||
              u['X-Requested-With'] ||
              (u['X-Requested-With'] = 'XMLHttpRequest');
            for (o in u) e.setRequestHeader(o, u[o]);
            i = function (n) {
              return function () {
                i &&
                  ((i = r = e.onload = e.onerror = e.onabort = e.onreadystatechange = null),
                  n === 'abort'
                    ? e.abort()
                    : n === 'error'
                    ? typeof e.status != 'number'
                      ? f(0, 'error')
                      : f(e.status, e.statusText)
                    : f(
                        sf[e.status] || e.status,
                        e.statusText,
                        (e.responseType || 'text') !== 'text' ||
                          typeof e.responseText != 'string'
                          ? { binary: e.response }
                          : { text: e.responseText },
                        e.getAllResponseHeaders()
                      ));
              };
            };
            e.onload = i();
            r = e.onerror = i('error');
            e.onabort !== undefined
              ? (e.onabort = r)
              : (e.onreadystatechange = function () {
                  e.readyState === 4 &&
                    n.setTimeout(function () {
                      i && r();
                    });
                });
            i = i('abort');
            try {
              e.send((t.hasContent && t.data) || null);
            } catch (s) {
              if (i) throw s;
            }
          },
          abort: function () {
            i && i();
          },
        };
    }),
    i.ajaxSetup({
      accepts: {
        script:
          'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        'text script': function (n) {
          return i.globalEval(n), n;
        },
      },
    }),
    i.ajaxPrefilter('script', function (n) {
      n.cache === undefined && (n.cache = !1);
      n.crossDomain && (n.type = 'GET');
    }),
    i.ajaxTransport('script', function (n) {
      if (n.crossDomain) {
        var r, t;
        return {
          send: function (f, e) {
            r = i('<script>')
              .prop({ charset: n.scriptCharset, src: n.url })
              .on(
                'load error',
                (t = function (n) {
                  r.remove();
                  t = null;
                  n && e(n.type === 'error' ? 404 : 200, n.type);
                })
              );
            u.head.appendChild(r[0]);
          },
          abort: function () {
            t && t();
          },
        };
      }
    }),
    (ki = []),
    (ni = /(=)\?(?=&|$)|\?\?/),
    i.ajaxSetup({
      jsonp: 'callback',
      jsonpCallback: function () {
        var n = ki.pop() || i.expando + '_' + ai++;
        return (this[n] = !0), n;
      },
    }),
    i.ajaxPrefilter('json jsonp', function (t, r, u) {
      var f,
        e,
        o,
        s =
          t.jsonp !== !1 &&
          (ni.test(t.url)
            ? 'url'
            : typeof t.data == 'string' &&
              (t.contentType || '').indexOf(
                'application/x-www-form-urlencoded'
              ) === 0 &&
              ni.test(t.data) &&
              'data');
      if (s || t.dataTypes[0] === 'jsonp')
        return (
          (f = t.jsonpCallback = i.isFunction(t.jsonpCallback)
            ? t.jsonpCallback()
            : t.jsonpCallback),
          s
            ? (t[s] = t[s].replace(ni, '$1' + f))
            : t.jsonp !== !1 &&
              (t.url += (vi.test(t.url) ? '&' : '?') + t.jsonp + '=' + f),
          (t.converters['script json'] = function () {
            return o || i.error(f + ' was not called'), o[0];
          }),
          (t.dataTypes[0] = 'json'),
          (e = n[f]),
          (n[f] = function () {
            o = arguments;
          }),
          u.always(function () {
            e === undefined ? i(n).removeProp(f) : (n[f] = e);
            t[f] && ((t.jsonpCallback = r.jsonpCallback), ki.push(f));
            o && i.isFunction(e) && e(o[0]);
            o = e = undefined;
          }),
          'script'
        );
    }),
    (i.parseHTML = function (n, t, r) {
      if (!n || typeof n != 'string') return null;
      typeof t == 'boolean' && ((r = t), (t = !1));
      t = t || u;
      var f = rr.exec(n),
        e = !r && [];
      return f
        ? [t.createElement(f[1])]
        : ((f = kr([n], t, e)),
          e && e.length && i(e).remove(),
          i.merge([], f.childNodes));
    }),
    (di = i.fn.load),
    (i.fn.load = function (n, t, r) {
      if (typeof n != 'string' && di) return di.apply(this, arguments);
      var u,
        o,
        s,
        f = this,
        e = n.indexOf(' ');
      return (
        e > -1 && ((u = i.trim(n.slice(e))), (n = n.slice(0, e))),
        i.isFunction(t)
          ? ((r = t), (t = undefined))
          : t && typeof t == 'object' && (o = 'POST'),
        f.length > 0 &&
          i
            .ajax({ url: n, type: o || 'GET', dataType: 'html', data: t })
            .done(function (n) {
              s = arguments;
              f.html(u ? i('<div>').append(i.parseHTML(n)).find(u) : n);
            })
            .always(
              r &&
                function (n, t) {
                  f.each(function () {
                    r.apply(this, s || [n.responseText, t, n]);
                  });
                }
            ),
        this
      );
    }),
    i.each(
      [
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend',
      ],
      function (n, t) {
        i.fn[t] = function (n) {
          return this.on(t, n);
        };
      }
    ),
    (i.expr.filters.animated = function (n) {
      return i.grep(i.timers, function (t) {
        return n === t.elem;
      }).length;
    }),
    (i.offset = {
      setOffset: function (n, t, r) {
        var e,
          o,
          s,
          h,
          u,
          c,
          v,
          l = i.css(n, 'position'),
          a = i(n),
          f = {};
        l === 'static' && (n.style.position = 'relative');
        u = a.offset();
        s = i.css(n, 'top');
        c = i.css(n, 'left');
        v = (l === 'absolute' || l === 'fixed') && (s + c).indexOf('auto') > -1;
        v
          ? ((e = a.position()), (h = e.top), (o = e.left))
          : ((h = parseFloat(s) || 0), (o = parseFloat(c) || 0));
        i.isFunction(t) && (t = t.call(n, r, i.extend({}, u)));
        t.top != null && (f.top = t.top - u.top + h);
        t.left != null && (f.left = t.left - u.left + o);
        'using' in t ? t.using.call(n, f) : a.css(f);
      },
    }),
    i.fn.extend({
      offset: function (n) {
        if (arguments.length)
          return n === undefined
            ? this
            : this.each(function (t) {
                i.offset.setOffset(this, n, t);
              });
        var t,
          f,
          r = this[0],
          u = { top: 0, left: 0 },
          e = r && r.ownerDocument;
        if (e)
          return ((t = e.documentElement), !i.contains(t, r))
            ? u
            : ((u = r.getBoundingClientRect()),
              (f = hf(e)),
              {
                top: u.top + f.pageYOffset - t.clientTop,
                left: u.left + f.pageXOffset - t.clientLeft,
              });
      },
      position: function () {
        if (this[0]) {
          var n,
            r,
            u = this[0],
            t = { top: 0, left: 0 };
          return (
            i.css(u, 'position') === 'fixed'
              ? (r = u.getBoundingClientRect())
              : ((n = this.offsetParent()),
                (r = this.offset()),
                i.nodeName(n[0], 'html') || (t = n.offset()),
                (t.top += i.css(n[0], 'borderTopWidth', !0)),
                (t.left += i.css(n[0], 'borderLeftWidth', !0))),
            {
              top: r.top - t.top - i.css(u, 'marginTop', !0),
              left: r.left - t.left - i.css(u, 'marginLeft', !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var n = this.offsetParent;
            n && i.css(n, 'position') === 'static';

          )
            n = n.offsetParent;
          return n || ht;
        });
      },
    }),
    i.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (
      n,
      t
    ) {
      var r = 'pageYOffset' === t;
      i.fn[n] = function (i) {
        return a(
          this,
          function (n, i, u) {
            var f = hf(n);
            if (u === undefined) return f ? f[t] : n[i];
            f
              ? f.scrollTo(r ? f.pageXOffset : u, r ? u : f.pageYOffset)
              : (n[i] = u);
          },
          n,
          i,
          arguments.length
        );
      };
    }),
    i.each(['top', 'left'], function (n, t) {
      i.cssHooks[t] = ci(f.pixelPosition, function (n, r) {
        if (r)
          return (r = tt(n, t)), si.test(r) ? i(n).position()[t] + 'px' : r;
      });
    }),
    i.each({ Height: 'height', Width: 'width' }, function (n, t) {
      i.each({ padding: 'inner' + n, content: t, '': 'outer' + n }, function (
        r,
        u
      ) {
        i.fn[u] = function (u, f) {
          var e = arguments.length && (r || typeof u != 'boolean'),
            o = r || (u === !0 || f === !0 ? 'margin' : 'border');
          return a(
            this,
            function (t, r, u) {
              var f;
              return i.isWindow(t)
                ? t.document.documentElement['client' + n]
                : t.nodeType === 9
                ? ((f = t.documentElement),
                  Math.max(
                    t.body['scroll' + n],
                    f['scroll' + n],
                    t.body['offset' + n],
                    f['offset' + n],
                    f['client' + n]
                  ))
                : u === undefined
                ? i.css(t, r, o)
                : i.style(t, r, u, o);
            },
            t,
            e ? u : undefined,
            e,
            null
          );
        };
      });
    }),
    i.fn.extend({
      bind: function (n, t, i) {
        return this.on(n, null, t, i);
      },
      unbind: function (n, t) {
        return this.off(n, null, t);
      },
      delegate: function (n, t, i, r) {
        return this.on(t, n, i, r);
      },
      undelegate: function (n, t, i) {
        return arguments.length === 1
          ? this.off(n, '**')
          : this.off(t, n || '**', i);
      },
      size: function () {
        return this.length;
      },
    }),
    (i.fn.andSelf = i.fn.addBack),
    typeof define == 'function' &&
      define.amd &&
      define('jquery', [], function () {
        return i;
      }),
    (cf = n.jQuery),
    (lf = n.$),
    (i.noConflict = function (t) {
      return n.$ === i && (n.$ = lf), t && n.jQuery === i && (n.jQuery = cf), i;
    }),
    t || (n.jQuery = n.$ = i),
    i
  );
}),
  (function (n) {
    var i, t;
    n.uaMatch = function (n) {
      n = n.toLowerCase();
      var t =
        /(chrome)[ \/]([\w.]+)/.exec(n) ||
        /(webkit)[ \/]([\w.]+)/.exec(n) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n) ||
        /(msie) ([\w.]+)/.exec(n) ||
        (n.indexOf('compatible') < 0 &&
          /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n)) ||
        [];
      return { browser: t[1] || '', version: t[2] || '0' };
    };
    i = n.uaMatch(navigator.userAgent);
    t = {};
    i.browser &&
      ((t[i.browser] = !0),
      (t.version = i.version),
      (t.msie = /(msie) ([\w.]+)/.test(navigator.userAgent)));
    t.chrome ? (t.webkit = !0) : t.webkit && (t.safari = !0);
    n.browser = t;
  })(jQuery);
jQuery.ui ||
  (function (n) {
    function s(t, i, r, u) {
      function e(r) {
        var u = n[t][i][r] || [];
        return typeof u == 'string' ? u.split(/,?\s+/) : u;
      }
      var f = e('getter');
      return (
        u.length == 1 &&
          typeof u[0] == 'string' &&
          (f = f.concat(e('getterSetter'))),
        n.inArray(r, f) != -1
      );
    }
    var u = n.fn.remove,
      f = n.browser.mozilla && parseFloat(n.browser.version) < 1.9;
    if (
      ((n.ui = {
        version: '1.7.3',
        plugin: {
          add: function (t, i, r) {
            var f = n.ui[t].prototype;
            for (var u in r)
              (f.plugins[u] = f.plugins[u] || []), f.plugins[u].push([i, r[u]]);
          },
          call: function (n, t, i) {
            var u = n.plugins[t],
              r;
            if (u && n.element[0].parentNode)
              for (r = 0; r < u.length; r++)
                n.options[u[r][0]] && u[r][1].apply(n.element, i);
          },
        },
        contains: function (n, t) {
          return document.compareDocumentPosition
            ? n.compareDocumentPosition(t) & 16
            : n !== t && n.contains(t);
        },
        hasScroll: function (t, i) {
          if (n(t).css('overflow') == 'hidden') return !1;
          var r = i && i == 'left' ? 'scrollLeft' : 'scrollTop',
            u = !1;
          return t[r] > 0 ? !0 : ((t[r] = 1), (u = t[r] > 0), (t[r] = 0), u);
        },
        isOverAxis: function (n, t, i) {
          return n > t && n < t + i;
        },
        isOver: function (t, i, r, u, f, e) {
          return n.ui.isOverAxis(t, r, f) && n.ui.isOverAxis(i, u, e);
        },
        keyCode: {
          BACKSPACE: 8,
          CAPS_LOCK: 20,
          COMMA: 188,
          CONTROL: 17,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          INSERT: 45,
          LEFT: 37,
          NUMPAD_ADD: 107,
          NUMPAD_DECIMAL: 110,
          NUMPAD_DIVIDE: 111,
          NUMPAD_ENTER: 108,
          NUMPAD_MULTIPLY: 106,
          NUMPAD_SUBTRACT: 109,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SHIFT: 16,
          SPACE: 32,
          TAB: 9,
          UP: 38,
        },
      }),
      f)
    ) {
      var i = n.attr,
        e = n.fn.removeAttr,
        r = 'http://www.w3.org/2005/07/aaa',
        t = /^aria-/,
        o = /^wairole:/;
      n.attr = function (n, u, f) {
        var e = f !== undefined;
        return u == 'role'
          ? e
            ? i.call(this, n, u, 'wairole:' + f)
            : (i.apply(this, arguments) || '').replace(o, '')
          : t.test(u)
          ? e
            ? n.setAttributeNS(r, u.replace(t, 'aaa:'), f)
            : i.call(this, n, u.replace(t, 'aaa:'))
          : i.apply(this, arguments);
      };
      n.fn.removeAttr = function (n) {
        return t.test(n)
          ? this.each(function () {
              this.removeAttributeNS(r, n.replace(t, ''));
            })
          : e.call(this, n);
      };
    }
    n.fn.extend({
      remove: function (t, i) {
        return this.each(function () {
          return (
            i ||
              ((!t || n.filter(t, [this]).length) &&
                n('*', this)
                  .add(this)
                  .each(function () {
                    n(this).triggerHandler('remove');
                  })),
            u.call(n(this), t, i)
          );
        });
      },
      enableSelection: function () {
        return this.attr('unselectable', 'off')
          .css('MozUserSelect', '')
          .unbind('selectstart.ui');
      },
      disableSelection: function () {
        return this.attr('unselectable', 'on')
          .css('MozUserSelect', 'none')
          .bind('selectstart.ui', function () {
            return !1;
          });
      },
      scrollParent: function () {
        var t;
        return (
          (t =
            (n.browser.msie &&
              /(static|relative)/.test(this.css('position'))) ||
            /absolute/.test(this.css('position'))
              ? this.parents()
                  .filter(function () {
                    return (
                      /(relative|absolute|fixed)/.test(
                        n.curCSS(this, 'position', 1)
                      ) &&
                      /(auto|scroll)/.test(
                        n.curCSS(this, 'overflow', 1) +
                          n.curCSS(this, 'overflow-y', 1) +
                          n.curCSS(this, 'overflow-x', 1)
                      )
                    );
                  })
                  .eq(0)
              : this.parents()
                  .filter(function () {
                    return /(auto|scroll)/.test(
                      n.curCSS(this, 'overflow', 1) +
                        n.curCSS(this, 'overflow-y', 1) +
                        n.curCSS(this, 'overflow-x', 1)
                    );
                  })
                  .eq(0)),
          /fixed/.test(this.css('position')) || !t.length ? n(document) : t
        );
      },
    });
    n.extend(n.expr[':'], {
      data: function (t, i, r) {
        return !!n.data(t, r[3]);
      },
      focusable: function (t) {
        var i = t.nodeName.toLowerCase(),
          r = n.attr(t, 'tabindex');
        return (
          (/input|select|textarea|button|object/.test(i)
            ? !t.disabled
            : 'a' == i || 'area' == i
            ? t.href || !isNaN(r)
            : !isNaN(r)) &&
          !n(t)['area' == i ? 'parents' : 'closest'](':hidden').length
        );
      },
      tabbable: function (t) {
        var i = n.attr(t, 'tabindex');
        return (isNaN(i) || i >= 0) && n(t).is(':focusable');
      },
    });
    n.widget = function (t, i) {
      var r = t.split('.')[0];
      t = t.split('.')[1];
      n.fn[t] = function (i) {
        var u = typeof i == 'string',
          e = Array.prototype.slice.call(arguments, 1),
          f;
        return u && i.substring(0, 1) == '_'
          ? this
          : u && s(r, t, i, e)
          ? ((f = n.data(this[0], t)), f ? f[i].apply(f, e) : undefined)
          : this.each(function () {
              var f = n.data(this, t);
              f || u || n.data(this, t, new n[r][t](this, i))._init();
              f && u && n.isFunction(f[i]) && f[i].apply(f, e);
            });
      };
      n[r] = n[r] || {};
      n[r][t] = function (i, u) {
        var f = this;
        this.namespace = r;
        this.widgetName = t;
        this.widgetEventPrefix = n[r][t].eventPrefix || t;
        this.widgetBaseClass = r + '-' + t;
        this.options = n.extend(
          {},
          n.widget.defaults,
          n[r][t].defaults,
          n.metadata && n.metadata.get(i)[t],
          u
        );
        this.element = n(i)
          .bind('setData.' + t, function (n, t, r) {
            if (n.target == i) return f._setData(t, r);
          })
          .bind('getData.' + t, function (n, t) {
            if (n.target == i) return f._getData(t);
          })
          .bind('remove', function () {
            return f.destroy();
          });
      };
      n[r][t].prototype = n.extend({}, n.widget.prototype, i);
      n[r][t].getterSetter = 'option';
    };
    n.widget.prototype = {
      _init: function () {},
      destroy: function () {
        this.element
          .removeData(this.widgetName)
          .removeClass(
            this.widgetBaseClass +
              '-disabled ' +
              this.namespace +
              '-state-disabled'
          )
          .removeAttr('aria-disabled');
      },
      option: function (t, i) {
        var r = t,
          u = this;
        if (typeof t == 'string') {
          if (i === undefined) return this._getData(t);
          r = {};
          r[t] = i;
        }
        n.each(r, function (n, t) {
          u._setData(n, t);
        });
      },
      _getData: function (n) {
        return this.options[n];
      },
      _setData: function (n, t) {
        this.options[n] = t;
        n == 'disabled' &&
          this.element[t ? 'addClass' : 'removeClass'](
            this.widgetBaseClass +
              '-disabled ' +
              this.namespace +
              '-state-disabled'
          ).attr('aria-disabled', t);
      },
      enable: function () {
        this._setData('disabled', !1);
      },
      disable: function () {
        this._setData('disabled', !0);
      },
      _trigger: function (t, i, r) {
        var e = this.options[t],
          o = t == this.widgetEventPrefix ? t : this.widgetEventPrefix + t,
          u,
          f;
        if (((i = n.Event(i)), (i.type = o), i.originalEvent))
          for (u = n.event.props.length; u; )
            (f = n.event.props[--u]), (i[f] = i.originalEvent[f]);
        return (
          this.element.trigger(i, r),
          !(
            (n.isFunction(e) && e.call(this.element[0], i, r) === !1) ||
            i.isDefaultPrevented()
          )
        );
      },
    };
    n.widget.defaults = { disabled: !1 };
    n.ui.mouse = {
      _mouseInit: function () {
        var t = this;
        this.element
          .bind('mousedown.' + this.widgetName, function (n) {
            return t._mouseDown(n);
          })
          .bind('click.' + this.widgetName, function (n) {
            if (t._preventClickEvent)
              return (
                (t._preventClickEvent = !1), n.stopImmediatePropagation(), !1
              );
          });
        n.browser.msie &&
          ((this._mouseUnselectable = this.element.attr('unselectable')),
          this.element.attr('unselectable', 'on'));
        this.started = !1;
      },
      _mouseDestroy: function () {
        this.element.unbind('.' + this.widgetName);
        n.browser.msie &&
          this.element.attr('unselectable', this._mouseUnselectable);
      },
      _mouseDown: function (t) {
        if (
          ((t.originalEvent = t.originalEvent || {}),
          !t.originalEvent.mouseHandled)
        ) {
          this._mouseStarted && this._mouseUp(t);
          this._mouseDownEvent = t;
          var i = this,
            r = t.which == 1,
            u =
              typeof this.options.cancel == 'string'
                ? n(t.target)
                    .parents()
                    .add(t.target)
                    .filter(this.options.cancel).length
                : !1;
          return !r || u || !this._mouseCapture(t)
            ? !0
            : ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  i.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(t) &&
                this._mouseDelayMet(t) &&
                ((this._mouseStarted = this._mouseStart(t) !== !1),
                !this._mouseStarted))
            ? (t.preventDefault(), !0)
            : ((this._mouseMoveDelegate = function (n) {
                return i._mouseMove(n);
              }),
              (this._mouseUpDelegate = function (n) {
                return i._mouseUp(n);
              }),
              n(document)
                .bind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
                .bind('mouseup.' + this.widgetName, this._mouseUpDelegate),
              n.browser.safari || t.preventDefault(),
              (t.originalEvent.mouseHandled = !0),
              !0);
        }
      },
      _mouseMove: function (t) {
        return n.browser.msie && !t.button
          ? this._mouseUp(t)
          : this._mouseStarted
          ? (this._mouseDrag(t), t.preventDefault())
          : (this._mouseDistanceMet(t) &&
              this._mouseDelayMet(t) &&
              ((this._mouseStarted =
                this._mouseStart(this._mouseDownEvent, t) !== !1),
              this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted);
      },
      _mouseUp: function (t) {
        return (
          n(document)
            .unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
            .unbind('mouseup.' + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            (this._preventClickEvent = t.target == this._mouseDownEvent.target),
            this._mouseStop(t)),
          !1
        );
      },
      _mouseDistanceMet: function (n) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - n.pageX),
            Math.abs(this._mouseDownEvent.pageY - n.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function (n) {
        return this.mouseDelayMet;
      },
      _mouseStart: function (n) {},
      _mouseDrag: function (n) {},
      _mouseStop: function (n) {},
      _mouseCapture: function (n) {
        return !0;
      },
    };
    n.ui.mouse.defaults = { cancel: null, distance: 1, delay: 0 };
  })(jQuery),
  (function (n) {
    n.widget(
      'ui.draggable',
      n.extend({}, n.ui.mouse, {
        _init: function () {
          this.options.helper != 'original' ||
            /^(?:r|a|f)/.test(this.element.css('position')) ||
            (this.element[0].style.position = 'relative');
          this.options.addClasses && this.element.addClass('ui-draggable');
          this.options.disabled &&
            this.element.addClass('ui-draggable-disabled');
          this._mouseInit();
        },
        destroy: function () {
          this.element.data('draggable') &&
            (this.element
              .removeData('draggable')
              .unbind('.draggable')
              .removeClass(
                'ui-draggable ui-draggable-dragging ui-draggable-disabled'
              ),
            this._mouseDestroy());
        },
        _mouseCapture: function (t) {
          var i = this.options;
          return this.helper ||
            i.disabled ||
            n(t.target).is('.ui-resizable-handle')
            ? !1
            : ((this.handle = this._getHandle(t)), !this.handle)
            ? !1
            : !0;
        },
        _mouseStart: function (t) {
          var i = this.options;
          return (
            (this.helper = this._createHelper(t)),
            this._cacheHelperProportions(),
            n.ui.ddmanager && (n.ui.ddmanager.current = this),
            this._cacheMargins(),
            (this.cssPosition = this.helper.css('position')),
            (this.scrollParent = this.helper.scrollParent()),
            (this.offset = this.element.offset()),
            (this.offset = {
              top: this.offset.top - this.margins.top,
              left: this.offset.left - this.margins.left,
            }),
            n.extend(this.offset, {
              click: {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top,
              },
              parent: this._getParentOffset(),
              relative: this._getRelativeOffset(),
            }),
            (this.originalPosition = this._generatePosition(t)),
            (this.originalPageX = t.pageX),
            (this.originalPageY = t.pageY),
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            i.containment && this._setContainment(),
            this._trigger('start', t),
            this._cacheHelperProportions(),
            n.ui.ddmanager &&
              !i.dropBehaviour &&
              n.ui.ddmanager.prepareOffsets(this, t),
            this.helper.addClass('ui-draggable-dragging'),
            this._mouseDrag(t, !0),
            !0
          );
        },
        _mouseDrag: function (t, i) {
          if (
            ((this.position = this._generatePosition(t)),
            (this.positionAbs = this._convertPositionTo('absolute')),
            !i)
          ) {
            var r = this._uiHash();
            this._trigger('drag', t, r);
            this.position = r.position;
          }
          return (
            (this.options.axis && this.options.axis == 'y') ||
              (this.helper[0].style.left = this.position.left + 'px'),
            (this.options.axis && this.options.axis == 'x') ||
              (this.helper[0].style.top = this.position.top + 'px'),
            n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
            !1
          );
        },
        _mouseStop: function (t) {
          var i = !1,
            r;
          return (
            n.ui.ddmanager &&
              !this.options.dropBehaviour &&
              (i = n.ui.ddmanager.drop(this, t)),
            this.dropped && ((i = this.dropped), (this.dropped = !1)),
            (this.options.revert == 'invalid' && !i) ||
            (this.options.revert == 'valid' && i) ||
            this.options.revert === !0 ||
            (n.isFunction(this.options.revert) &&
              this.options.revert.call(this.element, i))
              ? ((r = this),
                n(this.helper).animate(
                  this.originalPosition,
                  parseInt(this.options.revertDuration, 10),
                  function () {
                    r._trigger('stop', t);
                    r._clear();
                  }
                ))
              : (this._trigger('stop', t), this._clear()),
            !1
          );
        },
        _getHandle: function (t) {
          var i =
            !this.options.handle || !n(this.options.handle, this.element).length
              ? !0
              : !1;
          return (
            n(this.options.handle, this.element)
              .find('*')
              .andSelf()
              .each(function () {
                this == t.target && (i = !0);
              }),
            i
          );
        },
        _createHelper: function (t) {
          var r = this.options,
            i = n.isFunction(r.helper)
              ? n(r.helper.apply(this.element[0], [t]))
              : r.helper == 'clone'
              ? this.element.clone()
              : this.element;
          return (
            i.parents('body').length ||
              i.appendTo(
                r.appendTo == 'parent' ? this.element[0].parentNode : r.appendTo
              ),
            i[0] == this.element[0] ||
              /(fixed|absolute)/.test(i.css('position')) ||
              i.css('position', 'absolute'),
            i
          );
        },
        _adjustOffsetFromHelper: function (n) {
          n.left != undefined &&
            (this.offset.click.left = n.left + this.margins.left);
          n.right != undefined &&
            (this.offset.click.left =
              this.helperProportions.width - n.right + this.margins.left);
          n.top != undefined &&
            (this.offset.click.top = n.top + this.margins.top);
          n.bottom != undefined &&
            (this.offset.click.top =
              this.helperProportions.height - n.bottom + this.margins.top);
        },
        _getParentOffset: function () {
          this.offsetParent = this.helper.offsetParent();
          var t = this.offsetParent.offset();
          return (
            this.cssPosition == 'absolute' &&
              this.scrollParent[0] != document &&
              n.ui.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((t.left += this.scrollParent.scrollLeft()),
              (t.top += this.scrollParent.scrollTop())),
            (this.offsetParent[0] == document.body ||
              (this.offsetParent[0].tagName &&
                this.offsetParent[0].tagName.toLowerCase() == 'html' &&
                n.browser.msie)) &&
              (t = { top: 0, left: 0 }),
            {
              top:
                t.top +
                (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
              left:
                t.left +
                (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if (this.cssPosition == 'relative') {
            var n = this.element.position();
            return {
              top:
                n.top -
                (parseInt(this.helper.css('top'), 10) || 0) +
                this.scrollParent.scrollTop(),
              left:
                n.left -
                (parseInt(this.helper.css('left'), 10) || 0) +
                this.scrollParent.scrollLeft(),
            };
          } else return { top: 0, left: 0 };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.element.css('marginLeft'), 10) || 0,
            top: parseInt(this.element.css('marginTop'), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var i = this.options,
            t,
            r,
            u;
          if (
            (i.containment == 'parent' &&
              (i.containment = this.helper[0].parentNode),
            (i.containment == 'document' || i.containment == 'window') &&
              (this.containment = [
                0 - this.offset.relative.left - this.offset.parent.left,
                0 - this.offset.relative.top - this.offset.parent.top,
                n(i.containment == 'document' ? document : window).width() -
                  this.helperProportions.width -
                  this.margins.left,
                (n(i.containment == 'document' ? document : window).height() ||
                  document.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
            /^(document|window|parent)$/.test(i.containment) ||
              i.containment.constructor == Array)
          )
            i.containment.constructor == Array &&
              (this.containment = i.containment);
          else {
            if (((t = n(i.containment)[0]), !t)) return;
            r = n(i.containment).offset();
            u = n(t).css('overflow') != 'hidden';
            this.containment = [
              r.left +
                (parseInt(n(t).css('borderLeftWidth'), 10) || 0) +
                (parseInt(n(t).css('paddingLeft'), 10) || 0) -
                this.margins.left,
              r.top +
                (parseInt(n(t).css('borderTopWidth'), 10) || 0) +
                (parseInt(n(t).css('paddingTop'), 10) || 0) -
                this.margins.top,
              r.left +
                (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) -
                (parseInt(n(t).css('borderLeftWidth'), 10) || 0) -
                (parseInt(n(t).css('paddingRight'), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              r.top +
                (u
                  ? Math.max(t.scrollHeight, t.offsetHeight)
                  : t.offsetHeight) -
                (parseInt(n(t).css('borderTopWidth'), 10) || 0) -
                (parseInt(n(t).css('paddingBottom'), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
            ];
          }
        },
        _convertPositionTo: function (t, i) {
          i || (i = this.position);
          var r = t == 'absolute' ? 1 : -1,
            e = this.options,
            u =
              this.cssPosition == 'absolute' &&
              !(
                this.scrollParent[0] != document &&
                n.ui.contains(this.scrollParent[0], this.offsetParent[0])
              )
                ? this.offsetParent
                : this.scrollParent,
            f = /(html|body)/i.test(u[0].tagName);
          return {
            top:
              i.top +
              this.offset.relative.top * r +
              this.offset.parent.top * r -
              (n.browser.safari && this.cssPosition == 'fixed'
                ? 0
                : (this.cssPosition == 'fixed'
                    ? -this.scrollParent.scrollTop()
                    : f
                    ? 0
                    : u.scrollTop()) * r),
            left:
              i.left +
              this.offset.relative.left * r +
              this.offset.parent.left * r -
              (n.browser.safari && this.cssPosition == 'fixed'
                ? 0
                : (this.cssPosition == 'fixed'
                    ? -this.scrollParent.scrollLeft()
                    : f
                    ? 0
                    : u.scrollLeft()) * r),
          };
        },
        _generatePosition: function (t) {
          var i = this.options,
            o =
              this.cssPosition == 'absolute' &&
              !(
                this.scrollParent[0] != document &&
                n.ui.contains(this.scrollParent[0], this.offsetParent[0])
              )
                ? this.offsetParent
                : this.scrollParent,
            s = /(html|body)/i.test(o[0].tagName),
            f,
            e,
            r,
            u;
          return (
            this.cssPosition != 'relative' ||
              (this.scrollParent[0] != document &&
                this.scrollParent[0] != this.offsetParent[0]) ||
              (this.offset.relative = this._getRelativeOffset()),
            (f = t.pageX),
            (e = t.pageY),
            this.originalPosition &&
              (this.containment &&
                (t.pageX - this.offset.click.left < this.containment[0] &&
                  (f = this.containment[0] + this.offset.click.left),
                t.pageY - this.offset.click.top < this.containment[1] &&
                  (e = this.containment[1] + this.offset.click.top),
                t.pageX - this.offset.click.left > this.containment[2] &&
                  (f = this.containment[2] + this.offset.click.left),
                t.pageY - this.offset.click.top > this.containment[3] &&
                  (e = this.containment[3] + this.offset.click.top)),
              i.grid &&
                ((r =
                  this.originalPageY +
                  Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1]),
                (e = this.containment
                  ? r - this.offset.click.top < this.containment[1] ||
                    r - this.offset.click.top > this.containment[3]
                    ? r - this.offset.click.top < this.containment[1]
                      ? r + i.grid[1]
                      : r - i.grid[1]
                    : r
                  : r),
                (u =
                  this.originalPageX +
                  Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0]),
                (f = this.containment
                  ? u - this.offset.click.left < this.containment[0] ||
                    u - this.offset.click.left > this.containment[2]
                    ? u - this.offset.click.left < this.containment[0]
                      ? u + i.grid[0]
                      : u - i.grid[0]
                    : u
                  : u))),
            {
              top:
                e -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                (n.browser.safari && this.cssPosition == 'fixed'
                  ? 0
                  : this.cssPosition == 'fixed'
                  ? -this.scrollParent.scrollTop()
                  : s
                  ? 0
                  : o.scrollTop()),
              left:
                f -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                (n.browser.safari && this.cssPosition == 'fixed'
                  ? 0
                  : this.cssPosition == 'fixed'
                  ? -this.scrollParent.scrollLeft()
                  : s
                  ? 0
                  : o.scrollLeft()),
            }
          );
        },
        _clear: function () {
          this.helper.removeClass('ui-draggable-dragging');
          this.helper[0] == this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove();
          this.helper = null;
          this.cancelHelperRemoval = !1;
        },
        _trigger: function (t, i, r) {
          return (
            (r = r || this._uiHash()),
            n.ui.plugin.call(this, t, [i, r]),
            t == 'drag' &&
              (this.positionAbs = this._convertPositionTo('absolute')),
            n.widget.prototype._trigger.call(this, t, i, r)
          );
        },
        plugins: {},
        _uiHash: function (n) {
          return {
            helper: this.helper,
            position: this.position,
            absolutePosition: this.positionAbs,
            offset: this.positionAbs,
          };
        },
      })
    );
    n.extend(n.ui.draggable, {
      version: '1.7.3',
      eventPrefix: 'drag',
      defaults: {
        addClasses: !0,
        appendTo: 'parent',
        axis: !1,
        cancel: ':input,option',
        connectToSortable: !1,
        containment: !1,
        cursor: 'auto',
        cursorAt: !1,
        delay: 0,
        distance: 1,
        grid: !1,
        handle: !1,
        helper: 'original',
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: 'default',
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: 'both',
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
      },
    });
    n.ui.plugin.add('draggable', 'connectToSortable', {
      start: function (t, i) {
        var r = n(this).data('draggable'),
          u = r.options,
          f = n.extend({}, i, { item: r.element });
        r.sortables = [];
        n(u.connectToSortable).each(function () {
          var i = n.data(this, 'sortable');
          i &&
            !i.options.disabled &&
            (r.sortables.push({ instance: i, shouldRevert: i.options.revert }),
            i._refreshItems(),
            i._trigger('activate', t, f));
        });
      },
      stop: function (t, i) {
        var r = n(this).data('draggable'),
          u = n.extend({}, i, { item: r.element });
        n.each(r.sortables, function () {
          this.instance.isOver
            ? ((this.instance.isOver = 0),
              (r.cancelHelperRemoval = !0),
              (this.instance.cancelHelperRemoval = !1),
              this.shouldRevert && (this.instance.options.revert = !0),
              this.instance._mouseStop(t),
              (this.instance.options.helper = this.instance.options._helper),
              r.options.helper == 'original' &&
                this.instance.currentItem.css({ top: 'auto', left: 'auto' }))
            : ((this.instance.cancelHelperRemoval = !1),
              this.instance._trigger('deactivate', t, u));
        });
      },
      drag: function (t, i) {
        var r = n(this).data('draggable'),
          u = this,
          f = function (t) {
            var i = this.offset.click.top,
              r = this.offset.click.left,
              u = this.positionAbs.top,
              f = this.positionAbs.left,
              e = t.height,
              o = t.width,
              s = t.top,
              h = t.left;
            return n.ui.isOver(u + i, f + r, s, h, e, o);
          };
        n.each(r.sortables, function (f) {
          this.instance.positionAbs = r.positionAbs;
          this.instance.helperProportions = r.helperProportions;
          this.instance.offset.click = r.offset.click;
          this.instance._intersectsWith(this.instance.containerCache)
            ? (this.instance.isOver ||
                ((this.instance.isOver = 1),
                (this.instance.currentItem = n(u)
                  .clone()
                  .appendTo(this.instance.element)
                  .data('sortable-item', !0)),
                (this.instance.options._helper = this.instance.options.helper),
                (this.instance.options.helper = function () {
                  return i.helper[0];
                }),
                (t.target = this.instance.currentItem[0]),
                this.instance._mouseCapture(t, !0),
                this.instance._mouseStart(t, !0, !0),
                (this.instance.offset.click.top = r.offset.click.top),
                (this.instance.offset.click.left = r.offset.click.left),
                (this.instance.offset.parent.left -=
                  r.offset.parent.left - this.instance.offset.parent.left),
                (this.instance.offset.parent.top -=
                  r.offset.parent.top - this.instance.offset.parent.top),
                r._trigger('toSortable', t),
                (r.dropped = this.instance.element),
                (r.currentItem = r.element),
                (this.instance.fromOutside = r)),
              this.instance.currentItem && this.instance._mouseDrag(t))
            : this.instance.isOver &&
              ((this.instance.isOver = 0),
              (this.instance.cancelHelperRemoval = !0),
              (this.instance.options.revert = !1),
              this.instance._trigger(
                'out',
                t,
                this.instance._uiHash(this.instance)
              ),
              this.instance._mouseStop(t, !0),
              (this.instance.options.helper = this.instance.options._helper),
              this.instance.currentItem.remove(),
              this.instance.placeholder && this.instance.placeholder.remove(),
              r._trigger('fromSortable', t),
              (r.dropped = !1));
        });
      },
    });
    n.ui.plugin.add('draggable', 'cursor', {
      start: function (t, i) {
        var r = n('body'),
          u = n(this).data('draggable').options;
        r.css('cursor') && (u._cursor = r.css('cursor'));
        r.css('cursor', u.cursor);
      },
      stop: function (t, i) {
        var r = n(this).data('draggable').options;
        r._cursor && n('body').css('cursor', r._cursor);
      },
    });
    n.ui.plugin.add('draggable', 'iframeFix', {
      start: function (t, i) {
        var r = n(this).data('draggable').options;
        n(r.iframeFix === !0 ? 'iframe' : r.iframeFix).each(function () {
          n(
            '<div class="ui-draggable-iframeFix" style="background: #fff;"></div>'
          )
            .css({
              width: this.offsetWidth + 'px',
              height: this.offsetHeight + 'px',
              position: 'absolute',
              opacity: '0.001',
              zIndex: 1e3,
            })
            .css(n(this).offset())
            .appendTo('body');
        });
      },
      stop: function (t, i) {
        n('div.ui-draggable-iframeFix').each(function () {
          this.parentNode.removeChild(this);
        });
      },
    });
    n.ui.plugin.add('draggable', 'opacity', {
      start: function (t, i) {
        var r = n(i.helper),
          u = n(this).data('draggable').options;
        r.css('opacity') && (u._opacity = r.css('opacity'));
        r.css('opacity', u.opacity);
      },
      stop: function (t, i) {
        var r = n(this).data('draggable').options;
        r._opacity && n(i.helper).css('opacity', r._opacity);
      },
    });
    n.ui.plugin.add('draggable', 'scroll', {
      start: function (t, i) {
        var r = n(this).data('draggable');
        r.scrollParent[0] != document &&
          r.scrollParent[0].tagName != 'HTML' &&
          (r.overflowOffset = r.scrollParent.offset());
      },
      drag: function (t, i) {
        var u = n(this).data('draggable'),
          r = u.options,
          f = !1;
        u.scrollParent[0] != document && u.scrollParent[0].tagName != 'HTML'
          ? ((r.axis && r.axis == 'x') ||
              (u.overflowOffset.top + u.scrollParent[0].offsetHeight - t.pageY <
              r.scrollSensitivity
                ? (u.scrollParent[0].scrollTop = f =
                    u.scrollParent[0].scrollTop + r.scrollSpeed)
                : t.pageY - u.overflowOffset.top < r.scrollSensitivity &&
                  (u.scrollParent[0].scrollTop = f =
                    u.scrollParent[0].scrollTop - r.scrollSpeed)),
            (r.axis && r.axis == 'y') ||
              (u.overflowOffset.left + u.scrollParent[0].offsetWidth - t.pageX <
              r.scrollSensitivity
                ? (u.scrollParent[0].scrollLeft = f =
                    u.scrollParent[0].scrollLeft + r.scrollSpeed)
                : t.pageX - u.overflowOffset.left < r.scrollSensitivity &&
                  (u.scrollParent[0].scrollLeft = f =
                    u.scrollParent[0].scrollLeft - r.scrollSpeed)))
          : ((r.axis && r.axis == 'x') ||
              (t.pageY - n(document).scrollTop() < r.scrollSensitivity
                ? (f = n(document).scrollTop(
                    n(document).scrollTop() - r.scrollSpeed
                  ))
                : n(window).height() - (t.pageY - n(document).scrollTop()) <
                    r.scrollSensitivity &&
                  (f = n(document).scrollTop(
                    n(document).scrollTop() + r.scrollSpeed
                  ))),
            (r.axis && r.axis == 'y') ||
              (t.pageX - n(document).scrollLeft() < r.scrollSensitivity
                ? (f = n(document).scrollLeft(
                    n(document).scrollLeft() - r.scrollSpeed
                  ))
                : n(window).width() - (t.pageX - n(document).scrollLeft()) <
                    r.scrollSensitivity &&
                  (f = n(document).scrollLeft(
                    n(document).scrollLeft() + r.scrollSpeed
                  ))));
        f !== !1 &&
          n.ui.ddmanager &&
          !r.dropBehaviour &&
          n.ui.ddmanager.prepareOffsets(u, t);
      },
    });
    n.ui.plugin.add('draggable', 'snap', {
      start: function (t, i) {
        var r = n(this).data('draggable'),
          u = r.options;
        r.snapElements = [];
        n(
          u.snap.constructor != String
            ? u.snap.items || ':data(draggable)'
            : u.snap
        ).each(function () {
          var t = n(this),
            i = t.offset();
          this != r.element[0] &&
            r.snapElements.push({
              item: this,
              width: t.outerWidth(),
              height: t.outerHeight(),
              top: i.top,
              left: i.left,
            });
        });
      },
      drag: function (t, i) {
        for (
          var d,
            r = n(this).data('draggable'),
            k = r.options,
            u = k.snapTolerance,
            c = i.offset.left,
            a = c + r.helperProportions.width,
            l = i.offset.top,
            v = l + r.helperProportions.height,
            f = r.snapElements.length - 1;
          f >= 0;
          f--
        ) {
          var e = r.snapElements[f].left,
            s = e + r.snapElements[f].width,
            o = r.snapElements[f].top,
            h = o + r.snapElements[f].height;
          if (
            !(
              (e - u < c && c < s + u && o - u < l && l < h + u) ||
              (e - u < c && c < s + u && o - u < v && v < h + u) ||
              (e - u < a && a < s + u && o - u < l && l < h + u) ||
              (e - u < a && a < s + u && o - u < v && v < h + u)
            )
          ) {
            r.snapElements[f].snapping &&
              r.options.snap.release &&
              r.options.snap.release.call(
                r.element,
                t,
                n.extend(r._uiHash(), { snapItem: r.snapElements[f].item })
              );
            r.snapElements[f].snapping = !1;
            continue;
          }
          if (k.snapMode != 'inner') {
            var y = Math.abs(o - v) <= u,
              p = Math.abs(h - l) <= u,
              w = Math.abs(e - a) <= u,
              b = Math.abs(s - c) <= u;
            y &&
              (i.position.top =
                r._convertPositionTo('relative', {
                  top: o - r.helperProportions.height,
                  left: 0,
                }).top - r.margins.top);
            p &&
              (i.position.top =
                r._convertPositionTo('relative', { top: h, left: 0 }).top -
                r.margins.top);
            w &&
              (i.position.left =
                r._convertPositionTo('relative', {
                  top: 0,
                  left: e - r.helperProportions.width,
                }).left - r.margins.left);
            b &&
              (i.position.left =
                r._convertPositionTo('relative', { top: 0, left: s }).left -
                r.margins.left);
          }
          if (((d = y || p || w || b), k.snapMode != 'outer')) {
            var y = Math.abs(o - l) <= u,
              p = Math.abs(h - v) <= u,
              w = Math.abs(e - c) <= u,
              b = Math.abs(s - a) <= u;
            y &&
              (i.position.top =
                r._convertPositionTo('relative', { top: o, left: 0 }).top -
                r.margins.top);
            p &&
              (i.position.top =
                r._convertPositionTo('relative', {
                  top: h - r.helperProportions.height,
                  left: 0,
                }).top - r.margins.top);
            w &&
              (i.position.left =
                r._convertPositionTo('relative', { top: 0, left: e }).left -
                r.margins.left);
            b &&
              (i.position.left =
                r._convertPositionTo('relative', {
                  top: 0,
                  left: s - r.helperProportions.width,
                }).left - r.margins.left);
          }
          !r.snapElements[f].snapping &&
            (y || p || w || b || d) &&
            r.options.snap.snap &&
            r.options.snap.snap.call(
              r.element,
              t,
              n.extend(r._uiHash(), { snapItem: r.snapElements[f].item })
            );
          r.snapElements[f].snapping = y || p || w || b || d;
        }
      },
    });
    n.ui.plugin.add('draggable', 'stack', {
      start: function (t, i) {
        var r = n(this).data('draggable').options,
          u = n.makeArray(n(r.stack.group)).sort(function (t, i) {
            return (
              (parseInt(n(t).css('zIndex'), 10) || r.stack.min) -
              (parseInt(n(i).css('zIndex'), 10) || r.stack.min)
            );
          });
        n(u).each(function (n) {
          this.style.zIndex = r.stack.min + n;
        });
        this[0].style.zIndex = r.stack.min + u.length;
      },
    });
    n.ui.plugin.add('draggable', 'zIndex', {
      start: function (t, i) {
        var r = n(i.helper),
          u = n(this).data('draggable').options;
        r.css('zIndex') && (u._zIndex = r.css('zIndex'));
        r.css('zIndex', u.zIndex);
      },
      stop: function (t, i) {
        var r = n(this).data('draggable').options;
        r._zIndex && n(i.helper).css('zIndex', r._zIndex);
      },
    });
  })(jQuery),
  (function (n) {
    n.widget('ui.droppable', {
      _init: function () {
        var t = this.options,
          i = t.accept;
        this.isover = 0;
        this.isout = 1;
        this.options.accept =
          this.options.accept && n.isFunction(this.options.accept)
            ? this.options.accept
            : function (n) {
                return n.is(i);
              };
        this.proportions = {
          width: this.element[0].offsetWidth,
          height: this.element[0].offsetHeight,
        };
        n.ui.ddmanager.droppables[this.options.scope] =
          n.ui.ddmanager.droppables[this.options.scope] || [];
        n.ui.ddmanager.droppables[this.options.scope].push(this);
        this.options.addClasses && this.element.addClass('ui-droppable');
      },
      destroy: function () {
        for (
          var i = n.ui.ddmanager.droppables[this.options.scope], t = 0;
          t < i.length;
          t++
        )
          i[t] == this && i.splice(t, 1);
        this.element
          .removeClass('ui-droppable ui-droppable-disabled')
          .removeData('droppable')
          .unbind('.droppable');
      },
      _setData: function (t, i) {
        t == 'accept'
          ? (this.options.accept =
              i && n.isFunction(i)
                ? i
                : function (n) {
                    return n.is(i);
                  })
          : n.widget.prototype._setData.apply(this, arguments);
      },
      _activate: function (t) {
        var i = n.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.addClass(this.options.activeClass);
        i && this._trigger('activate', t, this.ui(i));
      },
      _deactivate: function (t) {
        var i = n.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.removeClass(this.options.activeClass);
        i && this._trigger('deactivate', t, this.ui(i));
      },
      _over: function (t) {
        var i = n.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] != this.element[0] &&
          this.options.accept.call(
            this.element[0],
            i.currentItem || i.element
          ) &&
          (this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass),
          this._trigger('over', t, this.ui(i)));
      },
      _out: function (t) {
        var i = n.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] != this.element[0] &&
          this.options.accept.call(
            this.element[0],
            i.currentItem || i.element
          ) &&
          (this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger('out', t, this.ui(i)));
      },
      _drop: function (t, i) {
        var r = i || n.ui.ddmanager.current,
          u;
        return !r || (r.currentItem || r.element)[0] == this.element[0]
          ? !1
          : ((u = !1),
            this.element
              .find(':data(droppable)')
              .not('.ui-draggable-dragging')
              .each(function () {
                var t = n.data(this, 'droppable');
                if (
                  t.options.greedy &&
                  n.ui.intersect(
                    r,
                    n.extend(t, { offset: t.element.offset() }),
                    t.options.tolerance
                  )
                )
                  return (u = !0), !1;
              }),
            u)
          ? !1
          : this.options.accept.call(
              this.element[0],
              r.currentItem || r.element
            )
          ? (this.options.activeClass &&
              this.element.removeClass(this.options.activeClass),
            this.options.hoverClass &&
              this.element.removeClass(this.options.hoverClass),
            this._trigger('drop', t, this.ui(r)),
            this.element)
          : !1;
      },
      ui: function (n) {
        return {
          draggable: n.currentItem || n.element,
          helper: n.helper,
          position: n.position,
          absolutePosition: n.positionAbs,
          offset: n.positionAbs,
        };
      },
    });
    n.extend(n.ui.droppable, {
      version: '1.7.3',
      eventPrefix: 'drop',
      defaults: {
        accept: '*',
        activeClass: !1,
        addClasses: !0,
        greedy: !1,
        hoverClass: !1,
        scope: 'default',
        tolerance: 'intersect',
      },
    });
    n.ui.intersect = function (t, i, r) {
      if (!i.offset) return !1;
      var e = (t.positionAbs || t.position.absolute).left,
        s = e + t.helperProportions.width,
        o = (t.positionAbs || t.position.absolute).top,
        h = o + t.helperProportions.height,
        u = i.offset.left,
        c = u + i.proportions.width,
        f = i.offset.top,
        l = f + i.proportions.height;
      switch (r) {
        case 'fit':
          return u < e && s < c && f < o && h < l;
          break;
        case 'intersect':
          return (
            u < e + t.helperProportions.width / 2 &&
            s - t.helperProportions.width / 2 < c &&
            f < o + t.helperProportions.height / 2 &&
            h - t.helperProportions.height / 2 < l
          );
          break;
        case 'pointer':
          var a =
              (t.positionAbs || t.position.absolute).left +
              (t.clickOffset || t.offset.click).left,
            v =
              (t.positionAbs || t.position.absolute).top +
              (t.clickOffset || t.offset.click).top,
            y = n.ui.isOver(
              v,
              a,
              f,
              u,
              i.proportions.height,
              i.proportions.width
            );
          return y;
          break;
        case 'touch':
          return (
            ((o >= f && o <= l) || (h >= f && h <= l) || (o < f && h > l)) &&
            ((e >= u && e <= c) || (s >= u && s <= c) || (e < u && s > c))
          );
          break;
        default:
          return !1;
          break;
      }
    };
    n.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function (t, i) {
        var u = n.ui.ddmanager.droppables[t.options.scope],
          o = i ? i.type : null,
          e = (t.currentItem || t.element).find(':data(droppable)').andSelf(),
          r,
          f;
        n: for (r = 0; r < u.length; r++)
          if (
            !u[r].options.disabled &&
            (!t ||
              u[r].options.accept.call(
                u[r].element[0],
                t.currentItem || t.element
              ))
          ) {
            for (f = 0; f < e.length; f++)
              if (e[f] == u[r].element[0]) {
                u[r].proportions.height = 0;
                continue n;
              }
            ((u[r].visible = u[r].element.css('display') != 'none'),
            u[r].visible) &&
              ((u[r].offset = u[r].element.offset()),
              (u[r].proportions = {
                width: u[r].element[0].offsetWidth,
                height: u[r].element[0].offsetHeight,
              }),
              o == 'mousedown' && u[r]._activate.call(u[r], i));
          }
      },
      drop: function (t, i) {
        var r = !1;
        return (
          n.each(n.ui.ddmanager.droppables[t.options.scope], function () {
            this.options &&
              (!this.options.disabled &&
                this.visible &&
                n.ui.intersect(t, this, this.options.tolerance) &&
                (r = this._drop.call(this, i)),
              !this.options.disabled &&
                this.visible &&
                this.options.accept.call(
                  this.element[0],
                  t.currentItem || t.element
                ) &&
                ((this.isout = 1),
                (this.isover = 0),
                this._deactivate.call(this, i)));
          }),
          r
        );
      },
      drag: function (t, i) {
        t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i);
        n.each(n.ui.ddmanager.droppables[t.options.scope], function () {
          var f, u, r, e;
          this.options.disabled ||
            this.greedyChild ||
            !this.visible ||
            (((f = n.ui.intersect(t, this, this.options.tolerance)),
            (u =
              !f && this.isover == 1
                ? 'isout'
                : f && this.isover == 0
                ? 'isover'
                : null),
            u) &&
              (this.options.greedy &&
                ((e = this.element.parents(':data(droppable):eq(0)')),
                e.length &&
                  ((r = n.data(e[0], 'droppable')),
                  (r.greedyChild = u == 'isover' ? 1 : 0))),
              r &&
                u == 'isover' &&
                ((r.isover = 0), (r.isout = 1), r._out.call(r, i)),
              (this[u] = 1),
              (this[u == 'isout' ? 'isover' : 'isout'] = 0),
              this[u == 'isover' ? '_over' : '_out'].call(this, i),
              r &&
                u == 'isout' &&
                ((r.isout = 0), (r.isover = 1), r._over.call(r, i))));
        });
      },
    };
  })(jQuery),
  (function (n) {
    n.widget(
      'ui.resizable',
      n.extend({}, n.ui.mouse, {
        _init: function () {
          var i = this,
            t = this.options,
            f,
            u;
          if (
            (this.element.addClass('ui-resizable'),
            n.extend(this, {
              _aspectRatio: !!t.aspectRatio,
              aspectRatio: t.aspectRatio,
              originalElement: this.element,
              _proportionallyResizeElements: [],
              _helper:
                t.helper || t.ghost || t.animate
                  ? t.helper || 'ui-resizable-helper'
                  : null,
            }),
            this.element[0].nodeName.match(
              /canvas|textarea|input|select|button|img/i
            ) &&
              (/relative/.test(this.element.css('position')) &&
                n.browser.opera &&
                this.element.css({
                  position: 'relative',
                  top: 'auto',
                  left: 'auto',
                }),
              this.element.wrap(
                n(
                  '<div class="ui-wrapper" style="overflow: hidden;"></div>'
                ).css({
                  position: this.element.css('position'),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css('top'),
                  left: this.element.css('left'),
                })
              ),
              (this.element = this.element
                .parent()
                .data('resizable', this.element.data('resizable'))),
              (this.elementIsWrapper = !0),
              this.element.css({
                marginLeft: this.originalElement.css('marginLeft'),
                marginTop: this.originalElement.css('marginTop'),
                marginRight: this.originalElement.css('marginRight'),
                marginBottom: this.originalElement.css('marginBottom'),
              }),
              this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
              }),
              (this.originalResizeStyle = this.originalElement.css('resize')),
              this.originalElement.css('resize', 'none'),
              this._proportionallyResizeElements.push(
                this.originalElement.css({
                  position: 'static',
                  zoom: 1,
                  display: 'block',
                })
              ),
              this.originalElement.css({
                margin: this.originalElement.css('margin'),
              }),
              this._proportionallyResize()),
            (this.handles =
              t.handles ||
              (n('.ui-resizable-handle', this.element).length
                ? {
                    n: '.ui-resizable-n',
                    e: '.ui-resizable-e',
                    s: '.ui-resizable-s',
                    w: '.ui-resizable-w',
                    se: '.ui-resizable-se',
                    sw: '.ui-resizable-sw',
                    ne: '.ui-resizable-ne',
                    nw: '.ui-resizable-nw',
                  }
                : 'e,s,se')),
            this.handles.constructor == String)
          )
            for (
              this.handles == 'all' && (this.handles = 'n,e,s,w,se,sw,ne,nw'),
                f = this.handles.split(','),
                this.handles = {},
                u = 0;
              u < f.length;
              u++
            ) {
              var r = n.trim(f[u]),
                o = 'ui-resizable-' + r,
                e = n('<div class="ui-resizable-handle ' + o + '"></div>');
              /sw|se|ne|nw/.test(r) && e.css({ zIndex: ++t.zIndex });
              'se' == r && e.addClass('ui-icon ui-icon-gripsmall-diagonal-se');
              this.handles[r] = '.ui-resizable-' + r;
              this.element.append(e);
            }
          this._renderAxis = function (t) {
            var i, r, u, f;
            t = t || this.element;
            for (i in this.handles)
              this.handles[i].constructor == String &&
                (this.handles[i] = n(this.handles[i], this.element).show()),
                this.elementIsWrapper &&
                  this.originalElement[0].nodeName.match(
                    /textarea|input|select|button/i
                  ) &&
                  ((r = n(this.handles[i], this.element)),
                  (u = 0),
                  (u = /sw|ne|nw|se|n|s/.test(i)
                    ? r.outerHeight()
                    : r.outerWidth()),
                  (f = [
                    'padding',
                    /ne|nw|n/.test(i)
                      ? 'Top'
                      : /se|sw|s/.test(i)
                      ? 'Bottom'
                      : /^e$/.test(i)
                      ? 'Right'
                      : 'Left',
                  ].join('')),
                  t.css(f, u),
                  this._proportionallyResize()),
                !n(this.handles[i]).length;
          };
          this._renderAxis(this.element);
          this._handles = n(
            '.ui-resizable-handle',
            this.element
          ).disableSelection();
          this._handles.mouseover(function () {
            if (!i.resizing) {
              if (this.className)
                var n = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                );
              i.axis = n && n[1] ? n[1] : 'se';
            }
          });
          t.autoHide &&
            (this._handles.hide(),
            n(this.element)
              .addClass('ui-resizable-autohide')
              .hover(
                function () {
                  n(this).removeClass('ui-resizable-autohide');
                  i._handles.show();
                },
                function () {
                  i.resizing ||
                    (n(this).addClass('ui-resizable-autohide'),
                    i._handles.hide());
                }
              ));
          this._mouseInit();
        },
        destroy: function () {
          var i, t;
          this._mouseDestroy();
          i = function (t) {
            n(t)
              .removeClass(
                'ui-resizable ui-resizable-disabled ui-resizable-resizing'
              )
              .removeData('resizable')
              .unbind('.resizable')
              .find('.ui-resizable-handle')
              .remove();
          };
          this.elementIsWrapper &&
            (i(this.element),
            (t = this.element),
            t
              .parent()
              .append(
                this.originalElement.css({
                  position: t.css('position'),
                  width: t.outerWidth(),
                  height: t.outerHeight(),
                  top: t.css('top'),
                  left: t.css('left'),
                })
              )
              .end()
              .remove());
          this.originalElement.css('resize', this.originalResizeStyle);
          i(this.originalElement);
        },
        _mouseCapture: function (t) {
          var i = !1;
          for (var r in this.handles)
            n(this.handles[r])[0] == t.target && (i = !0);
          return this.options.disabled || !!i;
        },
        _mouseStart: function (t) {
          var u = this.options,
            s = this.element.position(),
            r = this.element,
            f,
            e,
            o;
          return (
            (this.resizing = !0),
            (this.documentScroll = {
              top: n(document).scrollTop(),
              left: n(document).scrollLeft(),
            }),
            (r.is('.ui-draggable') || /absolute/.test(r.css('position'))) &&
              r.css({ position: 'absolute', top: s.top, left: s.left }),
            n.browser.opera &&
              /relative/.test(r.css('position')) &&
              r.css({ position: 'relative', top: 'auto', left: 'auto' }),
            this._renderProxy(),
            (f = i(this.helper.css('left'))),
            (e = i(this.helper.css('top'))),
            u.containment &&
              ((f += n(u.containment).scrollLeft() || 0),
              (e += n(u.containment).scrollTop() || 0)),
            (this.offset = this.helper.offset()),
            (this.position = { left: f, top: e }),
            (this.size = this._helper
              ? { width: r.outerWidth(), height: r.outerHeight() }
              : { width: r.width(), height: r.height() }),
            (this.originalSize = this._helper
              ? { width: r.outerWidth(), height: r.outerHeight() }
              : { width: r.width(), height: r.height() }),
            (this.originalPosition = { left: f, top: e }),
            (this.sizeDiff = {
              width: r.outerWidth() - r.width(),
              height: r.outerHeight() - r.height(),
            }),
            (this.originalMousePosition = { left: t.pageX, top: t.pageY }),
            (this.aspectRatio =
              typeof u.aspectRatio == 'number'
                ? u.aspectRatio
                : this.originalSize.width / this.originalSize.height || 1),
            (o = n('.ui-resizable-' + this.axis).css('cursor')),
            n('body').css('cursor', o == 'auto' ? this.axis + '-resize' : o),
            r.addClass('ui-resizable-resizing'),
            this._propagate('start', t),
            !0
          );
        },
        _mouseDrag: function (t) {
          var f = this.helper,
            h = this.options,
            c = {},
            l = this,
            r = this.originalMousePosition,
            e = this.axis,
            o = t.pageX - r.left || 0,
            s = t.pageY - r.top || 0,
            u = this._change[e];
          if (!u) return !1;
          var i = u.apply(this, [t, o, s]),
            a = n.browser.msie && n.browser.version < 7,
            v = this.sizeDiff;
          return (
            (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)),
            (i = this._respectSize(i, t)),
            this._propagate('resize', t),
            f.css({
              top: this.position.top + 'px',
              left: this.position.left + 'px',
              width: this.size.width + 'px',
              height: this.size.height + 'px',
            }),
            !this._helper &&
              this._proportionallyResizeElements.length &&
              this._proportionallyResize(),
            this._updateCache(i),
            this._trigger('resize', t, this.ui()),
            !1
          );
        },
        _mouseStop: function (t) {
          var r, i;
          if (
            ((this.resizing = !1), (r = this.options), (i = this), this._helper)
          ) {
            var u = this._proportionallyResizeElements,
              f = u.length && /textarea/i.test(u[0].nodeName),
              e = f && n.ui.hasScroll(u[0], 'left') ? 0 : i.sizeDiff.height,
              o = f ? 0 : i.sizeDiff.width,
              s = { width: i.size.width - o, height: i.size.height - e },
              h =
                parseInt(i.element.css('left'), 10) +
                  (i.position.left - i.originalPosition.left) || null,
              c =
                parseInt(i.element.css('top'), 10) +
                  (i.position.top - i.originalPosition.top) || null;
            r.animate || this.element.css(n.extend(s, { top: c, left: h }));
            i.helper.height(i.size.height);
            i.helper.width(i.size.width);
            this._helper && !r.animate && this._proportionallyResize();
          }
          return (
            n('body').css('cursor', 'auto'),
            this.element.removeClass('ui-resizable-resizing'),
            this._propagate('stop', t),
            this._helper && this.helper.remove(),
            !1
          );
        },
        _updateCache: function (n) {
          var i = this.options;
          this.offset = this.helper.offset();
          t(n.left) && (this.position.left = n.left);
          t(n.top) && (this.position.top = n.top);
          t(n.height) && (this.size.height = n.height);
          t(n.width) && (this.size.width = n.width);
        },
        _updateRatio: function (n, t) {
          var f = this.options,
            r = this.position,
            i = this.size,
            u = this.axis;
          return (
            n.height
              ? (n.width = i.height * this.aspectRatio)
              : n.width && (n.height = i.width / this.aspectRatio),
            u == 'sw' &&
              ((n.left = r.left + (i.width - n.width)), (n.top = null)),
            u == 'nw' &&
              ((n.top = r.top + (i.height - n.height)),
              (n.left = r.left + (i.width - n.width))),
            n
          );
        },
        _respectSize: function (n, i) {
          var y = this.helper,
            r = this.options,
            p = this._aspectRatio || i.shiftKey,
            f = this.axis,
            e = t(n.width) && r.maxWidth && r.maxWidth < n.width,
            o = t(n.height) && r.maxHeight && r.maxHeight < n.height,
            s = t(n.width) && r.minWidth && r.minWidth > n.width,
            h = t(n.height) && r.minHeight && r.minHeight > n.height,
            u;
          s && (n.width = r.minWidth);
          h && (n.height = r.minHeight);
          e && (n.width = r.maxWidth);
          o && (n.height = r.maxHeight);
          var c = this.originalPosition.left + this.originalSize.width,
            l = this.position.top + this.size.height,
            a = /sw|nw|w/.test(f),
            v = /nw|ne|n/.test(f);
          return (
            s && a && (n.left = c - r.minWidth),
            e && a && (n.left = c - r.maxWidth),
            h && v && (n.top = l - r.minHeight),
            o && v && (n.top = l - r.maxHeight),
            (u = !n.width && !n.height),
            u && !n.left && n.top
              ? (n.top = null)
              : u && !n.top && n.left && (n.left = null),
            n
          );
        },
        _proportionallyResize: function () {
          var e = this.options,
            i,
            r,
            t,
            u,
            f;
          if (this._proportionallyResizeElements.length)
            for (
              i = this.helper || this.element, r = 0;
              r < this._proportionallyResizeElements.length;
              r++
            )
              ((t = this._proportionallyResizeElements[r]),
              this.borderDif ||
                ((u = [
                  t.css('borderTopWidth'),
                  t.css('borderRightWidth'),
                  t.css('borderBottomWidth'),
                  t.css('borderLeftWidth'),
                ]),
                (f = [
                  t.css('paddingTop'),
                  t.css('paddingRight'),
                  t.css('paddingBottom'),
                  t.css('paddingLeft'),
                ]),
                (this.borderDif = n.map(u, function (n, t) {
                  var i = parseInt(n, 10) || 0,
                    r = parseInt(f[t], 10) || 0;
                  return i + r;
                }))),
              n.browser.msie &&
                (n(i).is(':hidden') || n(i).parents(':hidden').length)) ||
                t.css({
                  height:
                    i.height() - this.borderDif[0] - this.borderDif[2] || 0,
                  width: i.width() - this.borderDif[1] - this.borderDif[3] || 0,
                });
        },
        _renderProxy: function () {
          var u = this.element,
            f = this.options;
          if (((this.elementOffset = u.offset()), this._helper)) {
            this.helper =
              this.helper || n('<div style="overflow:hidden;"></div>');
            var t = n.browser.msie && n.browser.version < 7,
              i = t ? 1 : 0,
              r = t ? 2 : -1;
            this.helper.addClass(this._helper).css({
              width: this.element.outerWidth() + r,
              height: this.element.outerHeight() + r,
              position: 'absolute',
              left: this.elementOffset.left - i + 'px',
              top: this.elementOffset.top - i + 'px',
              zIndex: ++f.zIndex,
            });
            this.helper.appendTo('body').disableSelection();
          } else this.helper = this.element;
        },
        _change: {
          e: function (n, t, i) {
            return { width: this.originalSize.width + t };
          },
          w: function (n, t, i) {
            var f = this.options,
              r = this.originalSize,
              u = this.originalPosition;
            return { left: u.left + t, width: r.width - t };
          },
          n: function (n, t, i) {
            var f = this.options,
              r = this.originalSize,
              u = this.originalPosition;
            return { top: u.top + i, height: r.height - i };
          },
          s: function (n, t, i) {
            return { height: this.originalSize.height + i };
          },
          se: function (t, i, r) {
            return n.extend(
              this._change.s.apply(this, arguments),
              this._change.e.apply(this, [t, i, r])
            );
          },
          sw: function (t, i, r) {
            return n.extend(
              this._change.s.apply(this, arguments),
              this._change.w.apply(this, [t, i, r])
            );
          },
          ne: function (t, i, r) {
            return n.extend(
              this._change.n.apply(this, arguments),
              this._change.e.apply(this, [t, i, r])
            );
          },
          nw: function (t, i, r) {
            return n.extend(
              this._change.n.apply(this, arguments),
              this._change.w.apply(this, [t, i, r])
            );
          },
        },
        _propagate: function (t, i) {
          n.ui.plugin.call(this, t, [i, this.ui()]);
          t != 'resize' && this._trigger(t, i, this.ui());
        },
        plugins: {},
        ui: function () {
          return {
            originalElement: this.originalElement,
            element: this.element,
            helper: this.helper,
            position: this.position,
            size: this.size,
            originalSize: this.originalSize,
            originalPosition: this.originalPosition,
          };
        },
      })
    );
    n.extend(n.ui.resizable, {
      version: '1.7.3',
      eventPrefix: 'resize',
      defaults: {
        alsoResize: !1,
        animate: !1,
        animateDuration: 'slow',
        animateEasing: 'swing',
        aspectRatio: !1,
        autoHide: !1,
        cancel: ':input,option',
        containment: !1,
        delay: 0,
        distance: 1,
        ghost: !1,
        grid: !1,
        handles: 'e,s,se',
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 1e3,
      },
    });
    n.ui.plugin.add('resizable', 'alsoResize', {
      start: function (t, i) {
        var u = n(this).data('resizable'),
          r = u.options;
        _store = function (t) {
          n(t).each(function () {
            n(this).data('resizable-alsoresize', {
              width: parseInt(n(this).width(), 10),
              height: parseInt(n(this).height(), 10),
              left: parseInt(n(this).css('left'), 10),
              top: parseInt(n(this).css('top'), 10),
            });
          });
        };
        typeof r.alsoResize != 'object' || r.alsoResize.parentNode
          ? _store(r.alsoResize)
          : r.alsoResize.length
          ? ((r.alsoResize = r.alsoResize[0]), _store(r.alsoResize))
          : n.each(r.alsoResize, function (n, t) {
              _store(n);
            });
      },
      resize: function (t, i) {
        var r = n(this).data('resizable'),
          u = r.options,
          f = r.originalSize,
          e = r.originalPosition,
          s = {
            height: r.size.height - f.height || 0,
            width: r.size.width - f.width || 0,
            top: r.position.top - e.top || 0,
            left: r.position.left - e.left || 0,
          },
          o = function (t, i) {
            n(t).each(function () {
              var t = n(this),
                f = n(this).data('resizable-alsoresize'),
                u = {},
                e = i && i.length ? i : ['width', 'height', 'top', 'left'];
              n.each(e || ['width', 'height', 'top', 'left'], function (n, t) {
                var i = (f[t] || 0) + (s[t] || 0);
                i && i >= 0 && (u[t] = i || null);
              });
              /relative/.test(t.css('position')) &&
                n.browser.opera &&
                ((r._revertToRelativePosition = !0),
                t.css({ position: 'absolute', top: 'auto', left: 'auto' }));
              t.css(u);
            });
          };
        typeof u.alsoResize != 'object' || u.alsoResize.nodeType
          ? o(u.alsoResize)
          : n.each(u.alsoResize, function (n, t) {
              o(n, t);
            });
      },
      stop: function (t, i) {
        var r = n(this).data('resizable');
        r._revertToRelativePosition &&
          n.browser.opera &&
          ((r._revertToRelativePosition = !1),
          el.css({ position: 'relative' }));
        n(this).removeData('resizable-alsoresize-start');
      },
    });
    n.ui.plugin.add('resizable', 'animate', {
      stop: function (t, i) {
        var r = n(this).data('resizable'),
          f = r.options,
          u = r._proportionallyResizeElements,
          e = u.length && /textarea/i.test(u[0].nodeName),
          h = e && n.ui.hasScroll(u[0], 'left') ? 0 : r.sizeDiff.height,
          c = e ? 0 : r.sizeDiff.width,
          l = { width: r.size.width - c, height: r.size.height - h },
          o =
            parseInt(r.element.css('left'), 10) +
              (r.position.left - r.originalPosition.left) || null,
          s =
            parseInt(r.element.css('top'), 10) +
              (r.position.top - r.originalPosition.top) || null;
        r.element.animate(n.extend(l, s && o ? { top: s, left: o } : {}), {
          duration: f.animateDuration,
          easing: f.animateEasing,
          step: function () {
            var i = {
              width: parseInt(r.element.css('width'), 10),
              height: parseInt(r.element.css('height'), 10),
              top: parseInt(r.element.css('top'), 10),
              left: parseInt(r.element.css('left'), 10),
            };
            u && u.length && n(u[0]).css({ width: i.width, height: i.height });
            r._updateCache(i);
            r._propagate('resize', t);
          },
        });
      },
    });
    n.ui.plugin.add('resizable', 'containment', {
      start: function (t, r) {
        var u = n(this).data('resizable'),
          c = u.options,
          l = u.element,
          e = c.containment,
          f =
            e instanceof n
              ? e.get(0)
              : /parent/.test(e)
              ? l.parent().get(0)
              : e,
          o,
          s;
        if (f)
          if (
            ((u.containerElement = n(f)), /document/.test(e) || e == document)
          )
            (u.containerOffset = { left: 0, top: 0 }),
              (u.containerPosition = { left: 0, top: 0 }),
              (u.parentData = {
                element: n(document),
                left: 0,
                top: 0,
                width: n(document).width(),
                height:
                  n(document).height() || document.body.parentNode.scrollHeight,
              });
          else {
            o = n(f);
            s = [];
            n(['Top', 'Right', 'Left', 'Bottom']).each(function (n, t) {
              s[n] = i(o.css('padding' + t));
            });
            u.containerOffset = o.offset();
            u.containerPosition = o.position();
            u.containerSize = {
              height: o.innerHeight() - s[3],
              width: o.innerWidth() - s[1],
            };
            var h = u.containerOffset,
              a = u.containerSize.height,
              v = u.containerSize.width,
              y = n.ui.hasScroll(f, 'left') ? f.scrollWidth : v,
              p = n.ui.hasScroll(f) ? f.scrollHeight : a;
            u.parentData = {
              element: f,
              left: h.left,
              top: h.top,
              width: y,
              height: p,
            };
          }
      },
      resize: function (t, i) {
        var r = n(this).data('resizable'),
          o = r.options,
          y = r.containerSize,
          u = r.containerOffset,
          p = r.size,
          h = r.position,
          e = r._aspectRatio || t.shiftKey,
          f = { top: 0, left: 0 },
          c = r.containerElement;
        c[0] != document && /static/.test(c.css('position')) && (f = u);
        h.left < (r._helper ? u.left : 0) &&
          ((r.size.width =
            r.size.width +
            (r._helper ? r.position.left - u.left : r.position.left - f.left)),
          e && (r.size.height = r.size.width / o.aspectRatio),
          (r.position.left = o.helper ? u.left : 0));
        h.top < (r._helper ? u.top : 0) &&
          ((r.size.height =
            r.size.height +
            (r._helper ? r.position.top - u.top : r.position.top)),
          e && (r.size.width = r.size.height * o.aspectRatio),
          (r.position.top = r._helper ? u.top : 0));
        r.offset.left = r.parentData.left + r.position.left;
        r.offset.top = r.parentData.top + r.position.top;
        var s = Math.abs(
            (r._helper ? r.offset.left - f.left : r.offset.left - f.left) +
              r.sizeDiff.width
          ),
          l = Math.abs(
            (r._helper ? r.offset.top - f.top : r.offset.top - u.top) +
              r.sizeDiff.height
          ),
          a = r.containerElement.get(0) == r.element.parent().get(0),
          v = /relative|absolute/.test(r.containerElement.css('position'));
        a && v && (s -= r.parentData.left);
        s + r.size.width >= r.parentData.width &&
          ((r.size.width = r.parentData.width - s),
          e && (r.size.height = r.size.width / r.aspectRatio));
        l + r.size.height >= r.parentData.height &&
          ((r.size.height = r.parentData.height - l),
          e && (r.size.width = r.size.height * r.aspectRatio));
      },
      stop: function (t, i) {
        var r = n(this).data('resizable'),
          f = r.options,
          a = r.position,
          e = r.containerOffset,
          o = r.containerPosition,
          s = r.containerElement,
          u = n(r.helper),
          h = u.offset(),
          c = u.outerWidth() - r.sizeDiff.width,
          l = u.outerHeight() - r.sizeDiff.height;
        r._helper &&
          !f.animate &&
          /relative/.test(s.css('position')) &&
          n(this).css({ left: h.left - o.left - e.left, width: c, height: l });
        r._helper &&
          !f.animate &&
          /static/.test(s.css('position')) &&
          n(this).css({ left: h.left - o.left - e.left, width: c, height: l });
      },
    });
    n.ui.plugin.add('resizable', 'ghost', {
      start: function (t, i) {
        var r = n(this).data('resizable'),
          u = r.options,
          f = r.size;
        r.ghost = r.originalElement.clone();
        r.ghost
          .css({
            opacity: 0.25,
            display: 'block',
            position: 'relative',
            height: f.height,
            width: f.width,
            margin: 0,
            left: 0,
            top: 0,
          })
          .addClass('ui-resizable-ghost')
          .addClass(typeof u.ghost == 'string' ? u.ghost : '');
        r.ghost.appendTo(r.helper);
      },
      resize: function (t, i) {
        var r = n(this).data('resizable'),
          u = r.options;
        r.ghost &&
          r.ghost.css({
            position: 'relative',
            height: r.size.height,
            width: r.size.width,
          });
      },
      stop: function (t, i) {
        var r = n(this).data('resizable'),
          u = r.options;
        r.ghost && r.helper && r.helper.get(0).removeChild(r.ghost.get(0));
      },
    });
    n.ui.plugin.add('resizable', 'grid', {
      resize: function (t, i) {
        var r = n(this).data('resizable'),
          u = r.options,
          c = r.size,
          f = r.originalSize,
          s = r.originalPosition,
          h = r.axis,
          l = u._aspectRatio || t.shiftKey,
          e,
          o;
        u.grid = typeof u.grid == 'number' ? [u.grid, u.grid] : u.grid;
        e =
          Math.round((c.width - f.width) / (u.grid[0] || 1)) * (u.grid[0] || 1);
        o =
          Math.round((c.height - f.height) / (u.grid[1] || 1)) *
          (u.grid[1] || 1);
        /^(se|s|e)$/.test(h)
          ? ((r.size.width = f.width + e), (r.size.height = f.height + o))
          : /^(ne)$/.test(h)
          ? ((r.size.width = f.width + e),
            (r.size.height = f.height + o),
            (r.position.top = s.top - o))
          : /^(sw)$/.test(h)
          ? ((r.size.width = f.width + e),
            (r.size.height = f.height + o),
            (r.position.left = s.left - e))
          : ((r.size.width = f.width + e),
            (r.size.height = f.height + o),
            (r.position.top = s.top - o),
            (r.position.left = s.left - e));
      },
    });
    var i = function (n) {
        return parseInt(n, 10) || 0;
      },
      t = function (n) {
        return !isNaN(parseInt(n, 10));
      };
  })(jQuery),
  (function (n) {
    n.widget(
      'ui.selectable',
      n.extend({}, n.ui.mouse, {
        _init: function () {
          var i = this,
            t;
          this.element.addClass('ui-selectable');
          this.dragged = !1;
          this.refresh = function () {
            t = n(i.options.filter, i.element[0]);
            t.each(function () {
              var t = n(this),
                i = t.offset();
              n.data(this, 'selectable-item', {
                element: this,
                $element: t,
                left: i.left,
                top: i.top,
                right: i.left + t.outerWidth(),
                bottom: i.top + t.outerHeight(),
                startselected: !1,
                selected: t.hasClass('ui-selected'),
                selecting: t.hasClass('ui-selecting'),
                unselecting: t.hasClass('ui-unselecting'),
              });
            });
          };
          this.refresh();
          this.selectees = t.addClass('ui-selectee');
          this._mouseInit();
          this.helper = n(document.createElement('div'))
            .css({ border: '1px dotted black' })
            .addClass('ui-selectable-helper');
        },
        destroy: function () {
          this.element
            .removeClass('ui-selectable ui-selectable-disabled')
            .removeData('selectable')
            .unbind('.selectable');
          this._mouseDestroy();
        },
        _mouseStart: function (t) {
          var r = this,
            i;
          ((this.opos = [t.pageX, t.pageY]), this.options.disabled) ||
            ((i = this.options),
            (this.selectees = n(i.filter, this.element[0])),
            this._trigger('start', t),
            n(i.appendTo).append(this.helper),
            this.helper.css({
              'z-index': 100,
              position: 'absolute',
              left: t.clientX,
              top: t.clientY,
              width: 0,
              height: 0,
            }),
            i.autoRefresh && this.refresh(),
            this.selectees.filter('.ui-selected').each(function () {
              var i = n.data(this, 'selectable-item');
              i.startselected = !0;
              t.metaKey ||
                (i.$element.removeClass('ui-selected'),
                (i.selected = !1),
                i.$element.addClass('ui-unselecting'),
                (i.unselecting = !0),
                r._trigger('unselecting', t, { unselecting: i.element }));
            }),
            n(t.target)
              .parents()
              .andSelf()
              .each(function () {
                var i = n.data(this, 'selectable-item');
                if (i)
                  return (
                    i.$element
                      .removeClass('ui-unselecting')
                      .addClass('ui-selecting'),
                    (i.unselecting = !1),
                    (i.selecting = !0),
                    (i.selected = !0),
                    r._trigger('selecting', t, { selecting: i.element }),
                    !1
                  );
              }));
        },
        _mouseDrag: function (t) {
          var e = this,
            o;
          if (((this.dragged = !0), !this.options.disabled)) {
            var s = this.options,
              i = this.opos[0],
              r = this.opos[1],
              u = t.pageX,
              f = t.pageY;
            return (
              i > u && ((o = u), (u = i), (i = o)),
              r > f && ((o = f), (f = r), (r = o)),
              this.helper.css({ left: i, top: r, width: u - i, height: f - r }),
              this.selectees.each(function () {
                var o = n.data(this, 'selectable-item'),
                  h;
                o &&
                  o.element != e.element[0] &&
                  ((h = !1),
                  s.tolerance == 'touch'
                    ? (h = !(
                        o.left > u ||
                        o.right < i ||
                        o.top > f ||
                        o.bottom < r
                      ))
                    : s.tolerance == 'fit' &&
                      (h =
                        o.left > i && o.right < u && o.top > r && o.bottom < f),
                  h
                    ? (o.selected &&
                        (o.$element.removeClass('ui-selected'),
                        (o.selected = !1)),
                      o.unselecting &&
                        (o.$element.removeClass('ui-unselecting'),
                        (o.unselecting = !1)),
                      o.selecting ||
                        (o.$element.addClass('ui-selecting'),
                        (o.selecting = !0),
                        e._trigger('selecting', t, { selecting: o.element })))
                    : (o.selecting &&
                        (t.metaKey && o.startselected
                          ? (o.$element.removeClass('ui-selecting'),
                            (o.selecting = !1),
                            o.$element.addClass('ui-selected'),
                            (o.selected = !0))
                          : (o.$element.removeClass('ui-selecting'),
                            (o.selecting = !1),
                            o.startselected &&
                              (o.$element.addClass('ui-unselecting'),
                              (o.unselecting = !0)),
                            e._trigger('unselecting', t, {
                              unselecting: o.element,
                            }))),
                      o.selected &&
                        (t.metaKey ||
                          o.startselected ||
                          (o.$element.removeClass('ui-selected'),
                          (o.selected = !1),
                          o.$element.addClass('ui-unselecting'),
                          (o.unselecting = !0),
                          e._trigger('unselecting', t, {
                            unselecting: o.element,
                          })))));
              }),
              !1
            );
          }
        },
        _mouseStop: function (t) {
          var i = this,
            r;
          return (
            (this.dragged = !1),
            (r = this.options),
            n('.ui-unselecting', this.element[0]).each(function () {
              var r = n.data(this, 'selectable-item');
              r.$element.removeClass('ui-unselecting');
              r.unselecting = !1;
              r.startselected = !1;
              i._trigger('unselected', t, { unselected: r.element });
            }),
            n('.ui-selecting', this.element[0]).each(function () {
              var r = n.data(this, 'selectable-item');
              r.$element.removeClass('ui-selecting').addClass('ui-selected');
              r.selecting = !1;
              r.selected = !0;
              r.startselected = !0;
              i._trigger('selected', t, { selected: r.element });
            }),
            this._trigger('stop', t),
            this.helper.remove(),
            !1
          );
        },
      })
    );
    n.extend(n.ui.selectable, {
      version: '1.7.3',
      defaults: {
        appendTo: 'body',
        autoRefresh: !0,
        cancel: ':input,option',
        delay: 0,
        distance: 0,
        filter: '*',
        tolerance: 'touch',
      },
    });
  })(jQuery),
  (function (n) {
    n.widget(
      'ui.sortable',
      n.extend({}, n.ui.mouse, {
        _init: function () {
          var n = this.options;
          this.containerCache = {};
          this.element.addClass('ui-sortable');
          this.refresh();
          this.floating = this.items.length
            ? /left|right/.test(this.items[0].item.css('float'))
            : !1;
          this.offset = this.element.offset();
          this._mouseInit();
        },
        destroy: function () {
          this.element
            .removeClass('ui-sortable ui-sortable-disabled')
            .removeData('sortable')
            .unbind('.sortable');
          this._mouseDestroy();
          for (var n = this.items.length - 1; n >= 0; n--)
            this.items[n].item.removeData('sortable-item');
        },
        _mouseCapture: function (t, i) {
          var u;
          if (
            this.reverting ||
            this.options.disabled ||
            this.options.type == 'static'
          )
            return !1;
          this._refreshItems(t);
          var r = null,
            f = this,
            e = n(t.target)
              .parents()
              .each(function () {
                if (n.data(this, 'sortable-item') == f)
                  return (r = n(this)), !1;
              });
          return (n.data(t.target, 'sortable-item') == f && (r = n(t.target)),
          !r)
            ? !1
            : this.options.handle &&
              !i &&
              ((u = !1),
              n(this.options.handle, r)
                .find('*')
                .andSelf()
                .each(function () {
                  this == t.target && (u = !0);
                }),
              !u)
            ? !1
            : ((this.currentItem = r), this._removeCurrentsFromItems(), !0);
        },
        _mouseStart: function (t, i, r) {
          var u = this.options,
            e = this,
            f;
          if (
            ((this.currentContainer = this),
            this.refreshPositions(),
            (this.helper = this._createHelper(t)),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            (this.scrollParent = this.helper.scrollParent()),
            (this.offset = this.currentItem.offset()),
            (this.offset = {
              top: this.offset.top - this.margins.top,
              left: this.offset.left - this.margins.left,
            }),
            this.helper.css('position', 'absolute'),
            (this.cssPosition = this.helper.css('position')),
            n.extend(this.offset, {
              click: {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top,
              },
              parent: this._getParentOffset(),
              relative: this._getRelativeOffset(),
            }),
            (this.originalPosition = this._generatePosition(t)),
            (this.originalPageX = t.pageX),
            (this.originalPageY = t.pageY),
            u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt),
            (this.domPosition = {
              prev: this.currentItem.prev()[0],
              parent: this.currentItem.parent()[0],
            }),
            this.helper[0] != this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            u.containment && this._setContainment(),
            u.cursor &&
              (n('body').css('cursor') &&
                (this._storedCursor = n('body').css('cursor')),
              n('body').css('cursor', u.cursor)),
            u.opacity &&
              (this.helper.css('opacity') &&
                (this._storedOpacity = this.helper.css('opacity')),
              this.helper.css('opacity', u.opacity)),
            u.zIndex &&
              (this.helper.css('zIndex') &&
                (this._storedZIndex = this.helper.css('zIndex')),
              this.helper.css('zIndex', u.zIndex)),
            this.scrollParent[0] != document &&
              this.scrollParent[0].tagName != 'HTML' &&
              (this.overflowOffset = this.scrollParent.offset()),
            this._trigger('start', t, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !r)
          )
            for (f = this.containers.length - 1; f >= 0; f--)
              this.containers[f]._trigger('activate', t, e._uiHash(this));
          return (
            n.ui.ddmanager && (n.ui.ddmanager.current = this),
            n.ui.ddmanager &&
              !u.dropBehaviour &&
              n.ui.ddmanager.prepareOffsets(this, t),
            (this.dragging = !0),
            this.helper.addClass('ui-sortable-helper'),
            this._mouseDrag(t),
            !0
          );
        },
        _mouseDrag: function (t) {
          var i, r, u;
          for (
            this.position = this._generatePosition(t),
              this.positionAbs = this._convertPositionTo('absolute'),
              this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
              this.options.scroll &&
                ((i = this.options),
                (r = !1),
                this.scrollParent[0] != document &&
                this.scrollParent[0].tagName != 'HTML'
                  ? (this.overflowOffset.top +
                      this.scrollParent[0].offsetHeight -
                      t.pageY <
                    i.scrollSensitivity
                      ? (this.scrollParent[0].scrollTop = r =
                          this.scrollParent[0].scrollTop + i.scrollSpeed)
                      : t.pageY - this.overflowOffset.top <
                          i.scrollSensitivity &&
                        (this.scrollParent[0].scrollTop = r =
                          this.scrollParent[0].scrollTop - i.scrollSpeed),
                    this.overflowOffset.left +
                      this.scrollParent[0].offsetWidth -
                      t.pageX <
                    i.scrollSensitivity
                      ? (this.scrollParent[0].scrollLeft = r =
                          this.scrollParent[0].scrollLeft + i.scrollSpeed)
                      : t.pageX - this.overflowOffset.left <
                          i.scrollSensitivity &&
                        (this.scrollParent[0].scrollLeft = r =
                          this.scrollParent[0].scrollLeft - i.scrollSpeed))
                  : (t.pageY - n(document).scrollTop() < i.scrollSensitivity
                      ? (r = n(document).scrollTop(
                          n(document).scrollTop() - i.scrollSpeed
                        ))
                      : n(window).height() -
                          (t.pageY - n(document).scrollTop()) <
                          i.scrollSensitivity &&
                        (r = n(document).scrollTop(
                          n(document).scrollTop() + i.scrollSpeed
                        )),
                    t.pageX - n(document).scrollLeft() < i.scrollSensitivity
                      ? (r = n(document).scrollLeft(
                          n(document).scrollLeft() - i.scrollSpeed
                        ))
                      : n(window).width() -
                          (t.pageX - n(document).scrollLeft()) <
                          i.scrollSensitivity &&
                        (r = n(document).scrollLeft(
                          n(document).scrollLeft() + i.scrollSpeed
                        ))),
                r !== !1 &&
                  n.ui.ddmanager &&
                  !i.dropBehaviour &&
                  n.ui.ddmanager.prepareOffsets(this, t)),
              this.positionAbs = this._convertPositionTo('absolute'),
              (this.options.axis && this.options.axis == 'y') ||
                (this.helper[0].style.left = this.position.left + 'px'),
              (this.options.axis && this.options.axis == 'x') ||
                (this.helper[0].style.top = this.position.top + 'px'),
              u = this.items.length - 1;
            u >= 0;
            u--
          ) {
            var f = this.items[u],
              e = f.item[0],
              o = this._intersectsWithPointer(f);
            if (
              o &&
              e != this.currentItem[0] &&
              this.placeholder[o == 1 ? 'next' : 'prev']()[0] != e &&
              !n.ui.contains(this.placeholder[0], e) &&
              (this.options.type == 'semi-dynamic'
                ? !n.ui.contains(this.element[0], e)
                : !0)
            ) {
              if (
                ((this.direction = o == 1 ? 'down' : 'up'),
                this.options.tolerance == 'pointer' ||
                  this._intersectsWithSides(f))
              )
                this._rearrange(t, f);
              else break;
              this._trigger('change', t, this._uiHash());
              break;
            }
          }
          return (
            this._contactContainers(t),
            n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
            this._trigger('sort', t, this._uiHash()),
            (this.lastPositionAbs = this.positionAbs),
            !1
          );
        },
        _mouseStop: function (t, i) {
          if (t) {
            if (
              (n.ui.ddmanager &&
                !this.options.dropBehaviour &&
                n.ui.ddmanager.drop(this, t),
              this.options.revert)
            ) {
              var r = this,
                u = r.placeholder.offset();
              r.reverting = !0;
              n(this.helper).animate(
                {
                  left:
                    u.left -
                    this.offset.parent.left -
                    r.margins.left +
                    (this.offsetParent[0] == document.body
                      ? 0
                      : this.offsetParent[0].scrollLeft),
                  top:
                    u.top -
                    this.offset.parent.top -
                    r.margins.top +
                    (this.offsetParent[0] == document.body
                      ? 0
                      : this.offsetParent[0].scrollTop),
                },
                parseInt(this.options.revert, 10) || 500,
                function () {
                  r._clear(t);
                }
              );
            } else this._clear(t, i);
            return !1;
          }
        },
        cancel: function () {
          var i = this,
            t;
          if (this.dragging)
            for (
              this._mouseUp(),
                this.options.helper == 'original'
                  ? this.currentItem
                      .css(this._storedCSS)
                      .removeClass('ui-sortable-helper')
                  : this.currentItem.show(),
                t = this.containers.length - 1;
              t >= 0;
              t--
            )
              this.containers[t]._trigger('deactivate', null, i._uiHash(this)),
                this.containers[t].containerCache.over &&
                  (this.containers[t]._trigger('out', null, i._uiHash(this)),
                  (this.containers[t].containerCache.over = 0));
          return (
            this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.options.helper != 'original' &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            n.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null,
            }),
            this.domPosition.prev
              ? n(this.domPosition.prev).after(this.currentItem)
              : n(this.domPosition.parent).prepend(this.currentItem),
            !0
          );
        },
        serialize: function (t) {
          var r = this._getItemsAsjQuery(t && t.connected),
            i = [];
          return (
            (t = t || {}),
            n(r).each(function () {
              var r = (n(t.item || this).attr(t.attribute || 'id') || '').match(
                t.expression || /(.+)[-=_](.+)/
              );
              r &&
                i.push(
                  (t.key || r[1] + '[]') +
                    '=' +
                    (t.key && t.expression ? r[1] : r[2])
                );
            }),
            i.join('&')
          );
        },
        toArray: function (t) {
          var r = this._getItemsAsjQuery(t && t.connected),
            i = [];
          return (
            (t = t || {}),
            r.each(function () {
              i.push(n(t.item || this).attr(t.attribute || 'id') || '');
            }),
            i
          );
        },
        _intersectsWith: function (n) {
          var t = this.positionAbs.left,
            h = t + this.helperProportions.width,
            i = this.positionAbs.top,
            c = i + this.helperProportions.height,
            r = n.left,
            f = r + n.width,
            u = n.top,
            e = u + n.height,
            o = this.offset.click.top,
            s = this.offset.click.left,
            l = i + o > u && i + o < e && t + s > r && t + s < f;
          return this.options.tolerance == 'pointer' ||
            this.options.forcePointerForContainers ||
            (this.options.tolerance != 'pointer' &&
              this.helperProportions[this.floating ? 'width' : 'height'] >
                n[this.floating ? 'width' : 'height'])
            ? l
            : r < t + this.helperProportions.width / 2 &&
                h - this.helperProportions.width / 2 < f &&
                u < i + this.helperProportions.height / 2 &&
                c - this.helperProportions.height / 2 < e;
        },
        _intersectsWithPointer: function (t) {
          var u = n.ui.isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top,
              t.height
            ),
            f = n.ui.isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left,
              t.width
            ),
            e = u && f,
            i = this._getDragVerticalDirection(),
            r = this._getDragHorizontalDirection();
          return e
            ? this.floating
              ? (r && r == 'right') || i == 'down'
                ? 2
                : 1
              : i && (i == 'down' ? 2 : 1)
            : !1;
        },
        _intersectsWithSides: function (t) {
          var u = n.ui.isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top + t.height / 2,
              t.height
            ),
            f = n.ui.isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left + t.width / 2,
              t.width
            ),
            i = this._getDragVerticalDirection(),
            r = this._getDragHorizontalDirection();
          return this.floating && r
            ? (r == 'right' && f) || (r == 'left' && !f)
            : i && ((i == 'down' && u) || (i == 'up' && !u));
        },
        _getDragVerticalDirection: function () {
          var n = this.positionAbs.top - this.lastPositionAbs.top;
          return n != 0 && (n > 0 ? 'down' : 'up');
        },
        _getDragHorizontalDirection: function () {
          var n = this.positionAbs.left - this.lastPositionAbs.left;
          return n != 0 && (n > 0 ? 'right' : 'left');
        },
        refresh: function (n) {
          this._refreshItems(n);
          this.refreshPositions();
        },
        _connectWith: function () {
          var n = this.options;
          return n.connectWith.constructor == String
            ? [n.connectWith]
            : n.connectWith;
        },
        _getItemsAsjQuery: function (t) {
          var h = this,
            s = [],
            u = [],
            e = this._connectWith(),
            o,
            f,
            i,
            r;
          if (e && t)
            for (r = e.length - 1; r >= 0; r--)
              for (o = n(e[r]), f = o.length - 1; f >= 0; f--)
                (i = n.data(o[f], 'sortable')),
                  i &&
                    i != this &&
                    !i.options.disabled &&
                    u.push([
                      n.isFunction(i.options.items)
                        ? i.options.items.call(i.element)
                        : n(i.options.items, i.element).not(
                            '.ui-sortable-helper'
                          ),
                      i,
                    ]);
          for (
            u.push([
              n.isFunction(this.options.items)
                ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem,
                  })
                : n(this.options.items, this.element).not(
                    '.ui-sortable-helper'
                  ),
              this,
            ]),
              r = u.length - 1;
            r >= 0;
            r--
          )
            u[r][0].each(function () {
              s.push(this);
            });
          return n(s);
        },
        _removeCurrentsFromItems: function () {
          for (
            var t, i = this.currentItem.find(':data(sortable-item)'), n = 0;
            n < this.items.length;
            n++
          )
            for (t = 0; t < i.length; t++)
              i[t] == this.items[n].item[0] && this.items.splice(n, 1);
        },
        _refreshItems: function (t) {
          var o, i, r, s, h, u, l, c;
          this.items = [];
          this.containers = [this];
          var a = this.items,
            v = this,
            f = [
              [
                n.isFunction(this.options.items)
                  ? this.options.items.call(this.element[0], t, {
                      item: this.currentItem,
                    })
                  : n(this.options.items, this.element),
                this,
              ],
            ],
            e = this._connectWith();
          if (e)
            for (r = e.length - 1; r >= 0; r--)
              for (o = n(e[r]), u = o.length - 1; u >= 0; u--)
                (i = n.data(o[u], 'sortable')),
                  i &&
                    i != this &&
                    !i.options.disabled &&
                    (f.push([
                      n.isFunction(i.options.items)
                        ? i.options.items.call(i.element[0], t, {
                            item: this.currentItem,
                          })
                        : n(i.options.items, i.element),
                      i,
                    ]),
                    this.containers.push(i));
          for (r = f.length - 1; r >= 0; r--)
            for (s = f[r][1], h = f[r][0], u = 0, l = h.length; u < l; u++)
              (c = n(h[u])),
                c.data('sortable-item', s),
                a.push({
                  item: c,
                  instance: s,
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                });
        },
        refreshPositions: function (t) {
          var r, f, i, u;
          for (
            this.offsetParent &&
              this.helper &&
              (this.offset.parent = this._getParentOffset()),
              i = this.items.length - 1;
            i >= 0;
            i--
          )
            ((r = this.items[i]),
            r.instance != this.currentContainer &&
              this.currentContainer &&
              r.item[0] != this.currentItem[0]) ||
              ((f = this.options.toleranceElement
                ? n(this.options.toleranceElement, r.item)
                : r.item),
              t || ((r.width = f.outerWidth()), (r.height = f.outerHeight())),
              (u = f.offset()),
              (r.left = u.left),
              (r.top = u.top));
          if (this.options.custom && this.options.custom.refreshContainers)
            this.options.custom.refreshContainers.call(this);
          else
            for (i = this.containers.length - 1; i >= 0; i--)
              (u = this.containers[i].element.offset()),
                (this.containers[i].containerCache.left = u.left),
                (this.containers[i].containerCache.top = u.top),
                (this.containers[i].containerCache.width = this.containers[
                  i
                ].element.outerWidth()),
                (this.containers[i].containerCache.height = this.containers[
                  i
                ].element.outerHeight());
        },
        _createPlaceholder: function (t) {
          var i = t || this,
            r = i.options,
            u;
          (r.placeholder && r.placeholder.constructor != String) ||
            ((u = r.placeholder),
            (r.placeholder = {
              element: function () {
                var t = n(document.createElement(i.currentItem[0].nodeName))
                  .addClass(
                    u || i.currentItem[0].className + ' ui-sortable-placeholder'
                  )
                  .removeClass('ui-sortable-helper')[0];
                return u || (t.style.visibility = 'hidden'), t;
              },
              update: function (n, t) {
                (!u || r.forcePlaceholderSize) &&
                  (t.height() ||
                    t.height(
                      i.currentItem.innerHeight() -
                        parseInt(i.currentItem.css('paddingTop') || 0, 10) -
                        parseInt(i.currentItem.css('paddingBottom') || 0, 10)
                    ),
                  t.width() ||
                    t.width(
                      i.currentItem.innerWidth() -
                        parseInt(i.currentItem.css('paddingLeft') || 0, 10) -
                        parseInt(i.currentItem.css('paddingRight') || 0, 10)
                    ));
              },
            }));
          i.placeholder = n(
            r.placeholder.element.call(i.element, i.currentItem)
          );
          i.currentItem.after(i.placeholder);
          r.placeholder.update(i, i.placeholder);
        },
        _contactContainers: function (t) {
          for (var r, f, i = this.containers.length - 1; i >= 0; i--)
            if (this._intersectsWith(this.containers[i].containerCache)) {
              if (!this.containers[i].containerCache.over) {
                if (this.currentContainer != this.containers[i]) {
                  var e = 1e4,
                    u = null,
                    o = this.positionAbs[
                      this.containers[i].floating ? 'left' : 'top'
                    ];
                  for (r = this.items.length - 1; r >= 0; r--)
                    n.ui.contains(
                      this.containers[i].element[0],
                      this.items[r].item[0]
                    ) &&
                      ((f = this.items[r][
                        this.containers[i].floating ? 'left' : 'top'
                      ]),
                      Math.abs(f - o) < e &&
                        ((e = Math.abs(f - o)), (u = this.items[r])));
                  if (!u && !this.options.dropOnEmpty) continue;
                  this.currentContainer = this.containers[i];
                  u
                    ? this._rearrange(t, u, null, !0)
                    : this._rearrange(t, null, this.containers[i].element, !0);
                  this._trigger('change', t, this._uiHash());
                  this.containers[i]._trigger('change', t, this._uiHash(this));
                  this.options.placeholder.update(
                    this.currentContainer,
                    this.placeholder
                  );
                }
                this.containers[i]._trigger('over', t, this._uiHash(this));
                this.containers[i].containerCache.over = 1;
              }
            } else
              this.containers[i].containerCache.over &&
                (this.containers[i]._trigger('out', t, this._uiHash(this)),
                (this.containers[i].containerCache.over = 0));
        },
        _createHelper: function (t) {
          var r = this.options,
            i = n.isFunction(r.helper)
              ? n(r.helper.apply(this.element[0], [t, this.currentItem]))
              : r.helper == 'clone'
              ? this.currentItem.clone()
              : this.currentItem;
          return (
            i.parents('body').length ||
              n(
                r.appendTo != 'parent'
                  ? r.appendTo
                  : this.currentItem[0].parentNode
              )[0].appendChild(i[0]),
            i[0] == this.currentItem[0] &&
              (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css('position'),
                top: this.currentItem.css('top'),
                left: this.currentItem.css('left'),
              }),
            (i[0].style.width == '' || r.forceHelperSize) &&
              i.width(this.currentItem.width()),
            (i[0].style.height == '' || r.forceHelperSize) &&
              i.height(this.currentItem.height()),
            i
          );
        },
        _adjustOffsetFromHelper: function (n) {
          n.left != undefined &&
            (this.offset.click.left = n.left + this.margins.left);
          n.right != undefined &&
            (this.offset.click.left =
              this.helperProportions.width - n.right + this.margins.left);
          n.top != undefined &&
            (this.offset.click.top = n.top + this.margins.top);
          n.bottom != undefined &&
            (this.offset.click.top =
              this.helperProportions.height - n.bottom + this.margins.top);
        },
        _getParentOffset: function () {
          this.offsetParent = this.helper.offsetParent();
          var t = this.offsetParent.offset();
          return (
            this.cssPosition == 'absolute' &&
              this.scrollParent[0] != document &&
              n.ui.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((t.left += this.scrollParent.scrollLeft()),
              (t.top += this.scrollParent.scrollTop())),
            (this.offsetParent[0] == document.body ||
              (this.offsetParent[0].tagName &&
                this.offsetParent[0].tagName.toLowerCase() == 'html' &&
                n.browser.msie)) &&
              (t = { top: 0, left: 0 }),
            {
              top:
                t.top +
                (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
              left:
                t.left +
                (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if (this.cssPosition == 'relative') {
            var n = this.currentItem.position();
            return {
              top:
                n.top -
                (parseInt(this.helper.css('top'), 10) || 0) +
                this.scrollParent.scrollTop(),
              left:
                n.left -
                (parseInt(this.helper.css('left'), 10) || 0) +
                this.scrollParent.scrollLeft(),
            };
          } else return { top: 0, left: 0 };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
            top: parseInt(this.currentItem.css('marginTop'), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var i = this.options;
          if (
            (i.containment == 'parent' &&
              (i.containment = this.helper[0].parentNode),
            (i.containment == 'document' || i.containment == 'window') &&
              (this.containment = [
                0 - this.offset.relative.left - this.offset.parent.left,
                0 - this.offset.relative.top - this.offset.parent.top,
                n(i.containment == 'document' ? document : window).width() -
                  this.helperProportions.width -
                  this.margins.left,
                (n(i.containment == 'document' ? document : window).height() ||
                  document.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
            !/^(document|window|parent)$/.test(i.containment))
          ) {
            var t = n(i.containment)[0],
              r = n(i.containment).offset(),
              u = n(t).css('overflow') != 'hidden';
            this.containment = [
              r.left +
                (parseInt(n(t).css('borderLeftWidth'), 10) || 0) +
                (parseInt(n(t).css('paddingLeft'), 10) || 0) -
                this.margins.left,
              r.top +
                (parseInt(n(t).css('borderTopWidth'), 10) || 0) +
                (parseInt(n(t).css('paddingTop'), 10) || 0) -
                this.margins.top,
              r.left +
                (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) -
                (parseInt(n(t).css('borderLeftWidth'), 10) || 0) -
                (parseInt(n(t).css('paddingRight'), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              r.top +
                (u
                  ? Math.max(t.scrollHeight, t.offsetHeight)
                  : t.offsetHeight) -
                (parseInt(n(t).css('borderTopWidth'), 10) || 0) -
                (parseInt(n(t).css('paddingBottom'), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
            ];
          }
        },
        _convertPositionTo: function (t, i) {
          i || (i = this.position);
          var r = t == 'absolute' ? 1 : -1,
            e = this.options,
            u =
              this.cssPosition == 'absolute' &&
              !(
                this.scrollParent[0] != document &&
                n.ui.contains(this.scrollParent[0], this.offsetParent[0])
              )
                ? this.offsetParent
                : this.scrollParent,
            f = /(html|body)/i.test(u[0].tagName);
          return {
            top:
              i.top +
              this.offset.relative.top * r +
              this.offset.parent.top * r -
              (n.browser.safari && this.cssPosition == 'fixed'
                ? 0
                : (this.cssPosition == 'fixed'
                    ? -this.scrollParent.scrollTop()
                    : f
                    ? 0
                    : u.scrollTop()) * r),
            left:
              i.left +
              this.offset.relative.left * r +
              this.offset.parent.left * r -
              (n.browser.safari && this.cssPosition == 'fixed'
                ? 0
                : (this.cssPosition == 'fixed'
                    ? -this.scrollParent.scrollLeft()
                    : f
                    ? 0
                    : u.scrollLeft()) * r),
          };
        },
        _generatePosition: function (t) {
          var i = this.options,
            o =
              this.cssPosition == 'absolute' &&
              !(
                this.scrollParent[0] != document &&
                n.ui.contains(this.scrollParent[0], this.offsetParent[0])
              )
                ? this.offsetParent
                : this.scrollParent,
            s = /(html|body)/i.test(o[0].tagName),
            f,
            e,
            r,
            u;
          return (
            this.cssPosition != 'relative' ||
              (this.scrollParent[0] != document &&
                this.scrollParent[0] != this.offsetParent[0]) ||
              (this.offset.relative = this._getRelativeOffset()),
            (f = t.pageX),
            (e = t.pageY),
            this.originalPosition &&
              (this.containment &&
                (t.pageX - this.offset.click.left < this.containment[0] &&
                  (f = this.containment[0] + this.offset.click.left),
                t.pageY - this.offset.click.top < this.containment[1] &&
                  (e = this.containment[1] + this.offset.click.top),
                t.pageX - this.offset.click.left > this.containment[2] &&
                  (f = this.containment[2] + this.offset.click.left),
                t.pageY - this.offset.click.top > this.containment[3] &&
                  (e = this.containment[3] + this.offset.click.top)),
              i.grid &&
                ((r =
                  this.originalPageY +
                  Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1]),
                (e = this.containment
                  ? r - this.offset.click.top < this.containment[1] ||
                    r - this.offset.click.top > this.containment[3]
                    ? r - this.offset.click.top < this.containment[1]
                      ? r + i.grid[1]
                      : r - i.grid[1]
                    : r
                  : r),
                (u =
                  this.originalPageX +
                  Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0]),
                (f = this.containment
                  ? u - this.offset.click.left < this.containment[0] ||
                    u - this.offset.click.left > this.containment[2]
                    ? u - this.offset.click.left < this.containment[0]
                      ? u + i.grid[0]
                      : u - i.grid[0]
                    : u
                  : u))),
            {
              top:
                e -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                (n.browser.safari && this.cssPosition == 'fixed'
                  ? 0
                  : this.cssPosition == 'fixed'
                  ? -this.scrollParent.scrollTop()
                  : s
                  ? 0
                  : o.scrollTop()),
              left:
                f -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                (n.browser.safari && this.cssPosition == 'fixed'
                  ? 0
                  : this.cssPosition == 'fixed'
                  ? -this.scrollParent.scrollLeft()
                  : s
                  ? 0
                  : o.scrollLeft()),
            }
          );
        },
        _rearrange: function (n, t, i, r) {
          i
            ? i[0].appendChild(this.placeholder[0])
            : t.item[0].parentNode.insertBefore(
                this.placeholder[0],
                this.direction == 'down' ? t.item[0] : t.item[0].nextSibling
              );
          this.counter = this.counter ? ++this.counter : 1;
          var u = this,
            f = this.counter;
          window.setTimeout(function () {
            f == u.counter && u.refreshPositions(!r);
          }, 0);
        },
        _clear: function (t, i) {
          var u, f, r;
          if (
            ((this.reverting = !1),
            (u = []),
            (f = this),
            !this._noFinalSort &&
              this.currentItem[0].parentNode &&
              this.placeholder.before(this.currentItem),
            (this._noFinalSort = null),
            this.helper[0] == this.currentItem[0])
          ) {
            for (r in this._storedCSS)
              (this._storedCSS[r] == 'auto' ||
                this._storedCSS[r] == 'static') &&
                (this._storedCSS[r] = '');
            this.currentItem
              .css(this._storedCSS)
              .removeClass('ui-sortable-helper');
          } else this.currentItem.show();
          if (
            (this.fromOutside &&
              !i &&
              u.push(function (n) {
                this._trigger('receive', n, this._uiHash(this.fromOutside));
              }),
            (this.fromOutside ||
              this.domPosition.prev !=
                this.currentItem.prev().not('.ui-sortable-helper')[0] ||
              this.domPosition.parent != this.currentItem.parent()[0]) &&
              !i &&
              u.push(function (n) {
                this._trigger('update', n, this._uiHash());
              }),
            !n.ui.contains(this.element[0], this.currentItem[0]))
          )
            for (
              i ||
                u.push(function (n) {
                  this._trigger('remove', n, this._uiHash());
                }),
                r = this.containers.length - 1;
              r >= 0;
              r--
            )
              n.ui.contains(
                this.containers[r].element[0],
                this.currentItem[0]
              ) &&
                !i &&
                (u.push(
                  function (n) {
                    return function (t) {
                      n._trigger('receive', t, this._uiHash(this));
                    };
                  }.call(this, this.containers[r])
                ),
                u.push(
                  function (n) {
                    return function (t) {
                      n._trigger('update', t, this._uiHash(this));
                    };
                  }.call(this, this.containers[r])
                ));
          for (r = this.containers.length - 1; r >= 0; r--)
            i ||
              u.push(
                function (n) {
                  return function (t) {
                    n._trigger('deactivate', t, this._uiHash(this));
                  };
                }.call(this, this.containers[r])
              ),
              this.containers[r].containerCache.over &&
                (u.push(
                  function (n) {
                    return function (t) {
                      n._trigger('out', t, this._uiHash(this));
                    };
                  }.call(this, this.containers[r])
                ),
                (this.containers[r].containerCache.over = 0));
          if (
            (this._storedCursor && n('body').css('cursor', this._storedCursor),
            this._storedOpacity &&
              this.helper.css('opacity', this._storedOpacity),
            this._storedZIndex &&
              this.helper.css(
                'zIndex',
                this._storedZIndex == 'auto' ? '' : this._storedZIndex
              ),
            (this.dragging = !1),
            this.cancelHelperRemoval)
          ) {
            if (!i) {
              for (
                this._trigger('beforeStop', t, this._uiHash()), r = 0;
                r < u.length;
                r++
              )
                u[r].call(this, t);
              this._trigger('stop', t, this._uiHash());
            }
            return !1;
          }
          if (
            (i || this._trigger('beforeStop', t, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.helper[0] != this.currentItem[0] && this.helper.remove(),
            (this.helper = null),
            !i)
          ) {
            for (r = 0; r < u.length; r++) u[r].call(this, t);
            this._trigger('stop', t, this._uiHash());
          }
          return (this.fromOutside = !1), !0;
        },
        _trigger: function () {
          n.widget.prototype._trigger.apply(this, arguments) === !1 &&
            this.cancel();
        },
        _uiHash: function (t) {
          var i = t || this;
          return {
            helper: i.helper,
            placeholder: i.placeholder || n([]),
            position: i.position,
            absolutePosition: i.positionAbs,
            offset: i.positionAbs,
            item: i.currentItem,
            sender: t ? t.element : null,
          };
        },
      })
    );
    n.extend(n.ui.sortable, {
      getter: 'serialize toArray',
      version: '1.7.3',
      eventPrefix: 'sort',
      defaults: {
        appendTo: 'parent',
        axis: !1,
        cancel: ':input,option',
        connectWith: !1,
        containment: !1,
        cursor: 'auto',
        cursorAt: !1,
        delay: 0,
        distance: 1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: 'original',
        items: '> *',
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: 'default',
        tolerance: 'intersect',
        zIndex: 1e3,
      },
    });
  })(jQuery),
  (function (n) {
    n.widget('ui.accordion', {
      _init: function () {
        var t = this.options,
          r = this,
          i;
        this.running = 0;
        t.collapsible == n.ui.accordion.defaults.collapsible &&
          t.alwaysOpen != n.ui.accordion.defaults.alwaysOpen &&
          (t.collapsible = !t.alwaysOpen);
        t.navigation &&
          ((i = this.element.find('a').filter(t.navigationFilter)),
          i.length &&
            (i.filter(t.header).length
              ? (this.active = i)
              : ((this.active = i.parent().parent().prev()),
                i.addClass('ui-accordion-content-active'))));
        this.element.addClass('ui-accordion ui-widget ui-helper-reset');
        this.element[0].nodeName == 'UL' &&
          this.element.children('li').addClass('ui-accordion-li-fix');
        this.headers = this.element
          .find(t.header)
          .addClass(
            'ui-accordion-header ui-helper-reset ui-state-default ui-corner-all'
          )
          .bind('mouseenter.accordion', function () {
            n(this).addClass('ui-state-hover');
          })
          .bind('mouseleave.accordion', function () {
            n(this).removeClass('ui-state-hover');
          })
          .bind('focus.accordion', function () {
            n(this).addClass('ui-state-focus');
          })
          .bind('blur.accordion', function () {
            n(this).removeClass('ui-state-focus');
          });
        this.headers
          .next()
          .addClass(
            'ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom'
          );
        this.active = this._findActive(this.active || t.active)
          .toggleClass('ui-state-default')
          .toggleClass('ui-state-active')
          .toggleClass('ui-corner-all')
          .toggleClass('ui-corner-top');
        this.active.next().addClass('ui-accordion-content-active');
        n('<span/>')
          .addClass('ui-icon ' + t.icons.header)
          .prependTo(this.headers);
        this.active
          .find('.ui-icon')
          .toggleClass(t.icons.header)
          .toggleClass(t.icons.headerSelected);
        n.browser.msie && this.element.find('a').css('zoom', '1');
        this.resize();
        this.element.attr('role', 'tablist');
        this.headers
          .attr('role', 'tab')
          .bind('keydown', function (n) {
            return r._keydown(n);
          })
          .next()
          .attr('role', 'tabpanel');
        this.headers
          .not(this.active || '')
          .attr('aria-expanded', 'false')
          .attr('tabIndex', '-1')
          .next()
          .hide();
        this.active.length
          ? this.active.attr('aria-expanded', 'true').attr('tabIndex', '0')
          : this.headers.eq(0).attr('tabIndex', '0');
        n.browser.safari || this.headers.find('a').attr('tabIndex', '-1');
        t.event &&
          this.headers.bind(t.event + '.accordion', function (n) {
            return r._clickHandler.call(r, n, this);
          });
      },
      destroy: function () {
        var n = this.options,
          t;
        this.element
          .removeClass('ui-accordion ui-widget ui-helper-reset')
          .removeAttr('role')
          .unbind('.accordion')
          .removeData('accordion');
        this.headers
          .unbind('.accordion')
          .removeClass(
            'ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top'
          )
          .removeAttr('role')
          .removeAttr('aria-expanded')
          .removeAttr('tabindex');
        this.headers.find('a').removeAttr('tabindex');
        this.headers.children('.ui-icon').remove();
        t = this.headers
          .next()
          .css('display', '')
          .removeAttr('role')
          .removeClass(
            'ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active'
          );
        (n.autoHeight || n.fillHeight) && t.css('height', '');
      },
      _setData: function (t, i) {
        t == 'alwaysOpen' && ((t = 'collapsible'), (i = !i));
        n.widget.prototype._setData.apply(this, arguments);
      },
      _keydown: function (t) {
        var e = this.options,
          i = n.ui.keyCode;
        if (!e.disabled && !t.altKey && !t.ctrlKey) {
          var u = this.headers.length,
            f = this.headers.index(t.target),
            r = !1;
          switch (t.keyCode) {
            case i.RIGHT:
            case i.DOWN:
              r = this.headers[(f + 1) % u];
              break;
            case i.LEFT:
            case i.UP:
              r = this.headers[(f - 1 + u) % u];
              break;
            case i.SPACE:
            case i.ENTER:
              return this._clickHandler({ target: t.target }, t.target);
          }
          return r
            ? (n(t.target).attr('tabIndex', '-1'),
              n(r).attr('tabIndex', '0'),
              r.focus(),
              !1)
            : !0;
        }
      },
      resize: function () {
        var r = this.options,
          t,
          u,
          i;
        r.fillSpace
          ? (n.browser.msie &&
              ((u = this.element.parent().css('overflow')),
              this.element.parent().css('overflow', 'hidden')),
            (t = this.element.parent().height()),
            n.browser.msie && this.element.parent().css('overflow', u),
            this.headers.each(function () {
              t -= n(this).outerHeight();
            }),
            (i = 0),
            this.headers
              .next()
              .each(function () {
                i = Math.max(i, n(this).innerHeight() - n(this).height());
              })
              .height(Math.max(0, t - i))
              .css('overflow', 'auto'))
          : r.autoHeight &&
            ((t = 0),
            this.headers
              .next()
              .each(function () {
                t = Math.max(t, n(this).outerHeight());
              })
              .height(t));
      },
      activate: function (n) {
        var t = this._findActive(n)[0];
        this._clickHandler({ target: t }, t);
      },
      _findActive: function (t) {
        return t
          ? typeof t == 'number'
            ? this.headers.filter(':eq(' + t + ')')
            : this.headers.not(this.headers.not(t))
          : t === !1
          ? n([])
          : this.headers.filter(':eq(0)');
      },
      _clickHandler: function (t, i) {
        var r = this.options,
          u,
          f;
        if (r.disabled) return !1;
        if (!t.target && r.collapsible) {
          this.active
            .removeClass('ui-state-active ui-corner-top')
            .addClass('ui-state-default ui-corner-all')
            .find('.ui-icon')
            .removeClass(r.icons.headerSelected)
            .addClass(r.icons.header);
          this.active.next().addClass('ui-accordion-content-active');
          var e = this.active.next(),
            s = {
              options: r,
              newHeader: n([]),
              oldHeader: r.active,
              newContent: n([]),
              oldContent: e,
            },
            o = (this.active = n([]));
          return this._toggle(o, e, s), !1;
        }
        if (
          ((u = n(t.currentTarget || i)),
          (f = u[0] == this.active[0]),
          this.running || (!r.collapsible && f))
        )
          return !1;
        this.active
          .removeClass('ui-state-active ui-corner-top')
          .addClass('ui-state-default ui-corner-all')
          .find('.ui-icon')
          .removeClass(r.icons.headerSelected)
          .addClass(r.icons.header);
        this.active.next().addClass('ui-accordion-content-active');
        f ||
          (u
            .removeClass('ui-state-default ui-corner-all')
            .addClass('ui-state-active ui-corner-top')
            .find('.ui-icon')
            .removeClass(r.icons.header)
            .addClass(r.icons.headerSelected),
          u.next().addClass('ui-accordion-content-active'));
        var o = u.next(),
          e = this.active.next(),
          s = {
            options: r,
            newHeader: f && r.collapsible ? n([]) : u,
            oldHeader: this.active,
            newContent: f && r.collapsible ? n([]) : o.find('> *'),
            oldContent: e.find('> *'),
          },
          h = this.headers.index(this.active[0]) > this.headers.index(u[0]);
        return (this.active = f ? n([]) : u), this._toggle(o, e, s, f, h), !1;
      },
      _toggle: function (t, i, r, u, f) {
        var e = this.options,
          c = this,
          s,
          o;
        if (
          ((this.toShow = t),
          (this.toHide = i),
          (this.data = r),
          (s = function () {
            if (c) return c._completed.apply(c, arguments);
          }),
          this._trigger('changestart', null, this.data),
          (this.running = i.size() === 0 ? t.size() : i.size()),
          e.animated)
        ) {
          o = {};
          o =
            e.collapsible && u
              ? {
                  toShow: n([]),
                  toHide: i,
                  complete: s,
                  down: f,
                  autoHeight: e.autoHeight || e.fillSpace,
                }
              : {
                  toShow: t,
                  toHide: i,
                  complete: s,
                  down: f,
                  autoHeight: e.autoHeight || e.fillSpace,
                };
          e.proxied || (e.proxied = e.animated);
          e.proxiedDuration || (e.proxiedDuration = e.duration);
          e.animated = n.isFunction(e.proxied) ? e.proxied(o) : e.proxied;
          e.duration = n.isFunction(e.proxiedDuration)
            ? e.proxiedDuration(o)
            : e.proxiedDuration;
          var l = n.ui.accordion.animations,
            a = e.duration,
            h = e.animated;
          l[h] ||
            (l[h] = function (n) {
              this.slide(n, { easing: h, duration: a || 700 });
            });
          l[h](o);
        } else e.collapsible && u ? t.toggle() : (i.hide(), t.show()), s(!0);
        i.prev().attr('aria-expanded', 'false').attr('tabIndex', '-1').blur();
        t.prev().attr('aria-expanded', 'true').attr('tabIndex', '0').focus();
      },
      _completed: function (n) {
        var t = this.options;
        ((this.running = n ? 0 : --this.running), this.running) ||
          (t.clearStyle &&
            this.toShow.add(this.toHide).css({ height: '', overflow: '' }),
          this._trigger('change', null, this.data));
      },
    });
    n.extend(n.ui.accordion, {
      version: '1.7.3',
      defaults: {
        active: null,
        alwaysOpen: !0,
        animated: 'slide',
        autoHeight: !0,
        clearStyle: !1,
        collapsible: !1,
        event: 'click',
        fillSpace: !1,
        header: '> li > :first-child,> :not(li):even',
        icons: {
          header: 'ui-icon-triangle-1-e',
          headerSelected: 'ui-icon-triangle-1-s',
        },
        navigation: !1,
        navigationFilter: function () {
          return this.href.toLowerCase() == location.href.toLowerCase();
        },
      },
      animations: {
        slide: function (t, i) {
          if (
            ((t = n.extend({ easing: 'swing', duration: 300 }, t, i)),
            !t.toHide.size())
          ) {
            t.toShow.animate({ height: 'show' }, t);
            return;
          }
          if (!t.toShow.size()) {
            t.toHide.animate({ height: 'hide' }, t);
            return;
          }
          var s = t.toShow.css('overflow'),
            f,
            u = {},
            e = {},
            h = ['height', 'paddingTop', 'paddingBottom'],
            o,
            r = t.toShow;
          o = r[0].style.width;
          r.width(
            parseInt(r.parent().width(), 10) -
              parseInt(r.css('paddingLeft'), 10) -
              parseInt(r.css('paddingRight'), 10) -
              (parseInt(r.css('borderLeftWidth'), 10) || 0) -
              (parseInt(r.css('borderRightWidth'), 10) || 0)
          );
          n.each(h, function (i, r) {
            e[r] = 'hide';
            var f = ('' + n.css(t.toShow[0], r)).match(/^([\d+-.]+)(.*)$/);
            u[r] = { value: f[1], unit: f[2] || 'px' };
          });
          t.toShow.css({ height: 0, overflow: 'hidden' }).show();
          t.toHide
            .filter(':hidden')
            .each(t.complete)
            .end()
            .filter(':visible')
            .animate(e, {
              step: function (n, i) {
                i.prop == 'height' &&
                  (f = (i.now - i.start) / (i.end - i.start));
                t.toShow[0].style[i.prop] =
                  f * u[i.prop].value + u[i.prop].unit;
              },
              duration: t.duration,
              easing: t.easing,
              complete: function () {
                t.autoHeight || t.toShow.css('height', '');
                t.toShow.css('width', o);
                t.toShow.css({ overflow: s });
                t.complete();
              },
            });
        },
        bounceslide: function (n) {
          this.slide(n, {
            easing: n.down ? 'easeOutBounce' : 'swing',
            duration: n.down ? 1e3 : 200,
          });
        },
        easeslide: function (n) {
          this.slide(n, { easing: 'easeinout', duration: 700 });
        },
      },
    });
  })(jQuery),
  (function (n) {
    var t = {
        dragStart: 'start.draggable',
        drag: 'drag.draggable',
        dragStop: 'stop.draggable',
        maxHeight: 'maxHeight.resizable',
        minHeight: 'minHeight.resizable',
        maxWidth: 'maxWidth.resizable',
        minWidth: 'minWidth.resizable',
        resizeStart: 'start.resizable',
        resize: 'drag.resizable',
        resizeStop: 'stop.resizable',
      },
      i = 'ui-dialog ui-widget ui-widget-content ui-corner-all ';
    n.widget('ui.dialog', {
      _init: function () {
        this.originalTitle = this.element.attr('title');
        var f = this,
          t = this.options,
          s = t.title || this.originalTitle || '&nbsp;',
          o = n.ui.dialog.getTitleId(this.element),
          e = (this.uiDialog = n('<div/>'))
            .appendTo(document.body)
            .hide()
            .addClass(i + t.dialogClass)
            .css({ position: 'absolute', overflow: 'hidden', zIndex: t.zIndex })
            .attr('tabIndex', -1)
            .css('outline', 0)
            .keydown(function (i) {
              t.closeOnEscape &&
                i.keyCode &&
                i.keyCode == n.ui.keyCode.ESCAPE &&
                f.close(i);
            })
            .attr({ role: 'dialog', 'aria-labelledby': o })
            .mousedown(function (n) {
              f.moveToTop(!1, n);
            }),
          h = this.element
            .show()
            .removeAttr('title')
            .addClass('ui-dialog-content ui-widget-content')
            .appendTo(e),
          u = (this.uiDialogTitlebar = n('<div></div>'))
            .addClass(
              'ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix'
            )
            .prependTo(e),
          r = n('<a href="#"/>')
            .addClass('ui-dialog-titlebar-close ui-corner-all')
            .attr('role', 'button')
            .hover(
              function () {
                r.addClass('ui-state-hover');
              },
              function () {
                r.removeClass('ui-state-hover');
              }
            )
            .focus(function () {
              r.addClass('ui-state-focus');
            })
            .blur(function () {
              r.removeClass('ui-state-focus');
            })
            .mousedown(function (n) {
              n.stopPropagation();
            })
            .click(function (n) {
              return f.close(n), !1;
            })
            .appendTo(u),
          c = (this.uiDialogTitlebarCloseText = n('<span/>'))
            .addClass('ui-icon ui-icon-closethick')
            .text(t.closeText)
            .appendTo(r),
          l = n('<span/>')
            .addClass('ui-dialog-title')
            .attr('id', o)
            .html(s)
            .prependTo(u);
        u.find('*').add(u).disableSelection();
        t.draggable && n.fn.draggable && this._makeDraggable();
        t.resizable && n.fn.resizable && this._makeResizable();
        this._createButtons(t.buttons);
        this._isOpen = !1;
        t.bgiframe && n.fn.bgiframe && e.bgiframe();
        t.autoOpen && this.open();
      },
      destroy: function () {
        this.overlay && this.overlay.destroy();
        this.uiDialog.hide();
        this.element
          .unbind('.dialog')
          .removeData('dialog')
          .removeClass('ui-dialog-content ui-widget-content')
          .hide()
          .appendTo('body');
        this.uiDialog.remove();
        this.originalTitle && this.element.attr('title', this.originalTitle);
      },
      close: function (t) {
        var i = this,
          r;
        !1 !== i._trigger('beforeclose', t) &&
          (i.overlay && i.overlay.destroy(),
          i.uiDialog.unbind('keypress.ui-dialog'),
          i.options.hide
            ? i.uiDialog.hide(i.options.hide, function () {
                i._trigger('close', t);
              })
            : i.uiDialog.hide() && i._trigger('close', t),
          n.ui.dialog.overlay.resize(),
          (i._isOpen = !1),
          i.options.modal &&
            ((r = 0),
            n('.ui-dialog').each(function () {
              this != i.uiDialog[0] &&
                (r = Math.max(r, n(this).css('z-index')));
            }),
            (n.ui.dialog.maxZ = r)));
      },
      isOpen: function () {
        return this._isOpen;
      },
      moveToTop: function (t, i) {
        if (
          (this.options.modal && !t) ||
          (!this.options.stack && !this.options.modal)
        )
          return this._trigger('focus', i);
        this.options.zIndex > n.ui.dialog.maxZ &&
          (n.ui.dialog.maxZ = this.options.zIndex);
        this.overlay &&
          this.overlay.$el.css(
            'z-index',
            (n.ui.dialog.overlay.maxZ = ++n.ui.dialog.maxZ)
          );
        var r = {
          scrollTop: this.element.attr('scrollTop'),
          scrollLeft: this.element.attr('scrollLeft'),
        };
        this.uiDialog.css('z-index', ++n.ui.dialog.maxZ);
        this.element.attr(r);
        this._trigger('focus', i);
      },
      open: function () {
        if (!this._isOpen) {
          var i = this.options,
            t = this.uiDialog;
          this.overlay = i.modal ? new n.ui.dialog.overlay(this) : null;
          t.next().length && t.appendTo('body');
          this._size();
          this._position(i.position);
          t.show(i.show);
          this.moveToTop(!0);
          i.modal &&
            t.bind('keypress.ui-dialog', function (t) {
              if (t.keyCode == n.ui.keyCode.TAB) {
                var i = n(':tabbable', this),
                  r = i.filter(':first')[0],
                  u = i.filter(':last')[0];
                t.target != u || t.shiftKey
                  ? t.target == r &&
                    t.shiftKey &&
                    setTimeout(function () {
                      u.focus();
                    }, 1)
                  : setTimeout(function () {
                      r.focus();
                    }, 1);
              }
            });
          n([])
            .add(t.find('.ui-dialog-content :tabbable:first'))
            .add(t.find('.ui-dialog-buttonpane :tabbable:first'))
            .add(t)
            .filter(':first')
            .focus();
          this._trigger('open');
          this._isOpen = !0;
        }
      },
      _createButtons: function (t) {
        var u = this,
          i = !1,
          r = n('<div></div>').addClass(
            'ui-dialog-buttonpane ui-widget-content ui-helper-clearfix'
          );
        this.uiDialog.find('.ui-dialog-buttonpane').remove();
        typeof t == 'object' &&
          t !== null &&
          n.each(t, function () {
            return !(i = !0);
          });
        i &&
          (n.each(t, function (t, i) {
            n('<button type="button"></button>')
              .addClass('ui-state-default ui-corner-all')
              .text(t)
              .click(function () {
                i.apply(u.element[0], arguments);
              })
              .hover(
                function () {
                  n(this).addClass('ui-state-hover');
                },
                function () {
                  n(this).removeClass('ui-state-hover');
                }
              )
              .focus(function () {
                n(this).addClass('ui-state-focus');
              })
              .blur(function () {
                n(this).removeClass('ui-state-focus');
              })
              .appendTo(r);
          }),
          r.appendTo(this.uiDialog));
      },
      _makeDraggable: function () {
        var i = this,
          t = this.options,
          r;
        this.uiDialog.draggable({
          cancel: '.ui-dialog-content',
          handle: '.ui-dialog-titlebar',
          containment: 'document',
          start: function () {
            r = t.height;
            n(this).height(n(this).height()).addClass('ui-dialog-dragging');
            t.dragStart && t.dragStart.apply(i.element[0], arguments);
          },
          drag: function () {
            t.drag && t.drag.apply(i.element[0], arguments);
          },
          stop: function () {
            n(this).removeClass('ui-dialog-dragging').height(r);
            t.dragStop && t.dragStop.apply(i.element[0], arguments);
            n.ui.dialog.overlay.resize();
          },
        });
      },
      _makeResizable: function (t) {
        t = t === undefined ? this.options.resizable : t;
        var r = this,
          i = this.options,
          u = typeof t == 'string' ? t : 'n,e,s,w,se,sw,ne,nw';
        this.uiDialog
          .resizable({
            cancel: '.ui-dialog-content',
            alsoResize: this.element,
            maxWidth: i.maxWidth,
            maxHeight: i.maxHeight,
            minWidth: i.minWidth,
            minHeight: i.minHeight,
            start: function () {
              n(this).addClass('ui-dialog-resizing');
              i.resizeStart && i.resizeStart.apply(r.element[0], arguments);
            },
            resize: function () {
              i.resize && i.resize.apply(r.element[0], arguments);
            },
            handles: u,
            stop: function () {
              n(this).removeClass('ui-dialog-resizing');
              i.height = n(this).height();
              i.width = n(this).width();
              i.resizeStop && i.resizeStop.apply(r.element[0], arguments);
              n.ui.dialog.overlay.resize();
            },
          })
          .find('.ui-resizable-se')
          .addClass('ui-icon ui-icon-grip-diagonal-se');
      },
      _position: function (t) {
        var u = n(window),
          f = n(document),
          i = f.scrollTop(),
          r = f.scrollLeft(),
          e = i;
        if (
          (n.inArray(t, ['center', 'top', 'right', 'bottom', 'left']) >= 0 &&
            (t = [
              t == 'right' || t == 'left' ? t : 'center',
              t == 'top' || t == 'bottom' ? t : 'middle',
            ]),
          t.constructor != Array && (t = ['center', 'middle']),
          t[0].constructor == Number)
        )
          r += t[0];
        else
          switch (t[0]) {
            case 'left':
              r += 0;
              break;
            case 'right':
              r += u.width() - this.uiDialog.outerWidth();
              break;
            default:
            case 'center':
              r += (u.width() - this.uiDialog.outerWidth()) / 2;
          }
        if (t[1].constructor == Number) i += t[1];
        else
          switch (t[1]) {
            case 'top':
              i += 0;
              break;
            case 'bottom':
              i += u.height() - this.uiDialog.outerHeight();
              break;
            default:
            case 'middle':
              i += (u.height() - this.uiDialog.outerHeight()) / 2;
          }
        i = Math.max(i, e);
        this.uiDialog.css({ top: i, left: r });
      },
      _setData: function (r, u) {
        t[r] && this.uiDialog.data(t[r], u);
        switch (r) {
          case 'buttons':
            this._createButtons(u);
            break;
          case 'closeText':
            this.uiDialogTitlebarCloseText.text(u);
            break;
          case 'dialogClass':
            this.uiDialog.removeClass(this.options.dialogClass).addClass(i + u);
            break;
          case 'draggable':
            u ? this._makeDraggable() : this.uiDialog.draggable('destroy');
            break;
          case 'height':
            this.uiDialog.height(u);
            break;
          case 'position':
            this._position(u);
            break;
          case 'resizable':
            var e = this.uiDialog,
              f = this.uiDialog.is(':data(resizable)');
            f && !u && e.resizable('destroy');
            f && typeof u == 'string' && e.resizable('option', 'handles', u);
            f || this._makeResizable(u);
            break;
          case 'title':
            n('.ui-dialog-title', this.uiDialogTitlebar).html(u || '&nbsp;');
            break;
          case 'width':
            this.uiDialog.width(u);
            break;
        }
        n.widget.prototype._setData.apply(this, arguments);
      },
      _size: function () {
        var n = this.options,
          t;
        this.element.css({ height: 0, minHeight: 0, width: 'auto' });
        t = this.uiDialog.css({ height: 'auto', width: n.width }).height();
        this.element.css({
          minHeight: Math.max(n.minHeight - t, 0),
          height: n.height == 'auto' ? 'auto' : Math.max(n.height - t, 0),
        });
      },
    });
    n.extend(n.ui.dialog, {
      version: '1.7.3',
      defaults: {
        autoOpen: !0,
        bgiframe: !1,
        buttons: {},
        closeOnEscape: !0,
        closeText: 'close',
        dialogClass: '',
        draggable: !0,
        hide: null,
        height: 'auto',
        maxHeight: !1,
        maxWidth: !1,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: 'center',
        resizable: !0,
        show: null,
        stack: !0,
        title: '',
        width: 300,
        zIndex: 1e3,
      },
      getter: 'isOpen',
      uuid: 0,
      maxZ: 0,
      getTitleId: function (n) {
        return 'ui-dialog-title-' + (n.attr('id') || ++this.uuid);
      },
      overlay: function (t) {
        this.$el = n.ui.dialog.overlay.create(t);
      },
    });
    n.extend(n.ui.dialog.overlay, {
      instances: [],
      maxZ: 0,
      events: n
        .map(
          'focus,mousedown,mouseup,keydown,keypress,click'.split(','),
          function (n) {
            return n + '.dialog-overlay';
          }
        )
        .join(' '),
      create: function (t) {
        this.instances.length === 0 &&
          (setTimeout(function () {
            n.ui.dialog.overlay.instances.length &&
              n(document).bind(n.ui.dialog.overlay.events, function (t) {
                var i = n(t.target).parents('.ui-dialog').css('zIndex') || 0;
                return i > n.ui.dialog.overlay.maxZ;
              });
          }, 1),
          n(document).bind('keydown.dialog-overlay', function (i) {
            t.options.closeOnEscape &&
              i.keyCode &&
              i.keyCode == n.ui.keyCode.ESCAPE &&
              t.close(i);
          }),
          n(window).bind('resize.dialog-overlay', n.ui.dialog.overlay.resize));
        var i = n('<div></div>')
          .appendTo(document.body)
          .addClass('ui-widget-overlay')
          .css({ width: this.width(), height: this.height() });
        return (
          t.options.bgiframe && n.fn.bgiframe && i.bgiframe(),
          this.instances.push(i),
          i
        );
      },
      destroy: function (t) {
        this.instances.splice(n.inArray(this.instances, t), 1);
        this.instances.length === 0 &&
          n([document, window]).unbind('.dialog-overlay');
        t.remove();
        var i = 0;
        n.each(this.instances, function () {
          i = Math.max(i, this.css('z-index'));
        });
        this.maxZ = i;
      },
      height: function () {
        if (n.browser.msie && n.browser.version < 7) {
          var t = Math.max(
              document.documentElement.scrollHeight,
              document.body.scrollHeight
            ),
            i = Math.max(
              document.documentElement.offsetHeight,
              document.body.offsetHeight
            );
          return t < i ? n(window).height() + 'px' : t + 'px';
        } else return n(document).height() + 'px';
      },
      width: function () {
        if (n.browser.msie && n.browser.version < 7) {
          var t = Math.max(
              document.documentElement.scrollWidth,
              document.body.scrollWidth
            ),
            i = Math.max(
              document.documentElement.offsetWidth,
              document.body.offsetWidth
            );
          return t < i ? n(window).width() + 'px' : t + 'px';
        } else return n(document).width() + 'px';
      },
      resize: function () {
        var t = n([]);
        n.each(n.ui.dialog.overlay.instances, function () {
          t = t.add(this);
        });
        t.css({ width: 0, height: 0 }).css({
          width: n.ui.dialog.overlay.width(),
          height: n.ui.dialog.overlay.height(),
        });
      },
    });
    n.extend(n.ui.dialog.overlay.prototype, {
      destroy: function () {
        n.ui.dialog.overlay.destroy(this.$el);
      },
    });
  })(jQuery),
  (function (n) {
    n.widget(
      'ui.slider',
      n.extend({}, n.ui.mouse, {
        _init: function () {
          var t = this,
            i = this.options;
          if (
            ((this._keySliding = !1),
            (this._handleIndex = null),
            this._detectOrientation(),
            this._mouseInit(),
            this.element.addClass(
              'ui-slider ui-slider-' +
                this.orientation +
                ' ui-widget ui-widget-content ui-corner-all'
            ),
            (this.range = n([])),
            i.range &&
              (i.range === !0
                ? ((this.range = n('<div></div>')),
                  i.values || (i.values = [this._valueMin(), this._valueMin()]),
                  i.values.length &&
                    i.values.length != 2 &&
                    (i.values = [i.values[0], i.values[0]]))
                : (this.range = n('<div></div>')),
              this.range.appendTo(this.element).addClass('ui-slider-range'),
              (i.range == 'min' || i.range == 'max') &&
                this.range.addClass('ui-slider-range-' + i.range),
              this.range.addClass('ui-widget-header')),
            n('.ui-slider-handle', this.element).length == 0 &&
              n('<a href="#"></a>')
                .appendTo(this.element)
                .addClass('ui-slider-handle'),
            i.values && i.values.length)
          )
            while (
              n('.ui-slider-handle', this.element).length < i.values.length
            )
              n('<a href="#"></a>')
                .appendTo(this.element)
                .addClass('ui-slider-handle');
          this.handles = n('.ui-slider-handle', this.element).addClass(
            'ui-state-default ui-corner-all'
          );
          this.handle = this.handles.eq(0);
          this.handles
            .add(this.range)
            .filter('a')
            .click(function (n) {
              n.preventDefault();
            })
            .hover(
              function () {
                i.disabled || n(this).addClass('ui-state-hover');
              },
              function () {
                n(this).removeClass('ui-state-hover');
              }
            )
            .focus(function () {
              i.disabled
                ? n(this).blur()
                : (n('.ui-slider .ui-state-focus').removeClass(
                    'ui-state-focus'
                  ),
                  n(this).addClass('ui-state-focus'));
            })
            .blur(function () {
              n(this).removeClass('ui-state-focus');
            });
          this.handles.each(function (t) {
            n(this).data('index.ui-slider-handle', t);
          });
          this.handles
            .keydown(function (i) {
              var o = !0,
                f = n(this).data('index.ui-slider-handle'),
                u,
                r,
                e;
              if (!t.options.disabled) {
                switch (i.keyCode) {
                  case n.ui.keyCode.HOME:
                  case n.ui.keyCode.END:
                  case n.ui.keyCode.UP:
                  case n.ui.keyCode.RIGHT:
                  case n.ui.keyCode.DOWN:
                  case n.ui.keyCode.LEFT:
                    o = !1;
                    t._keySliding ||
                      ((t._keySliding = !0),
                      n(this).addClass('ui-state-active'),
                      t._start(i, f));
                    break;
                }
                e = t._step();
                u =
                  t.options.values && t.options.values.length
                    ? (r = t.values(f))
                    : (r = t.value());
                switch (i.keyCode) {
                  case n.ui.keyCode.HOME:
                    r = t._valueMin();
                    break;
                  case n.ui.keyCode.END:
                    r = t._valueMax();
                    break;
                  case n.ui.keyCode.UP:
                  case n.ui.keyCode.RIGHT:
                    if (u == t._valueMax()) return;
                    r = u + e;
                    break;
                  case n.ui.keyCode.DOWN:
                  case n.ui.keyCode.LEFT:
                    if (u == t._valueMin()) return;
                    r = u - e;
                    break;
                }
                return t._slide(i, f, r), o;
              }
            })
            .keyup(function (i) {
              var r = n(this).data('index.ui-slider-handle');
              t._keySliding &&
                (t._stop(i, r),
                t._change(i, r),
                (t._keySliding = !1),
                n(this).removeClass('ui-state-active'));
            });
          this._refreshValue();
        },
        destroy: function () {
          this.handles.remove();
          this.range.remove();
          this.element
            .removeClass(
              'ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all'
            )
            .removeData('slider')
            .unbind('.slider');
          this._mouseDestroy();
        },
        _mouseCapture: function (t) {
          var u = this.options,
            e,
            c;
          if (u.disabled) return !1;
          this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          };
          this.elementOffset = this.element.offset();
          var o = { x: t.pageX, y: t.pageY },
            f = this._normValueFromMouse(o),
            s = this._valueMax() - this._valueMin() + 1,
            i,
            h = this,
            r;
          return (
            this.handles.each(function (t) {
              var u = Math.abs(f - h.values(t));
              s > u && ((s = u), (i = n(this)), (r = t));
            }),
            u.range == !0 &&
              this.values(1) == u.min &&
              (i = n(this.handles[++r])),
            this._start(t, r),
            (h._handleIndex = r),
            i.addClass('ui-state-active').focus(),
            (e = i.offset()),
            (c = !n(t.target).parents().andSelf().is('.ui-slider-handle')),
            (this._clickOffset = c
              ? { left: 0, top: 0 }
              : {
                  left: t.pageX - e.left - i.width() / 2,
                  top:
                    t.pageY -
                    e.top -
                    i.height() / 2 -
                    (parseInt(i.css('borderTopWidth'), 10) || 0) -
                    (parseInt(i.css('borderBottomWidth'), 10) || 0) +
                    (parseInt(i.css('marginTop'), 10) || 0),
                }),
            (f = this._normValueFromMouse(o)),
            this._slide(t, r, f),
            !0
          );
        },
        _mouseStart: function (n) {
          return !0;
        },
        _mouseDrag: function (n) {
          var t = { x: n.pageX, y: n.pageY },
            i = this._normValueFromMouse(t);
          return this._slide(n, this._handleIndex, i), !1;
        },
        _mouseStop: function (n) {
          return (
            this.handles.removeClass('ui-state-active'),
            this._stop(n, this._handleIndex),
            this._change(n, this._handleIndex),
            (this._handleIndex = null),
            (this._clickOffset = null),
            !1
          );
        },
        _detectOrientation: function () {
          this.orientation =
            this.options.orientation == 'vertical' ? 'vertical' : 'horizontal';
        },
        _normValueFromMouse: function (n) {
          var i, r, t;
          'horizontal' == this.orientation
            ? ((i = this.elementSize.width),
              (r =
                n.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((i = this.elementSize.height),
              (r =
                n.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0)));
          t = r / i;
          t > 1 && (t = 1);
          t < 0 && (t = 0);
          'vertical' == this.orientation && (t = 1 - t);
          var o = this._valueMax() - this._valueMin(),
            u = t * o,
            f = u % this.options.step,
            e = this._valueMin() + u - f;
          return (
            f > this.options.step / 2 && (e += this.options.step),
            parseFloat(e.toFixed(5))
          );
        },
        _start: function (n, t) {
          var i = { handle: this.handles[t], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values()));
          this._trigger('start', n, i);
        },
        _slide: function (n, t, i) {
          var e = this.handles[t],
            f,
            r,
            u;
          this.options.values && this.options.values.length
            ? ((r = this.values(t ? 0 : 1)),
              this.options.values.length == 2 &&
                this.options.range === !0 &&
                ((t == 0 && i > r) || (t == 1 && i < r)) &&
                (i = r),
              i != this.values(t) &&
                ((f = this.values()),
                (f[t] = i),
                (u = this._trigger('slide', n, {
                  handle: this.handles[t],
                  value: i,
                  values: f,
                })),
                (r = this.values(t ? 0 : 1)),
                u !== !1 &&
                  this.values(
                    t,
                    i,
                    n.type == 'mousedown' && this.options.animate,
                    !0
                  )))
            : i != this.value() &&
              ((u = this._trigger('slide', n, {
                handle: this.handles[t],
                value: i,
              })),
              u !== !1 &&
                this._setData(
                  'value',
                  i,
                  n.type == 'mousedown' && this.options.animate
                ));
        },
        _stop: function (n, t) {
          var i = { handle: this.handles[t], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values()));
          this._trigger('stop', n, i);
        },
        _change: function (n, t) {
          var i = { handle: this.handles[t], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values()));
          this._trigger('change', n, i);
        },
        value: function (n) {
          return (
            arguments.length &&
              (this._setData('value', n), this._change(null, 0)),
            this._value()
          );
        },
        values: function (n, t, i, r) {
          return (
            arguments.length > 1 &&
              ((this.options.values[n] = t),
              this._refreshValue(i),
              r || this._change(null, n)),
            arguments.length
              ? this.options.values && this.options.values.length
                ? this._values(n)
                : this.value()
              : this._values()
          );
        },
        _setData: function (t, i, r) {
          n.widget.prototype._setData.apply(this, arguments);
          switch (t) {
            case 'disabled':
              i
                ? (this.handles.filter('.ui-state-focus').blur(),
                  this.handles.removeClass('ui-state-hover'),
                  this.handles.attr('disabled', 'disabled'))
                : this.handles.removeAttr('disabled');
            case 'orientation':
              this._detectOrientation();
              this.element
                .removeClass('ui-slider-horizontal ui-slider-vertical')
                .addClass('ui-slider-' + this.orientation);
              this._refreshValue(r);
              break;
            case 'value':
              this._refreshValue(r);
              break;
          }
        },
        _step: function () {
          return this.options.step;
        },
        _value: function () {
          var n = this.options.value;
          return (
            n < this._valueMin() && (n = this._valueMin()),
            n > this._valueMax() && (n = this._valueMax()),
            n
          );
        },
        _values: function (n) {
          if (arguments.length) {
            var t = this.options.values[n];
            return (
              t < this._valueMin() && (t = this._valueMin()),
              t > this._valueMax() && (t = this._valueMax()),
              t
            );
          } else return this.options.values;
        },
        _valueMin: function () {
          return this.options.min;
        },
        _valueMax: function () {
          return this.options.max;
        },
        _refreshValue: function (t) {
          var f = this.options.range,
            r = this.options,
            i = this,
            c,
            l;
          if (this.options.values && this.options.values.length)
            this.handles.each(function (u, f) {
              var e =
                  ((i.values(u) - i._valueMin()) /
                    (i._valueMax() - i._valueMin())) *
                  100,
                o = {};
              o[i.orientation == 'horizontal' ? 'left' : 'bottom'] = e + '%';
              n(this).stop(1, 1)[t ? 'animate' : 'css'](o, r.animate);
              i.options.range === !0 &&
                (i.orientation == 'horizontal'
                  ? (u == 0 &&
                      i.range
                        .stop(1, 1)
                        [t ? 'animate' : 'css']({ left: e + '%' }, r.animate),
                    u == 1 &&
                      i.range[t ? 'animate' : 'css'](
                        { width: e - lastValPercent + '%' },
                        { queue: !1, duration: r.animate }
                      ))
                  : (u == 0 &&
                      i.range
                        .stop(1, 1)
                        [t ? 'animate' : 'css']({ bottom: e + '%' }, r.animate),
                    u == 1 &&
                      i.range[t ? 'animate' : 'css'](
                        { height: e - lastValPercent + '%' },
                        { queue: !1, duration: r.animate }
                      )));
              lastValPercent = e;
            });
          else {
            var h = this.value(),
              e = this._valueMin(),
              o = this._valueMax(),
              u = o != e ? ((h - e) / (o - e)) * 100 : 0,
              s = {};
            s[i.orientation == 'horizontal' ? 'left' : 'bottom'] = u + '%';
            this.handle.stop(1, 1)[t ? 'animate' : 'css'](s, r.animate);
            f == 'min' &&
              this.orientation == 'horizontal' &&
              this.range
                .stop(1, 1)
                [t ? 'animate' : 'css']({ width: u + '%' }, r.animate);
            f == 'max' &&
              this.orientation == 'horizontal' &&
              this.range[t ? 'animate' : 'css'](
                { width: 100 - u + '%' },
                { queue: !1, duration: r.animate }
              );
            f == 'min' &&
              this.orientation == 'vertical' &&
              this.range
                .stop(1, 1)
                [t ? 'animate' : 'css']({ height: u + '%' }, r.animate);
            f == 'max' &&
              this.orientation == 'vertical' &&
              this.range[t ? 'animate' : 'css'](
                { height: 100 - u + '%' },
                { queue: !1, duration: r.animate }
              );
          }
        },
      })
    );
    n.extend(n.ui.slider, {
      getter: 'value values',
      version: '1.7.3',
      eventPrefix: 'slide',
      defaults: {
        animate: !1,
        delay: 0,
        distance: 0,
        max: 100,
        min: 0,
        orientation: 'horizontal',
        range: !1,
        step: 1,
        value: 0,
        values: null,
      },
    });
  })(jQuery),
  (function (n) {
    var i = 0,
      r = 0;
    n.widget('ui.tabs', {
      _init: function () {
        this.options.deselectable !== undefined &&
          (this.options.collapsible = this.options.deselectable);
        this._tabify(!0);
      },
      _setData: function (n, t) {
        if (n == 'selected') {
          if (this.options.collapsible && t == this.options.selected) return;
          this.select(t);
        } else
          (this.options[n] = t),
            n == 'deselectable' && (this.options.collapsible = t),
            this._tabify();
      },
      _tabId: function (n) {
        return (
          (n.title &&
            n.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '')) ||
          this.options.idPrefix + ++i
        );
      },
      _sanitizeSelector: function (n) {
        return n.replace(/:/g, '\\:');
      },
      _cookie: function () {
        var t =
          this.cookie ||
          (this.cookie = this.options.cookie.name || 'ui-tabs-' + ++r);
        return n.cookie.apply(null, [t].concat(n.makeArray(arguments)));
      },
      _ui: function (n, t) {
        return { tab: n, panel: t, index: this.anchors.index(n) };
      },
      _cleanup: function () {
        this.lis
          .filter('.ui-state-processing')
          .removeClass('ui-state-processing')
          .find('span:data(label.tabs)')
          .each(function () {
            var t = n(this);
            t.html(t.data('label.tabs')).removeData('label.tabs');
          });
      },
      _tabify: function (t) {
        function a(t, i) {
          t.css({ display: '' });
          n.browser.msie && i.opacity && t[0].style.removeAttribute('filter');
        }
        var e, o, s, h, u, f, c, l;
        this.list = this.element.children('ul:first');
        this.lis = n('li:has(a[href])', this.list);
        this.anchors = this.lis.map(function () {
          return n('a', this)[0];
        });
        this.panels = n([]);
        var r = this,
          i = this.options,
          v = /^#.+/;
        for (
          this.anchors.each(function (t, u) {
            var f = n(u).attr('href'),
              s = f.split('#')[0],
              h,
              o,
              e;
            s &&
              (s === location.toString().split('#')[0] ||
                ((h = n('base')[0]) && s === h.href)) &&
              ((f = u.hash), (u.href = f));
            v.test(f)
              ? (r.panels = r.panels.add(r._sanitizeSelector(f)))
              : f != '#'
              ? (n.data(u, 'href.tabs', f),
                n.data(u, 'load.tabs', f.replace(/#.*$/, '')),
                (o = r._tabId(u)),
                (u.href = '#' + o),
                (e = n('#' + o)),
                e.length ||
                  ((e = n(i.panelTemplate)
                    .attr('id', o)
                    .addClass(
                      'ui-tabs-panel ui-widget-content ui-corner-bottom'
                    )
                    .insertAfter(r.panels[t - 1] || r.list)),
                  e.data('destroy.tabs', !0)),
                (r.panels = r.panels.add(e)))
              : i.disabled.push(t);
          }),
            t
              ? (this.element.addClass(
                  'ui-tabs ui-widget ui-widget-content ui-corner-all'
                ),
                this.list.addClass(
                  'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'
                ),
                this.lis.addClass('ui-state-default ui-corner-top'),
                this.panels.addClass(
                  'ui-tabs-panel ui-widget-content ui-corner-bottom'
                ),
                i.selected === undefined
                  ? (location.hash &&
                      this.anchors.each(function (n, t) {
                        if (t.hash == location.hash)
                          return (i.selected = n), !1;
                      }),
                    typeof i.selected != 'number' &&
                      i.cookie &&
                      (i.selected = parseInt(r._cookie(), 10)),
                    typeof i.selected != 'number' &&
                      this.lis.filter('.ui-tabs-selected').length &&
                      (i.selected = this.lis.index(
                        this.lis.filter('.ui-tabs-selected')
                      )),
                    (i.selected = i.selected || 0))
                  : i.selected === null && (i.selected = -1),
                (i.selected =
                  (i.selected >= 0 && this.anchors[i.selected]) ||
                  i.selected < 0
                    ? i.selected
                    : 0),
                (i.disabled = n
                  .unique(
                    i.disabled.concat(
                      n.map(this.lis.filter('.ui-state-disabled'), function (
                        n,
                        t
                      ) {
                        return r.lis.index(n);
                      })
                    )
                  )
                  .sort()),
                n.inArray(i.selected, i.disabled) != -1 &&
                  i.disabled.splice(n.inArray(i.selected, i.disabled), 1),
                this.panels.addClass('ui-tabs-hide'),
                this.lis.removeClass('ui-tabs-selected ui-state-active'),
                i.selected >= 0 &&
                  this.anchors.length &&
                  (this.panels.eq(i.selected).removeClass('ui-tabs-hide'),
                  this.lis
                    .eq(i.selected)
                    .addClass('ui-tabs-selected ui-state-active'),
                  r.element.queue('tabs', function () {
                    r._trigger(
                      'show',
                      null,
                      r._ui(r.anchors[i.selected], r.panels[i.selected])
                    );
                  }),
                  this.load(i.selected)),
                n(window).bind('unload', function () {
                  r.lis.add(r.anchors).unbind('.tabs');
                  r.lis = r.anchors = r.panels = null;
                }))
              : (i.selected = this.lis.index(
                  this.lis.filter('.ui-tabs-selected')
                )),
            this.element[i.collapsible ? 'addClass' : 'removeClass'](
              'ui-tabs-collapsible'
            ),
            i.cookie && this._cookie(i.selected, i.cookie),
            e = 0;
          (o = this.lis[e]);
          e++
        )
          n(o)[
            n.inArray(e, i.disabled) != -1 && !n(o).hasClass('ui-tabs-selected')
              ? 'addClass'
              : 'removeClass'
          ]('ui-state-disabled');
        i.cache === !1 && this.anchors.removeData('cache.tabs');
        this.lis.add(this.anchors).unbind('.tabs');
        i.event != 'mouseover' &&
          ((s = function (n, t) {
            t.is(':not(.ui-state-disabled)') && t.addClass('ui-state-' + n);
          }),
          (h = function (n, t) {
            t.removeClass('ui-state-' + n);
          }),
          this.lis.bind('mouseover.tabs', function () {
            s('hover', n(this));
          }),
          this.lis.bind('mouseout.tabs', function () {
            h('hover', n(this));
          }),
          this.anchors.bind('focus.tabs', function () {
            s('focus', n(this).closest('li'));
          }),
          this.anchors.bind('blur.tabs', function () {
            h('focus', n(this).closest('li'));
          }));
        i.fx &&
          (n.isArray(i.fx) ? ((u = i.fx[0]), (f = i.fx[1])) : (u = f = i.fx));
        c = f
          ? function (t, i) {
              n(t)
                .closest('li')
                .removeClass('ui-state-default')
                .addClass('ui-tabs-selected ui-state-active');
              i.hide()
                .removeClass('ui-tabs-hide')
                .animate(f, f.duration || 'normal', function () {
                  a(i, f);
                  r._trigger('show', null, r._ui(t, i[0]));
                });
            }
          : function (t, i) {
              n(t)
                .closest('li')
                .removeClass('ui-state-default')
                .addClass('ui-tabs-selected ui-state-active');
              i.removeClass('ui-tabs-hide');
              r._trigger('show', null, r._ui(t, i[0]));
            };
        l = u
          ? function (n, t) {
              t.animate(u, u.duration || 'normal', function () {
                r.lis
                  .removeClass('ui-tabs-selected ui-state-active')
                  .addClass('ui-state-default');
                t.addClass('ui-tabs-hide');
                a(t, u);
                r.element.dequeue('tabs');
              });
            }
          : function (n, t, i) {
              r.lis
                .removeClass('ui-tabs-selected ui-state-active')
                .addClass('ui-state-default');
              t.addClass('ui-tabs-hide');
              r.element.dequeue('tabs');
            };
        this.anchors.bind(i.event + '.tabs', function () {
          var t = this,
            u = n(this).closest('li'),
            f = r.panels.filter(':not(.ui-tabs-hide)'),
            e = n(r._sanitizeSelector(this.hash));
          if (
            (u.hasClass('ui-tabs-selected') && !i.collapsible) ||
            u.hasClass('ui-state-disabled') ||
            u.hasClass('ui-state-processing') ||
            r._trigger('select', null, r._ui(this, e[0])) === !1
          )
            return this.blur(), !1;
          if (((i.selected = r.anchors.index(this)), r.abort(), i.collapsible))
            if (u.hasClass('ui-tabs-selected'))
              return (
                (i.selected = -1),
                i.cookie && r._cookie(i.selected, i.cookie),
                r.element
                  .queue('tabs', function () {
                    l(t, f);
                  })
                  .dequeue('tabs'),
                this.blur(),
                !1
              );
            else if (!f.length)
              return (
                i.cookie && r._cookie(i.selected, i.cookie),
                r.element.queue('tabs', function () {
                  c(t, e);
                }),
                r.load(r.anchors.index(this)),
                this.blur(),
                !1
              );
          if ((i.cookie && r._cookie(i.selected, i.cookie), e.length))
            f.length &&
              r.element.queue('tabs', function () {
                l(t, f);
              }),
              r.element.queue('tabs', function () {
                c(t, e);
              }),
              r.load(r.anchors.index(this));
          else throw 'jQuery UI Tabs: Mismatching fragment identifier.';
          n.browser.msie && this.blur();
        });
        this.anchors.bind('click.tabs', function () {
          return !1;
        });
      },
      destroy: function () {
        var t = this.options;
        this.abort();
        this.element
          .unbind('.tabs')
          .removeClass(
            'ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible'
          )
          .removeData('tabs');
        this.list.removeClass(
          'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'
        );
        this.anchors.each(function () {
          var t = n.data(this, 'href.tabs'),
            i;
          t && (this.href = t);
          i = n(this).unbind('.tabs');
          n.each(['href', 'load', 'cache'], function (n, t) {
            i.removeData(t + '.tabs');
          });
        });
        this.lis
          .unbind('.tabs')
          .add(this.panels)
          .each(function () {
            n.data(this, 'destroy.tabs')
              ? n(this).remove()
              : n(this).removeClass(
                  'ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide'
                );
          });
        t.cookie && this._cookie(null, t.cookie);
      },
      add: function (t, i, r) {
        var u;
        r === undefined && (r = this.anchors.length);
        var e = this,
          o = this.options,
          f = n(
            o.tabTemplate.replace(/#\{href\}/g, t).replace(/#\{label\}/g, i)
          ),
          s = t.indexOf('#') ? this._tabId(n('a', f)[0]) : t.replace('#', '');
        f.addClass('ui-state-default ui-corner-top').data('destroy.tabs', !0);
        u = n('#' + s);
        u.length ||
          (u = n(o.panelTemplate).attr('id', s).data('destroy.tabs', !0));
        u.addClass(
          'ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide'
        );
        r >= this.lis.length
          ? (f.appendTo(this.list), u.appendTo(this.list[0].parentNode))
          : (f.insertBefore(this.lis[r]), u.insertBefore(this.panels[r]));
        o.disabled = n.map(o.disabled, function (n, t) {
          return n >= r ? ++n : n;
        });
        this._tabify();
        this.anchors.length == 1 &&
          (f.addClass('ui-tabs-selected ui-state-active'),
          u.removeClass('ui-tabs-hide'),
          this.element.queue('tabs', function () {
            e._trigger('show', null, e._ui(e.anchors[0], e.panels[0]));
          }),
          this.load(0));
        this._trigger('add', null, this._ui(this.anchors[r], this.panels[r]));
      },
      remove: function (t) {
        var i = this.options,
          r = this.lis.eq(t).remove(),
          u = this.panels.eq(t).remove();
        r.hasClass('ui-tabs-selected') &&
          this.anchors.length > 1 &&
          this.select(t + (t + 1 < this.anchors.length ? 1 : -1));
        i.disabled = n.map(
          n.grep(i.disabled, function (n, i) {
            return n != t;
          }),
          function (n, i) {
            return n >= t ? --n : n;
          }
        );
        this._tabify();
        this._trigger('remove', null, this._ui(r.find('a')[0], u[0]));
      },
      enable: function (t) {
        var i = this.options;
        n.inArray(t, i.disabled) != -1 &&
          (this.lis.eq(t).removeClass('ui-state-disabled'),
          (i.disabled = n.grep(i.disabled, function (n, i) {
            return n != t;
          })),
          this._trigger(
            'enable',
            null,
            this._ui(this.anchors[t], this.panels[t])
          ));
      },
      disable: function (n) {
        var i = this,
          t = this.options;
        n != t.selected &&
          (this.lis.eq(n).addClass('ui-state-disabled'),
          t.disabled.push(n),
          t.disabled.sort(),
          this._trigger(
            'disable',
            null,
            this._ui(this.anchors[n], this.panels[n])
          ));
      },
      select: function (n) {
        typeof n == 'string'
          ? (n = this.anchors.index(this.anchors.filter('[href$=' + n + ']')))
          : n === null && (n = -1);
        n == -1 && this.options.collapsible && (n = this.options.selected);
        this.anchors.eq(n).trigger(this.options.event + '.tabs');
      },
      load: function (t) {
        var i = this,
          r = this.options,
          u = this.anchors.eq(t)[0],
          e = n.data(u, 'load.tabs'),
          f;
        if (
          (this.abort(),
          !e ||
            (this.element.queue('tabs').length !== 0 &&
              n.data(u, 'cache.tabs')))
        ) {
          this.element.dequeue('tabs');
          return;
        }
        this.lis.eq(t).addClass('ui-state-processing');
        r.spinner &&
          ((f = n('span', u)), f.data('label.tabs', f.html()).html(r.spinner));
        this.xhr = n.ajax(
          n.extend({}, r.ajaxOptions, {
            url: e,
            success: function (f, e) {
              n(i._sanitizeSelector(u.hash)).html(f);
              i._cleanup();
              r.cache && n.data(u, 'cache.tabs', !0);
              i._trigger('load', null, i._ui(i.anchors[t], i.panels[t]));
              try {
                r.ajaxOptions.success(f, e);
              } catch (o) {}
              i.element.dequeue('tabs');
            },
          })
        );
      },
      abort: function () {
        this.element.queue([]);
        this.panels.stop(!1, !0);
        this.xhr && (this.xhr.abort(), delete this.xhr);
        this._cleanup();
      },
      url: function (n, t) {
        this.anchors.eq(n).removeData('cache.tabs').data('load.tabs', t);
      },
      length: function () {
        return this.anchors.length;
      },
    });
    n.extend(n.ui.tabs, {
      version: '1.7.3',
      getter: 'length',
      defaults: {
        ajaxOptions: null,
        cache: !1,
        cookie: null,
        collapsible: !1,
        disabled: [],
        event: 'click',
        fx: null,
        idPrefix: 'ui-tabs-',
        panelTemplate: '<div></div>',
        spinner: '<em>Loading&#8230;</em>',
        tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',
      },
    });
    n.extend(n.ui.tabs.prototype, {
      rotation: null,
      rotate: function (n, i) {
        var r = this,
          u = this.options,
          f =
            r._rotate ||
            (r._rotate = function (t) {
              clearTimeout(r.rotation);
              r.rotation = setTimeout(function () {
                var n = u.selected;
                r.select(++n < r.anchors.length ? n : 0);
              }, n);
              t && t.stopPropagation();
            }),
          e =
            r._unrotate ||
            (r._unrotate = i
              ? function (n) {
                  t = u.selected;
                  f();
                }
              : function (n) {
                  n.clientX && r.rotate(null);
                });
        n
          ? (this.element.bind('tabsshow', f),
            this.anchors.bind(u.event + '.tabs', e),
            f())
          : (clearTimeout(r.rotation),
            this.element.unbind('tabsshow', f),
            this.anchors.unbind(u.event + '.tabs', e),
            delete this._rotate,
            delete this._unrotate);
      },
    });
  })(jQuery),
  (function ($) {
    function Datepicker() {
      this.debug = !1;
      this._curInst = null;
      this._keyEvent = !1;
      this._disabledInputs = [];
      this._datepickerShowing = !1;
      this._inDialog = !1;
      this._mainDivId = 'ui-datepicker-div';
      this._inlineClass = 'ui-datepicker-inline';
      this._appendClass = 'ui-datepicker-append';
      this._triggerClass = 'ui-datepicker-trigger';
      this._dialogClass = 'ui-datepicker-dialog';
      this._disableClass = 'ui-datepicker-disabled';
      this._unselectableClass = 'ui-datepicker-unselectable';
      this._currentClass = 'ui-datepicker-current-day';
      this._dayOverClass = 'ui-datepicker-days-cell-over';
      this.regional = [];
      this.regional[''] = {
        closeText: 'Done',
        prevText: 'Prev',
        nextText: 'Next',
        currentText: 'Today',
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthNamesShort: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        dayNames: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        dateFormat: 'mm/dd/yy',
        firstDay: 0,
        isRTL: !1,
      };
      this._defaults = {
        showOn: 'focus',
        showAnim: 'show',
        showOptions: {},
        defaultDate: null,
        appendText: '',
        buttonText: '...',
        buttonImage: '',
        buttonImageOnly: !1,
        hideIfNoPrevNext: !1,
        navigationAsDateFormat: !1,
        gotoCurrent: !1,
        changeMonth: !1,
        changeYear: !1,
        showMonthAfterYear: !1,
        yearRange: '-10:+10',
        showOtherMonths: !1,
        calculateWeek: this.iso8601Week,
        shortYearCutoff: '+10',
        minDate: null,
        maxDate: null,
        duration: 'normal',
        beforeShowDay: null,
        beforeShow: null,
        onSelect: null,
        onChangeMonthYear: null,
        onClose: null,
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        stepMonths: 1,
        stepBigMonths: 12,
        altField: '',
        altFormat: '',
        constrainInput: !0,
        showButtonPanel: !1,
      };
      $.extend(this._defaults, this.regional['']);
      this.dpDiv = $(
        '<div id="' +
          this._mainDivId +
          '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>'
      );
    }
    function extendRemove(n, t) {
      $.extend(n, t);
      for (var i in t) (t[i] == null || t[i] == undefined) && (n[i] = t[i]);
      return n;
    }
    function isArray(n) {
      return (
        n &&
        (($.browser.safari && typeof n == 'object' && n.length) ||
          (n.constructor && n.constructor.toString().match(/\Array\(\)/)))
      );
    }
    $.extend($.ui, { datepicker: { version: '1.7.3' } });
    var PROP_NAME = 'datepicker';
    $.extend(Datepicker.prototype, {
      markerClassName: 'hasDatepicker',
      log: function () {
        this.debug && console.log.apply('', arguments);
      },
      setDefaults: function (n) {
        return extendRemove(this._defaults, n || {}), this;
      },
      _attachDatepicker: function (target, settings) {
        var inlineSettings = null,
          attrName,
          attrValue,
          nodeName,
          inline,
          inst;
        for (attrName in this._defaults)
          if (
            ((attrValue = target.getAttribute('date:' + attrName)), attrValue)
          ) {
            inlineSettings = inlineSettings || {};
            try {
              inlineSettings[attrName] = eval(attrValue);
            } catch (err) {
              inlineSettings[attrName] = attrValue;
            }
          }
        nodeName = target.nodeName.toLowerCase();
        inline = nodeName == 'div' || nodeName == 'span';
        target.id || (target.id = 'dp' + ++this.uuid);
        inst = this._newInst($(target), inline);
        inst.settings = $.extend({}, settings || {}, inlineSettings || {});
        nodeName == 'input'
          ? this._connectDatepicker(target, inst)
          : inline && this._inlineDatepicker(target, inst);
      },
      _newInst: function (n, t) {
        var i = n[0].id.replace(/([:\[\]\.])/g, '\\\\$1');
        return {
          id: i,
          input: n,
          selectedDay: 0,
          selectedMonth: 0,
          selectedYear: 0,
          drawMonth: 0,
          drawYear: 0,
          inline: t,
          dpDiv: t
            ? $(
                '<div class="' +
                  this._inlineClass +
                  ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'
              )
            : this.dpDiv,
        };
      },
      _connectDatepicker: function (n, t) {
        var r = $(n),
          e,
          o,
          u,
          i,
          f;
        ((t.append = $([])),
        (t.trigger = $([])),
        r.hasClass(this.markerClassName)) ||
          ((e = this._get(t, 'appendText')),
          (o = this._get(t, 'isRTL')),
          e &&
            ((t.append = $(
              '<span class="' + this._appendClass + '">' + e + '</span>'
            )),
            r[o ? 'before' : 'after'](t.append)),
          (u = this._get(t, 'showOn')),
          (u == 'focus' || u == 'both') && r.focus(this._showDatepicker),
          (u == 'button' || u == 'both') &&
            ((i = this._get(t, 'buttonText')),
            (f = this._get(t, 'buttonImage')),
            (t.trigger = $(
              this._get(t, 'buttonImageOnly')
                ? $('<img/>')
                    .addClass(this._triggerClass)
                    .attr({ src: f, alt: i, title: i })
                : $('<button type="button"></button>')
                    .addClass(this._triggerClass)
                    .html(
                      f == ''
                        ? i
                        : $('<img/>').attr({ src: f, alt: i, title: i })
                    )
            )),
            r[o ? 'before' : 'after'](t.trigger),
            t.trigger.click(function () {
              return (
                $.datepicker._datepickerShowing && $.datepicker._lastInput == n
                  ? $.datepicker._hideDatepicker()
                  : $.datepicker._showDatepicker(n),
                !1
              );
            })),
          r
            .addClass(this.markerClassName)
            .keydown(this._doKeyDown)
            .keypress(this._doKeyPress)
            .bind('setData.datepicker', function (n, i, r) {
              t.settings[i] = r;
            })
            .bind('getData.datepicker', function (n, i) {
              return this._get(t, i);
            }),
          $.data(n, PROP_NAME, t));
      },
      _inlineDatepicker: function (n, t) {
        var i = $(n);
        i.hasClass(this.markerClassName) ||
          (i
            .addClass(this.markerClassName)
            .append(t.dpDiv)
            .bind('setData.datepicker', function (n, i, r) {
              t.settings[i] = r;
            })
            .bind('getData.datepicker', function (n, i) {
              return this._get(t, i);
            }),
          $.data(n, PROP_NAME, t),
          this._setDate(t, this._getDefaultDate(t)),
          this._updateDatepicker(t),
          this._updateAlternate(t));
      },
      _dialogDatepicker: function (n, t, i, r, u) {
        var f = this._dialogInst,
          e;
        if (
          (f ||
            ((e = 'dp' + ++this.uuid),
            (this._dialogInput = $(
              '<input type="text" id="' +
                e +
                '" size="1" style="position: absolute; top: -100px;"/>'
            )),
            this._dialogInput.keydown(this._doKeyDown),
            $('body').append(this._dialogInput),
            (f = this._dialogInst = this._newInst(this._dialogInput, !1)),
            (f.settings = {}),
            $.data(this._dialogInput[0], PROP_NAME, f)),
          extendRemove(f.settings, r || {}),
          this._dialogInput.val(t),
          (this._pos = u ? (u.length ? u : [u.pageX, u.pageY]) : null),
          !this._pos)
        ) {
          var o =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth,
            s =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight,
            h = document.documentElement.scrollLeft || document.body.scrollLeft,
            c = document.documentElement.scrollTop || document.body.scrollTop;
          this._pos = [o / 2 - 100 + h, s / 2 - 150 + c];
        }
        return (
          this._dialogInput
            .css('left', this._pos[0] + 'px')
            .css('top', this._pos[1] + 'px'),
          (f.settings.onSelect = i),
          (this._inDialog = !0),
          this.dpDiv.addClass(this._dialogClass),
          this._showDatepicker(this._dialogInput[0]),
          $.blockUI && $.blockUI(this.dpDiv),
          $.data(this._dialogInput[0], PROP_NAME, f),
          this
        );
      },
      _destroyDatepicker: function (n) {
        var i = $(n),
          r = $.data(n, PROP_NAME),
          t;
        i.hasClass(this.markerClassName) &&
          ((t = n.nodeName.toLowerCase()),
          $.removeData(n, PROP_NAME),
          t == 'input'
            ? (r.append.remove(),
              r.trigger.remove(),
              i
                .removeClass(this.markerClassName)
                .unbind('focus', this._showDatepicker)
                .unbind('keydown', this._doKeyDown)
                .unbind('keypress', this._doKeyPress))
            : (t == 'div' || t == 'span') &&
              i.removeClass(this.markerClassName).empty());
      },
      _enableDatepicker: function (n) {
        var i = $(n),
          u = $.data(n, PROP_NAME),
          t,
          r;
        i.hasClass(this.markerClassName) &&
          ((t = n.nodeName.toLowerCase()),
          t == 'input'
            ? ((n.disabled = !1),
              u.trigger
                .filter('button')
                .each(function () {
                  this.disabled = !1;
                })
                .end()
                .filter('img')
                .css({ opacity: '1.0', cursor: '' }))
            : (t == 'div' || t == 'span') &&
              ((r = i.children('.' + this._inlineClass)),
              r.children().removeClass('ui-state-disabled')),
          (this._disabledInputs = $.map(this._disabledInputs, function (t) {
            return t == n ? null : t;
          })));
      },
      _disableDatepicker: function (n) {
        var i = $(n),
          u = $.data(n, PROP_NAME),
          t,
          r;
        i.hasClass(this.markerClassName) &&
          ((t = n.nodeName.toLowerCase()),
          t == 'input'
            ? ((n.disabled = !0),
              u.trigger
                .filter('button')
                .each(function () {
                  this.disabled = !0;
                })
                .end()
                .filter('img')
                .css({ opacity: '0.5', cursor: 'default' }))
            : (t == 'div' || t == 'span') &&
              ((r = i.children('.' + this._inlineClass)),
              r.children().addClass('ui-state-disabled')),
          (this._disabledInputs = $.map(this._disabledInputs, function (t) {
            return t == n ? null : t;
          })),
          (this._disabledInputs[this._disabledInputs.length] = n));
      },
      _isDisabledDatepicker: function (n) {
        if (!n) return !1;
        for (var t = 0; t < this._disabledInputs.length; t++)
          if (this._disabledInputs[t] == n) return !0;
        return !1;
      },
      _getInst: function (n) {
        try {
          return $.data(n, PROP_NAME);
        } catch (t) {
          throw 'Missing instance data for this datepicker';
        }
      },
      _optionDatepicker: function (n, t, i) {
        var r = this._getInst(n),
          u,
          f;
        if (arguments.length == 2 && typeof t == 'string')
          return t == 'defaults'
            ? $.extend({}, $.datepicker._defaults)
            : r
            ? t == 'all'
              ? $.extend({}, r.settings)
              : this._get(r, t)
            : null;
        u = t || {};
        typeof t == 'string' && ((u = {}), (u[t] = i));
        r &&
          (this._curInst == r && this._hideDatepicker(null),
          (f = this._getDateDatepicker(n)),
          extendRemove(r.settings, u),
          this._setDateDatepicker(n, f),
          this._updateDatepicker(r));
      },
      _changeDatepicker: function (n, t, i) {
        this._optionDatepicker(n, t, i);
      },
      _refreshDatepicker: function (n) {
        var t = this._getInst(n);
        t && this._updateDatepicker(t);
      },
      _setDateDatepicker: function (n, t, i) {
        var r = this._getInst(n);
        r &&
          (this._setDate(r, t, i),
          this._updateDatepicker(r),
          this._updateAlternate(r));
      },
      _getDateDatepicker: function (n) {
        var t = this._getInst(n);
        return (
          t && !t.inline && this._setDateFromField(t),
          t ? this._getDate(t) : null
        );
      },
      _doKeyDown: function (n) {
        var t = $.datepicker._getInst(n.target),
          i = !0,
          u = t.dpDiv.is('.ui-datepicker-rtl'),
          r;
        if (((t._keyEvent = !0), $.datepicker._datepickerShowing))
          switch (n.keyCode) {
            case 9:
              $.datepicker._hideDatepicker(null, '');
              break;
            case 13:
              return (
                (r = $(
                  'td.' +
                    $.datepicker._dayOverClass +
                    ', td.' +
                    $.datepicker._currentClass,
                  t.dpDiv
                )),
                r[0]
                  ? $.datepicker._selectDay(
                      n.target,
                      t.selectedMonth,
                      t.selectedYear,
                      r[0]
                    )
                  : $.datepicker._hideDatepicker(
                      null,
                      $.datepicker._get(t, 'duration')
                    ),
                !1
              );
              break;
            case 27:
              $.datepicker._hideDatepicker(
                null,
                $.datepicker._get(t, 'duration')
              );
              break;
            case 33:
              $.datepicker._adjustDate(
                n.target,
                n.ctrlKey
                  ? -$.datepicker._get(t, 'stepBigMonths')
                  : -$.datepicker._get(t, 'stepMonths'),
                'M'
              );
              break;
            case 34:
              $.datepicker._adjustDate(
                n.target,
                n.ctrlKey
                  ? +$.datepicker._get(t, 'stepBigMonths')
                  : +$.datepicker._get(t, 'stepMonths'),
                'M'
              );
              break;
            case 35:
              (n.ctrlKey || n.metaKey) && $.datepicker._clearDate(n.target);
              i = n.ctrlKey || n.metaKey;
              break;
            case 36:
              (n.ctrlKey || n.metaKey) && $.datepicker._gotoToday(n.target);
              i = n.ctrlKey || n.metaKey;
              break;
            case 37:
              (n.ctrlKey || n.metaKey) &&
                $.datepicker._adjustDate(n.target, u ? 1 : -1, 'D');
              i = n.ctrlKey || n.metaKey;
              n.originalEvent.altKey &&
                $.datepicker._adjustDate(
                  n.target,
                  n.ctrlKey
                    ? -$.datepicker._get(t, 'stepBigMonths')
                    : -$.datepicker._get(t, 'stepMonths'),
                  'M'
                );
              break;
            case 38:
              (n.ctrlKey || n.metaKey) &&
                $.datepicker._adjustDate(n.target, -7, 'D');
              i = n.ctrlKey || n.metaKey;
              break;
            case 39:
              (n.ctrlKey || n.metaKey) &&
                $.datepicker._adjustDate(n.target, u ? -1 : 1, 'D');
              i = n.ctrlKey || n.metaKey;
              n.originalEvent.altKey &&
                $.datepicker._adjustDate(
                  n.target,
                  n.ctrlKey
                    ? +$.datepicker._get(t, 'stepBigMonths')
                    : +$.datepicker._get(t, 'stepMonths'),
                  'M'
                );
              break;
            case 40:
              (n.ctrlKey || n.metaKey) &&
                $.datepicker._adjustDate(n.target, 7, 'D');
              i = n.ctrlKey || n.metaKey;
              break;
            default:
              i = !1;
          }
        else
          n.keyCode == 36 && n.ctrlKey
            ? $.datepicker._showDatepicker(this)
            : (i = !1);
        i && (n.preventDefault(), n.stopPropagation());
      },
      _doKeyPress: function (n) {
        var r = $.datepicker._getInst(n.target),
          t,
          i;
        if ($.datepicker._get(r, 'constrainInput'))
          return (
            (t = $.datepicker._possibleChars(
              $.datepicker._get(r, 'dateFormat')
            )),
            (i = String.fromCharCode(
              n.charCode == undefined ? n.keyCode : n.charCode
            )),
            n.ctrlKey || i < ' ' || !t || t.indexOf(i) > -1
          );
      },
      _showDatepicker: function (n) {
        var t, u, i, r;
        if (
          ((n = n.target || n),
          n.nodeName.toLowerCase() != 'input' &&
            (n = $('input', n.parentNode)[0]),
          !$.datepicker._isDisabledDatepicker(n) &&
            $.datepicker._lastInput != n) &&
          ((t = $.datepicker._getInst(n)),
          (u = $.datepicker._get(t, 'beforeShow')),
          extendRemove(t.settings, u ? u.apply(n, [n, t]) : {}),
          $.datepicker._hideDatepicker(null, ''),
          ($.datepicker._lastInput = n),
          $.datepicker._setDateFromField(t),
          $.datepicker._inDialog && (n.value = ''),
          $.datepicker._pos ||
            (($.datepicker._pos = $.datepicker._findPos(n)),
            ($.datepicker._pos[1] += n.offsetHeight)),
          (i = !1),
          $(n)
            .parents()
            .each(function () {
              return (i |= $(this).css('position') == 'fixed'), !i;
            }),
          i &&
            $.browser.opera &&
            (($.datepicker._pos[0] -= document.documentElement.scrollLeft),
            ($.datepicker._pos[1] -= document.documentElement.scrollTop)),
          (r = { left: $.datepicker._pos[0], top: $.datepicker._pos[1] }),
          ($.datepicker._pos = null),
          (t.rangeStart = null),
          t.dpDiv.css({
            position: 'absolute',
            display: 'block',
            top: '-1000px',
          }),
          $.datepicker._updateDatepicker(t),
          (r = $.datepicker._checkOffset(t, r, i)),
          t.dpDiv.css({
            position:
              $.datepicker._inDialog && $.blockUI
                ? 'static'
                : i
                ? 'fixed'
                : 'absolute',
            display: 'none',
            left: r.left + 'px',
            top: r.top + 'px',
          }),
          !t.inline)
        ) {
          var f = $.datepicker._get(t, 'showAnim') || 'show',
            e = $.datepicker._get(t, 'duration'),
            o = function () {
              $.datepicker._datepickerShowing = !0;
              $.browser.msie &&
                parseInt($.browser.version, 10) < 7 &&
                $('iframe.ui-datepicker-cover').css({
                  width: t.dpDiv.width() + 4,
                  height: t.dpDiv.height() + 4,
                });
            };
          $.effects && $.effects[f]
            ? t.dpDiv.show(f, $.datepicker._get(t, 'showOptions'), e, o)
            : t.dpDiv[f](e, o);
          e == '' && o();
          t.input[0].type != 'hidden' && t.input[0].focus();
          $.datepicker._curInst = t;
        }
      },
      _updateDatepicker: function (n) {
        var r = { width: n.dpDiv.width() + 4, height: n.dpDiv.height() + 4 },
          u = this;
        n.dpDiv
          .empty()
          .append(this._generateHTML(n))
          .find('iframe.ui-datepicker-cover')
          .css({ width: r.width, height: r.height })
          .end()
          .find(
            'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a'
          )
          .bind('mouseout', function () {
            $(this).removeClass('ui-state-hover');
            this.className.indexOf('ui-datepicker-prev') != -1 &&
              $(this).removeClass('ui-datepicker-prev-hover');
            this.className.indexOf('ui-datepicker-next') != -1 &&
              $(this).removeClass('ui-datepicker-next-hover');
          })
          .bind('mouseover', function () {
            u._isDisabledDatepicker(
              n.inline ? n.dpDiv.parent()[0] : n.input[0]
            ) ||
              ($(this)
                .parents('.ui-datepicker-calendar')
                .find('a')
                .removeClass('ui-state-hover'),
              $(this).addClass('ui-state-hover'),
              this.className.indexOf('ui-datepicker-prev') != -1 &&
                $(this).addClass('ui-datepicker-prev-hover'),
              this.className.indexOf('ui-datepicker-next') != -1 &&
                $(this).addClass('ui-datepicker-next-hover'));
          })
          .end()
          .find('.' + this._dayOverClass + ' a')
          .trigger('mouseover')
          .end();
        var t = this._getNumberOfMonths(n),
          i = t[1],
          f = 17;
        i > 1
          ? n.dpDiv
              .addClass('ui-datepicker-multi-' + i)
              .css('width', f * i + 'em')
          : n.dpDiv
              .removeClass(
                'ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4'
              )
              .width('');
        n.dpDiv[(t[0] != 1 || t[1] != 1 ? 'add' : 'remove') + 'Class'](
          'ui-datepicker-multi'
        );
        n.dpDiv[(this._get(n, 'isRTL') ? 'add' : 'remove') + 'Class'](
          'ui-datepicker-rtl'
        );
        n.input &&
          n.input[0].type != 'hidden' &&
          n == $.datepicker._curInst &&
          $(n.input[0]).focus();
      },
      _checkOffset: function (n, t, i) {
        var r = n.dpDiv.outerWidth(),
          u = n.dpDiv.outerHeight(),
          s = n.input ? n.input.outerWidth() : 0,
          o = n.input ? n.input.outerHeight() : 0,
          f =
            (window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth) + $(document).scrollLeft(),
          e =
            (window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight) + $(document).scrollTop();
        return (
          (t.left -= this._get(n, 'isRTL') ? r - s : 0),
          (t.left -=
            i && t.left == n.input.offset().left
              ? $(document).scrollLeft()
              : 0),
          (t.top -=
            i && t.top == n.input.offset().top + o
              ? $(document).scrollTop()
              : 0),
          (t.left -= t.left + r > f && f > r ? Math.abs(t.left + r - f) : 0),
          (t.top -=
            t.top + u > e && e > u ? Math.abs(t.top + u + o * 2 - e) : 0),
          t
        );
      },
      _findPos: function (n) {
        while (n && (n.type == 'hidden' || n.nodeType != 1)) n = n.nextSibling;
        var t = $(n).offset();
        return [t.left, t.top];
      },
      _hideDatepicker: function (n, t) {
        var i = this._curInst,
          r,
          u,
          f;
        i &&
          (!n || i == $.data(n, PROP_NAME)) &&
          (i.stayOpen &&
            this._selectDate(
              '#' + i.id,
              this._formatDate(i, i.currentDay, i.currentMonth, i.currentYear)
            ),
          (i.stayOpen = !1),
          this._datepickerShowing &&
            ((t = t != null ? t : this._get(i, 'duration')),
            (r = this._get(i, 'showAnim')),
            (u = function () {
              $.datepicker._tidyDialog(i);
            }),
            t != '' && $.effects && $.effects[r]
              ? i.dpDiv.hide(r, $.datepicker._get(i, 'showOptions'), t, u)
              : i.dpDiv[
                  t == ''
                    ? 'hide'
                    : r == 'slideDown'
                    ? 'slideUp'
                    : r == 'fadeIn'
                    ? 'fadeOut'
                    : 'hide'
                ](t, u),
            t == '' && this._tidyDialog(i),
            (f = this._get(i, 'onClose')),
            f &&
              f.apply(i.input ? i.input[0] : null, [
                i.input ? i.input.val() : '',
                i,
              ]),
            (this._datepickerShowing = !1),
            (this._lastInput = null),
            this._inDialog &&
              (this._dialogInput.css({
                position: 'absolute',
                left: '0',
                top: '-100px',
              }),
              $.blockUI && ($.unblockUI(), $('body').append(this.dpDiv))),
            (this._inDialog = !1)),
          (this._curInst = null));
      },
      _tidyDialog: function (n) {
        n.dpDiv
          .removeClass(this._dialogClass)
          .unbind('.ui-datepicker-calendar');
      },
      _checkExternalClick: function (n) {
        if ($.datepicker._curInst) {
          var t = $(n.target);
          t.parents('#' + $.datepicker._mainDivId).length != 0 ||
            t.hasClass($.datepicker.markerClassName) ||
            t.hasClass($.datepicker._triggerClass) ||
            !$.datepicker._datepickerShowing ||
            ($.datepicker._inDialog && $.blockUI) ||
            $.datepicker._hideDatepicker(null, '');
        }
      },
      _adjustDate: function (n, t, i) {
        var u = $(n),
          r = this._getInst(u[0]);
        this._isDisabledDatepicker(u[0]) ||
          (this._adjustInstDate(
            r,
            t + (i == 'M' ? this._get(r, 'showCurrentAtPos') : 0),
            i
          ),
          this._updateDatepicker(r));
      },
      _gotoToday: function (n) {
        var r = $(n),
          t = this._getInst(r[0]),
          i;
        this._get(t, 'gotoCurrent') && t.currentDay
          ? ((t.selectedDay = t.currentDay),
            (t.drawMonth = t.selectedMonth = t.currentMonth),
            (t.drawYear = t.selectedYear = t.currentYear))
          : ((i = new Date()),
            (t.selectedDay = i.getDate()),
            (t.drawMonth = t.selectedMonth = i.getMonth()),
            (t.drawYear = t.selectedYear = i.getFullYear()));
        this._notifyChange(t);
        this._adjustDate(r);
      },
      _selectMonthYear: function (n, t, i) {
        var u = $(n),
          r = this._getInst(u[0]);
        r._selectingMonthYear = !1;
        r['selected' + (i == 'M' ? 'Month' : 'Year')] = r[
          'draw' + (i == 'M' ? 'Month' : 'Year')
        ] = parseInt(t.options[t.selectedIndex].value, 10);
        this._notifyChange(r);
        this._adjustDate(u);
      },
      _clickMonthYear: function (n) {
        var i = $(n),
          t = this._getInst(i[0]);
        t.input &&
          t._selectingMonthYear &&
          !$.browser.msie &&
          t.input[0].focus();
        t._selectingMonthYear = !t._selectingMonthYear;
      },
      _selectDay: function (n, t, i, r) {
        var f = $(n),
          u;
        $(r).hasClass(this._unselectableClass) ||
          this._isDisabledDatepicker(f[0]) ||
          ((u = this._getInst(f[0])),
          (u.selectedDay = u.currentDay = $('a', r).html()),
          (u.selectedMonth = u.currentMonth = t),
          (u.selectedYear = u.currentYear = i),
          u.stayOpen && (u.endDay = u.endMonth = u.endYear = null),
          this._selectDate(
            n,
            this._formatDate(u, u.currentDay, u.currentMonth, u.currentYear)
          ),
          u.stayOpen &&
            ((u.rangeStart = this._daylightSavingAdjust(
              new Date(u.currentYear, u.currentMonth, u.currentDay)
            )),
            this._updateDatepicker(u)));
      },
      _clearDate: function (n) {
        var i = $(n),
          t = this._getInst(i[0]);
        t.stayOpen = !1;
        t.endDay = t.endMonth = t.endYear = t.rangeStart = null;
        this._selectDate(i, '');
      },
      _selectDate: function (n, t) {
        var u = $(n),
          i = this._getInst(u[0]),
          r;
        t = t != null ? t : this._formatDate(i);
        i.input && i.input.val(t);
        this._updateAlternate(i);
        r = this._get(i, 'onSelect');
        r
          ? r.apply(i.input ? i.input[0] : null, [t, i])
          : i.input && i.input.trigger('change');
        i.inline
          ? this._updateDatepicker(i)
          : i.stayOpen ||
            (this._hideDatepicker(null, this._get(i, 'duration')),
            (this._lastInput = i.input[0]),
            typeof i.input[0] != 'object' && i.input[0].focus(),
            (this._lastInput = null));
      },
      _updateAlternate: function (n) {
        var t = this._get(n, 'altField'),
          i,
          r;
        t &&
          ((i = this._get(n, 'altFormat') || this._get(n, 'dateFormat')),
          (r = this._getDate(n)),
          (dateStr = this.formatDate(i, r, this._getFormatConfig(n))),
          $(t).each(function () {
            $(this).val(dateStr);
          }));
      },
      noWeekends: function (n) {
        var t = n.getDay();
        return [t > 0 && t < 6, ''];
      },
      iso8601Week: function (n) {
        var t = new Date(n.getFullYear(), n.getMonth(), n.getDate()),
          i = new Date(t.getFullYear(), 0, 4),
          r = i.getDay() || 7;
        if ((i.setDate(i.getDate() + 1 - r), r < 4 && t < i))
          return t.setDate(t.getDate() - 3), $.datepicker.iso8601Week(t);
        else if (
          t > new Date(t.getFullYear(), 11, 28) &&
          ((r = new Date(t.getFullYear() + 1, 0, 4).getDay() || 7),
          r > 4 && (t.getDay() || 7) < r - 3)
        )
          return 1;
        return Math.floor((t - i) / 6048e5) + 1;
      },
      parseDate: function (n, t, i) {
        var f, y, e;
        if (n == null || t == null) throw 'Invalid arguments';
        if (((t = typeof t == 'object' ? t.toString() : t + ''), t == ''))
          return null;
        var w =
            (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff,
          b = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
          k = (i ? i.dayNames : null) || this._defaults.dayNames,
          d = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
          g = (i ? i.monthNames : null) || this._defaults.monthNames,
          u = -1,
          o = -1,
          s = -1,
          l = -1,
          a = !1,
          c = function (t) {
            var i = f + 1 < n.length && n.charAt(f + 1) == t;
            return i && f++, i;
          },
          h = function (n) {
            c(n);
            for (
              var f = n == '@' ? 14 : n == 'y' ? 4 : n == 'o' ? 3 : 2,
                i = f,
                u = 0;
              i > 0 && r < t.length && t.charAt(r) >= '0' && t.charAt(r) <= '9';

            )
              (u = u * 10 + parseInt(t.charAt(r++), 10)), i--;
            if (i == f) throw 'Missing number at position ' + r;
            return u;
          },
          p = function (n, i, u) {
            for (var h, l, f, e = c(n) ? u : i, o = 0, s = 0; s < e.length; s++)
              o = Math.max(o, e[s].length);
            for (h = '', l = r; o > 0 && r < t.length; ) {
              for (h += t.charAt(r++), f = 0; f < e.length; f++)
                if (h == e[f]) return f + 1;
              o--;
            }
            throw 'Unknown name at position ' + l;
          },
          v = function () {
            if (t.charAt(r) != n.charAt(f))
              throw 'Unexpected literal at position ' + r;
            r++;
          },
          r = 0;
        for (f = 0; f < n.length; f++)
          if (a) n.charAt(f) != "'" || c("'") ? v() : (a = !1);
          else
            switch (n.charAt(f)) {
              case 'd':
                s = h('d');
                break;
              case 'D':
                p('D', b, k);
                break;
              case 'o':
                l = h('o');
                break;
              case 'm':
                o = h('m');
                break;
              case 'M':
                o = p('M', d, g);
                break;
              case 'y':
                u = h('y');
                break;
              case '@':
                e = new Date(h('@'));
                u = e.getFullYear();
                o = e.getMonth() + 1;
                s = e.getDate();
                break;
              case "'":
                c("'") ? v() : (a = !0);
                break;
              default:
                v();
            }
        if (
          (u == -1
            ? (u = new Date().getFullYear())
            : u < 100 &&
              (u +=
                new Date().getFullYear() -
                (new Date().getFullYear() % 100) +
                (u <= w ? 0 : -100)),
          l > -1)
        ) {
          o = 1;
          s = l;
          do {
            if (((y = this._getDaysInMonth(u, o - 1)), s <= y)) break;
            o++;
            s -= y;
          } while (1);
        }
        if (
          ((e = this._daylightSavingAdjust(new Date(u, o - 1, s))),
          e.getFullYear() != u || e.getMonth() + 1 != o || e.getDate() != s)
        )
          throw 'Invalid date';
        return e;
      },
      ATOM: 'yy-mm-dd',
      COOKIE: 'D, dd M yy',
      ISO_8601: 'yy-mm-dd',
      RFC_822: 'D, d M y',
      RFC_850: 'DD, dd-M-y',
      RFC_1036: 'D, d M y',
      RFC_1123: 'D, d M yy',
      RFC_2822: 'D, d M yy',
      RSS: 'D, d M y',
      TIMESTAMP: '@',
      W3C: 'yy-mm-dd',
      formatDate: function (n, t, i) {
        var u, h, e;
        if (!t) return '';
        var l = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
          a = (i ? i.dayNames : null) || this._defaults.dayNames,
          v = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
          y = (i ? i.monthNames : null) || this._defaults.monthNames,
          f = function (t) {
            var i = u + 1 < n.length && n.charAt(u + 1) == t;
            return i && u++, i;
          },
          o = function (n, t, i) {
            var r = '' + t;
            if (f(n)) while (r.length < i) r = '0' + r;
            return r;
          },
          c = function (n, t, i, r) {
            return f(n) ? r[t] : i[t];
          },
          r = '',
          s = !1;
        if (t)
          for (u = 0; u < n.length; u++)
            if (s) n.charAt(u) != "'" || f("'") ? (r += n.charAt(u)) : (s = !1);
            else
              switch (n.charAt(u)) {
                case 'd':
                  r += o('d', t.getDate(), 2);
                  break;
                case 'D':
                  r += c('D', t.getDay(), l, a);
                  break;
                case 'o':
                  for (h = t.getDate(), e = t.getMonth() - 1; e >= 0; e--)
                    h += this._getDaysInMonth(t.getFullYear(), e);
                  r += o('o', h, 3);
                  break;
                case 'm':
                  r += o('m', t.getMonth() + 1, 2);
                  break;
                case 'M':
                  r += c('M', t.getMonth(), v, y);
                  break;
                case 'y':
                  r += f('y')
                    ? t.getFullYear()
                    : (t.getYear() % 100 < 10 ? '0' : '') + (t.getYear() % 100);
                  break;
                case '@':
                  r += t.getTime();
                  break;
                case "'":
                  f("'") ? (r += "'") : (s = !0);
                  break;
                default:
                  r += n.charAt(u);
              }
        return r;
      },
      _possibleChars: function (n) {
        for (var i = '', r = !1, t = 0; t < n.length; t++)
          if (r)
            n.charAt(t) != "'" || lookAhead("'")
              ? (i += n.charAt(t))
              : (r = !1);
          else
            switch (n.charAt(t)) {
              case 'd':
              case 'm':
              case 'y':
              case '@':
                i += '0123456789';
                break;
              case 'D':
              case 'M':
                return null;
              case "'":
                lookAhead("'") ? (i += "'") : (r = !0);
                break;
              default:
                i += n.charAt(t);
            }
        return i;
      },
      _get: function (n, t) {
        return n.settings[t] !== undefined ? n.settings[t] : this._defaults[t];
      },
      _setDateFromField: function (n) {
        var u = this._get(n, 'dateFormat'),
          i = n.input ? n.input.val() : null,
          t,
          r;
        n.endDay = n.endMonth = n.endYear = null;
        t = defaultDate = this._getDefaultDate(n);
        r = this._getFormatConfig(n);
        try {
          t = this.parseDate(u, i, r) || defaultDate;
        } catch (f) {
          this.log(f);
          t = defaultDate;
        }
        n.selectedDay = t.getDate();
        n.drawMonth = n.selectedMonth = t.getMonth();
        n.drawYear = n.selectedYear = t.getFullYear();
        n.currentDay = i ? t.getDate() : 0;
        n.currentMonth = i ? t.getMonth() : 0;
        n.currentYear = i ? t.getFullYear() : 0;
        this._adjustInstDate(n);
      },
      _getDefaultDate: function (n) {
        var t = this._determineDate(this._get(n, 'defaultDate'), new Date()),
          i = this._getMinMaxDate(n, 'min', !0),
          r = this._getMinMaxDate(n, 'max');
        return (t = i && t < i ? i : t), r && t > r ? r : t;
      },
      _determineDate: function (n, t) {
        var i = function (n) {
            var t = new Date();
            return t.setDate(t.getDate() + n), t;
          },
          r = function (n, t) {
            for (
              var e = new Date(),
                u = e.getFullYear(),
                f = e.getMonth(),
                i = e.getDate(),
                o = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                r = o.exec(n);
              r;

            ) {
              switch (r[2] || 'd') {
                case 'd':
                case 'D':
                  i += parseInt(r[1], 10);
                  break;
                case 'w':
                case 'W':
                  i += parseInt(r[1], 10) * 7;
                  break;
                case 'm':
                case 'M':
                  f += parseInt(r[1], 10);
                  i = Math.min(i, t(u, f));
                  break;
                case 'y':
                case 'Y':
                  u += parseInt(r[1], 10);
                  i = Math.min(i, t(u, f));
                  break;
              }
              r = o.exec(n);
            }
            return new Date(u, f, i);
          };
        return (
          (n =
            n == null
              ? t
              : typeof n == 'string'
              ? r(n, this._getDaysInMonth)
              : typeof n == 'number'
              ? isNaN(n)
                ? t
                : i(n)
              : n),
          (n = n && n.toString() == 'Invalid Date' ? t : n),
          n &&
            (n.setHours(0),
            n.setMinutes(0),
            n.setSeconds(0),
            n.setMilliseconds(0)),
          this._daylightSavingAdjust(n)
        );
      },
      _daylightSavingAdjust: function (n) {
        return n
          ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n)
          : null;
      },
      _setDate: function (n, t, i) {
        var r = !t,
          u = n.selectedMonth,
          f = n.selectedYear;
        t = this._determineDate(t, new Date());
        n.selectedDay = n.currentDay = t.getDate();
        n.drawMonth = n.selectedMonth = n.currentMonth = t.getMonth();
        n.drawYear = n.selectedYear = n.currentYear = t.getFullYear();
        (u != n.selectedMonth || f != n.selectedYear) && this._notifyChange(n);
        this._adjustInstDate(n);
        n.input && n.input.val(r ? '' : this._formatDate(n));
      },
      _getDate: function (n) {
        return !n.currentYear || (n.input && n.input.val() == '')
          ? null
          : this._daylightSavingAdjust(
              new Date(n.currentYear, n.currentMonth, n.currentDay)
            );
      },
      _generateHTML: function (n) {
        var c = new Date(),
          b,
          s,
          ut,
          h,
          y,
          ot,
          p,
          ht,
          ct,
          lt,
          at,
          vt,
          e;
        c = this._daylightSavingAdjust(
          new Date(c.getFullYear(), c.getMonth(), c.getDate())
        );
        var f = this._get(n, 'isRTL'),
          ii = this._get(n, 'showButtonPanel'),
          pt = this._get(n, 'hideIfNoPrevNext'),
          it = this._get(n, 'navigationAsDateFormat'),
          o = this._getNumberOfMonths(n),
          ri = this._get(n, 'showCurrentAtPos'),
          d = this._get(n, 'stepMonths'),
          ci = this._get(n, 'stepBigMonths'),
          rt = o[0] != 1 || o[1] != 1,
          g = this._daylightSavingAdjust(
            n.currentDay
              ? new Date(n.currentYear, n.currentMonth, n.currentDay)
              : new Date(9999, 9, 9)
          ),
          v = this._getMinMaxDate(n, 'min', !0),
          l = this._getMinMaxDate(n, 'max'),
          t = n.drawMonth - ri,
          r = n.drawYear;
        if ((t < 0 && ((t += 12), r--), l))
          for (
            b = this._daylightSavingAdjust(
              new Date(l.getFullYear(), l.getMonth() - o[1] + 1, l.getDate())
            ),
              b = v && b < v ? v : b;
            this._daylightSavingAdjust(new Date(r, t, 1)) > b;

          )
            t--, t < 0 && ((t = 11), r--);
        n.drawMonth = t;
        n.drawYear = r;
        s = this._get(n, 'prevText');
        s = it
          ? this.formatDate(
              s,
              this._daylightSavingAdjust(new Date(r, t - d, 1)),
              this._getFormatConfig(n)
            )
          : s;
        ut = this._canAdjustMonth(n, -1, r, t)
          ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' +
            n.id +
            "', -" +
            d +
            ', \'M\');" title="' +
            s +
            '"><span class="ui-icon ui-icon-circle-triangle-' +
            (f ? 'e' : 'w') +
            '">' +
            s +
            '</span></a>'
          : pt
          ? ''
          : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' +
            s +
            '"><span class="ui-icon ui-icon-circle-triangle-' +
            (f ? 'e' : 'w') +
            '">' +
            s +
            '</span></a>';
        h = this._get(n, 'nextText');
        h = it
          ? this.formatDate(
              h,
              this._daylightSavingAdjust(new Date(r, t + d, 1)),
              this._getFormatConfig(n)
            )
          : h;
        var wt = this._canAdjustMonth(n, 1, r, t)
            ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' +
              n.id +
              "', +" +
              d +
              ', \'M\');" title="' +
              h +
              '"><span class="ui-icon ui-icon-circle-triangle-' +
              (f ? 'w' : 'e') +
              '">' +
              h +
              '</span></a>'
            : pt
            ? ''
            : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' +
              h +
              '"><span class="ui-icon ui-icon-circle-triangle-' +
              (f ? 'w' : 'e') +
              '">' +
              h +
              '</span></a>',
          nt = this._get(n, 'currentText'),
          bt = this._get(n, 'gotoCurrent') && n.currentDay ? g : c;
        nt = it ? this.formatDate(nt, bt, this._getFormatConfig(n)) : nt;
        var kt = n.inline
            ? ''
            : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">' +
              this._get(n, 'closeText') +
              '</button>',
          ui = ii
            ? '<div class="ui-datepicker-buttonpane ui-widget-content">' +
              (f ? kt : '') +
              (this._isInRange(n, bt)
                ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#' +
                  n.id +
                  '\');">' +
                  nt +
                  '</button>'
                : '') +
              (f ? '' : kt) +
              '</div>'
            : '',
          a = parseInt(this._get(n, 'firstDay'), 10);
        a = isNaN(a) ? 0 : a;
        var fi = this._get(n, 'dayNames'),
          li = this._get(n, 'dayNamesShort'),
          ei = this._get(n, 'dayNamesMin'),
          oi = this._get(n, 'monthNames'),
          si = this._get(n, 'monthNamesShort'),
          dt = this._get(n, 'beforeShowDay'),
          ft = this._get(n, 'showOtherMonths'),
          ai = this._get(n, 'calculateWeek') || this.iso8601Week,
          gt = n.endDay
            ? this._daylightSavingAdjust(
                new Date(n.endYear, n.endMonth, n.endDay)
              )
            : g,
          ni = this._getDefaultDate(n),
          et = '';
        for (y = 0; y < o[0]; y++) {
          for (ot = '', p = 0; p < o[1]; p++) {
            var st = this._daylightSavingAdjust(new Date(r, t, n.selectedDay)),
              w = ' ui-corner-all',
              u = '';
            if (rt) {
              u += '<div class="ui-datepicker-group ui-datepicker-group-';
              switch (p) {
                case 0:
                  u += 'first';
                  w = ' ui-corner-' + (f ? 'right' : 'left');
                  break;
                case o[1] - 1:
                  u += 'last';
                  w = ' ui-corner-' + (f ? 'left' : 'right');
                  break;
                default:
                  u += 'middle';
                  w = '';
                  break;
              }
              u += '">';
            }
            for (
              u +=
                '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' +
                w +
                '">' +
                (/all|left/.test(w) && y == 0 ? (f ? wt : ut) : '') +
                (/all|right/.test(w) && y == 0 ? (f ? ut : wt) : '') +
                this._generateMonthYearHeader(
                  n,
                  t,
                  r,
                  v,
                  l,
                  st,
                  y > 0 || p > 0,
                  oi,
                  si
                ) +
                '</div><table class="ui-datepicker-calendar"><thead><tr>',
                ht = '',
                e = 0;
              e < 7;
              e++
            )
              (ct = (e + a) % 7),
                (ht +=
                  '<th' +
                  ((e + a + 6) % 7 >= 5
                    ? ' class="ui-datepicker-week-end"'
                    : '') +
                  '><span title="' +
                  fi[ct] +
                  '">' +
                  ei[ct] +
                  '</span></th>');
            u += ht + '</tr></thead><tbody>';
            lt = this._getDaysInMonth(r, t);
            r == n.selectedYear &&
              t == n.selectedMonth &&
              (n.selectedDay = Math.min(n.selectedDay, lt));
            var ti = (this._getFirstDayOfMonth(r, t) - a + 7) % 7,
              hi = rt ? 6 : Math.ceil((ti + lt) / 7),
              i = this._daylightSavingAdjust(new Date(r, t, 1 - ti));
            for (at = 0; at < hi; at++) {
              for (u += '<tr>', vt = '', e = 0; e < 7; e++) {
                var tt = dt
                    ? dt.apply(n.input ? n.input[0] : null, [i])
                    : [!0, ''],
                  k = i.getMonth() != t,
                  yt = k || !tt[0] || (v && i < v) || (l && i > l);
                vt +=
                  '<td class="' +
                  ((e + a + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') +
                  (k ? ' ui-datepicker-other-month' : '') +
                  ((i.getTime() == st.getTime() &&
                    t == n.selectedMonth &&
                    n._keyEvent) ||
                  (ni.getTime() == i.getTime() && ni.getTime() == st.getTime())
                    ? ' ' + this._dayOverClass
                    : '') +
                  (yt
                    ? ' ' + this._unselectableClass + ' ui-state-disabled'
                    : '') +
                  (k && !ft
                    ? ''
                    : ' ' +
                      tt[1] +
                      (i.getTime() >= g.getTime() && i.getTime() <= gt.getTime()
                        ? ' ' + this._currentClass
                        : '') +
                      (i.getTime() == c.getTime()
                        ? ' ui-datepicker-today'
                        : '')) +
                  '"' +
                  ((!k || ft) && tt[2] ? ' title="' + tt[2] + '"' : '') +
                  (yt
                    ? ''
                    : ' onclick="DP_jQuery.datepicker._selectDay(\'#' +
                      n.id +
                      "'," +
                      t +
                      ',' +
                      r +
                      ', this);return false;"') +
                  '>' +
                  (k
                    ? ft
                      ? i.getDate()
                      : '&#xa0;'
                    : yt
                    ? '<span class="ui-state-default">' +
                      i.getDate() +
                      '</span>'
                    : '<a class="ui-state-default' +
                      (i.getTime() == c.getTime()
                        ? ' ui-state-highlight'
                        : '') +
                      (i.getTime() >= g.getTime() && i.getTime() <= gt.getTime()
                        ? ' ui-state-active'
                        : '') +
                      '" href="#">' +
                      i.getDate() +
                      '</a>') +
                  '</td>';
                i.setDate(i.getDate() + 1);
                i = this._daylightSavingAdjust(i);
              }
              u += vt + '</tr>';
            }
            t++;
            t > 11 && ((t = 0), r++);
            u +=
              '</tbody></table>' +
              (rt
                ? '</div>' +
                  (o[0] > 0 && p == o[1] - 1
                    ? '<div class="ui-datepicker-row-break"></div>'
                    : '')
                : '');
            ot += u;
          }
          et += ot;
        }
        return (
          (et +=
            ui +
            ($.browser.msie && parseInt($.browser.version, 10) < 7 && !n.inline
              ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>'
              : '')),
          (n._keyEvent = !1),
          et
        );
      },
      _generateMonthYearHeader: function (n, t, i, r, u, f, e, o, s) {
        var k, d, c;
        r = n.rangeStart && r && f < r ? f : r;
        var p = this._get(n, 'changeMonth'),
          w = this._get(n, 'changeYear'),
          b = this._get(n, 'showMonthAfterYear'),
          l = '<div class="ui-datepicker-title">',
          y = '';
        if (e || !p)
          y += '<span class="ui-datepicker-month">' + o[t] + '</span> ';
        else {
          for (
            k = r && r.getFullYear() == i,
              d = u && u.getFullYear() == i,
              y +=
                '<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' +
                n.id +
                "', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" +
                n.id +
                '\');">',
              c = 0;
            c < 12;
            c++
          )
            (!k || c >= r.getMonth()) &&
              (!d || c <= u.getMonth()) &&
              (y +=
                '<option value="' +
                c +
                '"' +
                (c == t ? ' selected="selected"' : '') +
                '>' +
                s[c] +
                '</option>');
          y += '</select>';
        }
        if (
          (b || (l += y + ((e || p || w) && !(p && w) ? '&#xa0;' : '')),
          e || !w)
        )
          l += '<span class="ui-datepicker-year">' + i + '</span>';
        else {
          var a = this._get(n, 'yearRange').split(':'),
            h = 0,
            v = 0;
          for (
            a.length != 2
              ? ((h = i - 10), (v = i + 10))
              : a[0].charAt(0) == '+' || a[0].charAt(0) == '-'
              ? ((h = i + parseInt(a[0], 10)), (v = i + parseInt(a[1], 10)))
              : ((h = parseInt(a[0], 10)), (v = parseInt(a[1], 10))),
              h = r ? Math.max(h, r.getFullYear()) : h,
              v = u ? Math.min(v, u.getFullYear()) : v,
              l +=
                '<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' +
                n.id +
                "', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" +
                n.id +
                '\');">';
            h <= v;
            h++
          )
            l +=
              '<option value="' +
              h +
              '"' +
              (h == i ? ' selected="selected"' : '') +
              '>' +
              h +
              '</option>';
          l += '</select>';
        }
        return b && (l += (e || p || w ? '&#xa0;' : '') + y), l + '</div>';
      },
      _adjustInstDate: function (n, t, i) {
        var e = n.drawYear + (i == 'Y' ? t : 0),
          o = n.drawMonth + (i == 'M' ? t : 0),
          s =
            Math.min(n.selectedDay, this._getDaysInMonth(e, o)) +
            (i == 'D' ? t : 0),
          r = this._daylightSavingAdjust(new Date(e, o, s)),
          u = this._getMinMaxDate(n, 'min', !0),
          f = this._getMinMaxDate(n, 'max');
        r = u && r < u ? u : r;
        r = f && r > f ? f : r;
        n.selectedDay = r.getDate();
        n.drawMonth = n.selectedMonth = r.getMonth();
        n.drawYear = n.selectedYear = r.getFullYear();
        (i == 'M' || i == 'Y') && this._notifyChange(n);
      },
      _notifyChange: function (n) {
        var t = this._get(n, 'onChangeMonthYear');
        t &&
          t.apply(n.input ? n.input[0] : null, [
            n.selectedYear,
            n.selectedMonth + 1,
            n,
          ]);
      },
      _getNumberOfMonths: function (n) {
        var t = this._get(n, 'numberOfMonths');
        return t == null ? [1, 1] : typeof t == 'number' ? [1, t] : t;
      },
      _getMinMaxDate: function (n, t, i) {
        var r = this._determineDate(this._get(n, t + 'Date'), null);
        return !i || !n.rangeStart
          ? r
          : !r || n.rangeStart > r
          ? n.rangeStart
          : r;
      },
      _getDaysInMonth: function (n, t) {
        return 32 - new Date(n, t, 32).getDate();
      },
      _getFirstDayOfMonth: function (n, t) {
        return new Date(n, t, 1).getDay();
      },
      _canAdjustMonth: function (n, t, i, r) {
        var f = this._getNumberOfMonths(n),
          u = this._daylightSavingAdjust(
            new Date(i, r + (t < 0 ? t : f[1]), 1)
          );
        return (
          t < 0 &&
            u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())),
          this._isInRange(n, u)
        );
      },
      _isInRange: function (n, t) {
        var i = n.rangeStart
            ? this._daylightSavingAdjust(
                new Date(n.selectedYear, n.selectedMonth, n.selectedDay)
              )
            : null,
          r,
          u;
        return (
          (i = i && n.rangeStart < i ? n.rangeStart : i),
          (r = i || this._getMinMaxDate(n, 'min')),
          (u = this._getMinMaxDate(n, 'max')),
          (!r || t >= r) && (!u || t <= u)
        );
      },
      _getFormatConfig: function (n) {
        var t = this._get(n, 'shortYearCutoff');
        return (
          (t =
            typeof t != 'string'
              ? t
              : (new Date().getFullYear() % 100) + parseInt(t, 10)),
          {
            shortYearCutoff: t,
            dayNamesShort: this._get(n, 'dayNamesShort'),
            dayNames: this._get(n, 'dayNames'),
            monthNamesShort: this._get(n, 'monthNamesShort'),
            monthNames: this._get(n, 'monthNames'),
          }
        );
      },
      _formatDate: function (n, t, i, r) {
        t ||
          ((n.currentDay = n.selectedDay),
          (n.currentMonth = n.selectedMonth),
          (n.currentYear = n.selectedYear));
        var u = t
          ? typeof t == 'object'
            ? t
            : this._daylightSavingAdjust(new Date(r, i, t))
          : this._daylightSavingAdjust(
              new Date(n.currentYear, n.currentMonth, n.currentDay)
            );
        return this.formatDate(
          this._get(n, 'dateFormat'),
          u,
          this._getFormatConfig(n)
        );
      },
    });
    $.fn.datepicker = function (n) {
      $.datepicker.initialized ||
        ($(document)
          .mousedown($.datepicker._checkExternalClick)
          .find('body')
          .append($.datepicker.dpDiv),
        ($.datepicker.initialized = !0));
      var t = Array.prototype.slice.call(arguments, 1);
      return typeof n == 'string' && (n == 'isDisabled' || n == 'getDate')
        ? $.datepicker['_' + n + 'Datepicker'].apply(
            $.datepicker,
            [this[0]].concat(t)
          )
        : n == 'option' &&
          arguments.length == 2 &&
          typeof arguments[1] == 'string'
        ? $.datepicker['_' + n + 'Datepicker'].apply(
            $.datepicker,
            [this[0]].concat(t)
          )
        : this.each(function () {
            typeof n == 'string'
              ? $.datepicker['_' + n + 'Datepicker'].apply(
                  $.datepicker,
                  [this].concat(t)
                )
              : $.datepicker._attachDatepicker(this, n);
          });
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = !1;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = '1.7.3';
    window.DP_jQuery = $;
  })(jQuery),
  (function (n) {
    n.widget('ui.progressbar', {
      _init: function () {
        this.element
          .addClass('ui-progressbar ui-widget ui-widget-content ui-corner-all')
          .attr({
            role: 'progressbar',
            'aria-valuemin': this._valueMin(),
            'aria-valuemax': this._valueMax(),
            'aria-valuenow': this._value(),
          });
        this.valueDiv = n(
          '<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>'
        ).appendTo(this.element);
        this._refreshValue();
      },
      destroy: function () {
        this.element
          .removeClass(
            'ui-progressbar ui-widget ui-widget-content ui-corner-all'
          )
          .removeAttr('role')
          .removeAttr('aria-valuemin')
          .removeAttr('aria-valuemax')
          .removeAttr('aria-valuenow')
          .removeData('progressbar')
          .unbind('.progressbar');
        this.valueDiv.remove();
        n.widget.prototype.destroy.apply(this, arguments);
      },
      value: function (n) {
        return n === undefined
          ? this._value()
          : (this._setData('value', n), this);
      },
      _setData: function (t, i) {
        switch (t) {
          case 'value':
            this.options.value = i;
            this._refreshValue();
            this._trigger('change', null, {});
            break;
        }
        n.widget.prototype._setData.apply(this, arguments);
      },
      _value: function () {
        var n = this.options.value;
        return (
          n < this._valueMin() && (n = this._valueMin()),
          n > this._valueMax() && (n = this._valueMax()),
          n
        );
      },
      _valueMin: function () {
        return 0;
      },
      _valueMax: function () {
        return 100;
      },
      _refreshValue: function () {
        var n = this.value();
        this.valueDiv[n == this._valueMax() ? 'addClass' : 'removeClass'](
          'ui-corner-right'
        );
        this.valueDiv.width(n + '%');
        this.element.attr('aria-valuenow', n);
      },
    });
    n.extend(n.ui.progressbar, { version: '1.7.3', defaults: { value: 0 } });
  })(jQuery),
  (function ($) {
    $.extend({
      metadata: {
        defaults: {
          type: 'class',
          name: 'metadata',
          cre: /({.*})/,
          single: 'metadata',
        },
        setType: function (n, t) {
          this.defaults.type = n;
          this.defaults.name = t;
        },
        get: function (elem, opts) {
          var settings = $.extend({}, this.defaults, opts),
            data,
            m,
            e,
            attr;
          if (
            (settings.single.length || (settings.single = 'metadata'),
            (data = $.data(elem, settings.single)),
            data)
          )
            return data;
          if (((data = '{}'), settings.type == 'class'))
            (m = settings.cre.exec(elem.className)), m && (data = m[1]);
          else if (settings.type == 'elem') {
            if (!elem.getElementsByTagName) return;
            e = elem.getElementsByTagName(settings.name);
            e.length && (data = $.trim(e[0].innerHTML));
          } else
            elem.getAttribute != undefined &&
              ((attr = elem.getAttribute(settings.name)),
              attr && (data = attr));
          return (
            data.indexOf('{') < 0 && (data = '{' + data + '}'),
            (data = eval('(' + data + ')')),
            $.data(elem, settings.single, data),
            data
          );
        },
      },
    });
    $.fn.metadata = function (n) {
      return $.metadata.get(this[0], n);
    };
  })(jQuery);
(jQuery.cookie = function (n, t, i) {
  var f, r, e, o, u, s;
  if (typeof t != 'undefined') {
    i = i || {};
    t === null && ((t = ''), (i.expires = -1));
    f = '';
    i.expires &&
      (typeof i.expires == 'number' || i.expires.toUTCString) &&
      (typeof i.expires == 'number'
        ? ((r = new Date()), r.setTime(r.getTime() + i.expires * 864e5))
        : (r = i.expires),
      (f = '; expires=' + r.toUTCString()));
    var h = i.path ? '; path=' + i.path : '',
      c = i.domain ? '; domain=' + i.domain : '',
      l = i.secure ? '; secure' : '';
    document.cookie = [n, '=', encodeURIComponent(t), f, h, c, l].join('');
  } else {
    if (((e = null), document.cookie && document.cookie != ''))
      for (o = document.cookie.split(';'), u = 0; u < o.length; u++)
        if (
          ((s = jQuery.trim(o[u])), s.substring(0, n.length + 1) == n + '=')
        ) {
          e = decodeURIComponent(s.substring(n.length + 1));
          break;
        }
    return e;
  }
}),
  (function (n, t) {
    'use strict';
    function r(t) {
      n.fn.cycle.debug && i(t);
    }
    function i() {
      window.console &&
        console.log &&
        console.log('[cycle] ' + Array.prototype.join.call(arguments, ' '));
    }
    function u(t, i, r) {
      var u = n(t).data('cycle.opts'),
        f;
      u &&
        ((f = !!t.cyclePause),
        f && u.paused
          ? u.paused(t, u, i, r)
          : !f && u.resumed && u.resumed(t, u, i, r));
    }
    function l(r, e, o) {
      function c(t, r, u) {
        if (!t && r === !0) {
          var e = n(u).data('cycle.opts');
          if (!e) return i('options not found, can not resume'), !1;
          u.cycleTimeout &&
            (clearTimeout(u.cycleTimeout), (u.cycleTimeout = 0));
          f(e.elements, e, 1, !e.backwards);
        }
      }
      var s, h;
      if (
        (r.cycleStop === t && (r.cycleStop = 0),
        (e === t || e === null) && (e = {}),
        e.constructor == String)
      ) {
        switch (e) {
          case 'destroy':
          case 'stop':
            return ((s = n(r).data('cycle.opts')), !s)
              ? !1
              : (r.cycleStop++,
                r.cycleTimeout && clearTimeout(r.cycleTimeout),
                (r.cycleTimeout = 0),
                s.elements && n(s.elements).stop(),
                n(r).removeData('cycle.opts'),
                e == 'destroy' && a(r, s),
                !1);
          case 'toggle':
            return (
              (r.cyclePause = r.cyclePause === 1 ? 0 : 1),
              c(r.cyclePause, o, r),
              u(r),
              !1
            );
          case 'pause':
            return (r.cyclePause = 1), u(r), !1;
          case 'resume':
            return (r.cyclePause = 0), c(!1, o, r), u(r), !1;
          case 'prev':
          case 'next':
            return ((s = n(r).data('cycle.opts')), !s)
              ? (i('options not found, "prev/next" ignored'), !1)
              : (typeof o == 'string' && (s.oneTimeFx = o),
                n.fn.cycle[e](s),
                !1);
          default:
            e = { fx: e };
        }
        return e;
      } else if (e.constructor == Number)
        return ((h = e), (e = n(r).data('cycle.opts')), !e)
          ? (i('options not found, can not advance slide'), !1)
          : h < 0 || h >= e.elements.length
          ? (i('invalid slide index: ' + h), !1)
          : ((e.nextSlide = h),
            r.cycleTimeout &&
              (clearTimeout(r.cycleTimeout), (r.cycleTimeout = 0)),
            typeof o == 'string' && (e.oneTimeFx = o),
            f(e.elements, e, 1, h >= e.currSlide),
            !1);
      return e;
    }
    function o(t, i) {
      if (!n.support.opacity && i.cleartype && t.style.filter)
        try {
          t.style.removeAttribute('filter');
        } catch (r) {}
    }
    function a(t, i) {
      i.next && n(i.next).unbind(i.prevNextEvent);
      i.prev && n(i.prev).unbind(i.prevNextEvent);
      (i.pager || i.pagerAnchorBuilder) &&
        n.each(i.pagerAnchors || [], function () {
          this.unbind().remove();
        });
      i.pagerAnchors = null;
      n(t).unbind('mouseenter.cycle mouseleave.cycle');
      i.destroy && i.destroy(i);
    }
    function v(r, s, c, l, a) {
      var at,
        v = n.extend(
          {},
          n.fn.cycle.defaults,
          l || {},
          n.metadata ? r.metadata() : n.meta ? r.data() : {}
        ),
        vt = n.isFunction(r.data) ? r.data(v.metaAttr) : null,
        rt,
        ut,
        tt,
        k,
        yt,
        nt,
        d,
        ft,
        ht,
        ct,
        pt,
        lt,
        g;
      if (
        (vt && (v = n.extend(v, vt)),
        v.autostop && (v.countdown = v.autostopCount || c.length),
        (rt = r[0]),
        r.data('cycle.opts', v),
        (v.$cont = r),
        (v.stopCount = rt.cycleStop),
        (v.elements = c),
        (v.before = v.before ? [v.before] : []),
        (v.after = v.after ? [v.after] : []),
        !n.support.opacity &&
          v.cleartype &&
          v.after.push(function () {
            o(this, v);
          }),
        v.continuous &&
          v.after.push(function () {
            f(c, v, 0, !v.backwards);
          }),
        y(v),
        n.support.opacity || !v.cleartype || v.cleartypeNoBg || h(s),
        r.css('position') == 'static' && r.css('position', 'relative'),
        v.width && r.width(v.width),
        v.height && v.height != 'auto' && r.height(v.height),
        v.startingSlide !== t
          ? ((v.startingSlide = parseInt(v.startingSlide, 10)),
            v.startingSlide >= c.length || v.startSlide < 0
              ? (v.startingSlide = 0)
              : (at = !0))
          : (v.startingSlide = v.backwards ? c.length - 1 : 0),
        v.random)
      ) {
        for (v.randomMap = [], ut = 0; ut < c.length; ut++)
          v.randomMap.push(ut);
        if (
          (v.randomMap.sort(function (n, t) {
            return Math.random() - 0.5;
          }),
          at)
        )
          for (tt = 0; tt < c.length; tt++)
            v.startingSlide == v.randomMap[tt] && (v.randomIndex = tt);
        else (v.randomIndex = 1), (v.startingSlide = v.randomMap[1]);
      } else v.startingSlide >= c.length && (v.startingSlide = 0);
      if (
        ((v.currSlide = v.startingSlide || 0),
        (k = v.startingSlide),
        s
          .css({ position: 'absolute', top: 0, left: 0 })
          .hide()
          .each(function (t) {
            var i;
            i = v.backwards
              ? k
                ? t <= k
                  ? c.length + (t - k)
                  : k - t
                : c.length - t
              : k
              ? t >= k
                ? c.length - (t - k)
                : k - t
              : c.length - t;
            n(this).css('z-index', i);
          }),
        n(c[k]).css('opacity', 1).show(),
        o(c[k], v),
        v.fit &&
          (v.aspect
            ? s.each(function () {
                var t = n(this),
                  i = v.aspect === !0 ? t.width() / t.height() : v.aspect;
                v.width &&
                  t.width() != v.width &&
                  (t.width(v.width), t.height(v.width / i));
                v.height &&
                  t.height() < v.height &&
                  (t.height(v.height), t.width(v.height * i));
              })
            : (v.width && s.width(v.width),
              v.height && v.height != 'auto' && s.height(v.height))),
        v.center &&
          (!v.fit || v.aspect) &&
          s.each(function () {
            var t = n(this);
            t.css({
              'margin-left': v.width ? (v.width - t.width()) / 2 + 'px' : 0,
              'margin-top': v.height ? (v.height - t.height()) / 2 + 'px' : 0,
            });
          }),
        !v.center ||
          v.fit ||
          v.slideResize ||
          s.each(function () {
            var t = n(this);
            t.css({
              'margin-left': v.width ? (v.width - t.width()) / 2 + 'px' : 0,
              'margin-top': v.height ? (v.height - t.height()) / 2 + 'px' : 0,
            });
          }),
        (yt =
          (v.containerResize || v.containerResizeHeight) &&
          r.innerHeight() < 1),
        yt)
      ) {
        for (nt = 0, d = 0, ft = 0; ft < c.length; ft++) {
          var it = n(c[ft]),
            et = it[0],
            ot = it.outerWidth(),
            st = it.outerHeight();
          ot || (ot = et.offsetWidth || et.width || it.attr('width'));
          st || (st = et.offsetHeight || et.height || it.attr('height'));
          nt = ot > nt ? ot : nt;
          d = st > d ? st : d;
        }
        v.containerResize &&
          nt > 0 &&
          d > 0 &&
          r.css({ width: nt + 'px', height: d + 'px' });
        v.containerResizeHeight && d > 0 && r.css({ height: d + 'px' });
      }
      if (
        ((ht = !1),
        v.pause &&
          r
            .bind('mouseenter.cycle', function () {
              ht = !0;
              this.cyclePause++;
              u(rt, !0);
            })
            .bind('mouseleave.cycle', function () {
              ht && this.cyclePause--;
              u(rt, !0);
            }),
        p(v) === !1) ||
        ((ct = !1),
        (l.requeueAttempts = l.requeueAttempts || 0),
        s.each(function () {
          var t = n(this),
            r;
          if (
            ((this.cycleH =
              v.fit && v.height
                ? v.height
                : t.height() ||
                  this.offsetHeight ||
                  this.height ||
                  t.attr('height') ||
                  0),
            (this.cycleW =
              v.fit && v.width
                ? v.width
                : t.width() ||
                  this.offsetWidth ||
                  this.width ||
                  t.attr('width') ||
                  0),
            t.is('img') &&
              ((r = this.cycleH === 0 && this.cycleW === 0 && !this.complete),
              r))
          )
            if (a.s && v.requeueOnImageNotLoaded && ++l.requeueAttempts < 100)
              return (
                i(
                  l.requeueAttempts,
                  ' - img slide not loaded, requeuing slideshow: ',
                  this.src,
                  this.cycleW,
                  this.cycleH
                ),
                setTimeout(function () {
                  n(a.s, a.c).cycle(l);
                }, v.requeueTimeout),
                (ct = !0),
                !1
              );
            else
              i(
                'could not determine size of image: ' + this.src,
                this.cycleW,
                this.cycleH
              );
          return !0;
        }),
        ct)
      )
        return !1;
      if (
        ((v.cssBefore = v.cssBefore || {}),
        (v.cssAfter = v.cssAfter || {}),
        (v.cssFirst = v.cssFirst || {}),
        (v.animIn = v.animIn || {}),
        (v.animOut = v.animOut || {}),
        s.not(':eq(' + k + ')').css(v.cssBefore),
        n(s[k]).css(v.cssFirst),
        v.timeout)
      )
        for (
          v.timeout = parseInt(v.timeout, 10),
            v.speed.constructor == String &&
              (v.speed = n.fx.speeds[v.speed] || parseInt(v.speed, 10)),
            v.sync || (v.speed = v.speed / 2),
            pt = v.fx == 'none' ? 0 : v.fx == 'shuffle' ? 500 : 250;
          v.timeout - v.speed < pt;

        )
          v.timeout += v.speed;
      if (
        (v.easing && (v.easeIn = v.easeOut = v.easing),
        v.speedIn || (v.speedIn = v.speed),
        v.speedOut || (v.speedOut = v.speed),
        (v.slideCount = c.length),
        (v.currSlide = v.lastSlide = k),
        v.random
          ? (++v.randomIndex == c.length && (v.randomIndex = 0),
            (v.nextSlide = v.randomMap[v.randomIndex]))
          : (v.nextSlide = v.backwards
              ? v.startingSlide === 0
                ? c.length - 1
                : v.startingSlide - 1
              : v.startingSlide >= c.length - 1
              ? 0
              : v.startingSlide + 1),
        !v.multiFx)
      )
        if (((lt = n.fn.cycle.transitions[v.fx]), n.isFunction(lt)))
          lt(r, s, v);
        else if (v.fx != 'custom' && !v.multiFx)
          return (
            i('unknown transition: ' + v.fx, '; slideshow terminating'), !1
          );
      return (
        (g = s[k]),
        v.skipInitializationCallbacks ||
          (v.before.length && v.before[0].apply(g, [g, g, v, !0]),
          v.after.length && v.after[0].apply(g, [g, g, v, !0])),
        v.next &&
          n(v.next).bind(v.prevNextEvent, function () {
            return e(v, 1);
          }),
        v.prev &&
          n(v.prev).bind(v.prevNextEvent, function () {
            return e(v, 0);
          }),
        (v.pager || v.pagerAnchorBuilder) && b(c, v),
        w(v, c),
        v
      );
    }
    function y(t) {
      t.original = { before: [], after: [] };
      t.original.cssBefore = n.extend({}, t.cssBefore);
      t.original.cssAfter = n.extend({}, t.cssAfter);
      t.original.animIn = n.extend({}, t.animIn);
      t.original.animOut = n.extend({}, t.animOut);
      n.each(t.before, function () {
        t.original.before.push(this);
      });
      n.each(t.after, function () {
        t.original.after.push(this);
      });
    }
    function p(t) {
      var u,
        e,
        f = n.fn.cycle.transitions,
        s,
        o,
        h,
        c;
      if (t.fx.indexOf(',') > 0) {
        for (
          t.multiFx = !0, t.fxs = t.fx.replace(/\s*/g, '').split(','), u = 0;
          u < t.fxs.length;
          u++
        )
          (s = t.fxs[u]),
            (e = f[s]),
            (e && f.hasOwnProperty(s) && n.isFunction(e)) ||
              (i('discarding unknown transition: ', s),
              t.fxs.splice(u, 1),
              u--);
        if (!t.fxs.length)
          return i('No valid transitions named; slideshow terminating.'), !1;
      } else if (t.fx == 'all') {
        t.multiFx = !0;
        t.fxs = [];
        for (o in f)
          f.hasOwnProperty(o) &&
            ((e = f[o]),
            f.hasOwnProperty(o) && n.isFunction(e) && t.fxs.push(o));
      }
      if (t.multiFx && t.randomizeEffects) {
        for (h = Math.floor(Math.random() * 20) + 30, u = 0; u < h; u++)
          (c = Math.floor(Math.random() * t.fxs.length)),
            t.fxs.push(t.fxs.splice(c, 1)[0]);
        r('randomized fx sequence: ', t.fxs);
      }
      return !0;
    }
    function w(t, i) {
      t.addSlide = function (r, u) {
        var f = n(r),
          e = f[0];
        if (
          (t.autostopCount || t.countdown++,
          i[u ? 'unshift' : 'push'](e),
          t.els && t.els[u ? 'unshift' : 'push'](e),
          (t.slideCount = i.length),
          t.random &&
            (t.randomMap.push(t.slideCount - 1),
            t.randomMap.sort(function (n, t) {
              return Math.random() - 0.5;
            })),
          f.css('position', 'absolute'),
          f[u ? 'prependTo' : 'appendTo'](t.$cont),
          u && (t.currSlide++, t.nextSlide++),
          n.support.opacity || !t.cleartype || t.cleartypeNoBg || h(f),
          t.fit && t.width && f.width(t.width),
          t.fit && t.height && t.height != 'auto' && f.height(t.height),
          (e.cycleH = t.fit && t.height ? t.height : f.height()),
          (e.cycleW = t.fit && t.width ? t.width : f.width()),
          f.css(t.cssBefore),
          (t.pager || t.pagerAnchorBuilder) &&
            n.fn.cycle.createPagerAnchor(i.length - 1, e, n(t.pager), i, t),
          n.isFunction(t.onAddSlide))
        )
          t.onAddSlide(f);
        else f.hide();
      };
    }
    function f(i, u, e, o) {
      function w() {
        var n = 0,
          t = u.timeout;
        u.timeout && !u.continuous
          ? ((n = s(i[u.currSlide], i[u.nextSlide], u, o)),
            u.fx == 'shuffle' && (n -= u.speedOut))
          : u.continuous && l.cyclePause && (n = 10);
        n > 0 &&
          (l.cycleTimeout = setTimeout(function () {
            f(i, u, 0, !u.backwards);
          }, n));
      }
      var l = u.$cont[0],
        c = i[u.currSlide],
        h = i[u.nextSlide],
        y,
        v,
        p,
        a;
      if (
        (e &&
          u.busy &&
          u.manualTrump &&
          (r('manualTrump in go(), stopping active transition'),
          n(i).stop(!0, !0),
          (u.busy = 0),
          clearTimeout(l.cycleTimeout)),
        u.busy)
      ) {
        r('transition active, ignoring new tx request');
        return;
      }
      if (l.cycleStop == u.stopCount && (l.cycleTimeout !== 0 || e)) {
        if (
          !e &&
          !l.cyclePause &&
          !u.bounce &&
          ((u.autostop && --u.countdown <= 0) ||
            (u.nowrap && !u.random && u.nextSlide < u.currSlide))
        ) {
          u.end && u.end(u);
          return;
        }
        y = !1;
        (e || !l.cyclePause) && u.nextSlide != u.currSlide
          ? ((y = !0),
            (v = u.fx),
            (c.cycleH = c.cycleH || n(c).height()),
            (c.cycleW = c.cycleW || n(c).width()),
            (h.cycleH = h.cycleH || n(h).height()),
            (h.cycleW = h.cycleW || n(h).width()),
            u.multiFx &&
              (o && (u.lastFx === t || ++u.lastFx >= u.fxs.length)
                ? (u.lastFx = 0)
                : !o &&
                  (u.lastFx === t || --u.lastFx < 0) &&
                  (u.lastFx = u.fxs.length - 1),
              (v = u.fxs[u.lastFx])),
            u.oneTimeFx && ((v = u.oneTimeFx), (u.oneTimeFx = null)),
            n.fn.cycle.resetState(u, v),
            u.before.length &&
              n.each(u.before, function (n, t) {
                l.cycleStop == u.stopCount && t.apply(h, [c, h, u, o]);
              }),
            (p = function () {
              u.busy = 0;
              n.each(u.after, function (n, t) {
                l.cycleStop == u.stopCount && t.apply(h, [c, h, u, o]);
              });
              l.cycleStop || w();
            }),
            r(
              'tx firing(' +
                v +
                '); currSlide: ' +
                u.currSlide +
                '; nextSlide: ' +
                u.nextSlide
            ),
            (u.busy = 1),
            u.fxFn
              ? u.fxFn(c, h, u, p, o, e && u.fastOnEvent)
              : n.isFunction(n.fn.cycle[u.fx])
              ? n.fn.cycle[u.fx](c, h, u, p, o, e && u.fastOnEvent)
              : n.fn.cycle.custom(c, h, u, p, o, e && u.fastOnEvent))
          : w();
        (y || u.nextSlide == u.currSlide) &&
          ((u.lastSlide = u.currSlide),
          u.random
            ? ((u.currSlide = u.nextSlide),
              ++u.randomIndex == i.length &&
                ((u.randomIndex = 0),
                u.randomMap.sort(function (n, t) {
                  return Math.random() - 0.5;
                })),
              (u.nextSlide = u.randomMap[u.randomIndex]),
              u.nextSlide == u.currSlide &&
                (u.nextSlide =
                  u.currSlide == u.slideCount - 1 ? 0 : u.currSlide + 1))
            : u.backwards
            ? ((a = u.nextSlide - 1 < 0),
              a && u.bounce
                ? ((u.backwards = !u.backwards),
                  (u.nextSlide = 1),
                  (u.currSlide = 0))
                : ((u.nextSlide = a ? i.length - 1 : u.nextSlide - 1),
                  (u.currSlide = a ? 0 : u.nextSlide + 1)))
            : ((a = u.nextSlide + 1 == i.length),
              a && u.bounce
                ? ((u.backwards = !u.backwards),
                  (u.nextSlide = i.length - 2),
                  (u.currSlide = i.length - 1))
                : ((u.nextSlide = a ? 0 : u.nextSlide + 1),
                  (u.currSlide = a ? i.length - 1 : u.nextSlide - 1))));
        y &&
          u.pager &&
          u.updateActivePagerLink(u.pager, u.currSlide, u.activePagerClass);
      }
    }
    function s(n, t, i, u) {
      if (i.timeoutFn) {
        for (
          var f = i.timeoutFn.call(n, n, t, i, u);
          i.fx != 'none' && f - i.speed < 250;

        )
          f += i.speed;
        if ((r('calculated timeout: ' + f + '; speed: ' + i.speed), f !== !1))
          return f;
      }
      return i.timeout;
    }
    function e(t, i) {
      var u = i ? 1 : -1,
        r = t.elements,
        o = t.$cont[0],
        s = o.cycleTimeout,
        e;
      if ((s && (clearTimeout(s), (o.cycleTimeout = 0)), t.random && u < 0))
        t.randomIndex--,
          --t.randomIndex == -2
            ? (t.randomIndex = r.length - 2)
            : t.randomIndex == -1 && (t.randomIndex = r.length - 1),
          (t.nextSlide = t.randomMap[t.randomIndex]);
      else if (t.random) t.nextSlide = t.randomMap[t.randomIndex];
      else if (((t.nextSlide = t.currSlide + u), t.nextSlide < 0)) {
        if (t.nowrap) return !1;
        t.nextSlide = r.length - 1;
      } else if (t.nextSlide >= r.length) {
        if (t.nowrap) return !1;
        t.nextSlide = 0;
      }
      return (
        (e = t.onPrevNextEvent || t.prevNextClick),
        n.isFunction(e) && e(u > 0, t.nextSlide, r[t.nextSlide]),
        f(r, t, 1, i),
        !1
      );
    }
    function b(t, i) {
      var r = n(i.pager);
      n.each(t, function (u, f) {
        n.fn.cycle.createPagerAnchor(u, f, r, t, i);
      });
      i.updateActivePagerLink(i.pager, i.startingSlide, i.activePagerClass);
    }
    function h(t) {
      function i(n) {
        return (n = parseInt(n, 10).toString(16)), n.length < 2 ? '0' + n : n;
      }
      function u(t) {
        for (
          var r, u;
          t && t.nodeName.toLowerCase() != 'html';
          t = t.parentNode
        ) {
          if (((r = n.css(t, 'background-color')), r && r.indexOf('rgb') >= 0))
            return (u = r.match(/\d+/g)), '#' + i(u[0]) + i(u[1]) + i(u[2]);
          if (r && r != 'transparent') return r;
        }
        return '#ffffff';
      }
      r('applying clearType background-color hack');
      t.each(function () {
        n(this).css('background-color', u(this));
      });
    }
    var c = '3.0.3';
    n.expr[':'].paused = function (n) {
      return n.cyclePause;
    };
    n.fn.cycle = function (t, u) {
      var e = { s: this.selector, c: this.context };
      return this.length === 0 && t != 'stop'
        ? !n.isReady && e.s
          ? (i('DOM not ready, queuing slideshow'),
            n(function () {
              n(e.s, e.c).cycle(t, u);
            }),
            this)
          : (i(
              'terminating; zero elements found by selector' +
                (n.isReady ? '' : ' (DOM not ready)')
            ),
            this)
        : this.each(function () {
            var h = l(this, t, u),
              o,
              c;
            if (h !== !1) {
              h.updateActivePagerLink =
                h.updateActivePagerLink || n.fn.cycle.updateActivePagerLink;
              this.cycleTimeout && clearTimeout(this.cycleTimeout);
              this.cycleTimeout = this.cyclePause = 0;
              this.cycleStop = 0;
              var y = n(this),
                p = h.slideExpr ? n(h.slideExpr, this) : y.children(),
                a = p.get();
              if (a.length < 2) {
                i('terminating; too few slides: ' + a.length);
                return;
              }
              ((o = v(y, p, a, h, e)), o !== !1) &&
                ((c = o.continuous
                  ? 10
                  : s(a[o.currSlide], a[o.nextSlide], o, !o.backwards)),
                c &&
                  ((c += o.delay || 0),
                  c < 10 && (c = 10),
                  r('first timeout: ' + c),
                  (this.cycleTimeout = setTimeout(function () {
                    f(a, o, 0, !h.backwards);
                  }, c))));
            }
          });
    };
    n.fn.cycle.resetState = function (t, i) {
      i = i || t.fx;
      t.before = [];
      t.after = [];
      t.cssBefore = n.extend({}, t.original.cssBefore);
      t.cssAfter = n.extend({}, t.original.cssAfter);
      t.animIn = n.extend({}, t.original.animIn);
      t.animOut = n.extend({}, t.original.animOut);
      t.fxFn = null;
      n.each(t.original.before, function () {
        t.before.push(this);
      });
      n.each(t.original.after, function () {
        t.after.push(this);
      });
      var r = n.fn.cycle.transitions[i];
      n.isFunction(r) && r(t.$cont, n(t.elements), t);
    };
    n.fn.cycle.updateActivePagerLink = function (t, i, r) {
      n(t).each(function () {
        n(this).children().removeClass(r).eq(i).addClass(r);
      });
    };
    n.fn.cycle.next = function (n) {
      e(n, 1);
    };
    n.fn.cycle.prev = function (n) {
      e(n, 0);
    };
    n.fn.cycle.createPagerAnchor = function (t, i, e, o, s) {
      var c, h, a, v, l, y;
      (n.isFunction(s.pagerAnchorBuilder)
        ? ((c = s.pagerAnchorBuilder(t, i)),
          r('pagerAnchorBuilder(' + t + ', el) returned: ' + c))
        : (c = '<a href="#">' + (t + 1) + '</a>'),
      c) &&
        ((h = n(c)),
        h.parents('body').length === 0 &&
          ((a = []),
          e.length > 1
            ? (e.each(function () {
                var t = h.clone(!0);
                n(this).append(t);
                a.push(t[0]);
              }),
              (h = n(a)))
            : h.appendTo(e)),
        (s.pagerAnchors = s.pagerAnchors || []),
        s.pagerAnchors.push(h),
        (v = function (i) {
          var r, u, e;
          i.preventDefault();
          s.nextSlide = t;
          r = s.$cont[0];
          u = r.cycleTimeout;
          u && (clearTimeout(u), (r.cycleTimeout = 0));
          e = s.onPagerEvent || s.pagerClick;
          n.isFunction(e) && e(s.nextSlide, o[s.nextSlide]);
          f(o, s, 1, s.currSlide < t);
        }),
        /mouseenter|mouseover/i.test(s.pagerEvent)
          ? h.hover(v, function () {})
          : h.bind(s.pagerEvent, v),
        /^click/.test(s.pagerEvent) ||
          s.allowPagerClickBubble ||
          h.bind('click.cycle', function () {
            return !1;
          }),
        (l = s.$cont[0]),
        (y = !1),
        s.pauseOnPagerHover &&
          h.hover(
            function () {
              y = !0;
              l.cyclePause++;
              u(l, !0, !0);
            },
            function () {
              y && l.cyclePause--;
              u(l, !0, !0);
            }
          ));
    };
    n.fn.cycle.hopsFromLast = function (n, t) {
      var i = n.lastSlide,
        r = n.currSlide;
      return t
        ? r > i
          ? r - i
          : n.slideCount - i
        : r < i
        ? i - r
        : i + n.slideCount - r;
    };
    n.fn.cycle.commonReset = function (t, i, r, u, f, e) {
      n(r.elements).not(t).hide();
      typeof r.cssBefore.opacity == 'undefined' && (r.cssBefore.opacity = 1);
      r.cssBefore.display = 'block';
      r.slideResize &&
        u !== !1 &&
        i.cycleW > 0 &&
        (r.cssBefore.width = i.cycleW);
      r.slideResize &&
        f !== !1 &&
        i.cycleH > 0 &&
        (r.cssBefore.height = i.cycleH);
      r.cssAfter = r.cssAfter || {};
      r.cssAfter.display = 'none';
      n(t).css('zIndex', r.slideCount + (e === !0 ? 1 : 0));
      n(i).css('zIndex', r.slideCount + (e === !0 ? 0 : 1));
    };
    n.fn.cycle.custom = function (t, i, r, u, f, e) {
      var h = n(t),
        c = n(i),
        l = r.speedIn,
        o = r.speedOut,
        a = r.easeIn,
        v = r.easeOut,
        y = r.animInDelay,
        p = r.animOutDelay,
        s;
      c.css(r.cssBefore);
      e && ((l = typeof e == 'number' ? (o = e) : (o = 1)), (a = v = null));
      s = function () {
        c.delay(y).animate(r.animIn, l, a, function () {
          u();
        });
      };
      h.delay(p).animate(r.animOut, o, v, function () {
        h.css(r.cssAfter);
        r.sync || s();
      });
      r.sync && s();
    };
    n.fn.cycle.transitions = {
      fade: function (t, i, r) {
        i.not(':eq(' + r.currSlide + ')').css('opacity', 0);
        r.before.push(function (t, i, r) {
          n.fn.cycle.commonReset(t, i, r);
          r.cssBefore.opacity = 0;
        });
        r.animIn = { opacity: 1 };
        r.animOut = { opacity: 0 };
        r.cssBefore = { top: 0, left: 0 };
      },
    };
    n.fn.cycle.ver = function () {
      return c;
    };
    n.fn.cycle.defaults = {
      activePagerClass: 'activeSlide',
      after: null,
      allowPagerClickBubble: !1,
      animIn: null,
      animInDelay: 0,
      animOut: null,
      animOutDelay: 0,
      aspect: !1,
      autostop: 0,
      autostopCount: 0,
      backwards: !1,
      before: null,
      center: null,
      cleartype: !n.support.opacity,
      cleartypeNoBg: !1,
      containerResize: 1,
      containerResizeHeight: 0,
      continuous: 0,
      cssAfter: null,
      cssBefore: null,
      delay: 0,
      easeIn: null,
      easeOut: null,
      easing: null,
      end: null,
      fastOnEvent: 0,
      fit: 0,
      fx: 'fade',
      fxFn: null,
      height: 'auto',
      manualTrump: !0,
      metaAttr: 'cycle',
      next: null,
      nowrap: 0,
      onPagerEvent: null,
      onPrevNextEvent: null,
      pager: null,
      pagerAnchorBuilder: null,
      pagerEvent: 'click.cycle',
      pause: 0,
      pauseOnPagerHover: 0,
      prev: null,
      prevNextEvent: 'click.cycle',
      random: 0,
      randomizeEffects: 1,
      requeueOnImageNotLoaded: !0,
      requeueTimeout: 250,
      rev: 0,
      shuffle: null,
      skipInitializationCallbacks: !1,
      slideExpr: null,
      slideResize: 1,
      speed: 1e3,
      speedIn: null,
      speedOut: null,
      startingSlide: t,
      sync: 1,
      timeout: 4e3,
      timeoutFn: null,
      updateActivePagerLink: null,
      width: null,
    };
  })(jQuery),
  (function (n) {
    'use strict';
    n.fn.cycle.transitions.none = function (t, i, r) {
      r.fxFn = function (t, i, r, u) {
        n(i).show();
        n(t).hide();
        u();
      };
    };
    n.fn.cycle.transitions.fadeout = function (t, i, r) {
      i.not(':eq(' + r.currSlide + ')').css({ display: 'block', opacity: 1 });
      r.before.push(function (t, i, r, u, f, e) {
        n(t).css('zIndex', r.slideCount + (e !== !0 ? 1 : 0));
        n(i).css('zIndex', r.slideCount + (e !== !0 ? 0 : 1));
      });
      r.animIn.opacity = 1;
      r.animOut.opacity = 0;
      r.cssBefore.opacity = 1;
      r.cssBefore.display = 'block';
      r.cssAfter.zIndex = 0;
    };
    n.fn.cycle.transitions.scrollUp = function (t, i, r) {
      t.css('overflow', 'hidden');
      r.before.push(n.fn.cycle.commonReset);
      var u = t.height();
      r.cssBefore.top = u;
      r.cssBefore.left = 0;
      r.cssFirst.top = 0;
      r.animIn.top = 0;
      r.animOut.top = -u;
    };
    n.fn.cycle.transitions.scrollDown = function (t, i, r) {
      t.css('overflow', 'hidden');
      r.before.push(n.fn.cycle.commonReset);
      var u = t.height();
      r.cssFirst.top = 0;
      r.cssBefore.top = -u;
      r.cssBefore.left = 0;
      r.animIn.top = 0;
      r.animOut.top = u;
    };
    n.fn.cycle.transitions.scrollLeft = function (t, i, r) {
      t.css('overflow', 'hidden');
      r.before.push(n.fn.cycle.commonReset);
      var u = t.width();
      r.cssFirst.left = 0;
      r.cssBefore.left = u;
      r.cssBefore.top = 0;
      r.animIn.left = 0;
      r.animOut.left = 0 - u;
    };
    n.fn.cycle.transitions.scrollRight = function (t, i, r) {
      t.css('overflow', 'hidden');
      r.before.push(n.fn.cycle.commonReset);
      var u = t.width();
      r.cssFirst.left = 0;
      r.cssBefore.left = -u;
      r.cssBefore.top = 0;
      r.animIn.left = 0;
      r.animOut.left = u;
    };
    n.fn.cycle.transitions.scrollHorz = function (t, i, r) {
      t.css('overflow', 'hidden').width();
      r.before.push(function (t, i, r, u) {
        r.rev && (u = !u);
        n.fn.cycle.commonReset(t, i, r);
        r.cssBefore.left = u ? i.cycleW - 1 : 1 - i.cycleW;
        r.animOut.left = u ? -t.cycleW : t.cycleW;
      });
      r.cssFirst.left = 0;
      r.cssBefore.top = 0;
      r.animIn.left = 0;
      r.animOut.top = 0;
    };
    n.fn.cycle.transitions.scrollVert = function (t, i, r) {
      t.css('overflow', 'hidden');
      r.before.push(function (t, i, r, u) {
        r.rev && (u = !u);
        n.fn.cycle.commonReset(t, i, r);
        r.cssBefore.top = u ? 1 - i.cycleH : i.cycleH - 1;
        r.animOut.top = u ? t.cycleH : -t.cycleH;
      });
      r.cssFirst.top = 0;
      r.cssBefore.left = 0;
      r.animIn.top = 0;
      r.animOut.left = 0;
    };
    n.fn.cycle.transitions.slideX = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n(r.elements).not(t).hide();
        n.fn.cycle.commonReset(t, i, r, !1, !0);
        r.animIn.width = i.cycleW;
      });
      r.cssBefore.left = 0;
      r.cssBefore.top = 0;
      r.cssBefore.width = 0;
      r.animIn.width = 'show';
      r.animOut.width = 0;
    };
    n.fn.cycle.transitions.slideY = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n(r.elements).not(t).hide();
        n.fn.cycle.commonReset(t, i, r, !0, !1);
        r.animIn.height = i.cycleH;
      });
      r.cssBefore.left = 0;
      r.cssBefore.top = 0;
      r.cssBefore.height = 0;
      r.animIn.height = 'show';
      r.animOut.height = 0;
    };
    n.fn.cycle.transitions.shuffle = function (t, i, r) {
      var u,
        f = t.css('overflow', 'visible').width();
      for (
        i.css({ left: 0, top: 0 }),
          r.before.push(function (t, i, r) {
            n.fn.cycle.commonReset(t, i, r, !0, !0, !0);
          }),
          r.speedAdjusted || ((r.speed = r.speed / 2), (r.speedAdjusted = !0)),
          r.random = 0,
          r.shuffle = r.shuffle || { left: -f, top: 15 },
          r.els = [],
          u = 0;
        u < i.length;
        u++
      )
        r.els.push(i[u]);
      for (u = 0; u < r.currSlide; u++) r.els.push(r.els.shift());
      r.fxFn = function (t, i, r, u, f) {
        var e, o;
        r.rev && (f = !f);
        e = f ? n(t) : n(i);
        n(i).css(r.cssBefore);
        o = r.slideCount;
        e.animate(r.shuffle, r.speedIn, r.easeIn, function () {
          for (
            var i, s, c, l = n.fn.cycle.hopsFromLast(r, f), h = 0;
            h < l;
            h++
          )
            f ? r.els.push(r.els.shift()) : r.els.unshift(r.els.pop());
          if (f)
            for (i = 0, s = r.els.length; i < s; i++)
              n(r.els[i]).css('z-index', s - i + o);
          else
            (c = n(t).css('z-index')),
              e.css('z-index', parseInt(c, 10) + 1 + o);
          e.animate({ left: 0, top: 0 }, r.speedOut, r.easeOut, function () {
            n(f ? this : t).hide();
            u && u();
          });
        });
      };
      n.extend(r.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
    };
    n.fn.cycle.transitions.turnUp = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !0, !1);
        r.cssBefore.top = i.cycleH;
        r.animIn.height = i.cycleH;
        r.animOut.width = i.cycleW;
      });
      r.cssFirst.top = 0;
      r.cssBefore.left = 0;
      r.cssBefore.height = 0;
      r.animIn.top = 0;
      r.animOut.height = 0;
    };
    n.fn.cycle.transitions.turnDown = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !0, !1);
        r.animIn.height = i.cycleH;
        r.animOut.top = t.cycleH;
      });
      r.cssFirst.top = 0;
      r.cssBefore.left = 0;
      r.cssBefore.top = 0;
      r.cssBefore.height = 0;
      r.animOut.height = 0;
    };
    n.fn.cycle.transitions.turnLeft = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !1, !0);
        r.cssBefore.left = i.cycleW;
        r.animIn.width = i.cycleW;
      });
      r.cssBefore.top = 0;
      r.cssBefore.width = 0;
      r.animIn.left = 0;
      r.animOut.width = 0;
    };
    n.fn.cycle.transitions.turnRight = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !1, !0);
        r.animIn.width = i.cycleW;
        r.animOut.left = t.cycleW;
      });
      n.extend(r.cssBefore, { top: 0, left: 0, width: 0 });
      r.animIn.left = 0;
      r.animOut.width = 0;
    };
    n.fn.cycle.transitions.zoom = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !1, !1, !0);
        r.cssBefore.top = i.cycleH / 2;
        r.cssBefore.left = i.cycleW / 2;
        n.extend(r.animIn, {
          top: 0,
          left: 0,
          width: i.cycleW,
          height: i.cycleH,
        });
        n.extend(r.animOut, {
          width: 0,
          height: 0,
          top: t.cycleH / 2,
          left: t.cycleW / 2,
        });
      });
      r.cssFirst.top = 0;
      r.cssFirst.left = 0;
      r.cssBefore.width = 0;
      r.cssBefore.height = 0;
    };
    n.fn.cycle.transitions.fadeZoom = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !1, !1);
        r.cssBefore.left = i.cycleW / 2;
        r.cssBefore.top = i.cycleH / 2;
        n.extend(r.animIn, {
          top: 0,
          left: 0,
          width: i.cycleW,
          height: i.cycleH,
        });
      });
      r.cssBefore.width = 0;
      r.cssBefore.height = 0;
      r.animOut.opacity = 0;
    };
    n.fn.cycle.transitions.blindX = function (t, i, r) {
      var u = t.css('overflow', 'hidden').width();
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r);
        r.animIn.width = i.cycleW;
        r.animOut.left = t.cycleW;
      });
      r.cssBefore.left = u;
      r.cssBefore.top = 0;
      r.animIn.left = 0;
      r.animOut.left = u;
    };
    n.fn.cycle.transitions.blindY = function (t, i, r) {
      var u = t.css('overflow', 'hidden').height();
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r);
        r.animIn.height = i.cycleH;
        r.animOut.top = t.cycleH;
      });
      r.cssBefore.top = u;
      r.cssBefore.left = 0;
      r.animIn.top = 0;
      r.animOut.top = u;
    };
    n.fn.cycle.transitions.blindZ = function (t, i, r) {
      var u = t.css('overflow', 'hidden').height(),
        f = t.width();
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r);
        r.animIn.height = i.cycleH;
        r.animOut.top = t.cycleH;
      });
      r.cssBefore.top = u;
      r.cssBefore.left = f;
      r.animIn.top = 0;
      r.animIn.left = 0;
      r.animOut.top = u;
      r.animOut.left = f;
    };
    n.fn.cycle.transitions.growX = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !1, !0);
        r.cssBefore.left = this.cycleW / 2;
        r.animIn.left = 0;
        r.animIn.width = this.cycleW;
        r.animOut.left = 0;
      });
      r.cssBefore.top = 0;
      r.cssBefore.width = 0;
    };
    n.fn.cycle.transitions.growY = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !0, !1);
        r.cssBefore.top = this.cycleH / 2;
        r.animIn.top = 0;
        r.animIn.height = this.cycleH;
        r.animOut.top = 0;
      });
      r.cssBefore.height = 0;
      r.cssBefore.left = 0;
    };
    n.fn.cycle.transitions.curtainX = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !1, !0, !0);
        r.cssBefore.left = i.cycleW / 2;
        r.animIn.left = 0;
        r.animIn.width = this.cycleW;
        r.animOut.left = t.cycleW / 2;
        r.animOut.width = 0;
      });
      r.cssBefore.top = 0;
      r.cssBefore.width = 0;
    };
    n.fn.cycle.transitions.curtainY = function (t, i, r) {
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !0, !1, !0);
        r.cssBefore.top = i.cycleH / 2;
        r.animIn.top = 0;
        r.animIn.height = i.cycleH;
        r.animOut.top = t.cycleH / 2;
        r.animOut.height = 0;
      });
      r.cssBefore.height = 0;
      r.cssBefore.left = 0;
    };
    n.fn.cycle.transitions.cover = function (t, i, r) {
      var u = r.direction || 'left',
        f = t.css('overflow', 'hidden').width(),
        e = t.height();
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r);
        r.cssAfter.display = '';
        u == 'right'
          ? (r.cssBefore.left = -f)
          : u == 'up'
          ? (r.cssBefore.top = e)
          : u == 'down'
          ? (r.cssBefore.top = -e)
          : (r.cssBefore.left = f);
      });
      r.animIn.left = 0;
      r.animIn.top = 0;
      r.cssBefore.top = 0;
      r.cssBefore.left = 0;
    };
    n.fn.cycle.transitions.uncover = function (t, i, r) {
      var u = r.direction || 'left',
        f = t.css('overflow', 'hidden').width(),
        e = t.height();
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !0, !0, !0);
        u == 'right'
          ? (r.animOut.left = f)
          : u == 'up'
          ? (r.animOut.top = -e)
          : u == 'down'
          ? (r.animOut.top = e)
          : (r.animOut.left = -f);
      });
      r.animIn.left = 0;
      r.animIn.top = 0;
      r.cssBefore.top = 0;
      r.cssBefore.left = 0;
    };
    n.fn.cycle.transitions.toss = function (t, i, r) {
      var u = t.css('overflow', 'visible').width(),
        f = t.height();
      r.before.push(function (t, i, r) {
        n.fn.cycle.commonReset(t, i, r, !0, !0, !0);
        r.animOut.left || r.animOut.top
          ? (r.animOut.opacity = 0)
          : n.extend(r.animOut, { left: u * 2, top: -f / 2, opacity: 0 });
      });
      r.cssBefore.left = 0;
      r.cssBefore.top = 0;
      r.animIn.left = 0;
    };
    n.fn.cycle.transitions.wipe = function (t, i, r) {
      var u = t.css('overflow', 'hidden').width(),
        f = t.height(),
        e,
        s,
        h;
      r.cssBefore = r.cssBefore || {};
      r.clip &&
        (/l2r/.test(r.clip)
          ? (e = 'rect(0px 0px ' + f + 'px 0px)')
          : /r2l/.test(r.clip)
          ? (e = 'rect(0px ' + u + 'px ' + f + 'px ' + u + 'px)')
          : /t2b/.test(r.clip)
          ? (e = 'rect(0px ' + u + 'px 0px 0px)')
          : /b2t/.test(r.clip)
          ? (e = 'rect(' + f + 'px ' + u + 'px ' + f + 'px 0px)')
          : /zoom/.test(r.clip) &&
            ((s = parseInt(f / 2, 10)),
            (h = parseInt(u / 2, 10)),
            (e = 'rect(' + s + 'px ' + h + 'px ' + s + 'px ' + h + 'px)')));
      r.cssBefore.clip = r.cssBefore.clip || e || 'rect(0px 0px 0px 0px)';
      var o = r.cssBefore.clip.match(/(\d+)/g),
        c = parseInt(o[0], 10),
        l = parseInt(o[1], 10),
        a = parseInt(o[2], 10),
        v = parseInt(o[3], 10);
      r.before.push(function (t, i, r) {
        var s, h, e, o;
        t != i &&
          ((s = n(t)),
          (h = n(i)),
          n.fn.cycle.commonReset(t, i, r, !0, !0, !1),
          (r.cssAfter.display = 'block'),
          (e = 1),
          (o = parseInt(r.speedIn / 13, 10) - 1),
          (function f() {
            var n = c ? c - parseInt(e * (c / o), 10) : 0,
              t = v ? v - parseInt(e * (v / o), 10) : 0,
              i = a < f ? a + parseInt(e * ((f - a) / o || 1), 10) : f,
              r = l < u ? l + parseInt(e * ((u - l) / o || 1), 10) : u;
            h.css({
              clip: 'rect(' + n + 'px ' + r + 'px ' + i + 'px ' + t + 'px)',
            });
            e++ <= o ? setTimeout(f, 13) : s.css('display', 'none');
          })());
      });
      n.extend(r.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
      r.animIn = { left: 0 };
      r.animOut = { left: 0 };
    };
  })(jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
  def: 'easeOutQuad',
  swing: function (n, t, i, r, u) {
    return jQuery.easing[jQuery.easing.def](n, t, i, r, u);
  },
  easeInQuad: function (n, t, i, r, u) {
    return r * (t /= u) * t + i;
  },
  easeOutQuad: function (n, t, i, r, u) {
    return -r * (t /= u) * (t - 2) + i;
  },
  easeInOutQuad: function (n, t, i, r, u) {
    return (t /= u / 2) < 1
      ? (r / 2) * t * t + i
      : (-r / 2) * (--t * (t - 2) - 1) + i;
  },
  easeInCubic: function (n, t, i, r, u) {
    return r * (t /= u) * t * t + i;
  },
  easeOutCubic: function (n, t, i, r, u) {
    return r * ((t = t / u - 1) * t * t + 1) + i;
  },
  easeInOutCubic: function (n, t, i, r, u) {
    return (t /= u / 2) < 1
      ? (r / 2) * t * t * t + i
      : (r / 2) * ((t -= 2) * t * t + 2) + i;
  },
  easeInQuart: function (n, t, i, r, u) {
    return r * (t /= u) * t * t * t + i;
  },
  easeOutQuart: function (n, t, i, r, u) {
    return -r * ((t = t / u - 1) * t * t * t - 1) + i;
  },
  easeInOutQuart: function (n, t, i, r, u) {
    return (t /= u / 2) < 1
      ? (r / 2) * t * t * t * t + i
      : (-r / 2) * ((t -= 2) * t * t * t - 2) + i;
  },
  easeInQuint: function (n, t, i, r, u) {
    return r * (t /= u) * t * t * t * t + i;
  },
  easeOutQuint: function (n, t, i, r, u) {
    return r * ((t = t / u - 1) * t * t * t * t + 1) + i;
  },
  easeInOutQuint: function (n, t, i, r, u) {
    return (t /= u / 2) < 1
      ? (r / 2) * t * t * t * t * t + i
      : (r / 2) * ((t -= 2) * t * t * t * t + 2) + i;
  },
  easeInSine: function (n, t, i, r, u) {
    return -r * Math.cos((t / u) * (Math.PI / 2)) + r + i;
  },
  easeOutSine: function (n, t, i, r, u) {
    return r * Math.sin((t / u) * (Math.PI / 2)) + i;
  },
  easeInOutSine: function (n, t, i, r, u) {
    return (-r / 2) * (Math.cos((Math.PI * t) / u) - 1) + i;
  },
  easeInExpo: function (n, t, i, r, u) {
    return t == 0 ? i : r * Math.pow(2, 10 * (t / u - 1)) + i;
  },
  easeOutExpo: function (n, t, i, r, u) {
    return t == u ? i + r : r * (-Math.pow(2, (-10 * t) / u) + 1) + i;
  },
  easeInOutExpo: function (n, t, i, r, u) {
    return t == 0
      ? i
      : t == u
      ? i + r
      : (t /= u / 2) < 1
      ? (r / 2) * Math.pow(2, 10 * (t - 1)) + i
      : (r / 2) * (-Math.pow(2, -10 * --t) + 2) + i;
  },
  easeInCirc: function (n, t, i, r, u) {
    return -r * (Math.sqrt(1 - (t /= u) * t) - 1) + i;
  },
  easeOutCirc: function (n, t, i, r, u) {
    return r * Math.sqrt(1 - (t = t / u - 1) * t) + i;
  },
  easeInOutCirc: function (n, t, i, r, u) {
    return (t /= u / 2) < 1
      ? (-r / 2) * (Math.sqrt(1 - t * t) - 1) + i
      : (r / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + i;
  },
  easeInElastic: function (n, t, i, r, u) {
    var o = 1.70158,
      f = 0,
      e = r;
    return t == 0
      ? i
      : (t /= u) == 1
      ? i + r
      : (f || (f = u * 0.3),
        e < Math.abs(r)
          ? ((e = r), (o = f / 4))
          : (o = (f / (2 * Math.PI)) * Math.asin(r / e)),
        -(
          e *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * u - o) * 2 * Math.PI) / f)
        ) + i);
  },
  easeOutElastic: function (n, t, i, r, u) {
    var o = 1.70158,
      f = 0,
      e = r;
    return t == 0
      ? i
      : (t /= u) == 1
      ? i + r
      : (f || (f = u * 0.3),
        e < Math.abs(r)
          ? ((e = r), (o = f / 4))
          : (o = (f / (2 * Math.PI)) * Math.asin(r / e)),
        e * Math.pow(2, -10 * t) * Math.sin(((t * u - o) * 2 * Math.PI) / f) +
          r +
          i);
  },
  easeInOutElastic: function (n, t, i, r, u) {
    var o = 1.70158,
      f = 0,
      e = r;
    return t == 0
      ? i
      : (t /= u / 2) == 2
      ? i + r
      : (f || (f = u * 0.3 * 1.5),
        e < Math.abs(r)
          ? ((e = r), (o = f / 4))
          : (o = (f / (2 * Math.PI)) * Math.asin(r / e)),
        t < 1)
      ? -0.5 *
          e *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * u - o) * 2 * Math.PI) / f) +
        i
      : e *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * u - o) * 2 * Math.PI) / f) *
          0.5 +
        r +
        i;
  },
  easeInBack: function (n, t, i, r, u, f) {
    return (
      f == undefined && (f = 1.70158), r * (t /= u) * t * ((f + 1) * t - f) + i
    );
  },
  easeOutBack: function (n, t, i, r, u, f) {
    return (
      f == undefined && (f = 1.70158),
      r * ((t = t / u - 1) * t * ((f + 1) * t + f) + 1) + i
    );
  },
  easeInOutBack: function (n, t, i, r, u, f) {
    return (f == undefined && (f = 1.70158), (t /= u / 2) < 1)
      ? (r / 2) * t * t * (((f *= 1.525) + 1) * t - f) + i
      : (r / 2) * ((t -= 2) * t * (((f *= 1.525) + 1) * t + f) + 2) + i;
  },
  easeInBounce: function (n, t, i, r, u) {
    return r - jQuery.easing.easeOutBounce(n, u - t, 0, r, u) + i;
  },
  easeOutBounce: function (n, t, i, r, u) {
    return (t /= u) < 1 / 2.75
      ? r * 7.5625 * t * t + i
      : t < 2 / 2.75
      ? r * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + i
      : t < 2.5 / 2.75
      ? r * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + i
      : r * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + i;
  },
  easeInOutBounce: function (n, t, i, r, u) {
    return t < u / 2
      ? jQuery.easing.easeInBounce(n, t * 2, 0, r, u) * 0.5 + i
      : jQuery.easing.easeOutBounce(n, t * 2 - u, 0, r, u) * 0.5 + r * 0.5 + i;
  },
}),
  (function (n, t, i, r) {
    'use strict';
    function c(n, t) {
      var r = [],
        o = 0,
        u,
        s,
        f;
      (n && n.isDefaultPrevented()) ||
        (n.preventDefault(),
        (t = t || {}),
        n && n.data && (t = e(n.data.options, t)),
        (u = t.$target || i(n.currentTarget).trigger('blur')),
        (f = i.fancybox.getInstance()),
        f && f.$trigger && f.$trigger.is(u)) ||
        (t.selector
          ? (r = i(t.selector))
          : ((s = u.attr('data-fancybox') || ''),
            s
              ? ((r = n.data ? n.data.items : []),
                (r = r.length
                  ? r.filter('[data-fancybox="' + s + '"]')
                  : i('[data-fancybox="' + s + '"]')))
              : (r = [u])),
        (o = i(r).index(u)),
        o < 0 && (o = 0),
        (f = i.fancybox.open(r, t, o)),
        (f.$trigger = u));
    }
    if (((n.console = n.console || { info: function (n) {} }), i)) {
      if (i.fn.fancybox) {
        console.info('fancyBox already initialized');
        return;
      }
      var a = {
          closeExisting: !1,
          loop: !1,
          gutter: 50,
          keyboard: !0,
          arrows: !0,
          infobar: !0,
          smallBtn: 'true',
          toolbar: 'true',
          buttons: ['thumbs', 'close'],
          idleTime: 3,
          protect: !0,
          modal: !1,
          image: { preload: !1 },
          ajax: { settings: { data: { fancybox: !0 } } },
          iframe: {
            tpl:
              '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
            preload: !0,
            css: {},
            attr: { scrolling: 'auto' },
          },
          video: {
            tpl:
              '<video class="fancybox-video" controls controlsList="nodownload"><source src="{{src}}" type="{{format}}" />Your browser doesn\'t support HTML5 video</video>',
            format: '',
            autoStart: !0,
          },
          defaultType: 'image',
          animationEffect: 'zoom',
          animationDuration: 366,
          zoomOpacity: 'auto',
          transitionEffect: 'fade',
          transitionDuration: 366,
          slideClass: '',
          baseClass: '',
          baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
          spinnerTpl: '<div class="fancybox-loading"></div>',
          errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
          btnTpl: {
            download:
              '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
            zoom:
              '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
            close:
              '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
            arrowLeft:
              '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
            arrowRight:
              '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
            smallBtn:
              '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
          },
          parentEl: 'body',
          hideScrollbar: !0,
          autoFocus: !0,
          backFocus: !0,
          trapFocus: !0,
          fullScreen: { autoStart: !1 },
          touch: { vertical: !0, momentum: !0 },
          hash: null,
          media: {},
          slideShow: { autoStart: !1, speed: 3e3 },
          thumbs: {
            autoStart: !0,
            hideOnClose: !0,
            parentEl: '.fancybox-container',
            axis: 'x',
          },
          wheel: 'auto',
          onInit: i.noop,
          beforeLoad: i.noop,
          afterLoad: i.noop,
          beforeShow: i.noop,
          afterShow: i.noop,
          beforeClose: i.noop,
          afterClose: i.noop,
          onActivate: i.noop,
          onDeactivate: i.noop,
          clickContent: function (n, t) {
            return n.type === 'image' ? 'zoom' : !1;
          },
          clickSlide: 'close',
          clickOutside: 'close',
          dblclickContent: !1,
          dblclickSlide: !1,
          dblclickOutside: !1,
          mobile: {
            toolbar: 'auto',
            idleTime: !1,
            clickContent: function (n, t) {
              return n.type === 'image' ? 'toggleControls' : !1;
            },
            dblclickContent: function (n, t) {
              return n.type === 'image' ? 'zoom' : !1;
            },
            dblclickSlide: function (n, t) {
              return n.type === 'image' ? 'zoom' : !1;
            },
          },
          lang: 'en',
          i18n: {
            en: {
              CLOSE: 'Close',
              NEXT: 'Next',
              PREV: 'Previous',
              ERROR:
                'The requested content cannot be loaded. <br/> Please try again later.',
              PLAY_START: 'Start slideshow',
              PLAY_STOP: 'Pause slideshow',
              FULL_SCREEN: 'Full screen',
              THUMBS: 'Thumbnails',
              DOWNLOAD: 'Download',
              SHARE: 'Share',
              ZOOM: 'Zoom',
            },
            de: {
              CLOSE: 'Schliessen',
              NEXT: 'Weiter',
              PREV: 'Zur�ck',
              ERROR:
                'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp�ter nochmal.',
              PLAY_START: 'Diaschau starten',
              PLAY_STOP: 'Diaschau beenden',
              FULL_SCREEN: 'Vollbild',
              THUMBS: 'Vorschaubilder',
              DOWNLOAD: 'Herunterladen',
              SHARE: 'Teilen',
              ZOOM: 'Ma�stab',
            },
          },
        },
        o = i(n),
        u = i(t),
        v = 0,
        y = function (n) {
          return n && n.hasOwnProperty && n instanceof i;
        },
        l = (function () {
          return (
            n.requestAnimationFrame ||
            n.webkitRequestAnimationFrame ||
            n.mozRequestAnimationFrame ||
            n.oRequestAnimationFrame ||
            function (t) {
              return n.setTimeout(t, 1e3 / 60);
            }
          );
        })(),
        s = (function () {
          var u = t.createElement('fakeelement'),
            n,
            i = {
              transition: 'transitionend',
              OTransition: 'oTransitionEnd',
              MozTransition: 'transitionend',
              WebkitTransition: 'webkitTransitionEnd',
            };
          for (n in i) if (u.style[n] !== r) return i[n];
          return 'transitionend';
        })(),
        f = function (n) {
          return n && n.length && n[0].offsetHeight;
        },
        e = function (n, t) {
          var r = i.extend(!0, {}, n, t);
          return (
            i.each(t, function (n, t) {
              i.isArray(t) && (r[n] = t);
            }),
            r
          );
        },
        h = function (n, t, r) {
          var u = this;
          ((u.opts = e({ index: r }, i.fancybox.defaults)),
          i.isPlainObject(t) && (u.opts = e(u.opts, t)),
          i.fancybox.isMobile && (u.opts = e(u.opts, u.opts.mobile)),
          (u.id = u.opts.id || ++v),
          (u.currIndex = parseInt(u.opts.index, 10) || 0),
          (u.prevIndex = null),
          (u.prevPos = null),
          (u.currPos = 0),
          (u.firstRun = !0),
          (u.group = []),
          (u.slides = {}),
          u.addContent(n),
          u.group.length) && u.init();
        };
      i.extend(h.prototype, {
        init: function () {
          var u = this,
            c = u.group[u.currIndex],
            f = c.opts,
            o = i.fancybox.scrollbarWidth,
            e,
            s,
            h;
          f.closeExisting && i.fancybox.close(!0);
          i('body').addClass('fancybox-active');
          !i.fancybox.getInstance() &&
            f.hideScrollbar !== !1 &&
            !i.fancybox.isMobile &&
            t.body.scrollHeight > n.innerHeight &&
            (o === r &&
              ((e = i(
                '<div style="width:100px;height:100px;overflow:scroll;" />'
              ).appendTo('body')),
              (o = i.fancybox.scrollbarWidth =
                e[0].offsetWidth - e[0].clientWidth),
              e.remove()),
            i('head').append(
              '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
                o +
                'px; }</style>'
            ),
            i('body').addClass('compensate-for-scrollbar'));
          h = '';
          i.each(f.buttons, function (n, t) {
            h += f.btnTpl[t] || '';
          });
          s = i(
            u.translate(
              u,
              f.baseTpl
                .replace('{{buttons}}', h)
                .replace('{{arrows}}', f.btnTpl.arrowLeft + f.btnTpl.arrowRight)
            )
          )
            .attr('id', 'fancybox-container-' + u.id)
            .addClass(f.baseClass)
            .data('FancyBox', u)
            .appendTo(f.parentEl);
          u.$refs = { container: s };
          [
            'bg',
            'inner',
            'infobar',
            'toolbar',
            'stage',
            'caption',
            'navigation',
          ].forEach(function (n) {
            u.$refs[n] = s.find('.fancybox-' + n);
          });
          u.trigger('onInit');
          u.activate();
          u.jumpTo(u.currIndex);
        },
        translate: function (n, t) {
          var i = n.opts.i18n[n.opts.lang];
          return t.replace(/\{\{(\w+)\}\}/g, function (n, t) {
            var u = i[t];
            return u === r ? n : u;
          });
        },
        addContent: function (n) {
          var t = this,
            f = i.makeArray(n),
            u;
          i.each(f, function (n, u) {
            var f = {},
              o = {},
              c,
              s,
              a,
              h,
              l;
            i.isPlainObject(u)
              ? ((f = u), (o = u.opts || u))
              : i.type(u) === 'object' && i(u).length
              ? ((c = i(u)),
                (o = c.data() || {}),
                (o = i.extend(!0, {}, o, o.options)),
                (o.$orig = c),
                (f.src = t.opts.src || o.src || c.attr('href')),
                f.type || f.src || ((f.type = 'inline'), (f.src = u)))
              : (f = { type: 'html', src: u + '' });
            f.opts = i.extend(!0, {}, t.opts, o);
            i.isArray(o.buttons) && (f.opts.buttons = o.buttons);
            i.fancybox.isMobile &&
              f.opts.mobile &&
              (f.opts = e(f.opts, f.opts.mobile));
            s = f.type || f.opts.type;
            h = f.src || '';
            !s &&
              h &&
              ((a = h.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                ? ((s = 'video'),
                  f.opts.video.format ||
                    (f.opts.video.format =
                      'video/' + (a[1] === 'ogv' ? 'ogg' : a[1])))
                : h.match(
                    /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                  )
                ? (s = 'image')
                : h.match(/\.(pdf)((\?|#).*)?$/i)
                ? (s = 'iframe')
                : h.charAt(0) === '#' && (s = 'inline'));
            s ? (f.type = s) : t.trigger('objectNeedsType', f);
            f.contentType ||
              (f.contentType =
                i.inArray(f.type, ['html', 'inline', 'ajax']) > -1
                  ? 'html'
                  : f.type);
            f.index = t.group.length;
            f.opts.smallBtn == 'auto' &&
              (f.opts.smallBtn =
                i.inArray(f.type, ['html', 'inline', 'ajax']) > -1);
            f.opts.toolbar === 'auto' && (f.opts.toolbar = !f.opts.smallBtn);
            f.opts.$trigger &&
              f.index === t.opts.index &&
              ((f.opts.$thumb = f.opts.$trigger.find('img:first')),
              f.opts.$thumb.length && (f.opts.$orig = f.opts.$trigger));
            (f.opts.$thumb && f.opts.$thumb.length) ||
              !f.opts.$orig ||
              (f.opts.$thumb = f.opts.$orig.find('img:first'));
            i.type(f.opts.caption) === 'function' &&
              (f.opts.caption = f.opts.caption.apply(u, [t, f]));
            i.type(t.opts.caption) === 'function' &&
              (f.opts.caption = t.opts.caption.apply(u, [t, f]));
            f.opts.caption instanceof i ||
              (f.opts.caption =
                f.opts.caption === r ? '' : f.opts.caption + '');
            f.type === 'ajax' &&
              ((l = h.split(/\s+/, 2)),
              l.length > 1 &&
                ((f.src = l.shift()), (f.opts.filter = l.shift())));
            f.opts.modal &&
              (f.opts = i.extend(!0, f.opts, {
                infobar: 0,
                toolbar: 0,
                smallBtn: 0,
                keyboard: 0,
                slideShow: 0,
                fullScreen: 0,
                thumbs: 0,
                touch: 0,
                clickContent: !1,
                clickSlide: !1,
                clickOutside: !1,
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
              }));
            t.group.push(f);
          });
          Object.keys(t.slides).length &&
            (t.updateControls(),
            (u = t.Thumbs),
            u && u.isActive && (u.create(), u.focus()));
        },
        addEvents: function () {
          var t = this;
          t.removeEvents();
          t.$refs.container
            .on('click.fb-close', '[data-fancybox-close]', function (n) {
              n.stopPropagation();
              n.preventDefault();
              t.close(n);
            })
            .on(
              'touchstart.fb-prev click.fb-prev',
              '[data-fancybox-prev]',
              function (n) {
                n.stopPropagation();
                n.preventDefault();
                t.previous();
              }
            )
            .on(
              'touchstart.fb-next click.fb-next',
              '[data-fancybox-next]',
              function (n) {
                n.stopPropagation();
                n.preventDefault();
                t.next();
              }
            )
            .on('click.fb', '[data-fancybox-zoom]', function (n) {
              t[t.isScaledDown() ? 'scaleToActual' : 'scaleToFit']();
            });
          o.on('orientationchange.fb resize.fb', function (n) {
            n && n.originalEvent && n.originalEvent.type === 'resize'
              ? l(function () {
                  t.update();
                })
              : (t.current &&
                  t.current.type === 'iframe' &&
                  t.$refs.stage.hide(),
                setTimeout(
                  function () {
                    t.$refs.stage.show();
                    t.update();
                  },
                  i.fancybox.isMobile ? 600 : 250
                ));
          });
          u.on('keydown.fb', function (n) {
            var f = i.fancybox ? i.fancybox.getInstance() : null,
              u = f.current,
              r = n.keyCode || n.which;
            if (r == 9) {
              u.opts.trapFocus && t.focus(n);
              return;
            }
            if (
              u.opts.keyboard &&
              !n.ctrlKey &&
              !n.altKey &&
              !n.shiftKey &&
              !i(n.target).is('input') &&
              !i(n.target).is('textarea')
            ) {
              if (r === 8 || r === 27) {
                n.preventDefault();
                t.close(n);
                return;
              }
              if (r === 37 || r === 38) {
                n.preventDefault();
                t.previous();
                return;
              }
              if (r === 39 || r === 40) {
                n.preventDefault();
                t.next();
                return;
              }
              t.trigger('afterKeydown', n, r);
            }
          });
          if (t.group[t.currIndex].opts.idleTime) {
            t.idleSecondsCounter = 0;
            u.on(
              'mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle',
              function (n) {
                t.idleSecondsCounter = 0;
                t.isIdle && t.showControls();
                t.isIdle = !1;
              }
            );
            t.idleInterval = n.setInterval(function () {
              t.idleSecondsCounter++;
              t.idleSecondsCounter >= t.group[t.currIndex].opts.idleTime &&
                !t.isDragging &&
                ((t.isIdle = !0), (t.idleSecondsCounter = 0), t.hideControls());
            }, 1e3);
          }
        },
        removeEvents: function () {
          var t = this;
          o.off('orientationchange.fb resize.fb');
          u.off('keydown.fb .fb-idle');
          this.$refs.container.off('.fb-close .fb-prev .fb-next');
          t.idleInterval &&
            (n.clearInterval(t.idleInterval), (t.idleInterval = null));
        },
        previous: function (n) {
          return this.jumpTo(this.currPos - 1, n);
        },
        next: function (n) {
          return this.jumpTo(this.currPos + 1, n);
        },
        jumpTo: function (n, t) {
          var u = this,
            h = u.group.length,
            o,
            c,
            l,
            f,
            e,
            a,
            s;
          if (
            !u.isDragging &&
            !u.isClosing &&
            (!u.isAnimating || !u.firstRun)
          ) {
            if (
              ((n = parseInt(n, 10)),
              (l = u.current ? u.current.opts.loop : u.opts.loop),
              !l && (n < 0 || n >= h))
            )
              return !1;
            if (
              ((o = u.firstRun = !Object.keys(u.slides).length),
              !(h < 2) || o || !u.isDragging)
            ) {
              if (
                ((e = u.current),
                (u.prevIndex = u.currIndex),
                (u.prevPos = u.currPos),
                (f = u.createSlide(n)),
                h > 1 &&
                  ((l || f.index < h - 1) && u.createSlide(n + 1),
                  (l || f.index > 0) && u.createSlide(n - 1)),
                (u.current = f),
                (u.currIndex = f.index),
                (u.currPos = f.pos),
                u.trigger('beforeShow', o),
                u.updateControls(),
                (c = u.isMoved(f)),
                (f.forcedDuration = r),
                i.isNumeric(t)
                  ? (f.forcedDuration = t)
                  : (t =
                      f.opts[o ? 'animationDuration' : 'transitionDuration']),
                (t = parseInt(t, 10)),
                o)
              ) {
                f.opts.animationEffect &&
                  t &&
                  u.$refs.container.css('transition-duration', t + 'ms');
                u.$refs.container.addClass('fancybox-is-open');
                f.$slide.addClass('fancybox-slide--previous');
                u.loadSlide(f);
                f.$slide
                  .removeClass('fancybox-slide--previous')
                  .addClass('fancybox-slide--current');
                u.preload('image');
                u.$refs.container.trigger('focus');
                return;
              }
              (i.each(u.slides, function (n, t) {
                i.fancybox.stop(t.$slide, !0);
                t.$slide
                  .removeClass('fancybox-animated')
                  .removeClass(function (n, t) {
                    return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(' ');
                  });
              }),
              f.$slide
                .removeClass('fancybox-slide--next fancybox-slide--previous')
                .addClass('fancybox-slide--current'),
              c
                ? ((a = Math.round(f.$slide.width())),
                  i.each(u.slides, function (n, r) {
                    var e = r.pos - f.pos;
                    i.fancybox.animate(
                      r.$slide,
                      { top: 0, left: e * a + e * r.opts.gutter },
                      t,
                      function () {
                        r.$slide
                          .removeAttr('style')
                          .removeClass(
                            'fancybox-slide--next fancybox-slide--previous'
                          );
                        r.pos === u.currPos && u.complete();
                      }
                    );
                  }))
                : u.$refs.stage.children().removeAttr('style'),
              f.isLoaded ? u.revealContent(f) : u.loadSlide(f),
              u.preload('image'),
              e.pos !== f.pos) &&
                ((s =
                  'fancybox-slide--' + (e.pos > f.pos ? 'next' : 'previous')),
                e.$slide.removeClass(
                  'fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous'
                ),
                (e.isComplete = !1),
                t && (c || f.opts.transitionEffect)) &&
                (c
                  ? e.$slide.addClass(s)
                  : ((s =
                      'fancybox-animated ' +
                      s +
                      ' fancybox-fx-' +
                      f.opts.transitionEffect),
                    i.fancybox.animate(e.$slide, s, t, null, !1)));
            }
          }
        },
        createSlide: function (n) {
          var t = this,
            u,
            r;
          return (
            (r = n % t.group.length),
            (r = r < 0 ? t.group.length + r : r),
            !t.slides[n] &&
              t.group[r] &&
              ((u = i('<div class="fancybox-slide"></div>').appendTo(
                t.$refs.stage
              )),
              (t.slides[n] = i.extend(!0, {}, t.group[r], {
                pos: n,
                $slide: u,
                isLoaded: !1,
              })),
              t.updateSlide(t.slides[n])),
            t.slides[n]
          );
        },
        scaleToActual: function (n, t, u) {
          var e = this,
            f = e.current,
            y = f.$content,
            a = i.fancybox.getTranslate(f.$slide).width,
            v = i.fancybox.getTranslate(f.$slide).height,
            c = f.width,
            l = f.height,
            o,
            s,
            h,
            p,
            w;
          !e.isAnimating &&
            y &&
            f.type == 'image' &&
            f.isLoaded &&
            !f.hasError &&
            (i.fancybox.stop(y),
            (e.isAnimating = !0),
            (n = n === r ? a * 0.5 : n),
            (t = t === r ? v * 0.5 : t),
            (o = i.fancybox.getTranslate(y)),
            (o.top -= i.fancybox.getTranslate(f.$slide).top),
            (o.left -= i.fancybox.getTranslate(f.$slide).left),
            (p = c / o.width),
            (w = l / o.height),
            (s = a * 0.5 - c * 0.5),
            (h = v * 0.5 - l * 0.5),
            c > a &&
              ((s = o.left * p - (n * p - n)),
              s > 0 && (s = 0),
              s < a - c && (s = a - c)),
            l > v &&
              ((h = o.top * w - (t * w - t)),
              h > 0 && (h = 0),
              h < v - l && (h = v - l)),
            e.updateCursor(c, l),
            i.fancybox.animate(
              y,
              { top: h, left: s, scaleX: p, scaleY: w },
              u || 330,
              function () {
                e.isAnimating = !1;
              }
            ),
            e.SlideShow && e.SlideShow.isActive && e.SlideShow.stop());
        },
        scaleToFit: function (n) {
          var r = this,
            u = r.current,
            f = u.$content,
            t;
          !r.isAnimating &&
            f &&
            u.type == 'image' &&
            u.isLoaded &&
            !u.hasError &&
            (i.fancybox.stop(f),
            (r.isAnimating = !0),
            (t = r.getFitPos(u)),
            r.updateCursor(t.width, t.height),
            i.fancybox.animate(
              f,
              {
                top: t.top,
                left: t.left,
                scaleX: t.width / f.width(),
                scaleY: t.height / f.height(),
              },
              n || 330,
              function () {
                r.isAnimating = !1;
              }
            ));
        },
        getFitPos: function (n) {
          var l = this,
            u = n.$content,
            f = n.$slide,
            t = n.width || n.opts.width,
            r = n.height || n.opts.height,
            e,
            o,
            c,
            s,
            h = {};
          return !n.isLoaded || !u || !u.length
            ? !1
            : ((e = i.fancybox.getTranslate(l.$refs.stage).width),
              (o = i.fancybox.getTranslate(l.$refs.stage).height),
              (e -=
                parseFloat(f.css('paddingLeft')) +
                parseFloat(f.css('paddingRight')) +
                parseFloat(u.css('marginLeft')) +
                parseFloat(u.css('marginRight'))),
              (o -=
                parseFloat(f.css('paddingTop')) +
                parseFloat(f.css('paddingBottom')) +
                parseFloat(u.css('marginTop')) +
                parseFloat(u.css('marginBottom'))),
              (t && r) || ((t = e), (r = o)),
              (c = Math.min(1, e / t, o / r)),
              (t = Math.floor(c * t)),
              (r = Math.floor(c * r)),
              n.type === 'image'
                ? ((h.top =
                    Math.floor((o - r) * 0.5) +
                    parseFloat(f.css('paddingTop'))),
                  (h.left =
                    Math.floor((e - t) * 0.5) +
                    parseFloat(f.css('paddingLeft'))))
                : n.contentType === 'video' &&
                  ((s =
                    n.opts.width && n.opts.height
                      ? t / r
                      : n.opts.ratio || 16 / 9),
                  r > t / s ? (r = t / s) : t > r * s && (t = r * s)),
              (h.width = t),
              (h.height = r),
              h);
        },
        update: function () {
          var n = this;
          i.each(n.slides, function (t, i) {
            n.updateSlide(i);
          });
        },
        updateSlide: function (n) {
          var t = this,
            u = n && n.$content,
            f = n.width || n.opts.width,
            e = n.height || n.opts.height,
            r = n.$slide;
          u &&
            (f || e || n.contentType === 'video') &&
            !n.hasError &&
            (i.fancybox.stop(u),
            i.fancybox.setTranslate(u, t.getFitPos(n)),
            n.pos === t.currPos && ((t.isAnimating = !1), t.updateCursor()));
          r.length &&
            (r.trigger('refresh'),
            t.$refs.toolbar.toggleClass(
              'compensate-for-scrollbar',
              r.get(0).scrollHeight > r.get(0).clientHeight
            ));
          t.trigger('onUpdate', n);
        },
        centerSlide: function (n, t) {
          var f = this,
            e,
            u;
          f.current &&
            ((e = Math.round(n.$slide.width())),
            (u = n.pos - f.current.pos),
            i.fancybox.animate(
              n.$slide,
              { top: 0, left: u * e + u * n.opts.gutter, opacity: 1 },
              t === r ? 0 : t,
              null,
              !1
            ));
        },
        isMoved: function (n) {
          var t = n || this.current,
            r = i.fancybox.getTranslate(t.$slide);
          return (
            (r.left !== 0 || r.top !== 0) &&
            !t.$slide.hasClass('fancybox-animated')
          );
        },
        updateCursor: function (n, t) {
          var u = this,
            r = u.current,
            f = u.$refs.container.removeClass(
              'fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan'
            ),
            e;
          r &&
            !u.isClosing &&
            ((e = u.isZoomable()),
            f.toggleClass('fancybox-is-zoomable', e),
            i('[data-fancybox-zoom]').prop('disabled', !e),
            u.canPan(n, t)
              ? f.addClass('fancybox-can-pan')
              : e &&
                (r.opts.clickContent === 'zoom' ||
                  (i.isFunction(r.opts.clickContent) &&
                    r.opts.clickContent(r) == 'zoom'))
              ? f.addClass('fancybox-can-zoomIn')
              : r.opts.touch &&
                (r.opts.touch.vertical || u.group.length > 1) &&
                r.contentType !== 'video' &&
                f.addClass('fancybox-can-swipe'));
        },
        isZoomable: function () {
          var t = this,
            n = t.current,
            i;
          return n &&
            !t.isClosing &&
            n.type === 'image' &&
            !n.hasError &&
            (!n.isLoaded ||
              ((i = t.getFitPos(n)), n.width > i.width || n.height > i.height))
            ? !0
            : !1;
        },
        isScaledDown: function (n, t) {
          var o = this,
            u = !1,
            f = o.current,
            e = f.$content;
          return (
            n !== r && t !== r
              ? (u = n < f.width && t < f.height)
              : e &&
                ((u = i.fancybox.getTranslate(e)),
                (u = u.width < f.width && u.height < f.height)),
            u
          );
        },
        canPan: function (n, t) {
          var o = this,
            u = !1,
            f = o.current,
            s,
            e;
          return (
            f.type === 'image' &&
              (s = f.$content) &&
              !f.hasError &&
              ((u = o.getFitPos(f)),
              (e =
                n !== r && t !== r
                  ? { width: n, height: t }
                  : i.fancybox.getTranslate(s)),
              (u =
                Math.abs(e.width - u.width) > 1.5 ||
                Math.abs(e.height - u.height) > 1.5)),
            u
          );
        },
        loadSlide: function (n) {
          var t = this,
            u,
            r,
            f;
          if (!n.isLoading && !n.isLoaded) {
            n.isLoading = !0;
            t.trigger('beforeLoad', n);
            u = n.type;
            r = n.$slide;
            r.off('refresh').trigger('onReset').addClass(n.opts.slideClass);
            switch (u) {
              case 'image':
                t.setImage(n);
                break;
              case 'iframe':
                t.setIframe(n);
                break;
              case 'html':
                t.setContent(n, n.src || n.content);
                break;
              case 'video':
                t.setContent(
                  n,
                  n.opts.video.tpl
                    .replace('{{src}}', n.src)
                    .replace(
                      '{{format}}',
                      n.opts.videoFormat || n.opts.video.format
                    )
                );
                break;
              case 'inline':
                i(n.src).length ? t.setContent(n, i(n.src)) : t.setError(n);
                break;
              case 'ajax':
                t.showLoading(n);
                f = i.ajax(
                  i.extend({}, n.opts.ajax.settings, {
                    url: n.src,
                    success: function (i, r) {
                      r === 'success' && t.setContent(n, i);
                    },
                    error: function (i, r) {
                      i && r !== 'abort' && t.setError(n);
                    },
                  })
                );
                r.one('onReset', function () {
                  f.abort();
                });
                break;
              default:
                t.setError(n);
                break;
            }
            return !0;
          }
        },
        setImage: function (t) {
          var o = this,
            s = t.opts.srcset || t.opts.image.srcset,
            h,
            r,
            u,
            c,
            l,
            e,
            f;
          if (
            ((t.timouts = setTimeout(function () {
              var n = t.$image;
              !t.isLoading ||
                (n && n.length && n[0].complete) ||
                t.hasError ||
                o.showLoading(t);
            }, 350)),
            s)
          ) {
            for (
              c = n.devicePixelRatio || 1,
                l = n.innerWidth * c,
                u = s.split(',').map(function (n) {
                  var t = {};
                  return (
                    n
                      .trim()
                      .split(/\s+/)
                      .forEach(function (n, i) {
                        var r = parseInt(n.substring(0, n.length - 1), 10);
                        if (i === 0) return (t.url = n);
                        r && ((t.value = r), (t.postfix = n[n.length - 1]));
                      }),
                    t
                  );
                }),
                u.sort(function (n, t) {
                  return n.value - t.value;
                }),
                e = 0;
              e < u.length;
              e++
            )
              if (
                ((f = u[e]),
                (f.postfix === 'w' && f.value >= l) ||
                  (f.postfix === 'x' && f.value >= c))
              ) {
                r = f;
                break;
              }
            !r && u.length && (r = u[u.length - 1]);
            r &&
              ((t.src = r.url),
              t.width &&
                t.height &&
                r.postfix == 'w' &&
                ((t.height = (t.width / t.height) * r.value),
                (t.width = r.value)),
              (t.opts.srcset = s));
          }
          t.$content = i('<div class="fancybox-content"></div>')
            .addClass('fancybox-is-hidden')
            .appendTo(t.$slide.addClass('fancybox-slide--image'));
          h =
            t.opts.thumb ||
            (t.opts.$thumb && t.opts.$thumb.length
              ? t.opts.$thumb.attr('src')
              : !1);
          t.opts.preload !== !1 &&
            t.opts.width &&
            t.opts.height &&
            h &&
            ((t.width = t.opts.width),
            (t.height = t.opts.height),
            (t.$ghost = i('<img />')
              .one('error', function () {
                i(this).remove();
                t.$ghost = null;
              })
              .one('load', function () {
                o.afterLoad(t);
              })
              .addClass('fancybox-image')
              .appendTo(t.$content)
              .attr('src', h)));
          o.setBigImage(t);
        },
        setBigImage: function (n) {
          var r = this,
            t = i('<img />');
          n.$image = t
            .one('error', function () {
              r.setError(n);
            })
            .one('load', function () {
              var i;
              (n.$ghost ||
                (r.resolveImageSlideSize(
                  n,
                  this.naturalWidth,
                  this.naturalHeight
                ),
                r.afterLoad(n)),
              n.timouts && (clearTimeout(n.timouts), (n.timouts = null)),
              r.isClosing) ||
                (n.opts.srcset &&
                  ((i = n.opts.sizes),
                  (i && i !== 'auto') ||
                    (i =
                      (n.width / n.height > 1 && o.width() / o.height() > 1
                        ? '100'
                        : Math.round((n.width / n.height) * 100)) + 'vw'),
                  t.attr('sizes', i).attr('srcset', n.opts.srcset)),
                n.$ghost &&
                  setTimeout(function () {
                    n.$ghost && !r.isClosing && n.$ghost.hide();
                  }, Math.min(300, Math.max(1e3, n.height / 1600))),
                r.hideLoading(n));
            })
            .addClass('fancybox-image')
            .attr('src', n.src)
            .appendTo(n.$content);
          (t[0].complete || t[0].readyState == 'complete') &&
          t[0].naturalWidth &&
          t[0].naturalHeight
            ? t.trigger('load')
            : t[0].error && t.trigger('error');
        },
        resolveImageSlideSize: function (n, t, i) {
          var r = parseInt(n.opts.width, 10),
            u = parseInt(n.opts.height, 10);
          n.width = t;
          n.height = i;
          r > 0 && ((n.width = r), (n.height = Math.floor((r * i) / t)));
          u > 0 && ((n.width = Math.floor((u * t) / i)), (n.height = u));
        },
        setIframe: function (n) {
          var e = this,
            t = n.opts.iframe,
            u = n.$slide,
            f;
          if (
            ((n.$content = i(
              '<div class="fancybox-content' +
                (t.preload ? ' fancybox-is-hidden' : '') +
                '"></div>'
            )
              .css(t.css)
              .appendTo(u)),
            u.addClass('fancybox-slide--' + n.contentType),
            (n.$iframe = f = i(t.tpl.replace(/\{rnd\}/g, new Date().getTime()))
              .attr(t.attr)
              .appendTo(n.$content)),
            t.preload)
          ) {
            e.showLoading(n);
            f.on('load.fb error.fb', function (t) {
              this.isReady = 1;
              n.$slide.trigger('refresh');
              e.afterLoad(n);
            });
            u.on('refresh.fb', function () {
              var e = n.$content,
                o = t.css.width,
                s = t.css.height,
                h,
                i;
              if (f[0].isReady === 1) {
                try {
                  h = f.contents();
                  i = h.find('body');
                } catch (c) {}
                i &&
                  i.length &&
                  i.children().length &&
                  (u.css('overflow', 'visible'),
                  e.css({ width: '100%', height: '' }),
                  o === r &&
                    (o = Math.ceil(
                      Math.max(i[0].clientWidth, i.outerWidth(!0))
                    )),
                  o && e.width(o),
                  s === r &&
                    (s = Math.ceil(
                      Math.max(i[0].clientHeight, i.outerHeight(!0))
                    )),
                  s && e.height(s),
                  u.css('overflow', 'auto'));
                e.removeClass('fancybox-is-hidden');
              }
            });
          } else this.afterLoad(n);
          f.attr('src', n.src);
          u.one('onReset', function () {
            try {
              i(this)
                .find('iframe')
                .hide()
                .unbind()
                .attr('src', '//about:blank');
            } catch (t) {}
            i(this).off('refresh.fb').empty();
            n.isLoaded = !1;
          });
        },
        setContent: function (n, t) {
          var r = this;
          if (!r.isClosing) {
            r.hideLoading(n);
            n.$content && i.fancybox.stop(n.$content);
            n.$slide.empty();
            y(t) && t.parent().length
              ? (t.hasClass('fancybox-content') &&
                  t.parent('.fancybox-slide--html').trigger('onReset'),
                (n.$placeholder = i('<div>').hide().insertAfter(t)),
                t.css('display', 'inline-block'))
              : n.hasError ||
                (i.type(t) === 'string' &&
                  (t = i('<div>').append(i.trim(t)).contents()),
                n.opts.filter && (t = i('<div>').html(t).find(n.opts.filter)));
            n.$slide.one('onReset', function () {
              i(this).find('video,audio').trigger('pause');
              n.$placeholder &&
                (n.$placeholder
                  .after(t.removeClass('fancybox-content').hide())
                  .remove(),
                (n.$placeholder = null));
              n.$smallBtn && (n.$smallBtn.remove(), (n.$smallBtn = null));
              n.hasError ||
                (i(this).empty(), (n.isLoaded = !1), (n.isRevealed = !1));
            });
            i(t).appendTo(n.$slide);
            i(t).is('video,audio') &&
              (i(t).addClass('fancybox-video'),
              i(t).wrap('<div></div>'),
              (n.contentType = 'video'),
              (n.opts.width = n.opts.width || i(t).attr('width')),
              (n.opts.height = n.opts.height || i(t).attr('height')));
            n.$content = n.$slide
              .children()
              .filter('div,form,main,video,audio,article,.fancybox-content')
              .first();
            n.$content.siblings().hide();
            n.$content.length ||
              (n.$content = n.$slide
                .wrapInner('<div></div>')
                .children()
                .first());
            n.$content.addClass('fancybox-content');
            n.$slide.addClass('fancybox-slide--' + n.contentType);
            this.afterLoad(n);
          }
        },
        setError: function (n) {
          n.hasError = !0;
          n.$slide
            .trigger('onReset')
            .removeClass('fancybox-slide--' + n.contentType)
            .addClass('fancybox-slide--error');
          n.contentType = 'html';
          this.setContent(n, this.translate(n, n.opts.errorTpl));
          n.pos === this.currPos && (this.isAnimating = !1);
        },
        showLoading: function (n) {
          var t = this;
          n = n || t.current;
          n &&
            !n.$spinner &&
            (n.$spinner = i(t.translate(t, t.opts.spinnerTpl)).appendTo(
              n.$slide
            ));
        },
        hideLoading: function (n) {
          var t = this;
          n = n || t.current;
          n && n.$spinner && (n.$spinner.remove(), delete n.$spinner);
        },
        afterLoad: function (n) {
          var t = this;
          if (!t.isClosing) {
            if (
              ((n.isLoading = !1),
              (n.isLoaded = !0),
              t.trigger('afterLoad', n),
              t.hideLoading(n),
              n.pos === t.currPos && t.updateCursor(),
              !n.opts.smallBtn ||
                (n.$smallBtn && n.$smallBtn.length) ||
                (n.$smallBtn = i(
                  t.translate(n, n.opts.btnTpl.smallBtn)
                ).appendTo(n.$content)),
              n.opts.protect && n.$content && !n.hasError)
            ) {
              n.$content.on('contextmenu.fb', function (n) {
                return n.button == 2 && n.preventDefault(), !0;
              });
              n.type === 'image' &&
                i('<div class="fancybox-spaceball"></div>').appendTo(
                  n.$content
                );
            }
            t.revealContent(n);
          }
        },
        revealContent: function (n) {
          var t = this,
            h = n.$slide,
            e = !1,
            o = !1,
            a = t.isMoved(n),
            v = n.isRevealed,
            u,
            l,
            s,
            c;
          if (!a || !v) {
            if (
              ((n.isRevealed = !0),
              (u = n.opts[t.firstRun ? 'animationEffect' : 'transitionEffect']),
              (s =
                n.opts[
                  t.firstRun ? 'animationDuration' : 'transitionDuration'
                ]),
              (s = parseInt(n.forcedDuration === r ? s : n.forcedDuration, 10)),
              n.pos === t.currPos &&
                (n.isComplete ? (u = !1) : (t.isAnimating = !0)),
              (a || n.pos !== t.currPos || !s) && (u = !1),
              u === 'zoom' &&
                (n.pos === t.currPos &&
                s &&
                n.type === 'image' &&
                !n.hasError &&
                (o = t.getThumbPos(n))
                  ? (e = t.getFitPos(n))
                  : (u = 'fade')),
              u === 'zoom')
            ) {
              e.scaleX = e.width / o.width;
              e.scaleY = e.height / o.height;
              c = n.opts.zoomOpacity;
              c == 'auto' &&
                (c = Math.abs(n.width / n.height - o.width / o.height) > 0.1);
              c && ((o.opacity = 0.1), (e.opacity = 1));
              i.fancybox.setTranslate(
                n.$content.removeClass('fancybox-is-hidden'),
                o
              );
              f(n.$content);
              i.fancybox.animate(n.$content, e, s, function () {
                t.isAnimating = !1;
                t.complete();
              });
              return;
            }
            if ((t.updateSlide(n), !u)) {
              f(h);
              v ||
                n.$content
                  .removeClass('fancybox-is-hidden')
                  .hide()
                  .fadeIn('fast');
              n.pos === t.currPos && t.complete();
              return;
            }
            i.fancybox.stop(h);
            l =
              'fancybox-animated fancybox-slide--' +
              (n.pos >= t.prevPos ? 'next' : 'previous') +
              ' fancybox-fx-' +
              u;
            h.removeAttr('style')
              .removeClass(
                'fancybox-slide--current fancybox-slide--next fancybox-slide--previous'
              )
              .addClass(l);
            n.$content.removeClass('fancybox-is-hidden');
            f(h);
            i.fancybox.animate(
              h,
              'fancybox-slide--current',
              s,
              function () {
                h.removeClass(l).removeAttr('style');
                n.pos === t.currPos && t.complete();
              },
              !0
            );
          }
        },
        getThumbPos: function (r) {
          var s = this,
            o = !1,
            u = r.opts.$thumb,
            f = u && u.length && u[0].ownerDocument === t ? u.offset() : 0,
            e,
            h = function (t) {
              for (
                var u = t[0], r = u.getBoundingClientRect(), f = [], e;
                u.parentElement !== null;

              )
                (i(u.parentElement).css('overflow') === 'hidden' ||
                  i(u.parentElement).css('overflow') === 'auto') &&
                  f.push(u.parentElement.getBoundingClientRect()),
                  (u = u.parentElement);
              return (
                (e = f.every(function (n) {
                  var t = Math.min(r.right, n.right) - Math.max(r.left, n.left),
                    i = Math.min(r.bottom, n.bottom) - Math.max(r.top, n.top);
                  return t > 0 && i > 0;
                })),
                e &&
                  r.bottom > 0 &&
                  r.right > 0 &&
                  r.left < i(n).width() &&
                  r.top < i(n).height()
              );
            };
          return (
            f &&
              h(u) &&
              ((e = s.$refs.stage.offset()),
              (o = {
                top: f.top - e.top + parseFloat(u.css('border-top-width') || 0),
                left:
                  f.left - e.left + parseFloat(u.css('border-left-width') || 0),
                width: u.width(),
                height: u.height(),
                scaleX: 1,
                scaleY: 1,
              })),
            o
          );
        },
        complete: function () {
          var t = this,
            n = t.current,
            u = {},
            r;
          !t.isMoved() &&
            n.isLoaded &&
            (n.isComplete ||
              ((n.isComplete = !0),
              n.$slide.siblings().trigger('onReset'),
              t.preload('inline'),
              f(n.$slide),
              n.$slide.addClass('fancybox-slide--complete'),
              i.each(t.slides, function (n, r) {
                r.pos >= t.currPos - 1 && r.pos <= t.currPos + 1
                  ? (u[r.pos] = r)
                  : r && (i.fancybox.stop(r.$slide), r.$slide.off().remove());
              }),
              (t.slides = u)),
            (t.isAnimating = !1),
            t.updateCursor(),
            t.trigger('afterShow'),
            !n.opts.video.autoStart ||
              n.$slide
                .find('video,audio')
                .filter(':visible:first')
                .trigger('play'),
            n.opts.autoFocus &&
              n.contentType === 'html' &&
              ((r = n.$content.find('input[autofocus]:enabled:visible:first')),
              r.length ? r.trigger('focus') : t.focus(null, !0)),
            n.$slide.scrollTop(0).scrollLeft(0));
        },
        preload: function (n) {
          var t = this,
            i = t.slides[t.currPos + 1],
            r = t.slides[t.currPos - 1];
          r && r.type === n && t.loadSlide(r);
          i && i.type === n && t.loadSlide(i);
        },
        focus: function (n, r) {
          var f = this,
            o =
              'a[href],area[href],input:not([disabled]):not([type="hidden"]):not([aria-hidden]),select:not([disabled]):not([aria-hidden]),textarea:not([disabled]):not([aria-hidden]),button:not([disabled]):not([aria-hidden]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
            u,
            e;
          f.isClosing ||
            ((u =
              !n && f.current && f.current.isComplete
                ? f.current.$slide.find(
                    '*:visible' + (r ? ':not(.fancybox-close-small)' : '')
                  )
                : f.$refs.container.find('*:visible')),
            (u = u.filter(o).filter(function () {
              return (
                i(this).css('visibility') !== 'hidden' &&
                !i(this).hasClass('disabled')
              );
            })),
            u.length
              ? ((e = u.index(t.activeElement)),
                n && n.shiftKey
                  ? (e < 0 || e == 0) &&
                    (n.preventDefault(), u.eq(u.length - 1).trigger('focus'))
                  : (e < 0 || e == u.length - 1) &&
                    (n && n.preventDefault(), u.eq(0).trigger('focus')))
              : f.$refs.container.trigger('focus'));
        },
        activate: function () {
          var n = this;
          i('.fancybox-container').each(function () {
            var t = i(this).data('FancyBox');
            t &&
              t.id !== n.id &&
              !t.isClosing &&
              (t.trigger('onDeactivate'), t.removeEvents(), (t.isVisible = !1));
          });
          n.isVisible = !0;
          (n.current || n.isIdle) && (n.update(), n.updateControls());
          n.trigger('onActivate');
          n.addEvents();
        },
        close: function (n, t) {
          var u = this,
            r = u.current,
            o,
            h,
            c,
            a,
            v,
            p,
            e,
            y = function () {
              u.cleanUp(n);
            };
          return u.isClosing
            ? !1
            : ((u.isClosing = !0), u.trigger('beforeClose', n) === !1)
            ? ((u.isClosing = !1),
              l(function () {
                u.update();
              }),
              !1)
            : (u.removeEvents(),
              r.timouts && clearTimeout(r.timouts),
              (c = r.$content),
              (o = r.opts.animationEffect),
              (h = i.isNumeric(t) ? t : o ? r.opts.animationDuration : 0),
              r.$slide
                .off(s)
                .removeClass(
                  'fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated'
                ),
              r.$slide.siblings().trigger('onReset').remove(),
              h &&
                u.$refs.container
                  .removeClass('fancybox-is-open')
                  .addClass('fancybox-is-closing'),
              u.hideLoading(r),
              u.hideControls(),
              u.updateCursor(),
              o !== 'zoom' ||
                (n !== !0 &&
                  c &&
                  h &&
                  r.type === 'image' &&
                  !r.hasError &&
                  (e = u.getThumbPos(r))) ||
                (o = 'fade'),
              o === 'zoom')
            ? (i.fancybox.stop(c),
              (a = i.fancybox.getTranslate(c)),
              (p = {
                top: a.top,
                left: a.left,
                scaleX: a.width / e.width,
                scaleY: a.height / e.height,
                width: e.width,
                height: e.height,
              }),
              (v = r.opts.zoomOpacity),
              v == 'auto' &&
                (v = Math.abs(r.width / r.height - e.width / e.height) > 0.1),
              v && (e.opacity = 0),
              i.fancybox.setTranslate(c, p),
              f(c),
              i.fancybox.animate(c, e, h, y),
              !0)
            : (o && h
                ? n === !0
                  ? setTimeout(y, h)
                  : i.fancybox.animate(
                      r.$slide.removeClass('fancybox-slide--current'),
                      'fancybox-animated fancybox-slide--previous fancybox-fx-' +
                        o,
                      h,
                      y
                    )
                : y(),
              !0);
        },
        cleanUp: function (t) {
          var r = this,
            f,
            u = r.current.opts.$orig,
            e,
            o;
          r.current.$slide.trigger('onReset');
          r.$refs.container.empty().remove();
          r.trigger('afterClose', t);
          !r.current.opts.backFocus ||
            ((u && u.length && u.is(':visible')) || (u = r.$trigger),
            u &&
              u.length &&
              ((e = n.scrollX),
              (o = n.scrollY),
              u.trigger('focus'),
              i('html, body').scrollTop(o).scrollLeft(e)));
          r.current = null;
          f = i.fancybox.getInstance();
          f
            ? f.activate()
            : (i('body').removeClass(
                'fancybox-active compensate-for-scrollbar'
              ),
              i('#fancybox-style-noscroll').remove());
        },
        trigger: function (n, t) {
          var f = Array.prototype.slice.call(arguments, 1),
            e = this,
            r = t && t.opts ? t : e.current,
            o;
          if (
            (r ? f.unshift(r) : (r = e),
            f.unshift(e),
            i.isFunction(r.opts[n]) && (o = r.opts[n].apply(r, f)),
            o === !1)
          )
            return o;
          n !== 'afterClose' && e.$refs
            ? e.$refs.container.trigger(n + '.fb', f)
            : u.trigger(n + '.fb', f);
        },
        updateControls: function () {
          var n = this,
            r = n.current,
            f = r.index,
            e = r.opts.caption,
            u = n.$refs.container,
            o = n.$refs.caption;
          r.$slide.trigger('refresh');
          n.$caption = e && e.length ? o.html(e) : null;
          n.isHiddenControls || n.isIdle || n.showControls();
          u.find('[data-fancybox-count]').html(n.group.length);
          u.find('[data-fancybox-index]').html(f + 1);
          u.find('[data-fancybox-prev]').prop(
            'disabled',
            !r.opts.loop && f <= 0
          );
          u.find('[data-fancybox-next]').prop(
            'disabled',
            !r.opts.loop && f >= n.group.length - 1
          );
          r.type === 'image'
            ? u
                .find('[data-fancybox-zoom]')
                .show()
                .end()
                .find('[data-fancybox-download]')
                .attr('href', r.opts.image.src || r.src)
                .show()
            : r.opts.toolbar &&
              u.find('[data-fancybox-download],[data-fancybox-zoom]').hide();
          i(t.activeElement).is(':hidden,[disabled]') &&
            n.$refs.container.trigger('focus');
        },
        hideControls: function () {
          this.isHiddenControls = !0;
          this.$refs.container.removeClass(
            'fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav'
          );
        },
        showControls: function () {
          var n = this,
            t = n.current ? n.current.opts : n.opts,
            i = n.$refs.container;
          n.isHiddenControls = !1;
          n.idleSecondsCounter = 0;
          i.toggleClass('fancybox-show-toolbar', !!(t.toolbar && t.buttons))
            .toggleClass(
              'fancybox-show-infobar',
              !!(t.infobar && n.group.length > 1)
            )
            .toggleClass('fancybox-show-caption', !!n.$caption)
            .toggleClass(
              'fancybox-show-nav',
              !!(t.arrows && n.group.length > 1)
            )
            .toggleClass('fancybox-is-modal', !!t.modal);
        },
        toggleControls: function () {
          this.isHiddenControls ? this.showControls() : this.hideControls();
        },
      });
      i.fancybox = {
        version: '3.4.1',
        defaults: a,
        getInstance: function (n) {
          var t = i(
              '.fancybox-container:not(".fancybox-is-closing"):last'
            ).data('FancyBox'),
            r = Array.prototype.slice.call(arguments, 1);
          return t instanceof h
            ? (i.type(n) === 'string'
                ? t[n].apply(t, r)
                : i.type(n) === 'function' && n.apply(t, r),
              t)
            : !1;
        },
        open: function (n, t, i) {
          return new h(n, t, i);
        },
        close: function (n) {
          var t = this.getInstance();
          t && (t.close(), n === !0 && this.close(n));
        },
        destroy: function () {
          this.close(!0);
          u.add('body').off('click.fb-start', '**');
        },
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
        use3d: (function () {
          var i = t.createElement('div');
          return (
            n.getComputedStyle &&
            n.getComputedStyle(i) &&
            n.getComputedStyle(i).getPropertyValue('transform') &&
            !(t.documentMode && t.documentMode < 11)
          );
        })(),
        getTranslate: function (n) {
          var t;
          return !n || !n.length
            ? !1
            : ((t = n[0].getBoundingClientRect()),
              {
                top: t.top || 0,
                left: t.left || 0,
                width: t.width,
                height: t.height,
                opacity: parseFloat(n.css('opacity')),
              });
        },
        setTranslate: function (n, t) {
          var i = '',
            u = {};
          if (n && t)
            return (
              (t.left !== r || t.top !== r) &&
                ((i =
                  (t.left === r ? n.position().left : t.left) +
                  'px, ' +
                  (t.top === r ? n.position().top : t.top) +
                  'px'),
                (i = this.use3d
                  ? 'translate3d(' + i + ', 0px)'
                  : 'translate(' + i + ')')),
              t.scaleX !== r &&
                t.scaleY !== r &&
                (i =
                  (i.length ? i + ' ' : '') +
                  'scale(' +
                  t.scaleX +
                  ', ' +
                  t.scaleY +
                  ')'),
              i.length && (u.transform = i),
              t.opacity !== r && (u.opacity = t.opacity),
              t.width !== r && (u.width = t.width),
              t.height !== r && (u.height = t.height),
              n.css(u)
            );
        },
        animate: function (n, t, u, f, e) {
          var o = !1,
            h;
          i.isFunction(u) && ((f = u), (u = null));
          i.isPlainObject(t) || n.removeAttr('style');
          i.fancybox.stop(n);
          n.on(s, function (r) {
            (r &&
              r.originalEvent &&
              (!n.is(r.originalEvent.target) ||
                r.originalEvent.propertyName == 'z-index')) ||
              (i.fancybox.stop(n),
              o && i.fancybox.setTranslate(n, o),
              i.isNumeric(u) && n.css('transition-duration', ''),
              i.isPlainObject(t)
                ? e === !1 && n.removeAttr('style')
                : e !== !0 && n.removeClass(t),
              i.isFunction(f) && f(r));
          });
          i.isNumeric(u) && n.css('transition-duration', u + 'ms');
          i.isPlainObject(t)
            ? (t.scaleX !== r &&
                t.scaleY !== r &&
                ((h = i.fancybox.getTranslate(n)),
                (o = i.extend({}, t, {
                  width: h.width * t.scaleX,
                  height: h.height * t.scaleY,
                  scaleX: 1,
                  scaleY: 1,
                })),
                delete t.width,
                delete t.height,
                n.parent().hasClass('fancybox-slide--image') &&
                  n.parent().addClass('fancybox-is-scaling')),
              i.fancybox.setTranslate(n, t))
            : n.addClass(t);
          n.data(
            'timer',
            setTimeout(function () {
              n.trigger('transitionend');
            }, u + 16)
          );
        },
        stop: function (n, t) {
          n &&
            n.length &&
            (clearTimeout(n.data('timer')),
            t && n.trigger(s),
            n.off(s).css('transition-duration', ''),
            n.parent().removeClass('fancybox-is-scaling'));
        },
      };
      i.fn.fancybox = function (n) {
        var t;
        if (((n = n || {}), (t = n.selector || !1), t))
          i('body')
            .off('click.fb-start', t)
            .on('click.fb-start', t, { options: n }, c);
        else
          this.off('click.fb-start').on(
            'click.fb-start',
            { items: this, options: n },
            c
          );
        return this;
      };
      u.on('click.fb-start', '[data-fancybox]', c);
      u.on('click.fb-start', '[data-fancybox-trigger]', function (n) {
        i('[data-fancybox="' + i(this).attr('data-fancybox-trigger') + '"]')
          .eq(i(this).attr('data-fancybox-index') || 0)
          .trigger('click.fb-start', { $trigger: i(this) });
      });
      (function () {
        var n = '.fancybox-button',
          t = 'fancybox-focus',
          r = null;
        u.on('mousedown mouseup focus blur', n, function (u) {
          switch (u.type) {
            case 'mousedown':
              r = i(this);
              break;
            case 'mouseup':
              r = null;
              break;
            case 'focusin':
              i(n).removeClass(t);
              i(this).is(r) || i(this).is('[disabled]') || i(this).addClass(t);
              break;
            case 'focusout':
              i(n).removeClass(t);
              break;
          }
        });
      })();
    }
  })(window, document, jQuery),
  (function (n) {
    'use strict';
    var t = function (t, i, r) {
        if (t)
          return (
            (r = r || ''),
            n.type(r) === 'object' && (r = n.param(r, !0)),
            n.each(i, function (n, i) {
              t = t.replace('$' + n, i || '');
            }),
            r.length && (t += (t.indexOf('?') > 0 ? '&' : '?') + r),
            t
          );
      },
      i = {
        youtube: {
          matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: 'transparent',
            enablejsapi: 1,
            html5: 1,
          },
          paramPlace: 8,
          type: 'iframe',
          url: '//www.youtube-nocookie.com/embed/$4',
          thumb: '//img.youtube.com/vi/$4/hqdefault.jpg',
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1,
            api: 1,
          },
          paramPlace: 3,
          type: 'iframe',
          url: '//player.vimeo.com/video/$2',
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: 'image',
          url: '//$1/p/$2/media/?size=l',
        },
        gmap_place: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: 'iframe',
          url: function (n) {
            return (
              '//maps.google.' +
              n[2] +
              '/?ll=' +
              (n[9]
                ? n[9] +
                  '&z=' +
                  Math.floor(n[10]) +
                  (n[12] ? n[12].replace(/^\//, '&') : '')
                : n[12] + ''
              ).replace(/\?/, '&') +
              '&output=' +
              (n[12] && n[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed')
            );
          },
        },
        gmap_search: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: 'iframe',
          url: function (n) {
            return (
              '//maps.google.' +
              n[2] +
              '/maps?q=' +
              n[5].replace('query=', 'q=').replace('api=1', '') +
              '&output=embed'
            );
          },
        },
      };
    n(document).on('objectNeedsType.fb', function (r, u, f) {
      var e = f.src || '',
        h = !1,
        v,
        y,
        o,
        c,
        s,
        a,
        l;
      v = n.extend(!0, {}, i, f.opts.media);
      n.each(v, function (i, r) {
        var u, v;
        if (((o = e.match(r.matcher)), o)) {
          if (
            ((h = r.type), (l = i), (a = {}), r.paramPlace && o[r.paramPlace])
          )
            for (
              s = o[r.paramPlace],
                s[0] == '?' && (s = s.substring(1)),
                s = s.split('&'),
                u = 0;
              u < s.length;
              ++u
            )
              (v = s[u].split('=', 2)),
                v.length == 2 &&
                  (a[v[0]] = decodeURIComponent(v[1].replace(/\+/g, ' ')));
          return (
            (c = n.extend(!0, {}, r.params, f.opts[i], a)),
            (e =
              n.type(r.url) === 'function'
                ? r.url.call(this, o, c, f)
                : t(r.url, o, c)),
            (y =
              n.type(r.thumb) === 'function'
                ? r.thumb.call(this, o, c, f)
                : t(r.thumb, o)),
            i === 'youtube'
              ? (e = e.replace(/&t=((\d+)m)?(\d+)s/, function (n, t, i, r) {
                  return (
                    '&start=' +
                    ((i ? parseInt(i, 10) * 60 : 0) + parseInt(r, 10))
                  );
                }))
              : i === 'vimeo' && (e = e.replace('&%23', '#')),
            !1
          );
        }
      });
      h
        ? (f.opts.thumb ||
            (f.opts.$thumb && f.opts.$thumb.length) ||
            (f.opts.thumb = y),
          h === 'iframe' &&
            (f.opts = n.extend(!0, f.opts, {
              iframe: { preload: !1, attr: { scrolling: 'no' } },
            })),
          n.extend(f, {
            type: h,
            src: e,
            origSrc: f.src,
            contentSource: l,
            contentType:
              h === 'image'
                ? 'image'
                : l == 'gmap_place' || l == 'gmap_search'
                ? 'map'
                : 'video',
          }))
        : e && (f.type = f.opts.defaultType);
    });
  })(jQuery),
  (function (n, t, i) {
    'use strict';
    var o = (function () {
        return (
          n.requestAnimationFrame ||
          n.webkitRequestAnimationFrame ||
          n.mozRequestAnimationFrame ||
          n.oRequestAnimationFrame ||
          function (t) {
            return n.setTimeout(t, 1e3 / 60);
          }
        );
      })(),
      f = (function () {
        return (
          n.cancelAnimationFrame ||
          n.webkitCancelAnimationFrame ||
          n.mozCancelAnimationFrame ||
          n.oCancelAnimationFrame ||
          function (t) {
            n.clearTimeout(t);
          }
        );
      })(),
      e = function (t) {
        var r = [],
          i;
        t = t.originalEvent || t || n.e;
        t =
          t.touches && t.touches.length
            ? t.touches
            : t.changedTouches && t.changedTouches.length
            ? t.changedTouches
            : [t];
        for (i in t)
          t[i].pageX
            ? r.push({ x: t[i].pageX, y: t[i].pageY })
            : t[i].clientX && r.push({ x: t[i].clientX, y: t[i].clientY });
        return r;
      },
      u = function (n, t, i) {
        if (!t || !n) return 0;
        if (i === 'x') return n.x - t.x;
        else if (i === 'y') return n.y - t.y;
        return Math.sqrt(Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2));
      },
      s = function (n) {
        if (
          n.is(
            'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio'
          ) ||
          i.isFunction(n.get(0).onclick) ||
          n.data('selectable')
        )
          return !0;
        for (var t = 0, r = n[0].attributes, u = r.length; t < u; t++)
          if (r[t].nodeName.substr(0, 14) === 'data-fancybox-') return !0;
        return !1;
      },
      c = function (t) {
        var i = n.getComputedStyle(t)['overflow-y'],
          r = n.getComputedStyle(t)['overflow-x'],
          u =
            (i === 'scroll' || i === 'auto') && t.scrollHeight > t.clientHeight,
          f = (r === 'scroll' || r === 'auto') && t.scrollWidth > t.clientWidth;
        return u || f;
      },
      h = function (n) {
        for (var t = !1; ; ) {
          if (((t = c(n.get(0))), t)) break;
          if (
            ((n = n.parent()),
            !n.length || n.hasClass('fancybox-stage') || n.is('body'))
          )
            break;
        }
        return t;
      },
      r = function (n) {
        var t = this;
        t.instance = n;
        t.$bg = n.$refs.bg;
        t.$stage = n.$refs.stage;
        t.$container = n.$refs.container;
        t.destroy();
        t.$container.on(
          'touchstart.fb.touch mousedown.fb.touch',
          i.proxy(t, 'ontouchstart')
        );
      };
    r.prototype.destroy = function () {
      this.$container.off('.fb.touch');
    };
    r.prototype.ontouchstart = function (r) {
      var f = this,
        o = i(r.target),
        l = f.instance,
        c = l.current,
        a = c.$slide,
        y = c.$content,
        v = r.type == 'touchstart';
      if (
        (v && f.$container.off('mousedown.fb.touch'),
        !r.originalEvent || r.originalEvent.button != 2) &&
        a.length &&
        o.length &&
        !s(o) &&
        !s(o.parent()) &&
        (o.is('img') ||
          !(r.originalEvent.clientX > o[0].clientWidth + o.offset().left))
      ) {
        if (!c || l.isAnimating || l.isClosing) {
          r.stopPropagation();
          r.preventDefault();
          return;
        }
        if (((f.realPoints = f.startPoints = e(r)), f.startPoints.length)) {
          c.touch && r.stopPropagation();
          f.startEvent = r;
          f.canTap = !0;
          f.$target = o;
          f.$content = y;
          f.opts = c.opts.touch;
          f.isPanning = !1;
          f.isSwiping = !1;
          f.isZooming = !1;
          f.isScrolling = !1;
          f.canPan = l.canPan();
          f.startTime = new Date().getTime();
          f.distanceX = f.distanceY = f.distance = 0;
          f.canvasWidth = Math.round(a[0].clientWidth);
          f.canvasHeight = Math.round(a[0].clientHeight);
          f.contentLastPos = null;
          f.contentStartPos = i.fancybox.getTranslate(f.$content) || {
            top: 0,
            left: 0,
          };
          f.sliderStartPos = f.sliderLastPos || i.fancybox.getTranslate(a);
          f.stagePos = i.fancybox.getTranslate(l.$refs.stage);
          f.sliderStartPos.top -= f.stagePos.top;
          f.sliderStartPos.left -= f.stagePos.left;
          f.contentStartPos.top -= f.stagePos.top;
          f.contentStartPos.left -= f.stagePos.left;
          i(t)
            .off('.fb.touch')
            .on(
              v
                ? 'touchend.fb.touch touchcancel.fb.touch'
                : 'mouseup.fb.touch mouseleave.fb.touch',
              i.proxy(f, 'ontouchend')
            )
            .on(
              v ? 'touchmove.fb.touch' : 'mousemove.fb.touch',
              i.proxy(f, 'ontouchmove')
            );
          if (
            (i.fancybox.isMobile &&
              t.addEventListener('scroll', f.onscroll, !0),
            !(f.opts || f.canPan) ||
              !(o.is(f.$stage) || f.$stage.find(o).length))
          ) {
            o.is('.fancybox-image') && r.preventDefault();
            return;
          }
          f.isScrollable = h(o) || h(o.parent());
          (i.fancybox.isMobile && f.isScrollable) || r.preventDefault();
          (f.startPoints.length === 1 || c.hasError) &&
            (f.canPan
              ? (i.fancybox.stop(f.$content),
                f.$content.css('transition-duration', ''),
                (f.isPanning = !0))
              : (f.isSwiping = !0),
            f.$container.addClass('fancybox-is-grabbing'));
          f.startPoints.length === 2 &&
            c.type === 'image' &&
            (c.isLoaded || c.$ghost) &&
            ((f.canTap = !1),
            (f.isSwiping = !1),
            (f.isPanning = !1),
            (f.isZooming = !0),
            i.fancybox.stop(f.$content),
            f.$content.css('transition-duration', ''),
            (f.centerPointStartX =
              (f.startPoints[0].x + f.startPoints[1].x) * 0.5 -
              i(n).scrollLeft()),
            (f.centerPointStartY =
              (f.startPoints[0].y + f.startPoints[1].y) * 0.5 -
              i(n).scrollTop()),
            (f.percentageOfImageAtPinchPointX =
              (f.centerPointStartX - f.contentStartPos.left) /
              f.contentStartPos.width),
            (f.percentageOfImageAtPinchPointY =
              (f.centerPointStartY - f.contentStartPos.top) /
              f.contentStartPos.height),
            (f.startDistanceBetweenFingers = u(
              f.startPoints[0],
              f.startPoints[1]
            )));
        }
      }
    };
    r.prototype.onscroll = function (n) {
      var i = this;
      i.isScrolling = !0;
      t.removeEventListener('scroll', i.onscroll, !0);
    };
    r.prototype.ontouchmove = function (n) {
      var t = this;
      if (
        n.originalEvent.buttons !== undefined &&
        n.originalEvent.buttons === 0
      ) {
        t.ontouchend(n);
        return;
      }
      if (t.isScrolling) {
        t.canTap = !1;
        return;
      }
      if (
        ((t.newPoints = e(n)),
        (t.opts || t.canPan) && t.newPoints.length && t.newPoints.length) &&
        ((t.isSwiping && t.isSwiping === !0) || n.preventDefault(),
        (t.distanceX = u(t.newPoints[0], t.startPoints[0], 'x')),
        (t.distanceY = u(t.newPoints[0], t.startPoints[0], 'y')),
        (t.distance = u(t.newPoints[0], t.startPoints[0])),
        t.distance > 0)
      )
        if (t.isSwiping) t.onSwipe(n);
        else t.isPanning ? t.onPan() : t.isZooming && t.onZoom();
    };
    r.prototype.onSwipe = function (t) {
      var r = this,
        e = r.isSwiping,
        u = r.sliderStartPos.left || 0,
        s;
      if (e === !0) {
        if (Math.abs(r.distance) > 10) {
          if (
            ((r.canTap = !1),
            r.instance.group.length < 2 && r.opts.vertical
              ? (r.isSwiping = 'y')
              : r.instance.isDragging ||
                r.opts.vertical === !1 ||
                (r.opts.vertical === 'auto' && i(n).width() > 800)
              ? (r.isSwiping = 'x')
              : ((s = Math.abs(
                  (Math.atan2(r.distanceY, r.distanceX) * 180) / Math.PI
                )),
                (r.isSwiping = s > 45 && s < 135 ? 'y' : 'x')),
            (r.canTap = !1),
            r.isSwiping === 'y' && i.fancybox.isMobile && r.isScrollable)
          ) {
            r.isScrolling = !0;
            return;
          }
          r.instance.isDragging = r.isSwiping;
          r.startPoints = r.newPoints;
          i.each(r.instance.slides, function (n, t) {
            i.fancybox.stop(t.$slide);
            t.$slide.css('transition-duration', '');
            t.inTransition = !1;
            t.pos === r.instance.current.pos &&
              (r.sliderStartPos.left =
                i.fancybox.getTranslate(t.$slide).left -
                i.fancybox.getTranslate(r.instance.$refs.stage).left);
          });
          r.instance.SlideShow &&
            r.instance.SlideShow.isActive &&
            r.instance.SlideShow.stop();
        }
        return;
      }
      e == 'x' &&
        (u =
          r.distanceX > 0 &&
          (r.instance.group.length < 2 ||
            (r.instance.current.index === 0 && !r.instance.current.opts.loop))
            ? u + Math.pow(r.distanceX, 0.8)
            : r.distanceX < 0 &&
              (r.instance.group.length < 2 ||
                (r.instance.current.index === r.instance.group.length - 1 &&
                  !r.instance.current.opts.loop))
            ? u - Math.pow(-r.distanceX, 0.8)
            : u + r.distanceX);
      r.sliderLastPos = {
        top: e == 'x' ? 0 : r.sliderStartPos.top + r.distanceY,
        left: u,
      };
      r.requestId && (f(r.requestId), (r.requestId = null));
      r.requestId = o(function () {
        r.sliderLastPos &&
          (i.each(r.instance.slides, function (n, t) {
            var u = t.pos - r.instance.currPos;
            i.fancybox.setTranslate(t.$slide, {
              top: r.sliderLastPos.top,
              left:
                r.sliderLastPos.left + u * r.canvasWidth + u * t.opts.gutter,
            });
          }),
          r.$container.addClass('fancybox-is-sliding'));
      });
    };
    r.prototype.onPan = function () {
      var n = this;
      if (u(n.newPoints[0], n.realPoints[0]) < (i.fancybox.isMobile ? 10 : 5)) {
        n.startPoints = n.newPoints;
        return;
      }
      n.canTap = !1;
      n.contentLastPos = n.limitMovement();
      n.requestId && (f(n.requestId), (n.requestId = null));
      n.requestId = o(function () {
        i.fancybox.setTranslate(n.$content, n.contentLastPos);
      });
    };
    r.prototype.limitMovement = function () {
      var i = this,
        f = i.canvasWidth,
        v = i.canvasHeight,
        r = i.distanceX,
        u = i.distanceY,
        e = i.contentStartPos,
        o = e.left,
        y = e.top,
        s = e.width,
        p = e.height,
        h,
        c,
        l,
        a,
        n,
        t;
      return (
        (n = s > f ? o + r : o),
        (t = y + u),
        (h = Math.max(0, f * 0.5 - s * 0.5)),
        (c = Math.max(0, v * 0.5 - p * 0.5)),
        (l = Math.min(f - s, f * 0.5 - s * 0.5)),
        (a = Math.min(v - p, v * 0.5 - p * 0.5)),
        r > 0 && n > h && (n = h - 1 + Math.pow(-h + o + r, 0.8) || 0),
        r < 0 && n < l && (n = l + 1 - Math.pow(l - o - r, 0.8) || 0),
        u > 0 && t > c && (t = c - 1 + Math.pow(-c + y + u, 0.8) || 0),
        u < 0 && t < a && (t = a + 1 - Math.pow(a - y - u, 0.8) || 0),
        { top: t, left: n }
      );
    };
    r.prototype.limitPosition = function (n, t, i, r) {
      var e = this,
        u = e.canvasWidth,
        f = e.canvasHeight;
      return (
        i > u
          ? ((n = n > 0 ? 0 : n), (n = n < u - i ? u - i : n))
          : (n = Math.max(0, u / 2 - i / 2)),
        r > f
          ? ((t = t > 0 ? 0 : t), (t = t < f - r ? f - r : t))
          : (t = Math.max(0, f / 2 - r / 2)),
        { top: t, left: n }
      );
    };
    r.prototype.onZoom = function () {
      var t = this,
        r = t.contentStartPos,
        s = r.width,
        h = r.height,
        a = r.left,
        v = r.top,
        y = u(t.newPoints[0], t.newPoints[1]),
        e = y / t.startDistanceBetweenFingers,
        c = Math.floor(s * e),
        l = Math.floor(h * e),
        p = (s - c) * t.percentageOfImageAtPinchPointX,
        w = (h - l) * t.percentageOfImageAtPinchPointY,
        b = (t.newPoints[0].x + t.newPoints[1].x) / 2 - i(n).scrollLeft(),
        k = (t.newPoints[0].y + t.newPoints[1].y) / 2 - i(n).scrollTop(),
        d = b - t.centerPointStartX,
        g = k - t.centerPointStartY,
        nt = a + (p + d),
        tt = v + (w + g),
        it = { top: tt, left: nt, scaleX: e, scaleY: e };
      t.canTap = !1;
      t.newWidth = c;
      t.newHeight = l;
      t.contentLastPos = it;
      t.requestId && (f(t.requestId), (t.requestId = null));
      t.requestId = o(function () {
        i.fancybox.setTranslate(t.$content, t.contentLastPos);
      });
    };
    r.prototype.ontouchend = function (n) {
      var r = this,
        u = Math.max(new Date().getTime() - r.startTime, 1),
        o = r.isSwiping,
        s = r.isPanning,
        h = r.isZooming,
        c = r.isScrolling;
      if (
        ((r.endPoints = e(n)),
        r.$container.removeClass('fancybox-is-grabbing'),
        i(t).off('.fb.touch'),
        t.removeEventListener('scroll', r.onscroll, !0),
        r.requestId && (f(r.requestId), (r.requestId = null)),
        (r.isSwiping = !1),
        (r.isPanning = !1),
        (r.isZooming = !1),
        (r.isScrolling = !1),
        (r.instance.isDragging = !1),
        r.canTap)
      )
        return r.onTap(n);
      r.speed = 366;
      r.velocityX = (r.distanceX / u) * 0.5;
      r.velocityY = (r.distanceY / u) * 0.5;
      r.speedX = Math.max(
        r.speed * 0.5,
        Math.min(r.speed * 1.5, (1 / Math.abs(r.velocityX)) * r.speed)
      );
      s ? r.endPanning() : h ? r.endZooming() : r.endSwiping(o, c);
      return;
    };
    r.prototype.endSwiping = function (n, t) {
      var r = this,
        u = !1,
        f = r.instance.group.length;
      r.sliderLastPos = null;
      n == 'y' && !t && Math.abs(r.distanceY) > 50
        ? (i.fancybox.animate(
            r.instance.current.$slide,
            {
              top: r.sliderStartPos.top + r.distanceY + r.velocityY * 150,
              opacity: 0,
            },
            200
          ),
          (u = r.instance.close(!0, 200)))
        : n == 'x' && r.distanceX > 50 && f > 1
        ? (u = r.instance.previous(r.speedX))
        : n == 'x' &&
          r.distanceX < -50 &&
          f > 1 &&
          (u = r.instance.next(r.speedX));
      u === !1 &&
        (n == 'x' || n == 'y') &&
        (t || f < 2
          ? r.instance.centerSlide(r.instance.current, 150)
          : r.instance.jumpTo(r.instance.current.index));
      r.$container.removeClass('fancybox-is-sliding');
    };
    r.prototype.endPanning = function () {
      var n = this,
        r,
        u,
        t;
      n.contentLastPos &&
        (n.opts.momentum === !1
          ? ((r = n.contentLastPos.left), (u = n.contentLastPos.top))
          : ((r = n.contentLastPos.left + n.velocityX * n.speed),
            (u = n.contentLastPos.top + n.velocityY * n.speed)),
        (t = n.limitPosition(
          r,
          u,
          n.contentStartPos.width,
          n.contentStartPos.height
        )),
        (t.width = n.contentStartPos.width),
        (t.height = n.contentStartPos.height),
        i.fancybox.animate(n.$content, t, 330));
    };
    r.prototype.endZooming = function () {
      var n = this,
        e = n.instance.current,
        u,
        f,
        o,
        s,
        t = n.newWidth,
        r = n.newHeight;
      n.contentLastPos &&
        ((u = n.contentLastPos.left),
        (f = n.contentLastPos.top),
        (s = { top: f, left: u, width: t, height: r, scaleX: 1, scaleY: 1 }),
        i.fancybox.setTranslate(n.$content, s),
        t < n.canvasWidth && r < n.canvasHeight
          ? n.instance.scaleToFit(150)
          : t > e.width || r > e.height
          ? n.instance.scaleToActual(
              n.centerPointStartX,
              n.centerPointStartY,
              150
            )
          : ((o = n.limitPosition(u, f, t, r)),
            i.fancybox.setTranslate(
              n.$content,
              i.fancybox.getTranslate(n.$content)
            ),
            i.fancybox.animate(n.$content, o, 150)));
    };
    r.prototype.onTap = function (t) {
      var r = this,
        s = i(t.target),
        u = r.instance,
        o = u.current,
        h = (t && e(t)) || r.startPoints,
        c = h[0] ? h[0].x - i(n).scrollLeft() - r.stagePos.left : 0,
        l = h[0] ? h[0].y - i(n).scrollTop() - r.stagePos.top : 0,
        f,
        a = function (n) {
          var f = o.opts[n];
          if ((i.isFunction(f) && (f = f.apply(u, [o, t])), f))
            switch (f) {
              case 'close':
                u.close(r.startEvent);
                break;
              case 'toggleControls':
                u.toggleControls(!0);
                break;
              case 'next':
                u.next();
                break;
              case 'nextOrClose':
                u.group.length > 1 ? u.next() : u.close(r.startEvent);
                break;
              case 'zoom':
                o.type == 'image' &&
                  (o.isLoaded || o.$ghost) &&
                  (u.canPan()
                    ? u.scaleToFit()
                    : u.isScaledDown()
                    ? u.scaleToActual(c, l)
                    : u.group.length < 2 && u.close(r.startEvent));
                break;
            }
        };
      if (
        (!t.originalEvent || t.originalEvent.button != 2) &&
        (s.is('img') || !(c > s[0].clientWidth + s.offset().left))
      ) {
        if (
          s.is(
            '.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container'
          )
        )
          f = 'Outside';
        else if (s.is('.fancybox-slide')) f = 'Slide';
        else if (
          u.current.$content &&
          u.current.$content.find(s).addBack().filter(s).length
        )
          f = 'Content';
        else return;
        if (r.tapped) {
          if (
            (clearTimeout(r.tapped),
            (r.tapped = null),
            Math.abs(c - r.tapX) > 50 || Math.abs(l - r.tapY) > 50)
          )
            return this;
          a('dblclick' + f);
        } else
          (r.tapX = c),
            (r.tapY = l),
            o.opts['dblclick' + f] &&
            o.opts['dblclick' + f] !== o.opts['click' + f]
              ? (r.tapped = setTimeout(function () {
                  r.tapped = null;
                  a('click' + f);
                }, 500))
              : a('click' + f);
        return this;
      }
    };
    i(t).on('onActivate.fb', function (n, t) {
      t && !t.Guestures && (t.Guestures = new r(t));
    });
  })(window, document, jQuery),
  (function (n, t) {
    'use strict';
    t.extend(!0, t.fancybox.defaults, {
      btnTpl: {
        slideShow:
          '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
      },
      slideShow: { autoStart: !1, speed: 3e3 },
    });
    var i = function (n) {
      this.instance = n;
      this.init();
    };
    t.extend(i.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function () {
        var n = this;
        n.$button = n.instance.$refs.toolbar
          .find('[data-fancybox-play]')
          .on('click', function () {
            n.toggle();
          });
        (n.instance.group.length < 2 ||
          !n.instance.group[n.instance.currIndex].opts.slideShow) &&
          n.$button.hide();
      },
      set: function (n) {
        var i = this,
          t = i.instance,
          r = t.current,
          u = function () {
            i.isActive && t.jumpTo((t.currIndex + 1) % t.group.length);
          };
        r && (n === !0 || r.opts.loop || t.currIndex < t.group.length - 1)
          ? (i.timer = setTimeout(function () {
              var n;
              if (i.isActive)
                if (
                  ((n = r.$slide.find('video,audio').filter(':visible:first')),
                  n.length)
                )
                  n.one('ended', u);
                else u();
            }, r.opts.slideShow.speed))
          : (i.stop(), (t.idleSecondsCounter = 0), t.showControls());
      },
      clear: function () {
        var n = this;
        clearTimeout(n.timer);
        n.timer = null;
      },
      start: function () {
        var n = this,
          t = n.instance.current;
        t &&
          (n.$button
            .attr('title', t.opts.i18n[t.opts.lang].PLAY_STOP)
            .removeClass('fancybox-button--play')
            .addClass('fancybox-button--pause'),
          (n.isActive = !0),
          t.isComplete && n.set(!0),
          n.instance.trigger('onSlideShowChange', !0));
      },
      stop: function () {
        var n = this,
          t = n.instance.current;
        n.clear();
        n.$button
          .attr('title', t.opts.i18n[t.opts.lang].PLAY_START)
          .removeClass('fancybox-button--pause')
          .addClass('fancybox-button--play');
        n.isActive = !1;
        n.instance.trigger('onSlideShowChange', !1);
      },
      toggle: function () {
        var n = this;
        n.isActive ? n.stop() : n.start();
      },
    });
    t(n).on({
      'onInit.fb': function (n, t) {
        t && !t.SlideShow && (t.SlideShow = new i(t));
      },
      'beforeShow.fb': function (n, t, i, r) {
        var u = t && t.SlideShow;
        r
          ? u && i.opts.slideShow.autoStart && u.start()
          : u && u.isActive && u.clear();
      },
      'afterShow.fb': function (n, t, i) {
        var r = t && t.SlideShow;
        r && r.isActive && r.set();
      },
      'afterKeydown.fb': function (i, r, u, f, e) {
        var o = r && r.SlideShow;
        o &&
          u.opts.slideShow &&
          (e === 80 || e === 32) &&
          !t(n.activeElement).is('button,a,input') &&
          (f.preventDefault(), o.toggle());
      },
      'beforeClose.fb onDeactivate.fb': function (n, t) {
        var i = t && t.SlideShow;
        i && i.stop();
      },
    });
    t(n).on('visibilitychange', function () {
      var r = t.fancybox.getInstance(),
        i = r && r.SlideShow;
      i && i.isActive && (n.hidden ? i.clear() : i.set());
    });
  })(document, jQuery),
  (function (n, t) {
    'use strict';
    var i = (function () {
        for (
          var t,
            i,
            r = [
              [
                'requestFullscreen',
                'exitFullscreen',
                'fullscreenElement',
                'fullscreenEnabled',
                'fullscreenchange',
                'fullscreenerror',
              ],
              [
                'webkitRequestFullscreen',
                'webkitExitFullscreen',
                'webkitFullscreenElement',
                'webkitFullscreenEnabled',
                'webkitfullscreenchange',
                'webkitfullscreenerror',
              ],
              [
                'webkitRequestFullScreen',
                'webkitCancelFullScreen',
                'webkitCurrentFullScreenElement',
                'webkitCancelFullScreen',
                'webkitfullscreenchange',
                'webkitfullscreenerror',
              ],
              [
                'mozRequestFullScreen',
                'mozCancelFullScreen',
                'mozFullScreenElement',
                'mozFullScreenEnabled',
                'mozfullscreenchange',
                'mozfullscreenerror',
              ],
              [
                'msRequestFullscreen',
                'msExitFullscreen',
                'msFullscreenElement',
                'msFullscreenEnabled',
                'MSFullscreenChange',
                'MSFullscreenError',
              ],
            ],
            f = {},
            u = 0;
          u < r.length;
          u++
        )
          if (((t = r[u]), t && t[1] in n)) {
            for (i = 0; i < t.length; i++) f[r[0][i]] = t[i];
            return f;
          }
        return !1;
      })(),
      r;
    if (i) {
      r = {
        request: function (t) {
          t = t || n.documentElement;
          t[i.requestFullscreen](t.ALLOW_KEYBOARD_INPUT);
        },
        exit: function () {
          n[i.exitFullscreen]();
        },
        toggle: function (t) {
          t = t || n.documentElement;
          this.isFullscreen() ? this.exit() : this.request(t);
        },
        isFullscreen: function () {
          return Boolean(n[i.fullscreenElement]);
        },
        enabled: function () {
          return Boolean(n[i.fullscreenEnabled]);
        },
      };
      t.extend(!0, t.fancybox.defaults, {
        btnTpl: {
          fullScreen:
            '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
        },
        fullScreen: { autoStart: !1 },
      });
      t(n).on(i.fullscreenchange, function () {
        var i = r.isFullscreen(),
          n = t.fancybox.getInstance();
        n &&
          (n.current &&
            n.current.type === 'image' &&
            n.isAnimating &&
            (n.current.$content.css('transition', 'none'),
            (n.isAnimating = !1),
            n.update(!0, !0, 0)),
          n.trigger('onFullscreenChange', i),
          n.$refs.container.toggleClass('fancybox-is-fullscreen', i),
          n.$refs.toolbar
            .find('[data-fancybox-fullscreen]')
            .toggleClass('fancybox-button--fsenter', !i)
            .toggleClass('fancybox-button--fsexit', i));
      });
    }
    t(n).on({
      'onInit.fb': function (n, t) {
        var u;
        if (!i) {
          t.$refs.toolbar.find('[data-fancybox-fullscreen]').remove();
          return;
        }
        if (t && t.group[t.currIndex].opts.fullScreen) {
          u = t.$refs.container;
          u.on('click.fb-fullscreen', '[data-fancybox-fullscreen]', function (
            n
          ) {
            n.stopPropagation();
            n.preventDefault();
            r.toggle();
          });
          t.opts.fullScreen &&
            t.opts.fullScreen.autoStart === !0 &&
            r.request();
          t.FullScreen = r;
        } else t && t.$refs.toolbar.find('[data-fancybox-fullscreen]').hide();
      },
      'afterKeydown.fb': function (n, t, i, r, u) {
        t &&
          t.FullScreen &&
          u === 70 &&
          (r.preventDefault(), t.FullScreen.toggle());
      },
      'beforeClose.fb': function (n, t) {
        t &&
          t.FullScreen &&
          t.$refs.container.hasClass('fancybox-is-fullscreen') &&
          r.exit();
      },
    });
  })(document, jQuery),
  (function (n, t) {
    'use strict';
    var i = 'fancybox-thumbs',
      u = i + '-active',
      r;
    t.fancybox.defaults = t.extend(
      !0,
      {
        btnTpl: {
          thumbs:
            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
        },
        thumbs: {
          autoStart: !0,
          hideOnClose: !0,
          parentEl: '.fancybox-container',
          axis: 's',
        },
      },
      t.fancybox.defaults
    );
    r = function (n) {
      this.init(n);
    };
    t.extend(r.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function (n) {
        var t = this,
          i,
          r;
        if (
          ((t.instance = n),
          (n.Thumbs = t),
          (t.opts = n.group[n.currIndex].opts.thumbs),
          (i = n.group[0]),
          (i =
            i.opts.thumb ||
            (i.opts.$thumb && i.opts.$thumb.length
              ? i.opts.$thumb.attr('src')
              : !1)),
          n.group.length > 1 &&
            ((r = n.group[1]),
            (r =
              r.opts.thumb ||
              (r.opts.$thumb && r.opts.$thumb.length
                ? r.opts.$thumb.attr('src')
                : !1))),
          (t.$button = n.$refs.toolbar.find('[data-fancybox-thumbs]')),
          t.opts && i && r)
        ) {
          t.$button.show().on('click', function () {
            t.toggle();
          });
          t.isActive = !0;
        } else t.$button.hide();
      },
      create: function () {
        var n = this,
          u = n.instance,
          f = n.opts.parentEl,
          e = [],
          r;
        if (!n.$grid) {
          n.$grid = t(
            '<div class="' + i + ' ' + i + '-' + n.opts.axis + '"></div>'
          ).appendTo(u.$refs.container.find(f).addBack().filter(f));
          n.$grid.on('click', 'a', function () {
            u.jumpTo(t(this).attr('data-index'));
          });
        }
        n.$list ||
          (n.$list = t('<div class="' + i + '__list">').appendTo(n.$grid));
        t.each(u.group, function (n, t) {
          r =
            t.opts.thumb || (t.opts.$thumb ? t.opts.$thumb.attr('src') : null);
          r || t.type !== 'image' || (r = t.src);
          e.push(
            '<a href="javascript:;" tabindex="0" data-index="' +
              n +
              '" ' +
              (r && r.length
                ? ' style="background-image:url(' + r + ')" />'
                : '') +
              '></a>'
          );
        });
        n.$list[0].innerHTML = e.join('');
        n.opts.axis === 'x' &&
          n.$list.width(
            parseInt(n.$grid.css('padding-right'), 10) +
              u.group.length * n.$list.children().eq(0).outerWidth(!0)
          );
      },
      focus: function (n) {
        var i = this,
          r = i.$list,
          e = i.$grid,
          f,
          t;
        i.instance.current &&
          ((f = r
            .children()
            .removeClass(u)
            .filter('[data-index="' + i.instance.current.index + '"]')
            .addClass(u)),
          (t = f.position()),
          i.opts.axis === 'y' &&
          (t.top < 0 || t.top > r.height() - f.outerHeight())
            ? r.stop().animate({ scrollTop: r.scrollTop() + t.top }, n)
            : i.opts.axis === 'x' &&
              (t.left < e.scrollLeft() ||
                t.left > e.scrollLeft() + (e.width() - f.outerWidth())) &&
              r.parent().stop().animate({ scrollLeft: t.left }, n));
      },
      update: function () {
        var n = this;
        n.instance.$refs.container.toggleClass(
          'fancybox-show-thumbs',
          this.isVisible
        );
        n.isVisible
          ? (n.$grid || n.create(),
            n.instance.trigger('onThumbsShow'),
            n.focus(0))
          : n.$grid && n.instance.trigger('onThumbsHide');
        n.instance.update();
      },
      hide: function () {
        this.isVisible = !1;
        this.update();
      },
      show: function () {
        this.isVisible = !0;
        this.update();
      },
      toggle: function () {
        this.isVisible = !this.isVisible;
        this.update();
      },
    });
    t(n).on({
      'onInit.fb': function (n, t) {
        var i;
        t &&
          !t.Thumbs &&
          ((i = new r(t)), i.isActive && i.opts.autoStart === !0 && i.show());
      },
      'beforeShow.fb': function (n, t, i, r) {
        var u = t && t.Thumbs;
        u && u.isVisible && u.focus(r ? 0 : 250);
      },
      'afterKeydown.fb': function (n, t, i, r, u) {
        var f = t && t.Thumbs;
        f && f.isActive && u === 71 && (r.preventDefault(), f.toggle());
      },
      'beforeClose.fb': function (n, t) {
        var i = t && t.Thumbs;
        i && i.isVisible && i.opts.hideOnClose !== !1 && i.$grid.hide();
      },
    });
  })(document, jQuery),
  (function (n, t) {
    'use strict';
    function i(n) {
      var t = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
      };
      return String(n).replace(/[&<>"'`=\/]/g, function (n) {
        return t[n];
      });
    }
    t.extend(!0, t.fancybox.defaults, {
      btnTpl: {
        share:
          '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
      },
      share: {
        url: function (n, t) {
          return (
            (!n.currentHash && !(t.type === 'inline' || t.type === 'html')
              ? t.origSrc || t.src
              : !1) || window.location
          );
        },
        tpl:
          '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
      },
    });
    t(n).on('click', '[data-fancybox-share]', function () {
      var r = t.fancybox.getInstance(),
        n = r.current || null,
        u,
        f;
      n &&
        (t.type(n.opts.share.url) === 'function' &&
          (u = n.opts.share.url.apply(n, [r, n])),
        (f = n.opts.share.tpl
          .replace(
            /\{\{media\}\}/g,
            n.type === 'image' ? encodeURIComponent(n.src) : ''
          )
          .replace(/\{\{url\}\}/g, encodeURIComponent(u))
          .replace(/\{\{url_raw\}\}/g, i(u))
          .replace(
            /\{\{descr\}\}/g,
            r.$caption ? encodeURIComponent(r.$caption.text()) : ''
          )),
        t.fancybox.open({
          src: r.translate(r, f),
          type: 'html',
          opts: {
            touch: !1,
            animationEffect: !1,
            afterLoad: function (n, t) {
              r.$refs.container.one('beforeClose.fb', function () {
                n.close(null, 0);
              });
              t.$content.find('.fancybox-share__button').click(function () {
                return (
                  window.open(this.href, 'Share', 'width=550, height=450'), !1
                );
              });
            },
            mobile: { autoFocus: !1 },
          },
        }));
    });
  })(document, jQuery),
  (function (n, t, i) {
    'use strict';
    function r() {
      var i = n.location.hash.substr(1),
        t = i.split('-'),
        r =
          t.length > 1 && /^\+?\d+$/.test(t[t.length - 1])
            ? parseInt(t.pop(-1), 10) || 1
            : 1,
        u = t.join('-');
      return { hash: i, index: r < 1 ? 1 : r, gallery: u };
    }
    function u(n) {
      n.gallery !== '' &&
        i("[data-fancybox='" + i.escapeSelector(n.gallery) + "']")
          .eq(n.index - 1)
          .focus()
          .trigger('click.fb-start');
    }
    function f(n) {
      var t, i;
      return n
        ? ((t = n.current ? n.current.opts : n.opts),
          (i =
            t.hash ||
            (t.$orig
              ? t.$orig.data('fancybox') || t.$orig.data('fancybox-trigger')
              : '')),
          i === '' ? !1 : i)
        : !1;
    }
    i.escapeSelector ||
      (i.escapeSelector = function (n) {
        var t = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          i = function (n, t) {
            return t
              ? n === '\0'
                ? '�'
                : n.slice(0, -1) +
                  '\\' +
                  n.charCodeAt(n.length - 1).toString(16) +
                  ' '
              : '\\' + n;
          };
        return (n + '').replace(t, i);
      });
    i(function () {
      if (i.fancybox.defaults.hash !== !1) {
        i(t).on({
          'onInit.fb': function (n, t) {
            var i, u;
            t.group[t.currIndex].opts.hash !== !1 &&
              ((i = r()),
              (u = f(t)),
              u && i.gallery && u == i.gallery && (t.currIndex = i.index - 1));
          },
          'beforeShow.fb': function (i, r, u, e) {
            var o;
            u &&
              u.opts.hash !== !1 &&
              ((o = f(r)), o) &&
              ((r.currentHash =
                o + (r.group.length > 1 ? '-' + (u.index + 1) : '')),
              n.location.hash !== '#' + r.currentHash) &&
              (e && !r.origHash && (r.origHash = n.location.hash),
              r.hashTimer && clearTimeout(r.hashTimer),
              (r.hashTimer = setTimeout(function () {
                'replaceState' in n.history
                  ? (n.history[e ? 'pushState' : 'replaceState'](
                      {},
                      t.title,
                      n.location.pathname +
                        n.location.search +
                        '#' +
                        r.currentHash
                    ),
                    e && (r.hasCreatedHistory = !0))
                  : (n.location.hash = r.currentHash);
                r.hashTimer = null;
              }, 300)));
          },
          'beforeClose.fb': function (i, r, u) {
            u.opts.hash !== !1 &&
              (clearTimeout(r.hashTimer),
              r.currentHash && r.hasCreatedHistory
                ? n.history.back()
                : r.currentHash &&
                  ('replaceState' in n.history
                    ? n.history.replaceState(
                        {},
                        t.title,
                        n.location.pathname +
                          n.location.search +
                          (r.origHash || '')
                      )
                    : (n.location.hash = r.origHash)),
              (r.currentHash = null));
          },
        });
        i(n).on('hashchange.fb', function () {
          var n = r(),
            t = null;
          i.each(i('.fancybox-container').get().reverse(), function (n, r) {
            var u = i(r).data('FancyBox');
            if (u && u.currentHash) return (t = u), !1;
          });
          t
            ? t.currentHash === n.gallery + '-' + n.index ||
              (n.index === 1 && t.currentHash == n.gallery) ||
              ((t.currentHash = null), t.close())
            : n.gallery !== '' && u(n);
        });
        setTimeout(function () {
          i.fancybox.getInstance() || u(r());
        }, 50);
      }
    });
  })(window, document, jQuery),
  (function (n, t) {
    'use strict';
    var i = new Date().getTime();
    t(n).on({
      'onInit.fb': function (n, t, r) {
        t.$refs.stage.on(
          'mousewheel DOMMouseScroll wheel MozMousePixelScroll',
          function (n) {
            var r = t.current,
              u = new Date().getTime();
            t.group.length < 2 ||
              r.opts.wheel === !1 ||
              (r.opts.wheel === 'auto' && r.type !== 'image') ||
              (n.preventDefault(),
              n.stopPropagation(),
              r.$slide.hasClass('fancybox-animated')) ||
              ((n = n.originalEvent || n), u - i < 250) ||
              ((i = u),
              t[
                (-n.deltaY || -n.deltaX || n.wheelDelta || -n.detail) < 0
                  ? 'next'
                  : 'previous'
              ]());
          }
        );
      },
    });
  })(document, jQuery),
  (function (n) {
    var t = {
        init: function (t) {
          var r = {
              maxSize: -1,
              minSize: -1,
              spacing: 5,
              duration: 500,
              isVertical: !1,
              easing: undefined,
              autoResize: !0,
              behavior: null,
              delayMouseIn: 0,
              delayMouseOut: 0,
              selectOnClick: !0,
              deselectOnClick: !1,
              interval: 2500,
              interactive: !0,
            },
            i = n.extend(r, t);
          if (i.minSize !== -1 && i.maxSize !== -1)
            throw new Error(
              'Kwicks options minSize and maxSize may not both be set'
            );
          if (i.behavior && i.behavior !== 'menu' && i.behavior !== 'slideshow')
            throw new Error(
              'Unrecognized Kwicks behavior specified: ' + i.behavior
            );
          return (
            n.each(['minSize', 'maxSize', 'spacing'], function (n, t) {
              var r = i[t];
              switch (typeof r) {
                case 'number':
                  i[t + 'Units'] = 'px';
                  break;
                case 'string':
                  if (r.slice(-1) === '%')
                    (i[t + 'Units'] = '%'), (i[t] = +r.slice(0, -1) / 100);
                  else if (r.slice(-2) === 'px')
                    (i[t + 'Units'] = 'px'), (i[t] = +r.slice(0, -2));
                  else
                    throw new Error(
                      'Invalid value for Kwicks option ' + t + ': ' + r
                    );
                  break;
                default:
                  throw new Error(
                    'Invalid value for Kwicks option ' + t + ': ' + r
                  );
              }
            }),
            this.each(function () {
              n(this).data('kwicks', new Kwick(this, i));
            })
          );
        },
        expand: function (t, i) {
          typeof t == 'object' && ((i = t), (t = undefined));
          var r = (i && i.delay) || 0;
          return this.each(function () {
            var u = n(this),
              i = u.data('kwicks'),
              f,
              e;
            if (i) t = typeof t == 'number' ? t : -1;
            else if ((i = u.parent().data('kwicks'))) t = u.index();
            else return;
            f = function () {
              if (t !== i.expandedIndex) {
                var n = i.$panels,
                  r = n[t] || null;
                i.$container.trigger('expand.kwicks', {
                  index: t,
                  expanded: r,
                  collapsed: n.not(r).get(),
                  oldIndex: i.expandedIndex,
                  oldExpanded: i.getExpandedPanel(),
                  isAnimated: i.isAnimated,
                });
              }
            };
            e = i.$container.data('kwicks-timeout-id');
            e &&
              (i.$container.removeData('kwicks-timeout-id'), clearTimeout(e));
            r > 0
              ? i.$container.data('kwicks-timeout-id', setTimeout(f, r))
              : f();
          });
        },
        expanded: function () {
          var n = this.first().data('kwicks');
          if (n) return n.expandedIndex;
        },
        select: function (t) {
          return this.each(function () {
            var r = n(this),
              i = r.data('kwicks'),
              u,
              f;
            if (i) t = typeof t == 'number' ? t : -1;
            else if ((i = r.parent().data('kwicks'))) t = r.index();
            else return;
            t !== i.selectedIndex &&
              ((u = i.$panels),
              (f = u[t] || null),
              i.$container.trigger('select.kwicks', {
                index: t,
                selected: f,
                unselected: u.not(f).get(),
                oldIndex: i.selectedIndex,
                oldSelected: i.getSelectedPanel(),
              }));
            i.$container.kwicks('expand', t);
          });
        },
        selected: function () {
          var n = this.first().data('kwicks');
          if (n) return n.selectedIndex;
        },
        resize: function () {
          return this.each(function () {
            var i = n(this),
              t = i.data('kwicks');
            t && t.resize();
          });
        },
        destroy: function () {
          return this.each(function () {
            var i = n(this),
              t = i.data('kwicks');
            t && t.destroy();
          });
        },
      },
      Kwick;
    n.fn.kwicks = function (n) {
      if (t[n])
        return t[n].apply(this, Array.prototype.slice.call(arguments, 1));
      else if (typeof n != 'object' && n)
        throw new Error('Unrecognized kwicks method: ' + n);
      else return t.init.apply(this, arguments);
    };
    n.event.special.expand = {
      _default: function (t, i) {
        if (t.namespace === 'kwicks') {
          var r = n(t.target).data('kwicks');
          r && r.expand(i.index);
        }
      },
    };
    n.event.special.select = {
      _default: function (t, i) {
        if (t.namespace === 'kwicks') {
          var r = n(t.target).data('kwicks');
          r && r.select(i.index);
        }
      },
    };
    Kwick = function Kwick(t, i) {
      var r = this,
        u,
        f;
      this.opts = i;
      this.onDestroyHandlers = [];
      u = i.isVertical ? 'vertical' : 'horizontal';
      this.$container = n(t);
      this.$panels = this.$container.children();
      f = ['kwicks', 'kwicks-' + u];
      n.each(f, function (n) {
        if (!r.$container.hasClass(n)) {
          r.$container.addClass(n);
          r.onDestroy(function () {
            r.$container.removeClass(n);
          });
        }
      });
      this.selectedIndex = this.$panels.filter('.kwicks-selected').index();
      this.expandedIndex = this.selectedIndex;
      this.primaryDimension = i.isVertical ? 'height' : 'width';
      this.secondaryDimension = i.isVertical ? 'width' : 'height';
      this.calculatePanelSizes();
      this.primaryAlignment = i.isVertical ? 'top' : 'left';
      this.secondaryAlignment = i.isVertical ? 'bottom' : 'right';
      this.$timer = n({ progress: 0 });
      this.isAnimated = !1;
      this.offsets = this.getOffsetsForExpanded();
      this.updatePanelStyles();
      this.initBehavior();
      this.initWindowResizeHandler();
      setTimeout(function () {
        r.updatePanelStyles();
      }, 100);
    };
    Kwick.prototype.calculatePanelSizes = function () {
      var n = this.opts,
        r = this.getContainerSize(!0);
      this.panelSpacing = n.spacingUnits === '%' ? r * n.spacing : n.spacing;
      var t = this.$panels.length,
        u = this.panelSpacing * (t - 1),
        i = r - u;
      this.panelSize = i / t;
      n.minSize === -1
        ? ((this.panelMaxSize =
            n.maxSize === -1
              ? t < 5
                ? (r / 3) * 2
                : r / 3
              : n.maxSizeUnits === '%'
              ? i * n.maxSize
              : n.maxSize),
          (this.panelMinSize = (i - this.panelMaxSize) / (t - 1)))
        : n.maxSize === -1 &&
          ((this.panelMinSize =
            n.minSizeUnits === '%' ? i * n.minSize : n.minSize),
          (this.panelMaxSize = i - this.panelMinSize * (t - 1)));
    };
    Kwick.prototype.getOffsetsForExpanded = function () {
      for (
        var i = this.expandedIndex,
          f = this.$panels.length,
          t = this.panelSpacing,
          e = this.panelSize,
          r = this.panelMinSize,
          o = this.panelMaxSize,
          u = [0],
          n = 1;
        n < f;
        n++
      )
        u[n] =
          i === -1
            ? n * (e + t)
            : n <= i
            ? n * (r + t)
            : o + r * (n - 1) + n * t;
      return u;
    };
    Kwick.prototype.setStyle = (function () {
      return n.support.style
        ? function (n, t) {
            n.setAttribute('style', t);
          }
        : function (n, t) {
            n.style.cssText = t;
          };
    })();
    Kwick.prototype.updatePanelStyles = function () {
      for (
        var o = this.offsets,
          r = this.$panels,
          f = this.primaryDimension,
          s = this.primaryAlignment,
          h = this.secondaryAlignment,
          c = this.panelSpacing,
          l = this.getContainerSize(),
          a = !this._stylesInited ? 'position:absolute;' : '',
          n,
          t,
          e,
          u,
          i = r.length;
        i--;

      )
        (e = n),
          (n = Math.round(o[i])),
          i === r.length - 1
            ? ((t = l - n), (u = h + ':0;' + f + ':' + t + 'px;'))
            : ((t = e - n - c),
              (u = s + ':' + n + 'px;' + f + ':' + t + 'px;')),
          this.setStyle(r[i], a + u);
      this._stylesInited ||
        (this.$container.addClass('kwicks-processed'),
        (this._stylesInited = !0));
    };
    Kwick.prototype.initBehavior = function () {
      if (this.opts.behavior)
        switch (this.opts.behavior) {
          case 'menu':
            this.initMenuBehavior();
            break;
          case 'slideshow':
            this.initSlideshowBehavior();
            break;
          default:
            throw new Error(
              'Unrecognized behavior option: ' + this.opts.behavior
            );
        }
    };
    Kwick.prototype.initMenuBehavior = function () {
      var i = this,
        t = i.opts;
      (this.addEventHandler(this.$container, 'mouseleave', function () {
        i.$container.kwicks('expand', -1, { delay: t.delayMouseOut });
      }),
      this.addEventHandler(this.$panels, 'mouseenter', function () {
        n(this).kwicks('expand', { delay: t.delayMouseIn });
      }),
      t.selectOnClick || t.deselectOnClick) &&
        this.addEventHandler(this.$panels, 'click', function () {
          var i = n(this),
            r = i.hasClass('kwicks-selected');
          r && t.deselectOnClick
            ? i.parent().kwicks('select', -1)
            : !r && t.selectOnClick && i.kwicks('select');
        });
    };
    Kwick.prototype.initSlideshowBehavior = function () {
      var i = this,
        o = this.$panels.length,
        r = 0,
        t = !1,
        u,
        f = function () {
          t ||
            ((u = setInterval(function () {
              i.$container.kwicks('expand', ++r % o);
            }, i.opts.interval)),
            (t = !0));
        },
        e = function () {
          clearInterval(u);
          t = !1;
        };
      f();
      this.onDestroy(e);
      this.opts.interactive &&
        (this.addEventHandler(this.$container, 'mouseenter', e),
        this.addEventHandler(this.$container, 'mouseleave', f),
        this.addEventHandler(this.$panels, 'mouseenter', function () {
          r = n(this).kwicks('expand').index();
        }));
    };
    Kwick.prototype.initWindowResizeHandler = function () {
      if (this.opts.autoResize) {
        var u = this,
          t = 0,
          i = !1,
          f = n(window),
          r = function (n) {
            n || (i = !1);
            var f = +new Date();
            if (f - t < 20) {
              if (i) return;
              setTimeout(r, 20 - (f - t));
              i = !0;
              return;
            }
            t = f;
            u.resize();
          };
        this.addEventHandler(f, 'resize', r);
      }
    };
    Kwick.prototype.getContainerSize = function (n) {
      var t = this._containerSize;
      return (
        (n || !t) &&
          (t = this._containerSize = this.$container[this.primaryDimension]()),
        t
      );
    };
    Kwick.prototype.getExpandedPanel = function () {
      return this.$panels[this.expandedIndex] || null;
    };
    Kwick.prototype.getCollapsedPanels = function () {
      return this.expandedIndex === -1
        ? []
        : this.$panels.not(this.getExpandedPanel()).get();
    };
    Kwick.prototype.getSelectedPanel = function () {
      return this.$panels[this.selectedIndex] || null;
    };
    Kwick.prototype.getUnselectedPanels = function () {
      return this.$panels.not(this.getSelectedPanel()).get();
    };
    Kwick.prototype.onDestroy = function (n) {
      this.onDestroyHandlers.push(n);
    };
    Kwick.prototype.addEventHandler = function (n, t, i) {
      n.on(t, i);
      this.onDestroy(function () {
        n.off(t, i);
      });
    };
    Kwick.prototype.destroy = function () {
      this.$timer.stop();
      for (var n = 0, t = this.onDestroyHandlers.length; n < t; n++)
        this.onDestroyHandlers[n]();
      this.$panels
        .attr('style', '')
        .removeClass('kwicks-expanded kwicks-selected kwicks-collapsed');
      this.$container.removeClass('kwicks-processed').removeData('kwicks');
    };
    Kwick.prototype.resize = function () {
      this.getContainerSize() !== this.getContainerSize(!0) &&
        (this.calculatePanelSizes(),
        (this.offsets = this.getOffsetsForExpanded()),
        this.isAnimated ? (this._dirtyOffsets = !0) : this.updatePanelStyles());
    };
    Kwick.prototype.select = function (t) {
      t !== this.selectedIndex &&
        (n(this.getSelectedPanel()).removeClass('kwicks-selected'),
        (this.selectedIndex = t),
        n(this.getSelectedPanel()).addClass('kwicks-selected'));
    };
    Kwick.prototype.expand = function (t) {
      var i = this,
        e = this.expandedIndex,
        o = this.getExpandedPanel();
      if ((t === -1 && (t = this.selectedIndex), t !== this.expandedIndex)) {
        n(this.getExpandedPanel()).removeClass('kwicks-expanded');
        n(this.getCollapsedPanels()).removeClass('kwicks-collapsed');
        this.expandedIndex = t;
        n(this.getExpandedPanel()).addClass('kwicks-expanded');
        n(this.getCollapsedPanels()).addClass('kwicks-collapsed');
        var u = this.$timer,
          s = this.$panels.length,
          h = this.offsets.slice(),
          r = this.offsets,
          f = this.getOffsetsForExpanded();
        u.stop()[0].progress = 0;
        this.isAnimated = !0;
        u.animate(
          { progress: 1 },
          {
            duration: this.opts.duration,
            easing: this.opts.easing,
            step: function (n) {
              var t, u, e;
              for (
                i._dirtyOffsets &&
                  ((r = i.offsets),
                  (f = i.getOffsetsForExpanded()),
                  (i._dirtyOffsets = !1)),
                  r.length = 0,
                  t = 0;
                t < s;
                t++
              )
                (u = f[t]), (e = u - (u - h[t]) * (1 - n)), (r[t] = e);
              i.updatePanelStyles();
            },
            complete: function () {
              i.isAnimated = !1;
              i.$container.trigger('expand-complete.kwicks', {
                index: t,
                expanded: i.getExpandedPanel(),
                collapsed: i.getCollapsedPanels(),
                oldIndex: e,
                oldExpanded: o,
                isAnimated: !1,
              });
            },
          }
        );
      }
    };
  })(jQuery),
  (function (n, t) {
    'use strict';
    function e(r, f, e, o, s) {
      function ut() {
        if (
          ((it = n.devicePixelRatio > 1),
          (e = ft(e)),
          f.delay >= 0 &&
            setTimeout(function () {
              d(!0);
            }, f.delay),
          f.delay < 0 || f.combined)
        ) {
          o.e = lt(f.throttle, function (n) {
            n.type === 'resize' && (p = w = -1);
            d(n.all);
          });
          o.a = function (n) {
            n = ft(n);
            e.push.apply(e, n);
          };
          o.g = function () {
            return (e = i(e).filter(function () {
              return !i(this).data(f.loadedName);
            }));
          };
          o.f = function (n) {
            for (var i, t = 0; t < n.length; t++)
              (i = e.filter(function () {
                return this === n[t];
              })),
                i.length && d(!1, i);
          };
          d();
          i(f.appendScroll).on('scroll.' + s + ' resize.' + s, o.e);
        }
      }
      function ft(n) {
        var v = f.defaultImage,
          p = f.placeholder,
          k = f.imageBase,
          s = f.srcsetAttribute,
          l = f.loaderAttribute,
          a = f._f || {},
          e,
          w;
        for (
          n = i(n)
            .filter(function () {
              var n = i(this),
                r = nt(this);
              return (
                !n.data(f.handledName) &&
                (n.attr(f.attribute) || n.attr(s) || n.attr(l) || a[r] !== t)
              );
            })
            .data('plugin_' + f.name, r),
            e = 0,
            w = n.length;
          e < w;
          e++
        ) {
          var u = i(n[e]),
            o = nt(n[e]),
            b = u.attr(f.imageBaseAttribute) || k;
          o === c && b && u.attr(s) && u.attr(s, ct(u.attr(s), b));
          a[o] === t || u.attr(l) || u.attr(l, a[o]);
          o === c && v && !u.attr(h)
            ? u.attr(h, v)
            : o !== c &&
              p &&
              (!u.css(y) || u.css(y) === 'none') &&
              u.css(y, "url('" + p + "')");
        }
        return n;
      }
      function d(n, t) {
        var o;
        if (!e.length) {
          f.autoDestroy && r.destroy();
          return;
        }
        var s = t || e,
          w = !1,
          g = f.imageBase || '',
          k = f.srcsetAttribute,
          l = f.handledName;
        for (o = 0; o < s.length; o++)
          if (n || t || ot(s[o])) {
            var u = i(s[o]),
              a = nt(s[o]),
              v = u.attr(f.attribute),
              p = u.attr(f.imageBaseAttribute) || g,
              d = u.attr(f.loaderAttribute);
            !u.data(l) &&
              (!f.visibleOnly || u.is(':visible')) &&
              (((v || u.attr(k)) &&
                ((a === c &&
                  (p + v !== u.attr(h) || u.attr(k) !== u.attr(b))) ||
                  (a !== c && p + v !== u.css(y)))) ||
                d) &&
              ((w = !0), u.data(l, !0), et(u, a, p, d));
          }
        w &&
          (e = i(e).filter(function () {
            return !i(this).data(l);
          }));
      }
      function et(n, t, r, u) {
        var o, s, e, w;
        ++g;
        o = function () {
          l('onError', n);
          tt();
          o = i.noop;
        };
        l('beforeLoad', n);
        var d = f.attribute,
          nt = f.srcsetAttribute,
          p = f.sizesAttribute,
          ut = f.retinaAttribute,
          ft = f.removeAttribute,
          et = f.loadedName,
          ot = n.attr(ut);
        if (u) {
          s = function () {
            ft && n.removeAttr(f.loaderAttribute);
            n.data(et, !0);
            l(rt, n);
            setTimeout(tt, 1);
            s = i.noop;
          };
          n.off(v).one(v, o).one(a, s);
          l(u, n, function (t) {
            t ? (n.off(a), s()) : (n.off(v), o());
          }) || n.trigger(v);
        } else {
          e = i(new Image());
          e.one(v, o).one(a, function () {
            n.hide();
            t === c
              ? n.attr(k, e.attr(k)).attr(b, e.attr(b)).attr(h, e.attr(h))
              : n.css(y, "url('" + e.attr(h) + "')");
            n[f.effect](f.effectTime);
            ft &&
              (n.removeAttr(
                d + ' ' + nt + ' ' + ut + ' ' + f.imageBaseAttribute
              ),
              p !== k && n.removeAttr(p));
            n.data(et, !0);
            l(rt, n);
            e.remove();
            tt();
          });
          w = (it && ot ? ot : n.attr(d)) || '';
          e.attr(k, n.attr(p))
            .attr(b, n.attr(nt))
            .attr(h, w ? r + w : null);
          e.complete && e.trigger(a);
        }
      }
      function ot(n) {
        var t = n.getBoundingClientRect(),
          r = f.scrollDirection,
          i = f.threshold,
          u = ht() + i > t.top && -i < t.bottom,
          e = st() + i > t.left && -i < t.right;
        if (r === 'vertical') return u;
        else if (r === 'horizontal') return e;
        return u && e;
      }
      function st() {
        return p >= 0 ? p : (p = i(n).width());
      }
      function ht() {
        return w >= 0 ? w : (w = i(n).height());
      }
      function nt(n) {
        return n.tagName.toLowerCase();
      }
      function ct(n, t) {
        var r, i, u;
        if (t)
          for (r = n.split(','), n = '', i = 0, u = r.length; i < u; i++)
            n += t + r[i].trim() + (i !== u - 1 ? ',' : '');
        return n;
      }
      function lt(n, t) {
        var i,
          u = 0;
        return function (e, o) {
          function h() {
            u = +new Date();
            t.call(r, e);
          }
          var s = +new Date() - u;
          i && clearTimeout(i);
          s > n || !f.enableThrottle || o ? h() : (i = setTimeout(h, n - s));
        };
      }
      function tt() {
        --g;
        e.length || g || l('onFinishedAll');
      }
      function l(n, t, i) {
        return (n = f[n]) ? (n.apply(r, [].slice.call(arguments, 1)), !0) : !1;
      }
      var g = 0,
        p = -1,
        w = -1,
        it = !1,
        rt = 'afterLoad',
        a = 'load',
        v = 'error',
        c = 'img',
        h = 'src',
        b = 'srcset',
        k = 'sizes',
        y = 'background-image';
      if (f.bind === 'event' || u) ut();
      else i(n).on(a + '.' + s, ut);
    }
    function r(r, u) {
      var o = this,
        h = i.extend({}, o.config, u),
        s = {},
        c = h.name + '-' + ++f;
      return (
        (o.config = function (n, i) {
          return i === t ? h[n] : ((h[n] = i), o);
        }),
        (o.addItems = function (n) {
          return s.a && s.a(i.type(n) === 'string' ? i(n) : n), o;
        }),
        (o.getItems = function () {
          return s.g ? s.g() : {};
        }),
        (o.update = function (n) {
          return s.e && s.e({}, !n), o;
        }),
        (o.force = function (n) {
          return s.f && s.f(i.type(n) === 'string' ? i(n) : n), o;
        }),
        (o.loadAll = function () {
          return s.e && s.e({ all: !0 }, !0), o;
        }),
        (o.destroy = function () {
          return (
            i(h.appendScroll).off('.' + c, s.e), i(n).off('.' + c), (s = {}), t
          );
        }),
        e(o, h, r, s, c),
        h.chainable ? r : o
      );
    }
    var i = n.jQuery || n.Zepto,
      f = 0,
      u = !1;
    i.fn.Lazy = i.fn.lazy = function (n) {
      return new r(this, n);
    };
    i.Lazy = i.lazy = function (n, u, f) {
      var e, h, o, c, s, l;
      if ((i.isFunction(u) && ((f = u), (u = [])), i.isFunction(f))) {
        for (
          n = i.isArray(n) ? n : [n],
            u = i.isArray(u) ? u : [u],
            e = r.prototype.config,
            h = e._f || (e._f = {}),
            o = 0,
            c = n.length;
          o < c;
          o++
        )
          (e[n[o]] === t || i.isFunction(e[n[o]])) && (e[n[o]] = f);
        for (s = 0, l = u.length; s < l; s++) h[u[s]] = n[0];
      }
    };
    r.prototype.config = {
      name: 'lazy',
      chainable: !0,
      autoDestroy: !0,
      bind: 'load',
      threshold: 500,
      visibleOnly: !1,
      appendScroll: n,
      scrollDirection: 'both',
      imageBase: null,
      defaultImage:
        'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      placeholder: null,
      delay: -1,
      combined: !1,
      attribute: 'data-src',
      srcsetAttribute: 'data-srcset',
      sizesAttribute: 'data-sizes',
      retinaAttribute: 'data-retina',
      loaderAttribute: 'data-loader',
      imageBaseAttribute: 'data-imagebase',
      removeAttribute: !0,
      handledName: 'handled',
      loadedName: 'loaded',
      effect: 'show',
      effectTime: 0,
      enableThrottle: !0,
      throttle: 250,
      beforeLoad: t,
      afterLoad: t,
      onError: t,
      onFinishedAll: t,
    };
    i(n).on('load', function () {
      u = !0;
    });
  })(window),
  (function (n) {
    function t(t, i, r, u) {
      u = u ? u.toUpperCase() : 'GET';
      var f;
      (u === 'POST' || u === 'PUT') &&
        t.config('ajaxCreateData') &&
        (f = t.config('ajaxCreateData').apply(t, [i]));
      n.ajax({
        url: i.attr('data-src'),
        type: u === 'POST' || u === 'PUT' ? u : 'GET',
        data: f,
        dataType: i.attr('data-type') || 'html',
        success: function (n) {
          i.html(n);
          r(!0);
          t.config('removeAttribute') &&
            i.removeAttr('data-src data-method data-type');
        },
        error: function () {
          r(!1);
        },
      });
    }
    n.lazy('ajax', function (n, i) {
      t(this, n, i, n.attr('data-method'));
    });
    n.lazy('get', function (n, i) {
      t(this, n, i, 'GET');
    });
    n.lazy('post', function (n, i) {
      t(this, n, i, 'POST');
    });
    n.lazy('put', function (n, i) {
      t(this, n, i, 'PUT');
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    n.lazy(['av', 'audio', 'video'], ['audio', 'video'], function (t, i) {
      var f = t[0].tagName.toLowerCase();
      if (f === 'audio' || f === 'video') {
        var r = 'data-src',
          u = t.find(r),
          e = t.find('data-track'),
          h = 0,
          o = function () {
            ++h === u.length && i(!1);
          },
          s = function () {
            var t = n(this),
              u = t[0].tagName.toLowerCase(),
              f = t.prop('attributes'),
              i = n(u === r ? '<source>' : '<track>');
            if (u === r) i.one('error', o);
            n.each(f, function (n, t) {
              i.attr(t.name, t.value);
            });
            t.replaceWith(i);
          };
        t.one('loadedmetadata', function () {
          i(!0);
        })
          .off('load error')
          .attr('poster', t.attr('data-poster'));
        u.length
          ? u.each(s)
          : t.attr(r)
          ? (n.each(t.attr(r).split(','), function (i, r) {
              var u = r.split('|');
              t.append(
                n('<source>')
                  .one('error', o)
                  .attr({ src: u[0].trim(), type: u[1].trim() })
              );
            }),
            this.config('removeAttribute') && t.removeAttr(r))
          : i(!1);
        e.length && e.each(s);
      } else i(!1);
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    n.lazy(['frame', 'iframe'], 'iframe', function (t, i) {
      var f = this;
      if (t[0].tagName.toLowerCase() === 'iframe') {
        var r = 'data-src',
          u = 'data-error-detect',
          e = t.attr(u);
        e !== 'true' && e !== '1'
          ? (t.attr('src', t.attr(r)),
            f.config('removeAttribute') && t.removeAttr(r + ' ' + u))
          : n.ajax({
              url: t.attr(r),
              dataType: 'html',
              crossDomain: !0,
              xhrFields: { withCredentials: !0 },
              success: function (n) {
                t.html(n).attr('src', t.attr(r));
                f.config('removeAttribute') && t.removeAttr(r + ' ' + u);
              },
              error: function () {
                i(!1);
              },
            });
      } else i(!1);
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    n.lazy('noop', function () {});
    n.lazy('noop-success', function (n, t) {
      t(!0);
    });
    n.lazy('noop-error', function (n, t) {
      t(!1);
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    function e(i, r, u) {
      var e = i.prop('attributes'),
        f = n('<' + r + '>');
      return (
        n.each(e, function (n, i) {
          (i.name === 'srcset' || i.name === t) && (i.value = s(i.value, u));
          f.attr(i.name, i.value);
        }),
        i.replaceWith(f),
        f
      );
    }
    function o(t, i, r) {
      var u = n('<img>')
        .one('load', function () {
          r(!0);
        })
        .one('error', function () {
          r(!1);
        })
        .appendTo(t)
        .attr('src', i);
      u.complete && u.load();
    }
    function s(n, t) {
      var r, i, u;
      if (t)
        for (r = n.split(','), n = '', i = 0, u = r.length; i < u; i++)
          n += t + r[i].trim() + (i !== u - 1 ? ',' : '');
      return n;
    }
    var t = 'data-src',
      i = 'data-srcset',
      r = 'data-media',
      u = 'data-sizes',
      f = 'data-type';
    n.lazy(['pic', 'picture'], ['picture'], function (h, c) {
      var y = h[0].tagName.toLowerCase();
      if (y === 'picture') {
        var v = h.find(t),
          l = h.find('data-img'),
          a = this.config('imageBase') || '';
        if (v.length)
          if (
            (v.each(function () {
              e(n(this), 'source', a);
            }),
            l.length === 1)
          ) {
            l = e(l, 'img', a);
            l.on('load', function () {
              c(!0);
            }).on('error', function () {
              c(!1);
            });
            l.attr('src', l.attr(t));
            this.config('removeAttribute') && l.removeAttr(t);
          } else
            h.attr(t)
              ? (o(h, a + h.attr(t), c),
                this.config('removeAttribute') && h.removeAttr(t))
              : c(!1);
        else
          h.attr(i)
            ? (n('<source>')
                .attr({
                  media: h.attr(r),
                  sizes: h.attr(u),
                  type: h.attr(f),
                  srcset: s(h.attr(i), a),
                })
                .appendTo(h),
              o(h, a + h.attr(t), c),
              this.config('removeAttribute') &&
                h.removeAttr(t + ' ' + i + ' ' + r + ' ' + u + ' ' + f))
            : c(!1);
      } else c(!1);
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    n.lazy(['js', 'javascript', 'script'], 'script', function (n, t) {
      n[0].tagName.toLowerCase() === 'script'
        ? (n.attr('src', n.attr('data-src')),
          this.config('removeAttribute') && n.removeAttr('data-src'))
        : t(!1);
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    n.lazy('vimeo', function (n, t) {
      n[0].tagName.toLowerCase() === 'iframe'
        ? (n.attr(
            'src',
            'https://player.vimeo.com/video/' + n.attr('data-src')
          ),
          this.config('removeAttribute') && n.removeAttr('data-src'))
        : t(!1);
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    n.lazy(['yt', 'youtube'], function (n, t) {
      if (n[0].tagName.toLowerCase() === 'iframe') {
        var i = /1|true/.test(n.attr('data-nocookie'));
        n.attr(
          'src',
          'https://www.youtube' +
            (i ? '-nocookie' : '') +
            '.com/embed/' +
            n.attr('data-src') +
            '?rel=0&amp;showinfo=0'
        );
        this.config('removeAttribute') && n.removeAttr('data-src');
      } else t(!1);
    });
  })(window.jQuery || window.Zepto),
  (function (n) {
    n.TWScroller = function (t, i) {
      this.element = n(t);
      this.options = n.extend({}, n.fn.twscroller.defaults, i);
      this.init();
    };
    n.TWScroller.prototype = {
      init: function () {
        ((this.mainDiv = n('#' + this.options.id)), this.mainDiv.length != 0) &&
          (this.mainDiv.css({ overflow: 'hidden' }).hover(
            function () {
              this._hoverstate = 'over';
            },
            function () {
              this._hoverstate = 'out';
            }
          ),
          this.options.msgsource == 'inline'
            ? this.setupticker(this.options)
            : this.getajaxcontent(this.options));
      },
      setupticker: function (t) {
        t = n.extend({}, this.options, t);
        var i = this;
        this.messages = this.mainDiv.find('div.' + t.msgclass).hide();
        this.currentmsg = Math.min(
          parseInt(this.getCookie(t.id) || 0),
          this.messages.length - 1
        );
        this.messages.hide().eq(this.currentmsg).fadeIn(t.animateduration);
        setTimeout(function () {
          i.rotate(t);
        }, t.rotatespeed);
        n(window).bind('unload', function () {
          i.cleanup(t);
        });
      },
      getajaxcontent: function (t) {
        this.mainDiv.html(this.loadingtext);
        n.ajax({
          url: t.msgsource,
          error: function (n) {
            this.mainDiv.html(
              'Error fetching content.<br />Server Response: ' + n.responseText
            );
          },
          success: function (n) {
            this.mainDiv.html(n);
            this.setupticker(t);
          },
        });
      },
      getCookie: function (n) {
        var t = new RegExp(n + '=[^;]+', 'i');
        return document.cookie.match(t)
          ? document.cookie.match(t)[0].split('=')[1]
          : null;
      },
      setCookie: function (n, t) {
        document.cookie = n + '=' + t;
      },
      cleanup: function (n) {
        this.setCookie(n.id, this.currentmsg);
      },
      rotate: function (t) {
        t = n.extend({}, this.options, t);
        var i = this;
        this.mainDiv.get(0)._hoverstate == 'over'
          ? setTimeout(function () {
              i.rotate(t);
            }, t.rotatespeed)
          : this.messages
              .eq(this.currentmsg)
              .fadeOut(t.animateduration, function () {
                i.currentmsg =
                  i.currentmsg < i.messages.length - 1 ? i.currentmsg + 1 : 0;
                i.messages
                  .eq(i.currentmsg)
                  .fadeIn(t.animateduration, function () {
                    setTimeout(function () {
                      i.rotate(t);
                    }, t.rotatespeed);
                  });
              });
      },
    };
    n.fn.twscroller = function (t) {
      var i = n.extend({}, n.fn.twscroller.defaults, t);
      this.each(function () {
        new n.TWScroller(this, i);
      });
    };
    n.fn.twscroller.defaults = {
      loadingtext: '<em>Fetching Scroller Contents. Please wait...</em>',
      id: 'myhtmlticker',
      rotatespeed: 3e3,
      animateduration: 1e3,
      msgclass: 'scrollermessage',
      msgsource: 'inline',
    };
  })(jQuery),
  (function () {
    'use strict';
    function w(n, t, i) {
      var r = new y(t);
      switch (n) {
        case 'open':
          r.open(i);
          break;
        case 'close':
          r.close(i);
          break;
        case 'toggle':
          r.toggle(i);
          break;
        default:
          p.error('Method ' + n + ' does not exist on jQuery.sidr');
          break;
      }
    }
    function v(t) {
      if (t === 'status') return n;
      else if (s[t])
        return s[t].apply(this, Array.prototype.slice.call(arguments, 1));
      else if (typeof t != 'function' && typeof t != 'string' && t)
        b.error('Method ' + t + ' does not exist on jQuery.sidr');
      else return s.toggle.apply(this, arguments);
    }
    function k(n, r) {
      var e, u, o, f;
      return (
        typeof r.source == 'function'
          ? ((e = r.source(name)), n.html(e))
          : typeof r.source == 'string' && i.isUrl(r.source)
          ? t.get(r.source, function (t) {
              n.html(t);
            })
          : typeof r.source == 'string'
          ? ((u = ''),
            (o = r.source.split(',')),
            t.each(o, function (n, i) {
              u += '<div class="sidr-inner">' + t(i).html() + '</div>';
            }),
            r.renaming &&
              ((f = t('<div />').html(u)),
              f.find('*').each(function (n, r) {
                var u = t(r);
                i.addPrefixes(u);
              }),
              (u = f.html())),
            n.html(u))
          : r.source !== null && t.error('Invalid Sidr Source'),
        n
      );
    }
    function d(r) {
      var o = i.transitions,
        u = t.extend(
          {
            name: 'sidr',
            speed: 200,
            side: 'left',
            source: null,
            renaming: !0,
            body: 'body',
            displace: !0,
            timing: 'ease',
            method: 'toggle',
            bind: 'touchstart click',
            onOpen: function onOpen() {},
            onClose: function onClose() {},
            onOpenEnd: function onOpenEnd() {},
            onCloseEnd: function onCloseEnd() {},
          },
          r
        ),
        e = u.name,
        f = t('#' + e);
      return (
        f.length === 0 && (f = t('<div />').attr('id', e).appendTo(t('body'))),
        o.supported &&
          f.css(o.property, u.side + ' ' + u.speed / 1e3 + 's ' + u.timing),
        f.addClass('sidr').addClass(u.side).data({
          speed: u.speed,
          side: u.side,
          body: u.body,
          displace: u.displace,
          timing: u.timing,
          method: u.method,
          onOpen: u.onOpen,
          onClose: u.onClose,
          onOpenEnd: u.onOpenEnd,
          onCloseEnd: u.onCloseEnd,
        }),
        (f = k(f, u)),
        this.each(function () {
          var i = t(this),
            f = i.data('sidr'),
            r = !1;
          f ||
            ((n.moving = !1),
            (n.opened = !1),
            i.data('sidr', e),
            i.bind(u.bind, function (n) {
              n.preventDefault();
              r ||
                ((r = !0),
                setTimeout(function () {
                  v(u.method, e);
                }, 200),
                setTimeout(function () {
                  r = !1;
                }, 300));
            }));
        })
      );
    }
    var u = {},
      t;
    u.classCallCheck = function (n, t) {
      if (!(n instanceof t))
        throw new TypeError('Cannot call a class as a function - Marcus Test');
    };
    u.createClass = (function () {
      function n(n, t) {
        for (var i, r = 0; r < t.length; r++)
          (i = t[r]),
            (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(n, i.key, i);
      }
      return function (t, i, r) {
        return i && n(t.prototype, i), r && n(t, r), t;
      };
    })();
    u;
    for (
      var n = { moving: !1, opened: !1 },
        i = {
          isUrl: function isUrl(n) {
            var t = new RegExp(
              '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
              'i'
            );
            return t.test(n) ? !0 : !1;
          },
          addPrefixes: function addPrefixes(n) {
            this.addPrefix(n, 'id');
            this.addPrefix(n, 'class');
            n.removeAttr('style');
          },
          addPrefix: function addPrefix(n, t) {
            var i = n.attr(t);
            typeof i == 'string' &&
              i !== '' &&
              i !== 'sidr-inner' &&
              n.attr(t, i.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-' + t + '-$1'));
          },
          transitions: (function () {
            var r = document.body || document.documentElement,
              i = r.style,
              t = !1,
              n = 'transition';
            return (
              (n in i)
                ? (t = !0)
                : (function () {
                    var f = ['moz', 'webkit', 'o', 'ms'],
                      u = undefined,
                      r = undefined;
                    n = n.charAt(0).toUpperCase() + n.substr(1);
                    t = (function () {
                      for (r = 0; r < f.length; r++)
                        if (((u = f[r]), (u + n in i))) return !0;
                      return !1;
                    })();
                    n = t
                      ? '-' + u.toLowerCase() + '-' + n.toLowerCase()
                      : null;
                  })(),
              { supported: t, property: n }
            );
          })(),
        },
        f = jQuery,
        h = 'sidr-animating',
        e = 'open',
        l = 'close',
        r =
          'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        y = (function () {
          function t(n) {
            u.classCallCheck(this, t);
            this.name = n;
            this.item = f('#' + n);
            this.openClass =
              n === 'sidr' ? 'sidr-open' : 'sidr-open ' + n + '-open';
            this.menuWidth = this.item.outerWidth(!0);
            this.speed = this.item.data('speed');
            this.side = this.item.data('side');
            this.displace = this.item.data('displace');
            this.timing = this.item.data('timing');
            this.method = this.item.data('method');
            this.onOpenCallback = this.item.data('onOpen');
            this.onCloseCallback = this.item.data('onClose');
            this.onOpenEndCallback = this.item.data('onOpenEnd');
            this.onCloseEndCallback = this.item.data('onCloseEnd');
            this.body = f(this.item.data('body'));
          }
          return (
            u.createClass(t, [
              {
                key: 'getAnimation',
                value: function getAnimation(n, t) {
                  var i = {},
                    r = this.side;
                  return (
                    (i[r] =
                      n === 'open' && t === 'body'
                        ? this.menuWidth + 'px'
                        : n === 'close' && t === 'menu'
                        ? '-' + this.menuWidth + 'px'
                        : 0),
                    i
                  );
                },
              },
              {
                key: 'prepareBody',
                value: function prepareBody(n) {
                  var r = n === 'open' ? 'hidden' : '',
                    t,
                    i;
                  this.body.is('body') &&
                    ((t = f('html')),
                    (i = t.scrollTop()),
                    t.css('overflow-x', r).scrollTop(i));
                },
              },
              {
                key: 'openBody',
                value: function openBody() {
                  var t, n, r;
                  this.displace &&
                    ((t = i.transitions),
                    (n = this.body),
                    t.supported
                      ? (n
                          .css(
                            t.property,
                            this.side +
                              ' ' +
                              this.speed / 1e3 +
                              's ' +
                              this.timing
                          )
                          .css(this.side, 0)
                          .css({ width: n.width(), position: 'absolute' }),
                        n.css(this.side, this.menuWidth + 'px'))
                      : ((r = this.getAnimation(e, 'body')),
                        n
                          .css({ width: n.width(), position: 'absolute' })
                          .animate(r, { queue: !1, duration: this.speed })));
                },
              },
              {
                key: 'onCloseBody',
                value: function onCloseBody() {
                  var n = i.transitions,
                    t = { width: '', position: '', right: '', left: '' };
                  n.supported && (t[n.property] = '');
                  this.body.css(t).unbind(r);
                },
              },
              {
                key: 'closeBody',
                value: function closeBody() {
                  var n = this,
                    t;
                  if (this.displace)
                    if (i.transitions.supported)
                      this.body.css(this.side, 0).one(r, function () {
                        n.onCloseBody();
                      });
                    else
                      (t = this.getAnimation(l, 'body')),
                        this.body.animate(t, {
                          queue: !1,
                          duration: this.speed,
                          complete: function complete() {
                            n.onCloseBody();
                          },
                        });
                },
              },
              {
                key: 'moveBody',
                value: function moveBody(n) {
                  n === e ? this.openBody() : this.closeBody();
                },
              },
              {
                key: 'onOpenMenu',
                value: function onOpenMenu(t) {
                  var i = this.name;
                  n.moving = !1;
                  n.opened = i;
                  this.item.unbind(r);
                  this.body.removeClass(h).addClass(this.openClass);
                  this.onOpenEndCallback();
                  typeof t == 'function' && t(i);
                },
              },
              {
                key: 'openMenu',
                value: function openMenu(n) {
                  var t = this,
                    u = this.item,
                    f;
                  if (i.transitions.supported)
                    u.css(this.side, 0).one(r, function () {
                      t.onOpenMenu(n);
                    });
                  else
                    (f = this.getAnimation(e, 'menu')),
                      u.css('display', 'block').animate(f, {
                        queue: !1,
                        duration: this.speed,
                        complete: function complete() {
                          t.onOpenMenu(n);
                        },
                      });
                },
              },
              {
                key: 'onCloseMenu',
                value: function onCloseMenu(t) {
                  this.item.css({ left: '', right: '' }).unbind(r);
                  f('html').css('overflow-x', '');
                  n.moving = !1;
                  n.opened = !1;
                  this.body.removeClass(h).removeClass(this.openClass);
                  this.onCloseEndCallback();
                  typeof t == 'function' && t(name);
                },
              },
              {
                key: 'closeMenu',
                value: function closeMenu(n) {
                  var t = this,
                    u = this.item,
                    f;
                  if (i.transitions.supported)
                    u.css(this.side, '').one(r, function () {
                      t.onCloseMenu(n);
                    });
                  else
                    (f = this.getAnimation(l, 'menu')),
                      u.animate(f, {
                        queue: !1,
                        duration: this.speed,
                        complete: function complete() {
                          t.onCloseMenu();
                        },
                      });
                },
              },
              {
                key: 'moveMenu',
                value: function moveMenu(n, t) {
                  this.body.addClass(h);
                  n === e ? this.openMenu(t) : this.closeMenu(t);
                },
              },
              {
                key: 'move',
                value: function move(t, i) {
                  n.moving = !0;
                  this.prepareBody(t);
                  this.moveBody(t);
                  this.moveMenu(t, i);
                },
              },
              {
                key: 'open',
                value: function open(i) {
                  var u = this,
                    r;
                  if (n.opened !== this.name && !n.moving) {
                    if (n.opened !== !1) {
                      r = new t(n.opened);
                      r.close(function () {
                        u.open(i);
                      });
                      return;
                    }
                    this.move('open', i);
                    this.onOpenCallback();
                  }
                },
              },
              {
                key: 'close',
                value: function close(t) {
                  n.opened !== this.name ||
                    n.moving ||
                    (this.move('close', t), this.onCloseCallback());
                },
              },
              {
                key: 'toggle',
                value: function toggle(t) {
                  n.opened === this.name ? this.close(t) : this.open(t);
                },
              },
            ]),
            t
          );
        })(),
        p = jQuery,
        b = jQuery,
        a = ['open', 'close', 'toggle'],
        c,
        s = {},
        getMethod = function getMethod(n) {
          return function (t, i) {
            typeof t == 'function'
              ? ((i = t), (t = 'sidr'))
              : t || (t = 'sidr');
            w(n, t, i);
          };
        },
        o = 0;
      o < a.length;
      o++
    )
      (c = a[o]), (s[c] = getMethod(c));
    t = jQuery;
    jQuery.sidr = v;
    jQuery.fn.sidr = d;
  })(),
  (function (n) {
    'use strict';
    var t = (function () {
      var t = {
          bcClass: 'sf-breadcrumb',
          menuClass: 'sf-js-enabled',
          anchorClass: 'sf-with-ul',
          menuArrowClass: 'sf-arrows',
        },
        f = (function () {
          var t = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          return (
            t &&
              n(window).load(function () {
                n('body').children().on('click', n.noop);
              }),
            t
          );
        })(),
        l = (function () {
          var n = document.documentElement.style;
          return (
            'behavior' in n &&
            'fill' in n &&
            /iemobile/i.test(navigator.userAgent)
          );
        })(),
        e = function (n, i) {
          var r = t.menuClass;
          i.cssArrows && (r += ' ' + t.menuArrowClass);
          n.toggleClass(r);
        },
        a = function (i, r) {
          return i
            .find('li.' + r.pathClass)
            .slice(0, r.pathLevels)
            .addClass(r.hoverClass + ' ' + t.bcClass)
            .filter(function () {
              return n(this).children(r.popUpSelector).hide().show().length;
            })
            .removeClass(r.pathClass);
        },
        o = function (n) {
          n.children('a').toggleClass(t.anchorClass);
        },
        s = function (n) {
          var t = n.css('ms-touch-action');
          t = t === 'pan-y' ? 'auto' : 'pan-y';
          n.css('ms-touch-action', t);
        },
        v = function (t, r) {
          var o = 'li:has(' + r.popUpSelector + ')',
            e;
          if (n.fn.hoverIntent && !r.disableHI) t.hoverIntent(i, u, o);
          else
            t.on('mouseenter.superfish', o, i).on('mouseleave.superfish', o, u);
          e = 'MSPointerDown.superfish';
          f || (e += ' touchend.superfish');
          l && (e += ' mousedown.superfish');
          t.on('focusin.superfish', 'li', i)
            .on('focusout.superfish', 'li', u)
            .on(e, 'a', r, y);
        },
        y = function (t) {
          var r = n(this),
            u = r.siblings(t.data.popUpSelector);
          if (u.length > 0 && u.is(':hidden')) {
            r.one('click.superfish', !1);
            t.type === 'MSPointerDown'
              ? r.trigger('focus')
              : n.proxy(i, r.parent('li'))();
          }
        },
        i = function () {
          var t = n(this),
            i = r(t);
          clearTimeout(i.sfTimer);
          t.siblings().superfish('hide').end().superfish('show');
        },
        u = function () {
          var i = n(this),
            t = r(i);
          f
            ? n.proxy(h, i, t)()
            : (clearTimeout(t.sfTimer),
              (t.sfTimer = setTimeout(n.proxy(h, i, t), t.delay)));
        },
        h = function (t) {
          t.retainPath = n.inArray(this[0], t.$path) > -1;
          this.superfish('hide');
          this.parents('.' + t.hoverClass).length ||
            (t.onIdle.call(c(this)), t.$path.length && n.proxy(i, t.$path)());
        },
        c = function (n) {
          return n.closest('.' + t.menuClass);
        },
        r = function (n) {
          return c(n).data('sf-options');
        };
      return {
        hide: function (t) {
          var u, i;
          if (this.length) {
            if (((u = this), (i = r(u)), !i)) return this;
            var o = i.retainPath === !0 ? i.$path : '',
              f = u
                .find('li.' + i.hoverClass)
                .add(this)
                .not(o)
                .removeClass(i.hoverClass)
                .children(i.popUpSelector),
              e = i.speedOut;
            t && (f.show(), (e = 0));
            i.retainPath = !1;
            i.onBeforeHide.call(f);
            f.stop(!0, !0).animate(i.animationOut, e, function () {
              var t = n(this);
              i.onHide.call(t);
            });
          }
          return this;
        },
        show: function () {
          var n = r(this),
            i,
            t;
          return n
            ? ((i = this.addClass(n.hoverClass)),
              (t = i.children(n.popUpSelector)),
              n.onBeforeShow.call(t),
              t.stop(!0, !0).animate(n.animation, n.speed, function () {
                n.onShow.call(t);
              }),
              this)
            : this;
        },
        destroy: function () {
          return this.each(function () {
            var r = n(this),
              i = r.data('sf-options'),
              u;
            if (!i) return !1;
            u = r.find(i.popUpSelector).parent('li');
            clearTimeout(i.sfTimer);
            e(r, i);
            o(u);
            s(r);
            r.off('.superfish').off('.hoverIntent');
            u.children(i.popUpSelector).attr('style', function (n, t) {
              if (t && t != 'undefined' && t != null)
                return t.replace(/display[^;]+;?/g, '');
            });
            i.$path
              .removeClass(i.hoverClass + ' ' + t.bcClass)
              .addClass(i.pathClass);
            r.find('.' + i.hoverClass).removeClass(i.hoverClass);
            i.onDestroy.call(r);
            r.removeData('sf-options');
          });
        },
        init: function (i) {
          return this.each(function () {
            var u = n(this),
              r,
              f;
            if (u.data('sf-options')) return !1;
            r = n.extend({}, n.fn.superfish.defaults, i);
            f = u.find(r.popUpSelector).parent('li');
            r.$path = a(u, r);
            u.data('sf-options', r);
            e(u, r);
            o(f);
            s(u);
            v(u, r);
            f.not('.' + t.bcClass).superfish('hide', !0);
            r.onInit.call(this);
          });
        },
      };
    })();
    n.fn.superfish = function (i, r) {
      return t[i]
        ? t[i].apply(this, Array.prototype.slice.call(arguments, 1))
        : typeof i != 'object' && i
        ? n.error('Method ' + i + ' does not exist on jQuery.fn.superfish')
        : t.init.apply(this, arguments);
    };
    n.fn.superfish.defaults = {
      popUpSelector: 'ul,.sf-mega',
      hoverClass: 'sfHover',
      pathClass: 'overrideThisToUse',
      pathLevels: 1,
      delay: 800,
      animation: { opacity: 'show' },
      animationOut: { opacity: 'hide' },
      speed: 'normal',
      speedOut: 'fast',
      cssArrows: !0,
      disableHI: !1,
      onInit: n.noop,
      onBeforeShow: n.noop,
      onShow: n.noop,
      onBeforeHide: n.noop,
      onHide: n.noop,
      onIdle: n.noop,
      onDestroy: n.noop,
    };
    n.fn.extend({ hideSuperfishUl: t.hide, showSuperfishUl: t.show });
  })(jQuery);
$(document).ready(function () {
  if (
    ($('#rowDisabledJS').hide(),
    $('label').each(function () {
      $(this).click(function () {
        $("input[id$='" + $(this).attr('for') + "']").focus();
        $("select[id$='" + $(this).attr('for') + "']").focus();
        $("textarea[id$='" + $(this).attr('for') + "']").focus();
      });
    }),
    $('#slider').length != 0 && $('#header').css('background-image', 'none'),
    $('#FormBespoke')
      .find('input')
      .each(function () {
        $(this).attr('name', $(this).attr('id'));
      }),
    $('#FormBespoke')
      .find('select')
      .each(function () {
        $(this).attr('name', $(this).attr('id'));
      }),
    $('#FormBespoke')
      .find('textarea')
      .each(function () {
        $(this).attr('name', $(this).attr('id'));
      }),
    $.browser.msie &&
      ($.browser.version == '6.0' ||
        $.browser.version == '7.0' ||
        $.browser.version == '8.0' ||
        $.browser.version == '9.0') &&
      $('#socialmedia-container').length)
  ) {
    var n = 0;
    $(window).scroll(function (t) {
      var i = $(this).scrollTop();
      i > n && $('#socialmedia-container').css('display', 'inline');
      n = i;
    });
  }
});
$('form').submit(function () {
  if ($('input#nospam').val().length != 0) return !1;
});
$('.minimize').hide();
$('.expand-content').hide();
var initCollapse = function initCollapse() {
    $('.expand-container').each(function (n, t) {
      var r = {},
        i = $(t),
        u = i.find('.expand-btn'),
        f = i.find('#settings');
      r.easing = getEasing(u);
      r.speed = getSpeed(u);
      i.collapse = r;
      initButton(u, i);
    });
  },
  initButton = function initButton(n, t) {
    t.collapse.readMore = n.html();
    t.collapse.readLess = n.siblings('.minimize').html();
    n.on('click', function () {
      return switchButton(n, t);
    });
  },
  expandContainer = function expandContainer(n, t, i) {
    return n.slideToggle(i, t);
  },
  switchButton = function switchButton(n, t) {
    var i = t.find('.expand-content'),
      u = t.collapse.easing,
      r = t.collapse.speed;
    i.css('display') == 'none'
      ? (n.html(t.collapse.readLess), expandContainer(i, u, r))
      : (n.html(t.collapse.readMore),
        expandContainer(i, u, r),
        returnTop(t, r));
  },
  returnTop = function returnTop(n, t) {
    var i = n.offset().top;
    $(window).scrollTop() > i && $('html, body').animate({ scrollTop: i }, t);
  },
  getEasing = function getEasing(n) {
    return n.data('ease');
  },
  getSpeed = function getSpeed(n) {
    return n.data('speed');
  };
$(initCollapse);
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#sidr"]')
  .not('[href="#0"]')
  .click(function (n) {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var t = $(this.hash);
      t = t.length ? t : $('[name=' + this.hash.slice(1) + ']');
      t.length &&
        (n.preventDefault(),
        $('html, body').animate(
          { scrollTop: t.offset().top },
          1e3,
          function () {
            var n = $(t);
            if ((n.focus(), n.is(':focus'))) return !1;
            else n.attr('tabindex', '-1'), n.focus();
          }
        ));
    }
  });
$(document).ready(function () {
  $('#rowDisabledJS').hide();
  $('label').each(function () {
    $(this).click(function () {
      $("input[id$='" + $(this).attr('for') + "']").focus();
      $("select[id$='" + $(this).attr('for') + "']").focus();
      $("textarea[id$='" + $(this).attr('for') + "']").focus();
    });
  });
  $('#slider').length != 0 && $('#header').css('background-image', 'none');
  $('#FormBespoke')
    .find('input')
    .each(function () {
      $(this).attr('name', $(this).attr('id'));
    });
  $('#FormBespoke')
    .find('select')
    .each(function () {
      $(this).attr('name', $(this).attr('id'));
    });
  $('#FormBespoke')
    .find('textarea')
    .each(function () {
      $(this).attr('name', $(this).attr('id'));
    });
});
