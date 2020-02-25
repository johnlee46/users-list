let http = require('http');

let server = http.createServer(function(req,res){
    
    /* 
        cd to current folder, in terminal type 
        node app
        navigate to localhost:8080 (open a browser type localhost:8000)
    */ 
    
    let method = req.method;
    let url = req.url
    
    console.log(method);
    console.log(url);


    if(url=='/form' && method=='GET') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write('<html>');
        res.write('<head><title>My Title</title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST">');
        res.write('<input type="text" name="info" />');
        res.write('<input type="submit" value="submit" />');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if(method=='POST' && url=='/message') {

        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
    
        return req.on('end', () => {
            const bodyParsed = Buffer.concat(body).toString();
            let info = bodyParsed.split('=')[1];  // info=hello
            console.log(info);

            res.statusCode = 302;
            res.setHeader('Location', '/'); // Redirect to home
            return res.end();
        });      
    }

    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body>');
    res.write('<a href="/form" >Form</a>');
    res.write('<h2>Home Page</h2>');
    res.write('</body>');
    res.write('</html>');
    res.end();

});

server.listen(8000);