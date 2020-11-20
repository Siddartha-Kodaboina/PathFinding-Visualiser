function randInt(max) {
    let k= Math.floor(Math.random() * Math.floor(max))+1;
    k= (Math.floor(Math.random() * Math.floor(k*max)))%max+1;
    return k;
}

function ed(x1,x2,y1,y2) {
    return parseFloat(Math.sqrt((x1-x2)*(x1-x2) + (y2-y1)*(y2-y1)));
}
function Board() {
    var cutHeight,cutWidth;
    if(window.screen.height<835) {
        cutHeight=parseInt(window.screen.height/100)*30;
    }
    else {
        cutHeight=parseInt(window.screen.height/100)*40;
    }
    if(window.screen.width<680) {
        cutWidth=parseInt(window.screen.width/100)*40;
    }
    else {
        cutWidth=parseInt(window.screen.width/100)*20;
    }
    this.height = parseInt(window.screen.height/25)-parseInt(cutHeight/25);
    this.width = parseInt(window.screen.width/25)-parseInt(cutWidth/25);
    this.nodesToAnimate=[];
    this.s_set=true;
    this.e_set=true;
    if(window.screen.height<835) {
        this.st_x=parseInt(this.height/2)-parseInt(parseInt(this.height/2)/2);
        this.st_y=parseInt(this.width/2);
        this.ed_x=parseInt(this.height/2)+parseInt(parseInt(this.height/2)/2);
        this.ed_y=parseInt(this.width/2);
    }
    else {
        this.st_x=parseInt(this.height/2);
        this.st_y=parseInt(this.width/2)-parseInt(parseInt(this.width/2)/2);
        this.ed_x=parseInt(this.height/2);;
        this.ed_y=parseInt(this.width/2)+parseInt(parseInt(this.width/2)/2);
    }
    this.is_create=false;
    this.values=new Array(this.height+1);
    for(let i=0;i<=this.height;i++) this.values[i]=new Array(this.width+1);
    this.hasToClearEverything=false;
    this.hasToClearEverythingExceptWalls=false;
    this.isEverythingCalculated=false;
    this.isThereaLegalPath=false;
    this.doitOnHover=false;
    this.alwaysTrue=true;
    this.alwaysFalse=false;
    this.isWallsSet=false;
    this.isWallsButtonClicked=false;
    this.isUnweighted=true;
    this.isItWall=new Array(this.height+1);
    for(let i=0;i<=this.height;i++) this.isItWall[i]=new Array(this.width+1);
    for(let i=0;i<=this.height;i++){
        for(let j=0;j<=this.width;j++){
            this.isItWall[i][j]=false;
        }
    }
    this.SetIt=function(tik,tak){
        console.log("in set it ",tik , tak);
        
        if(this.isEverythingCalculated){
            window.alert("press Clear to start again!");
            return;
        }
        if(this.s_set && `${tik}-${tak}`==`${this.st_x}-${this.st_y}`){
            let k=document.getElementById(`${tik}-${tak}`);
            if(this.isUnweighted) k.style.color="rgb(8, 155, 32)";
            k.style.backgroundColor="rgb(8, 155, 32)";
            this.s_set=false;
            return;
        }
        if(this.e_set && `${tik}-${tak}`==`${this.ed_x}-${this.ed_y}`){
            let k=document.getElementById(`${tik}-${tak}`);
            if(this.isUnweighted) k.style.color="rgb(8, 155, 32)";
            k.style.backgroundColor="rgb(8, 155, 32)";
            this.e_set=false;
            return;
        }
        //if(this.s_set && this.e_set && this.isThereaLegalPath) return;
        
        
        if(!this.s_set) {
            if(this.isItWall[tik][tak]) this.isItWall[tik][tak]=false;
            this.s_set=true;
            k=document.getElementById(`${tik}-${tak}`);
            k.style.backgroundColor="rgba(211, 88, 17, 0.986)";
            if(this.isUnweighted) k.style.color="rgba(211, 88, 17, 0.986)";
            else k.style.color="white";
            k.style.fontSize="12px";
            k.innerText=this.values[tik][tak];
            this.st_x=tik;
            this.st_y=tak;
            console.log("lopala  ",this.st_x , this.st_y);
        }
        else if(!this.e_set){
            if(this.st_x==tik && this.st_y==tak){
                window.alert("Target cannot be same as start!");
            }
            else{
                if(this.isItWall[tik][tak]) this.isItWall[tik][tak]=false;
                this.e_set=true;
                k=document.getElementById(`${tik}-${tak}`);
                k.style.backgroundColor="rgba(0, 4, 255, 0.753)";//rgba(12, 128, 143, 0.753);
                if(this.isUnweighted) k.style.color="rgba(0, 4, 255, 0.753)";
                else k.style.color="white";
                k.style.fontSize="12px";
                k.innerText=this.values[tik][tak];
                this.ed_x=tik;
                this.ed_y=tak;
                console.log("lopala  ",this.ed_x , this.ed_y);
            }
        }
        else{
            let k=document.getElementById(`${tik}-${tak}`);
            if(`${tik}-${tak}`==`${this.st_x}-${this.st_y}` || `${tik}-${tak}`==`${this.ed_x}-${this.ed_y}`) return;
            let cur=k.innerText;
            if(this.isItWall[tik][tak]==false) {
                this.isItWall[tik][tak]=true;
                k.innerText="";
                k.style.color="rgb(6, 38, 65)";
                
                k.style.backgroundColor="rgb(6, 38, 65)";/*"rgb(3, 141, 253)"*/
                
                k.style.transform="scale(0.5,0.5)";
                
                setTimeout(()=>{
                    k.style.transform="scale(1,1)";
                },30);
                setTimeout(()=>{
                    k.style.transform="scale(1,1)";
                },10);
                //k.style.animation=`WallAnimation 100ms ease-in-out forwards`;
                
            }
            else{
                this.isItWall[tik][tak]=false;
                if(this.isUnweighted) k.style.color="rgb(8, 155, 32)";
                else k.style.color="white";
                k.innerText=this.values[tik][tak];
                
                k.style.backgroundColor="rgb(8, 155, 32)";
                
            }
        }
    }
    this.SetItOver=function(tik,tak){
        console.log("in set it ",tik , tak);
        if(this.isEverythingCalculated){
            //window.alert("press Clear to start again!");
            return;
        }
        if(this.isThereaLegalPath) return;
        console.log("***",this.doitOnHover);
        if(!this.doitOnHover) return;
        if(this.doitOnHover && (!this.s_set || !this.e_set)) return;
        
        
        
        
            let k=document.getElementById(`${tik}-${tak}`);

            if(`${tik}-${tak}`==`${this.st_x}-${this.st_y}` || `${tik}-${tak}`==`${this.ed_x}-${this.ed_y}`) return;
            let cur=k.innerText;
            if(this.isItWall[tik][tak]==false) {
                k.innerText="";
                k.style.color="rgb(6, 38, 65)";
                k.style.backgroundColor="rgb(6, 38, 65)";
                this.isItWall[tik][tak]=true;
                //k.style.transform="scale(0.7,0.7)";
                //k.style.animation=`WallAnimation 100ms ease-in-out forwards`;
                
                k.style.transform="scale(0.5,0.5)";
                
                setTimeout(()=>{
                    k.style.transform="scale(1,1)";
                },30);
                setTimeout(()=>{
                    k.style.transform="scale(1,1)";
                },10);
                
            }
            else{
                this.isItWall[tik][tak]=false;
                if(this.isUnweighted) k.style.color="rgb(8, 155, 32)";
                else k.style.color="white";
                k.innerText=this.values[tik][tak];
                k.style.backgroundColor="rgb(8, 155, 32)";
                
                
            }
    }
    this.createWalls=function(tik,tak){
        if((this.st_x==tik && this.st_y==tak)||(this.ed_x==tik && this.ed_y==tak)) return;
        let k=document.getElementById(`${tik}-${tak}`);
        this.isItWall[tik][tak]=true;
        k.innerText="";
        k.style.color="rgb(6, 38, 65)";
        k.style.backgroundColor="rgb(6, 38, 65)";
                
                //k.style.transform="scale(0.7,0.7)";
                //k.style.animation=`WallAnimation 100ms ease-in-out forwards`;
                
        k.style.transform="scale(0.5,0.5)";
                
        setTimeout(()=>{
            k.style.transform="scale(1,1)";
        },30);
        setTimeout(()=>{
            k.style.transform="scale(1,1)";
        },10);
    }
}

