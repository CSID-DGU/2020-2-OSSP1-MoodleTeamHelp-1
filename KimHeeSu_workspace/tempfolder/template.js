var style=require('./style.js');

module.exports={
    HTML:function(getfiles,db,group){
        // return `
        // <!doctype html> 
        // <head>
        // <meta charset="UTF-8">
        // <title></title>
        // ${style.css()}
        // </head>
        // <body>
        // ${getfiles}
        // <div class=origin>
        //     <form action="myrouter/addpart" method="post">
        //     <input type="text" name="part">
        //     <input type="submit" value="파트추가">
        //     </form>
        // </div>
        // <div class=origin>
        //     ${db}
        // </div>
        // </body>
        // </html>
        // `;
    return  `
    <!doctype html>
    <html class="" lang="">
    <head>
    <script type="text/javascript" class="silex-json-styles" data-silex-static="">
    window.silex = window.silex || {}
    window.silex.data = {"site":{"width":885},"pages":[{"id":"page-page-1","displayName":"Page 1","link":{"linkType":"LinkTypePage","href":"#!page-page-1"},"canDelete":true,"canProperties":true,"canMove":true,"canRename":true,"opened":false},{"id":"page--","displayName":"공동문서 작업","link":{"linkType":"LinkTypePage","href":"#!page--"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false}]}
</script>
    <meta charset="UTF-8">
    <!-- generator meta tag -->
    <!-- leave this for stats and Silex version check -->
    <meta name="generator" content="Silex v2.2.11">
    <!-- End of generator meta tag -->
    <script type="text/javascript" src="https://editor.silex.me/static/2.11/jquery.js" data-silex-static=""></script>
    <script type="text/javascript" src="https://editor.silex.me/static/2.11/jquery-ui.js" data-silex-static="" data-silex-remove-publish=""></script>
    <script type="text/javascript" src="https://editor.silex.me/static/2.11/pageable.js" data-silex-static="" data-silex-remove-publish=""></script>
    <script type="text/javascript" src="https://editor.silex.me/static/2.11/front-end.js" data-silex-static=""></script>
    <link rel="stylesheet" href="https://editor.silex.me/static/2.11/normalize.css" data-silex-static="">
    <link rel="stylesheet" href="https://editor.silex.me/static/2.11/front-end.css" data-silex-static="">

    <style type="text/css" class="silex-style"></style>
    <script type="text/javascript" class="silex-script"></script>
    <style class="silex-inline-styles" type="text/css">.body-initial {background-color: rgba(0,0,0,1); position: static;}.silex-id-1478366444112-1 {background-color: rgba(0,0,0,1); position: static; margin-top: -1px;}.silex-id-1478366444112-0 {background-color: rgba(0,0,0,1); min-height: 300px; position: relative; margin-left: auto; margin-right: auto; border-color: rgba(158,158,158,1);}.silex-id-1474394621033-3 {position: static; margin-top: -1px; background-color: transparent; border-color: transparent;}.silex-id-1474394621032-2 {background-color: rgba(0,0,0,1); min-height: 690px; position: relative; margin-left: auto; margin-right: auto;}.silex-id-1478366450713-3 {background-color: transparent; position: static; margin-top: -1px;}.silex-id-1478366450713-2 {background-color: transparent; min-height: 130.5390625px; position: relative; margin-left: auto; margin-right: auto;}.silex-id-1604381181245-0 {width: 146px; min-height: 132px; background-color: rgba(0,0,0,1); position: absolute; top: 26px; left: 55px;}.silex-id-1604381522345-1 {width: 135px; height: 126px; position: absolute; top: 37.1015625px; left: 66.95703125px;}.silex-id-1604381556411-2 {width: 171px; min-height: 115px; position: absolute; top: 163.0859375px; left: 53.609375px; background-color: transparent;}.silex-id-1604643193909-2 {width: 270px; min-height: 1126px; background-color: rgba(38,38,39,1); position: absolute; top: -0.8203125px; left: -0.15625px; display: block;}.silex-id-1604643380215-3 {width: 268px; min-height: 57px; background-color: transparent; position: absolute; top: 300.52734375px; left: 0.05859375px; border-width: 2px 0 2px 0; border-style: solid; border-color: rgba(255,255,255,1);}.silex-id-1604643414316-4 {width: 268px; min-height: 57px; background-color: transparent; position: absolute; top: 362.93359375px; left: -0.20703125px; border-width: 0 0 2px 0; border-style: solid; border-color: rgba(255,255,255,1);}.silex-id-1604644963736-10 {width: 125px; min-height: 74px; position: absolute; top: 2px; left: 66px;}.silex-id-1604645216399-12 {width: 125px; min-height: 53px; position: absolute; top: -0.14453125px; left: 66.125px;}.silex-id-1604710473649-0 {width: 28px; height: 33px; position: absolute; top: 10px; left: 28px;}.silex-id-1604710519311-1 {width: 25px; height: 25px; position: absolute; top: 15px; left: 25px;}@media only screen and (max-width: 480px) {}</style>
    <title></title>
    ${style.css()}

    
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" class="silex-custom-font"><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css" class="silex-style-settings">.website-width {width: 885px;}@media (min-width: 481px) {.silex-editor {min-width: 1085px;}}</style><style class="silex-prodotype-style" type="text/css" data-style-id="all-style">.text-element > .silex-element-content {font-family: 'Roboto', sans-serif; color: #ffffff; -webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; transition: all 1s ease;}a {color: #ffffff; text-decoration: none;}[data-silex-href] {color: #ffffff; text-decoration: none;}</style><style class="silex-prodotype-style" type="text/css" data-style-id="style-all-style1">.style-all-style1.text-element > .silex-element-content {font-family: 'Roboto', sans-serif; color: #ffffff; -webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; transition: all 1s ease;}</style></head>
<body data-silex-id="body-initial" class="body-initial all-style enable-mobile prevent-resizable prevent-selectable editable-style silex-runtime" data-silex-type="container-element" style="" data-new-gr-c-s-loaded="14.983.0">
<div data-silex-type="container-element" class="container-element editable-style silex-id-1478366444112-1 section-element prevent-resizable" data-silex-id="silex-id-1478366444112-1" style="">
        
<div data-silex-type="container-element" class="editable-style silex-element-content silex-id-1478366444112-0 container-element website-width" data-silex-id="silex-id-1478366444112-0" style="">
<div>
${getfiles}
        <div class=origin>
            <form action="myrouter/addpart/" method="post">
            <input type="text" name="part">
            <input type="submit" value="파트추가">
            </form>
        </div>
</div>
</div>
<div data-silex-type="container-element" class="editable-style container-element silex-id-1604381181245-0 page-page-1 paged-element" data-silex-id="silex-id-1604381181245-0" style=""></div>
</div>
<div data-silex-type="container-element" class="container-element editable-style silex-id-1474394621033-3 section-element prevent-resizable hide-on-mobile" data-silex-id="silex-id-1474394621033-3" style="">
<div data-silex-type="container-element" class="editable-style silex-element-content silex-id-1474394621032-2 container-element website-width selected" data-silex-id="silex-id-1474394621032-2" style=""></div>
<div data-silex-type="container-element" class="editable-style container-element silex-id-1604643193909-2 page-page-1 paged-element" data-silex-id="silex-id-1604643193909-2" style="">
    <div data-silex-type="image-element" class="editable-style image-element silex-id-1604381522345-1 page-page-1 paged-element style-all-style1" data-silex-id="silex-id-1604381522345-1" style=""><img src="logo.637cfd18.jpg"></div>
    <div data-silex-type="container-element" class="editable-style container-element silex-id-1604643414316-4 page-page-1 paged-element" data-silex-id="silex-id-1604643414316-4" style="">
        <div data-silex-type="text-element" class="editable-style text-element silex-id-1604645216399-12 page-page-1 paged-element" data-silex-id="silex-id-1604645216399-12" style="">
            <div class="silex-element-content normal">
                <p><b>프로필</b></p>
            </div>
        </div>
        <div data-silex-type="image-element" class="editable-style image-element silex-id-1604710519311-1 page-page-1 paged-element" data-silex-id="silex-id-1604710519311-1" style=""><img src="icon_profile_user.png">
        </div>
    </div>
    <div data-silex-type="container-element" class="editable-style container-element silex-id-1604643380215-3 page-page-1 paged-element" data-silex-id="silex-id-1604643380215-3" style="">
        <div data-silex-type="text-element" class="editable-style text-element silex-id-1604644963736-10 page-page-1 paged-element" data-silex-id="silex-id-1604644963736-10" style="">
            <div class="silex-element-content normal"><p><b><a href="#!page--" title="공동문서 작업" class="">공동 문서 작업</a></b></p>
            </div>
        </div>
        <div data-silex-type="image-element" class="editable-style image-element silex-id-1604710473649-0 page-page-1 paged-element" data-silex-id="silex-id-1604710473649-0" style="">
            <img src="group_icon.png">
        </div>
    </div>
    <div data-silex-type="text-element" class="editable-style text-element silex-id-1604381556411-2 page-page-1 paged-element style-all-style1" data-silex-id="silex-id-1604381556411-2" style=""><div class="silex-element-content normal">
        <h1><b>PLASS DGU</b></h1><p><br></p>
    </div>
</div>
</div>
</div>
<div data-silex-type="container-element" class="container-element editable-style silex-id-1478366450713-3 section-element prevent-resizable" data-silex-id="silex-id-1478366450713-3" style="">
    <div data-silex-type="container-element" class="editable-style silex-element-content silex-id-1478366450713-2 container-element website-width" data-silex-id="silex-id-1478366450713-2" style="">
   
        
    </div>
</div>
      
    </body>
    </html>
    `;

    }
}