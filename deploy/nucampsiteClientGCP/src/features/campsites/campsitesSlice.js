import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';

export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites',
    async () => {
        const response = await fetch(baseUrl + 'campsites');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
);

// post a new comment for a campsite
export const postComment = createAsyncThunk(
    'campsites/postComment',
    async (comment) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');

        const response = await fetch(
            baseUrl + 'campsites/' + comment.campsiteId + '/comments',
            {
                method: 'POST',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify(comment)
            }
        );
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        let data = await response.json();

        // Add campsiteId to returned comment data for storing in application state
        data = { ...data, campsiteId: comment.campsiteId };
        return data;
    }
);

const initialState = {
    campsitesArray: [],
    isLoading: true,
    errMsg: ''
};

const campsitesSlice = createSlice({
    name: 'campsites',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCampsites.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchCampsites.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.campsitesArray = mapImageURL(action.payload);
        },
        [fetchCampsites.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [postComment.fulfilled]: (state, action) => {
            const newComment = action.payload.comment;
            const campsiteId = action.payload.campsiteId;
            newComment.author = action.payload.author;
            const campsiteIdx = state.campsitesArray.findIndex(
                (campsite) => campsite._id === campsiteId
            );
            if (campsiteIdx === -1) {
                console.log(
                    `Campsite id of ${campsiteIdx} not found, cannot add comment.`
                );
                return;
            }
            state.campsitesArray[campsiteIdx].comments.push(newComment);
        },
        [postComment.rejected]: (state, action) => {
            alert(
                'Your comment could not be posted\nError: ' +
                    (action.error ? action.error.message : 'Fetch failed')
            );
        }
    }
});

export const campsitesReducer = campsitesSlice.reducer;

export const selectAllCampsites = (state) => {
    return state.campsites.campsitesArray;
};

export const selectCampsiteById = (id) => (state) => {
    return state.campsites.campsitesArray.find((campsite) => campsite._id === id);
};

export const selectFeaturedCampsite = (state) => {
    return {
        featuredItem: state.campsites.campsitesArray.find(
            (campsite) => campsite.featured
        ),
        isLoading: state.campsites.isLoading,
        errMsg: state.campsites.errMsg
    };
};

// Comments by campsite
export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
    const campsite = state.campsites.campsitesArray.find(
        (campsite) => campsite._id === campsiteId
    );
    return campsite.comments;
};