function Cell(x,y,d){
    this.x=x;
    this.y=y;
    this.d=d;
}
function HCell(x,y,d,h,hd){
    this.x=x;
    this.y=y;
    this.d=d;
    this.h=h;
    this.hd=hd;
}

Board.prototype.createGrid=function(){
    let tableHTML = "",secondTableHTML="";
    console.log("started");
    for (let r = 0; r <=this.height ; r++) {
        let currentHTMLRow = `<tr id="row ${r}">`;
        let secondCurrentHTMLRow = `<tr id="row ${r}">`;
        for (let c = 0; c <= this.width; c++) {
            let newNodeId = `${r}-${c}`;
            let newData;
            if(this.hasToClearEverything) newData=this.values[r][c];
            else newData=randInt(9);
            this.values[r][c]=newData;
            if(this.isUnweighted){
                newData="";
                this.values[r][c]="";
            }
            console.log(newNodeId);
            currentHTMLRow += `<td class="cell" id="${r}-${c}" `; 
            currentHTMLRow +=` onClick="newBoard.SetIt(${r},${c})" `;
            currentHTMLRow +=` ondblclick="newBoard.doitOnHover=${newBoard.alwaysTrue}" `;
            currentHTMLRow +=` onmousedown="return false" `;
            currentHTMLRow +=` onmouseup="newBoard.doitOnHover=${newBoard.alwaysFalse}" `;
            currentHTMLRow +=` onmouseover="newBoard.SetItOver(${r},${c})" `;
            currentHTMLRow +=` >${newData}</td>`;
            /*if(this.hasToClearEverythingExceptWalls){
                if(this.isItWall[r][c]){
                    newData="";
                    document.getElementById(`${r}-${c}`).backgroundColor="rgb(6, 38, 65)";
                    document.getElementById(`${r}-${c}`).color="rgb(6, 38, 65)";
                }
            }*/
            secondCurrentHTMLRow+=`<td id="1-${newNodeId}">${newData}</td>`;
        }
        tableHTML += `${currentHTMLRow}</tr>`;
        secondTableHTML+=`${secondCurrentHTMLRow}</tr>`;
    }
    let board = document.getElementById("board");
    board.innerHTML = tableHTML;
    if(window.screen.size<835) board.style.left=`${(window.screen.width-(this.width*26))/2-this.width}px`;
    else board.style.left=`${(window.screen.width-(this.width*26))/2-this.width/2}px`;
    board = document.getElementById("board1");
    if(this.s_set) document.getElementById(`${this.st_x}-${this.st_y}`).style.backgroundColor="rgba(211, 88, 17, 0.986)";
    if(this.e_set) document.getElementById(`${this.ed_x}-${this.ed_y}`).style.backgroundColor="rgba(0, 4, 255, 0.753)";
    //board.innerHTML = secondTableHTML;
    if(this.isUnweighted){
        for(let i=0;i<=this.height;i++){
            for(let j=0;j<=this.width;j++){
                if(`${this.st_x}-${this.st_y}`==`${i}-${j}`) document.getElementById(`${i}-${j}`).style.color="rgba(211, 88, 17, 0.986)";
                else if(`${this.ed_x}-${this.ed_y}`==`${i}-${j}`) document.getElementById(`${i}-${j}`).style.color="rgba(0, 4, 255, 0.753)";
                else document.getElementById(`${i}-${j}`).style.color="rgb(8, 155, 32)";
            }
        }
    }
    if(this.hasToClearEverythingExceptWalls){
        for(let i=0;i<=this.height;i++){
            for(let j=0;j<=this.width;j++){
                if(this.isItWall[i][j]){
                    document.getElementById(`${i}-${j}`).innerText="";
                    document.getElementById(`${i}-${j}`).style.backgroundColor="rgb(6, 38, 65)";
                    document.getElementById(`${i}-${j}`).style.color="rgb(6, 38, 65)";
                    console.log("*\n**\n***\n*****\n*******\n");
                }
            }
        }
    }
    console.log("completed");
}


