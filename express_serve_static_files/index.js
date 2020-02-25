let express = require('express')
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) => {
    res.send(`
        <a href='/about'>About Us page</a> <br>
        <a href='/contact'>Contact Us page</a>
    `)
})

app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname,'views','about.html'));
});

app.get('/contact' ,(req,res) => {
    res.sendFile(path.join(__dirname,'views','contact.html'));
}); 

app.listen(7000);