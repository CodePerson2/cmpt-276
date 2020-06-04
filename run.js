let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));

var numberHints = [
  [2],[1,7,1],[1,1,7,1],[1,1,1],[1],[1,4,3],[1,1,3,3],[1,1,1,1],[6,3,1],[2],[1,5,1],[1,4],[1,1,4,1,1],[1,1,1,4],[5,3],[3],[3,3,1,1],[1,1],[1,1,1,2,1],[1,1,2],[2,1,2,1,1],[2,1,1,3,1],[3,2,1,1,1],[2,2,1,1,1,1],[2,1,1,1,3],[3,1,1,1],[3,2],[1,3,2,2],[2,2,2],[2,3,3]
              ];

var solution = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,0,1,1,1,0,0,1,0,1,0],
  [0,0,0,0,0,0,0,0,1,0,0,0,1,0,0],
  [0,0,1,0,0,1,0,0,1,0,1,1,0,1,0],
  [0,0,0,0,0,0,1,0,1,0,0,1,1,0,0],
  [0,1,1,0,1,0,0,1,1,0,0,1,0,0,1],
  [0,1,1,0,0,0,1,0,1,0,1,1,1,0,1],
  [0,1,1,1,0,1,1,0,0,0,1,0,1,0,1],
  [0,1,1,0,0,1,1,0,1,0,1,0,1,0,1],
  [0,1,1,0,0,1,0,0,1,0,1,0,1,1,1],
  [1,1,1,0,0,1,0,0,1,0,1,0,0,0,0],
  [1,1,1,0,0,0,0,0,0,0,0,0,1,1,0],
  [0,0,0,1,0,1,1,1,0,1,1,0,0,1,1],
  [0,0,0,0,0,1,1,0,1,1,0,0,0,1,1],
  [0,1,1,0,0,1,1,1,0,0,0,0,1,1,1]
];

var playerMap;

var test = numberHints;

var mouseCurrent;
var clickD = false;


function makeGame()
{
  solution = arrMaker(15);
  numberHints = hintMaker(15, solution);
  loadGame(solution, numberHints);
  
}

function loadGame(sol = solution, numberH = numberHints){
  document.getElementById("table").innerHTML = "";
  document.getElementById("win").style.display = "none";
  var b = document.getElementsByClassName("button");
  b[0].style.display = "block";
  b[1].style.display = "block";
  b[2].style.display = "block";
  document.getElementById("makeGame").style.display = "block";
  document.getElementById("help").style.display = "block";
  load(sol, numberH);
}


function winGame(dimension = 15, sol = solution)
{
  var count = 0;
  while(count < dimension)
  {
    var count2 = 0;
    while(count2 < dimension)
    {
      var cell = document.getElementById((count + "-" + count2));
      if(sol[count][count2] == 1)
      {
        cell.style.background = "red";
        playerMap[count][count2] = 1; 
      }
      else if(sol[count][count2] == 0)
      {
        cell.style.background = "#d1e6d2";
        playerMap[count][count2] = 0; 
      }
      count2++;
    }
    count++;
  }
  //console.log(JSON.stringify(sol));
  //console.log(JSON.stringify(playerMap));
  testwin();
}

function hintMaker(dimension, arr = solution){
  var hint = [];
  var count = 0;
   while(count < dimension)
    {
    var count2 = 0;
    var last = 0;
    var cellLen;
    var localhint = [];
    while(count2 < dimension)
    {
      if(arr[count2][count] == 1 && 1 == last)
      {
        cellLen++;
      }
      else if(arr[count2][count] == 1 && 0 == last)
      {
        cellLen = 1;
      }
      else if(arr[count2][count] == 0 && 1 == last)
      {
        localhint.push(cellLen);
        cellLen = 0;
      }
      last = arr[count2][count];
      count2++;
    }
     if(cellLen > 0) localhint.push(cellLen);
    hint.push(localhint);
    count++;
  }
  count = 0;
  while(count < dimension)
  {
    var count2 = 0;
    var last = 0;
    var cellLen;
    var localhint = [];
    while(count2 < dimension)
    {
      if(arr[count][count2] == 1 && 1 == last)
      {
        cellLen++;
      }
      else if(arr[count][count2] == 1 && 0 == last)
      {
        cellLen = 1;
      }
      else if(arr[count][count2] == 0 && 1 == last)
      {
        localhint.push(cellLen)
        cellLen = 0;
      }
      last = arr[count][count2];
      count2++;
    }
    if(cellLen > 0) localhint.push(cellLen);
    hint.push(localhint);
    count++;
  }
  return hint;
}