Board.prototype.OxO_to_NxN=function(){
    
    var dist=new Array(this.height+1);
    var vis=new Array(this.height+1);
    let inf=1000000;
    for(let i=0;i<=this.height;i++) {
        dist[i]=new Array(this.width+1);
        vis[i]=new Array(this.width+1);
    }
    let dist_row='';
    for(let i=0;i<=this.height;i++){
        dist_row+=`${i}`;
        for(let j=0;j<=this.width;j++){
            dist[i][j]=inf;
            vis[i][j]=0;
        }
    }
    console.log("distance table * * *");
    const dx=[1,0,-1,0];
    const dy=[0,1,0,-1];
    var pq=new Array();
    console.log("start  ",this.st_x , this.st_y);
    let textInsideis=document.getElementById(`${this.st_x}-${this.st_y}`).innerText;
    console.log(textInsideis);
    dist[this.st_x][this.st_y]=parseInt(textInsideis==""?parseInt(1):parseInt(textInsideis));
    console.log("dist[this.st_x][this.st_y] ",dist[this.st_x][this.st_y]);
    
    let cc=new Cell(this.st_x,this.st_y,dist[this.st_x][this.st_y]);
    console.log("cc.d ",cc.d);
    console.log("dist[cc.x][cc.y] ",dist[cc.x][cc.y]);
    pq.push(cc);
    console.log("pq size :",pq.length);
    var delay=10;
    let last1,last2;
    while(pq.length!=0){
        
        let cur=pq[0];
        console.log("cur detailes ",cur.x,cur.y,cur.d);
        pq.shift();
        if(vis[cur.x][cur.y]) continue;
        vis[cur.x][cur.y]=1;
        this.nodesToAnimate.push(`${cur.x}-${cur.y}`);
        
        if(!(cur.x==this.st_x && cur.y==this.st_y))document.getElementById(`${cur.x}-${cur.y}`).style.animation=`visitedPathAnimation 2s ease-in-out ${delay}ms forwards`;
        if(cur.x==this.ed_x && cur.y==this.ed_y) {
            this.isThereaLegalPath=true;
            last1=cur.x;
            last2=cur.y;
            break;
        };
        
        delay+=20;
        for(let i=0;i<=3;i++){
            let cur_x=cur.x+dx[i];
            let cur_y=cur.y+dy[i];
            if(cur_x<0 || cur_x>this.height || cur_y<0 || cur_y>this.width) continue;
            if(vis[cur_x][cur_y] || this.isItWall[cur_x][cur_y]) continue;
            let n_dist=document.getElementById(`${cur_x}-${cur_y}`).innerText;
            if(n_dist=="") n_dist=1;
            else n_dist=parseInt(n_dist);
            
            let alt=cur.d+n_dist;
            if(alt<dist[cur_x][cur_y]){
                //let index=pq.indexOf(new Cell(cur_x,cur_y,dist[cur_x][cur_y]));
                //if(index!=-1) 
                    //pq.splice(index);
                pq.push(new Cell(cur_x,cur_y,alt));
                dist[cur_x][cur_y]=alt;
                
            }
            //dist[cur_x][cur_y]=alt;
            //pq.push(new Cell(cur_x,cur_y,alt));
        }
        pq.sort(function(a, b) {
            return parseInt(a.d) - parseInt(b.d);
        });
    }

    /*for(let i=0;i<=this.height;i++){
        let str="";
        for(let j=0;j<=this.width;j++){
            if(dist[i][j]==inf) str+=0+ " ";
            else str+=dist[i][j]+ " ";
        }
        console.log(str);
    }*/
    console.log("bh,jkjdhqdgoudgodhdhkujgkugougugjhfuykflygugiugugiu");
    console.log(last1,"-", last2,"------",this.ed_x , "-",this.ed_y);
    if(!this.isThereaLegalPath){
        setTimeout(() => { 
            var msg = new SpeechSynthesisUtterance();
            msg.text = "Sorry , No path found between source and destination ";
            window.speechSynthesis.speak(msg);
        },delay+150);
        return;
    }
    setTimeout(() => { 
        /*for(var x of this.nodesToAnimate){
            console.log(x);
            document.getElementById(`${x}`).className="visited";
            
        }*/
        this.nodesToAnimate=[];
        this.nodesToAnimate.push(`${this.ed_x}-${this.ed_y}`);
        console.log("mundhu ",this.ed_x,this.ed_y);
        var curCol=this.ed_y;
        var curRow=this.ed_x;
        while(!(curCol==this.st_y && curRow==this.st_x)){
            let x,y,val=dist[curRow][curCol];
            console.log(curRow,curCol,val);
            for(let i=0;i<=3;i++){
                let cur_x=curRow+dx[i];
                let cur_y=curCol+dy[i];
                if(cur_x<0 || cur_x>this.height || cur_y<0 || cur_y>this.width) continue;
                console.log("*******",cur_x,cur_y,dist[cur_x][cur_y]);
                if(dist[cur_x][cur_y]<val) {
                    val=dist[cur_x][cur_y];
                    x=cur_x;
                    y=cur_y;
                }
            }
            curCol=y;
            curRow=x;
            this.nodesToAnimate.push(`${curRow}-${curCol}`);
            
        }
        console.log("**************ipoyindhi");
        this.nodesToAnimate.reverse();
        delay=100;
        for(var x of this.nodesToAnimate) {
            let k=document.getElementById(`${x}`);
            
            if(x==`${this.st_x}-${this.st_y}`)k.style.animation=`startAnimation 2s ease-in-out ${delay}ms forwards`;
            else if(x==`${this.ed_x}-${this.ed_y}`)k.style.animation=`endAnimation 2s ease-in-out ${delay}ms forwards`;
            else k.style.animation=`shortestPathAnimation 2s ease-in-out ${delay}ms forwards`;
            delay+=50;
            console.log(x,k.className);
        }
        console.log(this.nodesToAnimate.length); 

    }, delay+100);
    setTimeout(() => { 
        var msg = new SpeechSynthesisUtterance();
        msg.text = "The minimum cost from Source Node to Target is "+`${dist[this.ed_x][this.ed_y]}`;
        window.speechSynthesis.speak(msg);
        console.log("Target distance :  ",dist[this.ed_x][this.ed_y]);
    },delay+50);
}

