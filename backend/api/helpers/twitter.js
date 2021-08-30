const URL="https://api.twitter.com/2/tweets/search/recent";
const  axios  = require('axios');
class Twitter{
get(query,count,token){
    return axios.get(URL, {
        params:{
            query:query,
            max_results:count,
            expansions:'attachments.media_keys,author_id',
            'media.fields':'preview_image_url,url',
            'user.fields':'profile_image_url',
            'tweet.fields':'created_at',
            next_token:token

        },
        headers:{
            "Authorization": `Bearer ${process.env.TWITTER_API_TOKEN}` 
        }
    })
}

}
module.exports=Twitter;
