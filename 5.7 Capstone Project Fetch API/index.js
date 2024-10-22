import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    res.render('index');
});

app.post('/search', async (req, res) => {
    try {
        const { searchText } = req.body;
        const response = await axios.get('https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~' + searchText);
        
        // Replace  tags with <p> tags
        let processedData = response.data;
        processedData = processedData.replace(/<\/cite>/g, '</p>');
        
        res.render('index', { animeData: processedData });
    } catch (error) {
        console.error('Error:', error);
        res.render('index', { error: 'An error occurred while fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});