/*Board.prototype.AStar=function(){
    
    var dij_dist=new Array(this.height+1);
    var dij_vis=new Array(this.height+1);
    var dist=new Array(this.height+1);
    var vis=new Array(this.height+1);
    let inf=1000000;
    for(let i=0;i<=this.height;i++ ) {
        dij_dist[i]=new Array(this.width+1);
        dij_vis[i]=new Array(this.width+1);
        dist[i]=new Array(this.width+1);
        vis[i]=new Array(this.width+1);
        for(let j=0;j<=this.width;j++){
            dij_dist[i][j]=inf;
            dij_vis[i][j]=0;
            dist[i][j]=inf;
            vis[i][j]=0;
        }
    }
    const dx=[1,0,-1,0];
    const dy=[0,1,0,-1];
    var que=new Array();
    let txt=document.getElementById(`${this.ed_x}-${this.ed_y}`).innerText;
    let val=(txt=="")?1:parseInt(txt);
    que.push(new Cell(this.ed_x,this.ed_y,val));
    dij_dist[this.ed_x][this.ed_y]=val;
    while(que.length!=0){
        let cur=que[0];
        que.shift();
        if(dij_vis[cur.x][cur.y]) continue;
        dij_vis[cur.x][cur.y]=1;
        if(cur.x==this.st_x && cur.y==this.st_y) {
            this.isThereaLegalPath=true;
            break;
        };
        for(let i=0;i<=3;i++){
            let first=cur.x+dx[i];
            let second=cur.y+dy[i];
            if(first<0 || first>this.height || second<0 || second>this.width) continue;
            if(dij_vis[first][second] || this.isItWall[first][second]) continue;
            let txt=document.getElementById(`${first}-${second}`).innerText;
            let val=(txt=="")?parseInt(1):parseInt(txt);
            dij_dist[first][second]=Math.min(dij_dist[first][second],dij_dist[cur.x][cur.y]+val);
            que.push(new Cell(first,second,dij_dist[first][second]));
        }
        que.sort((a,b)=>{
            return parseInt(a.d)-parseInt(b.d);
        });
    }


    
    console.log("distance table * * *");
    
    var pq=new Array();
    console.log("start  ",this.st_x , this.st_y);
    let textInsideis=document.getElementById(`${this.st_x}-${this.st_y}`).innerText;
    console.log(textInsideis);
    dist[this.st_x][this.st_y]=parseInt((textInsideis=="")?1:textInsideis);
    console.log("dist[this.st_x][this.st_y] ",dist[this.st_x][this.st_y]);
    
    let cc=new HCell(this.st_x,this.st_y,dist[this.st_x][this.st_y],dij_dist[this.st_x][this.st_y],dist[this.st_x][this.st_y]+dij_dist[this.st_x][this.st_y]);
    console.log("cc.d ",cc.d,cc.hd);
    console.log("dist[cc.x][cc.y] ",dist[cc.x][cc.y]);
    pq.push(cc);
    console.log("pq size :",pq.length);
    let delay=10;
    let last1,last2;

    while(pq.length!=0){
        console.log("heuristic distances **** started ");
        for(let i=0;i<pq.length;i++){
            console.log(pq[i].x,pq[i].y,pq[i].d,pq[i].hd);
            console.log("**************");
        }
        let cur=pq[0];
        
        pq.shift();
        if(vis[cur.x][cur.y]) continue;
        vis[cur.x][cur.y]=1;
        this.nodesToAnimate.push(`${cur.x}-${cur.y}`);
        if(!(cur.x==this.st_x && cur.y==this.st_y)) document.getElementById(`${cur.x}-${cur.y}`).style.animation=`visitedPathAnimation 2s ease-in-out ${delay}ms forwards`;
        if(cur.x==this.ed_x && cur.y==this.ed_y) {
            this.isThereaLegalPath=true;
            last1=cur.x;
            last2=cur.y;
            break;
        };
        
        delay+=20;
        let next_x,next_y,next_d,next_h,next_hd=inf;
        for(let i=0;i<=3;i++){
            let cur_x=cur.x+dx[i];
            let cur_y=cur.y+dy[i];
            if(cur_x<0 || cur_x>this.height || cur_y<0 || cur_y>this.width) continue;
            if(vis[cur_x][cur_y] || /*(dij_vis[cur_x][cur_y]==0 && this.isThereaLegalPath) || this.isItWall[cur_x][cur_y]) continue;
            let n_dist=document.getElementById(`${cur_x}-${cur_y}`).innerText;
            n_dist=parseInt((n_dist=="")?1:n_dist);
            console.log("vachindi ",n_dist );
            console.log("cur detailes ",cur.x,cur.y,cur.d,cur.hd);
            dist[cur_x][cur_y]=Math.min(dist[cur_x][cur_y],cur.d+n_dist);
            //if(cur.d+dij_dist[cur_x][cur_y]<next_hd) {
                next_x=cur_x;
                next_y=cur_y;
                next_d=dist[cur_x][cur_y];
                next_h=ed(cur_x,this.ed_x,cur_y,this.ed_y);
                next_hd=cur.d+next_h;//(this.isThereaLegalPath==true)?dij_dist[cur_x][cur_y]:ed(cur_x,this.ed_x,cur_y,this.ed_y);//ed(cur_x,this.ed_x,cur_y,this.ed_y);//
            //}
            pq.push(new HCell(next_x,next_y,next_d,next_h,next_hd));
        }
        //if(next_hd==inf) break;
        pq.sort((a,b)=>{
            
            if(a.hd-b.hd>0) return 1;
            else {
                return a.h-b.h;
            }
            
        });
    }

    console.log("bh,jkjdhqdgoudgodhdhkujgkugougugjhfuykflygugiugugiu");
    console.log(last1,"-", last2,"------",this.ed_x , "-",this.ed_y);
    if(!this.isThereaLegalPath){
        setTimeout(() => { 
            var msg = new SpeechSynthesisUtterance();
            msg.text = "Sorry , No path found between source and destination ";
            window.speechSynthesis.speak(msg);
        },delay+150);
        return;
    }
    setTimeout(() => { 
        /*for(var x of this.nodesToAnimate){
            console.log(x);
            document.getElementById(`${x}`).className="visited";
            
        }
    this.nodesToAnimate=[];
    this.nodesToAnimate.push(`${this.ed_x}-${this.ed_y}`);
    console.log("mundhu ",this.ed_x,this.ed_y);
    let curCol=this.ed_y;
    let curRow=this.ed_x;
    while(!(curCol==this.st_y && curRow==this.st_x)){
        let x,y,val=inf;
        for(let i=0;i<=3;i++){
            let cur_x=curRow+dx[i];
            let cur_y=curCol+dy[i];
            if(cur_x<0 || cur_x>this.height || cur_y<0 || cur_y>this.width) continue;
            if(vis[cur_x][cur_y] && dist[cur_x][cur_y]<val) {
                val=dist[cur_x][cur_y];
                x=cur_x;
                y=cur_y;
            }
        }
        curCol=y;
        curRow=x;
        this.nodesToAnimate.push(`${curRow}-${curCol}`);
    }
    this.nodesToAnimate.reverse();
    delay=100;
    for(var x of this.nodesToAnimate) {
        let k=document.getElementById(`${x}`);
        
        if(x==`${this.st_x}-${this.st_y}`)k.style.animation=`startAnimation 2s ease-in-out ${delay}ms forwards`;
        else if(x==`${this.ed_x}-${this.ed_y}`)k.style.animation=`endAnimation 2s ease-in-out ${delay}ms forwards`;
        else k.style.animation=`shortestPathAnimation 2s ease-in-out ${delay}ms forwards`;
        delay+=50;
        console.log(x,k.className);
    }
    console.log(this.nodesToAnimate.length); 

    }, delay+300);
    setTimeout(() => { 
        var msg = new SpeechSynthesisUtterance();
        msg.text = " The minimum cost from Source Node to Target is "+`${dist[this.ed_x][this.ed_y]}`;
        window.speechSynthesis.speak(msg);
        console.log("Target distance :  ",dist[this.ed_x][this.ed_y]);
    },delay+50);
}*/
/*document.getElementById("calculate").onclick=function(){
    if ('speechSynthesis' in window) {
        // Speech Synthesis supported 🎉
        alert("Yessss, Text to Speech is Posisible!!<3");
       }else{
         // Speech Synthesis Not Supported 😣
         alert("Sorry, your browser doesn't support text to speech!");
       }
}*/

