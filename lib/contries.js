function get(){
   
    $.getJSON('lib/data.json', function(data){
        var root = data.data;
        for (var i in root){
            dat = root[i].country.eng.name;
            console.log(dat)
            
            $('.nav').append(
                "<li><a href='#/map'=>"+dat+"</a></li>"
            );
        }
    });
}
