module.exports={
    css:function(){
        return `
        <style>
                .listcontent{
                    clear:both;
                    width:100%; 
                    height: 30px; 
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }        

                .left{
                    float:left;
                }
                .link{
                    float:left;
                    position: relative;
                    bottom:-15px;
                    width:2%;
                }
                .titlefont{
                    font-size:90%;
                }
                .listfont{
                    font-size:30%; 
                    width:50px; 
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }
                .check{
                    left: 1px;
                }
                .origin{
                    clear:both;
                }
                .right{
                    float:right;
                }
                .vertical{
                   background-color:yellow; 
                   width: 6%;
                   position: relative;
                   left: 47%;
                }
                .vertical2{
                    border-left:6px solid yellow;
                    position:relative;
                    height: 10px;
                    left: 50%;
                    margin-left:-3px;
                    top:0;
                }
                .part{
                    float:left;
                    width:15%;
                }
                .parttitle{
                    background-color:#50bcdf;
                    clear:both;
                    border:1px solid orange;
                }
                .partupload{
                    background-color:#fbceb1;
                    clear:both;
                    border:1px solid orange;
                }
                .horizontal{
                    float:left;
                    background-color:orange;
                    widht:100%;
                    height:100%;
                }
            </style>
        `;
    }
    
}