let newBoard=new Board();
newBoard.createGrid();
document.getElementById("weightedNodes").onclick=function(){
    newBoard.isUnweighted=false;
    newBoard.nodesToAnimate=[];
    newBoard.s_set=true;
    newBoard.e_set=true;
    if(window.screen.height<835) {
        this.st_x=parseInt(this.height/2)-parseInt(parseInt(this.height/2)/2);
        this.st_y=parseInt(this.width/2);
        this.ed_x=parseInt(this.height/2)+parseInt(parseInt(this.height/2)/2);
        this.ed_y=parseInt(this.width/2);
    }
    else {
        this.st_x=parseInt(this.height/2);
        this.st_y=parseInt(this.width/2)-parseInt(parseInt(this.width/2)/2);
        this.ed_x=parseInt(this.height/2);;
        this.ed_y=parseInt(this.width/2)+parseInt(parseInt(this.width/2)/2);
    }
    newBoard.is_create=false;
    newBoard.hasToClearEverything=false;
    newBoard.hasToClearEverythingExceptWalls=false;
    newBoard.isEverythingCalculated=false;
    newBoard.isThereaLegalPath=false;
    newBoard.doitOnHover=false;
    newBoard.alwaysTrue=true;
    newBoard.alwaysFalse=false;
    newBoard.isWallsSet=false;
    newBoard.isWallsButtonClicked=false;
    newBoard.isItWall=new Array(newBoard.height+1);
    for(let i=0;i<=newBoard.height;i++) newBoard.isItWall[i]=new Array(newBoard.width+1);
    for(let i=0;i<=newBoard.height;i++){
        for(let j=0;j<=newBoard.width;j++){
            newBoard.isItWall[i][j]=false;
        }
    }
    newBoard.createGrid();
    
}

