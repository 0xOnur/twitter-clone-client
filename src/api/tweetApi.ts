import axios from "axios";
import axiosInstance from "./axiosInstance";

// Get specific Tweet
export const getSpecificTweet = async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet/${tweetId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get popular Tweets
export const getPopularTweets = async function name(page: number, limit: number) {
    try {
        const response = await axiosInstance.get(`/tweet/get-popular-tweets?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

// Get specific Tweet Stats
export const getSpecificTweetStats = async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-stats/${tweetId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get specific Tweet Author
export const getSpecificTweetAuthor = async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-author/${tweetId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};


// Get Tweet Replies
export const getTweetReplies =async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-replies/${tweetId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get Tweet retweets
export const getTweetRetweets =async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-retweets/${tweetId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get Tweet quotes
export const getTweetQuotes =async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-quotes/${tweetId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Like Tweet
export const likeTweet =async (tweetId:string) => {
    try {
        const response = await axiosInstance.put(`/tweet/like-tweet/${tweetId}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Unlike Tweet
export const unlikeTweet =async (tweetId:string) => {
    try {
        const response = await axiosInstance.put(`/tweet/unlike-tweet/${tweetId}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Retweet Tweet
export const retweetTweet =async (tweetId:string) => {
    try {
        const response = await axiosInstance.put(`/tweet/retweet-tweet/${tweetId}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Undo Retweet
export const undoRetweet =async (tweetId:string) => {
    try {
        const response = await axiosInstance.put(`/tweet/undo-retweet/${tweetId}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
}