/* ============================================================
   APP FILE: screens and logic. Needs data.js loaded first.
   ============================================================ */

/* ============================================================
   STATE: current tab, open detail page, selected district, village inputs, habits ticked
   ============================================================ */
let tab="s",det=null,di=5,pop=2000,big=500,sm=300,stock=0,hab={},fam=5;

/* ============================================================
   HELPERS: $ = find element, fmt = Indian number format
   ============================================================ */
const $=i=>document.getElementById(i),fmt=n=>Math.round(n).toLocaleString('en-IN');

/* ============================================================
   bar(): draws one horizontal bar of a chart
   ============================================================ */
function bar(l,v,max,col,suf){return`<div class="bar"><span>${l}</span><i style="width:${v/max*55}%;background:${col}"></i><b>${v}${suf||''}</b></div>`}

/* ============================================================
   nav(): draws the tab buttons at the top
   ============================================================ */
function nav(){$("nav").innerHTML=T.map(t=>`<button class="${t[0]==tab?'on':''}" onclick="tab='${t[0]}';det=null;render();scrollTo(0,0)"><span>${t[1]}</span>${t[2]}</button>`).join("")}

/* ============================================================
   TAB 1 - stat(): live situation dashboard, El Nino explanation, six clickable risks, sources
   ============================================================ */
function stat(){return`<div class="card red"><h2>🚨 आजची परिस्थिती</h2>
<div class="g"><div class="st"><b>२६५/३५८</b><small>तालुके दुष्काळी (७४%)</small></div><div class="st"><b>−१९%</b><small>महाराष्ट्र पाऊस (जून–सप्टें.)</small></div><div class="st"><b>−४०%</b><small>मराठवाडा पाऊस</small></div><div class="st"><b>−४५%</b><small>धाराशिव पाऊस</small></div><div class="st"><b>१९० + १५७</b><small>मराठवाड्यात टँकरवर गावे + वाड्या (९ ऑक्टो.)</small></div><div class="st"><b>१०%</b><small>शासनाचा पाणीकपात निर्णय</small></div></div></div>
<div class="card"><h2>📊 विभागवार पावसाची तूट (२०२६)</h2>${bar("मराठवाडा",40,60,"#c62828","%")}${bar("विदर्भ",23,60,"#e8890c","%")}${bar("कोकण",14,60,"#e8890c","%")}${bar("मध्य महाराष्ट्र",11,60,"#0f7b5f","%")}${bar("संपूर्ण राज्य",19,60,"#555","%")}
<small class="s">भारत: सरासरीच्या ८७% (−१३%), २००१ नंतरचा चौथा कमी मान्सून. सर्वात कोरडे जिल्हे: सोलापूर −५८%, बीड −५१%, हिंगोली −४९%.</small></div>
<div class="card warn"><h2>🌊 हे का घडले? (एल निनो)</h2><p>प्रशांत महासागराचे पूर्व भागातील पाणी असामान्य गरम झाले. त्यामुळे हवेचे सामान्य अभिसरण (वॉकर सर्क्युलेशन) बिघडते, भारतावर हवा खाली दाबली जाते आणि ढग तयार होणे व पाऊस कमी होतो. मान्सून ७–१० दिवस उशिरा आला व मोठे खंड पडले. पावसाअभावी जमिनीतील ओलावा कमी → तापमान जास्त → बाष्पीभवन जास्त → पाण्याचा ताण वाढतो. हा हवामान बदलाच्या उष्णतेवर वरचा थर आहे.</p></div>
<div class="card"><h2>⚡ सध्याचे मुख्य धोके</h2>
${[["🌽","खरीप नुकसान","सोयाबीन, कापूस, तूर, मका यांची उत्पादकता घटली; पंचनामे व मदत स्वतंत्र शासन निर्णयाने (GR) येणार."],["💧","पाणी कपात","राज्यात १०% पाणीकपात; पिण्याचे पाणी प्राधान्य; ऑगस्ट २०२७ पर्यंत सूक्ष्म जलनियोजनाचे आदेश."],["🐄","चारा टंचाई","राज्याने चाऱ्यासाठी ₹४,५०० कोटी व पिकहानीसाठी ₹१३,००० कोटी (एकूण ₹१७,५०० कोटी) केंद्राकडे मागितले; ग्रामपंचायतींमार्फत चारा डेपोचा प्रस्ताव."],["🌡️","उष्णता","एल निनो हिवाळा उबदार आणि पुढील उन्हाळा कडक करू शकतो; रब्बी पिकांवर ताण."],["🛒","अन्नधान्य महागाई","उत्पादन घटल्याने डाळी, भाजीपाला, दूध-चारा महाग होण्याचा धोका; केंद्राने २०२६-२७ अन्नधान्य उत्पादन लक्ष्य कमी केले."],["😟","ग्रामीण ताण","कर्ज, पाणी, चारा यांचा एकत्र ताण. मदत मागणे हा कमकुवतपणा नाही (मदत पान पहा)."]].map((x,i)=>`<div class="row lk" onclick="op('r${i}')"><span class="e">${x[0]}</span><div><b>${x[1]} ›</b><small>${x[2]}</small><small style="color:var(--bl)">सविस्तर उपाय पाहा ›</small></div></div>`).join("")}</div>
<div class="card"><h2>📰 स्रोत</h2><small class="s">Free Press Journal (३० सप्टें.), Down To Earth, Deccan Chronicle, The Print/PTI, Lokshahi (९ ऑक्टो.), NOAA CPC (८ ऑक्टो.), IRI/Columbia, WMO. अचूक ताजे आकडे: <a target="_blank" rel="noopener" href="https://mausam.imd.gov.in">mausam.imd.gov.in</a></small></div>`}

