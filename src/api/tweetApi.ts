import axiosInstance from "./axiosInstance";

// Get specific Tweet
export const getSpecificTweet = async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet/${tweetId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
};

// Get specific Tweet Stats
export const getSpecificTweetStats = async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-stats/${tweetId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
};


// Get Tweet Replies
export const getTweetReplies =async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-replies/${tweetId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
};

// Get Tweet retweets
export const getTweetRetweets =async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-retweets/${tweetId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
};

// Get Tweet quotes
export const getTweetQuotes =async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-quotes/${tweetId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
};