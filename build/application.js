(function() {
  var input, inputs, _i, _len;

  inputs = window.document.body.querySelectorAll("input[type=number]");

  for (_i = 0, _len = inputs.length; _i < _len; _i++) {
    input = inputs[_i];
    input.addEventListener('keydown', function(e) {
      var code;
      code = e.keyCode;
      if ((code !== 38 && code !== 40) && code !== 9) {
        return e.preventDefault();
      }
    });
  }

  window["DataPiece"] = function(param) {
    var callbackname, chartBlock, form, getMax, renderData, salt, scriptVar;
    chartBlock = window.document.getElementById(param["chartID"]);
    form = window.document.getElementById(param["formID"]);
    salt = new Date().getTime() + param["formID"];
    callbackname = "getdata" + salt;
    scriptVar = 'script' + salt;
    getMax = function(data) {
      var item, max, _j, _len1;
      max = 0;
      for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
        item = data[_j];
        max = Math.max(max, item[1]);
      }
      return max;
    };
    renderData = function(data) {
      var height, i, item, left, max, maxheight, newcol, offset, width, _j, _len1, _results;
      maxheight = chartBlock.offsetHeight;
      max = getMax(data);
      chartBlock.innerHTML = "";
      width = chartBlock.offsetWidth / data.length;
      offset = width / 3;
      width = width - offset;
      left = -width - offset / 2;
      _results = [];
      for (i = _j = 0, _len1 = data.length; _j < _len1; i = ++_j) {
        item = data[i];
        newcol = window.document.createElement('div');
        newcol.setAttribute('class', 'chart_col');
        chartBlock.appendChild(newcol);
        newcol.style['width'] = width + "px";
        left += width + offset;
        newcol.style['left'] = left + "px";
        height = ((maxheight / max) * item[1]) + "px";
        _results.push((function(newcol, height) {
          return setTimeout(function() {
            return newcol.style['height'] = height;
          }, 0);
        })(newcol, height));
      }
      return _results;
    };
    window[callbackname] = function(res) {
      window[scriptVar].remove();
      return renderData(res);
    };
    return form.addEventListener('submit', function(e) {
      var end, start, time;
      e.preventDefault();
      window[scriptVar] = document.createElement('script');
      document.body.appendChild(window[scriptVar]);
      time = 600000;
      start = form.querySelectorAll("input[name=start]")[0].value * time;
      end = form.querySelectorAll("input[name=end]")[0].value * time;
      return window[scriptVar]["src"] = 'http://hits-data.eu01.aws.af.cm/data/' + start + '/' + end + '/?callback=' + callbackname;
    });
  };

}).call(this);