function arrMaker(dimension){
  var newArr = Array2D(dimension, dimension);
  var count = 0;
  
  while(count < dimension)
  {
    var count2 = 0;
    while(count2 < dimension)
    {
      var cell = document.getElementById((count + "-" + count2));
      if (cell.style.background == "red") newArr[count][count2] = 1;
      count2++;
    }
    count++;
  }
  //console.log(JSON.stringify(newArr));
  //console.log(JSON.stringify(hintMaker(15, newArr)));
  return newArr;
  
}


function addNum(arr, top, cell)
{
  var count = 0;
  while(count < arr.length)
  {
    if(top == 1)
    {
      cell.innerHTML += arr[count] + "<br>";
    }
    else
    {
      cell.innerHTML += arr[count] + " ";
    }
    count++;
  }
}

function load(sol = solution, numberH = numberHints){
  var sw = window.innerWidth;
  var sh = window.innerHeight;
  var size;
  if(sw > sh) size = sh;
  if(sw <= sh) size = sw;
  var num = 16;
  var c = 0;
  var x;
  var arrayCount = 0;
  var t = document.getElementById('table');
  
  playerMap = Array2D(num-1, num-1);
  
  if (test == numberHints) console.log("works");
  
  while(c < num)
        {
          x = 0;
          var row = t.insertRow(-1);
          while(x < num)
          {
            var cell = row.insertCell(-1);
            
            if(c == 0 && x == 0)
            {
              cell.classList.add("header-top");
              //cell.innerHTML = "NEW CELL1";
              cell.style.width = Math.floor(size/(num+3)*2) + "px";
              cell.style.height = Math.floor(size/(num+3)*2) + "px";
              x++;
            }
            else if(c==0)
            {
              cell.classList.add("header-top");
              addNum(numberH[arrayCount], 1, cell);
              arrayCount++;
              cell.style.width = Math.floor(size/(num+4)) + "px";
              cell.style.height = Math.floor(size/(num+4)*2) + "px";
              cell.style.fontSize = Math.floor(size/45) + "px"; 
              x++;
            }
            
            else if(x==0)
            {
              cell.classList.add("header-top");
              addNum(numberH[arrayCount], 0, cell);
              arrayCount++;
              cell.style.width = Math.floor(size/(num+4)*2) + "px";
              cell.style.height = Math.floor(size/(num+4)) + "px";
              cell.style.fontSize = Math.floor(size/45) + "px"; 
              x++;
            }
            
            else
            {
              cell.classList.add("cell");
              //cell.innerHTML = "NEW CELL1";
              cell.style.width = Math.floor(size/(num+3)) + "px";
              cell.style.height = Math.floor(size/(num+3)) + "px";
              //cell.setAttribute("onclick", "clickCell(this.id)");
              cell.setAttribute("onmouseup", "dclick(this.id, 3)");
              cell.setAttribute("onmousemove", "dclick(this.id, 2)");
              cell.setAttribute("onmousedown", "dclick(this.id, 1)");
              cell.setAttribute("id", ((c-1).toString() + "-" + (x-1).toString()));
              x++;
            }
            
            
          }
          
          c++;
        }
}

function testwin(sol = solution)
{
  var count = 0;
  var win = true;
  while(count < sol.length)
  {
    var count2 = 0;
    while(count2 < sol.length)
    {
      if(sol[count][count2] != playerMap[count][count2])
      {
        win = false;
      }
      count2++;
    }
    count++;
  }
  if(win)
  {
    document.getElementById("win").style.display = "inline-block";
    
  }
  else
  {
    document.getElementById("win").style.display = "none";
  }
  
    
}

function clickCell(id){
  var idVar = document.getElementById(id);
  var id_index = id.split('-');
  if(idVar.style.background != "red")
  { 
    idVar.style.background = "red";
    playerMap[id_index[0]][id_index[1]] = 1;
  }
  else 
  {
    idVar.style.background = "#d1e6d2";
    playerMap[id_index[0]][id_index[1]] = 0;
    
  }
  testwin();
}

function dclick(id = null, pos)
{
  if(pos == 1 && clickD == false)
  {
    clickCell(id);
    mouseCurrent = id;
    clickD = true;
  }
  else if(pos == 2 && id != mouseCurrent && clickD)
  {
    clickCell(id);
    mouseCurrent = id;
  }
  else if(pos == 3)
  {
    mouseCurrent = id;
    clickD = false;
  }
}