document.getElementById("unWeightedNodes").onclick=function(){
    newBoard.isUnweighted=true;
    newBoard.nodesToAnimate=[];
    newBoard.s_set=true;
    newBoard.e_set=true;
    if(window.screen.height<835) {
        this.st_x=parseInt(this.height/2)-parseInt(parseInt(this.height/2)/2);
        this.st_y=parseInt(this.width/2);
        this.ed_x=parseInt(this.height/2)+parseInt(parseInt(this.height/2)/2);
        this.ed_y=parseInt(this.width/2);
    }
    else {
        this.st_x=parseInt(this.height/2);
        this.st_y=parseInt(this.width/2)-parseInt(parseInt(this.width/2)/2);
        this.ed_x=parseInt(this.height/2);;
        this.ed_y=parseInt(this.width/2)+parseInt(parseInt(this.width/2)/2);
    }
    newBoard.is_create=false;
    newBoard.hasToClearEverything=false;
    newBoard.hasToClearEverythingExceptWalls=false;
    newBoard.isEverythingCalculated=false;
    newBoard.isThereaLegalPath=false;
    newBoard.doitOnHover=false;
    newBoard.alwaysTrue=true;
    newBoard.alwaysFalse=false;
    newBoard.isWallsSet=false;
    newBoard.isWallsButtonClicked=false;
    newBoard.isItWall=new Array(newBoard.height+1);
    for(let i=0;i<=newBoard.height;i++) newBoard.isItWall[i]=new Array(newBoard.width+1);
    for(let i=0;i<=newBoard.height;i++){
        for(let j=0;j<=newBoard.width;j++){
            newBoard.isItWall[i][j]=false;
        }
    }
    newBoard.createGrid();
    
}