/* ============================================================
   TAB 2 - dist(): district selector, risk level, crops, sowing time, groundwater note
   ============================================================ */
function dist(){const d=D[di],r=RG[d[1]],v=d[2],def=v||r.d,ex=d[0]=="धाराशिव";
const lvl=def>=40?["अतिशय गंभीर","var(--rd)"]:def>=20?["गंभीर","var(--ac)"]:["मध्यम","var(--pr)"];
return`<div class="card"><h2>📍 जिल्हा निवडा</h2><select onchange="di=+this.value;render()">${D.map((x,i)=>`<option value="${i}" ${i==di?'selected':''}>${x[0]} (${x[1]})</option>`).join("")}</select></div>
<div class="card" style="border-left:5px solid ${lvl[1]}"><h2>${d[0]} – धोका: <span style="color:${lvl[1]}">${lvl[0]}</span></h2>
${bar(v?"जिल्ह्याची तूट":"विभाग सरासरी तूट",def,60,lvl[1],"%")}<small class="s">${v?"जून–सप्टें. २०२६, IMD (बातम्यांनुसार)":"जिल्ह्याचा अचूक आकडा येथे नाही – "+d[1]+" विभागाची सरासरी तूट दाखवली. जिल्हा आकडा IMD/कृषी कार्यालयातून पडताळा."}</small>
${ex?"<p><b>धाराशिव:</b> −४५% पाऊस; मराठवाडा विभागातील ८ जिल्ह्यांत ७४ दुष्काळी तालुके. तालुकानिहाय यादी तहसील/जिल्हाधिकारी कार्यालयात.</p>":""}
<h3>🧱 भूजल व उष्णता</h3><p>${r.g} जिल्ह्याची अचूक भूजल पातळी GSDA/CGWB (cgwb.gov.in) वर पहा.</p>
<h3>✅ तुमच्यासाठी योग्य पिके (रब्बी २०२६-२७)</h3><p>${r.c}</p><h3>⚠️ टाळा</h3><p>${r.x}</p>
<h3>🗓️ पेरणीची वेळ (सर्वसाधारण)</h3><p>रब्बी ज्वारी: ऑक्टोबर मध्यापर्यंत • करडई: ऑक्टोबर • हरभरा: ऑक्टो–नोव्हेंबर (ओलाव्यावर) • सूर्यफूल: ऑक्टोबर. ओलावा नसल्यास पेरणी पुढे ढकला; कृषी विभागाचा स्थानिक सल्ला घ्या.</p>
<h3>🧪 काय करावे?</h3><p>पीक नुकसानीचा पंचनामा/विमा तक्रार करा • बोअर-विहीर पुनर्भरण • पिण्याचे पाणी राखीव • चारा साठा करा • पशुधन विकू नका.</p></div>`}

