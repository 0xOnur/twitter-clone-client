import axios from "axios";
import axiosInstance from "./axiosInstance";

// Get specific Tweet
export const getSpecificTweet = async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet/${tweetId}`)
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
        const response = await axiosInstance.get(`/tweet/get-popular-tweets?page=${page}&limit=${limit}`)
        return response.data;
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

// Get specific Tweet Stats
export const getSpecificTweetStats = async (tweetId:string) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-stats/${tweetId}`)
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
        const response = await axiosInstance.get(`/tweet/get-tweet-author/${tweetId}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};


// Get Tweet Replies
export const getTweetReplies =async (tweetId:string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-replies/${tweetId}?page=${page}&limit=${limit}`)
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
};

// Add Bookmark
export const addBookmark =async (tweetId:string) => {
    try {
        const response = await axiosInstance.put(`/tweet/add-bookmark/${tweetId}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Remove Bookmark
export const removeBookmark =async (tweetId:string) => {
    try {
        const response = await axiosInstance.put(`/tweet/remove-bookmark/${tweetId}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get users who retweeted the tweet
export const getRetweeters =async (tweetId:string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-retweeters/${tweetId}?page=${page}&limit=${limit}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get users who liked the tweet
export const getLikers =async (tweetId:string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-likers/${tweetId}?page=${page}&limit=${limit}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get Tweet Quotes
export const getTweetQuotes = async (tweetId: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(`/tweet/get-tweet-quotes/${tweetId}?page=${page}&limit=${limit}`)
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Create Tweet
export const createTweet =async (formData: FormData) => {
    try {
        const response = await axiosInstance.post(`/tweet/create-tweet`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Delete Tweet
export const deleteTweet = async (tweetId: string) => {
    try {
        const response = await axiosInstance.delete(`/tweet/delete-tweet/${tweetId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Get Poll
export const getPoll =async (pollId: string) => {
    try {
        const response = await axiosInstance.get(`/poll/get-poll/${pollId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};

// Vote Poll
export const votePoll =async (pollId: string, choiceId: string) => {
    try {
        const response = await axiosInstance.put(`/poll/vote-poll/${pollId}?choiceId=${choiceId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
};