document.getElementById("changer").onclick=function(){
        if(newBoard.isEverythingCalculated==true){
            window.alert("path already shown!\nPress Clear to choose different start and end Nodes");
            return;
        }
        if(newBoard.s_set==false || newBoard.e_set==false){
            window.alert("set start and end points! \nclick on any node to select start and target!");
        }
        else{
            console.log("inko lopala  ",newBoard.st_x , newBoard.st_y);
            console.log("inko lopala  ",newBoard.ed_x , newBoard.ed_y);
            newBoard.OxO_to_NxN();
            console.log("after function width & height ",window.screen.height,window.screen.width);
            newBoard.isEverythingCalculated=true;
        }
    
        
};
document.getElementById("clearEverything").onclick=function(){
    newBoard.hasToClearEverything=true;
    newBoard.nodesToAnimate=[];
    newBoard.s_set=false;
    newBoard.e_set=false;
    newBoard.st_x=-1;
    newBoard.st_y=-1;
    newBoard.ed_x=-1;
    newBoard.ed_y=-1;
    
    newBoard.isEverythingCalculated=false;
    newBoard.isWallsButtonClicked=false;
    newBoard.isThereaLegalPath=false;
    newBoard.doitOnHover=false;
    newBoard.isWallsSet=false;
    newBoard.hasToClearEverythingExceptWalls=false;
    for(let i=0;i<=newBoard.height;i++){
        for(let j=0;j<=newBoard.width;j++){
            newBoard.isItWall[i][j]=false;
        }
    }
    newBoard.createGrid();
    newBoard.hasToClearEverything=false;
    
};

document.getElementById("clearEverythingExceptWalls").onclick=function(){
    
    newBoard.hasToClearEverythingExceptWalls=true;
    newBoard.hasToClearEverything=true;
    newBoard.nodesToAnimate=[];
    newBoard.s_set=false;
    newBoard.e_set=false;
    newBoard.st_x=-1;
    newBoard.st_y=-1;
    newBoard.ed_x=-1;
    newBoard.ed_y=-1;
    
    newBoard.isEverythingCalculated=false;
    newBoard.isThereaLegalPath=false;
    newBoard.doitOnHover=false;
    newBoard.isWallsSet=false;
    newBoard.createGrid();
    newBoard.hasToClearEverything=false;
    if(newBoard.isWallsButtonClicked){
        newBoard.hasToClearEverythingExceptWalls=true;
    }
    else newBoard.hasToClearEverythingExceptWalls=false;
};