/* ============================================================
   TAB 3 - vill(): village water + fodder calculator (55 L/person, 40 L big animal, 10 L small animal, tanker = 10,000 L)
   ============================================================ */
function vill(){const days=Math.max(1,Math.round((new Date(2027,5,15)-new Date())/864e5)),w=pop*55+big*40+sm*10,tk=w/1e4,f=big*6+sm*1,left=stock?Math.floor(stock/w):0,cut=w*.9;
return`<div class="card"><h2>🏘️ गावाचा पाणी-चारा हिशोब</h2><label>गावाची लोकसंख्या</label><input type="number" min="0" value="${pop}" onchange="pop=+this.value;render()"><label>मोठी जनावरे (गाय/म्हैस/बैल)</label><input type="number" min="0" value="${big}" onchange="big=+this.value;render()"><label>लहान जनावरे (शेळी/मेंढी)</label><input type="number" min="0" value="${sm}" onchange="sm=+this.value;render()"><label>सध्या उपलब्ध पाणीसाठा (लिटर, माहित असल्यास)</label><input type="number" min="0" value="${stock}" onchange="stock=+this.value;render()"></div>
<div class="card ok"><h2>निकाल</h2><div class="g"><div class="st"><b>${fmt(w)}</b><small>लिटर/दिवस</small></div><div class="st"><b>${tk.toFixed(1)}</b><small>टँकर/दिवस (१०,०००लि.)</small></div><div class="st"><b>${fmt(tk*days)}</b><small>१५ जून २०२७ पर्यंत (${days} दिवस) टँकर</small></div><div class="st"><b>${fmt(f)} किग्रॅ</b><small>कोरडा चारा/दिवस</small></div><div class="st"><b>${fmt(f*days/1000)} टन</b><small>पावसापर्यंत चारा</small></div>${stock?`<div class="st"><b>${left}</b><small>दिवस पाणी पुरेल</small></div>`:''}</div>
<p>✂️ १०% पाणीकपात लागू झाल्यास दररोज <b>${fmt(cut)}</b> लि. मध्ये भागवावे लागेल (${fmt(w-cut)} लि. बचत).</p>
<small class="s">गृहीतके: माणूस ५५ लि./दिवस (जल जीवन मिशन निकष), मोठे जनावर ४०, लहान १० लि.; कोरडा चारा मोठे ६ किग्रॅ, लहान १ किग्रॅ; टँकर सुमारे १०,००० लि. प्रत्यक्ष गरजेनुसार बदलते. ही माहिती सरपंच/ग्रामसेवकांना मागणीसाठी वापरता येईल.</small></div>`}

/* ============================================================
   TAB 4 - farm(): fodder, water conservation, pests, video search links
   ============================================================ */
