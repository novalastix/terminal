import { express, Router } from 'express';
import { path } from 'path';

const router = Router();
const app = express();
const port = 8080;

//Use EJS templating engine for variables inside HTML
app.set('view engine','ejs');

//Set path for static content to /public
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res) =>
{
    res.render('index',
    {
        title: 'Admin Terminal'
    });
});

app.listen(port, () => 
    {
    console.log(`Server running at localhost:${port}`);
});