function createWallsHelper(vis,dx,dy,x,y,n,m,delay,px,py,dif){
    console.log(x,y,n,m);
    if(vis[x][y]) return;
    vis[x][y]=1;
    setTimeout(()=>{
        newBoard.createWalls(parseInt(x)*dif,parseInt(y)*dif);
    },delay+1);
    delay+=2;
    if(px!=-1 && py!=-1){
        if(y==py){
            for(let i=(px)*dif;(px<x)?i<=x*dif:i>=x*dif;(px<x)?i++:i--){
                setTimeout(()=>{
                    newBoard.createWalls(parseInt(i),parseInt(y)*dif);
                },delay+1);
                delay+=2;
            }
        }
        else{
            for(let i=(py)*dif;(py<y)?i<=y*dif:i>=y*dif;(py<y)?i++:i--){
                setTimeout(()=>{
                    newBoard.createWalls(parseInt(x)*dif,parseInt(i));
                },delay+1);
                delay+=2;
            }
        }
    }
        
    let k=parseInt(randInt(4));
    for(let i=k;i<=k+3;i++){
        let cur_x=x+dx[i%4];
        let cur_y=y+dy[i%4];
        if(cur_x<0 || cur_x>n || cur_y<0 || cur_y>m) continue;
        createWallsHelper(vis,dx,dy,cur_x,cur_y,n,m,delay+30,x,y,dif);
    }
    return;
}
document.getElementById("recMaze").onclick=function(){
    if(newBoard.isEverythingCalculated==true){
        window.alert("path already shown!\nPress Clear to choose different start and end Nodes");
        return;
    }
    if(newBoard.hasToClearEverythingExceptWalls){
        window.alert("Walls are already set! \npress clear to restart!");
        return;
    }
    if(newBoard.isWallsSet) {
        if(!newBoard.isEverythingCalculated) 
            window.alert("Walls are already set! \npress clear to restart!");
        
        else
            window.alert("Walls are already set! \npress Doit to visualise the Path!");
        return;
    }
    /*if(!newBoard.st_x) {
        window.alert("set start and end points!");
        return;
    }*/
    newBoard.isWallsSet=true;
    /*for(let i=0;i<=500;i++){
        let x=randInt(23)-1;
        let y=randInt(57)-1;
        newBoard.SetIt(x,y);
        setTimeout(()=>{},1000);
    }*/
    let dif;
    if(newBoard.isUnweighted) dif=randInt(2)+1;
    else dif=randInt(3)+2;
    let n=parseInt(newBoard.height/dif);
    let m=parseInt(newBoard.width/dif);
    let vis=new Array(n);
    
    for(let i=0;i<=n;i++) {
        vis[i]=new Array(m);
    }
    for(let i=0;i<=n;i++){
        for(let j=0;j<=m;j++){
            vis[i][j]=0;
        }
    }
    let dx=[1,0,-1,0];
    let dy=[0,1,0,-1];
    let delay=0;
    for(let i=0;i<=newBoard.height+newBoard.width;i++) {
        setTimeout(()=>{
            let px=i,py=0;
            if(px>newBoard.height){
                py=px-newBoard.height;
                px=newBoard.height;
            }
            newBoard.createWalls(px,py);
            py=i;
            px=0;
            if(py>newBoard.width){
                px=py-newBoard.width;
                py=newBoard.width;
            }
            newBoard.createWalls(px,py);
        },delay+10);
        delay+=10;
    }

    createWallsHelper(vis,dx,dy,randInt(n),0,n,m,0,-1,-1,dif);
    if(newBoard.isWallsButtonClicked){
        console.log("Walls are already set");
    }
    newBoard.isWallsButtonClicked=true;
    /*delay=1000;
    for(let i=0;i<=100;i++){
        
        setTimeout(()=>{
            let x=randInt(23)-1;
            let y=randInt(57)-1;
            newBoard.SetIt(x,y);
        },delay);
        delay+=10;
    }*/
};
document.getElementById("randMaze").onclick=function(){
    if(newBoard.isEverythingCalculated==true){
        window.alert("path already shown!\nPress Clear to choose different start and end Nodes");
        return;
    }
    if(newBoard.hasToClearEverythingExceptWalls){
        window.alert("Walls are already set! \npress clear to restart!");
        return;
    }
    if(newBoard.isWallsSet) {
        if(!newBoard.isEverythingCalculated) 
            window.alert("Walls are already set! \npress clear to restart!");
        
        else
            window.alert("Walls are already set! \npress Doit to visualise the Path!");
        return;
    }
    /*if(!newBoard.st_x ) {
        window.alert("set start and end points!");
        return;
    }*/
    if(newBoard.isWallsButtonClicked){
        console.log("Walls are already set");
    }
    newBoard.isWallsButtonClicked=true;
    newBoard.isWallsSet=true;
    let delay=10;
    var lim=parseInt((newBoard.height*newBoard.width)/100)*45;
    for(let i=0;i<=lim;i++){
        
        setTimeout(()=>{
            let x=randInt(newBoard.height)-1;
            let y=randInt(newBoard.width)-1;
            newBoard.SetIt(x,y);
        },delay);
        delay+=10;
    }
};