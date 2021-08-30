

const URL = "http://localhost:3000/tweets";
let nextpageurl=null;
/**
 * Retrive Twitter Data from API
 */
const onEnter=(e)=>{
    if(e.key=="Enter"){
        getTwitterData();
    }
}
const onNextPage=()=>{
  if(nextpageurl){
      getTwitterData(true);
  }
}
const getTwitterData = (nextpage=false) => {
    const query=document.getElementById('user-search-tweets').value;
    const encodedquery=encodeURIComponent(query);
    if(!query) return;
const fullurl1=`${URL}?query=${encodedquery}&count=10`;
let fullurl=`${URL}?query=${encodedquery}&count=10`;
if(nextpageurl&&nextpage){
    fullurl=nextpageurl;
}
fetch(fullurl).then(response=>{
    
    return response.json()
}).then(data=>{
    buildTweets(data,nextpage);
    saveNextPage(data.meta,fullurl1);
    nextPageButtonVisibility(data.meta);
    //console.log(data);
})
}

/**
 * Save the next page data
 */
const saveNextPage = (metadata,url) => {
if(metadata.next_token){
    console.log(metadata.next_token);
    nextpageurl=`${url}&next_token=${metadata.next_token}`;
}
else{
    nextpageurl=null;
}
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
    
    const text=e.innerText;
    document.getElementById('user-search-tweets').value=text;
    getTwitterData();

}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
if(metadata.next_token){
    document.getElementById('nextpage').style.visibility='visible';
}
else{
    document.getElementById('nextpage').style.visibility='hidden';
}
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    let tweetdata=[...tweets.data];
    let userinfo=[...tweets.includes.users];
 let twittercontent="";
 tweetdata.map((tweet)=>{
     let time=moment(tweet.created_at).fromNow();
     console.log(time);
     let name="";
     let username="";
     let profileimage="";
     userinfo.map(info=>{
         if(tweet.author_id==info.id){
             name+=info.name;
             username+=info.username;
             profileimage+=info.profile_image_url;
         }
     })
     twittercontent+=`
     <div class="tweet-container">
                  <div class="tweet-user-info">
                      <div class="tweet-user-profile" style="background-image:url(${profileimage})"></div>
                      <div class="tweet-user-name-container">
                          <div class="tweet-user-name">${name}</div>
                          <div class="tweet-user-username">@${username}</div>
                      </div>
                  </div>`
                   if(tweet.attachments&&tweet.attachments.media_keys.length>0){
                     twittercontent+=buildImages(tweets,tweet.attachments.media_keys);
                       
                      } 
                twittercontent+=`
                  <div class="tweet-text-container">
                    ${tweet.text}
                  </div>
                  <div class="tweet-date-container">${time}</div>
                 </div>`
 })
 console.log(nextPage);
 if(nextPage){
    document.querySelector('.tweet-lists').insertAdjacentHTML('beforeend', twittercontent);
 }else{
 document.querySelector('.tweet-lists').innerHTML=twittercontent;}
}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList,key) => {
    
    let tweetimagesdata=[...mediaList.includes.media];
    
    let tweetimages="`<div class='tweet-images-container'>`";
    let imageexist=false;
    tweetimagesdata.map(data=>{
       
        if(data.media_key==key&&data.type=="photo"){
            imageexist=true;
            tweetimages+=`<div class='tweet-image' style="background-image:url(${data.url});"></div>`
        }
    })
    tweetimages+="`</div>`";
    return imageexist? tweetimages : ' ';
}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {

}
