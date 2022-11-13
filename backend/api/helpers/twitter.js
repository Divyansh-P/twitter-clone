const URL="https://api.twitter.com/2/tweets/search/recent";
import axios from 'axios';
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
            "Authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAOfZOwEAAAAAjzrI593jczNcyI1TocrLWQpuvjw%3DsMWOPzErhFq9S9vUaouauCRBNlAy0m2ujaAtl7PxACkBObCTv4` 
        }
    })
}

}
export default Twitter;
