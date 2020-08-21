$('#btnCalc').click(() => {
    let text=$('#inputText').val()
    let words=getWords(text)
    let wc=getWordCounts(words)
    let wcArr=sortWordCounts(wc)
    printWordTable(wcArr)
    generateChart(wcArr)
    
})
function getWords(inputText){
    let chars=inputText.split('')
    let newChars=[]
    chars.forEach((c)=>{
        switch(c){
            case '.':case ',':case ':':case ';':case '-':case '!':case '?':case '"':case '*' :case '@': case "'":case '”': case '“':case '’':case '…': case '—':return
            case '\n':newChars.push(' '); break;
            case '  ':newChars.push(' '); break;
            case '   ':newChars.push(' '); break;
            case '    ':newChars.push(' '); break;

            default: newChars.push(c.toLowerCase())
        }
       
    })
    let newText=newChars.join('')
    let words=newText.split(' ')
    return words;
}
function getWordCounts(words){
    let wordCounts={}
    words.forEach((w)=>{
        if(wordCounts[w]){
            wordCounts[w]++;
        }
        else{
            wordCounts[w]=1;
        }
    })
    return wordCounts;
}
function sortWordCounts(wordCounts){
    let wcArr=[]
    Object.keys(wordCounts).forEach((w)=>{
        if(w=="")return

        wcArr.push({
            word:w,
            count:wordCounts[w]
        })
    })
    return wcArr.sort((a,b)=> b.count - a.count).slice(0,50)
}
function printWordTable(wordCoutArray){
    let table= $('#tblWordCount')
    table.empty()
    wordCoutArray.forEach((wc)=>{
        table.append(
            $('<tr>')
            .append($('<td>').text(wc.word))
            .append($('<td>').text(wc.count))
        )
    })
}
function generateChart(wcArr){
    let ctx=document.getElementById('cnvWcChart').getContext('2d');
    let chart=new Chart(ctx,{
        type:'line',
        data:{
            labels:  wcArr.map((wc)=> wc.word),
            datasets:[
                {
                    label: 'word Frequency',
                    borderColor: 'red',
                    borderWidth: 2,
                    data: wcArr.map((wc)=> wc.count)

                }
            ]  
        },
    })
}