//installation :
cd backend => npm install => npm start
cd frontend => npm install => npm start

//explanation :
1. get lat, lng from gmap api with autocomplete
2. send lat, lng to api which is served at 8082
3. backend get data from json
4. get distances from sent location
5. return distances to front end
6. front end sort returned data from backend and served at 8080