function farm(){return`<div class="card warn"><h2>🐄 चारा टंचाई – काय करावे?</h2><p><button class="btn" onclick="op('fodder')">📖 सविस्तर मार्गदर्शन ›</button></p>${[["🌾","आत्ताच चारा साठवा","कडबा, सोयाबीन/हरभरा भुसा, ऊसाचे वाढे; ओलावा नसलेले, झाकून."],["🧪","मुरघास / युरिया प्रक्रिया","मका/ज्वारीचा मुरघास; कडब्यावर युरिया प्रक्रिया पौष्टिकता वाढवते."],["🍃","अझोला व हायड्रोपोनिक चारा","कमी पाण्यात व जागेत; पशुखाद्य पूरक."],["🏛️","चारा डेपो/छावण्या","ग्रामपंचायतीमार्फत डेपोचा प्रस्ताव; तहसीलमध्ये नोंदणी करा."],["🚫","जनावरे घाईने विकू नका","शासकीय मदत/डेपो पर्याय आधी तपासा; लसीकरण व पाण्याची व्यवस्था ठेवा."]].map(x=>`<div class="row"><span class="e">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join("")}</div>
<div class="card"><h2>💧 पाणी संवर्धन</h2><p><button class="btn" onclick="op('conserve')">📖 सविस्तर मार्गदर्शन ›</button></p>${[["💧","ठिबक/तुषार","जास्त पाणी बचत; फक्त जीवनदायी पाणी द्या"],["🌾","मल्चिंग","आच्छादनाने ओलावा टिकतो"],["🏞️","शेततळे/शेतात जलसंधारण","पावसाचे पाणी साठवा"],["⛰️","समपातळी चर, नाला खोलीकरण","पाणी मुरवा – रोहयो कामातून"],["🕳️","बोअर पुनर्भरण","गाळलेले पाणी बोअरमध्ये सोडा"],["🌱","आंतरपीक, कमी कालावधीचे वाण","एक पीक गेले तरी दुसरे हाताशी"]].map(x=>`<div class="row"><span class="e">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join("")}</div>
<div class="card"><h2>🦠 कीड-रोग तयारी (कोरड्या हवामानात)</h2><p><button class="btn" onclick="op('pests')">📖 पीकनिहाय सविस्तर ›</button></p><p>रस शोषणारे किडे (मावा, तुडतुडे, पांढरी माशी, फुलकिडे) – निंबोळी अर्क, पिवळे सापळे • कोळी (माइट्स) • हरभरा-तूर मर/मूळकुज – ट्रायकोडर्मा बीजप्रक्रिया • उष्णतेने फुलगळ – आच्छादन • लष्करी अळी (मका), गुलाबी बोंडअळी (कापूस) – फेरोमोन सापळे • अचानक पावसानंतर बुरशीजन्य रोग. फवारणी कृषी विभागाच्या शिफारशीनेच.</p></div>
<div class="card"><h2>🎥 व्हिडिओ शोधा</h2>${["दुष्काळात रब्बी नियोजन","मुरघास तयार करणे","ठिबक सिंचन","शेततळे","मल्चिंग तंत्र","अझोला पशुखाद्य"].map(q=>`<a class="chip" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(q+" मराठी")}">▶ ${q}</a>`).join("")}</div>`}

/* ============================================================
   TAB 5 - save(): household water-saving calculator + WhatsApp share
   ============================================================ */
function save(){let p=0,h=0;HAB.forEach((x,i)=>{if(hab[i])x[3]?h+=x[2]:p+=x[2]});const d=p*fam+h,y=d*365;
return`<div class="card warn"><h2>💧 प्रत्येक थेंब महत्त्वाचा</h2><p><button class="btn" onclick="op('save')">📖 घर व गावासाठी सविस्तर ›</button></p><p>राज्यात १०% पाणीकपात सुरू आहे. सोप्या सवयींनी कुटुंब किती वाचवू शकते ते पहा.</p><label>कुटुंबातील सदस्य: <b>${fam}</b></label><input type="range" style="width:100%" min="1" max="12" value="${fam}" oninput="fam=+this.value;render()">
${HAB.map((x,i)=>`<label style="display:flex;gap:8px;align-items:center;color:var(--tx)"><input type="checkbox" ${hab[i]?'checked':''} onchange="hab[${i}]=this.checked;render()">${x[0]} ${x[1]} <small class="s">(~${x[2]} लि.)</small></label>`).join("")}</div>
<div class="card ok"><div class="g"><div class="st"><b style="color:var(--bl)">${fmt(d)}</b><small>लिटर/दिवस</small></div><div class="st"><b style="color:var(--bl)">${fmt(y)}</b><small>लिटर/वर्ष</small></div><div class="st"><b style="color:var(--bl)">${(y*100/1e4).toFixed(0)}</b><small>१०० कुटुंबांनी = टँकर/वर्ष</small></div></div>
<p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent('मी दररोज '+fmt(d)+' लिटर पाणी वाचवणार! एल निनो मित्र')}">WhatsApp वर शेअर करा</a></p></div>
<div class="card"><h2>🙋 मी कशी मदत करू?</h2><span class="tag">शेजाऱ्याला योजना सांगा</span><span class="tag">श्रमदान – नाला/बंधारा</span><span class="tag">चारा/पाणी देणगी</span><span class="tag">विहीर-बोअर शेअरिंग</span><span class="tag">अॅप शेअर करा</span></div>`}

/* ============================================================
   TAB 6 - next(): El Nino outlook, timeline, past El Nino years chart
   ============================================================ */
function next(){return`<div class="card red"><h2>🔮 एल निनो अजून वाढतोय</h2><p>NOAA (८ ऑक्टो.): एल निनो आणखी बळकट होत आहे; जानेवारी–मार्च २०२७ पर्यंत "तीव्र ते अतिशय तीव्र" राहण्याची ८३% पेक्षा जास्त शक्यता. WMO: डिसेंबर २०२६ च्या सुमारास शिखर. IRI मॉडेल: २०२७ च्या मध्य उन्हाळ्यापर्यंत (मे–जुलै) शक्यता ६१% पर्यंत घटते.</p></div>
<div class="card warn"><h2>⏳ याचा अर्थ</h2><p><button class="btn" onclick="op('plan')">📖 महिन्यानुसार तयारी योजना ›</button></p>${[["🌦️","ऑक्टोबर–डिसेंबर","परतीचा पाऊस अपुरा; रब्बी ओलावा कमी."],["🥶","हिवाळा","सामान्यपेक्षा उबदार; थंडी कमी → गहू/हरभऱ्यावर ताण शक्य."],["🔥","मार्च–जून २०२७","उष्णतेच्या लाटा, पाणी संकट शिखरावर (धरणे आटलेली असतील). नियोजन आत्तापासून."],["🌧️","जून २०२७ मान्सून","एल निनो साधारणपणे पुढच्या मान्सूनपूर्वी कमकुवत होतो, पण हमी नाही. IMD चा पहिला अंदाज एप्रिलमध्ये येतो. सामान्य सुरुवात: कोकण जूनच्या सुरुवातीला, मराठवाडा जूनच्या मध्यात."]].map(x=>`<div class="row"><span class="e">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join("")}</div>
<div class="card"><h2>📈 मागील एल निनो वर्षे (भारत मान्सून, % LPA)</h2>${HIST.map(h=>bar(h[0],h[1],110,h[1]<90?"#c62828":"#0f7b5f","%")).join("")}<small class="s">सर्व एल निनो वर्षे दुष्काळी नसतात (१९९७ अपवाद) पण यंदा तीव्रता विक्रमी. पूर्वीचे आकडे अंदाजे; २०२६: IMD नुसार ८७%.</small></div>`}

/* ============================================================
   TAB 7 - help(): relief package, mental-health helplines, health advice
   ============================================================ */
function help(){return`<div class="card ok"><h2>🏛️ दुष्काळी मदत (२५ सप्टें. २०२६ चा शासन निर्णय)</h2>${["जमीन महसुलात सूट","पीक कर्जाची पुनर्रचना व वसुलीला स्थगिती","७.५ HP वरील कृषी पंपांना वीजबिल सवलत; कृषी पंपांचा वीजपुरवठा खंडित न करणे","शाळा-कॉलेज परीक्षा शुल्क माफी","रोजगार हमी (रोहयो) निकष शिथिल – जास्त कामे","गरज तिथे टँकरने पाणी; चारा व धान्याची व्यवस्था; जलसंधारण कामे","पिकहानी मदत स्वतंत्र GR ने, पंचनाम्यानंतर; दिवाळीपूर्वी वितरणाचे नियोजन. KYC/बँक-आधार तपशील तयार ठेवा."].map(t=>`<div class="row"><span class="e">✅</span><div>${t}</div></div>`).join("")}<p><a target="_blank" rel="noopener" href="https://mahadbt.maharashtra.gov.in">mahadbt.maharashtra.gov.in</a> • पीक विमा तक्रार ७२ तासांत: १४४४७</p></div>
<div class="card"><h2>❤️ मानसिक आधार</h2><p>दुष्काळ हा तुमचा दोष नाही. महाराष्ट्राने याआधीही कठीण काळ पार केला आहे. कुटुंब, मित्र, गावातील लोकांशी बोला; सावकारी कर्जाऐवजी बँक/सहकारी संस्थेकडे पुनर्रचनेची मागणी करा. जीव देण्याचे विचार येत असतील तर <b>लगेच Tele-MANAS 14416</b> (२४ तास, मोफत) वर कॉल करा किंवा जवळच्या व्यक्तीला सांगा. आणीबाणी: ११२.</p><p>शेतकरी हेल्पलाइन: किसान कॉल सेंटर 1800-180-1551</p></div>
<div class="card warn"><h2>🥤 आरोग्य व पिण्याचे पाणी</h2><p>रोज २.५–३ लि. पाणी; उन्हात जास्त. टँकर/साठवलेले पाणी उकळा/गाळा/क्लोरीन गोळी. टाक्या आठवड्याला स्वच्छ करा, झाकून ठेवा (डेंगी टाळा).</p><p><b>धोके:</b> जुलाब, टायफॉईड, कावीळ, कॉलरा, उष्माघात (चक्कर, उलटी, ताप → सावलीत न्या, अंग ओले करा, ORS, दवाखाना), त्वचा/डोळ्यांचे संसर्ग.</p><p><b>घरगुती ORS:</b> १ लि. स्वच्छ पाणी + ६ चमचे साखर + अर्धा चमचा मीठ.</p></div>`}

/* ============================================================
   DETAIL PAGES: op() opens a page from DT, detail() draws it with optional photos
   ============================================================ */
function op(k){det=k;render();scrollTo(0,0)}
function detail(k){const d=DT[k];return`<div class="card"><button class="btn" onclick="det=null;render();scrollTo(0,0)">‹ मागे</button></div><div class="hero2">${DIMG[k]?DIMG[k].map(u=>`<img src="${u}" alt="" style="max-width:100%;margin:4px 0">`).join(""):`<div class="big">${d.e}</div>`}<h2>${d.t}</h2><p>${d.i}</p></div>${d.s.map(s=>`<div class="card ${s[2]||''}"><h2>${s[0]}</h2>${s[1].split('|').map(b=>`<div class="row"><span class="e">▸</span><div>${b}</div></div>`).join('')}</div>`).join('')}${d.go?`<div class="card"><button class="btn" onclick="op('${d.go}')">📖 सविस्तर चारा मार्गदर्शन ›</button></div>`:''}<div class="card"><small class="s">☎️ किसान कॉल 1800-180-1551 • पीक विमा 14447 • Tele-MANAS 14416 • आणीबाणी 112. प्रमाण/अनुदान अटी स्थानिक कृषी/पशुसंवर्धन कार्यालयात तपासा.</small></div>`}

/* ============================================================
   RENDER: applies hero image, draws tabs, shows detail page or current tab. Runs once at start.
   ============================================================ */
function render(){nav();if(HERO_IMG){const h=document.querySelector('header');h.style.backgroundImage='linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url('+HERO_IMG+')';h.style.padding='70px 16px 24px'}$("m").innerHTML=det?detail(det):{s:stat,d:dist,v:vill,f:farm,w:save,n:next,h:help}[tab]()}
render();
