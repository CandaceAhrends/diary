const express = require('express')
const app = express();
const port = process.env.PORT || 8085;
app.use(express.static('./publish'));

app.route('/test',
    
    function(req, res) {
    var aboutInfo = {
        name: properties.name,
        version: properties.version
    }
    res.json(aboutInfo);
});

app.listen(port, function() {
   console.log('Server started on port: ' + port);
});

