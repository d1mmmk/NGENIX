
inputs = window.document.body.querySelectorAll "input[type=number]"

for input in inputs
	input.addEventListener 'keydown', (e) ->
		code = e.keyCode
		if (code not in [38,40] and code !=9)
			e.preventDefault()
window["DataPiece"] = (param) ->
	chartBlock = window.document.getElementById param["chartID"]
	form = window.document.getElementById param["formID"]
	salt = new Date().getTime() + param["formID"]
	callbackname = "getdata"+salt
	scriptVar = 'script'+salt

	getMax = (data) ->
		max = 0;
		for item in data
			max = Math.max(max,item[1])
		max

	renderData = (data)->
		maxheight = chartBlock.offsetHeight
		max = getMax data
		chartBlock.innerHTML = "";
		width = chartBlock.offsetWidth / data.length
		offset = width/3
		width = width - offset
		left = -width - offset/2;
		for item,i in data
			newcol = window.document.createElement 'div'
			newcol.setAttribute 'class', 'chart_col'
			chartBlock.appendChild newcol
			newcol.style['width'] = width+"px"
			left += width + offset
			newcol.style['left'] = left+"px"
			height = ((maxheight / max) * item[1])+"px"
			((newcol,height)->
				setTimeout ->
					newcol.style['height'] = height
				,0
			)(newcol,height)

	window[callbackname] = (res)->
		window[scriptVar].remove()
		renderData res

	form.addEventListener 'submit', (e)->
		e.preventDefault()
		window[scriptVar] = document.createElement('script');
		document.body.appendChild(window[scriptVar]);
		time = 600000
		start = form.querySelectorAll("input[name=start]")[0].value * time;
		end = form.querySelectorAll("input[name=end]")[0].value * time;
		window[scriptVar]["src"] = 'http://hits-data.eu01.aws.af.cm/data/'+start+'/'+end+'/?callback='+callbackname;